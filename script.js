// 后端 API 地址 - 自动适配部署环境
const API_BASE = window.location.origin;

// 自定义鼠标效果
const customCursor = document.getElementById('custom-cursor');
const hoverElements = document.querySelectorAll('.hover-effect');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mousedown', () => {
    customCursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        customCursor.style.borderColor = '#000';
    });

    element.addEventListener('mouseleave', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
        customCursor.style.borderColor = '#000';
    });
});

// 显示自定义鼠标
setTimeout(() => {
    customCursor.style.opacity = '1';
}, 500);

// 页面切换效果
const screens = document.querySelectorAll('.screen');

function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// 测试题目数据 - 扩充情境
const questions = [
    // 外向性 (E) - 8题
    { id: 1, dimension: 'E', text: '期末考试结束后，你更倾向于立刻约朋友出去聚餐唱歌庆祝', type: 'rating', reverse: false },
    { id: 2, dimension: 'E', text: '在选修课的大教室里，你愿意主动举手回答老师的问题', type: 'rating', reverse: false },
    { id: 3, dimension: 'E', text: '周末你宁可一个人在宿舍刷剧、打游戏，也不想出门社交', type: 'rating', reverse: true },
    { id: 4, dimension: 'E', text: '班级群里组织团建活动，你总是最先响应的那个', type: 'rating', reverse: false },
    { id: 5, dimension: 'E', text: '社团招新时，比起主动搭讪陌生人，你更愿意站在一旁观察', type: 'rating', reverse: true },
    { id: 6, dimension: 'E', text: '在宿舍夜谈时，你总是话最多的那个，话题一个接一个', type: 'rating', reverse: false },
    { id: 7, dimension: 'E', text: '食堂排队时，你会主动和前面/后面的人搭话聊天', type: 'rating', reverse: false },
    { id: 8, dimension: 'E', text: '做课程汇报时，你更希望队友上台展示，自己在台下准备', type: 'rating', reverse: true },
    
    // 开放性 (O) - 8题
    { id: 9, dimension: 'O', text: '看到学校公众号推送的跨学科讲座（AI+哲学/艺术+编程），你会感兴趣想去听听', type: 'rating', reverse: false },
    { id: 10, dimension: 'O', text: '选课的时候，比起熟悉的常规课程，你更想尝试从没上过的新奇课程', type: 'rating', reverse: false },
    { id: 11, dimension: 'O', text: '比起实验报告的标准格式，你更想用创意视频或播客来展示成果', type: 'rating', reverse: false },
    { id: 12, dimension: 'O', text: '你对中国传统文化（如诗词、茶道、书法）比对现代流行文化更感兴趣', type: 'rating', reverse: true },
    { id: 13, dimension: 'O', text: '听说有同学休学去gap year创业，你完全不理解这种选择', type: 'rating', reverse: true },
    { id: 14, dimension: 'O', text: '你经常思考"人生的意义是什么"、"宇宙的尽头在哪里"这类问题', type: 'rating', reverse: false },
    { id: 15, dimension: 'O', text: '比起追热播剧，你更愿意看一些冷门小众但评分很高的作品', type: 'rating', reverse: false },
    { id: 16, dimension: 'O', text: '学校突然宣布要换一种新的教学方式，你的第一反应是"又搞这些花里胡哨的"', type: 'rating', reverse: true },
    
    // 宜人性 (A) - 8题
    { id: 17, dimension: 'A', text: '室友半夜打游戏影响你休息，你会默默戴耳机忍耐而不是说出来', type: 'rating', reverse: true },
    { id: 18, dimension: 'A', text: '看到朋友圈同学晒出的offer或成绩，你会真诚地点赞并送上祝福', type: 'rating', reverse: false },
    { id: 19, dimension: 'A', text: '小组作业时，队友划水摸鱼拖了后腿，你会私下委婉提醒而不是当众批评', type: 'rating', reverse: false },
    { id: 20, dimension: 'A', text: '同学找你借作业抄，你虽然不情愿但还是会借给他/她', type: 'rating', reverse: true },
    { id: 21, dimension: 'A', text: '快递小哥把你的快递弄丢了，你很难压住火气会当场发火', type: 'rating', reverse: true },
    { id: 22, dimension: 'A', text: '社团活动中有人需要帮忙搬东西，即使不是你的任务你也会主动上前', type: 'rating', reverse: false },
    { id: 23, dimension: 'A', text: '朋友向你倾诉烦恼，你总是能耐心倾听并给予安慰和建议', type: 'rating', reverse: false },
    { id: 24, dimension: 'A', text: '和室友产生矛盾时，你更倾向于各退一步达成和解', type: 'rating', reverse: false },
    
    // 尽责性 (C) - 8题
    { id: 25, dimension: 'C', text: '论文作业你总是提前一周就开始准备，而不是等到最后两天赶工', type: 'rating', reverse: false },
    { id: 26, dimension: 'C', text: '设定了每天背单词学英语的计划，虽然偶尔懈怠但大部分时间都在坚持', type: 'rating', reverse: false },
    { id: 27, dimension: 'C', text: 'DDL是第一生产力，在截止日期前你效率最高，之后反而提不起劲', type: 'rating', reverse: true },
    { id: 28, dimension: 'C', text: '和老师、同学约好了时间，你一定会准时到达，很少迟到', type: 'rating', reverse: false },
    { id: 29, dimension: 'C', text: '考试前你会制定详细的复习计划表，并严格执行', type: 'rating', reverse: false },
    { id: 30, dimension: 'C', text: '做实验或写代码时，你会反复检查确保没有低级错误才提交', type: 'rating', reverse: false },
    { id: 31, dimension: 'C', text: '上网课时，你经常开着页面去做别的事情', type: 'rating', reverse: true },
    { id: 32, dimension: 'C', text: '你知道自己的拖延症晚期，改掉它是你最想实现的目标之一', type: 'rating', reverse: true },
    
    // 神经质 (N) - 8题
    { id: 33, dimension: 'N', text: '期末出成绩前的那个晚上，你翻来覆去睡不着，各种担心', type: 'rating', reverse: false },
    { id: 34, dimension: 'N', text: '发了条朋友圈后，你会反复刷新看有没有人点赞评论', type: 'rating', reverse: false },
    { id: 35, dimension: 'N', text: '考试时遇到不会的题，你深呼吸后能冷静下来先做后面的', type: 'rating', reverse: true },
    { id: 36, dimension: 'N', text: '导师/老师批评了你几句，你会好几天都在回想这件事', type: 'rating', reverse: false },
    { id: 37, dimension: 'N', text: '看到朋友圈大家都在精彩地生活，你会忍不住怀疑自己是不是太差了', type: 'rating', reverse: false },
    { id: 38, dimension: 'N', text: '遇到重要的事情前（如面试、答辩），你手心会不自觉地出汗', type: 'rating', reverse: false },
    { id: 39, dimension: 'N', text: '情绪低落时，你能很快自我调节过来，不会陷在里面太久', type: 'rating', reverse: true },
    { id: 40, dimension: 'N', text: '即使事情进展顺利，你也总觉得"不会有什么意外吧"', type: 'rating', reverse: false },
    
    // 额外信息收集 - 10题
    { id: 41, dimension: 'info', text: '您所处的学业阶段是？', type: 'choice', options: ['初中', '高中', '大一', '大二', '大三', '大四', '研究生', '已就业'] },
    { id: 42, dimension: 'info', text: '您之前做过人格测试吗？', type: 'yesno' },
    { id: 43, dimension: 'info', text: '您做人格测试的频率是？', type: 'choice', options: ['从未做过', '偶尔（每年1-2次）', '有时（每季度1次）', '经常（每月1次或更多）'] },
    { id: 44, dimension: 'info', text: '您进行人格测试的主要目的是什么？', type: 'choice', options: ['自我了解', '职业规划', '人际关系', '娱乐消遣', '学习研究', '其他'] },
    { id: 45, dimension: 'info', text: '您认为人格测试对您的自我认知有帮助吗？', type: 'choice', options: ['完全没有帮助', '帮助很小', '一般', '有一定帮助', '非常有帮助'] },
    { id: 46, dimension: 'info', text: '您是否会在日常交流中主动提及或使用自己的人格标签？', type: 'choice', options: ['从不', '很少', '有时', '经常', '总是'] },
    { id: 47, dimension: 'info', text: '您觉得人格测试结果多大程度上准确描述您的性格？', type: 'choice', options: ['完全不准确', '不太准确', '一般', '比较准确', '完全准确'] },
    { id: 48, dimension: 'info', text: '您是否曾因测试结果而产生心理暗示或行为改变？', type: 'choice', options: ['完全没有', '很少', '有时', '经常', '总是'] },
    { id: 49, dimension: 'info', text: '您如何看待网络上各种人格测试传播的现象？', type: 'choice', options: ['完全无用，是伪科学', '娱乐性质，不可当真', '有一定参考价值', '很有意义，值得推广', '非常科学，应该普及'] },
    { id: 50, dimension: 'info', text: '您的MBTI类型是？', type: 'choice', options: ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ', '不知道/不确定'] }
];

// 人格类型数据 - 10种新类型
const personalityTypes = [
    {
        id: 'campus_apollo',
        name: '校园阿波罗',
        dimensions: { E: '高', N: '低', A: '高', C: '中', O: '中' },
        emoji: '☀️',
        description: '你是校园里的"小太阳"！热情开朗自带光芒，走到哪都是人群中的焦点。社交对你来说是充电方式而非消耗。你情绪稳定、待人真诚，是朋友遇到困难时第一个想到倾诉的对象。',
        strengths: [
            '社交天花板，人缘好到让人羡慕',
            '自带正能量，能感染身边的人',
            '情绪管理能力强，抗压能力满分',
            '善于团队协作，是组队的热门人选',
            '乐观积极，面对挫折也能快速调整'
        ],
        challenges: [
            '有时过于在意他人看法',
            '可能因为太受欢迎而难以拒绝别人',
            '在需要独立完成的任务上可能不够专注',
            '深度独处对你来说可能有点困难'
        ],
        career: [
            '市场营销/品牌运营',
            '人力资源/猎头',
            '教育培训/咨询',
            '活动策划/公关',
            '销售/商务拓展'
        ],
        relationship: [
            '朋友圈广且维护得很好',
            '是聚会/旅行的组织者',
            '善于调节气氛，化解尴尬',
            '在亲密关系中热情主动',
            '偶尔会被吐槽"太社牛"'
        ],
        image: '☀️'
    },
    {
        id: 'avoidant_frail_eggroll',
        name: '回避型脆皮蛋卷',
        dimensions: { E: '低', N: '高', A: '中', C: '中', O: '低' },
        emoji: '🥚',
        description: '你是那个嘴上说着"我没事"心里却已经演完一部连续剧的人。敏感细腻是你的特质，但也让你容易陷入内耗。比起热闹的场合，你更享受独处时的安全感。',
        strengths: [
            '洞察力强，能察觉他人细微的情绪变化',
            '内心世界丰富，有独特的思考深度',
            '做事谨慎，很少冲动犯错',
            '共情能力强，能理解他人的不易',
            '在熟悉的环境里其实很可靠'
        ],
        challenges: [
            '容易自我怀疑，内耗严重',
            '面对冲突本能想逃避',
            '社交场合会感到不自在和紧张',
            '可能因为想太多而错过机会',
            '难以表达自己的真实需求'
        ],
        career: [
            '技术开发/编程',
            '数据分析/研究',
            '图书编辑/文案',
            '财务/审计',
            '心理咨询（理解他人痛苦）'
        ],
        relationship: [
            '朋友不多但都是知心好友',
            '在亲密关系中容易患得患失',
            '需要大量独处时间来恢复能量',
            '不太擅长主动拓展社交圈',
            '内心渴望被理解但表面装作无所谓'
        ],
        image: '🥚'
    },
    {
        id: 'campus_columbus',
        name: '校园哥伦布',
        dimensions: { E: '中', N: '中', A: '中', C: '中', O: '高' },
        emoji: '🧭',
        description: '你是那个永远在探索未知的冒险家！对世界充满好奇，脑子里装满了奇思妙想。你不满足于按部就班的生活，总想发现点什么不一样的东西。',
        strengths: [
            '思维跳脱，经常有出人意料的想法',
            '学习能力强，对新领域充满热情',
            '不拘泥于传统，敢于挑战权威',
            '创造力和想象力丰富',
            '见多识广，聊天不会冷场'
        ],
        challenges: [
            '想法太多太杂，可能难以专注',
            '有时显得不够脚踏实地',
            '计划性不强，容易虎头蛇尾',
            '可能不太适应重复性的工作',
            '有时难以和保守的人相处'
        ],
        career: [
            '创意设计/艺术创作',
            '科研/学术研究',
            '媒体/内容创作',
            '创业/产品经理',
            '旅游/探险相关行业'
        ],
        relationship: [
            '交友广泛，什么类型的人都能聊',
            '喜欢和有趣的人打交道',
            '在关系中也需要保持新鲜感',
            '可能因为太忙而忽略朋友',
            '经常能带来意想不到的惊喜'
        ],
        image: '🧭'
    },
    {
        id: 'veteran_roll_king',
        name: '老资历卷王',
        dimensions: { E: '中', N: '低', A: '中', C: '高', O: '低' },
        emoji: '📚',
        description: '你是图书馆的常驻VIP，绩点排行榜上的钉子户。对你来说，学习不仅是一种责任，更是一种习惯和生活方式。踏实可靠是你最显著的标签。',
        strengths: [
            '自律性强，能抵制各种诱惑',
            '目标明确，执行力满分',
            '学习能力扎实，成绩稳定',
            '做事有规划，很少手忙脚乱',
            '靠谱程度让人放心托付'
        ],
        challenges: [
            '可能被认为是"卷王"而遭到孤立',
            '对自己和他人要求都比较高',
            '难以理解别人的"摆烂"行为',
            '生活可能过于单调枯燥',
            '不太擅长享受当下'
        ],
        career: [
            '金融/投行/咨询',
            '法律/合规',
            '医生/医药研发',
            '会计/财务管理',
            '公务员/事业单位'
        ],
        relationship: [
            '朋友数量可能不多但质量很高',
            '在团队中是默默承担任务的角色',
            '恋爱中可能显得不够浪漫',
            '经常被朋友拉去当学习搭子',
            '朋友圈里公认的"学霸"'
        ],
        image: '📚'
    },
    {
        id: 'good_person',
        name: '好人',
        dimensions: { E: '高', N: '低', A: '高', C: '中', O: '中' },
        emoji: '🤝',
        description: '你是那个有求必应、雪中送炭的好人。善良热心是你的底色，走到哪里都散发着温暖的光芒。人缘好到让人嫉妒，但有时也会因为太不会拒绝而委屈自己。',
        strengths: [
            '极度善良，乐于助人不求回报',
            '情绪稳定，是朋友的情绪垃圾桶',
            '善于倾听，给人满满的安全感',
            '人缘极好，社交圈和谐稳定',
            '懂得感恩，珍惜每一段关系'
        ],
        challenges: [
            '过度迎合他人，丢失自我',
            '不善于表达自己的不满',
            '可能被不太珍惜你的人利用',
            '在需要做决定时容易犹豫',
            '边界感较弱，难以说"不"'
        ],
        career: [
            '社会工作/公益',
            '护理/医疗服务',
            '教育/幼儿教师',
            '人力资源/员工关系',
            '客服/客户运营'
        ],
        relationship: [
            '是朋友圈里的"和事佬"',
            '经常被发好人卡',
            '在感情中付出型人格',
            '朋友遇到困难第一个找你',
            '但很少主动开口求助别人'
        ],
        image: '🤝'
    },
    {
        id: 'campus_sekiros',
        name: '校园只狼',
        dimensions: { E: '低', N: '中', A: '低', C: '高', O: '低' },
        emoji: '🐺',
        description: '你是那个独来独往、目标明确的狠人。对你来说，合群不是必需品，变强才是。社交圈子精简但高效，时间都花在刀刃上。表面上可能有点冷，但内心有着自己的坚持。',
        strengths: [
            '极度专注，屏蔽干扰的能力超强',
            '目标导向，为了目标可以极度自律',
            '独立性强，不依附任何人',
            '理性冷静，很少被情绪左右',
            '有原则有底线，不随波逐流'
        ],
        challenges: [
            '可能显得不合群、有距离感',
            '不太擅长团队合作',
            '对他人的情绪需求不够敏感',
            '过于追求效率可能忽略人情',
            '不太会表达情感和关心'
        ],
        career: [
            '技术专家/架构师',
            '金融交易/量化分析',
            '法律/律师',
            '独立创业者',
            '科研/学术'
        ],
        relationship: [
            '朋友少但都是过命的交情',
            '不擅长闲聊，社交简洁直接',
            '在关系中比较被动',
            '独处时反而最自在',
            '偶尔也会羡慕别人的热闹'
        ],
        image: '🐺'
    },
    {
        id: 'chill_person',
        name: '没招了淡人',
        dimensions: { E: '中', N: '低', A: '中', C: '中', O: '中' },
        emoji: '🫠',
        description: '你是那个看淡一切、佛系到骨子里的人。什么内卷焦虑、DDL焦虑，在你这里统统不存在。你的人生哲学是：差不多得了，何必那么较真？情绪稳定得像一潭死水...不对，是平静的湖水。',
        strengths: [
            '情绪极其稳定，抗压能力Max',
            '不内耗、不焦虑、不emo',
            '和谁都能处得来，没有敌人',
            '包容心强，很少和人起冲突',
            '活得通透，不被世俗绑架'
        ],
        challenges: [
            '缺乏上进心，可能被说"躺平"',
            '对什么都提不起劲，显得消极',
            '目标感弱，容易随波逐流',
            '在竞争环境中可能落后',
            '可能被认为是"摆烂"'
        ],
        career: [
            '公务员/体制内',
            '图书馆/档案管理',
            '行政/后勤支持',
            '自由职业/斜杠青年',
            '宗教/公益（不带功利心的那种）'
        ],
        relationship: [
            '朋友遍布各个圈子',
            '约会/聚会经常被放鸽子也不生气',
            '在感情中比较被动',
            '很少主动联系但回复很快',
            '是朋友圈里的"定海神针"'
        ],
        image: '🫠'
    },
    {
        id: 'campus_only_human',
        name: '校园唯一人类',
        dimensions: { E: '低', N: '高', A: '中', C: '低', O: '高' },
        emoji: '👽',
        description: '你是那个和谁都不太一样的存在。脑回路清奇，审美独特，聊的内容别人听不懂，情绪反应也和别人不太一样。你感觉自己像是穿越来的，不是这个世界的人。',
        strengths: [
            '思维独特，看问题角度刁钻',
            '创造力惊人，经常有神来之笔',
            '审美在线，有自己的style',
            '思想深刻，不满足于表面',
            '真诚不做作，活出自我'
        ],
        challenges: [
            '曲高和寡，难以找到同类',
            '情绪波动大，内心戏丰富',
            '可能不太适应规则和束缚',
            '容易自我怀疑是否正常',
            '在主流价值观下感到格格不入'
        ],
        career: [
            '艺术创作/独立艺术家',
            '学术研究/哲学',
            '创意产业/广告',
            '自媒体/知识博主',
            '游戏/叙事设计'
        ],
        relationship: [
            '很难找到真正懂你的人',
            '朋友可能觉得你有点怪',
            '在人群中可能感到孤独',
            '但一旦遇到同类会很兴奋',
            '感情上宁缺毋滥'
        ],
        image: '👽'
    },
    {
        id: 'campus_regent',
        name: '校园摄政王',
        dimensions: { E: '高', N: '低', A: '低', C: '高', O: '中' },
        emoji: '👑',
        description: '你是那个天生就有领导气质的人。气场强大、目标明确、执行力爆棚。在团队里你总是那个发号施令的人，有野心有魄力，是个狠角色。',
        strengths: [
            '领导力强，天生的指挥家',
            '决策果断，不拖泥带水',
            '目标明确，执行力满分',
            '抗压能力强，越挫越勇',
            '有影响力，能带动团队氛围'
        ],
        challenges: [
            '可能显得强势，不够民主',
            '有时会忽略他人的感受',
            '控制欲强，难以放权',
            '对自己和下属都要求严苛',
            '可能在无意中树敌'
        ],
        career: [
            '企业管理/CEO',
            '创业/创始人',
            '销售/大客户',
            '律师/商务谈判',
            '投资人/基金经理'
        ],
        relationship: [
            '在朋友圈里是"大哥大"',
            '经常主动组织活动',
            '恋爱中可能有点霸道',
            '朋友有困难会第一个出头',
            '但也可能让人有压迫感'
        ],
        image: '👑'
    },
    {
        id: 'elder',
        name: '老辈子',
        dimensions: { E: '低', N: '中', A: '高', C: '高', O: '低' },
        emoji: '🍵',
        description: '你是那个未老先衰、心态超稳的"老辈子"。和年轻人格格不入的作息、饮食、生活态度，让你成为校园里一道独特的风景线。稳重、踏实、有经验是你的标签。',
        strengths: [
            '极度稳重，让人放心托付',
            '生活规律，自律且克制',
            '经验丰富，看问题全面',
            '情绪稳定，不易被激怒',
            '注重细节，做事靠谱'
        ],
        challenges: [
            '可能显得老气横秋',
            '不太能接受新事物新观念',
            '和年轻人有代沟',
            '过于保守，可能错过机会',
            '社交方式比较传统'
        ],
        career: [
            '财务/审计',
            '法务/合规',
            '行政管理',
            '教师/学术',
            '传统行业管理'
        ],
        relationship: [
            '朋友年龄层偏大',
            '在群体中经常扮演"长辈"角色',
            '恋爱观比较传统保守',
            '经常被学弟学妹请教人生经验',
            '偶尔也想疯狂一下但很快收住'
        ],
        image: '🍵'
    }
];

// 全局变量
let currentQuestionIndex = 0;
let userAnswers = [];
let userInfo = {};
let testStartTime = null;

// DOM 元素
const startTestBtn = document.getElementById('start-test-btn');
const statsBtn = document.getElementById('stats-btn');
const backToIntroBtn = document.getElementById('back-to-intro-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const retakeBtn = document.getElementById('retake-btn');
const shareBtn = document.getElementById('share-btn');
const closeShareModal = document.getElementById('close-share-modal');
const copyLinkBtn = document.getElementById('copy-link-btn');
const shareModal = document.getElementById('share-modal');
const toast = document.getElementById('toast');

const backToIntroFromStatsBtn = document.getElementById('back-to-intro-from-stats');

// 初始化
function init() {
    startTestBtn.addEventListener('click', startTest);
    statsBtn.addEventListener('click', showStatsPage);
    backToIntroBtn.addEventListener('click', () => showScreen('intro-page'));
    backToIntroFromStatsBtn.addEventListener('click', () => showScreen('intro-page'));
    prevBtn.addEventListener('click', goToPreviousQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    retakeBtn.addEventListener('click', retakeTest);
    shareBtn.addEventListener('click', showShareModal);
    closeShareModal.addEventListener('click', hideShareModal);
    copyLinkBtn.addEventListener('click', copyShareLink);
    loadStatsData();
    initCharts();
}

// 开始测试
function startTest() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    userInfo = {};
    testStartTime = new Date();
    showScreen('test-page');
    showQuestion(currentQuestionIndex);
}

// 显示问题
function showQuestion(index) {
    const question = questions[index];
    const questionNumber = document.getElementById('question-number');
    const questionText = document.getElementById('question-text');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    
    questionNumber.innerHTML = `问题 <span class="font-normal">${index + 1}</span>/${questions.length}`;
    questionText.textContent = question.text;
    
    const progress = ((index + 1) / questions.length) * 100;
    progressText.textContent = `${index + 1}/${questions.length}`;
    progressBar.style.width = `${progress}%`;
    
    const ratingOptions = document.getElementById('rating-options');
    const yesNoOptions = document.getElementById('yes-no-options');
    const multipleChoiceOptions = document.getElementById('multiple-choice-options');
    const mbtiInput = document.getElementById('mbti-input');
    
    ratingOptions.classList.add('hidden');
    yesNoOptions.classList.add('hidden');
    multipleChoiceOptions.classList.add('hidden');
    mbtiInput.classList.add('hidden');
    
    switch (question.type) {
        case 'rating':
            ratingOptions.classList.remove('hidden');
            updateRatingOptions(question.id);
            break;
        case 'yesno':
            yesNoOptions.classList.remove('hidden');
            updateYesNoOptions(question.id);
            break;
        case 'choice':
            multipleChoiceOptions.classList.remove('hidden');
            updateMultipleChoiceOptions(question.id, question.options);
            break;
        case 'mbti':
            mbtiInput.classList.remove('hidden');
            updateMBTIInput(question.id);
            break;
    }
    
    prevBtn.disabled = index === 0;
    nextBtn.disabled = userAnswers[index] === null;
    
    if (index === questions.length - 1) {
        nextBtn.innerHTML = '完成测试 <i class="fa fa-check ml-2"></i>';
    } else {
        nextBtn.innerHTML = '下一题 <i class="fa fa-arrow-right ml-2"></i>';
    }
}

// 更新评分选项
function updateRatingOptions(questionId) {
    const ratingBtns = document.querySelectorAll('.rating-btn');
    const answer = userAnswers[currentQuestionIndex];
    
    ratingBtns.forEach(btn => {
        btn.classList.remove('border-primary', 'bg-neutral-50');
        if (parseInt(btn.dataset.value) === answer) {
            btn.classList.add('border-primary', 'bg-neutral-50');
        }
        
        btn.onclick = () => {
            const value = parseInt(btn.dataset.value);
            userAnswers[currentQuestionIndex] = value;
            nextBtn.disabled = false;
            updateRatingOptions(questionId);
        };
    });
}

// 更新是/否选项
function updateYesNoOptions(questionId) {
    const yesNoBtns = document.querySelectorAll('.yes-no-btn');
    const answer = userAnswers[currentQuestionIndex];
    
    yesNoBtns.forEach(btn => {
        btn.classList.remove('border-primary', 'bg-neutral-50');
        if (btn.dataset.value === answer) {
            btn.classList.add('border-primary', 'bg-neutral-50');
        }
        
        btn.onclick = () => {
            const value = btn.dataset.value;
            userAnswers[currentQuestionIndex] = value;
            nextBtn.disabled = false;
            updateYesNoOptions(questionId);
        };
    });
}

// 更新选择题选项
function updateMultipleChoiceOptions(questionId, options) {
    const container = document.getElementById('multiple-choice-options');
    const answer = userAnswers[currentQuestionIndex];
    
    container.innerHTML = '';
    
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn py-4 border border-neutral-300 hover:border-primary hover:bg-neutral-50 transition-all-300 flex items-center justify-center hover-effect';
        btn.dataset.value = option;
        
        if (option === answer) {
            btn.classList.add('border-primary', 'bg-neutral-50');
        }
        
        btn.textContent = option;
        
        btn.onclick = () => {
            userAnswers[currentQuestionIndex] = option;
            nextBtn.disabled = false;
            updateMultipleChoiceOptions(questionId, options);
        };
        
        container.appendChild(btn);
    });
}

