/**
 * 主题切换系统
 * 支持多套皮肤的动态切换，保持所有现有功能和动画效果
 */

class ThemeSwitcher {
    constructor() {
        this.currentTheme = 'default';
        this.themes = this.initializeThemes();
        this.randomThemeTimer = null;
        this.init();
    }

    /**
     * 初始化主题配置
     */
    initializeThemes() {
        return {
            // 浅色主题（当前样式）
            default: {
                name: '浅色主题',
                description: '经典玻璃拟态风格',
                variables: {
                    // 主题色调
                    '--color-primary': '#667eea',
                    '--color-primary-dark': '#764ba2',
                    '--color-secondary': '#f093fb',
                    '--color-secondary-dark': '#f5576c',
                    '--color-accent': '#4facfe',
                    '--color-accent-dark': '#00f2fe',
                    
                    // 背景系统
                    '--theme-bg-gradient': 'radial-gradient(circle at 20% 20%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 80% 80%, var(--color-secondary) 0%, transparent 50%), radial-gradient(circle at 40% 60%, var(--color-primary-dark) 0%, transparent 50%), radial-gradient(circle at 70% 30%, var(--color-secondary-dark) 0%, transparent 50%), radial-gradient(circle at 30% 70%, var(--color-accent) 0%, transparent 50%), radial-gradient(circle at 60% 40%, var(--color-accent-dark) 0%, transparent 50%), linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 25%, var(--color-secondary) 50%, var(--color-secondary-dark) 75%, var(--color-accent) 100%)',
                    '--theme-bg-overlay': 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 2px, transparent 2px), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 1px, transparent 1px), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px)',
                    '--theme-bg-secondary': 'linear-gradient(135deg, #a8b5f7 0%, #f5a7fb 50%, #8b9cf4 100%)',
                    
                    // 卡片背景
                    '--theme-card-bg': 'rgba(255, 255, 255, 0.70)',
                    '--theme-card-bg-hover': 'rgba(255, 255, 255, 0.85)',
                    
                    // 按钮渐变
                    '--theme-btn-gradient': 'linear-gradient(135deg,rgb(84, 122, 204) 0%,rgb(82, 163, 218) 100%)',
                    '--theme-btn-gradient-hover': 'linear-gradient(135deg, #7c8ef0 0%,rgb(137, 180, 236) 100%)',
                    
                    // 边框渐变
                    '--theme-border-gradient': 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)',
                    
                    // 标签背景
                    '--theme-tag-bg': 'rgba(102, 126, 234, 0.1)',
                    '--theme-tag-bg-hover': 'rgba(200, 255, 240, 0.9)',
                    
                    // 文字颜色
                    '--color-text-primary': '#1a202c',
                    '--color-text-secondary': '#2d3748',
                    '--color-text-muted': '#4a5568',
                    '--color-text-light': '#a0aec0',
                    '--color-text-white': '#ffffff',
                    '--color-text-black': '#000000',
                    '--color-text-dark': '#444444',
                    '--color-text-info': '#5a67d8',
                    '--color-text-success': '#2e7d32',
                    '--color-text-error': '#c62828',
                    '--color-text-warning': '#c53030',
                    '--color-text-link': '#1565c0',
                    
                    // 背景颜色
                    '--color-bg-white': '#ffffff',
                    '--color-bg-light': 'rgba(255, 255, 255, 0.9)',
                    '--color-bg-success': 'rgba(76, 175, 80, 0.1)',
                    '--color-bg-error': 'rgba(244, 67, 54, 0.1)',
                    '--color-bg-info': 'rgba(102, 126, 234, 0.12)',
                    
                    // 边框颜色
                    '--color-border-success': 'rgba(76, 175, 80, 0.3)',
                    '--color-border-error': 'rgba(244, 67, 54, 0.3)',
                    '--color-border-info': 'rgba(102, 126, 234, 0.25)',
                    
                    // 主要颜色 - 浅色主题专用
                    '--color-info': '#5a67d8',
                    '--color-success': '#4caf50',
                    '--color-error': '#f44336',
                    '--color-warning': '#ff9800',
                    
