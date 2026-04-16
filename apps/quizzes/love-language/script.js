const startPage = document.getElementById('start-page');
const questionPage = document.getElementById('question-page');
const resultPage = document.getElementById('result-page');
const nameInput = document.getElementById('name');
const startBtn = document.getElementById('start-btn');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const progress = document.querySelector('.progress');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');

// 유형: 인정하는 말(A), 함께하는 시간(B), 선물(C), 봉사(D), 스킨십(E)
const questions = [
    { question: '연인이 나에게 해줬으면 하는 것은?', choices: ['"너 오늘 정말 멋지다"라는 칭찬', '하루 종일 다른 일 안 하고 나랑만 놀기'], type: 'AB' },
    { question: '어떤 선물을 받았을 때 더 기쁜가?', choices: ['정성스럽게 쓴 손편지', '내가 평소에 갖고 싶어 했던 물건'], type: 'AC' },
    { question: '피곤한 나를 위해 연인이 해줬으면 하는 일은?', choices: ['"고생했어"라고 말하며 꼭 안아주기', '집안일이나 귀찮은 일을 대신 해주기'], type: 'ED' },
    { question: '기념일에 더 기대되는 것은?', choices: ['둘만의 오붓한 데이트 시간', '서프라이즈 선물'], type: 'BC' },
    { question: '연인과 있을 때 행복한 순간은?', choices: ['함께 산책하며 깊은 대화를 나눌 때', '자연스럽게 손을 잡거나 팔짱을 낄 때'], type: 'BE' },
    { question: '연인의 어떤 행동이 더 감동적인가?', choices: ['바쁜 와중에도 나를 위해 요리를 해줄 때', '"항상 고마워, 사랑해"라고 자주 말해줄 때'], type: 'DA' },
    { question: '힘든 일이 있을 때 필요한 것은?', choices: ['나를 믿어주는 따뜻한 응원의 말', '말없이 곁에 머물러 주는 시간'], type: 'AB' },
    { question: '어떤 표현이 더 사랑받는 느낌인가?', choices: ['깜짝 꽃 배달이나 작은 선물', '말하지 않아도 내 신발 끈을 묶어주는 세심함'], type: 'CD' },
    { question: '데이트할 때 중요한 것은?', choices: ['휴대폰 안 보고 오직 서로에게만 집중하기', '옆에 딱 붙어 앉아 스킨십하기'], type: 'BE' },
    { question: '집에 왔을 때 기분 좋은 상황은?', choices: ['깨끗하게 정리된 집과 차려진 저녁 식사', '나를 반겨주는 연인의 뜨거운 포옹'], type: 'DE' }
];

let currentQuestion = 0;
let answers = { A: 0, B: 0, C: 0, D: 0, E: 0 };

startBtn.addEventListener('click', () => {
    if (nameInput.value === '') { alert('이름을 입력해주세요!'); return; }
    startPage.classList.add('hidden');
    questionPage.classList.remove('hidden');
    showQuestion();
});

function showQuestion() {
    progress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    questionEl.textContent = questions[currentQuestion].question;
    choicesEl.innerHTML = '';
    questions[currentQuestion].choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.classList.add('choice');
        button.textContent = choice;
        button.addEventListener('click', () => {
            const typeChar = questions[currentQuestion].type[index];
            answers[typeChar]++;
            currentQuestion++;
            if (currentQuestion < questions.length) { showQuestion(); } else { showResult(); }
        });
        choicesEl.appendChild(button);
    });
}

function showResult() {
    questionPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    
    // 가장 높은 점수의 유형 찾기
    const sorted = Object.entries(answers).sort((a, b) => b[1] - a[1]);
    const topType = sorted[0][0];
    
    const resultsData = {
        A: { title: '인정하는 말 (Words of Affirmation)', desc: '당신은 연인의 따뜻한 칭찬과 격려의 한마디에 큰 사랑을 느껴요. "사랑해", "고마워", "네가 최고야"라는 말이 당신의 에너지원입니다!', image: 'result_affirmation.png' },
        B: { title: '함께하는 시간 (Quality Time)', desc: '당신은 온전히 서로에게만 집중하는 시간을 가장 중요하게 생각해요. 휴대폰은 잠시 내려두고 눈을 맞추며 나누는 대화가 당신에게 최고의 사랑 표현입니다.', image: 'result_qualitytime.png' },
        C: { title: '선물 (Receiving Gifts)', desc: '당신은 선물을 받을 때 그 속에 담긴 연인의 정성과 마음을 느껴요. 꼭 비싼 것이 아니더라도 나를 생각하며 고른 작은 선물이 당신을 행복하게 합니다.', image: 'result_gifts.png' },
        D: { title: '봉사 (Acts of Service)', desc: '당신은 연인이 나를 위해 행동으로 보여주는 배려에 감동해요. 집안일을 도와주거나 어려운 일을 대신 해결해주는 모습에서 깊은 사랑을 확인합니다.', image: 'result_service.png' },
        E: { title: '스킨십 (Physical Touch)', desc: '당신은 신체적인 접촉을 통해 정서적인 안정과 사랑을 느껴요. 따뜻한 포옹, 손잡기, 가벼운 입맞춤이 당신에게는 무엇보다 강력한 사랑의 증거입니다.', image: 'result_touch.png' }
    };

    const result = resultsData[topType];
    resultTitle.textContent = `${nameInput.value}님의 사랑의 언어`;
    resultDesc.innerHTML = `<h3 class="mb-3 text-danger">${result.title}</h3><p class="fs-5">${result.desc}</p>`;

    // Add image handling logic
    const resultImgElement = document.getElementById('result-img');
    if (resultImgElement && result.image) {
        resultImgElement.src = `assets/results/${result.image}`;
        resultImgElement.alt = `${nameInput.value}님의 결과 이미지`;
        resultImgElement.style.display = 'block';
    } else if (resultImgElement) {
        resultImgElement.style.display = 'none';
    }
}
