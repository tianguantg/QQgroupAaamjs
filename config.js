// 群聊配置文件 - 修改这里的内容来更新页面信息
const groupConfig = {
    // 基本信息
    basic_info: {
        name: "AAa美甲师后援会",
        description: "星引擎游戏组队聊天群！",
        member_count: "70+",
        established_date: "2025/4/29",
        qq_number: "1043179137",
        join_link: "https://qun.qq.com/universal-share/share?ac=1&authKey=bcCxh6328E47nbYw%2F8glttMKS%2FkUqBDRSEKGgKXjstleMw8IX%2BHeV%2FSuIILi5Xze&busi_data=eyJncm91cENvZGUiOiIxMDQzMTc5MTM3IiwidG9rZW4iOiI4VnMvTytpSHpFS04xY3Z4YVl5TVJ2ZEJ6cktiS2RSU2hSZ1FxSThlMWIxVzF2Y09TQlJEeU82bnZsTHh1UVN5IiwidWluIjoiMjUxOTUyMTk4NyJ9&data=m2j3Kg6mXhOVuSAyV4ztqH22609tszuvtzUl3slUdP7lCaU5QhlNiHU_h-R8oQVI3tvFW-DjyA7xrq6KFFqpVw&svctype=4&tempid=h5_group_info"
    },

    // 群特色
    features: {
        theme: "游戏",
        atmosphere: "轻松",
        main_activities: ["日常聊天", "游戏组队"]
    },

    // 联系信息
    contact: {
        contact_method: "上面有群号喵",
        join_requirements: "欢迎所有星趴爱好者！"
    },

    // 群公告
    announcements: [
        {
            title: "你复活辣!!!!! 2025/8/14 23:31",
            content: `首先各位小伙伴欢迎进群哇(≧▽≦)——
本群主要用于寻找趴友开趴聊天及闲聊（当然聊什么都可以只要不违规>M<)
进群后建议把名字改成趴名+ID（方便对应寻找哇)
最后希望大家在群里趴得开心聊得愉快哇（要是不愉快的话！瓦塔西！！！)
！检测到蒸蛋，开始传教：“搜查，分析，解明”
PS：本群严厉禁止聊及互联网恶俗话题（包括但不限于开盒、引战等），违者直接飞机票。
（该公告来自秋叶，解释权归管理层所有）`
        },
        {
            title: "笨蛋秋叶あき葉 2025/8/14 23:20",
            content: `吾日三省吾身：诱拐萌新而不带之，萌新发言而不理之，萌新欲趴而无人之，是铸也。`
        }
    ],

    // 资源文件
    assets: {
        avatar: "images/group-avatar.jpg", // 群头像文件路径
        qrcode: "images/qrcode.jpg"       // 二维码文件路径
    },

    // 功能开关
    features_enabled: {
        qrcode: true,     // 是否启用二维码功能
        join_button: true // 是否启用加群按钮功能
    }
};

// 检测是否为移动设备
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 检测是否为低性能设备
function isLowPerformanceDevice() {
    // 检测硬件并发数（CPU核心数的近似值）
    const cores = navigator.hardwareConcurrency || 1;
    
    // 检测内存（如果支持）
    const memory = navigator.deviceMemory || 1;
    
    // 检测连接速度
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    
    // 如果是移动设备、低核心数、低内存或慢连接，则认为是低性能设备
    return isMobileDevice() || cores <= 2 || memory <= 2 || isSlowConnection;
}