                    // 浅色主题标签渐变
                    '--theme-tag-gradient-1': 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    '--theme-tag-gradient-2': 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
                    '--theme-tag-gradient-3': 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1))',
                    
                    // 浅色主题专用公告样式
                    '--announcement-bg-dark': 'rgba(255, 255, 255, 0.85)',
                    '--announcement-border-dark': 'rgba(102, 126, 234, 0.3)',
                    '--announcement-title-color-dark': '#1a202c',
                    '--announcement-content-color-dark': '#4a5568',
                    
                    // 关系图页面专用变量
                    '--relation-header-bg': 'rgba(255, 255, 255, 0.85)',
                    '--relation-header-border': 'rgba(255, 255, 255, 0.6)',
                    '--relation-graph-bg': 'rgba(255, 255, 255, 0.9)',
                    '--relation-note-bg': 'rgba(255, 255, 255, 0.95)',
                    '--relation-note-border': 'rgba(255, 255, 255, 0.85)',
                    '--relation-legend-text-color': '#4a5568',
                    '--relation-preview-label-color': '#2d3748',
                    
                    // 输入框卡片专用变量
                    '--user-selector-bg': 'rgba(255, 255, 255, 0.55)',
                    '--user-selector-bg-hover': 'rgba(255, 255, 255, 0.7)',
                    '--user-selector-border': 'rgba(255, 255, 255, 0.7)',
                    '--user-selector-shadow': '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(255, 255, 255, 0.1)',
                    '--user-selector-backdrop-filter': 'blur(15px) saturate(180%)'
                }
            },

            // 暗黑主题
            dark: {
                name: '暗黑主题',
                description: '深色护眼模式',
                variables: {
                    // 主题色调 - 深色系渐变
                    '--color-primary': '#2d3748',
                    '--color-primary-dark': '#1a202c',
                    '--color-secondary': '#4a5568',
                    '--color-secondary-dark': '#2d3748',
                    '--color-accent': '#1a365d',
                    '--color-accent-dark': '#2c5282',
                    
                    // 背景系统 - 深色渐变
                    '--theme-bg-gradient': 'radial-gradient(circle at 20% 20%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 80% 80%, var(--color-secondary) 0%, transparent 50%), radial-gradient(circle at 40% 60%, var(--color-primary-dark) 0%, transparent 50%), radial-gradient(circle at 70% 30%, var(--color-secondary-dark) 0%, transparent 50%), radial-gradient(circle at 30% 70%, var(--color-accent) 0%, transparent 50%), radial-gradient(circle at 60% 40%, var(--color-accent-dark) 0%, transparent 50%), linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 25%, var(--color-secondary) 50%, var(--color-secondary-dark) 75%, var(--color-accent) 100%)',
                    '--theme-bg-overlay': 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0.5px, transparent 0.5px), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
                    '--theme-bg-secondary': 'linear-gradient(135deg, #16213e 0%, #0f3460 50%, #1a1a2e 100%)',
                    
                    // 卡片背景 - 深色半透明
                    '--theme-card-bg': 'rgba(40, 40, 40, 0.8)',
                    '--theme-card-bg-hover': 'rgba(60, 60, 60, 0.9)',
                    
                    // 按钮渐变 - 暗黑主题专用深色渐变
                    '--theme-btn-gradient': 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%)',
                    '--theme-btn-gradient-hover': 'linear-gradient(135deg, #4b5563 0%, #374151 50%, #1f2937 100%)',
                    
                    // 边框渐变 - 保持彩虹但调暗
                    '--theme-border-gradient': 'linear-gradient(45deg, #5a6fd8, #6b4190, #e081e9, #e3456a, #3d9aec, #00e0ec)',
                    
                    // 标签背景
                    '--theme-tag-bg': 'rgba(90, 111, 216, 0.15)',
                    '--theme-tag-bg-hover': 'rgba(160, 200, 180, 0.8)',
                    
                    // 文字颜色 - 浅色
                    '--color-text-primary': '#f0f0f0',
        '--color-text-secondary': '#e0e0e0',
        '--color-text-muted': '#d0d0d0',
                    '--color-text-light': '#808080',
                    '--color-text-white': '#ffffff',
                    '--color-text-black': '#e0e0e0',
                    '--color-text-dark': '#c0c0c0',
                    '--color-text-info': '#7c8ef0',
                    '--color-text-success': '#4caf50',
                    '--color-text-error': '#f44336',
                    '--color-text-warning': '#ff6b6b',
                    '--color-text-link': '#64b5f6',
                    
                    // 标签文字颜色 - 暗黑主题专用
                    '--color-primary': '#90a4f7',
                    '--color-secondary': '#e081e9',
                    
                    // 背景颜色
                    '--color-bg-white': 'rgba(40, 40, 40, 0.9)',
                    '--color-bg-light': 'rgba(60, 60, 60, 0.9)',
                    '--color-bg-success': 'rgba(76, 175, 80, 0.2)',
                    '--color-bg-error': 'rgba(244, 67, 54, 0.2)',
                    '--color-bg-info': 'rgba(90, 111, 216, 0.2)',
                    
                    // 边框颜色
                    '--color-border-success': 'rgba(76, 175, 80, 0.4)',
                    '--color-border-error': 'rgba(244, 67, 54, 0.4)',
                    '--color-border-info': 'rgba(90, 111, 216, 0.4)',
                    
                    // 主要颜色 - 暗黑主题专用
                    '--color-info': '#90a4f7',
                    '--color-success': '#4caf50',
                    '--color-error': '#f44336',
                    '--color-warning': '#ff6b6b',
                    
                    // 暗黑主题专用标签渐变
                    '--theme-tag-gradient-1': 'linear-gradient(135deg, rgba(144, 164, 247, 0.15), rgba(107, 65, 144, 0.15))',
                    '--theme-tag-gradient-2': 'linear-gradient(135deg, rgba(224, 129, 233, 0.15), rgba(227, 69, 106, 0.15))',
                    '--theme-tag-gradient-3': 'linear-gradient(135deg, rgba(61, 154, 236, 0.15), rgba(0, 224, 236, 0.15))',
                    
                    // 暗黑主题专用公告样式
                    '--announcement-bg-dark': 'rgba(50, 50, 50, 0.8)',
        '--announcement-border-dark': 'rgba(90, 111, 216, 0.3)',
        '--announcement-title-color-dark': '#f0f0f0',
        '--announcement-content-color-dark': '#e0e0e0',
                    
                    // 关系图页面专用变量 - 暗黑主题
                    '--relation-header-bg': 'rgba(40, 40, 40, 0.8)',
                    '--relation-header-border': 'rgba(90, 111, 216, 0.3)',
                    '--relation-graph-bg': 'rgba(30, 30, 30, 0.9)',
                    '--relation-note-bg': 'rgba(50, 50, 50, 0.9)',
                    '--relation-note-border': 'rgba(90, 111, 216, 0.4)',
                    '--relation-note-color': '#9ca3af',
                    '--relation-legend-text-color': '#e0e0e0',
                    '--relation-preview-label-color': '#e0e0e0',
                    
                    // 输入框卡片专用变量 - 暗黑主题
                    '--user-selector-bg': 'rgba(40, 40, 40, 0.8)',
                    '--user-selector-bg-hover': 'rgba(60, 60, 60, 0.9)',
                    '--user-selector-border': 'rgba(90, 111, 216, 0.3)',
                    '--user-selector-shadow': '0 12px 40px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(90, 111, 216, 0.1)',
                    '--user-selector-backdrop-filter': 'blur(15px) saturate(180%)'
                }
            },

            // 春节主题
            springFestival: {
                name: '春节主题',
                description: '喜庆祥和的中国传统新年风格',
                variables: {
                    // 主题色调 - 中国红与金色系
                    '--color-primary': '#DC143C',        // 中国红
                    '--color-primary-dark': '#B22222',   // 深红色
                    '--color-secondary': '#FFD700',      // 金黄色
                    '--color-secondary-dark': '#DAA520', // 深金色
                    '--color-accent': '#FF6347',         // 朱红色
                    '--color-accent-dark': '#CD5C5C',    // 印度红
                    
                    // 背景系统 - 春节渐变
                    '--theme-bg-gradient': 'radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(178, 34, 34, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(218, 165, 32, 0.15) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(255, 99, 71, 0.1) 0%, transparent 50%), linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 25%, #FFE4E1 50%, #FDF5E6 75%, #FFF8DC 100%)',
                    '--theme-bg-overlay': 'radial-gradient(circle at 15% 85%, rgba(220, 20, 60, 0.08) 3px, transparent 3px), radial-gradient(circle at 85% 15%, rgba(255, 215, 0, 0.12) 2px, transparent 2px), radial-gradient(circle at 50% 50%, rgba(178, 34, 34, 0.06) 2.5px, transparent 2.5px)',
                    '--theme-bg-secondary': 'linear-gradient(135deg, #FFEBCD 0%, #FFE4E1 50%, #FDF5E6 100%)',
                    
                    // 卡片背景 - 温暖的米色半透明
                    '--theme-card-bg': 'rgba(255, 248, 220, 0.9)',
                    '--theme-card-bg-hover': 'rgba(255, 248, 220, 0.95)',
                    
                    // 按钮渐变 - 中国红到金色渐变
                    '--theme-btn-gradient': 'linear-gradient(135deg, #DC143C 0%, #B22222 50%, #DAA520 100%)',
                    '--theme-btn-gradient-hover': 'linear-gradient(135deg, #B22222 0%, #8B0000 50%, #B8860B 100%)',
                    
                    // 边框渐变 - 春季色彩
                    '--theme-border-gradient': 'linear-gradient(45deg, #DC143C, #FFD700, #FF6347, #DAA520, #B22222, #CD5C5C)',
                    
                    // 标签背景 - 淡红色和金色
                    '--theme-tag-bg': 'rgba(220, 20, 60, 0.1)',
                    '--theme-tag-bg-hover': 'rgba(255, 215, 0, 0.3)',
                    
                    // 文字颜色 - 深色系，确保在浅色背景上有良好对比度
                    '--color-text-primary': '#8B0000',      // 深红色
                    '--color-text-secondary': '#A0522D',    // 赭石色
                    '--color-text-muted': '#CD853F',       // 秘鲁色
                    '--color-text-light': '#D2691E',       // 巧克力色
                    '--color-text-white': '#ffffff',
                    '--color-text-black': '#2F1B14',       // 深棕色
                    '--color-text-dark': '#654321',        // 深棕色
                    '--color-text-info': '#B22222',        // 火砖色
                    '--color-text-success': '#228B22',     // 森林绿
                    '--color-text-error': '#DC143C',       // 深红色
                    '--color-text-warning': '#FF8C00',     // 深橙色
                    '--color-text-link': '#B22222',        // 火砖色
                    
                    // 背景颜色 - 春节主题专用
                    '--color-bg-white': 'rgba(255, 248, 220, 0.95)',
                    '--color-bg-light': 'rgba(255, 235, 205, 0.8)',
                    '--color-bg-success': 'rgba(144, 238, 144, 0.3)',
                    '--color-bg-error': 'rgba(255, 182, 193, 0.3)',
                    '--color-bg-info': 'rgba(255, 215, 0, 0.2)',
                    
                    // 边框颜色
                    '--color-border-success': 'rgba(34, 139, 34, 0.4)',
                    '--color-border-error': 'rgba(220, 20, 60, 0.4)',
                    '--color-border-info': 'rgba(218, 165, 32, 0.4)',
                    
                    // 主要颜色 - 春节主题专用
                    '--color-info': '#DAA520',
                    '--color-success': '#228B22',
                    '--color-error': '#DC143C',
                    '--color-warning': '#FF8C00',
                    
                    // 春季主题专用标签渐变
                    '--theme-tag-gradient-1': 'linear-gradient(135deg, rgba(220, 20, 60, 0.15), rgba(178, 34, 34, 0.15))',
                    '--theme-tag-gradient-2': 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(218, 165, 32, 0.2))',
                    '--theme-tag-gradient-3': 'linear-gradient(135deg, rgba(255, 99, 71, 0.15), rgba(205, 92, 92, 0.15))',
                    
                    // 春季主题专用公告样式
                    '--announcement-bg-dark': 'rgba(255, 248, 220, 0.9)',
                    '--announcement-border-dark': 'rgba(220, 20, 60, 0.3)',
                    '--announcement-title-color-dark': '#8B0000',
                    '--announcement-content-color-dark': '#A0522D',
                    
                    // 关系图页面专用变量 - 春季主题
                    '--relation-header-bg': 'rgba(255, 248, 220, 0.9)',
                    '--relation-header-border': 'rgba(220, 20, 60, 0.3)',
                    '--relation-graph-bg': 'rgba(255, 235, 205, 0.95)',
                    '--relation-note-bg': 'rgba(255, 248, 220, 0.95)',
                    '--relation-note-border': 'rgba(218, 165, 32, 0.4)',
                    '--relation-note-color': '#A0522D',
                    '--relation-legend-text-color': '#8B0000',
                    '--relation-preview-label-color': '#A0522D',
                    
                    // 输入框卡片专用变量 - 春季主题
                    '--user-selector-bg': 'rgba(255, 248, 220, 0.9)',
                    '--user-selector-bg-hover': 'rgba(255, 248, 220, 0.95)',
                    '--user-selector-border': 'rgba(220, 20, 60, 0.3)',
                    '--user-selector-shadow': '0 12px 40px rgba(220, 20, 60, 0.15), 0 4px 16px rgba(255, 215, 0, 0.1)',
                    '--user-selector-backdrop-filter': 'blur(15px) saturate(120%)'
                }
            },

            // 卓别林主题
            chaplin: {
                name: '卓别林主题',
                description: '经典黑白电影的复古质感风格',
                variables: {
                    // 主题色调 - 黑白灰色系
                    '--color-primary': '#2C2C2C',        // 深灰色
                    '--color-primary-dark': '#1A1A1A',  // 更深灰色
                    '--color-secondary': '#F5F5F5',     // 浅灰色
                    '--color-secondary-dark': '#E0E0E0', // 中浅灰
                    '--color-accent': '#696969',         // 暗灰色
                    '--color-accent-dark': '#4A4A4A',    // 深暗灰
                    
                    // 背景系统 - 黑白电影质感
                    '--theme-bg-gradient': 'radial-gradient(circle at 30% 30%, rgba(44, 44, 44, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(105, 105, 105, 0.06) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(26, 26, 26, 0.04) 0%, transparent 50%), linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 25%, #E8E8E8 50%, #F5F5F5 75%, #FAFAFA 100%)',
                    '--theme-bg-overlay': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.02) 2px, rgba(0, 0, 0, 0.02) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.01) 2px, rgba(0, 0, 0, 0.01) 4px)',
                    '--theme-bg-secondary': 'linear-gradient(135deg, #F8F8F8 0%, #EEEEEE 50%, #F0F0F0 100%)',
                    
                    // 卡片背景 - 复古纸质感
                    '--theme-card-bg': 'rgba(248, 248, 248, 0.95)',
                    '--theme-card-bg-hover': 'rgba(245, 245, 245, 0.98)',
                    
                    // 按钮渐变 - 黑白渐变
                    '--theme-btn-gradient': 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 50%, #000000 100%)',
                    '--theme-btn-gradient-hover': 'linear-gradient(135deg, #4A4A4A 0%, #2C2C2C 50%, #1A1A1A 100%)',
                    
                    // 边框渐变 - 灰度渐变
                    '--theme-border-gradient': 'linear-gradient(45deg, #2C2C2C, #696969, #A9A9A9, #D3D3D3, #4A4A4A, #808080)',
                    
                    // 标签背景 - 淡灰色
                    '--theme-tag-bg': 'rgba(44, 44, 44, 0.08)',
                    '--theme-tag-bg-hover': 'rgba(105, 105, 105, 0.15)',
                    
                    // 文字颜色 - 黑白对比
                    '--color-text-primary': '#1A1A1A',      // 深黑色
                    '--color-text-secondary': '#2C2C2C',    // 深灰色
                    '--color-text-muted': '#696969',       // 暗灰色
                    '--color-text-light': '#A9A9A9',       // 浅灰色
                    '--color-text-white': '#FFFFFF',
                    '--color-text-black': '#000000',       // 纯黑色
                    '--color-text-dark': '#333333',        // 深灰色
                    '--color-text-info': '#4A4A4A',        // 暗灰色
                    '--color-text-success': '#2C2C2C',     // 深灰色
                    '--color-text-error': '#1A1A1A',       // 深黑色
                    '--color-text-warning': '#696969',     // 暗灰色
                    '--color-text-link': '#2C2C2C',        // 深灰色
                    
                    // 背景颜色 - 卓别林主题专用
                    '--color-bg-white': 'rgba(250, 250, 250, 0.98)',
                    '--color-bg-light': 'rgba(240, 240, 240, 0.9)',
                    '--color-bg-success': 'rgba(220, 220, 220, 0.3)',
                    '--color-bg-error': 'rgba(180, 180, 180, 0.3)',
                    '--color-bg-info': 'rgba(200, 200, 200, 0.2)',
                    
                    // 边框颜色
                    '--color-border-success': 'rgba(44, 44, 44, 0.3)',
                    '--color-border-error': 'rgba(26, 26, 26, 0.4)',
                    '--color-border-info': 'rgba(105, 105, 105, 0.3)',
                    
                    // 主要颜色 - 卓别林主题专用
                    '--color-info': '#696969',
                    '--color-success': '#4A4A4A',
                    '--color-error': '#2C2C2C',
                    '--color-warning': '#808080',
                    
                    // 卓别林主题专用标签渐变
                    '--theme-tag-gradient-1': 'linear-gradient(135deg, rgba(44, 44, 44, 0.1), rgba(26, 26, 26, 0.1))',
                    '--theme-tag-gradient-2': 'linear-gradient(135deg, rgba(105, 105, 105, 0.08), rgba(74, 74, 74, 0.08))',
                    '--theme-tag-gradient-3': 'linear-gradient(135deg, rgba(169, 169, 169, 0.06), rgba(128, 128, 128, 0.06))',
                    
                    // 卓别林主题专用公告样式
                    '--announcement-bg-dark': 'rgba(248, 248, 248, 0.95)',
                    '--announcement-border-dark': 'rgba(44, 44, 44, 0.2)',
                    '--announcement-title-color-dark': '#1A1A1A',
                    '--announcement-content-color-dark': '#2C2C2C',
                    
                    // 关系图页面专用变量 - 卓别林主题
                    '--relation-header-bg': 'rgba(248, 248, 248, 0.95)',
                    '--relation-header-border': 'rgba(44, 44, 44, 0.2)',
                    '--relation-graph-bg': 'rgba(250, 250, 250, 0.98)',
                    '--relation-note-bg': 'rgba(245, 245, 245, 0.95)',
                    '--relation-note-border': 'rgba(105, 105, 105, 0.3)',
                    '--relation-note-color': '#2C2C2C',
                    '--relation-legend-text-color': '#1A1A1A',
                    '--relation-preview-label-color': '#2C2C2C',
                    
                    // 输入框卡片专用变量 - 卓别林主题
                    '--user-selector-bg': 'rgba(248, 248, 248, 0.95)',
                    '--user-selector-bg-hover': 'rgba(250, 250, 250, 0.98)',
                    '--user-selector-border': 'rgba(44, 44, 44, 0.2)',
                    '--user-selector-shadow': '0 12px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(44, 44, 44, 0.05)',
                    '--user-selector-backdrop-filter': 'blur(15px) saturate(120%)'
                }
            },

            // 樱花主题
            sakura: {
                name: '樱花主题',
                description: '温柔浪漫的日式美学风格',
                variables: {
                    // 主题色调 - 樱花粉色系
                    '--color-primary': '#FFB7C5',
                    '--color-primary-dark': '#FF8FA3',
                    '--color-secondary': '#F8BBD9',
                    '--color-secondary-dark': '#F48FB1',
                    '--color-accent': '#E1BEE7',
                    '--color-accent-dark': '#CE93D8',
                    
                    // 背景系统 - 樱花渐变
                    '--theme-bg-gradient': 'radial-gradient(circle at 20% 20%, rgba(255, 183, 197, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(248, 187, 217, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(225, 190, 231, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 143, 163, 0.2) 0%, transparent 50%), linear-gradient(135deg, #FFF8F0 0%, #FFE8ED 25%, #F8E8F5 50%, #F0F4F8 75%, #FFF8F0 100%)',
                    '--theme-bg-overlay': 'radial-gradient(circle at 20% 80%, rgba(255, 183, 197, 0.1) 2px, transparent 2px), radial-gradient(circle at 80% 20%, rgba(248, 187, 217, 0.15) 1px, transparent 1px), radial-gradient(circle at 40% 40%, rgba(225, 190, 231, 0.1) 1.5px, transparent 1.5px)',
                    '--theme-bg-secondary': 'linear-gradient(135deg, #FFE8ED 0%, #F8E8F5 50%, #F0F4F8 100%)',
                    
                    // 卡片背景 - 温暖半透明
                    '--theme-card-bg': 'rgba(255, 248, 240, 0.85)',
                    '--theme-card-bg-hover': 'rgba(255, 248, 240, 0.95)',
                    
                    // 按钮渐变 - 樱花粉渐变
                    '--theme-btn-gradient': 'linear-gradient(135deg, #FFB7C5 0%, #FF8FA3 100%)',
                    '--theme-btn-gradient-hover': 'linear-gradient(135deg, #FF8FA3 0%, #F48FB1 100%)',
                    
                    // 边框渐变 - 樱花色彩
                    '--theme-border-gradient': 'linear-gradient(45deg, #FFB7C5, #FF8FA3, #F8BBD9, #F48FB1, #E1BEE7, #CE93D8)',
                    
                    // 标签背景
                    '--theme-tag-bg': 'rgba(255, 183, 197, 0.15)',
                    '--theme-tag-bg-hover': 'rgba(255, 183, 197, 0.3)',
                    
                    // 文字颜色 - 深棕色系，确保对比度
                    '--color-text-primary': '#5D4037',
                    '--color-text-secondary': '#6D4C41',
                    '--color-text-muted': '#8D6E63',
                    '--color-text-light': '#A1887F',
                    '--color-text-white': '#ffffff',
                    '--color-text-black': '#3E2723',
                    '--color-text-dark': '#4E342E',
                    '--color-text-info': '#7B1FA2',
                    '--color-text-success': '#388E3C',
                    '--color-text-error': '#D32F2F',
                    '--color-text-warning': '#F57C00',
                    '--color-text-link': '#8E24AA',
                    
                    // 背景颜色
                    '--color-bg-white': 'rgba(255, 248, 240, 0.95)',
                    '--color-bg-light': 'rgba(255, 248, 240, 0.8)',
                    '--color-bg-success': 'rgba(200, 230, 201, 0.3)',
                    '--color-bg-error': 'rgba(255, 205, 210, 0.3)',
                    '--color-bg-info': 'rgba(225, 190, 231, 0.3)',
                    
                    // 边框颜色
                    '--color-border-success': 'rgba(129, 199, 132, 0.4)',
                    '--color-border-error': 'rgba(239, 154, 154, 0.4)',
                    '--color-border-info': 'rgba(206, 147, 216, 0.4)',
                    
                    // 主要颜色 - 樱花主题专用
                    '--color-info': '#E91E63',
                    '--color-error': '#D32F2F',
                    '--color-warning': '#FF6B35',
                    
                    // 樱花主题专用标签渐变
                    '--theme-tag-gradient-1': 'linear-gradient(135deg, rgba(255, 183, 197, 0.15), rgba(255, 143, 163, 0.15))',
                    '--theme-tag-gradient-2': 'linear-gradient(135deg, rgba(248, 187, 217, 0.15), rgba(244, 143, 177, 0.15))',
                    '--theme-tag-gradient-3': 'linear-gradient(135deg, rgba(225, 190, 231, 0.15), rgba(206, 147, 216, 0.15))',
                    
                    // 樱花主题专用公告样式
                    '--announcement-bg-dark': 'rgba(255, 248, 240, 0.9)',
                    '--announcement-border-dark': 'rgba(255, 183, 197, 0.4)',
                    '--announcement-title-color-dark': '#5D4037',
                    '--announcement-content-color-dark': '#6D4C41',
                    
                    // 关系图页面专用变量 - 樱花主题
                    '--relation-header-bg': 'rgba(255, 248, 240, 0.9)',
                    '--relation-header-border': 'rgba(255, 183, 197, 0.3)',
                    '--relation-graph-bg': 'rgba(255, 248, 240, 0.95)',
                    '--relation-note-bg': 'rgba(255, 248, 240, 0.98)',
                    '--relation-note-border': 'rgba(255, 183, 197, 0.4)',
                    '--relation-legend-text-color': '#6D4C41',
                    '--relation-preview-label-color': '#5D4037',
                    
                    // 输入框卡片专用变量 - 樱花主题
                    '--user-selector-bg': 'rgba(255, 248, 240, 0.9)',
                    '--user-selector-bg-hover': 'rgba(255, 248, 240, 0.95)',
                    '--user-selector-border': 'rgba(255, 183, 197, 0.3)',
                    '--user-selector-shadow': '0 12px 40px rgba(255, 183, 197, 0.15), 0 4px 16px rgba(248, 187, 217, 0.1)',
                    '--user-selector-backdrop-filter': 'blur(15px) saturate(180%)'
                }
            },

            // 万圣节主题
            halloween: {
                name: '万圣节主题',
                description: '神秘诡异的万圣节节日风格',
                variables: {
                    // 主题色调 - 万圣节经典配色
                    '--color-primary': '#FF6B35',
                    '--color-primary-dark': '#E55100',
                    '--color-secondary': '#6A1B9A',
                    '--color-secondary-dark': '#4A148C',
                    '--color-accent': '#FF8F00',
                    '--color-accent-dark': '#FF6F00',
                    
                    // 背景系统 - 神秘夜晚渐变
                    '--theme-bg-gradient': 'radial-gradient(circle at 20% 20%, rgba(106, 27, 154, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(74, 20, 140, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(229, 81, 0, 0.2) 0%, transparent 50%), linear-gradient(135deg, #1A1A1A 0%, #2E2E2E 25%, #1A1A1A 50%, #2E2E2E 75%, #1A1A1A 100%)',
                    '--theme-bg-overlay': 'radial-gradient(circle at 15% 85%, rgba(255, 107, 53, 0.1) 2px, transparent 2px), radial-gradient(circle at 85% 15%, rgba(106, 27, 154, 0.15) 1px, transparent 1px), radial-gradient(circle at 50% 50%, rgba(255, 143, 0, 0.08) 1.5px, transparent 1.5px)',
                    '--theme-bg-secondary': 'linear-gradient(135deg, #2E2E2E 0%, #1A1A1A 50%, #2E2E2E 100%)',
                    
                    // 卡片背景 - 暗黑半透明
                    '--theme-card-bg': 'rgba(46, 46, 46, 0.9)',
                    '--theme-card-bg-hover': 'rgba(74, 20, 140, 0.8)',
                    
                    // 按钮渐变 - 南瓜橙渐变
                    '--theme-btn-gradient': 'linear-gradient(135deg, #FF6B35 0%, #E55100 100%)',
                    '--theme-btn-gradient-hover': 'linear-gradient(135deg, #FF8F00 0%, #FF6B35 100%)',
                    
                    // 边框渐变 - 万圣节色彩
                    '--theme-border-gradient': 'linear-gradient(45deg, #FF6B35, #E55100, #6A1B9A, #4A148C, #FF8F00, #FF6F00)',
                    
                    // 标签背景
                    '--theme-tag-bg': 'rgba(255, 107, 53, 0.2)',
                    '--theme-tag-bg-hover': 'rgba(255, 107, 53, 0.4)',
                    
                    // 文字颜色 - 幽灵白和橙色系
                    '--color-text-primary': '#F5F5F5',
                    '--color-text-secondary': '#E0E0E0',
                    '--color-text-muted': '#BDBDBD',
                    '--color-text-light': '#9E9E9E',
                    '--color-text-white': '#FFFFFF',
                    '--color-text-black': '#1A1A1A',
                    '--color-text-dark': '#2E2E2E',
                    '--color-text-info': '#FF8F00',
                    '--color-text-success': '#4CAF50',
                    '--color-text-error': '#D32F2F',
                    '--color-text-warning': '#FF6B35',
                    '--color-text-link': '#FF8F00',
                    
                    // 背景颜色
                    '--color-bg-white': 'rgba(46, 46, 46, 0.95)',
                    '--color-bg-light': 'rgba(46, 46, 46, 0.8)',
                    '--color-bg-success': 'rgba(76, 175, 80, 0.2)',
                    '--color-bg-error': 'rgba(211, 47, 47, 0.2)',
                    '--color-bg-info': 'rgba(255, 143, 0, 0.2)',
                    
                    // 边框颜色
                    '--color-border-success': 'rgba(76, 175, 80, 0.4)',
                    '--color-border-error': 'rgba(211, 47, 47, 0.4)',
                    '--color-border-info': 'rgba(255, 143, 0, 0.4)',
                    
                    // 主要颜色 - 万圣节主题专用
                    '--color-info': '#FF8F00',
                    '--color-success': '#4CAF50',
                    '--color-error': '#D32F2F',
                    '--color-warning': '#FF6B35',
                    
                    // 万圣节主题专用标签渐变
                    '--theme-tag-gradient-1': 'linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(229, 81, 0, 0.2))',
                    '--theme-tag-gradient-2': 'linear-gradient(135deg, rgba(106, 27, 154, 0.2), rgba(74, 20, 140, 0.2))',
                    '--theme-tag-gradient-3': 'linear-gradient(135deg, rgba(255, 143, 0, 0.2), rgba(255, 111, 0, 0.2))',
                    
                    // 万圣节主题专用公告样式
                    '--announcement-bg-dark': 'rgba(46, 46, 46, 0.95)',
                    '--announcement-border-dark': 'rgba(255, 107, 53, 0.5)',
                    '--announcement-title-color-dark': '#FF8F00',
                    '--announcement-content-color-dark': '#F5F5F5',
                    
                    // 关系图页面专用变量 - 万圣节主题
                    '--relation-header-bg': 'rgba(46, 46, 46, 0.95)',
                    '--relation-header-border': 'rgba(255, 107, 53, 0.4)',
                    '--relation-graph-bg': 'rgba(26, 26, 26, 0.98)',
                    '--relation-note-bg': 'rgba(46, 46, 46, 0.9)',
                    '--relation-note-border': 'rgba(255, 107, 53, 0.5)',
                    '--relation-legend-text-color': '#F5F5F5',
                    '--relation-preview-label-color': '#FF8F00',
                    
                    // 输入框卡片专用变量 - 万圣节主题
                    '--user-selector-bg': 'rgba(46, 46, 46, 0.95)',
                    '--user-selector-bg-hover': 'rgba(46, 46, 46, 0.98)',
                    '--user-selector-border': 'rgba(255, 107, 53, 0.4)',
                    '--user-selector-shadow': '0 12px 40px rgba(255, 107, 53, 0.2), 0 4px 16px rgba(106, 27, 154, 0.15)',
                    '--user-selector-backdrop-filter': 'blur(15px) saturate(150%)'
                }
            },

        };
    }

    /**
     * 初始化主题配置
     */
    init() {
        // 从本地存储加载主题
        this.loadThemeFromStorage();
        
        // 首次访问：默认跟随系统浅色/暗黑，不启用随机主题
        if (!localStorage.getItem('selectedTheme')) {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = prefersDark ? 'dark' : 'default';
            this.currentTheme = initialTheme;
            this.saveThemeToStorage(initialTheme);
            this.applyTheme(initialTheme);
        } else {
            // 应用当前主题
            this.applyTheme(this.currentTheme);
        }
        
        // 若用户开启了随机主题模式，则启动定时器
        if (localStorage.getItem('randomThemeMode') === 'true') {
            this.startRandomThemeTimer();
        }
        
        // 监听存储变化（多标签页同步）
        window.addEventListener('storage', (e) => {
            if (e.key === 'selectedTheme') {
                this.currentTheme = e.newValue || 'default';
                this.applyTheme(this.currentTheme);
            }
        });
    }

    /**
     * 从本地存储加载主题
     */
    loadThemeFromStorage() {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        }
    }

    /**
     * 保存主题到本地存储
     */
    saveThemeToStorage(themeName) {
        localStorage.setItem('selectedTheme', themeName);
    }

    /**
     * 应用主题
     */
    applyTheme(themeName) {
        if (!this.themes[themeName]) {
            console.warn(`主题 "${themeName}" 不存在，使用浅色主题`);
            themeName = 'default';
        }

        const theme = this.themes[themeName];
        const root = document.documentElement;

        // 应用所有CSS变量
        Object.entries(theme.variables).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        // 更新当前主题标识
        root.style.setProperty('--current-theme', `'${themeName}'`);
        
        // 处理卓别林主题的特殊效果
        this.applyThemeSpecialEffects(themeName);
        
        this.currentTheme = themeName;
        this.saveThemeToStorage(themeName);

        // 触发主题切换事件
        this.dispatchThemeChangeEvent(themeName, theme);
    }

    /**
     * 应用主题特殊效果
     */
    applyThemeSpecialEffects(themeName) {
        const body = document.body;
        
        // 移除所有主题相关的body类名
        body.classList.remove('theme-chaplin', 'theme-dark', 'theme-sakura', 'theme-springFestival', 'theme-halloween', 'theme-light', 'theme-blue');
        
        // 根据主题添加对应的body类名
        if (themeName === 'chaplin') {
            body.classList.add('theme-chaplin');
        } else if (themeName === 'dark') {
            body.classList.add('theme-dark');
        } else if (themeName === 'sakura') {
            body.classList.add('theme-sakura');
        } else if (themeName === 'springFestival') {
            body.classList.add('theme-springFestival');
        } else if (themeName === 'halloween') {
            body.classList.add('theme-halloween');
        } else if (themeName === 'light') {
            body.classList.add('theme-light');
        } else if (themeName === 'blue') {
            body.classList.add('theme-blue');
        }
        // 浅色主题不需要特殊类名
    }

    /**
     * 切换到指定主题
     */
    switchTheme(themeName) {
        this.applyTheme(themeName);
    }

    /**
     * 获取当前主题
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * 获取所有可用主题
     */
    getAvailableThemes() {
        return Object.keys(this.themes).map(key => ({
            key,
            name: this.themes[key].name,
            description: this.themes[key].description
        }));
    }

    /**
     * 触发主题切换事件
     */
    dispatchThemeChangeEvent(themeName, theme) {
        const event = new CustomEvent('themeChanged', {
            detail: {
                themeName,
                theme,
                switcher: this
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * 添加新主题
     */
    addTheme(key, themeConfig) {
        this.themes[key] = themeConfig;
    }

    /**
     * 移除主题
     */
    removeTheme(key) {
        if (key === 'default') {
            console.warn('不能移除浅色主题');
            return false;
        }
        
        if (this.currentTheme === key) {
            this.switchTheme('default');
        }
        
        delete this.themes[key];
        return true;
    }

    /**
     * 检查是否在冷却期内（1分钟）
     */
    isInCooldown() {
        const lastRandomTime = localStorage.getItem('lastRandomThemeTime');
        if (!lastRandomTime) {
            return false;
        }
        
        const now = Date.now();
        const cooldownPeriod = 1 * 60 * 1000; // 1分钟
        return (now - parseInt(lastRandomTime)) < cooldownPeriod;
    }

    /**
     * 随机选择主题
     * 50% 基础主题（默认和深色平均概率）
     * 45% 特殊主题（春节、樱花、万圣节平均概率）
     * 5% 隐藏主题（卓别林主题）
     */
    selectRandomTheme() {
        // 检查冷却期
        if (this.isInCooldown()) {
            console.log('随机主题选择在冷却期内，跳过');
            return null;
        }

        const random = Math.random() * 100;
        let selectedTheme;

        if (random < 50) {
            // 50% 基础主题
            const basicThemes = ['default', 'dark'];
            selectedTheme = basicThemes[Math.floor(Math.random() * basicThemes.length)];
        } else if (random < 95) {
            // 45% 特殊主题
            const specialThemes = ['springFestival', 'sakura', 'halloween'];
            selectedTheme = specialThemes[Math.floor(Math.random() * specialThemes.length)];
        } else {
            // 5% 隐藏主题
            selectedTheme = 'chaplin';
        }

        // 记录随机选择时间
        localStorage.setItem('lastRandomThemeTime', Date.now().toString());
        
        return selectedTheme;
    }

    /**
     * 应用随机主题（如果不在冷却期）
     */
    applyRandomTheme() {
        const randomTheme = this.selectRandomTheme();
        if (randomTheme) {
            console.log(`随机选择主题: ${randomTheme}`);
            this.switchTheme(randomTheme);
            return randomTheme;
        }
        return null;
    }

    /**
     * 启动随机主题定时器
     */
    startRandomThemeTimer() {
        // 清除现有定时器
        this.stopRandomThemeTimer();
        
        // 设置1分钟定时器
        this.randomThemeTimer = setInterval(() => {
            if (localStorage.getItem('randomThemeMode') === 'true') {
                this.applyRandomTheme();
            } else {
                // 如果随机模式被关闭，停止定时器
                this.stopRandomThemeTimer();
            }
        }, 60000); // 60秒 = 1分钟
        
        console.log('随机主题定时器已启动');
    }

    /**
     * 停止随机主题定时器
     */
    stopRandomThemeTimer() {
        if (this.randomThemeTimer) {
            clearInterval(this.randomThemeTimer);
            this.randomThemeTimer = null;
            console.log('随机主题定时器已停止');
        }
    }
}

// 创建全局主题切换器实例
window.themeSwitcher = new ThemeSwitcher();

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSwitcher;
}