// Cloudflare Worker 脚本 - 每日挑战排行榜
// 重点防护：作弊检测、攻击防护、数据验证

// 配置常量
const CONFIG = {

  MAX_SUBMISSIONS_PER_IP: 5, // 每IP每日最大提交次数
  
  MAX_NICKNAME_LENGTH: 20,   // 昵称最大长度
  
  MIN_ANSWER_TIME: 0,        // 每题最小答题时间（秒）
  
  MAX_ANSWER_TIME: 300,      // 每题最大答题时间（秒）
  
  MAX_TOTAL_TIME: 7200,      // 总答题时间上限（秒）
  
  MIN_TOTAL_TIME: 20,        // 总答题时间下限（秒）
  
  QUESTION_COUNT: 20,         // 每日挑战题目数量（与前端噩梦模式一致）
  
  RATE_LIMIT_WINDOW: 60,     // 速率限制窗口（秒）
  
  RATE_LIMIT_MAX: 10,        // 速率限制最大请求数
  
  // 读取端限流（排行榜查询）
  READ_RATE_LIMIT_WINDOW: 60,        // 读取端限流窗口（秒）
  READ_RATE_LIMIT_MAX: 30,           // 读取端每IP最大请求数

  // 允许的时间漂移（秒）：sum(questionTimes) 与 timeSpent 的容忍误差
  ALLOWED_TIME_DRIFT_SEC: 15
  
};

// 新增：来源白名单与会话配置（保持免费前提下的高性价比防护）
const SECURITY = {
  ALLOWED_HOSTS: new Set([
    'aaamjs.asia',
    'aaamjs.dpdns.org',
    'localhost:5174', '127.0.0.1:5174',
    'localhost:5500', '127.0.0.1:5500',
    'localhost:8081', '127.0.0.1:8081'
  ]),
  SESSION_TTL_SEC: 3600, // 会话令牌有效期（秒）
  MAX_SESSIONS_PER_IP_PER_DAY: 5 // 每IP每日最多创建会话次数
};

function getHostFromOrigin(origin) {
  try {
    const u = new URL(origin);
    return u.host;
  } catch (_) {
    return '';
  }
}

function isAllowedRequestOrigin(request) {
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';
  const originHost = getHostFromOrigin(origin);
  const refererHost = getHostFromOrigin(referer);
  return SECURITY.ALLOWED_HOSTS.has(originHost) || SECURITY.ALLOWED_HOSTS.has(refererHost);
}

function buildCorsHeaders(request, forWrite = false) {
  const origin = request.headers.get('Origin') || '';
  const originHost = getHostFromOrigin(origin);
  const allowed = SECURITY.ALLOWED_HOSTS.has(originHost);
  const allowOrigin = forWrite ? (allowed ? origin : 'null') : (origin || '*');
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, cf-turnstile-response',
    'Vary': 'Origin'
  };
}

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

// Turnstile 验证（按需执行，使用 Cloudflare 官方验证接口）
async function verifyTurnstileToken(token, secret) {
  try {
    if (!secret || !token) return { success: false, error: 'Captcha required' };
    const form = new URLSearchParams();
    form.append('secret', secret);
    form.append('response', token);
    const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form
    });
    const data = await resp.json();
    return data && data.success ? { success: true } : { success: false, error: 'Captcha required' };
  } catch (e) {
    return { success: false, error: 'Captcha required' };
  }
}

// 简单启发式：当 UA 可疑或用时极短时启用人机验证（仅在配置了密钥时）
function shouldRequireCaptcha(request, data, env) {
  try {
    if (!env.TURNSTILE_SECRET) return false; // 未配置密钥则不强制
    const ua = request.headers.get('User-Agent') || '';
    const suspiciousUA = /(curl|wget|httpclient|python|bot|spider|crawler)/i.test(ua);
    const extremeFast = Number(data?.timeSpent) < 25 && Number(data?.totalQuestions) >= 15;
    return suspiciousUA || extremeFast;
  } catch (_) {
    return false;
  }
}

