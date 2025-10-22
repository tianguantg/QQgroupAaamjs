/**
 * Quiz JavaScript 代码
 * 从 quiz.html 自动提取生成
 * 生成时间: 2025-09-27 02:48:26.643385
 */

// ========== Script Block 1 ==========
// 主题预加载，保持与 index.html 一致，避免暗色主题闪烁
    (function() {
      const savedTheme = localStorage.getItem('selectedTheme');
      if (savedTheme && savedTheme !== 'default') {
        if (savedTheme === 'dark') {
          const style = document.createElement('style');
          style.innerHTML = `
            :root {
              --color-primary: #2d3748;
              --color-primary-dark: #1a202c;
              --color-secondary: #4a5568;
              --color-secondary-dark: #2d3748;
              --color-accent: #1a365d;
              --color-accent-dark: #2c5282;
              --theme-bg-gradient: radial-gradient(circle at 20% 20%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 80% 80%, var(--color-secondary) 0%, transparent 50%), radial-gradient(circle at 40% 60%, var(--color-primary-dark) 0%, transparent 50%), radial-gradient(circle at 70% 30%, var(--color-secondary-dark) 0%, transparent 50%), radial-gradient(circle at 30% 70%, var(--color-accent) 0%, transparent 50%), radial-gradient(circle at 60% 40%, var(--color-accent-dark) 0%, transparent 50%), linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 25%, var(--color-secondary) 50%, var(--color-secondary-dark) 75%, var(--color-accent) 100%);
              --theme-bg-overlay: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0.5px, transparent 0.5px), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
              --theme-bg-secondary: linear-gradient(135deg, #16213e 0%, #0f3460 50%, #1a1a2e 100%);
              --theme-card-bg: rgba(40, 40, 40, 0.8);
              --theme-card-bg-hover: rgba(60, 60, 60, 0.9);
              --theme-btn-gradient: linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%);
              --theme-btn-gradient-hover: linear-gradient(135deg, #4b5563 0%, #374151 50%, #1f2937 100%);
              --theme-border-gradient: linear-gradient(45deg, #5a6fd8, #6b4190, #e081e9, #e3456a, #3d9aec, #00e0ec);
              --theme-tag-bg: rgba(90, 111, 216, 0.15);
              --theme-tag-bg-hover: rgba(160, 200, 180, 0.8);
              --color-text-primary: #f0f0f0;
              --color-text-secondary: #e0e0e0;
              --color-text-muted: #d0d0d0;
              --color-text-light: #808080;
              --color-text-white: #ffffff;
              --color-text-black: #e0e0e0;
              --color-text-dark: #c0c0c0;
              --color-text-info: #7c8ef0;
              --color-text-success: #4caf50;
              --color-text-error: #f44336;
              --color-text-warning: #ff6b6b;
              --color-text-link: #64b5f6;
              --color-bg-white: rgba(40, 40, 40, 0.9);
              --color-bg-light: rgba(60, 60, 60, 0.9);
              --color-bg-success: rgba(76, 175, 80, 0.2);
              --color-bg-error: rgba(244, 67, 54, 0.2);
              --color-bg-info: rgba(90, 111, 216, 0.2);
              --color-border-success: rgba(76, 175, 80, 0.4);
              --color-border-error: rgba(244, 67, 54, 0.4);
              --color-border-info: rgba(90, 111, 216, 0.4);
              --color-success: #4caf50;
              --color-error: #f44336;
              --color-warning: #ff6b6b;
              --theme-tag-gradient-1: linear-gradient(135deg, rgba(144, 164, 247, 0.15), rgba(107, 65, 144, 0.15));
              --theme-tag-gradient-2: linear-gradient(135deg, rgba(224, 129, 233, 0.15), rgba(227, 69, 106, 0.15));
              --theme-tag-gradient-3: linear-gradient(135deg, rgba(61, 154, 236, 0.15), rgba(0, 224, 236, 0.15));
              --announcement-bg-dark: rgba(50, 50, 50, 0.8);
              --announcement-border-dark: rgba(90, 111, 216, 0.3);
              --announcement-title-color-dark: #f0f0f0;
              --announcement-content-color-dark: #e0e0e0;
              --relation-header-bg: rgba(40, 40, 40, 0.8);
              --relation-header-border: rgba(90, 111, 216, 0.3);
              --relation-graph-bg: rgba(30, 30, 30, 0.9);
              --relation-note-bg: rgba(50, 50, 50, 0.9);
              --relation-note-border: rgba(90, 111, 216, 0.4);
              --relation-note-color: #9ca3af;
              --relation-legend-text-color: #e0e0e0;
              --relation-preview-label-color: #e0e0e0;
            }
          `;
          document.head.appendChild(style);
        }
      }
    })();

    // 反馈回复功能
    (function() {
      let feedbackData = [];
      let lastModified = '';

      // 从JSON文件加载反馈数据
      async function loadFeedbackData() {
        try {
          const response = await fetch('assets/creater_data/feedbackData.json');
          if (!response.ok) {
            throw new Error('Failed to load feedback data');
          }
          
          // 获取文件的最后修改时间
          const lastModifiedHeader = response.headers.get('Last-Modified');
          if (lastModifiedHeader) {
            const date = new Date(lastModifiedHeader);
            lastModified = date.toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(/\//g, '/');
          } else {
            // 如果没有Last-Modified头，使用当前时间
            lastModified = new Date().toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(/\//g, '/');
          }
          
          feedbackData = await response.json();
        } catch (error) {
          console.error('Error loading feedback data:', error);
          // 使用默认数据作为后备
          feedbackData = [
            {
              id: 2,
              nickname: "qwer一套连",
              problem: "技巧题中描述问题，[凛]的主动技能必须要求卡牌使用前，怪物标记层数≥3才能触发。这是凛的卡牌活体书页的效果，不是凛的主动技能",
              reply: "好的，已经修改了"
            },
            {
              id: 1,
              nickname: "千里终始",
              problem: "噩梦难度答对一道题之后就结算了",
              reply: "暂时没遇见，不知道什么原因，还有人遇到过这个问题吗？"
            }
          ];
          lastModified = '2025/9/27 21:33';
        }
      }

      // 显示反馈回复弹窗
      async function showFeedbackReply() {
        // 确保数据已加载
        if (feedbackData.length === 0) {
          await loadFeedbackData();
        }
        
        const modal = document.getElementById('feedbackReplyModal');
        const feedbackList = document.getElementById('feedbackList');
        const updateTimeElement = document.querySelector('.feedback-update-time small');
        
        // 更新时间显示
        if (updateTimeElement) {
          updateTimeElement.textContent = `更新时间：${lastModified}`;
        }
        
        // 清空现有内容
        feedbackList.innerHTML = '';
        
        // 生成反馈列表HTML
        feedbackData.forEach((feedback, index) => {
          const feedbackItem = document.createElement('div');
          feedbackItem.className = 'feedback-item';
          feedbackItem.innerHTML = `
            <div class="feedback-header">
              <strong>反馈 ${feedback.id}</strong>
              <span class="feedback-nickname">昵称：${feedback.nickname}</span>
            </div>
            <div class="feedback-problem">
              <strong>问题：</strong>${feedback.problem}
            </div>
            <div class="feedback-reply">
              <strong>回复：</strong>${feedback.reply}
            </div>
          `;
          feedbackList.appendChild(feedbackItem);
          
          // 添加分隔线（除了最后一个）
          if (index < feedbackData.length - 1) {
            const separator = document.createElement('div');
            separator.className = 'feedback-separator';
            feedbackList.appendChild(separator);
          }
        });
        
        modal.style.display = 'block';
      }

      // 隐藏反馈回复弹窗
      function hideFeedbackReply() {
        const modal = document.getElementById('feedbackReplyModal');
        modal.style.display = 'none';
      }

      // 绑定事件监听器的函数
      function bindFeedbackEvents() {
        const feedbackReplyBtn = document.getElementById('feedbackReplyBtn');
        const closeFeedbackReply = document.getElementById('closeFeedbackReply');
        const modal = document.getElementById('feedbackReplyModal');

        if (feedbackReplyBtn && !feedbackReplyBtn.hasAttribute('data-feedback-bound')) {
          feedbackReplyBtn.addEventListener('click', showFeedbackReply);
          feedbackReplyBtn.setAttribute('data-feedback-bound', 'true');
        }

        if (closeFeedbackReply && !closeFeedbackReply.hasAttribute('data-feedback-bound')) {
          closeFeedbackReply.addEventListener('click', hideFeedbackReply);
          closeFeedbackReply.setAttribute('data-feedback-bound', 'true');
        }

        // 点击弹窗外部关闭
        if (modal && !modal.hasAttribute('data-feedback-bound')) {
          modal.addEventListener('click', function(e) {
            if (e.target === modal) {
              hideFeedbackReply();
            }
          });
          modal.setAttribute('data-feedback-bound', 'true');
        }
      }

      // 确保在DOM加载完成后和立即执行时都绑定事件
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          bindFeedbackEvents();
          loadFeedbackData();
        });
      } else {
        // DOM已经加载完成，立即执行
        bindFeedbackEvents();
        loadFeedbackData();
      }
    })();

// ========== Script Block 2 ==========
// 可控的随机数生成器类
    class SeededRandom {
      constructor(seed = null) {
        if (seed !== null) {
          // 使用指定的种子
          this.seed = seed;
        } else {
          // 每次创建时使用真正的随机种子
          this.seed = Math.floor(Math.random() * 1000000);
        }
        this.originalSeed = this.seed;
      }
      
      // 线性同余生成器 - 生成0到1之间的伪随机数
      next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
      }
      
      // 替代Math.random()的方法
      random() {
        return this.next();
      }
      
      // 重置种子
      reset() {
        this.seed = this.originalSeed;
      }
      
      // 获取当前种子
      getSeed() {
        return this.originalSeed;
      }
    }

    // 生成每日挑战种子
    function getDailySeed() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // 月份从0开始，需要+1
      const day = today.getDate();
      
      // 使用日期生成固定种子，确保同一天所有用户的种子相同
      return year * 10000 + month * 100 + day;
    }

    // 创建全局的测验随机数生成器
    let quizRandom = new SeededRandom();
    
    // 简单工具函数 - 使用统一的随机数生成器
    const shuffle = (arr) => arr.map(v=>[quizRandom.random(), v]).sort((a,b)=>a[0]-b[0]).map(p=>p[1]);
    const sampleOne = (arr) => arr[Math.floor(quizRandom.random()*arr.length)];

    // 图片预加载管理器
    class ImagePreloader {
      constructor() {
        this.cache = new Map(); // 图片缓存：src -> Promise<HTMLImageElement>
        this.loading = new Set(); // 正在加载的图片src集合
      }
      
      // 预加载图片并返回Promise
      async preloadImage(src) {
        if (!src) return null;
        
        // 如果已经缓存，直接返回
        if (this.cache.has(src)) {
          return this.cache.get(src);
        }
        
        // 如果正在加载，等待加载完成
        if (this.loading.has(src)) {
          return this.waitForLoad(src);
        }
        
        // 开始新的加载
        this.loading.add(src);
        
        const loadPromise = new Promise((resolve, reject) => {
          const img = new Image();
          
          img.onload = () => {
            this.loading.delete(src);
            resolve(img);
          };
          
          img.onerror = () => {
            this.loading.delete(src);
            console.warn(`图片加载失败: ${src}`);
            reject(new Error(`Failed to load image: ${src}`));
          };
          
          img.src = src;
        });
        
        // 缓存Promise
        this.cache.set(src, loadPromise);
        
        try {
          return await loadPromise;
        } catch (error) {
          // 加载失败时从缓存中移除
          this.cache.delete(src);
          throw error;
        }
      }
      
      // 等待正在加载的图片
      async waitForLoad(src) {
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (this.cache.has(src)) {
              clearInterval(checkInterval);
              resolve(this.cache.get(src));
            } else if (!this.loading.has(src)) {
              // 加载已完成但不在缓存中，可能加载失败
              clearInterval(checkInterval);
              resolve(null);
            }
          }, 10);
        });
      }
      
      // 检查图片是否已缓存
      isImageCached(src) {
        return this.cache.has(src);
      }
      
      // 清理缓存
      clearCache() {
        this.cache.clear();
        this.loading.clear();
      }
      
      // 获取缓存状态
      getCacheInfo() {
        return {
          cached: this.cache.size,
          loading: this.loading.size
        };
      }
    }

    // 题目缓冲池管理器
    class QuestionBuffer {
      constructor(generator = null, preloader = null) {
        this.generator = generator;
        this.preloader = preloader;
        this.buffer = []; // 缓冲的题目队列
        this.maxSize = 2; // 最多缓冲2题
        this.isGenerating = false; // 防止并发生成
        this.currentMode = null;
        this.currentTotal = 0;
      }
      
      // 初始化缓冲池
      initialize(generator, mode, total) {
        this.generator = generator;
        this.currentMode = mode;
        this.currentTotal = total;
        this.buffer = [];
        this.isGenerating = false;
      }
      
      // 获取下一题（保持随机序列）
      async getNext() {
        // 如果缓冲区为空，立即生成一题
        if (this.buffer.length === 0) {
          return await this.generateAndPreload();
        }
        
        // 取出第一个题目（FIFO保持顺序）
        const question = this.buffer.shift();
        
        // 异步补充缓冲区（不影响当前题目）
        this.refillBufferAsync();
        
        return question;
      }
      
      // 生成并预加载题目
      async generateAndPreload() {
        // 检查generator是否存在
        if (!this.generator) {
          console.error('Generator not initialized');
          return null;
        }
        
        // 关键：按顺序调用generator.next()保持随机性
        const question = this.generator.next(this.currentMode, this.currentTotal);
        
        if (!question) return null;
        
        // 如果有图片，预加载（增加preloader空值保护）
        if (question.promptImage) {
          try {
            if (this.preloader) {
              await this.preloader.preloadImage(question.promptImage);
              question._imagePreloaded = true;
            } else {
              console.warn('预加载器未初始化，将跳过预加载');
              question._imagePreloaded = false;
            }
          } catch (error) {
            console.warn('图片预加载失败，将使用占位符:', error);
            question._imagePreloaded = false;
          }
        }
        
        return question;
      }
      
      // 异步补充缓冲区
      async refillBufferAsync() {
        // 避免并发生成
        if (this.isGenerating || this.buffer.length >= this.maxSize) {
          return;
        }
        
        this.isGenerating = true;
        
        try {
          // 预生成题目，但不超过总题数限制
          while (this.buffer.length < this.maxSize) {
            const question = await this.generateAndPreload();
            if (question) {
              this.buffer.push(question);
            } else {
              // 没有更多题目了
              break;
            }
          }
        } catch (error) {
          console.error('缓冲区补充失败:', error);
        } finally {
          this.isGenerating = false;
        }
      }
      
      // 获取缓冲区状态
      getBufferInfo() {
        return {
          buffered: this.buffer.length,
          maxSize: this.maxSize,
          isGenerating: this.isGenerating
        };
      }
      
      // 清空缓冲区
      clear() {
        this.buffer = [];
        this.isGenerating = false;
      }
    }

    // 创建全局实例
    const imagePreloader = new ImagePreloader();
const questionBuffer = new QuestionBuffer(null, imagePreloader);

// 全局小测验配置：
// - pools: 题目池总体占比（card=卡牌池，character=角色池，event=事件池，profile=档案池）
// - difficultyRatio: 难度递增模式下各难度级别的题目数量比例（easy:normal:hard）
// - types: 可选，针对具体题型的微调系数（不写默认为1；设为0可禁用该题型在混合模式出现）
// 仅影响混合出题，单独选择某题型时不受此配置影响
window.QUIZ_CONFIG = {
  // 题目数量配置（默认值，会被难度设置覆盖）
  questionCount: 20,
  
  
  // 难度等级配置
  difficultyLevels: {
    normal: {
      name: '普通难度',
      description: '适合新手，题目相对简单',
      questionCount: 5,
      difficultyRatio: { easy: 2, normal: 1, hard: 0}, // 主要是简单和普通题
      pools: { card: 1, character: 1, event: 1, profile: 0, decision: 1, enemy: 1, skill: 1}
    },
    hard: {
      name: '困难难度', 
      description: '有一定挑战性，需要更多游戏知识',
      questionCount: 10,
      difficultyRatio: { easy: 1, normal: 1, hard: 1 }, // 平衡分布，偏向普通
      pools: { card: 1, character: 1, event: 1, profile: 0, decision: 1, enemy: 1, skill: 1}
    },
    nightmare: {
      name: '噩梦难度',
      description: '极具挑战性，考验深度理解',
      questionCount: 20,
      difficultyRatio: { easy: 1, normal: 2, hard: 4 }, // 主要是普通和困难题
      pools: { card: 2, character: 1.5, event: 2, profile: 0, decision: 3, enemy: 2, skill: 2}
    },
    profile: {
      name: '档案模式',
      description: '专注于角色档案相关题目',
      questionCount: 5,
      difficultyRatio: { easy: 1, normal: 2, hard: 2 }, // 平衡分布，偏向普通和困难
      pools: { card: 0, character: 0, event: 0, profile: 1, decision: 0, enemy: 0, skill: 0}
    }
  },
  
  // 当前选择的难度（默认普通）
  selectedDifficulty: 'normal',
  
  pools: { card: 1, character: 1, event: 1, profile: 1, decision: 1, enemy: 1, skill: 1},
  // 难度递增模式的比例设置：简单:普通:困难 = 1:1:1（可调整为2:2:1等）
  difficultyRatio: { easy: 1, normal: 1, hard: 1 },
  // 固定题目与随机题目的比例配置 (fixed:random)
  // 0表示只出随机题目，1表示只出固定题目，0.3表示30%固定题目+70%随机题目
  fixedRatio: {
    card: 0,
    character: 0,
    event: 0,
    profile: 0.7,
    decision: 0,
    enemy: 0,
    skill: 0
  },
  // 排行榜接口端点（优先国内域 aaamjs）
  leaderboardEndpoints: [
    'https://quiz-api.aaamjs.asia/api/leaderboard',
    'https://quiz-leaderboard.ttgg98667.workers.dev/api/leaderboard'
  ],
  // 已移除：Top1 接口不再使用
  // Top3历史查询端点（用于显示最近7天前三）
  topHistoryEndpoints: [
    'https://quiz-api.aaamjs.asia/api/top3/history',
    'https://quiz-leaderboard.ttgg98667.workers.dev/api/top3/history'
  ],
  // 提交成绩接口端点（优先国内域 aaamjs）
  submitScoreEndpoints: [
    'https://quiz-api.aaamjs.asia/api/submit-score',
    'https://quiz-leaderboard.ttgg98667.workers.dev/api/submit-score'
  ],
  // 会话启动接口端点（用于获取一次性 sessionId，优先使用国内域，减少网络阻塞）
  sessionStartEndpoints: [
    'https://quiz-api.aaamjs.asia/api/session/start',
    'https://quiz-leaderboard.ttgg98667.workers.dev/api/session/start'
  ],
  // 每日尝试状态查询端点（优先国内域 aaamjs）
  attemptStatusEndpoints: [
    'https://quiz-api.aaamjs.asia/api/attempt/status',
    'https://quiz-leaderboard.ttgg98667.workers.dev/api/attempt/status'
  ],
  // 新增：排行榜选择模式（'both' | 'daily_only' | 'aggregate_only'），控制是否显示切换控件
  leaderboardSelectionMode: 'aggregate_only',
  // 新增：排行榜视图模式（'daily_plus_history' | 'aggregate')
  leaderboardViewMode: 'aggregate',
  // 新增：聚合排行榜端点（跨所有日期聚合，优先国内域 aaamjs）
  aggregateLeaderboardEndpoints: [
    'https://quiz-api.aaamjs.asia/api/leaderboard/aggregate',
    'https://quiz-leaderboard.ttgg98667.workers.dev/api/leaderboard/aggregate'
  ],
  // 新增：聚合排行榜返回条目上限（默认100）
  aggregateLimit: 100,
  turnstileSiteKey: '',
  types: {
    name: 1,
    effect: 1,
    card_effect_desc: 1,
    char_title: 1,
    char_skill_role: 1,
    char_skill_skill: 1,
    char_skill_desc: 1,
    char_attr_role: 1,
    char_attr_pair: 1,
    char_level_effect: 1,
    char_level_level: 1,
    event_name: 1,
    event_effect: 1,
    char_birthday_from_name: 1,
    char_name_from_birthday: 1,
    char_food_from_name: 1,
    char_name_from_food: 1,
    battle_decision: 1,
    enemy_counter: 1,
    enemy_skill: 1,
    skill_enemy: 1,
    skill_description: 1
  }
};

