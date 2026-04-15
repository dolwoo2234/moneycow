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
    { question: '후배가 업무 중에 이어폰을 끼고 있다면?', choices: ['업무에 집중만 잘하면 상관없다.', '그래도 상사가 부를 땐 바로 들어야 하지 않을까?'], score: [0, 10] },
    { question: '회식 자리에서 막내에게 고기를 굽게 하는 것은?', choices: ['당연히 잘 굽는 사람이 굽거나 돌아가며 구워야 한다.', '원래 그런 건 아랫사람이 센스 있게 하는 거다.'], score: [0, 15] },
    { question: '"라떼는 말이야~"라는 말을 들어본 적이 있나?', choices: ['그건 농담으로도 절대 안 쓴다.', '나도 모르게 "예전엔 안 이랬는데" 소리가 나온다.'], score: [0, 10] },
    { question: '처음 보는 사람에게 나이를 물어보는 이유는?', choices: ['그냥 궁금해서.', '서로 간의 예의(존댓말 등)를 정하기 위해 필수다.'], score: [0, 10] },
    { question: '요즘 유행하는 줄임말을 얼마나 알고 있나?', choices: ['대부분 알고 유연하게 사용한다.', '말을 굳이 줄여 쓰는 게 이해가 안 간다.'], score: [0, 10] },
    { question: '상사가 틀린 말을 했을 때 나의 태도는?', choices: ['그 자리에서 바로 혹은 나중에라도 정정한다.', '윗사람 말인데 일단 알았다고 하고 뒤에서 처리한다.'], score: [0, 5] },
    { question: '주말에 단톡방에서 업무 연락이 온다면?', choices: ['월요일에 확인한다.', '당연히 바로 읽고 답장해야 한다.'], score: [0, 15] },
    { question: '인사 안 하는 후배를 보면 드는 생각은?', choices: ['뭐 그럴 수도 있지, 내가 먼저 하면 된다.', '가정교육을 어떻게 받은 건가 싶다.'], score: [0, 15] },
    { question: '퇴근 시간이 되었는데 상사가 퇴근을 안 한다면?', choices: ['내 할 일 다 했으니 인사하고 퇴근한다.', '눈치껏 조금 더 자리를 지키다 나간다.'], score: [0, 10] }
];

let currentQuestion = 0;
let totalScore = 0;

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
            totalScore += questions[currentQuestion].score[index];
            currentQuestion++;
            if (currentQuestion < questions.length) { showQuestion(); } else { showResult(); }
        });
        choicesEl.appendChild(button);
    });
}

function showResult() {
    questionPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    
    const percentage = Math.min(100, totalScore);
    let title, desc;
    
    if (percentage <= 20) {
        title = `꼰대력 ${percentage}%: 갓생 사는 MZ 힙스터`;
        desc = "혹시 Z세대? 최신 트렌드를 완벽하게 꿰고 있는 당신! 유연한 사고방식을 가진 멋진 분이시네요.";
    } else if (percentage <= 50) {
        title = `꼰대력 ${percentage}%: 새싹 꼰대`;
        desc = "조금씩 '요즘 애들'이라는 말이 입에 붙기 시작했나요? 아직은 소통이 가능한 수준이에요!";
    } else if (percentage <= 80) {
        title = `꼰대력 ${percentage}%: 명예 퇴직 위기 꼰대`;
        desc = '"라떼는 말이야~"를 입에 달고 사는 당신! 하지만 그만큼 풍부한 경험과 책임감을 가졌군요.';
    } else {
        title = `꼰대력 ${percentage}%: 전설의 꼰대 왕`;
        desc = "당신이 나타나면 주변이 조용해집니다. 조금만 마음을 열고 상대방의 이야기를 들어보는 건 어떨까요?";
    }
    
    resultTitle.textContent = `${nameInput.value}님의 결과`;
    resultDesc.innerHTML = `<h3 class="mb-3">${title}</h3><p>${desc}</p>`;
}