// 验证提交数据的完整性和合理性
function validateSubmissionData(data) {
  console.log('validateSubmissionData called with:', JSON.stringify(data, null, 2));
  
  // 基础字段检查
  if (!data.nickname || !data.date || !data.answers || !data.timeSpent || !data.questionTimes) {
    console.log('Missing required fields');
    return { valid: false, error: 'Missing required fields' };
  }
  
  // 新增：会话令牌字段（后续在 handleScoreSubmission 校验）
  if (!data.sessionId || typeof data.sessionId !== 'string' || data.sessionId.length < 16) {
    console.log('Missing or invalid sessionId');
    return { valid: false, error: 'Session required' };
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
  
  // 跳过每题时间总和与总时间的一致性检查（按当前需求关闭）
  
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
  console.log('Rate limit check called for IP:', clientIP);
  
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

// 会话创建与校验辅助
async function createSession(env, clientIP, dateStr) {
  // 每IP每日会话创建次数限制（防止频繁进入）
  const ipSessionKey = `ip_session_count_${clientIP}_${dateStr}`;
  let sessionCreateCount = 0;
  try {
    const val = await env.QUIZ_KV.get(ipSessionKey);
    sessionCreateCount = val ? parseInt(val, 10) : 0;
  } catch (_) { sessionCreateCount = 0; }
  if (sessionCreateCount >= SECURITY.MAX_SESSIONS_PER_IP_PER_DAY) {
    return { ok: false, error: 'Session limit exceeded' };
  }

  // 进入即消耗机会：按 IP+日期 计数
  const ipAttemptKey = `ip_attempt_${clientIP}_${dateStr}`;
  let attemptCount = 0;
  try {
    const val2 = await env.QUIZ_KV.get(ipAttemptKey);
    attemptCount = val2 ? parseInt(val2, 10) : 0;
  } catch (_) { attemptCount = 0; }
  if (attemptCount >= CONFIG.MAX_SUBMISSIONS_PER_IP) {
    return { ok: false, error: 'Already consumed today' };
  }

  // 生成令牌
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');

  const sessionKey = `session_${token}`;
  const now = Date.now();
  const record = { ip: clientIP, date: dateStr, createdAt: now, used: false, attemptConsumed: true };
  try {
    await env.QUIZ_KV.put(sessionKey, JSON.stringify(record), { expirationTtl: SECURITY.SESSION_TTL_SEC });
    await env.QUIZ_KV.put(ipSessionKey, String(sessionCreateCount + 1), { expirationTtl: 86400 });
    await env.QUIZ_KV.put(ipAttemptKey, String(attemptCount + 1), { expirationTtl: 86400 });
  } catch (error) {
    console.error('Create session error:', error);
    return { ok: false, error: 'Session create failed' };
  }
  return { ok: true, sessionId: token, record };
}

async function getSession(env, sessionId) {
  try {
    const data = await env.QUIZ_KV.get(`session_${sessionId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

async function markSessionUsed(env, sessionId) {
  try {
    const record = await getSession(env, sessionId);
    if (!record) return false;
    record.used = true;
    record.usedAt = Date.now();
    await env.QUIZ_KV.put(`session_${sessionId}`, JSON.stringify(record), { expirationTtl: SECURITY.SESSION_TTL_SEC });
    return true;
  } catch (error) {
    console.error('Mark session used error:', error);
    return false;
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

// 处理会话创建
async function handleSessionStart(request, env) {
  try {
    // 写端必须来源白名单
    if (!isAllowedRequestOrigin(request)) {
      return new Response(JSON.stringify({ error: 'Forbidden origin' }), { status: 403, headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) } });
    }

    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

    // 速率限制（写端）
    const rateOk = await checkRateLimit(env, clientIP);
    if (!rateOk) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429, headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) } });
    }

    const body = await request.json().catch(() => ({}));
    const dateStr = body?.date && /^\d{4}-\d{2}-\d{2}$/.test(body.date)
      ? body.date
      : new Date().toISOString().split('T')[0];

    const { ok, error, sessionId } = await createSession(env, clientIP, dateStr);
    if (!ok) {
      return new Response(JSON.stringify({ error }), { status: 400, headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) } });
    }

    return new Response(JSON.stringify({ success: true, sessionId, date: dateStr }), {
      headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
    });
  } catch (error) {
    console.error('Session start error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) } });
  }
}

// 处理成绩提交
async function handleScoreSubmission(request, env) {
  try {
    console.log('handleScoreSubmission started');
    
    // 写端必须来源白名单
    if (!isAllowedRequestOrigin(request)) {
      console.log('Forbidden origin for write');
      return new Response(JSON.stringify({ error: 'Forbidden origin' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
      });
    }

    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    console.log('Client IP:', clientIP);
    
    // 速率限制检查
    const rateLimitOk = await checkRateLimit(env, clientIP);
    if (!rateLimitOk) {
      console.log('Rate limit exceeded for IP:', clientIP);
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
      });
    }
    
    // 解析请求数据
    const data = await request.json();
    console.log('Received data:', JSON.stringify(data, null, 2));
    
    // 数据验证（包含 sessionId 存在性）
    const validation = validateSubmissionData(data);
    console.log('Validation result:', validation);
    if (!validation.valid) {
      console.log('Validation failed:', validation.error);
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
      });
    }

    // 人机验证（按需触发，仅当启发式判定需要时）
    try {
      const requireCaptcha = shouldRequireCaptcha(request, data, env);
      if (requireCaptcha) {
        const token = request.headers.get('cf-turnstile-response') || '';
        if (!token) {
          console.log('Captcha required but token missing');
          return new Response(JSON.stringify({ error: 'Captcha required' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
          });
        }
        const secret = env.TURNSTILE_SECRET;
        const verify = await verifyTurnstileToken(token, secret);
        if (!verify.success) {
          console.log('Captcha verification failed');
          return new Response(JSON.stringify({ error: verify.error || 'Captcha required' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
          });
        }
      }
    } catch (e) {
      console.error('Captcha flow error:', e);
      return new Response(JSON.stringify({ error: 'Captcha required' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
      });
    }

    // 校验会话令牌与绑定
    const session = await getSession(env, data.sessionId);
    if (!session) {
      console.log('Invalid session');
      return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 400, headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) } });
    }
    if (session.used) {
      console.log('Session already used');
      return new Response(JSON.stringify({ error: 'Session used' }), { status: 400, headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) } });
    }
    const dateStr = data.date;
    if (session.ip !== clientIP || session.date !== dateStr) {
      console.log('Session binding mismatch', { session, clientIP, dateStr });
      return new Response(JSON.stringify({ error: 'Session mismatch' }), { status: 400, headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) } });
    }

    // 宽容的时间相关校验（仅记录不拒绝）
    const elapsedSec = Math.max(0, Math.floor((Date.now() - (session.createdAt || Date.now())) / 1000));
    const driftSec = elapsedSec - data.timeSpent;
    console.log('Time correlation (serverElapsed - clientTimeSpent):', { elapsedSec, clientTimeSpent: data.timeSpent, driftSec });
    // 不拒绝，仅用于后续行为分析或调整策略

    // 进入即消耗已在会话创建阶段完成；提交端不再按IP限制
    // 保留既有会话绑定与一次性提交校验（session.used）
    
    // 验证答案并计算得分
    console.log('Starting score verification...');
    const scoreResult = await verifyAnswersAndCalculateScore(data, env);
    console.log('Score result:', scoreResult);
    if (!scoreResult.valid) {
      console.log('Score verification failed:', scoreResult.error);
      return new Response(JSON.stringify({ error: scoreResult.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
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
    
    // 已移除：Top1 快照与历史持久化（改用 Top3 查询）
    try {
      // no-op
    } catch (error) {
      // no-op
    }
    
    // 将更新后的排行榜写回 KV（TTL 对齐至上海午夜）
    try {
      const ttlSec = getSecondsUntilMidnightShanghai();
      await env.QUIZ_KV.put(leaderboardKey, JSON.stringify(currentBoard), { expirationTtl: ttlSec });
    } catch (error) {
      console.error('Leaderboard put error:', error);
      // 写入失败不影响用户拿到提交结果，避免交互被阻断
    }
    
    // 按新规则：不再在提交端递增 IP 提交计数

    // 标记会话已使用
    await markSessionUsed(env, data.sessionId);
    
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
      headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
    });
    
  } catch (error) {
    console.error('Score submission error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, true) }
    });
  }
}

// 读取当日剩余机会（READ端，允许公共读取）
async function handleAttemptStatus(request, env) {
  try {
    const url = new URL(request.url);
    const dateStr = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
      });
    }
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateOk = await checkRateLimit(env, clientIP, CONFIG.READ_RATE_LIMIT_WINDOW, CONFIG.READ_RATE_LIMIT_MAX, 'read');
    if (!rateOk) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
      });
    }
    const ipAttemptKey = `ip_attempt_${clientIP}_${dateStr}`;
    let attemptCount = 0;
    try {
      const val = await env.QUIZ_KV.get(ipAttemptKey);
      attemptCount = val ? parseInt(val, 10) : 0;
    } catch (_) { attemptCount = 0; }
    const remaining = Math.max(0, CONFIG.MAX_SUBMISSIONS_PER_IP - attemptCount);
    const ttlSec = 60; // 尝试状态短缓存，减少读取成本
    return new Response(JSON.stringify({ success: true, date: dateStr, remaining, max: CONFIG.MAX_SUBMISSIONS_PER_IP }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': `private, max-age=${ttlSec}` , ...buildCorsHeaders(request, false) }
    });
  } catch (error) {
    console.error('Attempt status error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
    });
  }
}

// 计算到上海时区下一次午夜的剩余秒数
function getSecondsUntilMidnightShanghai() {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Shanghai',
      hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(new Date());
    const get = (t) => Number(parts.find(p => p.type === t)?.value || 0);
    const h = get('hour');
    const m = get('minute');
    const s = get('second');
    const elapsed = h * 3600 + m * 60 + s;
    const remaining = Math.max(1, 86400 - elapsed);
    return remaining;
  } catch (_) {
    // 环境不支持Intl或异常时回退到5分钟
    return 300;
  }
}

// 处理排行榜查询（缓存TTL对齐至上海午夜）
async function handleLeaderboard(request, env) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    const bust = url.searchParams.get('bust');
    
    // 日期格式验证
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
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
        const ttlSec = getSecondsUntilMidnightShanghai();
        return new Response(null, {
          status: 304,
          headers: {
            'ETag': cachedETag,
            'Cache-Control': `public, max-age=${ttlSec}, stale-while-revalidate=120`,
            'Content-Type': cached.headers.get('Content-Type') || 'application/json',
            ...buildCorsHeaders(request, false)
          }
        });
      }
      // 检查缓存内容：空榜与过旧数据不直接使用缓存，避免整天显示为空或长期不更新
      try {
        const cachedText = await cached.clone().text();
        const cachedJson = JSON.parse(cachedText);
        const hasEntries = Array.isArray(cachedJson?.leaderboard) && cachedJson.leaderboard.length > 0;
        let latestTs = 0;
        if (hasEntries) {
          for (const e of cachedJson.leaderboard) {
            const ts = typeof e.timestamp === 'number' ? e.timestamp : (typeof e.timestamp === 'string' ? parseInt(e.timestamp, 10) : 0);
            if (!Number.isNaN(ts) && ts > latestTs) latestTs = ts;
          }
        }
        const isStale = hasEntries && latestTs > 0 && ((Date.now() - latestTs) / 1000) > 900; // 15分钟视为过旧
        if (hasEntries && !isStale) {
          // 使用非空且不旧的缓存（补充CORS头）
          return new Response(cachedText, {
            status: cached.status,
            headers: { ...Object.fromEntries(cached.headers), ...buildCorsHeaders(request, false) }
          });
        }
        // 空榜或过旧缓存则继续向下读取 KV，获取最新数据
      } catch (_) {
        // 解析失败，继续向下读取 KV
      }
    }
  
    // 读取端限流
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateOk = await checkRateLimit(env, clientIP, CONFIG.READ_RATE_LIMIT_WINDOW, CONFIG.READ_RATE_LIMIT_MAX, 'read');
    if (!rateOk) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
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
      const ttlSec = getSecondsUntilMidnightShanghai();
      return new Response(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': `public, max-age=${ttlSec}, stale-while-revalidate=120`,
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request, false)
        }
      });
    }

    const ttlSec = getSecondsUntilMidnightShanghai();
    const shouldCache = !bust && publicBoard.length > 0;
    const response = new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': shouldCache ? `public, max-age=${ttlSec}, stale-while-revalidate=120` : 'no-store',
        ...buildCorsHeaders(request, false)
      }
    });
    response.headers.set('ETag', etag);

    // 写入边缘缓存（仅非空榜且未 bust）
    if (shouldCache) {
      await caches.default.put(request, response.clone());
    }
    return response;
  
  } catch (error) {
    console.error('Leaderboard query error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
    });
  }
}

// 查询指定日期的TopK（默认3），统一缓存策略：边缘缓存、ETag、TTL至上海午夜
async function handleTop3(request, env) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    const limitParam = parseInt(url.searchParams.get('limit') || '3', 10);
    const limit = Math.min(Math.max(limitParam, 1), 10);
    const bust = url.searchParams.get('bust');

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Response(JSON.stringify({ error: 'Invalid date format, expected YYYY-MM-DD' }), { status: 400, headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) } });
    }

    // 边缘缓存优先（bust 参数时跳过缓存）
    let cached = null;
    if (!bust) {
      cached = await caches.default.match(request);
    }
    if (cached) {
      const incomingETag = request.headers.get('If-None-Match');
      const cachedETag = cached.headers.get('ETag');
      if (incomingETag && cachedETag && incomingETag === cachedETag) {
        const ttlSec = getSecondsUntilMidnightShanghai();
        return new Response(null, {
          status: 304,
          headers: {
            'ETag': cachedETag,
            'Cache-Control': `public, max-age=${ttlSec}, stale-while-revalidate=120`,
            'Content-Type': cached.headers.get('Content-Type') || 'application/json',
            ...buildCorsHeaders(request, false)
          }
        });
      }
      // 非空且不旧的缓存直接返回
      try {
        const cachedText = await cached.clone().text();
        const cachedJson = JSON.parse(cachedText);
        const topsArr = Array.isArray(cachedJson?.tops) ? cachedJson.tops : [];
        const hasEntries = topsArr.length > 0;
        let latestTs = 0;
        if (hasEntries) {
          for (const e of topsArr) {
            const ts = typeof e.timestamp === 'number' ? e.timestamp : (typeof e.timestamp === 'string' ? parseInt(e.timestamp, 10) : 0);
            if (!Number.isNaN(ts) && ts > latestTs) latestTs = ts;
          }
        }
        const isStale = hasEntries && latestTs > 0 && ((Date.now() - latestTs) / 1000) > 900; // 15分钟视为过旧
        if (hasEntries && !isStale) {
          return new Response(cachedText, { status: cached.status, headers: { ...Object.fromEntries(cached.headers), ...buildCorsHeaders(request, false) } });
        }
      } catch (_) {}
    }

    // 读取端限流（统一使用 CONFIG 的读取限流）
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateOk = await checkRateLimit(env, clientIP, CONFIG.READ_RATE_LIMIT_WINDOW, CONFIG.READ_RATE_LIMIT_MAX, 'read');
    if (!rateOk) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
      });
    }

    // 读取并裁剪 TopK
    const raw = await env.QUIZ_KV.get(`leaderboard_${date}`);
    const board = raw ? JSON.parse(raw) : [];
    const tops = board.slice(0, limit).map((entry, idx) => ({
      rank: idx + 1,
      nickname: entry.nickname,
      finalScore: entry.finalScore,
      questionScore: entry.questionScore,
      timeScore: entry.timeScore,
      correctAnswers: entry.correctAnswers,
      totalTime: entry.totalTime,
      timestamp: entry.timestamp
    }));

    const body = JSON.stringify({ date, limit, tops });

    // 生成 ETag（基于响应体）
    const hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
    const hashArr = Array.from(new Uint8Array(hashBuf));
    const hashHex = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
    const etag = `"sha256-${hashHex}"`;

    // 条件请求：If-None-Match（bust 时禁用 304）
    const incomingETag = request.headers.get('If-None-Match');
    if (!bust && incomingETag && incomingETag === etag) {
      const ttlSec = getSecondsUntilMidnightShanghai();
      return new Response(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': `public, max-age=${ttlSec}, stale-while-revalidate=120`,
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request, false)
        }
      });
    }

    const ttlSec = getSecondsUntilMidnightShanghai();
    const shouldCache = !bust && tops.length > 0;
    const response = new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': shouldCache ? `public, max-age=${ttlSec}, stale-while-revalidate=120` : 'no-store',
        ...buildCorsHeaders(request, false)
      }
    });
    response.headers.set('ETag', etag);

    // 写入边缘缓存（仅非空且未 bust）
    if (shouldCache) {
      await caches.default.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('handleTop3 error:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) } });
  }
}

function formatShanghaiYMD(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(date);
  const get = (t) => parts.find(p => p.type === t)?.value || '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

// 最近N天（不含今天）每日TopK，统一缓存策略：边缘缓存、ETag、TTL至上海午夜
async function handleTopHistory(request, env) {
  try {
    const url = new URL(request.url);
    const daysParam = parseInt(url.searchParams.get('days') || '7', 10);
    const limitParam = parseInt(url.searchParams.get('limit') || '3', 10);
    const days = Math.min(Math.max(daysParam, 1), 30);
    const limit = Math.min(Math.max(limitParam, 1), 10);
    const bust = url.searchParams.get('bust');

    // 边缘缓存优先（bust 参数时跳过缓存）
    let cached = null;
    if (!bust) {
      cached = await caches.default.match(request);
    }
    if (cached) {
      const incomingETag = request.headers.get('If-None-Match');
      const cachedETag = cached.headers.get('ETag');
      if (incomingETag && cachedETag && incomingETag === cachedETag) {
        const ttlSec = getSecondsUntilMidnightShanghai();
        return new Response(null, {
          status: 304,
          headers: {
            'ETag': cachedETag,
            'Cache-Control': `public, max-age=${ttlSec}, stale-while-revalidate=120`,
            'Content-Type': cached.headers.get('Content-Type') || 'application/json',
            ...buildCorsHeaders(request, false)
          }
        });
      }
      try {
        const cachedText = await cached.clone().text();
        const cachedJson = JSON.parse(cachedText);
        const itemsArr = Array.isArray(cachedJson?.items) ? cachedJson.items : [];
        const hasEntries = itemsArr.some(it => Array.isArray(it.tops) && it.tops.length > 0);
        let latestTs = 0;
        for (const it of itemsArr) {
          if (Array.isArray(it.tops)) {
            for (const e of it.tops) {
              const ts = typeof e.timestamp === 'number' ? e.timestamp : (typeof e.timestamp === 'string' ? parseInt(e.timestamp, 10) : 0);
              if (!Number.isNaN(ts) && ts > latestTs) latestTs = ts;
            }
          }
        }
        const isStale = hasEntries && latestTs > 0 && ((Date.now() - latestTs) / 1000) > 900;
        if (hasEntries && !isStale) {
          return new Response(cachedText, { status: cached.status, headers: { ...Object.fromEntries(cached.headers), ...buildCorsHeaders(request, false) } });
        }
      } catch (_) {}
    }

    // 读取端限流
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateOk = await checkRateLimit(env, clientIP, CONFIG.READ_RATE_LIMIT_WINDOW, CONFIG.READ_RATE_LIMIT_MAX, 'read');
    if (!rateOk) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
      });
    }

    const includeTodayParam = url.searchParams.get('includeToday') || '0';
    const includeToday = includeTodayParam === '1' || includeTodayParam.toLowerCase() === 'true';
    const now = new Date();
    const items = [];
    const startOffset = includeToday ? 0 : 1;
    for (let offset = startOffset; offset < startOffset + days; offset++) {
      const d = new Date(now.getTime() - offset * 24 * 3600 * 1000);
      const dateStr = formatShanghaiYMD(d);
      const raw = await env.QUIZ_KV.get(`leaderboard_${dateStr}`);
      const board = raw ? JSON.parse(raw) : [];
      const tops = board.slice(0, limit).map((entry, idx) => ({
        rank: idx + 1,
        nickname: entry.nickname,
        finalScore: entry.finalScore,
        questionScore: entry.questionScore,
        timeScore: entry.timeScore,
        correctAnswers: entry.correctAnswers,
        totalTime: entry.totalTime,
        timestamp: entry.timestamp
      }));
      // 仅收集有数据的日期，避免空项
      if (tops.length > 0) {
        items.push({ date: dateStr, tops });
      }
    }

    const body = JSON.stringify({ tz: 'Asia/Shanghai', days, limit, items });

    // 生成 ETag（基于响应体）
    const hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
    const hashArr = Array.from(new Uint8Array(hashBuf));
    const hashHex = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
    const etag = `"sha256-${hashHex}"`;

    // 条件请求：If-None-Match（bust 时禁用 304）
    const incomingETag = request.headers.get('If-None-Match');
    if (!bust && incomingETag && incomingETag === etag) {
      const ttlSec = getSecondsUntilMidnightShanghai();
      return new Response(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': `public, max-age=${ttlSec}, stale-while-revalidate=120`,
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request, false)
        }
      });
    }

    const ttlSec = getSecondsUntilMidnightShanghai();
    const shouldCache = !bust && items.length > 0;
    const response = new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': shouldCache ? `public, max-age=${ttlSec}, stale-while-revalidate=120` : 'no-store',
        ...buildCorsHeaders(request, false)
      }
    });
    response.headers.set('ETag', etag);

    // 写入边缘缓存（仅非空且未 bust）
    if (shouldCache) {
      await caches.default.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Top history query error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
    });
  }
}

// 聚合排行榜查询（跨所有日期），统一缓存策略：边缘缓存、ETag、TTL至上海午夜
async function handleLeaderboardAggregate(request, env) {
  try {
    const url = new URL(request.url);
    const bust = url.searchParams.get('bust');
    const limitParam = parseInt(url.searchParams.get('limit') || '100', 10);
    const limit = Math.min(Math.max(limitParam, 1), 1000);

    // 边缘缓存优先（bust 参数时跳过缓存）
    let cached = null;
    if (!bust) {
      cached = await caches.default.match(request);
    }
    if (cached) {
      const incomingETag = request.headers.get('If-None-Match');
      const cachedETag = cached.headers.get('ETag');
      if (incomingETag && cachedETag && incomingETag === cachedETag) {
        const ttlSec = getSecondsUntilMidnightShanghai();
        return new Response(null, {
          status: 304,
          headers: {
            'ETag': cachedETag,
            'Cache-Control': `public, max-age=${ttlSec}, stale-while-revalidate=120`,
            'Content-Type': cached.headers.get('Content-Type') || 'application/json',
            ...buildCorsHeaders(request, false)
          }
        });
      }
      try {
        const cachedText = await cached.clone().text();
        const cachedJson = JSON.parse(cachedText);
        const hasEntries = Array.isArray(cachedJson?.leaderboard) && cachedJson.leaderboard.length > 0;
        if (hasEntries) {
          return new Response(cachedText, { status: cached.status, headers: { ...Object.fromEntries(cached.headers), ...buildCorsHeaders(request, false) } });
        }
      } catch (_) {}
    }

    // 读取端限流
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateOk = await checkRateLimit(env, clientIP, CONFIG.READ_RATE_LIMIT_WINDOW, CONFIG.READ_RATE_LIMIT_MAX, 'read');
    if (!rateOk) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
      });
    }

    // 枚举全部 leaderboard_YYYY-MM-DD 的KV键并聚合
    const aggregated = [];
    let cursor = undefined;
    let pageCount = 0;
    while (true) {
      const listResult = await env.QUIZ_KV.list({ prefix: 'leaderboard_', cursor });
      pageCount++;
      for (const k of listResult.keys || []) {
        try {
          const data = await env.QUIZ_KV.get(k.name);
          if (data) {
            const board = JSON.parse(data);
            if (Array.isArray(board)) {
              for (const entry of board) {
                aggregated.push({
                  nickname: entry.nickname,
                  finalScore: entry.finalScore,
                  questionScore: entry.questionScore,
                  timeScore: entry.timeScore,
                  correctAnswers: entry.correctAnswers,
                  totalTime: entry.totalTime,
                  timestamp: entry.timestamp,
                  date: entry.date
                });
              }
            }
          }
        } catch (_) {}
      }
      if (listResult.list_complete || !listResult.cursor) break;
      cursor = listResult.cursor;
      if (pageCount > 50) break; // 安全阈值，避免极端情况下长时间遍历
    }

    aggregated.sort((a, b) => {
      if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
      return a.timestamp - b.timestamp;
    });

    const publicBoard = aggregated.slice(0, limit).map((entry, index) => ({
      rank: index + 1,
      nickname: entry.nickname,
      finalScore: entry.finalScore,
      questionScore: entry.questionScore,
      timeScore: entry.timeScore,
      correctAnswers: entry.correctAnswers,
      totalTime: entry.totalTime,
      timestamp: entry.timestamp,
      date: entry.date
    }));

    const body = JSON.stringify({
      leaderboard: publicBoard,
      totalEntries: aggregated.length
    });

    const hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
    const hashArr = Array.from(new Uint8Array(hashBuf));
    const hashHex = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
    const etag = `"sha256-${hashHex}"`;

    const incomingETag = request.headers.get('If-None-Match');
    if (!bust && incomingETag && incomingETag === etag) {
      const ttlSec = getSecondsUntilMidnightShanghai();
      return new Response(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': `public, max-age=${ttlSec}, stale-while-revalidate=120`,
          'Content-Type': 'application/json',
          ...buildCorsHeaders(request, false)
        }
      });
    }

    const ttlSec = getSecondsUntilMidnightShanghai();
    const shouldCache = !bust && publicBoard.length > 0;
    const response = new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': shouldCache ? `public, max-age=${ttlSec}, stale-while-revalidate=120` : 'no-store',
        ...buildCorsHeaders(request, false)
      }
    });
    response.headers.set('ETag', etag);

    if (shouldCache) {
      await caches.default.put(request, response.clone());
    }
    return response;

  } catch (error) {
    console.error('Leaderboard aggregate error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...buildCorsHeaders(request, false) }
    });
  }
}

// 主处理函数
export default {
  async fetch(request, env, ctx) {
    // 动态 CORS（依请求来源与写/读场景决定）
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);

    // 预检请求处理（OPTIONS）
    if (request.method === 'OPTIONS') {
      const reqMethod = request.headers.get('Access-Control-Request-Method') || 'GET';
      const forWrite = reqMethod.toUpperCase() === 'POST';
      const corsHeaders = buildCorsHeaders(request, forWrite);
      // 对写端的非法来源直接拒绝
      if (forWrite && !isAllowedRequestOrigin(request)) {
        return new Response(null, { status: 403, headers: corsHeaders });
      }
      return new Response(null, { headers: corsHeaders });
    }
    
    try {
      let response;
      
      if (url.pathname === '/api/submit-score' && request.method === 'POST') {
        response = await handleScoreSubmission(request, env);
      } else if (url.pathname === '/api/leaderboard' && request.method === 'GET') {
        response = await handleLeaderboard(request, env);
      } else if (url.pathname === '/api/leaderboard/aggregate' && request.method === 'GET') {
        response = await handleLeaderboardAggregate(request, env);
      } else if (url.pathname === '/api/top3' && request.method === 'GET') {
        response = await handleTop3(request, env);
      } else if (url.pathname === '/api/top3/history' && request.method === 'GET') {
        response = await handleTopHistory(request, env);
      } else if (url.pathname === '/api/session/start' && request.method === 'POST') {
        response = await handleSessionStart(request, env);
      } else if (url.pathname === '/api/attempt/status' && request.method === 'GET') {
        response = await handleAttemptStatus(request, env);
      } else {
        response = new Response(JSON.stringify({ error: 'Not Found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 添加 CORS 头（依据场景动态）
      const forWrite = request.method === 'POST';
      const corsHeaders = buildCorsHeaders(request, forWrite);
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
      const forWrite = request.method === 'POST';
      const corsHeaders = buildCorsHeaders(request, forWrite);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        errorResponse.headers.set(key, value);
      });
      return errorResponse;
    }
  }
};
