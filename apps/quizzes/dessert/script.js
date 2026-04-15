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
    { question: '카페 쇼케이스에 진열되었을 때 나는?', choices: ['화려한 비주얼로 모두의 시선을 끌고 싶다!', '구석에서 은은한 달콤함을 풍기며 기다린다.'], type: 'EI' },
    { question: '손님이 나를 포크로 찌르려고 한다!', choices: ['포크의 각도를 보니 곧 내 속살이 드러나겠군.', '이 포크는 혹시 내 전생의 원수가 아닐까?'], type: 'SN' },
    { question: '옆의 마카롱이 깨져버렸다!', choices: ['부서진 정도를 보니 습도가 너무 높았나 보네.', '어떡해! 마카롱의 필링이 눈물처럼 보여...'], type: 'TF' },
    { question: '오늘의 메뉴로 선정되었을 때?', choices: ['레시피대로 딱 10개만 만들어지겠지. 완벽해.', '오늘은 손님이 얼마나 올까? 설레는 즉흥성!'], type: 'JP' },
    { question: '포장 상자에 여러 디저트와 담겼을 때?', choices: ['다들 안녕! 난 티라미수야, 잘 부탁해!', '상자가 너무 좁아... 제발 내 크림에 닿지 마.'], type: 'EI' },
    { question: '누군가 내 맛을 평가한다면?', choices: ['당도가 적당하고 식감이 훌륭하다고 분석한다.', '달콤한 사랑의 맛이라고 감성적으로 표현한다.'], type: 'SN' },
    { question: '제빵사가 나를 만들다 실패했을 때?', choices: ['반죽 비율이 틀렸네요. 다시 계산하세요.', '고생하셨어요... 다음엔 꼭 성공하실 거예요.'], type: 'TF' },
    { question: '진열대 자리가 바뀌었을 때?', choices: ['바뀐 위치의 손님 동선을 미리 파악한다.', '새로운 자리가 주는 신선함을 즐긴다.'], type: 'JP' },
    { question: '내가 제일 인기가 많아졌을 때?', choices: ['더 많은 사람에게 나의 달콤함을 뽐낸다.', '유명해지는 건 좋지만 조금 부끄러워.'], type: 'EI' },
    { question: '내 유통기한이 다가온다면?', choices: ['품질 유지 기한을 냉철하게 확인한다.', '마지막 한 조각까지 행복을 주고 싶어...'], type: 'TF' },
    { question: '카페 노래가 너무 시끄럽다면?', choices: ['음악에 맞춰 내 토핑을 춤추게 해볼까?', '조용히 숙성되는 시간을 가지고 싶어.'], type: 'EI' },
    { question: '새로운 장식이 내 위에 올라온다면?', choices: ['딸기군. 비타민 C가 추가되겠어.', '나는 이제 왕관을 쓴 디저트 왕이야!'], type: 'SN' }
];

const results = {
    ESTJ: { title: '철두철미 초코 케이크', desc: '완벽한 층과 균형! 당신은 계획적이고 리더십이 넘치는 사람이에요.' },
    ESTP: { title: '에너제틱 과일 타르트', desc: '톡톡 튀는 비주얼과 맛! 당신은 도전을 즐기는 활발한 사람이에요.' },
    ESFJ: { title: '다정한 마카롱', desc: '달콤한 필링처럼 주변을 챙기는 따뜻한 배려의 소유자!' },
    ESFP: { title: '화려한 파르페', desc: '어디서나 주인공! 당신은 즐거움을 선사하는 분위기 메이커예요.' },
    ISTJ: { title: '전통의 애플파이', desc: '변함없는 정석의 맛! 당신은 성실하고 책임감이 강한 사람이에요.' },
    ISTP: { title: '담백한 스콘', desc: '겉은 무심하지만 속은 깊은 매력! 당신은 혼자만의 시간을 소중히 해요.' },
    ISFJ: { title: '부드러운 푸딩', desc: '몽글몽글 다정한 당신! 주변 사람들을 편안하게 해주는 능력이 있어요.' },
    ISFP: { title: '감성적인 무스 케이크', desc: '부드러운 예술가 타입! 당신은 섬세한 감각의 소유자예요.' },
    ENTJ: { title: '위풍당당 크림 브륄레', desc: '단단한 껍질 속 부드러움! 당신은 결단력 있는 리더예요.' },
    ENTP: { title: '기발한 수플레', desc: '언제 부풀지 모르는 통통 튀는 창의성! 아이디어가 넘치는 당신!' },
    INTJ: { title: '치밀한 초콜릿 트러플', desc: '작지만 깊고 진한 생각! 당신은 전략적이고 독립적이에요.' },
    INTP: { title: '알쏭달쏭 까눌레', desc: '독특한 향과 식감! 당신은 지적 호기심이 많은 사색가예요.' },
    ENFJ: { title: '따뜻한 브라우니', desc: '진한 초콜릿처럼 깊은 정! 당신은 사람들을 이끄는 따뜻한 마음을 가졌어요.' },
    ENFP: { title: '상큼한 레몬 타르트', desc: '톡 쏘는 매력! 당신은 언제나 새로운 꿈을 꾸는 자유로운 영혼이에요.' },
    INFJ: { title: '우아한 레드벨벳', desc: '고급스럽고 생각이 깊은 당신! 타인에게 영감을 주는 통찰력을 가졌어요.' },
    INFP: { title: '꿈꾸는 솜사탕', desc: '몽환적이고 부드러운 당신! 자신만의 환상적인 세계를 가진 사람이에요.' }
};

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
    const counts = { E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0 };
    for(const char of userAnswers) { counts[char]++; }
    const mbti = [counts.E>=counts.I?'E':'I', counts.S>=counts.N?'S':'N', counts.T>=counts.F?'T':'F', counts.J>=counts.P?'J':'P'].join('');
    const result = results[mbti];
    resultTitle.textContent = `${nameInput.value}님은 ${result.title}`;
    resultDesc.textContent = result.desc;
}