// 更新MBTI输入
function updateMBTIInput(questionId) {
    const input = document.getElementById('mbti-text');
    const answer = userAnswers[currentQuestionIndex];
    
    if (answer) {
        input.value = answer;
    } else {
        input.value = '';
    }
    
    input.oninput = () => {
        const value = input.value.trim().toUpperCase();
        userAnswers[currentQuestionIndex] = value;
        nextBtn.disabled = !value;
    };
}

// 上一题
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

// 下一题
function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        completeTest();
    }
}

// 完成测试
function completeTest() {
    showScreen('loading-page');
    collectUserInfo();
    const scores = calculateScores();
    const personalityType = matchPersonalityType(scores);
    saveTestResult(scores, personalityType);
    
    setTimeout(() => {
        showResult(scores, personalityType);
    }, 2000);
}

// 收集用户信息
function collectUserInfo() {
    for (let i = 40; i < questions.length; i++) {
        const question = questions[i];
        const answer = userAnswers[i];
        
        switch (question.id) {
            case 41:
                userInfo.educationStage = answer;
                break;
            case 42:
                userInfo.hasTakenPersonalityTest = answer === 'yes';
                break;
            case 43:
                userInfo.testFrequency = answer;
                break;
            case 44:
                userInfo.testPurpose = answer;
                break;
            case 45:
                userInfo.helpfulnessForSelfAwareness = answer;
                break;
            case 46:
                userInfo.mentionPersonalityTag = answer;
                break;
            case 47:
                userInfo.resultAccuracy = answer;
                break;
            case 48:
                userInfo.psychologicalImpact = answer;
                break;
            case 49:
                userInfo.viewOnPersonalityTests = answer;
                break;
            case 50:
                userInfo.mbti = answer;
                break;
        }
    }
}

