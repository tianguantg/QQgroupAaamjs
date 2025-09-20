// 动态背景控制模块
class DynamicBackground {
    constructor() {
        this.gradientColors = [
            {
                name: '蓝紫色',
                xVar: '--gradient1-x',
                yVar: '--gradient1-y',
                color: '#667eea',
                currentX: 20,
                currentY: 20,
                targetX: 20,
                targetY: 20,
                speedX: 0,
                speedY: 0
            },
            {
                name: '粉紫色',
                xVar: '--gradient2-x',
                yVar: '--gradient2-y',
                color: '#f093fb',
                currentX: 80,
                currentY: 80,
                targetX: 80,
                targetY: 80,
                speedX: 0,
                speedY: 0
            },
            {
                name: '深紫色',
                xVar: '--gradient3-x',
                yVar: '--gradient3-y',
                color: '#764ba2',
                currentX: 40,
                currentY: 60,
                targetX: 40,
                targetY: 60,
                speedX: 0,
                speedY: 0
            },
            {
                name: '红粉色',
                xVar: '--gradient4-x',
                yVar: '--gradient4-y',
                color: '#f5576c',
                currentX: 70,
                currentY: 30,
                targetX: 70,
                targetY: 30,
                speedX: 0,
                speedY: 0
            },
            {
                name: '蓝色',
                xVar: '--gradient5-x',
                yVar: '--gradient5-y',
                color: '#4facfe',
                currentX: 30,
                currentY: 70,
                targetX: 30,
                targetY: 70,
                speedX: 0,
                speedY: 0
            },
            {
                name: '青色',
                xVar: '--gradient6-x',
                yVar: '--gradient6-y',
                color: '#00f2fe',
                currentX: 60,
                currentY: 40,
                targetX: 60,
                targetY: 40,
                speedX: 0,
                speedY: 0
            }
        ];

        this.glowEffects = [
            {
                xVar: '--glow1-x',
                yVar: '--glow1-y',
                currentX: 25,
                currentY: 75,
                targetX: 25,
                targetY: 75,
                speedX: 0,
                speedY: 0
            },
            {
                xVar: '--glow2-x',
                yVar: '--glow2-y',
                currentX: 75,
                currentY: 25,
                targetX: 75,
                targetY: 25,
                speedX: 0,
                speedY: 0
            }
        ];

        this.isAnimating = false;
        this.root = document.documentElement;
    }

    // 性能检测
    isLowPerformanceDevice() {
        // 检测移动设备
        if (window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        
        // 检测设备性能
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return true;
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            // 检测低端GPU
            if (renderer.includes('Intel') && !renderer.includes('Iris')) {
                return true;
            }
        }
        
        // 检测内存
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            return true;
        }
        
        // 检测CPU核心数
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            return true;
        }
        
        return false;
    }

    // 生成新的目标位置
    generateNewTargets() {
        this.gradientColors.forEach(gradient => {
            // 生成15%-85%范围内的随机位置
            gradient.targetX = Math.random() * 70 + 15;
            gradient.targetY = Math.random() * 70 + 15;
            
            // 计算移动速度（增加到5-10秒内到达目标，使动画更平滑）
            const moveTime = Math.random() * 5 + 5; // 5-10秒
            const totalFrames = moveTime * 60; // 60FPS
            
            gradient.speedX = (gradient.targetX - gradient.currentX) / totalFrames;
            gradient.speedY = (gradient.targetY - gradient.currentY) / totalFrames;
        });
        
        this.glowEffects.forEach(glow => {
            glow.targetX = Math.random() * 60 + 20;
            glow.targetY = Math.random() * 60 + 20;
            
            const moveTime = Math.random() * 6 + 6; // 6-12秒
            const totalFrames = moveTime * 60;
            
            glow.speedX = (glow.targetX - glow.currentX) / totalFrames;
            glow.speedY = (glow.targetY - glow.currentY) / totalFrames;
        });
    }

    // 动画循环
    animateGradients() {
        if (!this.isAnimating) return;

        let allReachedTarget = true;
        
        this.gradientColors.forEach(gradient => {
            const distanceX = Math.abs(gradient.targetX - gradient.currentX);
            const distanceY = Math.abs(gradient.targetY - gradient.currentY);
            
            if (distanceX > 0.5 || distanceY > 0.5) {
                gradient.currentX += gradient.speedX;
                gradient.currentY += gradient.speedY;
                allReachedTarget = false;
            } else {
                gradient.currentX = gradient.targetX;
                gradient.currentY = gradient.targetY;
            }
            
            this.root.style.setProperty(gradient.xVar, gradient.currentX + '%');
            this.root.style.setProperty(gradient.yVar, gradient.currentY + '%');
        });
        
        this.glowEffects.forEach(glow => {
            const distanceX = Math.abs(glow.targetX - glow.currentX);
            const distanceY = Math.abs(glow.targetY - glow.currentY);
            
            if (distanceX > 0.5 || distanceY > 0.5) {
                glow.currentX += glow.speedX;
                glow.currentY += glow.speedY;
                allReachedTarget = false;
            } else {
                glow.currentX = glow.targetX;
                glow.currentY = glow.targetY;
            }
            
            this.root.style.setProperty(glow.xVar, glow.currentX + '%');
            this.root.style.setProperty(glow.yVar, glow.currentY + '%');
        });
        
        // 如果所有渐变都到达目标，生成新目标
        if (allReachedTarget) {
            setTimeout(() => this.generateNewTargets(), Math.random() * 3000 + 2000); // 2-5秒后生成新目标，增加间隔时间
        }
        
        requestAnimationFrame(() => this.animateGradients());
    }

    // 初始化动态背景
    init() {
        if (this.isLowPerformanceDevice()) {
            console.log('检测到低性能设备，禁用复杂动画');
            return;
        }

        // 确保CSS变量已定义
        this.ensureCSSVariables();
        
        this.isAnimating = true;
        this.generateNewTargets();
        this.animateGradients();
    }

    // 确保CSS变量已定义
    ensureCSSVariables() {
        // 设置渐变位置变量
        this.gradientColors.forEach(gradient => {
            this.root.style.setProperty(gradient.xVar, gradient.currentX + '%');
            this.root.style.setProperty(gradient.yVar, gradient.currentY + '%');
        });

        // 设置光晕位置变量
        this.glowEffects.forEach(glow => {
            this.root.style.setProperty(glow.xVar, glow.currentX + '%');
            this.root.style.setProperty(glow.yVar, glow.currentY + '%');
        });
    }

    // 停止动画
    stop() {
        this.isAnimating = false;
    }

    // 重启动画
    restart() {
        this.stop();
        setTimeout(() => this.init(), 100);
    }
}

// 全局实例
window.dynamicBackground = new DynamicBackground();

// 页面加载完成后自动初始化
document.addEventListener('DOMContentLoaded', () => {
    window.dynamicBackground.init();
});