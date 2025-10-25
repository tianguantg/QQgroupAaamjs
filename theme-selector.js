/**
 * 主题选择器UI组件
 * 提供美观的主题切换界面
 */

class ThemeSelector {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    /**
     * 初始化主题选择器
     */
    init() {
        this.createSelectorButton();
        this.createSelectorPanel();
        this.bindEvents();
    }

    /**
     * 创建主题选择器按钮
     */
    createSelectorButton() {
        const button = document.createElement('button');
        button.id = 'theme-selector-btn';
        button.className = 'theme-selector-btn';
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <span>主题</span>
        `;
        button.title = '切换主题';

        // 添加样式
        this.addButtonStyles();
        
        // 直接添加到body，确保固定定位相对于整个页面
        document.body.appendChild(button);

        this.button = button;
    }

    /**
     * 创建主题选择面板
     */
    createSelectorPanel() {
        const panel = document.createElement('div');
        panel.id = 'theme-selector-panel';
        panel.className = 'theme-selector-panel';
        
        // 创建面板内容
        panel.innerHTML = `
            <div class="theme-selector-header">
                <h3>选择主题</h3>
                <button class="theme-selector-close">&times;</button>
            </div>
            <div class="theme-selector-content">
                <div class="theme-options" id="theme-options">
                    <!-- 主题选项将在这里动态生成 -->
                </div>
            </div>
        `;

        // 添加样式
        this.addPanelStyles();
        
        // 添加到页面
        document.body.appendChild(panel);
        
        this.panel = panel;
        this.renderThemeOptions();
    }

    /**
     * 渲染主题选项
     */
    renderThemeOptions() {
        const optionsContainer = document.getElementById('theme-options');
        const allThemes = window.themeSwitcher.getAvailableThemes();
        const currentTheme = window.themeSwitcher.getCurrentTheme();
        const isRandomMode = localStorage.getItem('randomThemeMode') === 'true';

        // 添加随机主题选项
        const randomOption = `
            <div class="theme-option ${isRandomMode ? 'active' : ''}" 
                 data-theme="random">
                <div class="theme-preview">
                    <div class="theme-preview-bg theme-preview-random"></div>
                    <div class="theme-preview-card"></div>
                </div>
                <div class="theme-info">
                    <h4>随机主题</h4>
                    <p>每分钟自动切换随机主题</p>
                </div>
                <div class="theme-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                </div>
            </div>
        `;

        // 只显示基础主题（浅色主题和深色主题）
        const basicThemes = allThemes.filter(theme => 
            theme.key === 'default' || theme.key === 'dark'
        );

        const basicOptions = basicThemes.map(theme => `
            <div class="theme-option ${theme.key === currentTheme && !isRandomMode ? 'active' : ''}" 
                 data-theme="${theme.key}">
                <div class="theme-preview">
                    <div class="theme-preview-bg theme-preview-${theme.key}"></div>
                    <div class="theme-preview-card"></div>
                </div>
                <div class="theme-info">
                    <h4>${theme.name}</h4>
                    <p>${theme.description}</p>
                </div>
                <div class="theme-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                </div>
            </div>
        `).join('');

        optionsContainer.innerHTML = randomOption + basicOptions;

        // 添加主题预览样式
        this.addThemePreviewStyles();
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 按钮点击事件
        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePanel();
        });

        // 关闭按钮事件
        const closeBtn = this.panel.querySelector('.theme-selector-close');
        closeBtn.addEventListener('click', () => {
            this.closePanel();
        });

        // 点击面板外部关闭
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.panel.contains(e.target) && !this.button.contains(e.target)) {
                this.closePanel();
            }
        });

        // 主题选项点击事件
        this.panel.addEventListener('click', (e) => {
            const themeOption = e.target.closest('.theme-option');
            if (themeOption) {
                const themeName = themeOption.dataset.theme;
                this.selectTheme(themeName);
            }
        });

        // 监听主题切换事件
        document.addEventListener('themeChanged', (e) => {
            this.updateActiveTheme(e.detail.themeName);
        });

        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closePanel();
            }
        });
    }

    /**
     * 切换面板显示/隐藏
     */
    togglePanel() {
        if (this.isOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    /**
     * 打开面板
     */
    openPanel() {
        this.panel.classList.add('open');
        this.button.classList.add('active');
        this.isOpen = true;
        
        // 重新渲染主题选项（确保状态最新）
        this.renderThemeOptions();
    }

    /**
     * 关闭面板
     */
    closePanel() {
        this.panel.classList.remove('open');
        this.button.classList.remove('active');
        this.isOpen = false;
    }

    /**
     * 选择主题
     */
    selectTheme(themeName) {
        if (themeName === 'random') {
            // 启用随机主题模式
            localStorage.setItem('randomThemeMode', 'true');
            window.themeSwitcher.startRandomThemeTimer();
            // 手动切换为随机主题时，强制立即随机一次
            window.themeSwitcher.applyRandomTheme(true);
        } else {
            // 禁用随机主题模式
            localStorage.setItem('randomThemeMode', 'false');
            window.themeSwitcher.stopRandomThemeTimer();
            // 应用选择的主题
            window.themeSwitcher.switchTheme(themeName);
        }
        this.closePanel();
    }

    /**
     * 更新活跃主题显示
     */
    updateActiveTheme(themeName) {
        const options = this.panel.querySelectorAll('.theme-option');
        options.forEach(option => {
            if (option.dataset.theme === themeName) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    /**
     * 添加按钮样式
     */
    addButtonStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-selector-btn {
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                background: var(--theme-card-bg);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                color: var(--color-text-primary);
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                position: relative;
                overflow: hidden;
            }

            .theme-selector-btn:hover {
                background: var(--theme-card-bg-hover);
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .theme-selector-btn.active {
                background: var(--theme-btn-gradient);
                color: white;
                border-color: transparent;
            }

            .theme-selector-btn svg {
                transition: transform 0.3s ease;
            }

            .theme-selector-btn:hover svg {
                transform: rotate(180deg);
            }

            .theme-selector-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.5s ease;
            }

            .theme-selector-btn:hover::before {
                left: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 添加面板样式
     */
    addPanelStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-selector-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                width: 480px;
                max-width: 90vw;
                max-height: 80vh;
                background: var(--theme-card-bg);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                backdrop-filter: blur(20px);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                overflow: hidden;
            }

            .theme-selector-panel.open {
                opacity: 1;
                visibility: visible;
                transform: translate(-50%, -50%) scale(1);
            }

            .theme-selector-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                background: var(--theme-border-gradient);
                background-size: 200% 200%;
                animation: gradientShift 3s ease infinite;
            }

            .theme-selector-header h3 {
                margin: 0;
                color: white;
                font-size: 18px;
                font-weight: 600;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }

            .theme-selector-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 4px;
                border-radius: 6px;
                transition: all 0.2s ease;
                line-height: 1;
            }

            .theme-selector-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }

            .theme-selector-content {
                padding: 20px;
                max-height: 60vh;
                overflow-y: auto;
            }

            .theme-options {
                display: grid;
                gap: 16px;
            }

            .theme-option {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px;
                border: 2px solid transparent;
                border-radius: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: rgba(255, 255, 255, 0.05);
                position: relative;
                overflow: hidden;
            }

            .theme-option:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .theme-option.active {
                border-color: var(--color-primary);
                background: rgba(102, 126, 234, 0.1);
            }

            .theme-preview {
                width: 60px;
                height: 40px;
                border-radius: 8px;
                overflow: hidden;
                position: relative;
                flex-shrink: 0;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .theme-preview-bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }

            .theme-preview-card {
                position: absolute;
                top: 8px;
                left: 8px;
                right: 8px;
                bottom: 8px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 4px;
                backdrop-filter: blur(5px);
            }

            .theme-info {
                flex: 1;
            }

            .theme-info h4 {
                margin: 0 0 4px 0;
                color: var(--color-text-primary);
                font-size: 16px;
                font-weight: 600;
            }

            .theme-info p {
                margin: 0;
                color: var(--color-text-muted);
                font-size: 14px;
            }

            .theme-check {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: var(--color-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transform: scale(0);
                transition: all 0.3s ease;
            }

            .theme-option.active .theme-check {
                opacity: 1;
                transform: scale(1);
            }

            .theme-check svg {
                color: white;
            }

            /* 滚动条样式 */
            .theme-selector-content::-webkit-scrollbar {
                width: 6px;
            }

            .theme-selector-content::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
            }

            .theme-selector-content::-webkit-scrollbar-thumb {
                background: var(--color-primary);
                border-radius: 3px;
            }

            .theme-selector-content::-webkit-scrollbar-thumb:hover {
                background: var(--color-primary-dark);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 添加主题预览样式
     */
    addThemePreviewStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-preview-random {
                background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #feca57 100%);
                position: relative;
                animation: randomThemeGradient 3s ease-in-out infinite;
            }

            @keyframes randomThemeGradient {
                0%, 100% {
                    background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #feca57 100%);
                }
                33% {
                    background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 25%, #ffd3a5 50%, #fd9853 75%, #ff6b6b 100%);
                }
                66% {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
                }
            }

            .theme-preview-default {
                background: linear-gradient(135deg, #8b9cf4 0%, #a8b5f7 50%, #f5a7fb 100%);
            }

            .theme-preview-dark {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            }

            .theme-preview-sakura {
                background: linear-gradient(135deg, #FFE8ED 0%, #F8E8F5 50%, #F0F4F8 100%);
                position: relative;
            }

            .theme-preview-sakura::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 30% 30%, rgba(255, 183, 197, 0.3) 20%, transparent 40%),
                           radial-gradient(circle at 70% 70%, rgba(248, 187, 217, 0.3) 20%, transparent 40%);
                border-radius: inherit;
            }

            .theme-preview-springFestival {
                background: linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 25%, #FFE4E1 50%, #FDF5E6 100%);
                position: relative;
            }

            .theme-preview-springFestival::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.15) 25%, transparent 45%),
                           radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.2) 25%, transparent 45%),
                           radial-gradient(circle at 50% 50%, rgba(255, 99, 71, 0.1) 20%, transparent 40%);
                border-radius: inherit;
            }

            .theme-preview-chaplin {
                background: linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 25%, #E8E8E8 50%, #F5F5F5 100%);
                position: relative;
            }

            .theme-preview-chaplin::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.02) 2px, rgba(0, 0, 0, 0.02) 4px),
                           radial-gradient(circle at 30% 30%, rgba(44, 44, 44, 0.08) 20%, transparent 40%),
                           radial-gradient(circle at 70% 70%, rgba(105, 105, 105, 0.06) 20%, transparent 40%);
                border-radius: inherit;
            }

            .theme-preview-halloween {
                background: linear-gradient(135deg, #1A1A1A 0%, #2E2E2E 50%, #1A1A1A 100%);
                position: relative;
            }

            .theme-preview-halloween::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.4) 15%, transparent 35%),
                           radial-gradient(circle at 80% 20%, rgba(106, 27, 154, 0.4) 15%, transparent 35%),
                           radial-gradient(circle at 50% 50%, rgba(255, 143, 0, 0.3) 10%, transparent 30%);
                border-radius: inherit;
            }

            .theme-preview-light {
                background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%);
            }

            .theme-preview-blue {
                background: linear-gradient(135deg, #0f1419 0%, #1e3a8a 50%, #1e40af 100%);
            }
        `;
        document.head.appendChild(style);
    }
}

// 等待DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 确保主题切换器已初始化
    if (window.themeSwitcher) {
        window.themeSelector = new ThemeSelector();
    } else {
        // 如果主题切换器还未加载，等待一下
        setTimeout(() => {
            if (window.themeSwitcher) {
                window.themeSelector = new ThemeSelector();
            }
        }, 100);
    }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSelector;
}