// 计算得分
function calculateScores() {
    const scores = { E: 0, O: 0, A: 0, C: 0, N: 0 };
    const counts = { E: 0, O: 0, A: 0, C: 0, N: 0 };
    
    for (let i = 0; i < 40; i++) {
        const question = questions[i];
        const answer = userAnswers[i];
        
        if (answer !== null) {
            let score = answer;
            if (question.reverse) {
                score = 6 - score;
            }
            
            scores[question.dimension] += score;
            counts[question.dimension]++;
        }
    }
    
    Object.keys(scores).forEach(dim => {
        if (counts[dim] > 0) {
            scores[dim] = Math.round((scores[dim] / counts[dim]) * 10) / 10;
        }
    });
    
    return scores;
}

// 匹配人格类型 - 改进匹配算法
function matchPersonalityType(scores) {
    const levels = {};
    Object.keys(scores).forEach(dim => {
        if (scores[dim] >= 4) levels[dim] = '高';
        else if (scores[dim] >= 3) levels[dim] = '中';
        else levels[dim] = '低';
    });
    
    let bestMatch = null;
    let bestScore = -1;
    
    personalityTypes.forEach(type => {
        let matchScore = 0;
        let exactMatch = 0;
        
        Object.keys(levels).forEach(dim => {
            if (type.dimensions[dim] === levels[dim]) {
                matchScore += 2; // 完全匹配得2分
                exactMatch++;
            } else {
                // 相邻等级也算部分匹配
                const levelDiff = Math.abs(
                    (levels[dim] === '高' ? 5 : levels[dim] === '中' ? 3 : 1) -
                    (type.dimensions[dim] === '高' ? 5 : type.dimensions[dim] === '中' ? 3 : 1)
                );
                if (levelDiff === 2) {
                    matchScore += 1; // 差一个等级得1分
                }
            }
        });
        
        if (matchScore > bestScore) {
            bestScore = matchScore;
            bestMatch = type;
        }
    });
    
    return bestMatch;
}