// 页面加载完成后更新内容
document.addEventListener('DOMContentLoaded', function() {
    updatePageContent();
    
    // 禁用config.js中的动态背景系统，使用dynamic-background.js统一管理
    // if (!isLowPerformanceDevice()) {
    //     initRandomGradients();
    //     console.log('🎨 启用完整动画效果（高性能设备）');
    // } else {
    if (true) { // 始终使用静态渐变，避免与dynamic-background.js冲突
        console.log('📱 移动端/低性能设备检测，已禁用复杂动画以提升性能');
        
        // 为移动端添加简化的静态渐变
        const root = document.documentElement;
        root.style.setProperty('--gradient1-x', '20%');
        root.style.setProperty('--gradient1-y', '20%');
        root.style.setProperty('--gradient2-x', '80%');
        root.style.setProperty('--gradient2-y', '80%');
        root.style.setProperty('--gradient3-x', '40%');
        root.style.setProperty('--gradient3-y', '60%');
        root.style.setProperty('--gradient4-x', '60%');
        root.style.setProperty('--gradient4-y', '40%');
        root.style.setProperty('--gradient5-x', '80%');
        root.style.setProperty('--gradient5-y', '20%');
        root.style.setProperty('--gradient6-x', '20%');
        root.style.setProperty('--gradient6-y', '80%');
    }
});

// 更新页面内容的函数
function updatePageContent() {
    // 更新基本信息
    const elGroupName = document.getElementById('groupName');
    if (elGroupName) elGroupName.textContent = groupConfig.basic_info.name;
    const elGroupDescription = document.getElementById('groupDescription');
    if (elGroupDescription) elGroupDescription.textContent = groupConfig.basic_info.description;
    const elMemberCount = document.getElementById('memberCount');
    if (elMemberCount) elMemberCount.textContent = groupConfig.basic_info.member_count;
    const elEstablishedDate = document.getElementById('establishedDate');
    if (elEstablishedDate) elEstablishedDate.textContent = groupConfig.basic_info.established_date;
    const elQqNumber = document.getElementById('qqNumber');
    if (elQqNumber) elQqNumber.textContent = `QQ群: ${groupConfig.basic_info.qq_number}`;

    // 更新群特色
    const elGroupTheme = document.getElementById('groupTheme');
    if (elGroupTheme) elGroupTheme.textContent = groupConfig.features.theme;
    const elGroupAtmosphere = document.getElementById('groupAtmosphere');
    if (elGroupAtmosphere) elGroupAtmosphere.textContent = groupConfig.features.atmosphere;

    // 更新活动标签
    const tagsContainer = document.getElementById('featureTags');
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        groupConfig.features.main_activities.forEach(activity => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = activity;
            tagsContainer.appendChild(tag);
        });
    }

    // 更新群公告（主页预览容器存在时才渲染）
    const announcementsContainer = document.getElementById('announcements');
    if (announcementsContainer) {
        announcementsContainer.innerHTML = '';
        // 基础版：置顶优先 + 仅展示前3条
        const anns = Array.isArray(groupConfig.announcements) ? groupConfig.announcements.slice() : [];
        anns.sort((a,b)=> (b.pinned?1:0) - (a.pinned?1:0));
        anns.slice(0,3).forEach(announcement => {
            const announcementDiv = document.createElement('div');
            announcementDiv.className = 'announcement';
            announcementDiv.innerHTML = `
                <div class="announcement-title">${announcement.pinned ? '【置顶】 ' : ''}${announcement.title}</div>
                <div class="announcement-content">${announcement.content}</div>
            `;
            announcementsContainer.appendChild(announcementDiv);
        });
    }

    // 更新联系信息
    const elJoinRequirements = document.getElementById('joinRequirements');
    if (elJoinRequirements) elJoinRequirements.textContent = groupConfig.contact.join_requirements;
    const elContactMethod = document.getElementById('contactMethod');
    if (elContactMethod) elContactMethod.textContent = groupConfig.contact.contact_method;

    // 更新头像
    const groupAvatar = document.getElementById('groupAvatar');
    if (groupAvatar) {
        if (groupConfig.assets.avatar && checkImageExists(groupConfig.assets.avatar)) {
            groupAvatar.innerHTML = `<img src="${groupConfig.assets.avatar}?v=202508111730" alt="群头像">`;
        } else {
            groupAvatar.innerHTML = groupConfig.basic_info.name.charAt(0);
        }
    }

    // 更新二维码 - 根据配置项控制启用/禁用
    const qrCode = document.getElementById('qrCode');
    if (qrCode) {
        if (groupConfig.features_enabled.qrcode && groupConfig.assets.qrcode && checkImageExists(groupConfig.assets.qrcode)) {
            // 启用二维码功能
            qrCode.classList.remove('disabled');
            qrCode.title = '点击放大二维码';
            qrCode.innerHTML = `<img src="${groupConfig.assets.qrcode}" alt="加群二维码">`;
            qrCode.style.pointerEvents = 'auto';
            
            // 添加点击事件，打开二维码图片
            qrCode.onclick = function() {
                window.open(groupConfig.assets.qrcode, '_blank');
            };
        } else {
            // 禁用二维码功能
            qrCode.classList.add('disabled');
            qrCode.title = '二维码功能已禁用';
            qrCode.innerHTML = '二维码已禁用';
            qrCode.style.pointerEvents = 'none';
        }
    }

    // 更新加群按钮 - 根据配置项控制启用/禁用
    const joinButton = document.getElementById('joinButton');
    if (joinButton) {
        if (groupConfig.features_enabled.join_button && groupConfig.basic_info.join_link) {
            // 启用加群按钮功能
            joinButton.classList.remove('disabled');
            joinButton.textContent = '点击直接加群';
            joinButton.title = '点击加入QQ群';
            joinButton.setAttribute('aria-disabled', 'false');
            joinButton.style.pointerEvents = 'auto';
            
            // 添加点击事件，跳转到加群链接
            joinButton.onclick = function() {
                window.open(groupConfig.basic_info.join_link, '_blank');
            };
        } else {
            // 禁用加群按钮功能
            joinButton.classList.add('disabled');
            joinButton.textContent = '加群功能已禁用';
            joinButton.title = '功能已禁用';
            joinButton.setAttribute('aria-disabled', 'true');
            joinButton.style.pointerEvents = 'none';
        }
    }

    // 添加复制群号功能
    if (elQqNumber) {
        elQqNumber.style.cursor = 'pointer';
        elQqNumber.title = '点击复制群号';
        elQqNumber.addEventListener('click', function() {
            copyToClipboard(groupConfig.basic_info.qq_number);
        });
    }
}

