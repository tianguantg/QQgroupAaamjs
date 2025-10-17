// Cloudflare Worker 脚本 - 每日挑战排行榜
// 重点防护：作弊检测、攻击防护、数据验证

// 配置常量
const CONFIG = {

  MAX_SUBMISSIONS_PER_IP: 1, // 每IP每日最大提交次数
  
  MAX_NICKNAME_LENGTH: 20,   // 昵称最大长度
  
  MIN_ANSWER_TIME: 1,        // 每题最小答题时间（秒）
  
  MAX_ANSWER_TIME: 300,      // 每题最大答题时间（秒）
  
  MAX_TOTAL_TIME: 7200,      // 总答题时间上限（秒）
  
  MIN_TOTAL_TIME: 20,        // 总答题时间下限（秒）
  
  QUESTION_COUNT: 15,        // 每日挑战题目数量 (nightmare 难度)
  
  RATE_LIMIT_WINDOW: 60,     // 速率限制窗口（秒）
  
  RATE_LIMIT_MAX: 10,        // 速率限制最大请求数
  
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
  
  // 昵称验证
  if (typeof data.nickname !== 'string' || data.nickname.length > CONFIG.MAX_NICKNAME_LENGTH) {
    console.log('Invalid nickname');
    return { valid: false, error: 'Invalid nickname' };
  }
  
  // 日期格式验证
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    console.log('Invalid date format');
    return { valid: false, error: 'Invalid date format' };
  }
  
  // 答案数组验证 - 检查是否为对象数组
  if (!Array.isArray(data.answers) || data.answers.length !== CONFIG.QUESTION_COUNT) {
    console.log('Invalid answers array, length:', data.answers?.length, 'expected:', CONFIG.QUESTION_COUNT);
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
  
  // 每题时间验证
  if (!Array.isArray(data.questionTimes) || data.questionTimes.length !== CONFIG.QUESTION_COUNT) {
    console.log('Invalid question times array, length:', data.questionTimes?.length, 'expected:', CONFIG.QUESTION_COUNT);
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
  
  // 检查时间总和的一致性（允许5秒误差）
  const totalQuestionTime = data.questionTimes.reduce((sum, time) => sum + time, 0);
  if (Math.abs(totalQuestionTime - data.timeSpent) > 5) {
    console.log('Time inconsistency detected. Total question time:', totalQuestionTime, 'Time spent:', data.timeSpent);
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
async function checkRateLimit(env, clientIP) {
  console.log('checkRateLimit called for IP:', clientIP);
  
  try {
    const rateLimitKey = `rate_limit_${clientIP}`;
    const currentTime = Math.floor(Date.now() / 1000);
    const windowStart = currentTime - CONFIG.RATE_LIMIT_WINDOW;
    
    // 获取当前窗口内的请求记录
    const requestsData = await env.QUIZ_KV.get(rateLimitKey);
    let requests = requestsData ? JSON.parse(requestsData) : [];
    
    // 清理过期的请求记录
    requests = requests.filter(timestamp => timestamp > windowStart);
    
    // 检查是否超过限制
    if (requests.length >= CONFIG.RATE_LIMIT_MAX) {
      return false;
    }
    
    // 添加当前请求
    requests.push(currentTime);
    await env.QUIZ_KV.put(rateLimitKey, JSON.stringify(requests), { expirationTtl: CONFIG.RATE_LIMIT_WINDOW * 2 });
    
    return true;
  } catch (error) {
    console.error('Rate limit check error:', error);
    // 如果 KV 操作失败，允许请求通过（降级处理）
    return true;
  }
}

// 重新生成题目并验证答案（简化版，实际需要完整的题目生成逻辑）
async function verifyAnswersAndCalculateScore(data, env) {
  // 这里需要实现与前端相同的题目生成逻辑
  // 由于题目生成逻辑复杂，这里提供框架
  
  try {
    console.log('verifyAnswersAndCalculateScore called with data:', JSON.stringify(data, null, 2));
    
    // 使用相同的种子重新生成题目
    const random = new SeededRandom(data.seed);
    
    // TODO: 实现完整的题目生成逻辑
    // 这里需要加载游戏数据并重新生成题目
    // 然后验证用户答案的正确性
    
    // 临时实现：假设验证通过，计算得分
    const correctAnswers = data.answers.filter((answer, index) => {
      // 这里应该是实际的答案验证逻辑
      // 临时使用随机验证
      return random.random() > 0.3; // 假设70%正确率
    }).length;
    
    console.log('Calculated correctAnswers:', correctAnswers);
    
    // 使用与前端相同的得分计算公式
    const questionScore = Math.round((correctAnswers / CONFIG.QUESTION_COUNT) * 100);
    const timeScore = Math.round(Math.min(Math.max(100 + (CONFIG.QUESTION_COUNT * 7 - data.timeSpent) * 0.5, 0), 100));
    const finalScore = Math.round(questionScore * (5/6) + timeScore * (1/6));
    
    console.log('Score calculation:', { questionScore, timeScore, finalScore });
    
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
    
    // 检查IP是否已提交
    const ipSubmissionKey = `ip_${clientIP}_${data.date}`;
    console.log('Checking IP submission key:', ipSubmissionKey);
    
    try {
      const hasSubmitted = await env.QUIZ_KV.get(ipSubmissionKey);
      if (hasSubmitted) {
        console.log('IP already submitted today:', clientIP);
        return new Response(JSON.stringify({ error: 'Already submitted today' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (error) {
      console.error('IP submission check error:', error);
      // 如果 KV 操作失败，继续处理请求（降级处理）
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
      // 如果 KV 操作失败，使用空数组（降级处理）
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
      // 如果保存失败，不影响响应返回
    }
    
    // 标记IP已提交
    console.log('Marking IP as submitted');
    try {
      await env.QUIZ_KV.put(ipSubmissionKey, JSON.stringify({
        nickname: data.nickname,
        score: scoreResult.finalScore,
        timestamp: Date.now()
      }), { expirationTtl: 86400 }); // 24小时过期
    } catch (error) {
      console.error('IP submission mark error:', error);
      // 如果标记失败，不影响响应返回
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
    
    // 日期格式验证
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const leaderboardKey = `leaderboard_${date}`;
    const boardData = await env.QUIZ_KV.get(leaderboardKey);
    const board = boardData ? JSON.parse(boardData) : [];
    
    // 只返回公开信息，隐藏敏感数据
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
    
    return new Response(JSON.stringify({
      date: date,
      leaderboard: publicBoard,
      totalEntries: publicBoard.length
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // 缓存5分钟
      }
    });
    
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