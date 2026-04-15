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
    { question: '새로운 심리테스트 링크를 발견하면?', choices: ['일단 즐겨찾기 하거나 바로 해본다.', '친구가 보내줄 때만 해본다.'], score: [10, 0] },
    { question: '테스트 결과를 받으면 주변에 공유하나?', choices: ['단톡방이나 SNS에 바로 올린다.', '나만 보고 넘기거나 친한 사람 한두 명에게만 보낸다.'], score: [10, 5] },
    { question: '결과가 내 성격과 안 맞으면?', choices: ['내가 원하는 결과가 나올 때까지 다시 한다.', '음, 아니네? 하고 잊어버린다.'], score: [10, 0] },
    { question: '어릴 적 잡지나 인터넷 카페에서 심테를 즐겼나?', choices: ['그렇다. 테스트는 나의 오랜 취미다.', '딱히 그런 기억은 없다.'], score: [10, 0] },
    { question: '지금 이 테스트를 하는 이유가 뭐야?', choices: ['테스트 자체를 좋아해서 찾아서 들어왔다.', '그냥 심심해서 한 번 눌러봤다.'], score: [10, 2] },
    { question: '내 MBTI를 남들에게 말하는 것을 좋아하나?', choices: ['그렇다. 대화의 필수 주제라고 생각한다.', '먼저 물어보지 않으면 굳이 말하지 않는다.'], score: [10, 5] },
    { question: '다른 사람의 성격을 테스트 결과로 짐작해본 적 있나?', choices: ['"역시 넌 그 MBTI일 줄 알았어"라고 자주 생각한다.', '사람마다 다르니 크게 신경 쓰지 않는다.'], score: [10, 0] }
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
    
    let level, title, desc;
    if (totalScore >= 60) {
        level = 5; title = "프로 테스트러";
        desc = "신상 테스트는 무조건 섭렵해야 직성이 풀리는 당신! 당신의 MBTI는 'TEST'인가요?";
    } else if (totalScore >= 45) {
        level = 4; title = "심테 마니아";
        desc = "테스트의 즐거움을 잘 아는 당신! 결과 공유도 활발하게 하시는군요.";
    } else if (totalScore >= 30) {
        level = 3; title = "중급 테스트러";
        desc = "심심할 때 테스트를 즐기는 평범하고 건강한(?) 수준입니다.";
    } else if (totalScore >= 15) {
        level = 2; title = "테스트 입문자";
        desc = "가끔씩 흥미로운 게 보이면 해보는 정도시군요!";
    } else {
        level = 1; title = "테스트 비기너";
        desc = "친구가 보내줘도 귀찮아서 잘 안 하시는군요? 이 테스트를 끝까지 하신 게 기적입니다!";
    }
    
    resultTitle.textContent = `${nameInput.value}님은 Level ${level}`;
    resultDesc.innerHTML = `<h3 class="mb-3">${title}</h3><p>${desc}</p>`;
}
