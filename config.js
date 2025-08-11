// 群聊配置文件 - 修改这里的内容来更新页面信息
const groupConfig = {
    // 基本信息
    basic_info: {
        name: "AAa美甲师后援会",
        description: "星引擎游戏组队聊天群！",
        member_count: "60+",
        established_date: "2025/4/29",
        qq_number: "1043179137"
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
            title: "笨蛋秋叶あき葉 2025/05/08 12:11",
            content: `首先各位小伙伴欢迎进群哇(✧∇✧)——
本群主要用于寻找趴友开趴聊天及闲聊（当然聊什么都可以只要不违规˃ʍ˂）
进群后可以建议把名字改成趴名+ID（方便对应寻找哇）
最后希望大家在群里趴得开心聊得愉快哇（要是不愉快的话！瓦塔西！！！）
！检测到蒸蛋，开始传教："搜查，分析，解明"
PS：本群严厉禁止聊及互联网恶俗话题（包括但不限于开盒、引战等），违者直接飞机票。`
        }
    ],

    // 资源文件
    assets: {
        avatar: "images/group-avatar.jpg", // 群头像文件路径
        qrcode: "images/qrcode.jpg"       // 二维码文件路径
    }
};

// 页面加载完成后更新内容
document.addEventListener('DOMContentLoaded', function() {
    updatePageContent();
    initRandomGradients();
});

// 更新页面内容的函数
function updatePageContent() {
    // 更新基本信息
    document.getElementById('groupName').textContent = groupConfig.basic_info.name;
    document.getElementById('groupDescription').textContent = groupConfig.basic_info.description;
    document.getElementById('memberCount').textContent = groupConfig.basic_info.member_count;
    document.getElementById('establishedDate').textContent = groupConfig.basic_info.established_date;
    document.getElementById('qqNumber').textContent = `QQ群: ${groupConfig.basic_info.qq_number}`;

    // 更新群特色
    document.getElementById('groupTheme').textContent = groupConfig.features.theme;
    document.getElementById('groupAtmosphere').textContent = groupConfig.features.atmosphere;

    // 更新活动标签
    const tagsContainer = document.getElementById('featureTags');
    tagsContainer.innerHTML = '';
    groupConfig.features.main_activities.forEach(activity => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = activity;
        tagsContainer.appendChild(tag);
    });

    // 更新群公告
    const announcementsContainer = document.getElementById('announcements');
    announcementsContainer.innerHTML = '';
    groupConfig.announcements.forEach(announcement => {
        const announcementDiv = document.createElement('div');
        announcementDiv.className = 'announcement';
        announcementDiv.innerHTML = `
            <div class="announcement-title">${announcement.title}</div>
            <div class="announcement-content">${announcement.content}</div>
        `;
        announcementsContainer.appendChild(announcementDiv);
    });

    // 更新联系信息
    document.getElementById('joinRequirements').textContent = groupConfig.contact.join_requirements;
    document.getElementById('contactMethod').textContent = groupConfig.contact.contact_method;

    // 更新头像
    const groupAvatar = document.getElementById('groupAvatar');
    if (groupConfig.assets.avatar && checkImageExists(groupConfig.assets.avatar)) {
        groupAvatar.innerHTML = `<img src="${groupConfig.assets.avatar}?v=202508111730" alt="群头像">`;
    } else {
        // 使用默认头像（群名首字母）
        groupAvatar.innerHTML = groupConfig.basic_info.name.charAt(0);
    }

    // 更新二维码
    const qrCode = document.getElementById('qrCode');
    if (groupConfig.assets.qrcode && checkImageExists(groupConfig.assets.qrcode)) {
        qrCode.innerHTML = `<img src="${groupConfig.assets.qrcode}?v=202508111730" alt="群二维码">`;
    } else {
        qrCode.innerHTML = '二维码<br>暂未上传';
    }

    // 添加复制群号功能
    const qqNumberElement = document.getElementById('qqNumber');
    qqNumberElement.style.cursor = 'pointer';
    qqNumberElement.title = '点击复制群号';
    qqNumberElement.addEventListener('click', function() {
        copyToClipboard(groupConfig.basic_info.qq_number);
    });
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
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-size: 14px;
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
            
            // 随机移动时间 2-5 秒
            const moveTime = Math.random() * 3 + 2;
            const framesPerSecond = 60;
            const totalFrames = moveTime * framesPerSecond;
            
            gradient.speedX = deltaX / totalFrames;
            gradient.speedY = deltaY / totalFrames;
        });
        
        console.log('🎯 生成新的目标位置');
    }

    // 动画更新函数
    function animateGradients() {
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
            // 等待0.5-2秒后生成新目标
            setTimeout(() => {
                generateNewTargets();
            }, Math.random() * 1500 + 500);
        }
        
        // 继续动画
        requestAnimationFrame(animateGradients);
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
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;
        debugButton.onclick = generateNewTargets;
        document.body.appendChild(debugButton);
    }
}