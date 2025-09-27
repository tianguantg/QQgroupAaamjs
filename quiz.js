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
        
        // 如果有图片，预加载
        if (question.promptImage) {
          try {
            await this.preloader.preloadImage(question.promptImage);
            question._imagePreloaded = true;
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
    const questionBuffer = new QuestionBuffer();

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
      questionCount: 10,
      difficultyRatio: { easy: 2, normal: 1, hard: 1 }, // 主要是简单和普通题
      pools: { card: 1, character: 1, event: 1, profile: 1, decision: 1, enemy: 1, skill: 1}
    },
    hard: {
      name: '困难难度', 
      description: '有一定挑战性，需要更多游戏知识',
      questionCount: 15,
      difficultyRatio: { easy: 1, normal: 1, hard: 1 }, // 平衡分布，偏向普通
      pools: { card: 1, character: 1, event: 1, profile: 1, decision: 1, enemy: 1, skill: 1}
    },
    nightmare: {
      name: '噩梦难度',
      description: '极具挑战性，考验深度理解',
      questionCount: 25,
      difficultyRatio: { easy: 1, normal: 2, hard: 4 }, // 主要是普通和困难题
      pools: { card: 2, character: 1.5, event: 2, profile: 1, decision: 3, enemy: 2, skill: 2}
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
                    <img src="images/decisions/A.png" alt="攻击力" class="decision-icon" />
                    <span class="stat-value stat-value-a">
                      <div style="line-height: 1;">${A}</div>
                      <div style="line-height: 0.5; margin: -2px 0;">-</div>
                      <div style="line-height: 1;">${A}</div>
                    </span>
                  </div>
                </div>
                <div class="stat-icon-container">
                  <div class="stat-icon" style="position: relative;">
                    <img src="images/decisions/X.png" alt="骰点" class="decision-icon" />
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
                    <img src="images/decisions/D.png" alt="防御力" class="decision-icon" />
                    <span class="stat-value stat-value-d">
                      <div style="line-height: 1;">${D}</div>
                      <div style="line-height: 0.5; margin: -2px 0;">-</div>
                      <div style="line-height: 1;">${D}</div>
                    </span>
                  </div>
                </div>
                <div class="stat-icon-container">
                  <div class="stat-icon" style="position: relative;">
                    <img src="images/decisions/HP.png" alt="生命值" class="decision-icon-hp" />
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
          answer: correctAnswer
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
        // 清理状态
        lock = false;
        resultView.style.display = 'none';
        questionText.style.display = '';
        nextBtn.style.display = 'none'; // 每次渲染新题目时隐藏下一题按钮
        
        // 清除之前的解析内容
        const existingExplanations = document.querySelectorAll('.explanation-content');
        existingExplanations.forEach(el => el.remove());
        
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
        
        // 时间得分 = min(max(100+题目数量*6-答题所用秒数,0), 100)，四舍五入到整数
        const timeScore = Math.min(Math.max(100 + totalQuestions * 6 - timeInSeconds,0), 100);
        
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
            'nightmare': '噩梦难度'
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
        
        // 使用缓冲池获取下一题
        if (questionBuffer && questionBuffer.generator) {
          current = await questionBuffer.getNext();
        } else {
          // 回退到原始方式（兼容性）
          current = generator.next(mode, total);
        }
        
        if (!current) { endQuiz(); return; }
        renderQuestion(current);
        updateStatus();
      }

      function onSelect(optionText, btn){
        if (lock) return;
        lock = true;
        const isCorrect = optionText === current.answer;
        if (isCorrect) score += 1;
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
              background: var(--color-bg-info);
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
          }
          
          // 为skill_description题目显示选项解析
          if (current.type === 'skill_description' && current.optionDetails) {
            const skillExplanationDiv = document.createElement('div');
            skillExplanationDiv.className = 'explanation-content'; // 添加类名用于清除
            skillExplanationDiv.style.cssText = `
              margin-top: 12px;
              padding: 12px;
              background: var(--color-bg-info);
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
                
                // 如果是incorrect_description，则在来源后贴出correct_description
                if (detail.isIncorrectDescription && detail.correctDescription) {
                  if (detail.source) {
                    lineHTML += `<br>&nbsp;&nbsp;&nbsp;&nbsp;正确描述：${detail.correctDescription}`;
                  } else {
                    lineHTML += `正确描述：${detail.correctDescription}`;
                  }
                }
                
                explanationHTML += lineHTML + '<br>';
              }
            });
            
            skillExplanationDiv.innerHTML = explanationHTML;
            
            // 将解析添加到"下一题"按钮的后一行
            const nextButtonArea = nextBtn.parentElement;
            nextButtonArea.parentElement.insertBefore(skillExplanationDiv, nextButtonArea.nextSibling);
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
        current = generator.next(mode);
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
      });
      
      // 难度按钮初始化和事件处理
      function initializeDifficultyButtons() {
        const normalBtn = document.getElementById('normalBtn');
        const hardBtn = document.getElementById('hardBtn');
        const nightmareBtn = document.getElementById('nightmareBtn');
        const dailyChallengeBtn = document.getElementById('dailyChallengeBtn');
        
        // 为每个难度按钮添加点击事件，直接开始测验
        normalBtn.addEventListener('click', () => startQuizWithDifficulty('normal'));
        hardBtn.addEventListener('click', () => startQuizWithDifficulty('hard'));
        nightmareBtn.addEventListener('click', () => startQuizWithDifficulty('nightmare'));
        
        // 每日挑战按钮事件
        dailyChallengeBtn.addEventListener('click', () => startDailyChallenge());
        
        // 反馈按钮事件
        const feedbackBtn = document.getElementById('feedbackBtn');
        if (feedbackBtn) {
          feedbackBtn.addEventListener('click', () => {
            window.open('https://wj.qq.com/s2/24040427/7fc2/', '_blank');
          });
        }
      }
      
      // 开始每日挑战
      async function startDailyChallenge() {
        try {
          // 显示加载动画
          const loadingOverlay = document.getElementById('loadingOverlay');
          loadingOverlay.classList.add('show');
          
          // 设置每日挑战标识
          window.isDailyChallenge = true;
          
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
          current = generator.next(mode, total);
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

