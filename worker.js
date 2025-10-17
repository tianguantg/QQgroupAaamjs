// Cloudflare Worker 脚本 - 每日挑战排行榜
// 重点防护：作弊检测、攻击防护、数据验证

// 配置常量
const CONFIG = {

  MAX_SUBMISSIONS_PER_IP: 2, // 每IP每日最大提交次数
  
  MAX_NICKNAME_LENGTH: 20,   // 昵称最大长度
  
  MIN_ANSWER_TIME: 0,        // 每题最小答题时间（秒）
  
  MAX_ANSWER_TIME: 300,      // 每题最大答题时间（秒）
  
  MAX_TOTAL_TIME: 7200,      // 总答题时间上限（秒）
  
  MIN_TOTAL_TIME: 20,        // 总答题时间下限（秒）
  
  QUESTION_COUNT: 15,         // 每日挑战题目数量（与前端噩梦模式一致）
  
  RATE_LIMIT_WINDOW: 60,     // 速率限制窗口（秒）
  
  RATE_LIMIT_MAX: 10,        // 速率限制最大请求数
  
  // 读取端限流（排行榜查询）
  READ_RATE_LIMIT_WINDOW: 60,        // 读取端限流窗口（秒）
  READ_RATE_LIMIT_MAX: 30,           // 读取端每IP最大请求数

  // 允许的时间漂移（秒）：sum(questionTimes) 与 timeSpent 的容忍误差
  ALLOWED_TIME_DRIFT_SEC: 15
  
  };

// 伪随机数生成器（与前端保持一致）
class SeededRandom {
  constructor(seed = Date.now()) {
    this.seed = seed;
    this.originalSeed = seed;
  }
  
  random() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  
  reset() {
    this.seed = this.originalSeed;
    return this.originalSeed;
  }
}

// 生成每日种子（与前端保持一致）
function getDailySeed(dateStr = null) {
  let date;
  if (dateStr) {
    date = new Date(dateStr);
  } else {
    date = new Date();
  }
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return year * 10000 + month * 100 + day;
}

