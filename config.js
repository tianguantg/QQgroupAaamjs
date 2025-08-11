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
        groupAvatar.innerHTML = `<img src="${groupConfig.assets.avatar}" alt="群头像">`;
    } else {
        // 使用默认头像（群名首字母）
        groupAvatar.innerHTML = groupConfig.basic_info.name.charAt(0);
    }

    // 更新二维码
    const qrCode = document.getElementById('qrCode');
    if (groupConfig.assets.qrcode && checkImageExists(groupConfig.assets.qrcode)) {
        qrCode.innerHTML = `<img src="${groupConfig.assets.qrcode}" alt="群二维码">`;
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