// 检查图片是否存在的函数
function checkImageExists(imagePath) {
    // 这里可以添加检查图片是否存在的逻辑
    // 简单起见，我们假设如果路径不为空就存在
    return imagePath && imagePath.trim() !== '';
}

// 复制到剪贴板的函数
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showMessage('群号已复制到剪贴板！');
        }).catch(function() {
            showMessage('复制失败，群号：' + text);
        });
    } else {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showMessage('群号已复制到剪贴板！');
        } catch (err) {
            showMessage('复制失败，群号：' + text);
        }
        document.body.removeChild(textArea);
    }
}

// 显示消息的函数
function showMessage(message) {
    // 创建消息提示
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(90, 103, 216, 0.9);
        color: white;
        padding: var(--spacing-md) var(--spacing-xl);
        border-radius: var(--radius-sm);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-size: var(--font-size-sm);
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease-out;
    `;

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(messageDiv);

    // 3秒后自动移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// 随机渐变位置功能
function initRandomGradients() {
    // 颜色配置：每种颜色的名称和对应的CSS变量
    const gradientColors = [
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
            name: '亮紫色', 
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
            name: '珊瑚红', 
            xVar: '--gradient4-x', 
            yVar: '--gradient4-y', 
            color: '#f5576c',
            currentX: 60,
            currentY: 40,
            targetX: 60,
            targetY: 40,
            speedX: 0,
            speedY: 0
        },
        { 
            name: '天蓝色', 
            xVar: '--gradient5-x', 
            yVar: '--gradient5-y', 
            color: '#4facfe',
            currentX: 80,
            currentY: 20,
            targetX: 80,
            targetY: 20,
            speedX: 0,
            speedY: 0
        },
        { 
            name: '青色', 
            xVar: '--gradient6-x', 
            yVar: '--gradient6-y', 
            color: '#00f2fe',
            currentX: 20,
            currentY: 80,
            targetX: 20,
            targetY: 80,
            speedX: 0,
            speedY: 0
        }
    ];

    // 生成随机位置的函数
    function getRandomPosition() {
        return Math.random() * 70 + 15; // 15% 到 85% 之间
    }

    // 生成新的目标位置
    function generateNewTargets() {
        gradientColors.forEach(gradient => {
            gradient.targetX = getRandomPosition();
            gradient.targetY = getRandomPosition();
            
            // 计算移动速度（让移动更平滑）
            const deltaX = gradient.targetX - gradient.currentX;
            const deltaY = gradient.targetY - gradient.currentY;
            
            // 随机移动时间 3-6 秒，增加移动时间以减少频繁更新
            const moveTime = Math.random() * 3 + 3;
            const framesPerSecond = 30; // 匹配动画帧率
            const totalFrames = moveTime * framesPerSecond;
            
            gradient.speedX = deltaX / totalFrames;
            gradient.speedY = deltaY / totalFrames;
        });
        
        // console.log('🎯 生成新的目标位置'); // 注释掉频繁的日志输出
    }

    // 动画更新函数 - 优化性能版本
    let animationId;
    let lastUpdateTime = 0;
    const targetFPS = 30; // 降低到30FPS以提升性能
    const frameInterval = 1000 / targetFPS;
    
    function animateGradients(currentTime) {
        // 限制帧率以提升性能
        if (currentTime - lastUpdateTime < frameInterval) {
            animationId = requestAnimationFrame(animateGradients);
            return;
        }
        lastUpdateTime = currentTime;
        
        const root = document.documentElement;
        let allReachedTarget = true;
        
        gradientColors.forEach(gradient => {
            // 检查是否接近目标位置
            const distanceX = Math.abs(gradient.targetX - gradient.currentX);
            const distanceY = Math.abs(gradient.targetY - gradient.currentY);
            
            if (distanceX > 0.5 || distanceY > 0.5) {
                allReachedTarget = false;
                
                // 平滑移动到目标位置
                gradient.currentX += gradient.speedX;
                gradient.currentY += gradient.speedY;
                
                // 防止超过目标位置
                if (Math.abs(gradient.speedX) > 0 && 
                    ((gradient.speedX > 0 && gradient.currentX >= gradient.targetX) ||
                     (gradient.speedX < 0 && gradient.currentX <= gradient.targetX))) {
                    gradient.currentX = gradient.targetX;
                }
                
                if (Math.abs(gradient.speedY) > 0 && 
                    ((gradient.speedY > 0 && gradient.currentY >= gradient.targetY) ||
                     (gradient.speedY < 0 && gradient.currentY <= gradient.targetY))) {
                    gradient.currentY = gradient.targetY;
                }
            }
            
            // 更新CSS变量
            root.style.setProperty(gradient.xVar, gradient.currentX + '%');
            root.style.setProperty(gradient.yVar, gradient.currentY + '%');
        });
        
        // 如果所有渐变都到达目标位置，生成新的目标
        if (allReachedTarget) {
            // 等待1-3秒后生成新目标，增加间隔以减少计算频率
            setTimeout(() => {
                generateNewTargets();
            }, Math.random() * 2000 + 1000);
        }
        
        // 继续动画
        animationId = requestAnimationFrame(animateGradients);
    }

    // 初始化
    generateNewTargets();
    animateGradients();
    
    // 添加手动触发按钮（可选，用于测试）
    if (window.location.search.includes('debug=true')) {
        const debugButton = document.createElement('button');
        debugButton.textContent = '🎨 新目标位置';
        debugButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(90, 103, 216, 0.9);
            color: white;
            border: none;
            padding: var(--spacing-sm) var(--spacing-lg);
            border-radius: var(--radius-sm);
            cursor: pointer;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;
        debugButton.onclick = generateNewTargets;
        document.body.appendChild(debugButton);
    }
}