// 验证提交数据的完整性和合理性
function validateSubmissionData(data) {
  console.log('validateSubmissionData called with:', JSON.stringify(data, null, 2));
  
  // 基础字段检查
  if (!data.nickname || !data.date || !data.answers || !data.timeSpent || !data.questionTimes) {
    console.log('Missing required fields');
    return { valid: false, error: 'Missing required fields' };
  }
  
  // 昵称验证与规范化
  if (typeof data.nickname !== 'string') {
    console.log('Invalid nickname type');
    return { valid: false, error: 'Invalid nickname' };
  }
  let nick = String(data.nickname || '');
  try { nick = nick.normalize('NFKC'); } catch (_) {}
  nick = nick.replace(/[\u0000-\u001F\u007F]/g, ''); // 控制字符
  nick = nick.replace(/[\u200B-\u200D\uFEFF]/g, ''); // 零宽字符
  nick = nick.replace(/\s+/g, ' ').trim();
  if (!nick) {
    console.log('Empty nickname after normalization');
    return { valid: false, error: 'Invalid nickname' };
  }
  if (nick.length > CONFIG.MAX_NICKNAME_LENGTH) {
    console.log('Nickname too long');
    return { valid: false, error: 'Invalid nickname' };
  }
  const allowedRe = /^[A-Za-z0-9\u4e00-\u9fa5 _\-·•~.!?]+$/;
  if (!allowedRe.test(nick)) {
    console.log('Nickname contains invalid characters');
    return { valid: false, error: 'Nickname contains invalid characters' };
  }
  const bannedPatterns = [
    /(https?:\/\/|www\.)/i,
    /@/i,
    /(微信|VX|QQ|TG|电报|群|联系|加我)/i,
    /(广告|推广|色情|成人|赌|博彩|彩票|政治|极端|暴力|仇恨|辱骂)/i,
    /(.)\1{4,}/
  ];
  if (bannedPatterns.some(re => re.test(nick))) {
    console.log('Nickname contains prohibited content');
    return { valid: false, error: 'Nickname contains prohibited content' };
  }
  // 通过验证后，写回规范化昵称
  data.nickname = nick;
  
  // 日期格式验证
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    console.log('Invalid date format');
    return { valid: false, error: 'Invalid date format' };
  }
  
  // 题量验证（必须与配置一致）
  const tq = Number(data.totalQuestions);
  if (!Number.isInteger(tq) || tq !== CONFIG.QUESTION_COUNT) {
    console.log('Unexpected totalQuestions:', data.totalQuestions, 'expected:', CONFIG.QUESTION_COUNT);
    return { valid: false, error: 'Unexpected totalQuestions' };
  }
  
  // 答案数组验证 - 检查是否为对象数组，且长度与题量一致
  if (!Array.isArray(data.answers) || data.answers.length !== tq) {
    console.log('Invalid answers array, length:', data.answers?.length, 'expected:', tq);
    return { valid: false, error: 'Invalid answers array' };
  }
  
  // 验证每个答案对象的结构
  for (let i = 0; i < data.answers.length; i++) {
    const answer = data.answers[i];
    console.log('Validating answer', i, ':', answer);
    if (!answer || typeof answer !== 'object') {
      console.log('Invalid answer object structure at index', i);
      return { valid: false, error: 'Invalid answer object structure' };
    }
    // 检查必需的字段
    if (typeof answer.questionIndex !== 'number' ||
        typeof answer.selectedAnswer !== 'string' ||
        typeof answer.correctAnswer !== 'string' ||
        typeof answer.isCorrect !== 'boolean' ||
        typeof answer.timestamp !== 'number') {
      console.log('Missing or invalid answer object fields at index', i);
      return { valid: false, error: 'Missing or invalid answer object fields' };
    }
  }
  
  // 时间验证
  if (typeof data.timeSpent !== 'number' || 
      data.timeSpent < CONFIG.MIN_TOTAL_TIME || 
      data.timeSpent > CONFIG.MAX_TOTAL_TIME) {
    console.log('Invalid total time:', data.timeSpent);
    return { valid: false, error: 'Invalid total time' };
  }
  
  // 每题时间验证（长度与题量一致）
  if (!Array.isArray(data.questionTimes) || data.questionTimes.length !== tq) {
    console.log('Invalid question times array, length:', data.questionTimes?.length, 'expected:', tq);
    return { valid: false, error: 'Invalid question times array' };
  }
  
  // 检查每题时间的合理性
  const invalidTimes = data.questionTimes.some(time => 
    typeof time !== 'number' || time < CONFIG.MIN_ANSWER_TIME || time > CONFIG.MAX_ANSWER_TIME
  );
  
  if (invalidTimes) {
    console.log('Invalid individual question times:', data.questionTimes);
    return { valid: false, error: 'Invalid individual question times' };
  }
  
  // 检查时间总和的一致性（允许 CONFIG.ALLOWED_TIME_DRIFT_SEC 秒误差）
  const totalQuestionTime = data.questionTimes.reduce((sum, time) => sum + time, 0);
  const drift = CONFIG.ALLOWED_TIME_DRIFT_SEC ?? 10;
  if (Math.abs(totalQuestionTime - data.timeSpent) > drift) {
    console.log('Time inconsistency detected (drift >', drift, 's). Total question time:', totalQuestionTime, 'Time spent:', data.timeSpent);
    return { valid: false, error: 'Time inconsistency detected' };
  }
  
  // 种子验证
  const expectedSeed = getDailySeed(data.date);
  if (data.seed !== expectedSeed) {
    console.log('Invalid seed. Expected:', expectedSeed, 'Got:', data.seed);
    return { valid: false, error: 'Invalid seed' };
  }
  
  console.log('Validation passed');
  return { valid: true };
}

// 速率限制检查
async function checkRateLimit(env, clientIP, windowSec = CONFIG.RATE_LIMIT_WINDOW, maxReq = CONFIG.RATE_LIMIT_MAX, scope = 'write') {
  console.log('checkRateLimit called for IP:', clientIP);
  
  try {
    const rateLimitKey = `rate_limit_${scope}_${clientIP}`;
    const currentTime = Math.floor(Date.now() / 1000);
    const windowStart = currentTime - windowSec;
    
    // 获取当前窗口内的请求记录
    const requestsData = await env.QUIZ_KV.get(rateLimitKey);
    let requests = requestsData ? JSON.parse(requestsData) : [];
    
    // 清理过期的请求记录
    requests = requests.filter(timestamp => timestamp > windowStart);
    
    // 检查是否超过限制
    if (requests.length >= maxReq) {
      return false;
    }
    
    // 添加当前请求
    requests.push(currentTime);
    await env.QUIZ_KV.put(rateLimitKey, JSON.stringify(requests), { expirationTtl: windowSec * 2 });
    
    return true;
  } catch (error) {
    console.error('Rate limit check error:', error);
    // 如果 KV 操作失败，允许请求通过（降级处理）
    return true;
  }
}

