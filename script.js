// 当整个页面加载完成后，执行代码
document.addEventListener('DOMContentLoaded', () => {

    // 1. 定义问题数据 (扩展版 - 20个问题)
    const questions = [
        // E (外向) vs I (内向)
        {
            question: "在社交聚会后，你通常感觉：",
            options: [
                { text: "精力充沛，很兴奋", value: "E" },
                { text: "筋疲力尽，需要独处来恢复精力", value: "I" }
            ]
        },
        {
            question: "在团队讨论中，你倾向于：",
            options: [
                { text: "积极参与，分享我的想法", value: "E" },
                { text: "先倾听他人的观点，在内心思考", value: "I" }
            ]
        },
        {
            question: "你更喜欢的工作环境是：",
            options: [
                { text: "充满互动和协作的开放式环境", value: "E" },
                { text: "安静、独立、可以专注的环境", value: "I" }
            ]
        },
        {
            question: "当你遇到一个有趣的话题时，你更可能：",
            options: [
                { text: "立即找人讨论", value: "E" },
                { text: "自己先深入研究和思考", value: "I" }
            ]
        },
        {
            question: "对于结识新朋友，你感到：",
            options: [
                { text: "轻松自然，乐在其中", value: "E" },
                { text: "有些费力，更珍惜已有的深厚友谊", value: "I" }
            ]
        },

        // S (实感) vs N (直觉)
        {
            question: "你更相信：",
            options: [
                { text: "眼见为实，基于具体事实和经验", value: "S" },
                { text: "事物的潜在可能性和内在联系", value: "N" }
            ]
        },
        {
            question: "在学习新技能时，你喜欢：",
            options: [
                { text: "遵循清晰的、一步步的指导", value: "S" },
                { text: "理解整体概念和理论，然后自由发挥", value: "N" }
            ]
        },
        {
            question: "你对自己未来的描述，更倾向于：",
            options: [
                { text: "具体、实际的计划和目标", value: "S" },
                { text: "充满各种可能性的愿景和想象", value: "N" }
            ]
        },
        {
            question: "你通常更关注：",
            options: [
                { text: "此时此地的细节和现实", value: "S" },
                { text: "未来的趋势和模式", value: "N" }
            ]
        },
        {
            question: "在讲述一件事情时，你倾向于：",
            options: [
                { text: "按时间顺序、详细地描述事实", value: "S" },
                { text: "跳跃式地讲述，强调其核心意义和影响", value: "N" }
            ]
        },

        // T (思考) vs F (情感)
        {
            question: "做决策时，你更重视：",
            options: [
                { text: "客观的逻辑、原则和效率", value: "T" },
                { text: "决策对相关人员的情感影响与和谐", value: "F" }
            ]
        },
        {
            question: "当朋友遇到困难时，你通常会：",
            options: [
                { text: "帮助他们分析问题，并提出解决方案", value: "T" },
                { text: "给予情感上的支持和安慰", value: "F" }
            ]
        },
        {
            question: "你认为更糟糕的是：",
            options: [
                { text: "做事不合逻辑，缺乏效率", value: "T" },
                { text: "制造人际冲突，伤害他人感情", value: "F" }
            ]
        },
        {
            question: "在评价他人工作时，你更注重：",
            options: [
                { text: "工作的质量和准确性，直接指出问题", value: "T" },
                { text: "先给予肯定和鼓励，委婉地提出改进建议", value: "F" }
            ]
        },
        {
            question: "你更愿意被认为是：",
            options: [
                { text: "一个公正、有思想的人", value: "T" },
                { text: "一个有同情心、能体谅他人的人", value: "F" }
            ]
        },

        // J (判断) vs P (知觉)
        {
            question: "你的生活方式更倾向于：",
            options: [
                { text: "有条理，喜欢提前计划好一切", value: "J" },
                { text: "灵活、随性，喜欢保留选择的余地", value: "P" }
            ]
        },
        {
            question: "对于截止日期（Deadline），你的态度是：",
            options: [
                { text: "将其视为必须遵守的确定目标，并尽早完成", value: "J" },
                { text: "将其视为一个灵活的参考，压力能激发我的动力", value: "P" }
            ]
        },
        {
            question: "在开始一个新项目时，你倾向于：",
            options: [
                { text: "先制定详细的步骤和框架", value: "J" },
                { text: "直接投入进去，边做边调整", value: "P" }
            ]
        },
        {
            question: "当事情有了一个确定的结果，你感觉：",
            options: [
                { text: "很舒服，喜欢尘埃落定的感觉", value: "J" },
                { text: "有点束缚，因为这意味着失去了其他可能性", value: "P" }
            ]
        },
        {
            question: "你的工作空间通常是：",
            options: [
                { text: "整洁有序，所有东西都各就其位", value: "J" },
                { text: "可能有些杂乱，但充满正在进行的项目和灵感", value: "P" }
            ]
        }
    ];

    // 2. 定义MBTI结果描述 (这部分保持不变)
    const results = {
        'ISTJ': { title: '检查员', description: '你认真、负责，重视事实和逻辑。你喜欢有条不紊地工作，是可靠和值得信赖的。' },
        'ISFJ': { title: '守护者', description: '你温暖、有同情心，致力于帮助他人。你重视传统和安全，是忠诚的伙伴。' },
        'INFJ': { title: '作家', description: '你富有洞察力、有创造力，并寻求生活的深层意义。你有强烈的价值观，并希望激励他人。' },
        'INTJ': { title: '策划者', description: '你独立、有远见，是天生的战略家。你喜欢复杂的挑战，并能制定出长远的计划。' },
        'ISTP': { title: '巧匠', description: '你冷静、务实，喜欢探索和解决实际问题。你擅长动手操作，反应迅速。' },
        'ISFP': { title: '艺术家', description: '你温和、敏感，活在当下。你欣赏美，并有强烈的个人价值观。' },
        'INFP': { title: '哲学家', description: '你理想主义、忠于自己的价值观。你对人和可能性充满好奇，希望让世界变得更美好。' },
        'INTP': { title: '逻辑学家', description: '你富有想象力、喜欢理论和抽象概念。你总是在寻求逻辑解释，是天生的思考者。' },
        'ESTP': { title: '挑战者', description: '你精力充沛、喜欢冒险，是解决问题的高手。你活在当下，善于抓住机会。' },
        'ESFP': { title: '表演者', description: '你外向、有趣，喜欢成为关注的焦点。你热爱生活，并能感染周围的人。' },
        'ENFP': { title: '奋斗者', description: '你热情、有创造力，善于与人沟通。你对未来充满热情，总能看到各种可能性。' },
        'ENTP': { title: '发明家', description: '你聪明、好奇，喜欢智力上的挑战。你是天生的辩论家，善于发现新的解决方案。' },
        'ESTJ': { title: '管理者', description: '你务实、果断，是天生的领导者。你喜欢组织和管理，确保事情高效完成。' },
        'ESFJ': { title: '东道主', description: '你热心、有责任感，喜欢照顾他人。你重视和谐与合作，是社区的核心。' },
        'ENFJ': { title: '教育家', description: '你富有魅力、善于鼓舞人心。你能够理解并激励他人，是天生的领导者和激励者。' },
        'ENTJ': { title: '统帅', description: '你果断、有远见，是天生的领导者。你善于制定和执行计划，能够带领团队实现目标。' }
    };

    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');

    // 3. 动态生成问题 HTML (这部分保持不变)
    function displayQuestions() {
        questions.forEach((q, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');

            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionBlock.appendChild(questionText);

            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');
            
            q.options.forEach(option => {
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question${index}`;
                radio.value = option.value;
                
                radio.addEventListener('change', () => {
                    document.querySelectorAll(`input[name="question${index}"]`).forEach(input => {
                        input.parentElement.classList.remove('selected');
                    });
                    label.classList.add('selected');
                });

                const span = document.createElement('span');
                span.textContent = option.text;

                label.appendChild(radio);
                label.appendChild(span);
                optionsDiv.appendChild(label);
            });

            questionBlock.appendChild(optionsDiv);
            quizContainer.appendChild(questionBlock);
        });
    }

    // 4. 计算并显示结果 (这部分保持不变)
    function calculateAndShowResult() {
        const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');

        if (selectedOptions.length < questions.length) {
            alert('请回答所有问题！');
            return;
        }

        selectedOptions.forEach(option => {
            scores[option.value]++;
        });

        let resultType = '';
        resultType += scores.E >= scores.I ? 'E' : 'I';
        resultType += scores.S >= scores.N ? 'S' : 'N';
        resultType += scores.T >= scores.F ? 'T' : 'F';
        resultType += scores.J >= scores.P ? 'P' : 'J';

        document.getElementById('result-type').textContent = resultType;
        document.getElementById('result-title').textContent = results[resultType].title;
        document.getElementById('result-description').textContent = results[resultType].description;
        
        quizContainer.classList.add('hidden');
        submitBtn.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // 5. 绑定事件 (这部分保持不变)
    submitBtn.addEventListener('click', calculateAndShowResult);

    // 6. 初始化页面 (这部分保持不变)
    displayQuestions();
});