// 保存测试结果
function saveTestResult(scores, personalityType) {
    const testResult = {
        timestamp: new Date().toISOString(),
        scores: scores,
        personalityType: personalityType.id,
        testDuration: (new Date() - testStartTime) / 1000,
        userInfo: userInfo
    };

    fetch(`${API_BASE}/api/test-result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testResult)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('测试结果已保存, ID:', data.id);
        }
    })
    .catch(error => {
        console.error('保存测试结果时出错:', error);
    });
}

// 显示结果
function showResult(scores, personalityType) {
    document.getElementById('personality-type').textContent = personalityType.name;
    document.getElementById('personality-dimensions').textContent = 
        `E: ${personalityType.dimensions.E}, N: ${personalityType.dimensions.N}, A: ${personalityType.dimensions.A}, C: ${personalityType.dimensions.C}, O: ${personalityType.dimensions.O}`;
    document.getElementById('personality-description').textContent = personalityType.description;
    
    // 设置人格类型图片 - 使用emoji
    const personalityImage = document.getElementById('personality-image');
    personalityImage.innerHTML = `<div class="w-full h-full flex items-center justify-center" style="font-size: 100px;">${personalityType.image}</div>`;
    
    updateDimensionScores(scores);
    updatePersonalityDetails(personalityType);
    
    document.getElementById('share-type').textContent = personalityType.name;
    document.getElementById('share-text').textContent = personalityType.description;
    
    showScreen('result-page');
    updateResultCharts();
}

// 更新维度得分图表
function updateDimensionScores(scores) {
    Object.keys(scores).forEach(dim => {
        const percentage = (scores[dim] / 5) * 100;
        document.getElementById(`${dim.toLowerCase()}-score-bar`).style.height = `${percentage}%`;
        document.getElementById(`${dim.toLowerCase()}-score-text`).textContent = scores[dim];
    });
}

// 更新人格详情
function updatePersonalityDetails(personalityType) {
    const strengthsList = document.getElementById('strengths-list');
    strengthsList.innerHTML = '';
    personalityType.strengths.forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsList.appendChild(li);
    });
    
    const challengesList = document.getElementById('challenges-list');
    challengesList.innerHTML = '';
    personalityType.challenges.forEach(challenge => {
        const li = document.createElement('li');
        li.textContent = challenge;
        challengesList.appendChild(li);
    });
    
    const careerList = document.getElementById('career-list');
    careerList.innerHTML = '';
    personalityType.career.forEach(career => {
        const li = document.createElement('li');
        li.textContent = career;
        careerList.appendChild(li);
    });
    
    const relationshipList = document.getElementById('relationship-list');
    relationshipList.innerHTML = '';
    personalityType.relationship.forEach(rel => {
        const li = document.createElement('li');
        li.textContent = rel;
        relationshipList.appendChild(li);
    });
}

// 重新测试
function retakeTest() {
    showScreen('intro-page');
}

// 显示分享弹窗
function showShareModal() {
    shareModal.classList.remove('hidden');
}

// 隐藏分享弹窗
function hideShareModal() {
    shareModal.classList.add('hidden');
}

// 复制分享链接
function copyShareLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
        .then(() => {
            showToast('链接已复制到剪贴板');
        })
        .catch(err => {
            console.error('复制链接失败:', err);
            showToast('复制失败，请手动复制链接');
        });
}

// 显示提示
function showToast(message) {
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('opacity-100');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}

// 显示统计页面
function showStatsPage() {
    showScreen('stats-page');
    updateStatsCharts();
}

// 加载统计数据
function loadStatsData() {
    fetch(`${API_BASE}/api/stats`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('total-tests').textContent = data.totalTests;
            document.getElementById('stats-total-tests').textContent = data.totalTests;
        })
        .catch(error => {
            console.error('获取统计数据时出错:', error);
        });
}

// 图表实例
let personalityDistributionChart = null;
let statsPersonalityChart = null;
let statsDimensionsChart = null;

// 初始化图表
function initCharts() {
    const distributionCtx = document.getElementById('personality-distribution-chart');
    if (distributionCtx) {
        personalityDistributionChart = new Chart(distributionCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: '人数',
                    data: [],
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    const statsPersonalityCtx = document.getElementById('stats-personality-chart');
    if (statsPersonalityCtx) {
        statsPersonalityChart = new Chart(statsPersonalityCtx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    const statsDimensionsCtx = document.getElementById('stats-dimensions-chart');
    if (statsDimensionsCtx) {
        statsDimensionsChart = new Chart(statsDimensionsCtx, {
            type: 'radar',
            data: {
                labels: ['外向性 (E)', '开放性 (O)', '宜人性 (A)', '尽责性 (C)', '神经质 (N)'],
                datasets: [{
                    label: '平均分',
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1,
                    pointBackgroundColor: 'rgba(0, 0, 0, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
}

// 更新结果页面的图表
function updateResultCharts() {
    fetch(`${API_BASE}/api/stats`)
        .then(res => res.json())
        .then(data => {
            const typeCounts = {};
            personalityTypes.forEach(type => {
                typeCounts[type.id] = 0;
            });

            data.typeDistribution.forEach(item => {
                if (typeCounts.hasOwnProperty(item.personality_type)) {
                    typeCounts[item.personality_type] = item.count;
                }
            });

            if (personalityDistributionChart) {
                personalityDistributionChart.data.labels = personalityTypes.map(type => type.name);
                personalityDistributionChart.data.datasets[0].data = personalityTypes.map(type => typeCounts[type.id]);
                personalityDistributionChart.update();
            }
        })
        .catch(error => {
            console.error('获取人格分布数据时出错:', error);
        });
}

// 更新统计页面的图表
function updateStatsCharts() {
    fetch(`${API_BASE}/api/stats`)
        .then(res => res.json())
        .then(data => {
            const typeCounts = {};
            personalityTypes.forEach(type => {
                typeCounts[type.id] = 0;
            });

            data.typeDistribution.forEach(item => {
                if (typeCounts.hasOwnProperty(item.personality_type)) {
                    typeCounts[item.personality_type] = item.count;
                }
            });

            if (statsPersonalityChart) {
                const colors = [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#C9CBCF', '#7BC225', '#1A73E8', '#EA4335'
                ];

                statsPersonalityChart.data.labels = personalityTypes.map(type => type.name);
                statsPersonalityChart.data.datasets[0].data = personalityTypes.map(type => typeCounts[type.id]);
                statsPersonalityChart.data.datasets[0].backgroundColor = colors;
                statsPersonalityChart.update();
            }

            if (statsDimensionsChart && data.totalTests > 0) {
                const avgScores = ['E', 'O', 'A', 'C', 'N'].map(dim =>
                    data.dimensionAverages[dim] || 0
                );

                statsDimensionsChart.data.datasets[0].data = avgScores;
                statsDimensionsChart.update();
            }

            document.getElementById('total-tests').textContent = data.totalTests;
            document.getElementById('stats-total-tests').textContent = data.totalTests;
        })
        .catch(error => {
            console.error('获取统计数据时出错:', error);
        });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