// 重新生成题目并验证答案（改为依据 answers 的一致算法，不做随机）
async function verifyAnswersAndCalculateScore(data, env) {
  try {
    console.log('verifyAnswersAndCalculateScore called with data:', JSON.stringify(data, null, 2));
    const totalQuestions = Number(data.totalQuestions);

    // 正确题数：以 isCorrect 为准（最小核验：字段齐全）
    const correctAnswers = Array.isArray(data.answers)
      ? data.answers.reduce((acc, ans) => acc + (ans && ans.isCorrect === true ? 1 : 0), 0)
      : 0;

    // 分数计算与前端一致
    const questionScore = Math.round((correctAnswers / totalQuestions) * 100);
    const timeScore = Math.round(Math.min(Math.max(100 + (totalQuestions * 7 - data.timeSpent) * 0.5, 0), 100));
    const finalScore = Math.round(questionScore * (5/6) + timeScore * (1/6));

    console.log('Score calculation:', { correctAnswers, questionScore, timeScore, finalScore });
    
    return {
      valid: true,
      correctAnswers,
      questionScore,
      timeScore,
      finalScore
    };
  } catch (error) {
    console.error('Error in verifyAnswersAndCalculateScore:', error);
    return { valid: false, error: 'Score calculation failed: ' + error.message };
  }
}