// 题型元信息：用于混合模式的“题目池 + 难度”归类
const TYPE_META = {
  name: { pool: 'card', difficulty: 'easy' },
  effect: { pool: 'card', difficulty: 'easy' },
  card_effect_desc: { pool: 'card', difficulty: 'normal' },
  char_title: { pool: 'character', difficulty: 'easy' },
  char_skill_role: { pool: 'character', difficulty: 'easy' },
  char_skill_skill: { pool: 'character', difficulty: 'easy' },
  char_skill_desc: { pool: 'character', difficulty: 'normal' },
  char_attr_role: { pool: 'character', difficulty: 'normal' },
  char_attr_pair: { pool: 'character', difficulty: 'normal' },
  char_level_effect: { pool: 'character', difficulty: 'hard' },
  char_level_level: { pool: 'character', difficulty: 'hard' },
  event_name: { pool: 'event', difficulty: 'easy' },
  event_effect: { pool: 'event', difficulty: 'easy' },
  char_birthday_from_name: { pool: 'profile', difficulty: 'hard' },
  char_name_from_birthday: { pool: 'profile', difficulty: 'hard' },
  char_food_from_name: { pool: 'profile', difficulty: 'hard' },
  char_name_from_food: { pool: 'profile', difficulty: 'hard' },
  battle_decision: { pool: 'decision', difficulty: 'hard' },
  enemy_counter: { pool: 'enemy', difficulty: 'easy' },
  enemy_skill: { pool: 'enemy', difficulty: 'easy' },
  enemy_skill_desc: { pool: 'enemy', difficulty: 'normal' },
  skill_enemy: { pool: 'enemy', difficulty: 'easy' },
  skill_description: { pool: 'skill', difficulty: 'hard' }
};
    function uniqueOptions(correct, pool, count=4){
      const set = new Set([correct]);
      const choices = [correct];
      // 创建错项池：去除正确项并去重
      const filtered = Array.from(new Set(pool.filter(x => x && x !== correct)));
      while (choices.length < count && filtered.length) {
        const pick = filtered.splice(Math.floor(quizRandom.random()*filtered.length), 1)[0];
        if (!set.has(pick)) { set.add(pick); choices.push(pick); }
      }
      return shuffle(choices).slice(0, count);
    }

    // 规范化图片路径：cards.json 与 /images/cards/ 实际文件名可能存在差异
    function normalizeImagePath(p) {
      if (!p) return p;
      // 仅处理 images/cards 下的文件名
      try {
        const parts = p.split('/');
        const file = parts.pop();
        const dir = parts.join('/');
        // 去除括号中的（中/大/特大）形式，替换全角冒号
        let base = file.replace(/\s*\((中|大|特大)\)/g, '$1')
                       .replace(/：/g, '')
                       .replace(/\(/g, '')
                       .replace(/\)/g, '');
        return `${dir}/${base}`;
      } catch { return p; }
    }

    // 规范化事件图片路径
    function normalizeEventImagePath(p) {
      if (!p) return p;
      // 处理 images/events 下的文件名
      try {
        const parts = p.split('/');
        const file = parts.pop();
        const dir = parts.join('/');
        // 去除可能的特殊字符，保持文件名一致性
        let base = file.replace(/：/g, '').replace(/\s+/g, '');
        return `${dir}/${base}`;
      } catch { return p; }
    }

    // 出题器
    class QuizGenerator {
      constructor(cards, characters, events, config){
        this.cards = Array.isArray(cards) ? cards : [];
        this.characters = Array.isArray(characters) ? characters : [];
        this.events = Array.isArray(events) ? events : [];
        this.skills = []; // 初始化技巧数据
        this.enemyData = []; // 初始化敌怪数据
        this.used = new Set();
        this.usedSkillIds = new Set(); // 跟踪已使用的skill id
        this.usedFixedQuestionIds = new Set(); // 跟踪已使用的固定题目ID
        this.config = config || (typeof window !== 'undefined' ? window.QUIZ_CONFIG : {}) || {};
        
        // 不在构造函数中加载数据，改为手动调用
        // this.loadEnemyData();
        
        // 加载固定题目数据
        this.fixedQuestions = null;
        // 不在构造函数中自动加载，改为手动调用
        
        // 添加难度递增模式的状态管理
        this.progressiveMode = false;
        this.currentDifficultyIndex = 0;
        this.difficultyOrder = ['easy', 'normal', 'hard'];
        this.questionsPerDifficulty = 0;
        this.currentDifficultyCount = 0;
        
        // 预计算事件池
        this.eventNames = this.events.map(e => e?.name).filter(Boolean);
        this.eventDescs = this.events.map(e => e?.description).filter(Boolean);
        
        // 预计算角色池
        this.charNames = this.characters.map(c => c?.name).filter(Boolean);
        this.charTitles = this.characters.map(c => c?.title).filter(Boolean);
        const pveAct = this.characters.map(c => c?.skills?.pve_skills?.active_skill?.name).filter(Boolean);
        const pvePas = this.characters.map(c => c?.skills?.pve_skills?.passive_skill?.name).filter(Boolean);
        this.pveAllSkillNames = Array.from(new Set([...pveAct, ...pvePas]));
        
        // 预计算档案池（生日和喜欢食物）
        this.charBirthdays = this.characters.map(c => c?.profile?.birthday).filter(Boolean);
        this.charFoods = this.characters.map(c => c?.profile?.favorite_food).filter(Boolean);
        this.birthdayByName = new Map();
        this.foodByName = new Map();
        this.namesByBirthday = new Map();
        this.namesByFood = new Map();
        
        for (const ch of this.characters) {
          const name = ch?.name;
          const birthday = ch?.profile?.birthday;
          const food = ch?.profile?.favorite_food;
          
          if (name && birthday) {
            this.birthdayByName.set(name, birthday);
            const names = this.namesByBirthday.get(birthday) || [];
            names.push(name);
            this.namesByBirthday.set(birthday, names);
          }
          
          if (name && food) {
            this.foodByName.set(name, food);
            const names = this.namesByFood.get(food) || [];
            names.push(name);
            this.namesByFood.set(food, names);
          }
        }
        // 属性预计算
        this.attrTriplesByName = new Map();
        this.attrTriplePool = [];
        this.attrIndex = { attack: new Map(), defense: new Map(), hp: new Map() };
        for (const ch of this.characters) {
          const n = ch?.name; const d = ch?.data || {};
          if (!n) continue;
          const atk = d?.attack; const def = d?.defense; const hp = d?.hp;
          if (atk == null || def == null || hp == null) continue;
          const triple = `攻${atk} 防${def} 生${hp}`;
          this.attrTriplesByName.set(n, triple);
          this.attrTriplePool.push(triple);
          const add = (map, val) => { const key = String(val); const arr = map.get(key) || []; arr.push(n); map.set(key, arr); };
          add(this.attrIndex.attack, atk);
          add(this.attrIndex.defense, def);
          add(this.attrIndex.hp, hp);
        }
        this.attrTriplePool = Array.from(new Set(this.attrTriplePool));
        // 等级预计算（合作挑战等级作为PVE等级使用）
        this.levelsByChar = new Map(); // name -> { map: Map('LV x'->effect), allowed: ['LV 1'..'LV 4'] }
        for (const ch of this.characters) {
          const n = ch?.name;
          const levelsObj = ch?.cooperation_challenge?.cooperation_challenge_levels || null;
          if (n && levelsObj && typeof levelsObj === 'object') {
            const entries = Object.entries(levelsObj).filter(([lv, eff]) => eff);
            const map = new Map(entries);
            // 兼容不同格式，排除数字为 5 或 6 的等级（如 'LV 5', 'LV5', 'Lv.6' 等）
            const allowed = entries.map(([lv]) => lv).filter(lv => {
              const m = String(lv).match(/\d+/);
              const num = m ? parseInt(m[0], 10) : null;
              return num !== 5 && num !== 6;
            });
            if (map.size) this.levelsByChar.set(n, { map, allowed });
          }
        }
      }
      getRandomCard(){ return sampleOne(this.cards); }
      getRandomCharacter(){ return sampleOne(this.characters); }
      makeId(prefix, key){ return `${prefix}::${key}`; }

      genNameQuiz(){
        // 图片 -> 名称（卡牌）
        let c, id;
        for(let tries=0; tries<50; tries++){
          c = this.getRandomCard();
          if (!c) break;
          id = this.makeId('name', c.name);
          if(!this.used.has(id)) break;
        }
        if (!c) return null;
        this.used.add(id);
        const options = uniqueOptions(c.name, this.cards.map(x=>x.name));
        return { id, type:'name', promptImage: normalizeImagePath(c.image_path), promptText:'这张卡牌的名称是？', options, answer:c.name };
      }
      genEffectQuiz(){
        // 名称 -> 效果 或 效果 -> 名称（卡牌）
        let c = this.getRandomCard();
        if (!c) return null;
        const nameToEffect = quizRandom.random() > 0.5;
        const id = this.makeId(nameToEffect ? 'effect_name' : 'effect_desc', c.name);
        if (this.used.has(id)) return this.genEffectQuiz();
        this.used.add(id);
        if (nameToEffect){
          const options = uniqueOptions(c.description, this.cards.map(x=>x.description));
          return { id, type:'effect', promptImage:null, promptText:`“${c.name}” 的效果是？`, options, answer:c.description };
        } else {
          const options = uniqueOptions(c.name, this.cards.map(x=>x.name));
          return { id, type:'effect_reverse', promptImage:null, promptText:`以下效果对应的卡牌名称是？\n${c.description}`, options, answer:c.name };
        }
      }
      genCardEffectDescFromNameQuiz(){
        // 卡牌普通难度：给卡牌名字，选择卡牌效果；必须包含阿拉伯数字（忽略值为1）；干扰项生成规则同“角色·技能描述（普通）”
        const extractMatches = (text) => {
          const res = [];
          const reA = /\d+/g; let m;
          while ((m = reA.exec(text))){
            const val = parseInt(m[0],10);
            if (val !== 1) res.push({ start: m.index, end: m.index + m[0].length, val });
          }
          return res;
        };
        const replaceMany = (text, changes) => {
          const matches = extractMatches(text);
          const targets = changes.map(c => {
            const m = matches[c.index];
            const rep = String(c.newVal);
            return { start: m.start, end: m.end, rep };
          }).sort((a,b)=> a.start - b.start);
          let out = ''; let pos = 0;
          for (const t of targets){ out += text.slice(pos, t.start) + t.rep; pos = t.end; }
          out += text.slice(pos);
          return out;
        };
        const tryDeltas = (v) => {
          const candidates = [-1, 1, -2, 2, -3, 3];
          return candidates.filter(d => v + d > 1);
        };
        const genSingleVariants = (text, idx) => {
          const matches = extractMatches(text);
          const base = matches[idx].val;
          const deltas = shuffle(tryDeltas(base));
          const outs = new Set();
          for (const d of deltas){
            const nv = base + d; if (nv <= 1) continue;
            outs.add(replaceMany(text, [{ index: idx, newVal: nv }]));
            if (outs.size >= 3) break;
          }
          return Array.from(outs);
        };
        const genTwoVariants = (text, i, j) => {
          const m = extractMatches(text);
          const a = m[i].val, b = m[j].val;
          const delA = tryDeltas(a); const delB = tryDeltas(b);
          const outs = new Set();
          
          // 固定第一个数字，只改第二个数字（生成2个选项）
          if (delB.length >= 2) {
            outs.add(replaceMany(text, [{ index: j, newVal: b + delB[0] }]));
            outs.add(replaceMany(text, [{ index: j, newVal: b + delB[1] }]));
          } else if (delB.length === 1) {
            outs.add(replaceMany(text, [{ index: j, newVal: b + delB[0] }]));
            // 如果第二个数字的变化选项不够，用第一个数字补充
            if (delA.length) {
              outs.add(replaceMany(text, [{ index: i, newVal: a + delA[0] }]));
            }
          }
          
          // 固定第二个数字，只改第一个数字（生成1个选项）
          if (delA.length && outs.size < 3) {
            outs.add(replaceMany(text, [{ index: i, newVal: a + delA[0] }]));
          }
          
          return Array.from(outs).slice(0,3);
        };
        let picked = null;
        for (let tries=0; tries<180; tries++){
          const c = this.getRandomCard(); if (!c) break;
          const desc = c.description; if (!desc) continue;
          const matches = extractMatches(desc);
          if (!matches.length) continue; // 必须含阿拉伯数字（不含值为1）
          let variants = [];
          if (matches.length === 1){
            variants = genSingleVariants(desc, 0);
          } else if (matches.length === 2){
            if (quizRandom.random() < 0.5){
              const idx = quizRandom.random() < 0.5 ? 0 : 1;
              variants = genSingleVariants(desc, idx);
              if (variants.length < 3){
                const more = genSingleVariants(desc, idx===0?1:0);
                for (const v of more){ if (v!==desc && !variants.includes(v)) variants.push(v); if (variants.length>=3) break; }
              }
            } else {
              variants = genTwoVariants(desc, 0, 1);
            }
          } else {
            if (quizRandom.random() < 0.5){
              const idx = Math.floor(quizRandom.random()*matches.length);
              variants = genSingleVariants(desc, idx);
            } else {
              const idxs = shuffle([...Array(matches.length).keys()]).slice(0,2).sort((a,b)=>a-b);
              variants = genTwoVariants(desc, idxs[0], idxs[1]);
            }
          }
          const uniq = Array.from(new Set(variants.filter(v => v && v !== desc)));
          if (uniq.length >= 3){
            const id = this.makeId('card_effect_desc', c.name);
            if (this.used.has(id)) continue;
            this.used.add(id);
            const options = shuffle([desc, uniq[0], uniq[1], uniq[2]]);
            picked = { id, promptText: `“${c.name}” 的效果是？`, options, answer: desc };
            break;
          }
        }
        if (!picked) return null;
        return { id: picked.id, type:'card_effect_desc', promptImage:null, promptText: picked.promptText, options: picked.options, answer: picked.answer };
      }
      genCharTitleQuiz(){
        // 角色名 ⇄ 称号
        let ch, id, direction; // direction: name_to_title 或 title_to_name
        for(let tries=0; tries<80; tries++){
          ch = this.getRandomCharacter();
          if (!ch) break;
          direction = quizRandom.random() > 0.5 ? 'name_to_title' : 'title_to_name';
          const key = direction === 'name_to_title' ? ch.name : ch.title;
          if (!key) continue;
          id = this.makeId(`char_title_${direction}`, key);
          if (!this.used.has(id)) break;
        }
        if (!ch) return null;
        this.used.add(id);
        if (direction === 'name_to_title'){
          const correct = ch.title;
          const options = uniqueOptions(correct, this.charTitles);
          return { id, type:'char_title', promptImage:null, promptText:`角色 “${ch.name}” 的称号是？`, options, answer: correct };
        } else {
          const correct = ch.name;
          const options = uniqueOptions(correct, this.charNames);
          return { id, type:'char_title_reverse', promptImage:null, promptText:`称号 “${ch.title}” 对应的角色名是？`, options, answer: correct };
        }
      }
      genCharSkillFromRoleQuiz(){
        // 给角色名，选PVE 主动 或 被动 技能；选项池为 PVE 主动+被动 全集
        let ch, id, which; // which: active / passive
        for(let tries=0; tries<100; tries++){
          ch = this.getRandomCharacter();
          if (!ch) break;
          which = quizRandom.random() > 0.5 ? 'active' : 'passive';
          const skillName = which === 'active' ? ch?.skills?.pve_skills?.active_skill?.name : ch?.skills?.pve_skills?.passive_skill?.name;
          if (!skillName) continue;
          id = this.makeId(`char_skill_role_${which}`, ch.name);
          if (!this.used.has(id)) break;
        }
        if (!ch) return null;
        this.used.add(id);
        const skillName = which === 'active' ? ch?.skills?.pve_skills?.active_skill?.name : ch?.skills?.pve_skills?.passive_skill?.name;
        const options = uniqueOptions(skillName, this.pveAllSkillNames);
        const zh = which === 'active' ? '主动' : '被动';
        return { id, type:'char_skill_role', promptImage:null, promptText:`角色 “${ch.name}” 的PVE${zh}技能是？`, options, answer: skillName };
      }
      genCharSkillDescFromRoleQuiz(){
        // 给角色名，选PVE 主动或被动技能“描述”（仅考虑阿拉伯数字；忽略所有值为1的阿拉伯数字；干扰项按数字规则生成）
        const romanToInt = (s) => {
          const map = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
          let total = 0, prev = 0;
          for (let i = s.length - 1; i >= 0; i--) {
            const val = map[s[i]] || 0;
            if (val < prev) total -= val; else total += val;
            prev = val;
          }
          return total;
        };
        const intToRoman = (num) => {
          if (num <= 0) return 'I';
          const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
          const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
          let n = num, out = '';
          for (let i=0; i<vals.length; i++){
            while (n >= vals[i]){ out += syms[i]; n -= vals[i]; }
          }
          return out;
        };
        const extractMatches = (text) => {
          // 只抽取阿拉伯数字，忽略值为1的数字
          const res = [];
          const reA = /\d+/g; let m;
          while ((m = reA.exec(text))){
            const val = parseInt(m[0],10);
            if (val !== 1) res.push({ start: m.index, end: m.index + m[0].length, val });
          }
          return res;
        };
        const replaceMany = (text, changes) => {
          const matches = extractMatches(text);
          const targets = changes.map(c => {
            const m = matches[c.index];
            const rep = String(c.newVal);
            return { start: m.start, end: m.end, rep };
          }).sort((a,b)=> a.start - b.start);
          let out = ''; let pos = 0;
          for (const t of targets){ out += text.slice(pos, t.start) + t.rep; pos = t.end; }
          out += text.slice(pos);
          return out;
        };
        const tryDeltas = (v) => {
          const candidates = [-1, 1, -2, 2, -3, 3];
          return candidates.filter(d => v + d > 1);
        };
        const genSingleVariants = (text, idx) => {
          const matches = extractMatches(text);
          const base = matches[idx].val;
          const deltas = shuffle(tryDeltas(base));
          const outs = new Set();
          for (const d of deltas){
            const nv = base + d; if (nv <= 1) continue;
            outs.add(replaceMany(text, [{ index: idx, newVal: nv }]));
            if (outs.size >= 3) break;
          }
          return Array.from(outs);
        };
        const genTwoVariants = (text, i, j) => {
          const m = extractMatches(text);
          const a = m[i].val, b = m[j].val;
          const delA = tryDeltas(a); const delB = tryDeltas(b);
          const outs = new Set();
          if (delA.length){ outs.add(replaceMany(text, [{ index: i, newVal: a + delA[0] }])); }
          if (delB.length){ outs.add(replaceMany(text, [{ index: j, newVal: b + delB[0] }])); }
          const da = (a - 1 > 1) ? -1 : 1;
          const db = (b - 1 > 1) ? -1 : 1;
          outs.add(replaceMany(text, [{ index: i, newVal: a + da }, { index: j, newVal: b + db }]));
          return Array.from(outs).slice(0,3);
        };
        let picked = null;
        for (let tries=0; tries<180; tries++){
          const ch = this.getRandomCharacter(); if (!ch) break;
          const order = quizRandom.random() > 0.5 ? ['active','passive'] : ['passive','active'];
          for (const which of order){
            const desc = which==='active' ? ch?.skills?.pve_skills?.active_skill?.description : ch?.skills?.pve_skills?.passive_skill?.description;
            if (!desc) continue;
            const matches = extractMatches(desc);
            if (!matches.length) continue; // 必须含阿拉伯数字（不含值为1）
            // 不再要求罗马数字
            // if (!matches.some(m => m.kind === 'roman')) continue;
            // 单个数字为1的情况已被过滤（提取阶段忽略1）
            // 生成干扰项
            let variants = [];
            if (matches.length === 1){
              variants = genSingleVariants(desc, 0);
            } else if (matches.length === 2){
              if (quizRandom.random() < 0.5){
                // 情况A：随机无视一个数字，按单数规则生成（50%概率）
                const idx = quizRandom.random() < 0.5 ? 0 : 1;
                variants = genSingleVariants(desc, idx);
                if (variants.length < 3){
                  const more = genSingleVariants(desc, idx===0?1:0);
                  for (const v of more){ if (v!==desc && !variants.includes(v)) variants.push(v); if (variants.length>=3) break; }
                }
              } else {
                // 情况B：固定组合方式（50%概率）
                // 两个选项固定一个数字只改另一个数字，另外两个选项固定另一个数字只改第一个数字
                variants = genTwoVariants(desc, 0, 1);
              }
            } else {
              // n>2：要么随机无视其中n-1个数字按情况1处理，要么无视其中n-2个数字按情况2处理
              if (quizRandom.random() < 0.5){
                // 随机无视n-1个数字，按情况1处理（只保留1个数字）
                const idx = Math.floor(quizRandom.random()*matches.length);
                variants = genSingleVariants(desc, idx);
              } else {
                // 无视n-2个数字，按情况2处理（保留2个数字）
                const idxs = shuffle([...Array(matches.length).keys()]).slice(0,2).sort((a,b)=>a-b);
                variants = genTwoVariants(desc, idxs[0], idxs[1]);
              }
            }
            const uniq = Array.from(new Set(variants.filter(v => v && v !== desc)));
            if (uniq.length >= 3){
              const id = this.makeId('char_skill_desc', `${ch.name}#${which}`);
              if (this.used.has(id)) continue;
              this.used.add(id);
              const zh = which==='active' ? '主动' : '被动';
              const options = shuffle([desc, uniq[0], uniq[1], uniq[2]]);
              picked = { id, promptText: `角色 “${ch.name}” 的PVE${zh}技能描述是？`, options, answer: desc };
              break;
            }
          }
          if (picked) break;
        }
        if (!picked) return null;
        return { id: picked.id, type:'char_skill_desc', promptImage:null, promptText: picked.promptText, options: picked.options, answer: picked.answer };
      }
      genCharSkillToRoleQuiz(){
        // 给技能名，选角色名（技能来自PVE 主动/被动，随机选择其一）
        let ch, id, which, skillName;
        for(let tries=0; tries<100; tries++){
          ch = this.getRandomCharacter();
          if (!ch) break;
          which = quizRandom.random() > 0.5 ? 'active' : 'passive';
          skillName = which === 'active' ? ch?.skills?.pve_skills?.active_skill?.name : ch?.skills?.pve_skills?.passive_skill?.name;
          if (!skillName) continue;
          id = this.makeId('char_skill_skill', skillName);
          if (!this.used.has(id)) break;
        }
        if (!ch || !skillName) return null;
        this.used.add(id);
        const options = uniqueOptions(ch.name, this.charNames);
        return { id, type:'char_skill_skill', promptImage:null, promptText:`PVE技能 “${skillName}” 属于哪位角色？`, options, answer: ch.name };
      }
      genCharAttrFromRoleQuiz(){
        // 给角色名，选初始三维属性（三选一，普通）
        let ch, id, triple;
        for (let tries=0; tries<100; tries++){
          ch = this.getRandomCharacter();
          if (!ch) break;
          triple = this.attrTriplesByName.get(ch.name);
          if (!triple) continue;
          id = this.makeId('char_attr_role', ch.name);
          if (!this.used.has(id)) break;
        }
        if (!ch || !triple) return null;
        this.used.add(id);
        const options = uniqueOptions(triple, this.attrTriplePool);
        return { id, type:'char_attr_role', promptImage:null, promptText:`角色 “${ch.name}” 的初始属性是？`, options, answer: triple };
      }
      genCharAttrPairQuiz(){
        // 随机给出一项属性值，选同时满足该属性的两个角色名（普通）
        const attrs = [ {key:'attack', zh:'攻击'}, {key:'defense', zh:'防御'}, {key:'hp', zh:'生命'} ];
        let picked = null; let id;
        for (let tries=0; tries<150; tries++){
          const a = sampleOne(attrs);
          const entries = Array.from(this.attrIndex[a.key].entries()).filter(([v, names]) => Array.isArray(names) && names.length >= 2);
          if (!entries.length) continue;
          const [value, names] = sampleOne(entries);
          const pair = shuffle(names.slice()).slice(0,2);
          if (pair.length < 2) continue;
          const pairKey = pair.slice().sort().join(' & ');
          id = this.makeId('char_attr_pair', `${a.key}=${value}#${pairKey}`);
          if (this.used.has(id)) continue;
          picked = { a, value, pairKey, namesPool: names, label: `${pair[0]} 与 ${pair[1]}` };
          break;
        }
        if (!picked) return null;
        this.used.add(id);
        const allNames = this.charNames.slice();
        const correctLabel = picked.label;
        const correctSet = new Set(picked.namesPool);
        const optionLabels = new Set([correctLabel]);
        const labels = [correctLabel];
        let guard = 0;
        while (labels.length < 4 && guard++ < 400){
          const cand = shuffle(allNames.slice()).slice(0,2);
          if (cand.length < 2) continue;
          const okBoth = correctSet.has(cand[0]) && correctSet.has(cand[1]);
          if (okBoth) continue; // 避免再出现正确组合
          const lbl = `${cand[0]} 与 ${cand[1]}`;
          const key = cand.slice().sort().join(' & ');
          if (optionLabels.has(lbl)) continue;
          optionLabels.add(lbl);
          labels.push(lbl);
        }
        while (labels.length < 4) { labels.push(labels[labels.length-1]); }
        return { id, type:'char_attr_pair', promptImage:null, promptText:`以下哪一对角色同时满足\n初始${picked.a.zh} = ${picked.value} ？`, options: shuffle(labels).slice(0,4), answer: correctLabel };
      }
      genCharLevelEffectFromLevelQuiz(){
        // 给出角色名以及PVE等级（排除5、6），选对应升级效果（困难）
        let ch, id, lv, eff;
        for (let tries=0; tries<150; tries++){
          ch = this.getRandomCharacter();
          if (!ch) break;
          const info = this.levelsByChar.get(ch.name);
          if (!info || !info.allowed.length) continue;
          lv = sampleOne(info.allowed);
          eff = info.map.get(lv);
          if (!eff) continue;
          id = this.makeId('char_level_effect', `${ch.name}#${lv}`);
          if (!this.used.has(id)) break;
        }
        if (!ch || !lv || !eff) return null;
        this.used.add(id);
        // 选项池仅使用允许等级(LV1~LV4)的升级效果，避免出现 LV5/6
        const selfInfo = this.levelsByChar.get(ch.name);
        let pool = [];
        for (const [lvKey, v] of selfInfo.map.entries()){
          if (selfInfo.allowed.includes(lvKey) && v) pool.push(v);
        }
        if (new Set(pool).size < 4){
          for (const info of this.levelsByChar.values()){
            for (const [lvKey, v] of info.map.entries()){
              if (info.allowed.includes(lvKey) && v) pool.push(v);
            }
          }
        }
        pool = Array.from(new Set(pool));
        const options = uniqueOptions(eff, pool);
        return { id, type:'char_level_effect', promptImage:null, promptText:`角色 “${ch.name}” 在 ${lv} 的升级效果是？`, options, answer: eff };
      }
      genCharLevelFromEffectQuiz(){
        // 给出角色名以及升级效果（排除5、6），选择对应等级（困难）
        let ch, id, lv, eff;
        for (let tries=0; tries<150; tries++){
          ch = this.getRandomCharacter();
          if (!ch) break;
          const info = this.levelsByChar.get(ch.name);
          if (!info || !info.allowed.length) continue;
          lv = sampleOne(info.allowed);
          eff = info.map.get(lv);
          if (!eff) continue;
          id = this.makeId('char_level_level', `${ch.name}#${eff}`);
          if (!this.used.has(id)) break;
        }
        if (!ch || !lv || !eff) return null;
        this.used.add(id);
        // 选项池：该角色的所有可选等级（排除5、6），如不足则用LV 1~4补齐
        const info = this.levelsByChar.get(ch.name);
        let levelPool = info.allowed.slice();
        const base = ['LV 1','LV 2','LV 3','LV 4'];
        for (const b of base) if (!levelPool.includes(b)) levelPool.push(b);
        const options = uniqueOptions(lv, levelPool);
        return { id, type:'char_level_level', promptImage:null, promptText:`角色 “${ch.name}” 的升级效果“${eff}”对应的是哪个等级？`, options, answer: lv };
      }
      
      // 新增：事件·名称考验（图→名）
      genEventNameQuiz(){
        let e, id;
        for(let i=0;i<60;i++){
          e = sampleOne(this.events); if (!e) break;
          id = this.makeId('event_name', e.name);
          if (!this.used.has(id)) break;
        }
        if (!e) return null;
        this.used.add(id);
        const options = uniqueOptions(e.name, this.eventNames);
        return { id, type:'event_name', promptImage: normalizeEventImagePath(e.image_path), promptAlt:'事件', promptText:'这个事件的名称是？', options, answer:e.name };
      }
      
      // 新增：事件·效果考验（名⇄效）
      genEventEffectQuiz(){
        const e = sampleOne(this.events);
        if (!e) return null;
        const nameToEffect = quizRandom.random() > 0.5;
        const id = this.makeId(nameToEffect ? 'event_effect_name' : 'event_effect_desc', e.name);
        if (this.used.has(id)) return this.genEventEffectQuiz();
        this.used.add(id);
        if (nameToEffect){
          const options = uniqueOptions(e.description, this.eventDescs);
          return { id, type:'event_effect', promptImage:null, promptText:`事件 "${e.name}" 的效果是？`, options, answer:e.description };
        } else {
          const options = uniqueOptions(e.name, this.eventNames);
          return { id, type:'event_effect_reverse', promptImage:null, promptText:`以下事件效果对应的事件名称是？\n${e.description}`, options, answer:e.name };
        }
      }
      
      // 新增：档案池·生日考验（角色名→生日）
      genCharBirthdayFromNameQuiz(){
        let ch, id;
        for(let i=0;i<60;i++){
          ch = sampleOne(this.characters); 
          if (!ch || !ch.profile?.birthday) continue;
          id = this.makeId('char_birthday_from_name', ch.name);
          if (!this.used.has(id)) break;
        }
        if (!ch || !ch.profile?.birthday) return null;
        this.used.add(id);
        const options = uniqueOptions(ch.profile.birthday, this.charBirthdays);
        return { id, type:'char_birthday_from_name', promptImage:null, promptText:`角色 "${ch.name}" 的生日是？`, options, answer:ch.profile.birthday };
      }
      
      // 新增：档案池·生日考验（生日→角色名）
      genCharNameFromBirthdayQuiz(){
        let ch, id;
        for(let i=0;i<60;i++){
          ch = sampleOne(this.characters); 
          if (!ch || !ch.profile?.birthday) continue;
          id = this.makeId('char_name_from_birthday', ch.profile.birthday);
          if (!this.used.has(id)) break;
        }
        if (!ch || !ch.profile?.birthday) return null;
        this.used.add(id);
        const options = uniqueOptions(ch.name, this.charNames);
        return { id, type:'char_name_from_birthday', promptImage:null, promptText:`生日是 "${ch.profile.birthday}" 的角色是？`, options, answer:ch.name };
      }
      
      // 新增：档案池·食物考验（角色名→喜欢食物）
      genCharFoodFromNameQuiz(){
        let ch, id;
        for(let i=0;i<60;i++){
          ch = sampleOne(this.characters); 
          if (!ch || !ch.profile?.favorite_food) continue;
          id = this.makeId('char_food_from_name', ch.name);
          if (!this.used.has(id)) break;
        }
        if (!ch || !ch.profile?.favorite_food) return null;
        this.used.add(id);
        const options = uniqueOptions(ch.profile.favorite_food, this.charFoods);
        return { id, type:'char_food_from_name', promptImage:null, promptText:`角色 "${ch.name}" 喜欢的食物是？`, options, answer:ch.profile.favorite_food };
      }
      
      // 新增：档案池·食物考验（喜欢食物→角色名）
      genCharNameFromFoodQuiz(){
        let ch, id;
        for(let i=0;i<60;i++){
          ch = sampleOne(this.characters); 
          if (!ch || !ch.profile?.favorite_food) continue;
          id = this.makeId('char_name_from_food', ch.profile.favorite_food);
          if (!this.used.has(id)) break;
        }
        if (!ch || !ch.profile?.favorite_food) return null;
        this.used.add(id);
        const options = uniqueOptions(ch.name, this.charNames);
        return { id, type:'char_name_from_food', promptImage:null, promptText:`喜欢 "${ch.profile.favorite_food}" 的角色是？`, options, answer:ch.name };
      }

      genBattleDecisionQuiz(){
        // 50%概率生成防御题，50%概率生成闪避题
        const shouldDefend = quizRandom.random() < 0.5;
        
        let A, D, HP, X, n;
        let attempts = 0;
        const maxAttempts = 100;
        
        if (shouldDefend) {
          // 生成防御题：确保 X > n 且 n <= 5 且 HP != 1
          do {
            A = Math.floor(quizRandom.random() * 8) + 3; // [3,10]
            D = Math.floor(quizRandom.random() * 6); // [0,5]
            HP = Math.floor(quizRandom.random() * 11) + 2; // [2,12]
            X = Math.floor(quizRandom.random() * 6) + 1; // [1,6]
            n = (A + X) - (D + HP);
            attempts++;
          } while ((X <= n || n > 5 || HP === 1) && attempts < maxAttempts);
          
          if (attempts >= maxAttempts) {
            // 备用方案：强制构造一个防御题
            A = 5; D = 2; HP = 4; X = 3;
            n = (A + X) - (D + HP); // n = 2
          }
        } else {
          // 生成闪避题：按指定概率分配 - 必死5%，门槛90%，HP=1为5%
          const rand = quizRandom.random();
          let dodgeType;
          if (rand < 0.05) {
            dodgeType = 0; // 必死防御 5%
          } else if (rand < 0.95) {
            dodgeType = 1; // 门槛型 90%
          } else {
            dodgeType = 2; // HP=1型 5%
          }
          
          if (dodgeType === 0) {
            // 类型A：必死防御 (n >= 6)
            do {
              A = Math.floor(quizRandom.random() * 6) + 8; // [8,13] 高攻击力
              D = Math.floor(quizRandom.random() * 3); // [0,2] 低防御力
              HP = Math.floor(quizRandom.random() * 3) + 2; // [2,4] 低生命值
              X = Math.floor(quizRandom.random() * 4) + 3; // [3,6] 高骰点
              n = (A + X) - (D + HP);
              attempts++;
            } while (n < 6 && attempts < maxAttempts);
            
            if (attempts >= maxAttempts) {
              A = 10; D = 1; HP = 2; X = 4;
              n = (A + X) - (D + HP); // n = 11
            }
          } else if (dodgeType === 1) {
            // 类型B：闪避门槛更低 (0 <= n <= 5 且 X <= n)
            do {
              A = Math.floor(quizRandom.random() * 6) + 4; // [4,9]
              D = Math.floor(quizRandom.random() * 4) + 1; // [1,4]
              HP = Math.floor(quizRandom.random() * 6) + 3; // [3,8]
              X = Math.floor(quizRandom.random() * 6) + 1; // [1,6]
              n = (A + X) - (D + HP);
              attempts++;
            } while ((n < 0 || n > 5 || X > n) && attempts < maxAttempts);
            
            if (attempts >= maxAttempts) {
              A = 6; D = 2; HP = 3; X = 2;
              n = (A + X) - (D + HP); // n = 3, X <= n
            }
          } else {
            // 类型C：HP=1 (必闪避)
            HP = 1;
            A = Math.floor(quizRandom.random() * 8) + 3; // [3,10]
            D = Math.floor(quizRandom.random() * 6); // [0,5]
            X = Math.floor(quizRandom.random() * 6) + 1; // [1,6]
            n = (A + X) - (D + HP);
          }
        }
        
        const correctAnswer = shouldDefend ? '防御' : '闪避';
        const id = this.makeId('battle_decision', `${A}-${D}-${HP}-${X}`);
        
        if (this.used.has(id)) {
          // 如果ID重复，稍微调整参数
          X = (X % 6) + 1;
        }
        this.used.add(id);
        
        const promptText = `按照以下规则，请问你应该选择什么行动？

1. 防御不会死，就选防御。
2. 防御可能会死，就选择活下来概率高的选项（概率相同就闪避）。`;
        
        // 创建带图标的HTML内容
        const promptHTML = `
          <div class="battle-decision-container">
            <div class="battle-stats-grid">
              <!-- 敌方标题 -->
              <div class="battle-section-title">敌方：</div>
              <!-- 第一行：A图标和X图标 -->
              <div class="stats-row">
                <div class="stat-icon-container">
                  <div class="stat-icon" style="position: relative;">
                    <img src="images/decisions/A.png" alt="攻击力" class="decision-icon" onerror="this.style.display='none';" />
                    <span class="stat-value stat-value-a">
                      <div style="line-height: 1;">${A}</div>
                      <div style="line-height: 0.5; margin: -2px 0;">-</div>
                      <div style="line-height: 1;">${A}</div>
                    </span>
                  </div>
                </div>
                <div class="stat-icon-container">
                  <div class="stat-icon" style="position: relative;">
                    <img src="images/decisions/X.png" alt="骰点" class="decision-icon" onerror="this.style.display='none';" />
                    <span class="stat-value stat-value-x">${X}</span>
                  </div>
                </div>
              </div>
              <!-- 分割线 -->
              <div class="battle-divider"></div>
              <!-- 我方标题 -->
              <div class="battle-section-title">我方：</div>
              <!-- 第二行：D图标和HP图标 -->
              <div class="stats-row">
                <div class="stat-icon-container">
                  <div class="stat-icon" style="position: relative;">
                    <img src="images/decisions/D.png" alt="防御力" class="decision-icon" onerror="this.style.display='none';" />
                    <span class="stat-value stat-value-d">
                      <div style="line-height: 1;">${D}</div>
                      <div style="line-height: 0.5; margin: -2px 0;">-</div>
                      <div style="line-height: 1;">${D}</div>
                    </span>
                  </div>
                </div>
                <div class="stat-icon-container">
                  <div class="stat-icon" style="position: relative;">
                    <img src="images/decisions/HP.png" alt="生命值" class="decision-icon-hp" onerror="this.style.display='none';" />
                    <span class="stat-value stat-value-hp">${HP}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        const options = ['防御', '闪避'];
        
        return {
          id,
          type: 'battle_decision',
          promptImage: null,
          promptText,
          promptHTML,
          options,
          answer: correctAnswer,
          enemyX: X,  // 添加敌方骰数X值
          defendN: n  // 添加防御所需骰数阈值n
        };
      }
      
      // 敌怪反击题型生成函数
      genEnemyCounterQuiz() {
        // 检查敌怪数据是否已加载
        if (!this.enemyData || this.enemyData.length === 0) {
          console.warn('Enemy data not loaded for enemy_counter quiz');
          return null; // 返回null，让统一的回退机制处理
        }
        
        // 筛选有有效game_mechanics的敌怪
        const validEnemies = this.enemyData.filter(enemy => 
          enemy && enemy.game_mechanics && typeof enemy.game_mechanics.can_counter === 'boolean'
        );
        
        if (validEnemies.length === 0) {
          console.warn('No valid enemies with game_mechanics found for enemy_counter quiz');
          return null; // 返回null，让统一的回退机制处理
        }
        
        const enemy = sampleOne(validEnemies);
        const id = this.makeId();
        
        const correctAnswer = enemy.game_mechanics.can_counter ? '反击' : '不反击';
        const options = ['反击', '不反击'];
        
        return {
          id,
          type: 'enemy_counter',
          promptText: `敌怪"${enemy.title || enemy.name}"是否会反击？`,
          options,
          answer: correctAnswer,
          explanation: `根据游戏机制，${enemy.title || enemy.name}${enemy.game_mechanics.can_counter ? '会' : '不会'}反击。`
        };
      }
      
      // 敌怪技能题型生成函数（称号→技能）
      genEnemySkillQuiz() {
        // 检查敌怪数据是否已加载
        if (!this.enemyData || this.enemyData.length === 0) {
          console.warn('Enemy data not loaded, falling back to counter quiz');
          return this.genEnemyCounterQuiz(); // 回退到反击题型
        }
        
        // 筛选有技能的敌怪
        const enemiesWithSkills = this.enemyData.filter(enemy => 
          enemy && (
            (enemy.active_skill && enemy.active_skill.name) || 
            (enemy.passive_skill && enemy.passive_skill.name) ||
            (enemy.passive_skills && Array.isArray(enemy.passive_skills) && enemy.passive_skills.length > 0)
          )
        );
        
        if (enemiesWithSkills.length === 0) {
          console.warn('No enemies with skills found, falling back to counter quiz');
          return this.genEnemyCounterQuiz(); // 回退到反击题型
        }
        
        const enemy = sampleOne(enemiesWithSkills);
        const id = this.makeId();
        
        // 收集该敌怪的所有技能（包含名称和描述）
        const skills = [];
        if (enemy.active_skill && enemy.active_skill.name) {
          skills.push({
            name: enemy.active_skill.name,
            description: enemy.active_skill.description || '',
            display: `${enemy.active_skill.name}：${enemy.active_skill.description || '无描述'}`
          });
        }

        if (enemy.passive_skill && enemy.passive_skill.name) {
          skills.push({
            name: enemy.passive_skill.name,
            description: enemy.passive_skill.description || '',
            display: `${enemy.passive_skill.name}：${enemy.passive_skill.description || '无描述'}`
          });
        }
        if (enemy.passive_skills && enemy.passive_skills.length > 0) {
          enemy.passive_skills.forEach(skill => {
            if (skill.name) {
              skills.push({
                name: skill.name,
                description: skill.description || '',
                display: `${skill.name}：${skill.description || '无描述'}`
              });
            }
          });
        }
        
        const correctSkill = sampleOne(skills);
        
        // 收集所有敌怪的技能作为错误选项（包含描述）
        const allSkills = [];
        enemiesWithSkills.forEach(e => {
          if (e.active_skill && e.active_skill.name) {
            allSkills.push({
              name: e.active_skill.name,
              description: e.active_skill.description || '',
              display: `${e.active_skill.name}：${e.active_skill.description || '无描述'}`
            });
          }
          if (e.passive_skill && e.passive_skill.name) {
            allSkills.push({
              name: e.passive_skill.name,
              description: e.passive_skill.description || '',
              display: `${e.passive_skill.name}：${e.passive_skill.description || '无描述'}`
            });
          }
          if (e.passive_skills && e.passive_skills.length > 0) {
            e.passive_skills.forEach(skill => {
              if (skill.name) {
                allSkills.push({
                  name: skill.name,
                  description: skill.description || '',
                  display: `${skill.name}：${skill.description || '无描述'}`
                });
              }
            });
          }
        });
        
        const options = uniqueOptions(correctSkill.display, allSkills.map(s => s.display), 4);
        
        return {
          id,
          type: 'enemy_skill',
          promptText: `敌怪"${enemy.title}"拥有以下哪个技能？`,
          options,
          answer: correctSkill.display,
          explanation: `${enemy.title}拥有技能"${correctSkill.name}"。`
        };
      }
      
      // 敌怪技能描述题型生成函数（称号→技能描述，包含数字变化）
      genEnemySkillDescQuiz() {
        // 检查敌怪数据是否已加载
        if (!this.enemyData || this.enemyData.length === 0) {
          return this.genEnemySkillQuiz(); // 回退到技能题型
        }
        
        // 筛选有技能且技能描述包含数字（排除1）的敌怪
        const extractMatches = (text) => {
          const res = [];
          const reA = /\d+/g; let m;
          while ((m = reA.exec(text))){
            const val = parseInt(m[0],10);
            if (val !== 1) res.push({ start: m.index, end: m.index + m[0].length, val });
          }
          return res;
        };
        
        const replaceMany = (text, changes) => {
          const matches = extractMatches(text);
          const targets = changes.map(c => {
            const m = matches[c.index];
            const rep = String(c.newVal);
            return { start: m.start, end: m.end, rep };
          }).sort((a,b)=> a.start - b.start);
          let out = ''; let pos = 0;
          for (const t of targets){ out += text.slice(pos, t.start) + t.rep; pos = t.end; }
          out += text.slice(pos);
          return out;
        };
        
        const tryDeltas = (v) => {
          const candidates = [-1, 1, -2, 2, -3, 3];
          return candidates.filter(d => v + d > 1);
        };
        
        const genSingleVariants = (text, idx) => {
          const matches = extractMatches(text);
          const base = matches[idx].val;
          const deltas = shuffle(tryDeltas(base));
          const outs = new Set();
          for (const d of deltas){
            const nv = base + d; if (nv <= 1) continue;
            outs.add(replaceMany(text, [{ index: idx, newVal: nv }]));
            if (outs.size >= 3) break;
          }
          return Array.from(outs);
        };
        
        const genTwoVariants = (text, i, j) => {
          const m = extractMatches(text);
          const a = m[i].val, b = m[j].val;
          const delA = tryDeltas(a); const delB = tryDeltas(b);
          const outs = new Set();
          
          // 固定第一个数字，只改第二个数字（生成2个选项）
          if (delB.length >= 2) {
            outs.add(replaceMany(text, [{ index: j, newVal: b + delB[0] }]));
            outs.add(replaceMany(text, [{ index: j, newVal: b + delB[1] }]));
          } else if (delB.length === 1) {
            outs.add(replaceMany(text, [{ index: j, newVal: b + delB[0] }]));
            // 如果第二个数字的变化选项不够，用第一个数字补充
            if (delA.length) {
              outs.add(replaceMany(text, [{ index: i, newVal: a + delA[0] }]));
            }
          }
          
          // 固定第二个数字，只改第一个数字（生成1个选项）
          if (delA.length && outs.size < 3) {
            outs.add(replaceMany(text, [{ index: i, newVal: a + delA[0] }]));
          }
          
          return Array.from(outs).slice(0,3);
        };
        
        let picked = null;
        let totalTries = 0;
        let enemiesWithSkills = 0;
        let skillsWithNumbers = 0;
        
        for (let tries = 0; tries < 180; tries++) {
          totalTries++;
          const enemy = sampleOne(this.enemyData);
          if (!enemy || !enemy.title) {
            continue;
          }
          
          // 收集该敌怪的所有技能
          const skills = [];
          if (enemy.active_skill && enemy.active_skill.name && enemy.active_skill.description) {
            skills.push({
              name: enemy.active_skill.name,
              description: enemy.active_skill.description,
              type: '主动技能'
            });
          }
          if (enemy.passive_skill && enemy.passive_skill.name && enemy.passive_skill.description) {
            skills.push({
              name: enemy.passive_skill.name,
              description: enemy.passive_skill.description,
              type: '被动技能'
            });
          }
          if (enemy.passive_skills && enemy.passive_skills.length > 0) {
            enemy.passive_skills.forEach(skill => {
              if (skill.name && skill.description) {
                skills.push({
                  name: skill.name,
                  description: skill.description,
                  type: '被动技能'
                });
              }
            });
          }
          
          if (skills.length === 0) {
            continue;
          }
          
          enemiesWithSkills++;
          
          // 选择一个包含数字的技能
          const skillsWithNumbers = skills.filter(skill => {
            const matches = extractMatches(skill.description);
            return matches.length > 0;
          });
          
          if (skillsWithNumbers.length === 0) {
            continue;
          }
          
          const selectedSkill = sampleOne(skillsWithNumbers);
          const desc = selectedSkill.description;
          const matches = extractMatches(desc);
          
          if (!matches.length) continue; // 必须含阿拉伯数字（不含值为1）
          
          let variants = [];
          if (matches.length === 1){
            variants = genSingleVariants(desc, 0);
          } else if (matches.length === 2){
            if (quizRandom.random() < 0.5){
              const idx = quizRandom.random() < 0.5 ? 0 : 1;
              variants = genSingleVariants(desc, idx);
              if (variants.length < 3){
                const more = genSingleVariants(desc, idx===0?1:0);
                for (const v of more){ if (v!==desc && !variants.includes(v)) variants.push(v); if (variants.length>=3) break; }
              }
            } else {
              variants = genTwoVariants(desc, 0, 1);
            }
          } else {
            if (quizRandom.random() < 0.5){
              const idx = Math.floor(quizRandom.random()*matches.length);
              variants = genSingleVariants(desc, idx);
            } else {
              const idxs = shuffle([...Array(matches.length).keys()]).slice(0,2).sort((a,b)=>a-b);
              variants = genTwoVariants(desc, idxs[0], idxs[1]);
            }
          }
          
          const uniq = Array.from(new Set(variants.filter(v => v && v !== desc)));
          if (uniq.length >= 3){
            const id = this.makeId('enemy_skill_desc', enemy.title);
            if (this.used.has(id)) continue;
            this.used.add(id);
            const options = shuffle([desc, uniq[0], uniq[1], uniq[2]]);
            picked = { 
              id, 
              promptText: `敌怪"${enemy.title}"的${selectedSkill.type}"${selectedSkill.name}"的描述是？`, 
              options, 
              answer: desc,
              explanation: `敌怪"${enemy.title}"的${selectedSkill.type}"${selectedSkill.name}"的正确描述是：${desc}`
            };
            break;
          }
        }
        
        if (!picked) {
          return null;
        }
        
        return { 
          id: picked.id, 
          type: 'enemy_skill_desc', 
          promptImage: null, 
          promptText: picked.promptText, 
          options: picked.options, 
          answer: picked.answer,
          explanation: picked.explanation
        };
      }
      
      // 技能敌怪题型生成函数（技能→称号）
      genSkillEnemyQuiz() {
        // 检查敌怪数据是否已加载
        if (!this.enemyData || this.enemyData.length === 0) {
          console.warn('Enemy data not loaded, falling back to counter quiz');
          return this.genEnemyCounterQuiz(); // 回退到反击题型
        }
        
        // 筛选有技能的敌怪
        const enemiesWithSkills = this.enemyData.filter(enemy => 
          enemy && (
            (enemy.active_skill && enemy.active_skill.name) || 
            (enemy.passive_skill && enemy.passive_skill.name) ||
            (enemy.passive_skills && Array.isArray(enemy.passive_skills) && enemy.passive_skills.length > 0)
          )
        );
        
        if (enemiesWithSkills.length === 0) {
          console.warn('No enemies with skills found, falling back to counter quiz');
          return this.genEnemyCounterQuiz(); // 回退到反击题型
        }
        
        const enemy = sampleOne(enemiesWithSkills);
        const id = this.makeId();
        
        // 收集该敌怪的所有技能（包含描述信息）
        const skills = [];
        if (enemy.active_skill && enemy.active_skill.name) {
          skills.push({
            name: enemy.active_skill.name,
            description: enemy.active_skill.description || '无描述'
          });
        }
        if (enemy.passive_skill && enemy.passive_skill.name) {
          skills.push({
            name: enemy.passive_skill.name,
            description: enemy.passive_skill.description || '无描述'
          });
        }
        if (enemy.passive_skills && enemy.passive_skills.length > 0) {
          enemy.passive_skills.forEach(skill => {
            if (skill.name) {
              skills.push({
                name: skill.name,
                description: skill.description || '无描述'
              });
            }
          });
        }
        
        const selectedSkill = sampleOne(skills);
        const correctAnswer = enemy.title;
        
        // 收集所有敌怪称号作为错误选项
        const allTitles = enemiesWithSkills.map(e => e.title).filter(title => title);
        const options = uniqueOptions(correctAnswer, allTitles, 4);
        
        return {
          id,
          type: 'skill_enemy',
          promptText: `技能"${selectedSkill.name}"：${selectedSkill.description}\n\n该技能属于哪个敌怪？`,
          options,
          answer: correctAnswer,
          explanation: `技能"${selectedSkill.name}"属于敌怪"${correctAnswer}"。`
        };
      }
      
      genSkillDescriptionQuiz() {
        // 检查技巧数据是否已加载
        if (!this.skills || this.skills.length === 0) {
          console.warn('Skill data not loaded for skill_description quiz');
          return null; // 返回null，让统一的回退机制处理
        }
        
        // 筛选未使用的技巧
        const availableSkills = this.skills.filter(skill => 
          skill && skill.id && skill.correct_description && skill.incorrect_description &&
          !this.usedSkillIds.has(skill.id)
        );
        
        if (availableSkills.length < 4) {
          console.warn('Not enough unused skills available for skill_description quiz');
          return null; // 返回null，让统一的回退机制处理
        }
        
        // 随机选择题目类型：正确描述题或错误描述题
        const isCorrectType = quizRandom.random() > 0.5;
        const questionType = isCorrectType ? 'correct' : 'incorrect';
        
        // 选择一个技巧作为正确答案
        const correctSkill = sampleOne(availableSkills);
        this.usedSkillIds.add(correctSkill.id);
        
        // 从剩余技巧中选择3个作为错误选项
        const remainingSkills = availableSkills.filter(skill => skill.id !== correctSkill.id);
        const wrongSkills = [];
        for (let i = 0; i < 3 && remainingSkills.length > 0; i++) {
          const wrongSkill = sampleOne(remainingSkills);
          wrongSkills.push(wrongSkill);
          this.usedSkillIds.add(wrongSkill.id);
          // 从剩余列表中移除已选择的
          const index = remainingSkills.indexOf(wrongSkill);
          if (index > -1) remainingSkills.splice(index, 1);
        }
        
        if (wrongSkills.length < 3) {
          console.warn('Not enough skills for wrong options in skill_description quiz');
          return null; // 返回null，让统一的回退机制处理
        }
        
        const id = this.makeId('skill_description', correctSkill.id);
        
        let promptText, correctAnswer, options;
        
        if (isCorrectType) {
          // 正确描述题：3个错误描述 + 1个正确描述
          promptText = '以下选项最可能正确的是？';
          correctAnswer = correctSkill.correct_description;
          const wrongOptions = wrongSkills.map(skill => skill.incorrect_description);
          options = uniqueOptions(correctAnswer, wrongOptions, 4);
        } else {
          // 错误描述题：3个正确描述 + 1个错误描述  
          promptText = '以下选项有明显错误的是？';
          correctAnswer = correctSkill.incorrect_description;
          const wrongOptions = wrongSkills.map(skill => skill.correct_description);
          options = uniqueOptions(correctAnswer, wrongOptions, 4);
        }
        
        // 构建选项详细信息，用于解析
        const optionDetails = [];
        options.forEach((option, index) => {
          let sourceSkill = null;
          let isIncorrectDescription = false;
          
          if (option === correctAnswer) {
            sourceSkill = correctSkill;
            isIncorrectDescription = !isCorrectType;
          } else {
            // 找到对应的错误选项技能
            if (isCorrectType) {
              // 正确描述题，错误选项是incorrect_description
              sourceSkill = wrongSkills.find(skill => skill.incorrect_description === option);
              isIncorrectDescription = true;
            } else {
              // 错误描述题，错误选项是correct_description
              sourceSkill = wrongSkills.find(skill => skill.correct_description === option);
              isIncorrectDescription = false;
            }
          }
          
          optionDetails.push({
            text: option,
            source: sourceSkill?.source || null,
            isIncorrectDescription: isIncorrectDescription,
            correctDescription: sourceSkill?.correct_description || null,
            incorrectDescription: sourceSkill?.incorrect_description || null
          });
        });

        return {
          id,
          type: 'skill_description',
          promptText,
          options,
          answer: correctAnswer,
          explanation: `该题考查的是游戏机制的理解。正确答案来源：${correctSkill.source || '游戏官方资料'}。`,
          optionDetails: optionDetails
        };
      }
      
      next(mode='mixed', totalQuestions=10){
        // 检查是否启用难度递增模式
        if (mode === 'mixed' && this.progressiveMode) {
          const result = this.nextProgressiveQuestion();
          return result;
        }
        
        if (mode === 'name') return this.genNameQuiz();
        if (mode === 'effect') return this.genEffectQuiz();
        if (mode === 'event_name') return this.genEventNameQuiz();
        if (mode === 'event_effect') return this.genEventEffectQuiz();
        if (mode === 'char_birthday_from_name') return this.genCharBirthdayFromNameQuiz();
        if (mode === 'char_name_from_birthday') return this.genCharNameFromBirthdayQuiz();
        if (mode === 'char_food_from_name') return this.genCharFoodFromNameQuiz();
        if (mode === 'char_name_from_food') return this.genCharNameFromFoodQuiz();
        if (mode === 'card_effect_desc') return this.genCardEffectDescFromNameQuiz();
        if (mode === 'char_title') return this.genCharTitleQuiz();
        if (mode === 'char_skill_role') return this.genCharSkillFromRoleQuiz();
        if (mode === 'char_skill_desc') return this.genCharSkillDescFromRoleQuiz();
        if (mode === 'char_skill_skill') return this.genCharSkillToRoleQuiz();
        if (mode === 'char_attr_role') return this.genCharAttrFromRoleQuiz();
        if (mode === 'char_attr_pair') return this.genCharAttrPairQuiz();
        if (mode === 'char_level_effect') return this.genCharLevelEffectFromLevelQuiz();
        if (mode === 'char_level_level') return this.genCharLevelFromEffectQuiz();
        if (mode === 'enemy_counter') return this.genEnemyCounterQuiz();
        if (mode === 'enemy_skill') return this.genEnemySkillQuiz();
        if (mode === 'enemy_skill_desc') return this.genEnemySkillDescQuiz();
        if (mode === 'skill_enemy') return this.genSkillEnemyQuiz();
        
        // 混合：如果提供了新配置（池 + 难度 + 题型微调），优先使用新逻辑；否则兼容旧版按题型权重
        const cfg = this.config || {};
        const hasNew = cfg && cfg.pools && cfg.difficultyRatio;
        if (!hasNew) {
          // 兼容旧版：按每题型权重（原有实现）
          const d = (this.config && this.config.distribution) || {};
          const funcs = [
            { fn: this.genNameQuiz.bind(this), w: Number(d.name ?? 1) },
            { fn: this.genEffectQuiz.bind(this), w: Number(d.effect ?? 1) },
            { fn: this.genCharTitleQuiz.bind(this), w: Number(d.char_title ?? 1) },
            { fn: this.genCharSkillFromRoleQuiz.bind(this), w: Number(d.char_skill_role ?? 1) },
            { fn: this.genCharSkillDescFromRoleQuiz.bind(this), w: Number(d.char_skill_desc ?? 0) },
            { fn: this.genCharSkillToRoleQuiz.bind(this), w: Number(d.char_skill_skill ?? 1) },
            { fn: this.genCharAttrFromRoleQuiz.bind(this), w: Number(d.char_attr_role ?? 0) },
            { fn: this.genCharAttrPairQuiz.bind(this), w: Number(d.char_attr_pair ?? 0) },
            { fn: this.genCharLevelEffectFromLevelQuiz.bind(this), w: Number(d.char_level_effect ?? 0) },
            { fn: this.genCharLevelFromEffectQuiz.bind(this), w: Number(d.char_level_level ?? 0) }
          ];
          const totalW = funcs.reduce((s, f) => s + (f.w > 0 ? f.w : 0), 0);
          const pick = () => {
            if (!totalW) return sampleOne(funcs).fn();
            let r = quizRandom.random() * totalW;
            for (const { fn, w } of funcs) {
              const wv = w > 0 ? w : 0;
              if ((r -= wv) <= 0) {
                return fn();
              }
            }
            return funcs[funcs.length - 1].fn();
          };
          let q = null;
          for (let i = 0; i < 8; i++) { 
            q = pick(); 
            if (q) {
              break;
            }
          }
          if (!q) q = sampleOne(funcs).fn();
          return q;
        }
      
        // 新版混合：按“题目池 -> 难度 -> 题型微调权重”选择
        const typeFns = {
          name: this.genNameQuiz.bind(this),
          effect: this.genEffectQuiz.bind(this),
          card_effect_desc: this.genCardEffectDescFromNameQuiz.bind(this),
          char_title: this.genCharTitleQuiz.bind(this),
          char_skill_role: this.genCharSkillFromRoleQuiz.bind(this),
          char_skill_desc: this.genCharSkillDescFromRoleQuiz.bind(this),
          char_skill_skill: this.genCharSkillToRoleQuiz.bind(this),
          char_attr_role: this.genCharAttrFromRoleQuiz.bind(this),
          char_attr_pair: this.genCharAttrPairQuiz.bind(this),
          char_level_effect: this.genCharLevelEffectFromLevelQuiz.bind(this),
          char_level_level: this.genCharLevelFromEffectQuiz.bind(this),
          event_name: this.genEventNameQuiz.bind(this),
          event_effect: this.genEventEffectQuiz.bind(this),
          battle_decision: this.genBattleDecisionQuiz.bind(this),
          enemy_counter: this.genEnemyCounterQuiz.bind(this),
          enemy_skill: this.genEnemySkillQuiz.bind(this),
          enemy_skill_desc: this.genEnemySkillDescQuiz.bind(this),
          skill_enemy: this.genSkillEnemyQuiz.bind(this)
        };
        const typeWeight = (t) => {
          const w = cfg.types && Object.prototype.hasOwnProperty.call(cfg.types, t) ? Number(cfg.types[t]) : 1;
          const result = isFinite(w) ? w : 1;
          // console.log(`Type weight for ${t}: configured=${w}, final=${result}`);
          return result;
        };
        const weightedPick = (items) => { // items: [{key, w}]
          const arr = (items || []).filter(it => it && it.w > 0);
          const sum = arr.reduce((s, it) => s + it.w, 0);
          if (sum <= 0) return null;
          let r = quizRandom.random() * sum;
          for (const it of arr) { if ((r -= it.w) <= 0) return it.key; }
          return arr.length ? arr[arr.length-1].key : null;
        };
        const tryPick = () => {
          // 1) 选池
          const pools = Object.entries(cfg.pools || {}).map(([k, v]) => ({ key: k, w: Math.max(0, Number(v) || 0) }));
          let pool = weightedPick(pools) || 'character';
          
          // 2) 选难度（按池内难度分布）
          // 使用 difficultyRatio 配置来选择难度
          const diffs = cfg.difficultyRatio || {};
          const diffItems = Object.entries(diffs).map(([k, v]) => ({ key: k, w: Math.max(0, Number(v) || 0) }));
          let diff = weightedPick(diffItems);
          
          const difficultiesOrder = ['easy','normal','hard'];
          
          // 3) 检查是否应该使用固定题目
          if (diff && this.shouldUseFixedQuestion(pool, diff)) {
            const fixedQuestions = this.getFixedQuestions(pool, diff);
            if (fixedQuestions.length > 0) {
              const fixedQ = sampleOne(fixedQuestions);
              // 将选中的固定题目ID添加到已使用列表
              if (fixedQ.id) {
                this.usedFixedQuestionIds.add(fixedQ.id);
              }
              return {
                promptText: fixedQ.question,
                options: fixedQ.options,
                answer: fixedQ.options[fixedQ.answer],
                explanation: fixedQ.explanation || '',
                source: 'fixed',
                originalSource: fixedQ.source, // 保存原始source字段
                actualDifficulty: diff
              };
            }
          }
          
          // 4) 在 pool + diff 下挑可用题型；若该 diff 无可用题型，则回退到该池所有难度；再无则全局兜底
          const candidateBy = (p, d) => {
            const candidates = Object.keys(typeFns).filter(t => {
              const m = TYPE_META[t]; if (!m) return false;
              if (m.pool !== p) return false;
              if (d && m.difficulty !== d) return false;
              return typeWeight(t) > 0;
            });
            return candidates;
          };
          let candidates = diff ? candidateBy(pool, diff) : [];
          
          if (!candidates.length) {
            candidates = ['card','character','event','profile','decision','enemy'].filter(p => p !== pool).flatMap(p => candidateBy(p, diff));
          }
          
          if (!candidates.length) {
            candidates = difficultiesOrder.flatMap(dk => candidateBy(pool, dk));
          }
          
          if (!candidates.length) {
            candidates = ['card','character','event','profile','decision','enemy'].flatMap(p => difficultiesOrder.flatMap(dk => candidateBy(p, dk)));
          }
          
          if (!candidates.length) {
            return null;
          }
          
          // 5) 按题型微调权重在候选中二次加权挑一个具体题型
          const cItems = candidates.map(t => ({ key: t, w: typeWeight(t) }));
          const pickedType = weightedPick(cItems) || candidates[0];
          
          const generatedQuestion = typeFns[pickedType]();
          
          // 为随机生成的题目添加实际难度信息
          if (generatedQuestion && pickedType) {
            const typeMeta = TYPE_META[pickedType];
            if (typeMeta && typeMeta.difficulty) {
              generatedQuestion.actualDifficulty = typeMeta.difficulty;
            }
          }
          return generatedQuestion;
        };
        let q = null;
        for (let i = 0; i < 8; i++) { 
          q = tryPick(); 
          if (q) {
            break;
          }
        }
        if (!q) {
          const allFns = Object.values(typeFns);
          q = sampleOne(allFns)();
          // 为兜底生成的题目尝试添加难度信息
          if (q) {
            // 尝试从题目类型推断难度
            for (const [type, meta] of Object.entries(TYPE_META)) {
              if (typeFns[type] && meta.difficulty) {
                // 简单的类型匹配，可能不完全准确，但提供一个默认值
                q.actualDifficulty = meta.difficulty;
                break;
              }
            }
          }
        }
        return q;
      }

      // 加载敌怪数据
      async loadEnemyData() {
        try {
          const response = await fetch('./assets/game_data/enemy.json');
          const data = await response.json();
          this.enemyData = data.characters || [];
          
          // 检查前几个敌怪的数据结构
          if (this.enemyData.length > 0) {
            
            // 统计有技能的敌怪数量
            let enemiesWithActiveSkill = 0;
            let enemiesWithPassiveSkill = 0;
            let enemiesWithPassiveSkills = 0;
            let skillsWithNumbers = 0;
            
            this.enemyData.forEach((enemy, index) => {
              if (enemy.active_skill && enemy.active_skill.name && enemy.active_skill.description) {
                enemiesWithActiveSkill++;
                if (/\d+/.test(enemy.active_skill.description) && !/^1$/.test(enemy.active_skill.description.match(/\d+/)?.[0])) {
                  skillsWithNumbers++;
                }
              }
              if (enemy.passive_skill && enemy.passive_skill.name && enemy.passive_skill.description) {
                enemiesWithPassiveSkill++;
                if (/\d+/.test(enemy.passive_skill.description) && !/^1$/.test(enemy.passive_skill.description.match(/\d+/)?.[0])) {
                  skillsWithNumbers++;
                }
              }
              if (enemy.passive_skills && enemy.passive_skills.length > 0) {
                enemiesWithPassiveSkills++;
                enemy.passive_skills.forEach(skill => {
                  if (skill.description && /\d+/.test(skill.description) && !/^1$/.test(skill.description.match(/\d+/)?.[0])) {
                    skillsWithNumbers++;
                  }
                });
              }
            });
            
          }
        } catch (error) {
          console.warn('Failed to load enemy data:', error);
          this.enemyData = [];
        }
      }

      // 加载技巧数据
      async loadSkillData() {
        try {
          // 添加缓存破坏参数
          const timestamp = Date.now();
          const response = await fetch(`./assets/game_data/skill.json?t=${timestamp}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const text = await response.text();
          
          const data = JSON.parse(text);
          this.skills = Array.isArray(data) ? data : [];
          
          // 检查前几个技巧的数据结构
          if (this.skills.length > 0) {
          }
        } catch (error) {
          console.warn('Failed to load skill data:', error);
          this.skills = [];
        }
      }

      // 加载固定题目数据
      async loadFixedQuestions() {
        try {
          const response = await fetch('./assets/game_data/fixed_questions.json');
          this.fixedQuestions = await response.json();
        } catch (error) {
          console.warn('Failed to load fixed questions:', error);
          this.fixedQuestions = null;
        }
      }

      // 根据池子和难度获取固定题目
      getFixedQuestions(pool, difficulty) {
        if (!this.fixedQuestions) return [];
        
        // 处理不同的池子名称映射
        let poolKey = pool;
        if (pool === 'character') poolKey = 'character';
        else if (pool === 'card') poolKey = 'card';
        else if (pool === 'event') poolKey = 'event';
        else if (pool === 'profile') poolKey = 'profile';
        
        const poolData = this.fixedQuestions[poolKey];
        if (!poolData || !poolData[difficulty]) return [];
        
        // 过滤掉已使用的固定题目
        const allQuestions = poolData[difficulty] || [];
        const availableQuestions = allQuestions.filter(q => !this.usedFixedQuestionIds.has(q.id));
        
        return availableQuestions;
      }

      // 判断是否应该使用固定题目
      shouldUseFixedQuestion(pool, difficulty) {
        const ratio = this.config.fixedRatio?.[pool] || 0;
        const randomValue = quizRandom.random();
        const shouldUse = randomValue < ratio;
        return shouldUse;
      }

      // 通用的题型生成方法，支持固定题目和随机题目混合
      generateQuestionWithFixed(pool, difficulty, randomGeneratorFn) {
        // 检查是否应该使用固定题目
        if (this.shouldUseFixedQuestion(pool, difficulty)) {
          const fixedQuestions = this.getFixedQuestions(pool, difficulty);
          if (fixedQuestions.length > 0) {
            const fixedQ = sampleOne(fixedQuestions);
            // 将选中的固定题目ID添加到已使用列表
            if (fixedQ.id) {
              this.usedFixedQuestionIds.add(fixedQ.id);
            }
            return {
              promptText: fixedQ.question,
              options: fixedQ.options,
              answer: fixedQ.options[fixedQ.answer],
              explanation: fixedQ.explanation || '',
              source: 'fixed',
              originalSource: fixedQ.source, // 保存原始source字段
              actualDifficulty: difficulty
            };
          }
        }
        
        // 使用随机生成方法
        return randomGeneratorFn();
      }
      
      // 启用难度递增模式
      enableProgressiveMode(totalQuestions) {
        this.progressiveMode = true;
        this.currentDifficultyCount = 0;
        this.difficultyOrder = ['easy', 'normal', 'hard'];
        
        // 重置所有已使用的ID集合
        this.used.clear();
        this.usedSkillIds.clear();
        this.usedFixedQuestionIds.clear();
        
        // 根据配置的难度比例分配题目数量
        const cfg = this.config || {};
        const ratio = cfg.difficultyRatio || { easy: 1, normal: 1, hard: 1 };
        const totalRatio = ratio.easy + ratio.normal + ratio.hard;
        
        // 正确处理比例为0的情况
        this.questionsPerDifficulty = {
          easy: ratio.easy === 0 ? 0 : Math.ceil(totalQuestions * ratio.easy / totalRatio),
          normal: ratio.normal === 0 ? 0 : Math.ceil(totalQuestions * ratio.normal / totalRatio),
          hard: ratio.hard === 0 ? 0 : Math.ceil(totalQuestions * ratio.hard / totalRatio)
        };
        
        // 确保总题数正确（处理舍入误差）
        const actualTotal = this.questionsPerDifficulty.easy + this.questionsPerDifficulty.normal + this.questionsPerDifficulty.hard;
        if (actualTotal > totalQuestions) {
          // 从最后一个有题目的难度减去多余的题目
          if (this.questionsPerDifficulty.hard > 0) {
            this.questionsPerDifficulty.hard -= (actualTotal - totalQuestions);
          } else if (this.questionsPerDifficulty.normal > 0) {
            this.questionsPerDifficulty.normal -= (actualTotal - totalQuestions);
          } else if (this.questionsPerDifficulty.easy > 0) {
            this.questionsPerDifficulty.easy -= (actualTotal - totalQuestions);
          }
        } else if (actualTotal < totalQuestions) {
          // 如果总数不够，添加到最后一个有题目的难度
          const remaining = totalQuestions - actualTotal;
          if (this.questionsPerDifficulty.hard > 0) {
            this.questionsPerDifficulty.hard += remaining;
          } else if (this.questionsPerDifficulty.normal > 0) {
            this.questionsPerDifficulty.normal += remaining;
          } else if (this.questionsPerDifficulty.easy > 0) {
            this.questionsPerDifficulty.easy += remaining;
          }
        }
        
        // 找到第一个有题目的难度作为起始难度
        this.currentDifficultyIndex = 0;
        while (this.currentDifficultyIndex < this.difficultyOrder.length && 
               this.questionsPerDifficulty[this.difficultyOrder[this.currentDifficultyIndex]] === 0) {
          this.currentDifficultyIndex++;
        }
      }
      
      // 难度递增模式下的题目生成
      nextProgressiveQuestion() {
        const currentDifficulty = this.difficultyOrder[this.currentDifficultyIndex];
        const maxQuestionsForCurrentDifficulty = this.questionsPerDifficulty[currentDifficulty];
        
        // 检查是否需要切换到下一个难度
        if (this.currentDifficultyCount >= maxQuestionsForCurrentDifficulty) {
          // 寻找下一个有题目的难度
          do {
            this.currentDifficultyIndex++;
          } while (this.currentDifficultyIndex < this.difficultyOrder.length && 
                   this.questionsPerDifficulty[this.difficultyOrder[this.currentDifficultyIndex]] === 0);
          
          this.currentDifficultyCount = 0;
        }
        
        // 如果已经超出所有难度范围，返回null
        if (this.currentDifficultyIndex >= this.difficultyOrder.length) {
          return null;
        }
        
        const newCurrentDifficulty = this.difficultyOrder[this.currentDifficultyIndex];
        this.currentDifficultyCount++;
        
        // 生成指定难度的题目
        return this.generateQuestionByDifficulty(newCurrentDifficulty);
      }
      
      // 根据指定难度生成题目
      generateQuestionByDifficulty(difficulty) {
        
        const cfg = this.config || {};
        const typeFns = {
          name: this.genNameQuiz.bind(this),
          effect: this.genEffectQuiz.bind(this),
          card_effect_desc: this.genCardEffectDescFromNameQuiz.bind(this),
          char_title: this.genCharTitleQuiz.bind(this),
          char_skill_role: this.genCharSkillFromRoleQuiz.bind(this),
          char_skill_desc: this.genCharSkillDescFromRoleQuiz.bind(this),
          char_skill_skill: this.genCharSkillToRoleQuiz.bind(this),
          char_attr_role: this.genCharAttrFromRoleQuiz.bind(this),
          char_attr_pair: this.genCharAttrPairQuiz.bind(this),
          char_level_effect: this.genCharLevelEffectFromLevelQuiz.bind(this),
          char_level_level: this.genCharLevelFromEffectQuiz.bind(this),
          event_name: this.genEventNameQuiz.bind(this),
          event_effect: this.genEventEffectQuiz.bind(this),
          char_birthday_from_name: this.genCharBirthdayFromNameQuiz.bind(this),
          char_name_from_birthday: this.genCharNameFromBirthdayQuiz.bind(this),
          char_food_from_name: this.genCharFoodFromNameQuiz.bind(this),
          char_name_from_food: this.genCharNameFromFoodQuiz.bind(this),
          battle_decision: this.genBattleDecisionQuiz.bind(this),
          enemy_counter: this.genEnemyCounterQuiz.bind(this),
          enemy_skill: this.genEnemySkillQuiz.bind(this),
          enemy_skill_desc: this.genEnemySkillDescQuiz.bind(this),
          skill_enemy: this.genSkillEnemyQuiz.bind(this),
          skill_description: this.genSkillDescriptionQuiz.bind(this)
        };
        
        // 权重选择函数
        const weightedPick = (items) => {
          const arr = (items || []).filter(it => it && it.w > 0);
          const sum = arr.reduce((s, it) => s + it.w, 0);
          if (sum <= 0) return null;
          let r = quizRandom.random() * sum;
          for (const it of arr) { if ((r -= it.w) <= 0) return it.key; }
          return arr.length ? arr[arr.length-1].key : null;
        };
        
        // 题型权重函数
        const typeWeight = (t) => {
          const w = cfg.types && Object.prototype.hasOwnProperty.call(cfg.types, t) ? Number(cfg.types[t]) : 1;
          return isFinite(w) ? w : 1;
        };
        
        // 1) 根据pools配置选择池子
        const pools = Object.entries(cfg.pools || {}).map(([k, v]) => ({ key: k, w: Math.max(0, Number(v) || 0) }));
        let selectedPool = weightedPick(pools) || 'character';
        
        // 2) 首先尝试从固定题目中获取指定难度的题目
        if (this.shouldUseFixedQuestion(selectedPool, difficulty)) {
          const fixedQuestions = this.getFixedQuestions(selectedPool, difficulty);
          if (fixedQuestions.length > 0) {
            const fixedQ = sampleOne(fixedQuestions);
            // 将选中的固定题目ID添加到已使用列表
            if (fixedQ.id) {
              this.usedFixedQuestionIds.add(fixedQ.id);
            }
            return {
              promptText: fixedQ.question,
              options: fixedQ.options,
              answer: fixedQ.options[fixedQ.answer],
              explanation: fixedQ.explanation || '',
              source: 'fixed',
              originalSource: fixedQ.source, // 保存原始source字段
              actualDifficulty: difficulty
            };
          }
        }
        
        // 3) 如果没有固定题目，或者不使用固定题目，尝试随机生成
        // 筛选出指定难度和池子的题型
        const availableTypes = Object.keys(typeFns).filter(type => {
          const meta = TYPE_META[type];
          if (!meta || meta.difficulty !== difficulty) return false;
          if (meta.pool !== selectedPool) return false;
          return typeWeight(type) > 0;
        });
        
        // 如果选中的池子有该难度的题型，使用随机生成
        if (availableTypes.length > 0) {
          const typeItems = availableTypes.map(t => ({ key: t, w: typeWeight(t) }));
          const selectedType = weightedPick(typeItems) || availableTypes[0];
          
          let question = null;
          for (let i = 0; i < 5; i++) {
            question = typeFns[selectedType]();
            if (question) break;
          }
          
          if (question) {
            return question;
          }
        }
        
        // 4) 如果选中的池子没有该难度的随机题目，按权重重新选择其他池子
        // 创建排除原池子的权重池子列表
        const fallbackPools = Object.entries(cfg.pools || {})
          .filter(([poolName, weight]) => poolName !== selectedPool && weight > 0)
          .map(([poolName, weight]) => ({ key: poolName, w: Math.max(0, Number(weight) || 0) }));
        
        // 按权重随机选择回退池子
        while (fallbackPools.length > 0) {
          const fallbackPool = weightedPick(fallbackPools);
          if (!fallbackPool) break;
          
          // 从权重列表中移除已尝试的池子，避免重复选择
          const poolIndex = fallbackPools.findIndex(p => p.key === fallbackPool);
          if (poolIndex >= 0) {
            fallbackPools.splice(poolIndex, 1);
          }
          
          // 筛选出该池子中指定难度的题型
          const poolAvailableTypes = Object.keys(typeFns).filter(type => {
            const meta = TYPE_META[type];
            if (!meta || meta.difficulty !== difficulty) return false;
            if (meta.pool !== fallbackPool) return false;
            return typeWeight(type) > 0;
          });
          
          if (poolAvailableTypes.length > 0) {
            const typeItems = poolAvailableTypes.map(t => ({ key: t, w: typeWeight(t) }));
            const selectedType = weightedPick(typeItems) || poolAvailableTypes[0];
            
            let question = null;
            for (let i = 0; i < 5; i++) {
              question = typeFns[selectedType]();
              if (question) break;
            }
            
            if (question) {
              return question;
            }
          }
        }
        
        // 5) 如果随机题目都没有，按权重检查其他池子的固定题目
        // 重新创建排除原池子的权重池子列表（因为上面的循环可能已经修改了fallbackPools）
        const fixedFallbackPools = Object.entries(cfg.pools || {})
          .filter(([poolName, weight]) => poolName !== selectedPool && weight > 0)
          .map(([poolName, weight]) => ({ key: poolName, w: Math.max(0, Number(weight) || 0) }));
        
        // 按权重随机选择回退池子检查固定题目
        while (fixedFallbackPools.length > 0) {
          const fallbackPool = weightedPick(fixedFallbackPools);
          if (!fallbackPool) break;
          
          // 从权重列表中移除已尝试的池子
          const poolIndex = fixedFallbackPools.findIndex(p => p.key === fallbackPool);
          if (poolIndex >= 0) {
            fixedFallbackPools.splice(poolIndex, 1);
          }
          
          if (this.shouldUseFixedQuestion(fallbackPool, difficulty)) {
            const fixedQuestions = this.getFixedQuestions(fallbackPool, difficulty);
            if (fixedQuestions.length > 0) {
              const fixedQ = sampleOne(fixedQuestions);
              // 将选中的固定题目ID添加到已使用列表
              if (fixedQ.id) {
                this.usedFixedQuestionIds.add(fixedQ.id);
              }
              return {
                promptText: fixedQ.question,
                options: fixedQ.options,
                answer: fixedQ.options[fixedQ.answer],
                explanation: fixedQ.explanation || '',
                source: 'fixed',
                originalSource: fixedQ.source, // 保存原始source字段
                actualDifficulty: difficulty
              };
            }
          }
        }
        
        // 5) 如果指定难度没有任何题目（固定+随机），回退到其他难度的随机题目
        
        let finalTypes = Object.keys(typeFns).filter(type => {
          const meta = TYPE_META[type];
          return meta && meta.pool === selectedPool && typeWeight(type) > 0;
        });
        
        // 如果选中池子没有任何题型，使用所有池子的题型
        if (finalTypes.length === 0) {
          finalTypes = Object.keys(typeFns).filter(type => typeWeight(type) > 0);
        }
        
        if (finalTypes.length === 0) {
          // 最后的备用方案：随机选择
          const allFns = Object.values(typeFns);
          return sampleOne(allFns)();
        }
        
        // 6) 根据types权重选择题型并生成
        const typeItems = finalTypes.map(t => ({ key: t, w: typeWeight(t) }));
        const selectedType = weightedPick(typeItems) || finalTypes[0];
        
        let question = null;
        for (let i = 0; i < 5; i++) {
          question = typeFns[selectedType]();
          if (question) break;
        }
        
        // 如果还是生成失败，使用备用方案
        if (!question) {
          const allFns = Object.values(typeFns);
          question = sampleOne(allFns)();
        }
        
        return question;
      }
    }

    // UI 与流程
    (function(){
      const questionView = document.getElementById('questionView');
      const questionText = document.getElementById('questionText');
      const resultView = document.getElementById('resultView');
      const statusBar = document.getElementById('statusBar');
      const qIndexEl = document.getElementById('qIndex');
      const qTotalEl = document.getElementById('qTotal');
      const scoreEl = document.getElementById('score');
      const currentDifficultyEl = document.getElementById('currentDifficulty');
      const progressInner = document.getElementById('progressInner');
      const progressWrap = document.querySelector('.progress');
      const timerEl = document.getElementById('timer');

      const startBtn = document.getElementById('startBtn');
      const nextBtn = document.getElementById('nextBtn');
      const restartBtn = document.getElementById('restartBtn');
      const exitBtn = document.getElementById('exitBtn');
      // 删除了questionCountSel相关的变量定义

      const optEls = [0,1,2,3].map(i => document.getElementById('opt'+i));

      let cards = [];
      let characters = [];
      let events = [];
      let generator = null;
      let mode = 'mixed';
      let current = null;
      let lock = false;

      let total = 10;
      let index = 0; // 1-based显示
      let score = 0;

      // 计时器相关变量
      let timerStartTime = 0;
      let timerInterval = null;
      let totalElapsedTime = 0;
      let timerPaused = false; // 新增：计时器暂停状态

      // 计时器函数
      function startTimer() {
        if (timerPaused) {
          // 如果是从暂停状态恢复，重新设置开始时间
          timerStartTime = Date.now();
          timerPaused = false;
        } else {
          timerStartTime = Date.now();
        }
        if (!timerInterval) {
          timerInterval = setInterval(updateTimer, 1000);
        }
      }

      function pauseTimer() {
        if (timerInterval && !timerPaused) {
          totalElapsedTime += Date.now() - timerStartTime;
          timerPaused = true;
        }
      }

      function resumeTimer() {
        if (timerPaused) {
          timerStartTime = Date.now();
          timerPaused = false;
        }
      }

      function stopTimer() {
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
          if (!timerPaused) {
            totalElapsedTime += Date.now() - timerStartTime;
          }
          timerPaused = false;
        }
      }

      function resetTimer() {
        stopTimer();
        totalElapsedTime = 0;
        timerPaused = false;
        timerEl.textContent = '00:00';
      }

      function updateTimer() {
        if (timerPaused) return; // 暂停时不更新显示
        const currentElapsed = totalElapsedTime + (Date.now() - timerStartTime);
        const seconds = Math.floor(currentElapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      }

      function formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      }

      function setControls(running){
        startBtn.style.display = running ? 'none' : '';
        nextBtn.style.display = 'none'; // 初始隐藏下一题按钮
        
        // 在每日挑战中隐藏重新开始按钮
        if (window.isDailyChallenge) {
          restartBtn.style.display = 'none';
        } else {
          restartBtn.style.display = running ? '' : 'none';
        }
        
        exitBtn.style.display = running ? '' : 'none';
        // 删除了questionCountSel.disabled的设置
        statusBar.style.display = running ? '' : 'none';
        progressWrap.style.display = running ? '' : 'none';
        
        // 显示或隐藏测验布局
        const quizLayout = document.getElementById('quizLayout');
        if (quizLayout) {
          quizLayout.style.display = running ? 'block' : 'none';
        }

        // 仅在主界面显示排行榜主卡片
        const mainLeaderboardCard = document.getElementById('leaderboardCardMain');
        if (mainLeaderboardCard) {
          mainLeaderboardCard.style.display = running ? 'none' : '';
        }
        
        // 移除了对不存在的completionText元素的访问
      }

      // 数字高亮函数
      function highlightNumbers(text, correctAnswer, allOptions = []) {
        // 提取文本中的所有数字及其位置
        function extractNumbers(str) {
          const numbers = [];
          const regex = /\d+/g;
          let match;
          while ((match = regex.exec(str)) !== null) {
            const value = parseInt(match[0], 10);
            if (value !== 1) { // 忽略值为1的数字
              numbers.push({
                value: value,
                start: match.index,
                end: match.index + match[0].length,
                text: match[0]
              });
            }
          }
          return numbers;
        }
        
        // 提取当前选项和正确答案中的数字
        const currentNumbers = extractNumbers(text);
        const correctNumbers = extractNumbers(correctAnswer);
        
        // 如果没有数字，直接返回原文本
        if (currentNumbers.length === 0) {
          return text;
        }
        
        // 找出所有选项中被修改过的数字位置
        const modifiedPositions = new Set();
        
        // 收集所有选项的数字信息
        const allOptionsNumbers = allOptions.map(option => extractNumbers(option));
        
        // 比较所有选项，找出任何位置上有不同数字的位置
        for (let pos = 0; pos < Math.max(...allOptionsNumbers.map(nums => nums.length)); pos++) {
          const valuesAtPosition = new Set();
          
          // 收集这个位置上所有选项的数字值
          for (const optionNumbers of allOptionsNumbers) {
            if (optionNumbers[pos]) {
              valuesAtPosition.add(optionNumbers[pos].value);
            }
          }
          
          // 如果这个位置上有不同的数字值，说明这个位置被修改过
          if (valuesAtPosition.size > 1) {
            modifiedPositions.add(pos);
          }
        }
        
        // 高亮当前选项中所有被修改过位置的数字
        let result = text;
        let offset = 0;
        
        for (let i = 0; i < currentNumbers.length; i++) {
          if (modifiedPositions.has(i)) {
            const currentNum = currentNumbers[i];
            const highlightStart = currentNum.start + offset;
            const highlightEnd = currentNum.end + offset;
            const highlightedNumber = `<span class="number-highlight">${currentNum.text}</span>`;
            
            result = result.slice(0, highlightStart) + highlightedNumber + result.slice(highlightEnd);
            offset += highlightedNumber.length - currentNum.text.length;
          }
        }
        
        return result;
      }

      function renderQuestion(q){
        // 记录每日挑战题目开始时间
        if (window.isDailyChallenge) {
          window.currentQuestionStartTime = Date.now();
          // 使用计时器累计时间作为题目起点，避免包含图片加载等暂停时长
          window.currentQuestionStartElapsed = totalElapsedTime + (timerInterval ? Date.now() - timerStartTime : 0);
        }
        
        // 清理状态
        lock = false;
        resultView.style.display = 'none';
        questionText.style.display = '';
        nextBtn.style.display = 'none'; // 每次渲染新题目时隐藏下一题按钮
        
        // 清除之前的解析内容
        const existingExplanations = document.querySelectorAll('.explanation-content');
        existingExplanations.forEach(el => el.remove());
        
        // 清除之前的题目反馈按钮
        const existingFeedbackBtns = document.querySelectorAll('.question-feedback-btn');
        existingFeedbackBtns.forEach(el => el.remove());
        
        // 首先隐藏所有选项按钮
        optEls.forEach(btn => { 
          btn.classList.remove('correct','incorrect'); 
          btn.style.display='none'; 
          btn.disabled = false; 
        });
        
        // 只显示题目实际需要的选项数量
        for (let i = 0; i < q.options.length && i < optEls.length; i++) {
          optEls[i].style.display = '';
        }

        if (q.promptHTML) {
          // 决策题使用HTML显示图标和数值
          questionView.innerHTML = q.promptHTML;
          questionView.style.display = '';
          questionText.innerHTML = q.promptText.replace(/\n/g, '<br>');
        } else if (q.promptImage) {
          const alt = q.promptAlt || '卡牌';
          questionView.style.display = '';
          questionText.innerHTML = q.promptText.replace(/\n/g, '<br>');
          
          // 异步图片加载处理
          if (q._imagePreloaded) {
            // 图片已预加载，直接显示
            questionView.innerHTML = `<img src="${q.promptImage}" alt="${alt}" class="quiz-card-image"/>`;
          } else {
            // 显示加载占位符并暂停计时器
            questionView.innerHTML = `
              <div class="image-placeholder">
                <div class="loading-spinner"></div>
                <div class="loading-text">图片加载中...</div>
              </div>
            `;
            
            // 暂停计时器
            pauseTimer();
            
            // 异步加载图片
            imagePreloader.preloadImage(q.promptImage).then((img) => {
              if (img && current === q) { // 确保还是当前题目
                questionView.innerHTML = `<img src="${q.promptImage}" alt="${alt}" class="quiz-card-image"/>`;
                // 图片加载完成，恢复计时器
                resumeTimer();
              }
            }).catch((error) => {
              if (current === q) { // 确保还是当前题目
                console.warn('图片加载失败:', error);
                questionView.innerHTML = `
                  <div class="image-error">
                    <div class="error-text">图片加载失败</div>
                  </div>
                `;
                // 即使加载失败也要恢复计时器
                resumeTimer();
              }
            });
          }
        } else {
          questionView.innerHTML = '';
          questionView.style.display = 'none';
          questionText.innerHTML = q.promptText.replace(/\n/g, '<br>');
        }

        // 为固定题目添加来源显示
        if (q.source === 'fixed' && q.originalSource && q.originalSource !== null) {
          const sourceText = `<div style="margin-top: 8px; font-size: 0.9em; color: var(--text-muted); font-style: italic;">来源：${q.originalSource}</div>`;
          questionText.innerHTML += sourceText;
        }

        // 检查是否是包含数字修改的题目类型
        const isNumberModificationQuestion = q.type === 'card_effect_desc' || q.type === 'char_skill_desc' || q.type === 'enemy_skill_desc';
        
        // 特殊处理battle_decision题型的图片按钮
        if (q.type === 'battle_decision') {
          // 隐藏所有选项按钮
          optEls.forEach(btn => { btn.style.display = 'none'; });
          
          // 创建或更新图片按钮容器
          let battleButtonsContainer = document.querySelector('.battle-buttons-container');
          if (!battleButtonsContainer) {
            battleButtonsContainer = document.createElement('div');
            battleButtonsContainer.className = 'battle-buttons-container';
            document.querySelector('.options-list').appendChild(battleButtonsContainer);
          }
          
          // 显示容器（防止之前被隐藏）
          battleButtonsContainer.style.display = 'flex';
          
          // 创建图片按钮HTML（带文本回退与onerror处理）
          battleButtonsContainer.innerHTML = `
            <div class="battle-image-buttons">
              <button class="battle-image-btn" data-answer="防御">
                <img src="images/decisions/ready.png" alt="防御" onerror="this.style.display='none'; this.closest('button').classList.add('img-missing');" />
                <span class="battle-label" style="display:none;">防御</span>
              </button>
              <button class="battle-image-btn" data-answer="闪避">
                <img src="images/decisions/dodg.png" alt="闪避" onerror="this.style.display='none'; this.closest('button').classList.add('img-missing');" />
                <span class="enemy-dice-number">${q.enemyX}</span>
                <span class="battle-label" style="display:none;">闪避</span>
              </button>
            </div>
          `;
          
          // 为图片按钮添加点击事件
          const battleBtns = battleButtonsContainer.querySelectorAll('.battle-image-btn');
          battleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
              const answer = btn.getAttribute('data-answer');
              onSelect(answer, btn);
            });
          });
        } else {
          // 隐藏battle_decision的图片按钮容器（如果存在）
          const battleButtonsContainer = document.querySelector('.battle-buttons-container');
          if (battleButtonsContainer) {
            battleButtonsContainer.style.display = 'none';
          }
          
          // 正常显示文字选项按钮
          q.options.forEach((text, i) => {
            if (i < optEls.length) { // 确保不超出按钮数量
              if (isNumberModificationQuestion) {
                // 对包含数字修改的题目进行高亮处理，传递所有选项
                const highlightedText = highlightNumbers(text, q.answer, q.options);
                optEls[i].querySelector('.opt-text').innerHTML = highlightedText;
              } else {
                optEls[i].querySelector('.opt-text').textContent = text;
              }
            }
          });
        }
        
        // 同时也要高亮正确答案中的数字（当答题后显示正确答案时）
        if (isNumberModificationQuestion && q.answer) {
          // 为了在答题后也能看到正确答案的数字高亮，我们需要存储这个信息
          current.isNumberModificationQuestion = true;
          current.options = q.options; // 存储所有选项用于高亮计算
        }
      }

      function updateStatus(){
        qIndexEl.textContent = index.toString();
        qTotalEl.textContent = total.toString();
        
        // 计算百分制得分
        const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
        scoreEl.textContent = percentage.toString();
        
        // 更新当前难度显示（如果元素存在）
        if (currentDifficultyEl) {
          if (current && current.actualDifficulty) {
            // 优先使用题目的实际难度
            const difficultyNames = { 'easy': '简单', 'normal': '普通', 'hard': '困难' };
            currentDifficultyEl.textContent = difficultyNames[current.actualDifficulty] || '未知';
          } else if (generator && generator.progressiveMode) {
            // 回退到递增模式的当前难度
            const difficultyNames = { 'easy': '简单', 'normal': '普通', 'hard': '困难' };
            const currentDifficulty = generator.difficultyOrder[generator.currentDifficultyIndex];
            currentDifficultyEl.textContent = difficultyNames[currentDifficulty] || '未知';
          } else {
            // 如果没有难度信息，根据当前测验配置显示难度
            const difficultyNames = {
              'normal': '普通',
              'hard': '困难', 
              'nightmare': '噩梦'
            };
            const selectedDifficulty = window.QUIZ_CONFIG?.selectedDifficulty || 'normal';
            currentDifficultyEl.textContent = difficultyNames[selectedDifficulty] || '普通';
          }
        }
        
        const pct = Math.max(0, Math.min(100, Math.round((index-1) / total * 100)));
        progressInner.style.width = pct + '%';
      }

      // 得分计算函数
      function calculateScores(correctAnswers, totalQuestions, timeInSeconds) {
        // 题目得分 = 答题得分（百分制）
        const questionScore = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        
        // 时间得分 = min(max(100+(题目数量*7-答题所用秒数)*0.5,0), 100)
        const timeScore = Math.round(Math.min(Math.max(100 + (totalQuestions * 7 - timeInSeconds)*0.5,0), 100));
        
        // 最终得分 = 题目得分*(5/6) + 时间得分*(1/6)，四舍五入到整数
        const finalScore = Math.round(questionScore * (5/6) + timeScore * (1/6));
        
        return {
          questionScore,
          timeScore,
          finalScore
        };
      }

      function endQuiz(){
        // 停止计时器
        stopTimer();
        
        lock = true;
        nextBtn.style.display = 'none';
        resultView.style.display = '';
        
        // 隐藏做题进度和题目相关元素
        document.getElementById('statusBar').style.display = 'none';
        document.querySelector('.progress').style.display = 'none';
        document.getElementById('quizLayout').style.display = 'none';
        
        // 计算最终用时（秒）
        const finalTime = totalElapsedTime + (timerInterval ? Date.now() - timerStartTime : 0);
        const timeInSeconds = Math.floor(finalTime / 1000);
        
        // 计算各项得分
        const scores = calculateScores(score, total, timeInSeconds);
        
        // 获取测验难度显示名称
        const getDifficultyDisplayName = () => {
          if (window.isDailyChallenge) {
            const date = window.dailyChallengeDate;
            if (date) {
              return `每日挑战 (${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')})`;
            }
            return '每日挑战';
          }
          const difficultyNames = {
            'normal': '普通难度',
            'hard': '困难难度', 
            'nightmare': '噩梦难度',
            'profile': '档案模式'
          };
          return difficultyNames[window.QUIZ_CONFIG.selectedDifficulty] || '未知难度';
        };
        
        // 重置resultView样式以确保居中显示
        resultView.style.textAlign = 'center';
        resultView.style.maxWidth = 'none';
        resultView.style.margin = '0 auto';
        resultView.innerHTML = '';
        
        // 清理题目相关元素
        questionView.innerHTML = '';
        questionText.innerHTML = '';
        optEls.forEach(btn => { btn.style.display='none'; });
        
        // 显示结算表格
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        
        const difficultyName = getDifficultyDisplayName();
        const timeFormatted = formatTime(finalTime);
        
        resultCard.innerHTML = `
          <table class="result-table">
            <tr>
              <td class="result-label">测验难度</td>
              <td class="result-value">${difficultyName}</td>
            </tr>
            <tr>
              <td class="result-label">用时</td>
              <td class="result-value">${timeFormatted}</td>
            </tr>
            <tr>
              <td class="result-label">题目得分</td>
              <td class="result-value">${scores.questionScore}分</td>
            </tr>
            <tr>
              <td class="result-label">时间得分</td>
              <td class="result-value">${scores.timeScore}分</td>
            </tr>
            <tr class="result-total">
              <td class="result-label">总得分</td>
              <td class="result-value">${scores.finalScore}分</td>
            </tr>
          </table>
        `;
        
        resultView.appendChild(resultCard);
        
        // 如果是每日挑战：显示提交按钮，并在结算界面显示主界面的排行榜卡片
        if (window.isDailyChallenge) {
          showDailyChallengeSubmission(scores, timeInSeconds, finalTime);
          const mainLeaderboardCard = document.getElementById('leaderboardCardMain');
          if (mainLeaderboardCard) {
            mainLeaderboardCard.style.display = '';
            // 结算界面也渲染一次主排行榜
            renderLeaderboardCard('leaderboardCardMain');
          }
        }
      }

      async function loadData(){
        const [resCards, resChars, resEvents] = await Promise.all([
          fetch(`assets/game_data/cards.json?t=${Date.now()}`),
          fetch(`assets/game_data/characters.json?t=${Date.now()}`),
          fetch(`assets/game_data/events.json?t=${Date.now()}`)
        ]);
        if(!resCards.ok) throw new Error('卡牌数据加载失败');
        if(!resChars.ok) throw new Error('角色数据加载失败');
        if(!resEvents.ok) throw new Error('事件数据加载失败');
        const [rawCards, rawChars, rawEvents] = await Promise.all([resCards.json(), resChars.json(), resEvents.json()]);
        // 修正图片路径
        cards = rawCards.map(c => ({ ...c, image_path: normalizeImagePath(c.image_path) }));
        characters = Array.isArray(rawChars) ? rawChars : [];
        events = Array.isArray(rawEvents) ? rawEvents.map(e => ({ ...e, image_path: normalizeEventImagePath(e.image_path) })) : [];
      }
      startBtn.addEventListener('click', async () => {
        try {
          // 显示加载动画
          const loadingOverlay = document.getElementById('loadingOverlay');
          loadingOverlay.classList.add('show');
          
          await loadData();
          
          // 隐藏难度选择器
          document.getElementById('difficultySelector').style.display = 'none';
          
          generator = new QuizGenerator(cards, characters, events, window.QUIZ_CONFIG);
          
          // 等待敌怪数据、技巧数据和固定题目加载完成
          await generator.loadEnemyData();
          await generator.loadSkillData();
          await generator.loadFixedQuestions();
          
          mode = 'mixed';
          total = window.QUIZ_CONFIG.questionCount || 10;
          score = 0; index = 1;
          
          // 启用难度递增模式
          // 添加null检查以防止错误
          if (generator && typeof generator.enableProgressiveMode === 'function') {
            generator.enableProgressiveMode(total);
          } else {
            console.error('Generator未正确初始化或enableProgressiveMode方法不存在');
            loadingOverlay.classList.remove('show');
            return;
          }
          
          // 重置计时器（但不启动）
          resetTimer();
          
          // 添加等待时间（1.5秒）
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // 隐藏加载动画
          loadingOverlay.classList.remove('show');
          
          setControls(true);
          updateStatus();
          
          // 初始化缓冲池
          questionBuffer.initialize(generator, mode, total);
          
          current = await questionBuffer.getNext();
          renderQuestion(current);
          
          // 在题目显示后启动计时器
          startTimer();
        } catch(err){
          // 出错时也要隐藏加载动画
          const loadingOverlay = document.getElementById('loadingOverlay');
          loadingOverlay.classList.remove('show');
          
          questionView.innerHTML = '<div class="muted">数据加载失败</div>';
          console.error(err);
        }
      });
      async function nextQuestion(){
        if (index > total) return;
        
        // 题目切换过渡：先淡出
        const qa = document.querySelector('.question-area') || questionArea;
        if (qa) {
          qa.classList.add('fade-out');
          await new Promise(resolve => setTimeout(resolve, 220));
        }
        
        // 使用缓冲池获取下一题
        if (questionBuffer && questionBuffer.generator) {
          current = await questionBuffer.getNext();
        } else {
          // 回退到原始方式（兼容性）
          current = generator.next(mode, total);
        }
        
        if (!current) { 
          if (qa) qa.classList.remove('fade-out');
          endQuiz(); 
          return; 
        }
        
        // 渲染新题目后淡入
        renderQuestion(current);
        if (qa) {
          // 触发淡入
          qa.classList.remove('fade-out');
        }
        updateStatus();
      }

      function onSelect(optionText, btn){
        if (lock) return;
        lock = true;
        const isCorrect = optionText === current.answer;
        if (isCorrect) score += 1;
        
        // 记录每日挑战的答题数据（用于防作弊验证）
        if (window.isDailyChallenge) {
          if (!window.dailyChallengeAnswers) {
            window.dailyChallengeAnswers = [];
          }
          if (!window.dailyChallengeQuestionTimes) {
            window.dailyChallengeQuestionTimes = [];
          }
          
          // 记录答题信息
          // 使用计时器累计时间差计算单题用时，排除图片加载等暂停时间
          const elapsedNowMs = totalElapsedTime + (timerInterval ? Date.now() - timerStartTime : 0);
          const questionTime = Math.max(0, ((elapsedNowMs - (window.currentQuestionStartElapsed || elapsedNowMs)) / 1000));
          window.dailyChallengeAnswers.push({
            questionIndex: index,
            selectedAnswer: optionText,
            correctAnswer: current.answer,
            isCorrect: isCorrect,
            questionId: current.id || `q_${index}`,
            timestamp: Date.now()
          });
          window.dailyChallengeQuestionTimes.push(questionTime);
        }
        
        // 图片按钮（battle_decision）专用标注与动画
        const battleImageBtns = document.querySelectorAll('.battle-image-btn');
        if (battleImageBtns && battleImageBtns.length > 0) {
          const correctImageBtn = Array.from(battleImageBtns).find(b => b.getAttribute('data-answer') === current.answer);
          
          // 禁用图片按钮点击
          battleImageBtns.forEach(b => b.disabled = true);
          
          if (isCorrect) {
            // 为点击的图片按钮添加明显的正确样式与爆裂特效
            btn.classList.add('correct', 'correct-explosion');
            createExplosionEffect(btn);
          } else {
            // 错误时，点击按钮标红，展示正确按钮的绿色高亮
            btn.classList.add('incorrect');
            if (correctImageBtn) correctImageBtn.classList.add('correct');
          }
        }
        
        // 标注
        optEls.forEach(b => {
          const text = b.querySelector('.opt-text').textContent;
          if (text === current.answer) {
            b.classList.add('correct');
            // 如果是数字修改题目，重新高亮正确答案
            if (current.isNumberModificationQuestion) {
              const highlightedText = highlightNumbers(current.answer, current.answer, current.options);
              b.querySelector('.opt-text').innerHTML = highlightedText;
            }
          }
        });
        if (!isCorrect) btn.classList.add('incorrect');
        // 禁用按钮
        optEls.forEach(b => b.disabled = true);
        
        // 答对题目后自动进入下一题，答错显示下一题按钮
        if (isCorrect) {
          // 找到正确答案的按钮并添加爆裂特效
          const correctBtn = Array.from(optEls).find(b => 
            b.querySelector('.opt-text').textContent === current.answer
          );
          if (correctBtn) {
            correctBtn.classList.add('correct-explosion');
            createExplosionEffect(correctBtn);
          }
          
          // 创建背景闪光效果
          const flashElement = document.createElement('div');
          flashElement.className = 'score-flash';
          document.body.appendChild(flashElement);
          
          // 触发得分动画
          scoreEl.classList.add('animate');
          
          // 清理动画效果
          setTimeout(() => {
            scoreEl.classList.remove('animate');
            if (correctBtn) {
              correctBtn.classList.remove('correct-explosion');
            }
            if (flashElement.parentNode) {
              flashElement.parentNode.removeChild(flashElement);
            }
          }, 750);
          
          // 自动进入下一题
          setTimeout(async () => {
            if (index >= total) {
              endQuiz();
            } else {
              index += 1;
              await nextQuestion();
            }
          }, 900);
          nextBtn.style.display = 'none';
        } else {
          // 答错时显示下一题按钮
          nextBtn.style.display = '';
          
          // 为固定题目显示解析
          if (current.source === 'fixed' && current.explanation) {
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'explanation-content'; // 添加类名用于清除
            explanationDiv.style.cssText = `
              margin-top: 12px;
              padding: 12px;
              background: transparent;
              border: 1px solid var(--color-border-info);
              border-radius: 8px;
              font-size: 0.9em;
              line-height: 1.4;
              color: var(--text-color);
            `;
            explanationDiv.innerHTML = `<strong>解析：</strong>${current.explanation}`;
            
            // 将解析添加到"下一题"按钮的后一行
            const nextButtonArea = nextBtn.parentElement;
            nextButtonArea.parentElement.insertBefore(explanationDiv, nextButtonArea.nextSibling);
            
            // 插入“题目有问题？”反馈按钮（位于解析后，如果存在，否则位于下一题按钮之后）
            {
              const feedbackLink = 'https://wj.qq.com/s2/24040427/7fc2/';
              const questionFeedbackBtn = document.createElement('button');
              questionFeedbackBtn.className = 'nav-btn difficulty-btn question-feedback-btn';
              questionFeedbackBtn.style.cssText = 'display: block; margin: 16px auto 0; background-color: #4CAF50;';
              questionFeedbackBtn.innerHTML = '<span class="nav-btn-text">题目有问题？</span>';
              questionFeedbackBtn.addEventListener('click', () => {
                showFeedbackChoice(feedbackLink);
              });
              // 选择插入位置：如果有解析，插在最后一个解析后；否则插在下一题按钮后
              let insertAfterNode = nextButtonArea;
              const createdExplanations = nextButtonArea.parentElement.querySelectorAll('.explanation-content');
              if (createdExplanations && createdExplanations.length > 0) {
                insertAfterNode = createdExplanations[createdExplanations.length - 1];
              }
              nextButtonArea.parentElement.insertBefore(questionFeedbackBtn, insertAfterNode.nextSibling);
            }
          }

          // 为决策题（battle_decision）显示错误解析
          if (current.type === 'battle_decision') {
            const decisionExplanationDiv = document.createElement('div');
            decisionExplanationDiv.className = 'explanation-content';
            decisionExplanationDiv.style.cssText = `
              margin-top: 12px;
              padding: 12px;
              background: transparent;
              border: 1px solid var(--color-border-info);
              border-radius: 8px;
              font-size: 0.9em;
              line-height: 1.4;
              color: var(--text-color);
            `;
            const defendLine = (typeof current.defendN === 'number' && current.defendN <= 0)
              ? '防御必活'
              : (typeof current.defendN === 'number' && current.defendN >= 6)
                ? '防御必死'
                : `防御所需骰数>${current.defendN}`;
            const dodgeLine = (typeof current.enemyX === 'number' && current.enemyX >= 6)
              ? '闪避所需骰数＝6'
              : `闪避所需骰数>${current.enemyX}`;
            decisionExplanationDiv.innerHTML = `<strong>解析：</strong>${defendLine}<br>${dodgeLine}`;
            const nextButtonArea = nextBtn.parentElement;
            nextButtonArea.parentElement.insertBefore(decisionExplanationDiv, nextButtonArea.nextSibling);
          }
          
          // 为skill_description题目显示选项解析
          if (current.type === 'skill_description' && current.optionDetails) {
            const skillExplanationDiv = document.createElement('div');
            skillExplanationDiv.className = 'explanation-content'; // 添加类名用于清除
            skillExplanationDiv.style.cssText = `
              margin-top: 12px;
              padding: 12px;
              background: transparent;
              border: 1px solid var(--color-border-info);
              border-radius: 8px;
              font-size: 0.9em;
              line-height: 1.4;
              color: var(--text-color);
            `;
            
            let explanationHTML = '<strong>选项解析：</strong><br>';
            const optionLabels = ['A', 'B', 'C', 'D'];
            
            current.optionDetails.forEach((detail, index) => {
              if (index < optionLabels.length) {
                const label = optionLabels[index];
                let lineHTML = `${label}. `;
                
                // 显示来源（如果不是null）
                if (detail.source) {
                  lineHTML += `来源：${detail.source}`;
                }
                
                // 如果是incorrect_description，则在来源后贴出correct_description（荧光高亮）
                if (detail.isIncorrectDescription && detail.correctDescription) {
                  const highlight = `<span class="fluorescent-highlight">正确描述：${detail.correctDescription}</span>`;
                  if (detail.source) {
                    lineHTML += `<br>&nbsp;&nbsp;&nbsp;&nbsp;${highlight}`;
                  } else {
                    lineHTML += highlight;
                  }
                }
                
                explanationHTML += lineHTML + '<br>';
              }
            });
            
            skillExplanationDiv.innerHTML = explanationHTML;
            
            // 将解析添加到"下一题"按钮的后一行
            const nextButtonArea = nextBtn.parentElement;
            nextButtonArea.parentElement.insertBefore(skillExplanationDiv, nextButtonArea.nextSibling);
            
            // 插入“题目有问题？”反馈按钮（位于解析后，如果存在，否则位于下一题按钮之后）
            {
              const feedbackLink = 'https://wj.qq.com/s2/24040427/7fc2/';
              const questionFeedbackBtn = document.createElement('button');
              questionFeedbackBtn.className = 'nav-btn difficulty-btn question-feedback-btn';
              questionFeedbackBtn.style.cssText = 'display: block; margin: 16px auto 0; background-color: #4CAF50;';
              questionFeedbackBtn.innerHTML = '<span class="nav-btn-text">题目有问题？</span>';
              questionFeedbackBtn.addEventListener('click', () => {
                showFeedbackChoice(feedbackLink);
              });
              // 选择插入位置：如果有解析，插在最后一个解析后；否则插在下一题按钮后
              let insertAfterNode = nextButtonArea;
              const createdExplanations = nextButtonArea.parentElement.querySelectorAll('.explanation-content');
              if (createdExplanations && createdExplanations.length > 0) {
                insertAfterNode = createdExplanations[createdExplanations.length - 1];
              }
              nextButtonArea.parentElement.insertBefore(questionFeedbackBtn, insertAfterNode.nextSibling);
            }
          }
          
          // 如果没有生成任何解析，也在下一题按钮后插入“题目有问题？”按钮（避免重复）
          {
            const nextButtonArea = nextBtn.parentElement;
            const createdExplanations = nextButtonArea.parentElement.querySelectorAll('.explanation-content');
            const existingInsertedFeedback = nextButtonArea.parentElement.querySelector('.question-feedback-btn');
            if ((!createdExplanations || createdExplanations.length === 0) && !existingInsertedFeedback) {
              const feedbackLink = 'https://wj.qq.com/s2/24040427/7fc2/';
              const questionFeedbackBtn = document.createElement('button');
              questionFeedbackBtn.className = 'nav-btn difficulty-btn question-feedback-btn';
              questionFeedbackBtn.style.cssText = 'display: block; margin: 16px auto 0; background-color: #4CAF50;';
              questionFeedbackBtn.innerHTML = '<span class="nav-btn-text">题目有问题？</span>';
              questionFeedbackBtn.addEventListener('click', () => {
                showFeedbackChoice(feedbackLink);
              });
              nextButtonArea.parentElement.insertBefore(questionFeedbackBtn, nextButtonArea.nextSibling);
            }
          }
        }
        
        // 更新状态显示
        updateStatus();
      }

      // 创建爆裂特效函数
      function createExplosionEffect(button) {
        const rect = button.getBoundingClientRect();
        const container = document.createElement('div');
        container.className = 'explosion-container';
        container.style.position = 'fixed';
        container.style.top = (rect.top + rect.height / 2) + 'px';
        container.style.left = (rect.left + rect.width / 2) + 'px';
        container.style.zIndex = '1001';
        
        // 创建扩散环
        const ring = document.createElement('div');
        ring.className = 'explosion-ring';
        container.appendChild(ring);
        
        document.body.appendChild(container);
        
        // 清理特效元素
        setTimeout(() => {
          if (container.parentNode) {
            container.parentNode.removeChild(container);
          }
        }, 750);
      }

      // 绑定选项点击
      optEls.forEach(btn => {
        btn.addEventListener('click', () => onSelect(btn.querySelector('.opt-text').textContent, btn));
      });

      // 控制按钮
      nextBtn.addEventListener('click', async () => {
        if (index >= total) { endQuiz(); return; }
        nextBtn.style.display = 'none'; // 点击后立即隐藏按钮
        index += 1; 
        await nextQuestion();
      });

      restartBtn.addEventListener('click', async () => {
        // 重置到初始
        generator = new QuizGenerator(cards, characters, events, window.QUIZ_CONFIG);
        
        // 等待敌怪数据、技巧数据和固定题目加载完成（与开始按钮保持一致）
        await generator.loadEnemyData();
        await generator.loadSkillData();
        await generator.loadFixedQuestions();
        
        mode = 'mixed';
        total = window.QUIZ_CONFIG.questionCount || 10;
        score = 0; index = 1; lock = false;
        
        // 启用难度递增模式（与开始按钮保持一致）
        // 添加null检查以防止错误
        if (generator && typeof generator.enableProgressiveMode === 'function') {
          generator.enableProgressiveMode(total);
        } else {
          console.error('Generator未正确初始化或enableProgressiveMode方法不存在');
          return;
        }
        
        // 重置并启动计时器
        resetTimer();
        startTimer();
        
        setControls(true);
        resultView.style.display = 'none';
        // 不在这里设置选项显示，让renderQuestion函数处理
        optEls.forEach(btn => { btn.classList.remove('correct','incorrect'); btn.disabled=false; });
        
        // 与开始流程一致：通过缓冲池获取题目
        questionBuffer.initialize(generator, mode, total);
        current = await questionBuffer.getNext();
        renderQuestion(current);
        updateStatus();
      });

      exitBtn.addEventListener('click', () => {
        // 退出到初始状态
        generator = null;
        current = null;
        score = 0; 
        index = 1; 
        lock = false;
        
        // 重置计时器
        resetTimer();
        
        // 重置界面到初始状态
        setControls(false);
        resultView.style.display = 'none';
        questionView.innerHTML = '';
        questionView.className = 'image-wrapper muted';
        questionText.style.display = 'none';
        
        // 显示难度按钮并确保居中
        const difficultyButtons = document.getElementById('difficultyButtons');
        difficultyButtons.style.display = 'flex';
        difficultyButtons.style.flexDirection = 'column';
        difficultyButtons.style.alignItems = 'center';
        difficultyButtons.style.textAlign = 'center';
        difficultyButtons.style.width = '100%';
        difficultyButtons.style.gap = '12px';
        
        // 隐藏所有选项
        optEls.forEach(btn => { 
          btn.classList.remove('correct','incorrect'); 
          btn.style.display = 'none'; 
          btn.disabled = false; 
        });
        
        // 重置题目数量选择器
        // 删除了questionCountSel.disabled = false的设置
      });

      // 默认加载主题后不再自动应用随机主题
      document.addEventListener('DOMContentLoaded', function() {
        if (window.themeSwitcher) {
          // 不再自动应用随机主题，改为由主题选择器控制
        }
        
        // 初始化难度按钮
        initializeDifficultyButtons();

        // 绑定反馈方式选择弹窗的通用事件
        (function bindFeedbackChoiceModalEvents() {
          const choiceModal = document.getElementById('feedbackChoiceModal');
          const closeChoice = document.getElementById('closeFeedbackChoice');
          const bilibiliBtn = document.getElementById('feedbackBilibiliBtn');
          const questionnaireBtn = document.getElementById('feedbackQuestionnaireBtn');

          // 关闭按钮
          if (closeChoice && !closeChoice.hasAttribute('data-feedback-choice-bound')) {
            closeChoice.addEventListener('click', hideFeedbackChoice);
            closeChoice.setAttribute('data-feedback-choice-bound', 'true');
          }

          // 点击遮罩关闭
          if (choiceModal && !choiceModal.hasAttribute('data-feedback-choice-bound')) {
            choiceModal.addEventListener('click', function(e) {
              if (e.target === choiceModal) {
                hideFeedbackChoice();
              }
            });
            choiceModal.setAttribute('data-feedback-choice-bound', 'true');
          }

          // B站（推荐）
          if (bilibiliBtn && !bilibiliBtn.hasAttribute('data-feedback-choice-bound')) {
            bilibiliBtn.addEventListener('click', function() {
              window.open('https://www.bilibili.com/video/BV1srHPz4EqN/', '_blank');
              hideFeedbackChoice();
            });
            bilibiliBtn.setAttribute('data-feedback-choice-bound', 'true');
          }

          // 问卷按钮（问卷链接在显示弹窗时动态设置）
          if (questionnaireBtn && !questionnaireBtn.hasAttribute('data-feedback-choice-bound')) {
            questionnaireBtn.addEventListener('click', function() {
              const url = questionnaireBtn.getAttribute('data-questionnaire-url');
              if (url) {
                window.open(url, '_blank');
              }
              hideFeedbackChoice();
            });
            questionnaireBtn.setAttribute('data-feedback-choice-bound', 'true');
          }
        })();
      });
      
      // 显示/隐藏反馈方式选择弹窗
      function showFeedbackChoice(questionnaireUrl) {
        const modal = document.getElementById('feedbackChoiceModal');
        const questionnaireBtn = document.getElementById('feedbackQuestionnaireBtn');
        if (questionnaireBtn) {
          questionnaireBtn.setAttribute('data-questionnaire-url', questionnaireUrl || 'https://wj.qq.com/s2/24040427/7fc2/');
        }
        if (modal) {
          modal.style.display = 'block';
        }
      }

      function hideFeedbackChoice() {
        const modal = document.getElementById('feedbackChoiceModal');
        if (modal) {
          modal.style.display = 'none';
        }
      }

      // 侧边提示（自动消失）
      function showSideToast(message, durationMs = 3000) {
        try {
          const toast = document.createElement('div');
          toast.style.cssText = `
            position: fixed;
            top: 16px;
            right: 16px;
            z-index: 2000;
            background: var(--color-bg-primary);
            color: var(--color-text-primary);
            border: 1px solid var(--color-border);
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
            border-radius: 8px;
            padding: 10px 14px;
            max-width: 320px;
          `;
          toast.textContent = message;
          document.body.appendChild(toast);
          setTimeout(() => {
            try { document.body.removeChild(toast); } catch (_) {}
          }, Math.max(1000, durationMs || 3000));
        } catch (_) {}
      }

      // 标准弹窗提示（统一为通用 .modal/.modal-content 结构）
      function showStandardModal(title, message) {
        try {
          const modal = document.createElement('div');
          modal.className = 'modal';
          modal.style.display = 'block';
          const content = document.createElement('div');
          content.className = 'modal-content';
          content.innerHTML = `
            <div class="modal-header">
              <h3>${title || '提示'}</h3>
              <span class="close" id="stdModalClose">&times;</span>
            </div>
            <div class="modal-body">
              <p style="color: var(--color-text-secondary);">${message || ''}</p>
              <div style="margin-top:12px; display:flex; justify-content:flex-end; gap:8px;">
                <button id="stdModalOk" class="nav-btn primary"><span class="nav-btn-text">确定</span></button>
              </div>
            </div>
          `;
          modal.appendChild(content);
          document.body.appendChild(modal);
          const cleanup = () => { try { document.body.removeChild(modal); } catch (_) {} };
          document.getElementById('stdModalClose')?.addEventListener('click', cleanup);
          document.getElementById('stdModalOk')?.addEventListener('click', cleanup);
          modal.addEventListener('click', (e) => { if (e.target === modal) cleanup(); });
        } catch (_) {}
      }

      // 进入前确认弹窗（返回Promise）
      function showConfirmModal(title, message) {
        return new Promise((resolve) => {
          try {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.display = 'block';
            const content = document.createElement('div');
            content.className = 'modal-content';
            content.innerHTML = `
              <div class="modal-header">
                <h3>${title || '提示'}</h3>
                <span class="close" id="confirmClose">&times;</span>
              </div>
              <div class="modal-body">
                <p style="color: var(--color-text-primary);">${message || ''}</p>
                <div style="margin-top:12px; display:flex; justify-content:flex-end; gap:8px;">
                  <button id="confirmCancel" class="nav-btn"><span class="nav-btn-text">取消</span></button>
                  <button id="confirmOk" class="nav-btn primary"><span class="nav-btn-text">确定</span></button>
                </div>
              </div>
            `;
            modal.appendChild(content);
            document.body.appendChild(modal);
            const cleanup = () => { try { document.body.removeChild(modal); } catch (_) {} };
            const resolveFalse = () => { cleanup(); resolve(false); };
            const resolveTrue = () => { cleanup(); resolve(true); };
            document.getElementById('confirmClose')?.addEventListener('click', resolveFalse);
            document.getElementById('confirmCancel')?.addEventListener('click', resolveFalse);
            document.getElementById('confirmOk')?.addEventListener('click', resolveTrue);
            modal.addEventListener('click', (e) => { if (e.target === modal) resolveFalse(); });
            const onKey = (e) => { if (e.key === 'Escape') { document.removeEventListener('keydown', onKey); resolveFalse(); } };
            document.addEventListener('keydown', onKey);
          } catch (_) { resolve(false); }
        });
      }

      // 难度按钮初始化和事件处理
      function initializeDifficultyButtons() {
        const normalBtn = document.getElementById('normalBtn');
        const hardBtn = document.getElementById('hardBtn');
        const nightmareBtn = document.getElementById('nightmareBtn');
        const profileBtn = document.getElementById('profileBtn');
        const dailyChallengeBtn = document.getElementById('dailyChallengeBtn');
        
        // 为每个难度按钮添加点击事件，直接开始测验
        normalBtn.addEventListener('click', () => startQuizWithDifficulty('normal'));
        hardBtn.addEventListener('click', () => startQuizWithDifficulty('hard'));
        nightmareBtn.addEventListener('click', () => startQuizWithDifficulty('nightmare'));
        profileBtn.addEventListener('click', () => startQuizWithDifficulty('profile'));
        
        // 每日挑战按钮事件（进入前确认）
        dailyChallengeBtn.addEventListener('click', async () => {
          const ok = await showConfirmModal('提示', '若中途退出，今日内可能无法再次作答');
          if (!ok) return;
          startDailyChallenge();
        });
        
        // 反馈按钮事件 -> 打开反馈方式选择弹窗
        const feedbackBtn = document.getElementById('feedbackBtn');
        if (feedbackBtn) {
          feedbackBtn.addEventListener('click', () => {
            showFeedbackChoice('https://wj.qq.com/s2/24040427/7fc2/');
          });
        }

        // 冷知识收集按钮事件 -> 新窗口跳转到指定链接
        const knowledgeBtn = document.getElementById('knowledgeBtn');
        if (knowledgeBtn) {
          knowledgeBtn.addEventListener('click', () => {
            try {
              window.open('https://www.xiaoheihe.cn/app/bbs/link/166698329', '_blank');
            } catch (e) {
              // 回退方式
              window.location.href = 'https://www.xiaoheihe.cn/app/bbs/link/166698329';
            }
          });
        }

        // 性能优化：不在页面加载时请求尝试状态，改为点击每日挑战时由会话创建结果决定入口可用性。
      }
      
      // 开始每日挑战
      async function startDailyChallenge() {
        try {
          // 显示加载动画
          const loadingOverlay = document.getElementById('loadingOverlay');
          loadingOverlay.classList.add('show');
          
          // 设置每日挑战标识
          window.isDailyChallenge = true;
          
          // 初始化每日挑战数据收集
          window.dailyChallengeAnswers = [];
          window.dailyChallengeQuestionTimes = [];
          
          // 记录每日挑战开始时的日期，避免跨日问题
          const challengeDate = new Date();
          window.dailyChallengeDate = {
            year: challengeDate.getFullYear(),
            month: challengeDate.getMonth() + 1,
            day: challengeDate.getDate()
          };
          
          // 设置每日挑战配置（固定为噩梦难度）
          updateDifficultyConfig('nightmare');
          
          // 使用每日种子创建随机数生成器
          const dailySeed = getDailySeed();
          quizRandom = new SeededRandom(dailySeed);

          // 在进入会话前先检查今日剩余机会（避免直接触发400）
          const dateStr = `${window.dailyChallengeDate.year}-${window.dailyChallengeDate.month.toString().padStart(2,'0')}-${window.dailyChallengeDate.day.toString().padStart(2,'0')}`;
          try {
            const attemptEndpoints = Array.isArray(window.QUIZ_CONFIG?.attemptStatusEndpoints) && window.QUIZ_CONFIG.attemptStatusEndpoints.length > 0
              ? window.QUIZ_CONFIG.attemptStatusEndpoints
              : ['https://quiz-api.aaamjs.asia/api/attempt/status'];
            let attemptInfo = null;
            for (const ep of attemptEndpoints) {
              try {
                const resp = await fetch(`${ep}?date=${encodeURIComponent(dateStr)}`);
                const data = await resp.json().catch(() => null);
                if (resp.ok && data && typeof data.remaining === 'number') { attemptInfo = data; break; }
              } catch (_) { /* 忽略错误，尝试下一个端点 */ }
            }
            if (attemptInfo && attemptInfo.remaining <= 0) {
              loadingOverlay.classList.remove('show');
              window.isDailyChallenge = false;
              const msg = '今日每日挑战次数已用完，请明日再来。';
              showStandardModal('每日挑战不可用', msg);
              questionView.innerHTML = `<div class="muted">${msg}</div>`;
              return;
            }
          } catch (_) { /* 读取失败时继续尝试创建会话 */ }

          // 启动会话以获取一次性提交令牌（sessionId）
          window.dailyChallengeSessionId = null;
          let lastErrMsg = null;
          try {
            const sessEndpoints = Array.isArray(window.QUIZ_CONFIG?.sessionStartEndpoints) && window.QUIZ_CONFIG.sessionStartEndpoints.length > 0
              ? window.QUIZ_CONFIG.sessionStartEndpoints
              : ['https://quiz-api.aaamjs.asia/api/session/start'];
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 5000);
            try {
              for (const ep of sessEndpoints) {
                try {
                  const resp = await fetch(ep, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date: dateStr }),
                    signal: controller.signal
                  });
                  const data = await resp.json().catch(() => null);
                  if (resp.ok && data?.sessionId) { window.dailyChallengeSessionId = data.sessionId; break; }
                  else { lastErrMsg = data?.error || (!resp.ok ? `HTTP ${resp.status}` : null); }
                } catch (_) { /* 网络错误或超时，尝试下一个端点 */ }
              }
            } finally {
              clearTimeout(timer);
            }
          } catch (e) {
            lastErrMsg = e?.message || null;
          }
          // 进入即消耗：若无法创建会话则拒绝进入每日挑战
          if (!window.dailyChallengeSessionId) {
            loadingOverlay.classList.remove('show');
            window.isDailyChallenge = false;
            const used = lastErrMsg === 'Already consumed today' || lastErrMsg === 'Session limit exceeded';
            const originBlocked = lastErrMsg === 'Forbidden origin' || lastErrMsg === 'HTTP 403';
            const msg = used
              ? '今日每日挑战次数已用完，请明日再来。'
              : originBlocked
                ? '请求被拒绝：请在 aaamjs.asia 域或白名单本地端口(5174/5500/8081)打开页面后重试。'
                : '无法进入每日挑战：网络错误或服务器不可达。';
            showStandardModal('每日挑战不可用', msg);
            questionView.innerHTML = `<div class="muted">${msg}</div>`;
            return;
          }
          
          // 隐藏难度按钮
          document.getElementById('difficultyButtons').style.display = 'none';
          
          await loadData();
          generator = new QuizGenerator(cards, characters, events, window.QUIZ_CONFIG);
          
          // 等待敌怪数据、技巧数据和固定题目加载完成
          await generator.loadEnemyData();
          await generator.loadSkillData();
          await generator.loadFixedQuestions();
          
          mode = 'mixed';
          total = window.QUIZ_CONFIG.questionCount || 25;
          score = 0; index = 1;
          
          // 启用难度递增模式
          // 添加null检查以防止错误
          if (generator && typeof generator.enableProgressiveMode === 'function') {
            generator.enableProgressiveMode(total);
          } else {
            console.error('Generator未正确初始化或enableProgressiveMode方法不存在');
            return;
          }
          
          // 重置计时器但不启动
          resetTimer();
          
          // 添加等待时间（1.5秒）
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // 隐藏加载动画
          loadingOverlay.classList.remove('show');
          
          // 显示侧边提示：中途退出提醒（自动消失）
          showSideToast('注意：中途退出可能无法再次进入', 3500);
          
          setControls(true);
          updateStatus();
          
          // 初始化缓冲池
          questionBuffer.initialize(generator, mode, total);
          
          current = await questionBuffer.getNext();
          renderQuestion(current);
          
          // 在问题显示后启动计时器
          startTimer();
        } catch(err){
          // 出错时也要隐藏加载动画
          const loadingOverlay = document.getElementById('loadingOverlay');
          loadingOverlay.classList.remove('show');
          
          questionView.innerHTML = '<div class="muted">数据加载失败</div>';
          console.error(err);
        }
      }

      // 根据难度开始测验
      async function startQuizWithDifficulty(difficulty) {
        try {
          // 显示加载动画
          const loadingOverlay = document.getElementById('loadingOverlay');
          loadingOverlay.classList.add('show');
          
          // 清除每日挑战标识
          window.isDailyChallenge = false;
          
          // 更新配置
          updateDifficultyConfig(difficulty);
          
          // 重新创建随机数生成器（每次开始测验时使用新的随机种子）
          quizRandom = new SeededRandom();
          
          // 隐藏难度按钮
          document.getElementById('difficultyButtons').style.display = 'none';
          
          await loadData();
          generator = new QuizGenerator(cards, characters, events, window.QUIZ_CONFIG);
          
          // 等待敌怪数据、技巧数据和固定题目加载完成
          await generator.loadEnemyData();
          await generator.loadSkillData();
          await generator.loadFixedQuestions();
          
          mode = 'mixed';
          total = window.QUIZ_CONFIG.questionCount || 10;
          score = 0; index = 1;
          
          // 启用难度递增模式
          // 添加null检查以防止错误
          if (generator && typeof generator.enableProgressiveMode === 'function') {
            generator.enableProgressiveMode(total);
          } else {
            console.error('Generator未正确初始化或enableProgressiveMode方法不存在');
            return;
          }
          
          // 重置计时器（但不启动）
          resetTimer();
          
          // 添加等待时间（1.5秒）
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // 隐藏加载动画
          loadingOverlay.classList.remove('show');
          
          setControls(true);
          updateStatus();
          // 初始化缓冲池并通过缓冲池获取首题，保持与后续一致
          questionBuffer.initialize(generator, mode, total);
          current = await questionBuffer.getNext();
          renderQuestion(current);
          
          // 在题目显示后启动计时器
          startTimer();
        } catch(err){
          // 出错时也要隐藏加载动画
          const loadingOverlay = document.getElementById('loadingOverlay');
          loadingOverlay.classList.remove('show');
          
          questionView.innerHTML = '<div class="muted">数据加载失败</div>';
          console.error(err);
        }
      }
      
      // 每日挑战分数提交相关函数（改为按钮+昵称弹窗）
      function showDailyChallengeSubmission(scores, timeInSeconds, finalTime) {
        const actions = document.createElement('div');
        actions.style.cssText = 'margin-top: 16px; display:flex; flex-direction: column; align-items:center; gap: 10px;';
        actions.innerHTML = `
          <button id="openSubmitModalBtn" class="nav-btn primary">
            <span class="nav-btn-text">提交成绩</span>
          </button>
          <div id="submissionStatus" style="text-align: center; color: var(--color-text-secondary);"></div>
        `;
        resultView.appendChild(actions);

        const statusDiv = actions.querySelector('#submissionStatus');
        const openBtn = actions.querySelector('#openSubmitModalBtn');
        
        openBtn.addEventListener('click', () => {
          openNicknameModal(scores, timeInSeconds, finalTime, statusDiv);
        });

        // 分数>90时在结算界面展示“邀请函！”按钮，点击后出现弹窗
        if (window.isDailyChallenge && scores && typeof scores.finalScore === 'number' && scores.finalScore > 80) {
          const inviteBtn = document.createElement('button');
          inviteBtn.id = 'openInviteModalBtn';
          inviteBtn.className = 'nav-btn primary daily-challenge-btn';
          inviteBtn.innerHTML = '<span class="nav-btn-text"> ! 邀请函 ! </span>';
          // 稍微增强视觉权重以更醒目（保持主题风格）
          inviteBtn.style.cssText = 'font-weight:700; letter-spacing:0.5px;';
          actions.appendChild(inviteBtn);
          inviteBtn.addEventListener('click', () => {
            showInviteModalIfEligible(scores.finalScore);
          });
        }
      }

      // 邀请函弹窗
      function showInviteModalIfEligible(finalScore) {
        try {
          if (!window.isDailyChallenge) return;
          if (typeof finalScore !== 'number' || finalScore <= 80) return;
          const modal = document.createElement('div');
          modal.className = 'modal';
          modal.style.display = 'block';
          const content = document.createElement('div');
          content.className = 'modal-content';
          content.innerHTML = `
            <div class="modal-header">
              <h3>邀请函</h3>
              <span class="close" id="closeInviteModal">&times;</span>
            </div>
            <div class="modal-body" style="text-align:center;">
              <p style="margin: 10px 0; font-size: 1.1em;">你的最终得分是：${finalScore}分！你是星趴高手喵！要不要加入我们QQ群喵！</p>
              <div style="margin: 8px 0; color: var(--color-text-secondary); text-align: right;">BY TGW~</div>
              <button id="joinGroupInviteBtn" class="nav-btn primary" style="margin:12px auto 0; display:inline-block;"><span class="nav-btn-text">点击加群</span></button>
            </div>
          `;
          modal.appendChild(content);
          document.body.appendChild(modal);
          const close = () => { if (document.body.contains(modal)) document.body.removeChild(modal); };
          const closeBtn = document.getElementById('closeInviteModal');
          if (closeBtn) closeBtn.addEventListener('click', close);
          modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
           const joinBtn = document.getElementById('joinGroupInviteBtn');
           if (joinBtn && typeof groupConfig !== 'undefined' && groupConfig && groupConfig.basic_info) {
             const url = groupConfig.basic_info.join_link || `https://qm.qq.com/cgi-bin/qm/qr?k=${groupConfig.basic_info.qq_number}`;
             joinBtn.addEventListener('click', () => {
               try { window.open(url, '_blank'); } catch (_) {}
               const imgPath = (groupConfig.assets && groupConfig.assets.qrcode) ? groupConfig.assets.qrcode : 'images/qrcode.jpg';
               const overlay = document.createElement('div');
               overlay.style.cssText = [
                 'position:fixed', 'left:0', 'top:0', 'width:100vw', 'height:100vh',
                 'background:rgba(0,0,0,0.9)', 'z-index:10000', 'display:flex', 'align-items:center', 'justify-content:center'
               ].join(';');
               const img = document.createElement('img');
               img.src = imgPath;
               img.alt = 'QQ群二维码';
               img.style.cssText = [
                 'max-width:80vw', 'max-height:80vh', 'border-radius:12px',
                 'box-shadow:0 10px 30px rgba(0,0,0,0.6)', 'border:2px solid rgba(255,255,255,0.8)'
               ].join(';');
               overlay.appendChild(img);
               document.body.appendChild(overlay);
               overlay.addEventListener('click', () => { if (document.body.contains(overlay)) document.body.removeChild(overlay); });
             });
           }
        } catch (_) {}
      }

      // 昵称弹窗并提交
      function openNicknameModal(scores, timeInSeconds, finalTime, statusDiv) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        const content = document.createElement('div');
        content.className = 'modal-content';
        content.innerHTML = `
          <div class="modal-header">
            <h3>提交成绩</h3>
            <span class="close" id="closeSubmitModal">&times;</span>
          </div>
          <div class="modal-body">
            <div style="margin-bottom: 12px;">
              <label for="nicknameInputModal" style="display:block; margin-bottom:6px; color: var(--color-text-secondary);">昵称：</label>
              <input type="text" id="nicknameInputModal" maxlength="20" placeholder="请输入您的昵称（最多20个字符）" 
                     style="width: 100%; padding: 8px; border: 1px solid var(--color-border); border-radius: 4px; background: var(--color-bg-primary); color: var(--color-text-primary);">
            </div>
            <div style="display:flex; gap:8px; justify-content:center;">
              <button id="confirmSubmitBtn" class="nav-btn primary"><span class="nav-btn-text">确认提交</span></button>
              <button id="cancelSubmitBtn" class="nav-btn"><span class="nav-btn-text">取消</span></button>
            </div>
            <div id="submissionStatusModal" style="margin-top: 10px; text-align: center; color: var(--color-text-secondary);"></div>
          </div>
        `;
        modal.appendChild(content);
        document.body.appendChild(modal);

        const closeModal = () => { if (document.body.contains(modal)) document.body.removeChild(modal); };
        document.getElementById('closeSubmitModal').addEventListener('click', closeModal);
        document.getElementById('cancelSubmitBtn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        const nicknameInput = document.getElementById('nicknameInputModal');
        const confirmBtn = document.getElementById('confirmSubmitBtn');
        const statusDivModal = document.getElementById('submissionStatusModal');

        function validateNickname(raw) {
          let name = String(raw || '');
          try { name = name.normalize('NFKC'); } catch (_) {}
          name = name.replace(/[\u0000-\u001F\u007F]/g, ''); // 控制字符
          name = name.replace(/[\u200B-\u200D\uFEFF]/g, ''); // 零宽字符
          name = name.replace(/\s+/g, ' ').trim();
          if (!name) {
            return { ok: false, error: '请输入昵称' };
          }
          if (name.length > 20) {
            return { ok: false, error: '昵称不能超过20个字符' };
          }
          const allowedRe = /^[A-Za-z0-9\u4e00-\u9fa5 _\-·•~.!?]+$/;
          if (!allowedRe.test(name)) {
            return { ok: false, error: '昵称包含非法字符，请更换' };
          }
          const bannedPatterns = [
            /(https?:\/\/|www\.)/i,           // URL/站点
            /@/i,                               // 邮箱/联系方式
            /(微信|VX|QQ|电报|群|联系|加我)/i, // 常见联系方式/招揽
            /(广告|推广|色情|成人|赌|博彩|彩票|政治|极端|暴力|仇恨|辱骂)/i, // 违规类别词
            /(.)\1{4,}/                         // 连续重复字符
          ];
          if (bannedPatterns.some(re => re.test(name))) {
            return { ok: false, error: '昵称包含违规内容或信息，请更换' };
          }
          return { ok: true, value: name };
        }

        const doSubmit = async () => {
          const { ok, value, error } = validateNickname(nicknameInput.value);
          if (!ok) {
            statusDivModal.textContent = error;
            statusDivModal.style.color = 'var(--color-error)';
            return;
          }
          await submitDailyChallengeScore(value, scores, timeInSeconds, finalTime, statusDivModal);
          // 同步状态到结算卡片下方的提示（可选）
          if (statusDiv) {
            statusDiv.textContent = statusDivModal.textContent;
            statusDiv.style.color = statusDivModal.style.color;
          }
        };

        confirmBtn.addEventListener('click', doSubmit);
        nicknameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') doSubmit(); });
      }
      
      // 提交每日挑战分数
      async function submitDailyChallengeScore(nickname, scores, timeInSeconds, finalTime, statusDiv) {
        // 将后端错误映射为更友好的中文提示
        function formatSubmissionError(errorMsg = '', statusCode = 400) {
          const msg = String(errorMsg || '').trim();
          // 需要隐去细节但提供错误代码的敏感/安全相关错误
          const sensitiveCodes = {
            'Forbidden origin': 'E_ORIGIN',
            'Captcha required': 'E_CAPTCHA',
            'Invalid seed': 'E_SEED',
            'Unexpected totalQuestions': 'E_QCOUNT',
            'Invalid individual question times': 'E_TIMES',
            'Invalid answers array': 'E_ANSWERS',
            'Invalid answer object structure': 'E_ANSWER_OBJ',
            'Missing or invalid answer object fields': 'E_ANSWER_FIELDS',
            'Session mismatch': 'E_SESSION_BIND',
            'Invalid session': 'E_SESSION',
            'Session used': 'E_SESSION_USED',
            'Session required': 'E_SESSION_REQ'
          };
          // 普通友好提示（不包含安全细节）
          const friendlyExact = {
            'Already submitted today': '今天已提交过成绩。',
            'Rate limit exceeded': '提交过于频繁，请稍后再试。',
            'Missing required fields': '提交数据不完整，请刷新页面后重试。',
            'Invalid nickname': '昵称不合法：长度最多 20 个字符，请重新输入。',
            'Nickname contains invalid characters': '昵称包含非法字符，请重新输入。',
            'Nickname contains prohibited content': '昵称包含违规内容或联系方式，请重新输入。',
            'Invalid date format': '日期格式不正确，请刷新页面后重试。',
            'Invalid question times array': '每题用时数组不合法。',
            'Invalid total time': '答题总时长不合法。',
            'Internal server error': '服务器异常，请稍后再试。',
            'Already consumed today': '今日次数已用完，请明日再来。'
          };

          // 命中敏感错误：返回通用描述 + 错误代码
          if (sensitiveCodes[msg]) {
            const codeStr = statusCode ? `${statusCode}-${sensitiveCodes[msg]}` : sensitiveCodes[msg];
            return `提交失败：服务器拒绝本次提交。错误代码：${codeStr}`;
          }

          // 评分计算失败归类为通用服务器异常并附带代码
          if (msg.startsWith('Score calculation failed')) {
            const codeStr = statusCode ? `${statusCode}-E_SCORE` : 'E_SCORE';
            return `服务器异常，请稍后再试。错误代码：${codeStr}`;
          }

          // 常规友好提示
          if (friendlyExact[msg]) return friendlyExact[msg];

          // 状态码兜底（不泄露具体细节）
          if (statusCode === 429) return '提交过于频繁，请稍后再试。';
          if (statusCode === 403) return '提交失败：服务器拒绝本次提交。错误代码：403';
          if (statusCode === 500) return '服务器异常，请稍后再试。';
          if (statusCode === 400) return '提交失败：数据校验未通过。';
          return '提交失败：请稍后重试。';
        }

        async function getTurnstileTokenOnDemand(statusEl) {
          try {
            const sitekey = window.QUIZ_CONFIG?.turnstileSiteKey;
            if (!sitekey) return null;
            if (statusEl) {
              statusEl.textContent = '正在进行人机验证...';
              statusEl.style.color = 'var(--color-text-secondary)';
            }
            // 动态加载 Turnstile 脚本（仅在需要且未加载时）
            try {
              if (!window.turnstile && !document.querySelector('script[data-turnstile]')) {
                const s = document.createElement('script');
                s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
                s.async = true;
                s.defer = true;
                s.setAttribute('data-turnstile', 'true');
                document.head.appendChild(s);
              }
            } catch (_) {}
            await new Promise((resolve, reject) => {
              if (window.turnstile && typeof window.turnstile.render === 'function') return resolve();
              let tries = 0;
              const timer = setInterval(() => {
                if (window.turnstile && typeof window.turnstile.render === 'function') { clearInterval(timer); resolve(); }
                else if (++tries > 100) { clearInterval(timer); reject(new Error('Turnstile not loaded')); }
              }, 100);
            });
            if (!window._turnstileWidgetId) {
              try {
                window._turnstileWidgetId = window.turnstile.render('#turnstile-container', { sitekey, size: 'invisible' });
              } catch (_) { return null; }
            }
            try {
              const token = await window.turnstile.execute(window._turnstileWidgetId);
              return token || null;
            } catch (_) { return null; }
          } catch (_) { return null; }
        }

        try {
          statusDiv.textContent = '正在提交...';
          statusDiv.style.color = 'var(--color-text-secondary)';

          // 确保存在提交令牌（sessionId），不再在提交时创建
          if (!window.dailyChallengeSessionId) {
            statusDiv.textContent = '❌ 未检测到每日挑战会话，请先进入每日挑战。';
            statusDiv.style.color = 'var(--color-error)';
            return;
          }
          
          // 收集答题数据用于验证
        const submissionData = {
          nickname: nickname,
          date: `${window.dailyChallengeDate.year}-${window.dailyChallengeDate.month.toString().padStart(2, '0')}-${window.dailyChallengeDate.day.toString().padStart(2, '0')}`,
          seed: getDailySeed(),
          finalScore: scores.finalScore,
          questionScore: scores.questionScore,
          timeScore: scores.timeScore,
          correctAnswers: score,
          totalQuestions: total,
          timeSpent: timeInSeconds,
          totalTime: Math.floor(finalTime / 1000),
          sessionId: window.dailyChallengeSessionId,
          // 添加一些防作弊数据
          answers: window.dailyChallengeAnswers || [],
          questionTimes: window.dailyChallengeQuestionTimes || [],
          timestamp: Date.now()
        };
        
        // 调试信息
        console.log('提交数据:', {
          answersLength: submissionData.answers.length,
          questionTimesLength: submissionData.questionTimes.length,
          totalQuestions: submissionData.totalQuestions,
          answers: submissionData.answers
        });
          
          // 端点顺序尝试，带超时控制
          const endpoints = Array.isArray(window.QUIZ_CONFIG?.submitScoreEndpoints) && window.QUIZ_CONFIG.submitScoreEndpoints.length > 0
            ? window.QUIZ_CONFIG.submitScoreEndpoints
            : ['https://quiz-api.aaamjs.asia/api/submit-score'];

          const postWithTimeout = async (url, timeoutMs = 7000, turnstileToken = null) => {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), timeoutMs);
            try {
              const headers = { 'Content-Type': 'application/json' };
              if (turnstileToken) headers['cf-turnstile-response'] = turnstileToken;
              const res = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(submissionData),
                signal: controller.signal
              });
              return res;
            } finally {
              clearTimeout(timer);
            }
          };

          let response = null;
          let result = null;
          let lastError = null;
          for (const ep of endpoints) {
            try {
              response = await postWithTimeout(ep, 7000);
              result = await response.json().catch(() => ({}));
              if (response.ok) break;
              if (result?.error === 'Captcha required' || response.status === 403) {
                const token = await getTurnstileTokenOnDemand(statusDiv);
                if (!token) { lastError = result?.error || 'Captcha required'; break; }
                response = await postWithTimeout(ep, 7000, token);
                result = await response.json().catch(() => ({}));
                if (response.ok || result?.error) break;
              } else if (result?.error) {
                lastError = result.error;
                break;
              }
            } catch (e) {
              continue;
            }
          }

          if (response && response.ok) {
            statusDiv.textContent = `✅ 提交成功！你在今日的排名为：第 ${result.rank} 名`;
            statusDiv.style.color = 'var(--color-success)';
            
            // 禁用弹窗内“确认提交”按钮与结算卡片的“提交成绩”按钮（如果存在）
            const confirmBtn = document.getElementById('confirmSubmitBtn');
            if (confirmBtn) {
              confirmBtn.disabled = true;
              const span = confirmBtn.querySelector('.nav-btn-text');
              if (span) span.textContent = '已提交';
            }
            const openBtn = document.getElementById('openSubmitModalBtn');
            if (openBtn) {
              openBtn.disabled = true;
              const span = openBtn.querySelector('.nav-btn-text');
              if (span) span.textContent = '已提交';
            }
            // 刷新主界面排行榜，绕过边缘缓存
            const mainLeaderboardCard = document.getElementById('leaderboardCardMain');
            if (mainLeaderboardCard) {
              renderLeaderboardCard('leaderboardCardMain', { forceBust: true });
            }
          } else {
            const errMsg = (lastError || result?.error) || '网络错误或服务器不可达';
            const statusCode = response?.status || 0;
            statusDiv.textContent = `❌ ${formatSubmissionError(errMsg, statusCode)}`;
            statusDiv.style.color = 'var(--color-error)';
          }
        } catch (error) {
          console.error('提交分数失败:', error);
          statusDiv.textContent = '❌ 网络错误：请检查网络连接或稍后再试';
          statusDiv.style.color = 'var(--color-error)';
        }
      }

      // 渲染主题风格排行榜卡片（主界面与结算界面复用，含重试/超时/缓存回退）
      async function renderLeaderboardCard(containerId, opts = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.style.display = '';
        const contentId = `${containerId}Content`;
        // 确保内容容器存在
        let content = document.getElementById(contentId);
        if (!content) {
          content = document.createElement('div');
          content.id = contentId;
          container.appendChild(content);
        }
        const selectionMode = (window.QUIZ_CONFIG?.leaderboardSelectionMode || 'both');
        if (selectionMode === 'both') {
          try { const savedMode = localStorage.getItem('leaderboardViewMode'); if (savedMode) window.QUIZ_CONFIG.leaderboardViewMode = savedMode; } catch (_) {}
        }
        let viewMode = (window.QUIZ_CONFIG?.leaderboardViewMode || 'daily_plus_history');
        if (selectionMode === 'daily_only') {
          viewMode = 'daily_plus_history';
          window.QUIZ_CONFIG.leaderboardViewMode = 'daily_plus_history';
        } else if (selectionMode === 'aggregate_only') {
          viewMode = 'aggregate';
          window.QUIZ_CONFIG.leaderboardViewMode = 'aggregate';
        }
        const isAggregate = viewMode === 'aggregate';
        const titleText = isAggregate ? '每日挑战总排行榜' : '每日挑战排行榜';
        const historyBlock = isAggregate ? '' : `
          <div id="${contentId}HistoryWrap" style="margin-top:12px; padding-top:8px; border-top:1px solid var(--color-border-light);">
            <div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div>
            <div style="padding:12px; text-align:center; color: var(--color-text-muted);">加载中...</div>
          </div>`;
        const switchMarkup = selectionMode === 'both' ? `
              <div id="${contentId}ModeSwitch" style="display:inline-flex; border:1px solid var(--color-border-light); border-radius:16px; overflow:hidden;">
                <button id="${contentId}ModeAgg" class="nav-btn" style="border:none; ${isAggregate ? 'background: var(--color-accent); color: #fff;' : 'background: transparent; color: var(--color-text-secondary);'}"><span class="nav-btn-text">总榜</span></button>
                <button id="${contentId}ModeDaily" class="nav-btn" style="border:none; ${!isAggregate ? 'background: var(--color-accent); color: #fff;' : 'background: transparent; color: var(--color-text-secondary);'}"><span class="nav-btn-text">今日</span></button>
              </div>` : '';
        container.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
            <h3 style="margin:0; color: var(--color-text-primary);">${titleText}</h3>
            <div style="display:flex; align-items:center; gap:8px;">
              ${switchMarkup}
              <button id="${contentId}RefreshBtn" class="nav-btn" title="强制刷新（跳过缓存）"><span class="nav-btn-text">刷新</span></button>
            </div>
          </div>
          <div id="${contentId}">加载中...</div>
          ${historyBlock}
        `;
        const target = document.getElementById(contentId);
        const refreshBtn = document.getElementById(`${contentId}RefreshBtn`);
        if (refreshBtn) {
          let refreshing = false;
          refreshBtn.addEventListener('click', () => {
            if (refreshing) return;
            refreshing = true;
            const prevOpacity = refreshBtn.style.opacity;
            const prevPointer = refreshBtn.style.pointerEvents;
            refreshBtn.style.opacity = '0.6';
            refreshBtn.style.pointerEvents = 'none';
            try {
              renderLeaderboardCard(containerId, { forceBust: true });
              try { sessionStorage.setItem('leaderboardForceBustUntil', String(Date.now() + 15 * 60 * 1000)); } catch (_) {}
            } finally {
              setTimeout(() => {
                refreshing = false;
                refreshBtn.style.opacity = prevOpacity || '';
                refreshBtn.style.pointerEvents = prevPointer || '';
              }, 2000);
            }
          });
        }
        if ((window.QUIZ_CONFIG?.leaderboardSelectionMode || 'both') === 'both') {
          const modeAgg = document.getElementById(`${contentId}ModeAgg`);
          const modeDaily = document.getElementById(`${contentId}ModeDaily`);
          if (modeAgg) {
            modeAgg.addEventListener('click', () => {
              window.QUIZ_CONFIG.leaderboardViewMode = 'aggregate';
              try { localStorage.setItem('leaderboardViewMode', 'aggregate'); } catch (_) {}
              renderLeaderboardCard(containerId, { forceBust: true });
            });
          }
          if (modeDaily) {
            modeDaily.addEventListener('click', () => {
              window.QUIZ_CONFIG.leaderboardViewMode = 'daily_plus_history';
              try { localStorage.setItem('leaderboardViewMode', 'daily_plus_history'); } catch (_) {}
              renderLeaderboardCard(containerId, { forceBust: true });
            });
          }
        }

        // 本地缓存键（按日期/模式缓存最近一次成功结果)
        const CACHE_KEY = isAggregate ? 'aggregateLeaderboardCache' : 'dailyLeaderboardCache';

        // 请求参数：日期与强制刷新控制（默认尊重会话中的强制刷新偏好）
        const preferBust = (() => { try { const until = parseInt((sessionStorage.getItem('leaderboardForceBustUntil') || '0'), 10); return until > Date.now(); } catch (_) { return false; } })();
        const { forceBust = preferBust } = opts;
        const d = window.dailyChallengeDate;
        const dateStr = (d && d.year && d.month && d.day)
          ? `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`
          : (() => {
              const now = new Date();
              return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
            })();

        async function renderBoard(data) {
          if (data.leaderboard && data.leaderboard.length > 0) {
            let html = `
              <div style="margin-bottom: 8px; color: var(--color-text-secondary); text-align: center;">
                ${isAggregate ? ` ${data.totalEntries} 次记录` : `${data.date} | ${data.totalEntries} 次记录`}
              </div>
              <div class="leaderboard-header" style="display: grid; grid-template-columns: 60px 1fr 80px; gap: 10px;">
                <div>排名</div>
                <div>昵称</div>
                <div style="text-align:right;">分数</div>
              </div>
            `;
            data.leaderboard.forEach((entry, index) => {
              const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
              html += `
                <div class="leaderboard-row" style="display: grid; grid-template-columns: 60px 1fr 80px; gap: 10px;">
                  <div>${rankIcon} ${index + 1}</div>
                  <div class="leaderboard-nickname">${entry.nickname}</div>
                  <div class="leaderboard-score">${entry.finalScore}</div>
                </div>
              `;
            });
            target.innerHTML = html;

            // 最近7天每日前三渲染已解耦，由外部统一触发
          } else {
            target.innerHTML = `
              <div style="text-align: center; color: var(--color-text-secondary); padding: 12px;">
                暂无排行榜数据
              </div>
            `;
          }
        }

        function saveCache(data) {
          try {
            const cache = { data, cachedAt: Date.now() };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
          } catch (_) {}
        }

        function loadCache(maxAgeMs = 15 * 60 * 1000) { // 默认最多使用15分钟内的缓存
          try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            const cache = JSON.parse(raw);
            if (!cache || !cache.data || !cache.cachedAt) return null;
            if (Date.now() - cache.cachedAt > maxAgeMs) return null; // 过旧缓存不使用
            return cache;
          } catch (_) { return null; }
        }

        // 统一历史前三缓存（与排行榜一致的 15 分钟 TTL）
        function saveHistoryCache(key, data) {
          try {
            const cache = { data, cachedAt: Date.now() };
            localStorage.setItem(key, JSON.stringify(cache));
          } catch (_) {}
        }

        function loadHistoryCache(key, maxAgeMs = 15 * 60 * 1000) {
          try {
            const raw = localStorage.getItem(key);
            if (!raw) return null;
            const cache = JSON.parse(raw);
            if (!cache || !cache.data || !cache.cachedAt) return null;
            if (Date.now() - cache.cachedAt > maxAgeMs) return null;
            return cache;
          } catch (_) { return null; }
        }

        async function fetchWithTimeout(url, timeoutMs = 4000) {
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), timeoutMs);
          try {
            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
            return res;
          } catch (err) {
            clearTimeout(id);
            throw err;
          }
        }

        // 独立渲染“最近7天每日前三”，避免依赖排行榜成功结果
        async function renderTopHistoryMain(forceBustLocal) {
          try {
            const historyWrap = document.getElementById(`${contentId}HistoryWrap`);
            if (historyWrap) {
              historyWrap.innerHTML = '<div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div><div style="padding:12px; text-align:center; color: var(--color-text-muted);">加载中...</div>';
            }

            const topHistoryEndpointsCfg = Array.isArray(window.QUIZ_CONFIG?.topHistoryEndpoints) && window.QUIZ_CONFIG.topHistoryEndpoints.length > 0
              ? window.QUIZ_CONFIG.topHistoryEndpoints
              : ['https://quiz-api.aaamjs.asia/api/top3/history'];

            let history = null;
            const histCacheKey = 'topHistoryCache:7:3:0';
            if (!forceBustLocal) {
              const hCache = loadHistoryCache(histCacheKey);
              if (hCache && hCache.data && Array.isArray(hCache.data.items) && hCache.data.items.some((it) => Array.isArray(it.tops) && it.tops.length > 0)) {
                history = hCache.data;
              }
            }
            if (!history) {
              for (const endpoint of topHistoryEndpointsCfg) {
                try {
                  const url = `${endpoint}?days=7&limit=3&includeToday=0${forceBustLocal ? `&bust=${Date.now()}` : ''}`;
                  const resp = await fetchWithTimeout(url, 3000);
                  const hdata = await resp.json();
                  if (hdata && Array.isArray(hdata.items)) { history = hdata; break; }
                } catch (_) {}
              }
              if (history && Array.isArray(history.items) && history.items.some((it) => Array.isArray(it.tops) && it.tops.length > 0)) {
                try { saveHistoryCache(histCacheKey, history); } catch (_) {}
              }
            }

            const hasItems = history && Array.isArray(history.items) && history.items.filter((it) => Array.isArray(it.tops) && it.tops.length > 0).length > 0;
            if (historyWrap) {
              if (hasItems) {
                let hHtml = '<div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div>';
                hHtml += '<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:12px; margin-top:8px;">';

                history.items.filter((it) => Array.isArray(it.tops) && it.tops.length > 0).forEach((it) => {
                  hHtml += `
                    <div style="border:1px solid var(--color-border-light); border-radius:8px; padding:8px; background: var(--theme-card-bg); color: var(--color-text-primary);">
                      <div style="text-align:center; font-weight:600; color: var(--color-text-secondary);">${it.date}</div>
                      <div style="display:grid; grid-template-columns: 36px 1fr 60px; gap:8px; margin-top:6px;">
                  `;
                  (Array.isArray(it.tops) ? it.tops : []).forEach((entry, idx) => {
                    const rankIcon = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
                    hHtml += `
                      <div style="display:contents;">
                        <div>${rankIcon} ${idx + 1}</div>
                        <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${entry.nickname}</div>
                        <div style="text-align:right; font-weight:bold;">${entry.finalScore}</div>
                      </div>
                    `;
                  });
                  hHtml += `
                      </div>
                    </div>
                  `;
                });

                hHtml += '</div>';
                historyWrap.innerHTML = hHtml;
              } else {
                historyWrap.innerHTML = '<div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div><div style="padding:12px; text-align:center; color: var(--color-text-muted);">暂无数据</div>';
              }
            }
          } catch (_) {
            const historyWrap = document.getElementById(`${contentId}HistoryWrap`);
            if (historyWrap) {
              historyWrap.innerHTML = '<div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div><div style="padding:12px; text-align:center; color: var(--color-text-muted);">暂无数据</div>';
            }
          }
        }

        const configured = isAggregate
          ? (Array.isArray(window.QUIZ_CONFIG?.aggregateLeaderboardEndpoints) && window.QUIZ_CONFIG.aggregateLeaderboardEndpoints.length > 0
              ? window.QUIZ_CONFIG.aggregateLeaderboardEndpoints
              : ['https://quiz-api.aaamjs.asia/api/leaderboard/aggregate'])
          : (Array.isArray(window.QUIZ_CONFIG?.leaderboardEndpoints) && window.QUIZ_CONFIG.leaderboardEndpoints.length > 0
              ? window.QUIZ_CONFIG.leaderboardEndpoints
              : (Array.isArray(window.LEADERBOARD_ENDPOINTS) && window.LEADERBOARD_ENDPOINTS.length > 0
                  ? window.LEADERBOARD_ENDPOINTS
                  : ['https://quiz-api.aaamjs.asia/api/leaderboard']));

        // 如果离线，直接展示离线提示并提供缓存回退
        if (navigator && typeof navigator.onLine === 'boolean' && !navigator.onLine) {
          const cached = loadCache();
          let html = `
            <div style="text-align: center; color: var(--color-error); padding: 12px;">
              当前处于离线状态，无法连接排行榜服务。
            </div>
            <div style="display:flex; gap:8px; justify-content:center;">
              <button id="${contentId}Retry" class="nav-btn"><span class="nav-btn-text">重试</span></button>
              ${cached ? `<button id="${contentId}ShowCache" class="nav-btn primary"><span class="nav-btn-text">显示缓存</span></button>` : ''}
            </div>
          `;
          target.innerHTML = html;
          const retryBtn = document.getElementById(`${contentId}Retry`);
          if (retryBtn) retryBtn.addEventListener('click', () => renderLeaderboardCard(containerId));
          const showCacheBtn = document.getElementById(`${contentId}ShowCache`);
          if (showCacheBtn && cached) {
            showCacheBtn.addEventListener('click', () => {
              renderBoard(cached.data);
              const when = new Date(cached.cachedAt);
              const note = document.createElement('div');
              note.style.cssText = 'margin-top:8px; text-align:center; color: var(--color-text-secondary)';
              note.textContent = `显示缓存数据（保存于 ${when.toLocaleString()}）`;
              target.appendChild(note);
            });
          }
          if (!isAggregate) await renderTopHistoryMain(forceBust);
          return;
        }

        // 依次尝试各端点（支持国内镜像，通过 window.QUIZ_CONFIG.leaderboardEndpoints 配置）
        try {
          let data = null;
          for (const endpoint of configured) {
            try {
              const url = isAggregate
                ? `${endpoint}?limit=${encodeURIComponent(window.QUIZ_CONFIG?.aggregateLimit || 100)}${forceBust ? `&bust=${Date.now()}` : ''}`
                : `${endpoint}?date=${encodeURIComponent(dateStr)}${forceBust ? `&bust=${Date.now()}` : ''}`;
              const response = await fetchWithTimeout(url, 3500);
              data = await response.json();
              if (data && Array.isArray(data.leaderboard) && data.leaderboard.length > 0) {
                break;
              }
              // 当前端点为空榜或响应无效，继续尝试下一个端点
            } catch (e) {
              // 继续下一端点
            }
          }
          if (data && Array.isArray(data.leaderboard)) {
            if (data.leaderboard.length > 0) {
              await renderBoard(data);
              // 仅当存在有效数据时缓存
              saveCache(data);
              if (!isAggregate) await renderTopHistoryMain(forceBust);
              return;
            }
            // 首次响应为空榜，自动进行一次 bust 重试以绕过 CDN 空缓存（仅每日模式）
            if (!isAggregate) {
              try {
                for (const endpoint of configured) {
                  try {
                    const url2 = `${endpoint}?date=${encodeURIComponent(dateStr)}&bust=${Date.now()}`;
                    const resp2 = await fetchWithTimeout(url2, 3000);
                    const data2 = await resp2.json();
                    if (data2 && Array.isArray(data2.leaderboard)) {
                        if (data2.leaderboard.length > 0) {
                          await renderBoard(data2);
                          saveCache(data2);
                          if (!isAggregate) await renderTopHistoryMain(true);
                          return;
                        }
                        // 二次仍为空，继续尝试下一个端点
                        continue;
                      }
                  } catch (_) {}
                }
              } catch (_) {}
            }
            // 保持现有空态展示，但不写入空缓存
            await renderBoard(data);
            if (!isAggregate) await renderTopHistoryMain(forceBust);
            return;
          }
          throw new Error('All endpoints failed');
        } catch (error) {
          console.error('加载排行榜失败:', error);
          const cached = loadCache();
          let html = `
            <div style="text-align: center; color: var(--color-error); padding: 12px;">
              无法连接排行榜服务。
            </div>
            <div style="display:flex; gap:8px; justify-content:center;">
              <button id="${contentId}Retry" class="nav-btn"><span class="nav-btn-text">重试</span></button>
              ${cached ? `<button id="${contentId}ShowCache" class="nav-btn primary"><span class="nav-btn-text">显示缓存</span></button>` : ''}
            </div>
          `;
          target.innerHTML = html;
          const retryBtn = document.getElementById(`${contentId}Retry`);
          if (retryBtn) retryBtn.addEventListener('click', () => renderLeaderboardCard(containerId));
          const showCacheBtn = document.getElementById(`${contentId}ShowCache`);
          if (showCacheBtn && cached) {
            showCacheBtn.addEventListener('click', () => {
              renderBoard(cached.data);
              const when = new Date(cached.cachedAt);
              const note = document.createElement('div');
              note.style.cssText = 'margin-top:8px; text-align:center; color: var(--color-text-secondary)';
              note.textContent = `显示缓存数据（保存于 ${when.toLocaleString()}）`;
              target.appendChild(note);
            });
          }
          if (!isAggregate) await renderTopHistoryMain(forceBust);
        }
      }

      // 页面加载后在主界面卡片下方渲染排行榜
      const mainLeaderboardEl = document.getElementById('leaderboardCardMain');
      if (mainLeaderboardEl) {
        renderLeaderboardCard('leaderboardCardMain');
      }
      
      // 显示每日挑战排行榜
  async function showDailyChallengeLeaderboard() {
    try {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.style.display = 'block';
      const content = document.createElement('div');
      content.className = 'modal-content';
      const selectionMode = (window.QUIZ_CONFIG?.leaderboardSelectionMode || 'both');
      if (selectionMode === 'both') {
        try { const savedMode = localStorage.getItem('leaderboardViewMode'); if (savedMode) window.QUIZ_CONFIG.leaderboardViewMode = savedMode; } catch (_) {}
      }
      let viewMode = (window.QUIZ_CONFIG?.leaderboardViewMode || 'daily_plus_history');
      if (selectionMode === 'daily_only') {
        viewMode = 'daily_plus_history';
        window.QUIZ_CONFIG.leaderboardViewMode = 'daily_plus_history';
      } else if (selectionMode === 'aggregate_only') {
        viewMode = 'aggregate';
        window.QUIZ_CONFIG.leaderboardViewMode = 'aggregate';
      }
      const isAggregate = viewMode === 'aggregate';
      const switchModalMarkup = selectionMode === 'both' ? `
            <div id="leaderboardModalModeSwitch" style="display:inline-flex; border:1px solid var(--color-border-light); border-radius:16px; overflow:hidden;">
              <button id="leaderboardModalModeAgg" class="nav-btn" style="border:none; ${isAggregate ? 'background: var(--color-accent); color:#fff;' : 'background:transparent; color: var(--color-text-secondary);'}"><span class="nav-btn-text">总榜</span></button>
              <button id="leaderboardModalModeDaily" class="nav-btn" style="border:none; ${!isAggregate ? 'background: var(--color-accent); color:#fff;' : 'background:transparent; color: var(--color-text-secondary);'}"><span class="nav-btn-text">今日</span></button>
            </div>` : '';
      content.innerHTML = `
        <div class="modal-header" style="display:flex; align-items:center; justify-content:space-between;">
          <h3>${isAggregate ? '每日挑战总排行榜' : '每日挑战排行榜'}</h3>
          <div style="display:flex; align-items:center; gap:8px;">
            ${switchModalMarkup}
            <span class="close" id="closeLeaderboard">&times;</span>
          </div>
        </div>
        <div class="modal-body">
          <div id="leaderboardContent">加载中...</div>
          ${isAggregate ? '' : `
          <div id="leaderboardHistoryWrap" style="margin-top:12px; padding-top:8px; border-top:1px solid var(--color-border-light);">
            <div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div>
            <div style="padding:12px; text-align:center; color: var(--color-text-muted);">加载中...</div>
          </div>`}
        </div>
      `;
      modal.appendChild(content);
      document.body.appendChild(modal);
      const cleanup = () => { try { document.body.removeChild(modal); } catch (_) {} };
      document.getElementById('closeLeaderboard')?.addEventListener('click', cleanup);
      modal.addEventListener('click', (e) => { if (e.target === modal) cleanup(); });

      if ((window.QUIZ_CONFIG?.leaderboardSelectionMode || 'both') === 'both') {
        const modeAggBtn = document.getElementById('leaderboardModalModeAgg');
        const modeDailyBtn = document.getElementById('leaderboardModalModeDaily');
        if (modeAggBtn) {
          modeAggBtn.addEventListener('click', () => {
            window.QUIZ_CONFIG.leaderboardViewMode = 'aggregate';
            try { localStorage.setItem('leaderboardViewMode', 'aggregate'); } catch (_) {}
            cleanup();
            showDailyChallengeLeaderboard();
          });
        }
        if (modeDailyBtn) {
          modeDailyBtn.addEventListener('click', () => {
            window.QUIZ_CONFIG.leaderboardViewMode = 'daily_plus_history';
            try { localStorage.setItem('leaderboardViewMode', 'daily_plus_history'); } catch (_) {}
            cleanup();
            showDailyChallengeLeaderboard();
          });
        }
      }
      
      // 加载排行榜数据（支持多端点与超时）
      const preferBust = (() => { try { const until = parseInt((sessionStorage.getItem('leaderboardForceBustUntil') || '0'), 10); return until > Date.now(); } catch (_) { return false; } })();
      const forceBust = preferBust;
      const d = window.dailyChallengeDate;
      const dateStr = (d && d.year && d.month && d.day)
        ? `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`
        : (() => {
            const now = new Date();
            return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
          })();

      const configured = isAggregate
        ? (Array.isArray(window.QUIZ_CONFIG?.aggregateLeaderboardEndpoints) && window.QUIZ_CONFIG.aggregateLeaderboardEndpoints.length > 0
            ? window.QUIZ_CONFIG.aggregateLeaderboardEndpoints
            : ['https://quiz-api.aaamjs.asia/api/leaderboard/aggregate'])
        : (Array.isArray(window.QUIZ_CONFIG?.leaderboardEndpoints) && window.QUIZ_CONFIG.leaderboardEndpoints.length > 0
            ? window.QUIZ_CONFIG.leaderboardEndpoints
            : (Array.isArray(window.LEADERBOARD_ENDPOINTS) && window.LEADERBOARD_ENDPOINTS.length > 0
                ? window.LEADERBOARD_ENDPOINTS
                : ['https://quiz-api.aaamjs.asia/api/leaderboard']));

      const fetchWithTimeoutLocal = async (url, timeoutMs = 3500) => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
          const res = await fetch(url, { signal: controller.signal });
          return res;
        } finally {
          clearTimeout(timer);
        }
      };

      // 独立渲染弹窗内“最近7天每日前三”，避免依赖榜单成功
      async function renderTopHistoryModal(forceBustLocal) {
        try {
          const historyWrap = document.getElementById('leaderboardHistoryWrap');
          if (historyWrap) {
            historyWrap.innerHTML = '<div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div><div style="padding:12px; text-align:center; color: var(--color-text-muted);">加载中...</div>';
          }

          const topHistoryEndpointsCfg = Array.isArray(window.QUIZ_CONFIG?.topHistoryEndpoints) && window.QUIZ_CONFIG.topHistoryEndpoints.length > 0
            ? window.QUIZ_CONFIG.topHistoryEndpoints
            : ['https://quiz-api.aaamjs.asia/api/top3/history'];

          let history = null;
          const histCacheKey = 'topHistoryCache:7:3:0';
          if (!forceBustLocal) {
            const hCache = loadHistoryCache(histCacheKey);
            if (hCache && hCache.data && Array.isArray(hCache.data.items) && hCache.data.items.some((it) => Array.isArray(it.tops) && it.tops.length > 0)) {
              history = hCache.data;
            }
          }
          if (!history) {
            for (const endpoint of topHistoryEndpointsCfg) {
              try {
                const url = `${endpoint}?days=7&limit=3&includeToday=0${forceBustLocal ? `&bust=${Date.now()}` : ''}`;
                const resp = await fetchWithTimeoutLocal(url, 3000);
                const hdata = await resp.json();
                if (hdata && Array.isArray(hdata.items)) { history = hdata; break; }
              } catch (_) {}
            }
            if (history && Array.isArray(history.items) && history.items.some((it) => Array.isArray(it.tops) && it.tops.length > 0)) {
              try { saveHistoryCache(histCacheKey, history); } catch (_) {}
            }
          }

          const hasItems = history && Array.isArray(history.items) && history.items.filter((it) => Array.isArray(it.tops) && it.tops.length > 0).length > 0;
          if (historyWrap) {
            if (hasItems) {
              let hHtml = '<div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div>';
              hHtml += '<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:12px; margin-top:8px;">';

              history.items.filter((it) => Array.isArray(it.tops) && it.tops.length > 0).forEach((it) => {
                hHtml += `
                  <div style="border:1px solid var(--color-border-light); border-radius:8px; padding:8px; background: var(--theme-card-bg); color: var(--color-text-primary);">
                    <div style="text-align:center; font-weight:600; color: var(--color-text-secondary);">${it.date}</div>
                    <div style="display:grid; grid-template-columns: 36px 1fr 60px; gap:8px; margin-top:6px;">
                `;
                (Array.isArray(it.tops) ? it.tops : []).forEach((entry, idx) => {
                  const rankIcon = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
                  hHtml += `
                    <div style="display:contents;">
                      <div>${rankIcon} ${idx + 1}</div>
                      <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${entry.nickname}</div>
                      <div style="text-align:right; font-weight:bold;">${entry.finalScore}</div>
                    </div>
                  `;
                });
                hHtml += `
                    </div>
                  </div>
                `;
              });

              hHtml += '</div>';
              historyWrap.innerHTML = hHtml;
            } else {
              historyWrap.innerHTML = '<div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div><div style="padding:12px; text-align:center; color: var(--color-text-muted);">暂无数据</div>';
            }
          }
        } catch (_) {
          const historyWrap = document.getElementById('leaderboardHistoryWrap');
          if (historyWrap) {
            historyWrap.innerHTML = '<div style="text-align:center; color: var(--color-text-secondary); font-weight:600;">最近7天每日前三</div><div style="padding:12px; text-align:center; color: var(--color-text-muted);">暂无数据</div>';
          }
        }
      }

      let data = null;
      for (const endpoint of configured) {
        try {
          const url = isAggregate
            ? `${endpoint}?limit=${encodeURIComponent(window.QUIZ_CONFIG?.aggregateLimit || 100)}${forceBust ? `&bust=${Date.now()}` : ''}`
            : `${endpoint}?date=${encodeURIComponent(dateStr)}${forceBust ? `&bust=${Date.now()}` : ''}`;
          const response = await fetchWithTimeoutLocal(url, 3500);
          data = await response.json();
          if (data && Array.isArray(data.leaderboard)) {
            break;
          }
        } catch (e) {}
      }

      const leaderboardContent = document.getElementById('leaderboardContent');

      if (data && data.leaderboard && data.leaderboard.length > 0) {
        let html = `
          <div style="margin-bottom: 10px; color: var(--color-text-secondary); text-align: center;">
            ${isAggregate ? `总计 ${data.totalEntries} 人` : `${data.date} | 共 ${data.totalEntries} 人参与`}
          </div>
          <div style="display: grid; grid-template-columns: 50px 1fr 80px; gap: 10px; font-weight: bold; padding: 10px 0; border-bottom: 1px solid var(--color-border); color: var(--color-text-secondary);">
            <div>排名</div>
            <div>昵称</div>
            <div>分数</div>
          </div>
        `;
        
        data.leaderboard.forEach((entry, index) => {
          const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
          html += `
            <div style="display: grid; grid-template-columns: 50px 1fr 80px; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--color-border-light); color: var(--color-text-primary);">
              <div>${rankIcon} ${index + 1}</div>
              <div style="overflow: hidden; text-overflow: ellipsis;">${entry.nickname}</div>
              <div style="font-weight: bold;">${entry.finalScore}</div>
            </div>
          `;
        });
        
        leaderboardContent.innerHTML = html;

        if (!isAggregate) await renderTopHistoryModal(forceBust);

      } else {
        leaderboardContent.innerHTML = `
          <div style="text-align: center; color: var(--color-text-secondary); padding: 20px;">
            暂无排行榜数据
          </div>
        `;
        if (!isAggregate) await renderTopHistoryModal(forceBust);
      }
    } catch (error) {
      console.error('加载排行榜失败:', error);
      const leaderboardContent = document.getElementById('leaderboardContent');
      if (leaderboardContent) {
        leaderboardContent.innerHTML = `
          <div style="text-align: center; color: var(--color-error); padding: 20px;">
            加载失败，请稍后重试
          </div>
        `;
        if (!isAggregate) await renderTopHistoryModal(forceBust);
      }
    }
  }
      
      // 更新难度配置
      function updateDifficultyConfig(difficulty) {
        window.QUIZ_CONFIG.selectedDifficulty = difficulty;
        const difficultyConfig = window.QUIZ_CONFIG.difficultyLevels[difficulty];
        
        if (difficultyConfig) {
          // 应用难度配置
          window.QUIZ_CONFIG.questionCount = difficultyConfig.questionCount;
          window.QUIZ_CONFIG.difficultyRatio = { ...difficultyConfig.difficultyRatio };
          window.QUIZ_CONFIG.pools = { ...difficultyConfig.pools };
        }
      }
    })();

