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

const questions = [
    { question: '주말 데이트, 더 선호하는 장소는?', choices: ['핫플레이스 맛집이나 전시회', '조용한 카페나 집'], type: 'XY' },
    { question: '데이트 계획은 어떻게 짜나요?', choices: ['시간 단위로 꼼꼼하게 루트를 짠다.', '큰 틀만 정하고 상황에 맞춰 움직인다.'], type: 'AB' },
    { question: '활동적인 데이트 vs 정적인 데이트', choices: ['등산, 액티비티, 여행!', '영화 보기, 독서, 보드게임.'], type: 'XY' },
    { question: '식사 메뉴를 고를 때?', choices: ['유명하고 검증된 맛집을 찾는다.', '길 가다 눈에 띄는 곳에 들어간다.'], type: 'AB' },
    { question: '연인과 대화할 때 주로 나누는 주제는?', choices: ['오늘 있었던 일이나 실용적인 정보', '미래에 대한 상상이나 깊은 가치관'], type: 'XY' },
    { question: '데이트 비용 결제는?', choices: ['깔끔하게 데이트 통장이나 더치페이!', '상황에 따라 여유 있는 사람이 더 낸다.'], type: 'AB' },
    { question: '서프라이즈 이벤트에 대해 어떻게 생각하나?', choices: ['준비한 정성이 고마워 너무 좋다.', '마음은 고맙지만 가끔은 부담스러울 때가 있다.'], type: 'XY' }
];

let currentQuestion = 0;
let userAnswers = '';

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
            userAnswers += index === 0 ? questions[currentQuestion].type[0] : questions[currentQuestion].type[1];
            currentQuestion++;
            if (currentQuestion < questions.length) { showQuestion(); } else { showResult(); }
        });
        choicesEl.appendChild(button);
    });
}

function showResult() {
    questionPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    
    const countX = (userAnswers.match(/X/g) || []).length;
    const countA = (userAnswers.match(/A/g) || []).length;
    
    let resultTitleText, desc;
    
    if (countX >= 4 && countA >= 3) {
        resultTitleText = "활동적인 탐험가 커플";
        desc = "새로운 장소와 강렬한 경험을 찾아 떠나는 것을 즐기시네요! 활동적인 데이트를 통해 에너지를 얻는 타입입니다.";
    } else if (countX < 4 && countA >= 3) {
        resultTitleText = "완벽주의 힐링 커플";
        desc = "미리 계획된 편안한 장소에서 오붓한 시간을 보내는 것을 선호해요. 안정적이고 아늑한 데이트를 즐기는 스타일입니다.";
    } else if (countX >= 4 && countA < 3) {
        resultTitleText = "즉흥적인 열정 커플";
        desc = "계획 없어도 괜찮아! 발길 닿는 대로 떠나는 모험을 즐깁니다. 예상치 못한 상황에서도 즐거움을 찾아내는 긍정적인 커플입니다.";
    } else {
        resultTitleText = "아늑한 집콕 커플";
        desc = "복잡한 밖보다는 둘만의 편안한 공간에서 힐링하는 게 최고! 맛있는 배달 음식과 영화만 있다면 세상에서 가장 행복한 커플입니다.";
    }
    
    resultTitle.textContent = `${nameInput.value}님의 결과`;
    resultDesc.innerHTML = `<h3 class="mb-3 text-purple" style="color:#6610f2;">${resultTitleText}</h3><p class="fs-5">${desc}</p>`;
}
