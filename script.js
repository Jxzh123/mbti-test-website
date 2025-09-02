
// 当整个页面加载完成后，执行代码
document.addEventListener('DOMContentLoaded', () => {

    // 1. 定义问题数据
    // 我们简化一下，每个维度只出2道题，共8道题
    const questions = [
        {
            question: "在一个社交聚会上，你通常会：",
            options: [
                { text: "与许多人交流，包括陌生人", value: "E" },
                { text: "只与少数你认识的人交谈", value: "I" }
            ]
        },
        {
            question: "处理日常任务时，你更倾向于：",
            options: [
                { text: "遵循一个详细的计划", value: "J" },
                { text: "随遇而安，看情况办事", value: "P" }
            ]
        },
        {
            question: "当你做决策时，你更看重：",
            options: [
                { text: "逻辑、原则和公正", value: "T" },
                { text: "人情、和谐与他人的感受", value: "F" }
            ]
        },
        {
            question: "对于未来，你更感兴趣的是：",
            options: [
                { text: "各种可能性和想象", value: "N" },
                { text: "现实和实际的应用", value: "S" }
            ]
        },
        {
            question: "在独处时，你感觉：",
            options: [
                { text: "精力得到恢复", value: "I" },
                { text: "感到无聊，渴望与人互动", value: "E" }
            ]
        },
        {
            question: "在学习新事物时，你更喜欢：",
            options: [
                { text: "掌握具体的事实和细节", value: "S" },
                { text: "理解整体的概念和理论", value: "N" }
            ]
        },
        {
            question: "面对冲突，你的第一反应是：",
            options: [
                { text: "寻求客观真理，即使会引起不快", value: "T" },
                { text: "努力维持和谐，避免伤害他人感情", value: "F" }
            ]
        },
        {
            question: "你的生活方式更倾向于：",
            options: [
                { text: "有条理，喜欢把事情安排得井井有条", value: "J" },
                { text: "灵活，喜欢保留选择的余地", value: "P" }
            ]
        }
    ];

    // 2. 定义MBTI结果描述
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

    // 3. 动态生成问题 HTML
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
                
                // 当用户选择一个选项时，给它添加一个视觉反馈
                radio.addEventListener('change', () => {
                    // 移除同问题下其他选项的选中样式
                    document.querySelectorAll(`input[name="question${index}"]`).forEach(input => {
                        input.parentElement.classList.remove('selected');
                    });
                    // 为当前选中的选项添加样式
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

    // 4. 计算并显示结果
    function calculateAndShowResult() {
        const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');

        // 检查是否所有问题都已回答
        if (selectedOptions.length < questions.length) {
            alert('请回答所有问题！');
            return;
        }

        selectedOptions.forEach(option => {
            scores[option.value]++;
        });

        let resultType = '';
        resultType += scores.E > scores.I ? 'E' : 'I';
        resultType += scores.S > scores.N ? 'S' : 'N';
        resultType += scores.T > scores.F ? 'T' : 'F';
        resultType += scores.J > scores.P ? 'P' : 'J';

        // 显示结果
        document.getElementById('result-type').textContent = resultType;
        document.getElementById('result-title').textContent = results[resultType].title;
        document.getElementById('result-description').textContent = results[resultType].description;
        
        // 隐藏问题和按钮，显示结果
        quizContainer.classList.add('hidden');
        submitBtn.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        
        // 滚动到结果区域
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // 5. 绑定事件
    submitBtn.addEventListener('click', calculateAndShowResult);

    // 6. 初始化页面
    displayQuestions();
});