// 处理成绩提交
async function handleScoreSubmission(request, env) {
  try {
    console.log('handleScoreSubmission started');
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    console.log('Client IP:', clientIP);
    
    // 速率限制检查
    const rateLimitOk = await checkRateLimit(env, clientIP);
    if (!rateLimitOk) {
      console.log('Rate limit exceeded for IP:', clientIP);
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 解析请求数据
    const data = await request.json();
    console.log('Received data:', JSON.stringify(data, null, 2));
    
    // 数据验证
    const validation = validateSubmissionData(data);
    console.log('Validation result:', validation);
    if (!validation.valid) {
      console.log('Validation failed:', validation.error);
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 按 IP+日期计数的提交限制
    const ipCountKey = `ip_count_${clientIP}_${data.date}`;
    let currentCount = 0;
    try {
      const countStr = await env.QUIZ_KV.get(ipCountKey);
      currentCount = countStr ? parseInt(countStr, 10) : 0;
    } catch (error) {
      console.error('IP count get error:', error);
      currentCount = 0; // 降级
    }
    console.log('Current submission count for IP:', clientIP, 'on', data.date, 'is', currentCount);

    if (currentCount >= CONFIG.MAX_SUBMISSIONS_PER_IP) {
      console.log('IP already reached max submissions today:', clientIP);
      return new Response(JSON.stringify({ error: 'Already submitted today' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 验证答案并计算得分
    console.log('Starting score verification...');
    const scoreResult = await verifyAnswersAndCalculateScore(data, env);
    console.log('Score result:', scoreResult);
    if (!scoreResult.valid) {
      console.log('Score verification failed:', scoreResult.error);
      return new Response(JSON.stringify({ error: scoreResult.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 创建成绩记录
    const scoreEntry = {
      nickname: data.nickname.trim(),
      finalScore: scoreResult.finalScore,
      questionScore: scoreResult.questionScore,
      timeScore: scoreResult.timeScore,
      correctAnswers: scoreResult.correctAnswers,
      totalTime: data.timeSpent,
      timestamp: Date.now(),
      date: data.date
    };
    console.log('Created score entry:', scoreEntry);
    
    // 获取当日排行榜
    const leaderboardKey = `leaderboard_${data.date}`;
    console.log('Getting leaderboard with key:', leaderboardKey);
    
    let currentBoard = [];
    try {
      const currentBoardData = await env.QUIZ_KV.get(leaderboardKey);
      currentBoard = currentBoardData ? JSON.parse(currentBoardData) : [];
    } catch (error) {
      console.error('Leaderboard get error:', error);
      currentBoard = [];
    }
    console.log('Current board length:', currentBoard.length);
    
    // 添加新成绩并排序
    currentBoard.push(scoreEntry);
    currentBoard.sort((a, b) => {
      if (b.finalScore !== a.finalScore) {
        return b.finalScore - a.finalScore; // 按最终得分降序
      }
      return a.timestamp - b.timestamp; // 得分相同时按提交时间升序
    });
    
    // 限制排行榜长度（保留前100名）
    if (currentBoard.length > 100) {
      currentBoard = currentBoard.slice(0, 100);
    }
    
    // 保存排行榜（30天过期）
    console.log('Saving leaderboard with 30-day expiration');
    try {
      await env.QUIZ_KV.put(leaderboardKey, JSON.stringify(currentBoard), {
        expirationTtl: 30 * 24 * 3600 // 30天过期
      });
    } catch (error) {
      console.error('Leaderboard save error:', error);
    }
    
    // 递增计数并标记 TTL（24小时）
    console.log('Incrementing IP submission count');
    try {
      await env.QUIZ_KV.put(ipCountKey, String(currentCount + 1), { expirationTtl: 86400 });
    } catch (error) {
      console.error('IP submission count update error:', error);
      // 降级：不阻止响应返回
    }
    
    // 计算排名
    const rank = currentBoard.findIndex(entry => 
      entry.timestamp === scoreEntry.timestamp && 
      entry.nickname === scoreEntry.nickname
    ) + 1;
    
    return new Response(JSON.stringify({
      success: true,
      rank: rank,
      score: scoreResult.finalScore,
      totalEntries: currentBoard.length
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Score submission error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 处理排行榜查询
async function handleLeaderboard(request, env) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    const bust = url.searchParams.get('bust');
    
    // 日期格式验证
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 边缘缓存优先（bust 参数时跳过缓存）
    let cached = null;
    if (!bust) {
      cached = await caches.default.match(request);
    }
    if (cached) {
      // If-None-Match 支持（命中缓存时快速返回304）
      const incomingETag = request.headers.get('If-None-Match');
      const cachedETag = cached.headers.get('ETag');
      if (incomingETag && cachedETag && incomingETag === cachedETag) {
        return new Response(null, {
          status: 304,
          headers: {
            'ETag': cachedETag,
            'Cache-Control': cached.headers.get('Cache-Control') || 'public, max-age=300, stale-while-revalidate=120',
            'Content-Type': cached.headers.get('Content-Type') || 'application/json'
          }
        });
      }
      return new Response(cached.body, { status: cached.status, headers: cached.headers });
    }

    // 读取端限流
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateOk = await checkRateLimit(env, clientIP, CONFIG.READ_RATE_LIMIT_WINDOW, CONFIG.READ_RATE_LIMIT_MAX, 'read');
    if (!rateOk) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 读取数据
    const leaderboardKey = `leaderboard_${date}`;
    const boardData = await env.QUIZ_KV.get(leaderboardKey);
    const board = boardData ? JSON.parse(boardData) : [];

    // 公开字段
    const publicBoard = board.map((entry, index) => ({
      rank: index + 1,
      nickname: entry.nickname,
      finalScore: entry.finalScore,
      questionScore: entry.questionScore,
      timeScore: entry.timeScore,
      correctAnswers: entry.correctAnswers,
      totalTime: entry.totalTime,
      timestamp: entry.timestamp
    }));

    const body = JSON.stringify({
      date: date,
      leaderboard: publicBoard,
      totalEntries: publicBoard.length
    });

    // 生成 ETag（基于响应体）
    const hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
    const hashArr = Array.from(new Uint8Array(hashBuf));
    const hashHex = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
    const etag = `"sha256-${hashHex}"`;

    // 条件请求：If-None-Match（bust 时禁用 304）
    const incomingETag = request.headers.get('If-None-Match');
    if (!bust && incomingETag && incomingETag === etag) {
      return new Response(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=120',
          'Content-Type': 'application/json'
        }
      });
    }

    const response = new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': bust ? 'no-store' : 'public, max-age=300, stale-while-revalidate=120'
      }
    });
    response.headers.set('ETag', etag);

    // 写入边缘缓存（bust 时不写入）
    if (!bust) {
      await caches.default.put(request, response.clone());
    }
    return response;
  
  } catch (error) {
    console.error('Leaderboard query error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 主处理函数
export default {
  async fetch(request, env, ctx) {
    // CORS 处理
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    const url = new URL(request.url);
    
    try {
      let response;
      
      if (url.pathname === '/api/submit-score' && request.method === 'POST') {
        response = await handleScoreSubmission(request, env);
      } else if (url.pathname === '/api/leaderboard' && request.method === 'GET') {
        response = await handleLeaderboard(request, env);
      } else {
        response = new Response(JSON.stringify({ error: 'Not Found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 添加 CORS 头
      Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
      return response;
      
    } catch (error) {
      console.error('Worker error:', error);
      const errorResponse = new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
      
      Object.entries(corsHeaders).forEach(([key, value]) => {
        errorResponse.headers.set(key, value);
      });
      
      return errorResponse;
    }
  }
};
