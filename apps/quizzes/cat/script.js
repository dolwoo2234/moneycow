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
    { question: '처음 보는 사람이 집에 놀러 왔을 때 나는?', choices: ['호기심 가득! 먼저 다가가서 냄새를 맡는다.', '일단 침대 밑으로 숨어서 상황을 지켜본다.'], type: 'EI' },
    { question: '창밖을 지나가는 새를 발견했을 때?', choices: ['채터링(꺅꺅)을 하며 당장이라도 잡을 듯이 집중한다.', '저 새는 어디로 가는 걸까? 깊은 생각에 잠긴다.'], type: 'SN' },
    { question: '집사가 실수로 내 꼬리를 밟고 사과한다면?', choices: ['아야! 하지만 사과했으니 금방 잊고 간식을 요구한다.', '내 꼬리가 얼마나 소중한데... 서운한 마음이 오래간다.'], type: 'TF' },
    { question: '우다다(갑자기 뛰기) 타임! 나는?', choices: ['매일 밤 정해진 시간에 루틴처럼 뛴다.', '필 꽂힐 때마다 내키는 대로 집안을 휘젓는다.'], type: 'JP' },
    { question: '다묘 가정! 다른 고양이 친구들과 있을 때?', choices: ['함께 뒹굴며 그루밍해주고 장난치는 게 좋다.', '혼자 높은 곳에서 평화롭게 낮잠 자는 게 좋다.'], type: 'EI' },
    { question: '새로운 간식을 줬을 때 나의 반응은?', choices: ['일단 맛을 보고 익숙한 식감인지 확인한다.', '이 간식의 원재료는 뭘까? 새로운 맛의 세계를 상상한다.'], type: 'SN' },
    { question: '집사가 우울해 보일 때 나는?', choices: ['배가 고픈가? 머리를 비비며 간식을 달라고 한다.', '옆에 가만히 앉아 체온을 나누며 위로해준다.'], type: 'TF' },
    { question: '장난감 낚싯대를 발견했다!', choices: ['집사가 흔들어줄 때까지 얌전히 기다린다.', '내가 직접 물어다가 집사 앞에 던져 놓는다.'], type: 'JP' },
    { question: '박스 vs 캣타워, 나의 선택은?', choices: ['모두와 소통할 수 있는 탁 트인 캣타워!', '나만의 안락하고 아늑한 박스 속!'], type: 'EI' },
    { question: '내가 제일 좋아하는 장난감은?', choices: ['항상 가지고 놀던 익숙한 깃털 장난감.', '매번 새로운 자극을 주는 레이저 포인트.'], type: 'SN' },
    { question: '집사가 화장실까지 따라오면?', choices: ['감시 중인가? 별생각 없이 볼일을 본다.', '나를 걱정해주나? 집사의 사랑을 느낀다.'], type: 'TF' },
    { question: '잠자기 전 나의 행동은?', choices: ['집사가 눕는 시간에 맞춰 옆자리에서 대기한다.', '집안 구석구석을 순찰하다가 졸릴 때 아무 데서나 잔다.'], type: 'JP' }
];

const results = {
    ESTJ: { title: '카리스마 대장 고양이 '메인쿤'', desc: '듬직하고 리더십 넘치는 당신! 집안의 질서를 지키는 멋진 대장님이에요.' },
    ESFJ: { title: '상냥한 개냥이 '랙돌'', desc: '사람을 너무 좋아하는 당신! 누구에게나 사랑받는 친절한 고양이에요.' },
    ISTJ: { title: '점잖은 신사 '러시안 블루'', desc: '신중하고 조용한 당신! 정해진 규칙을 좋아하는 깔끔한 성격이에요.' },
    ISFJ: { title: '다정다감 '스코티시 폴드'', desc: '주변을 세심하게 챙기는 당신! 조용하지만 깊은 사랑을 주는 타입이에요.' },
    ESTP: { title: '천방지축 '아비시니안'', desc: '활동적이고 호기심 많은 당신! 한시도 가만히 있지 않는 에너자이저예요.' },
    ESFP: { title: '파티 피플 '뱅갈'', desc: '어디서나 눈에 띄는 당신! 화려한 비주얼과 넘치는 흥을 가진 고양이에요.' },
    ISTP: { title: '독립적인 사냥꾼 '노르웨이 숲'', desc: '혼자서도 잘 지내는 당신! 뛰어난 적응력과 냉철한 판단력을 가졌어요.' },
    ISFP: { title: '평화주의자 '페르시안'', desc: '싸움을 싫어하고 온화한 당신! 느긋하게 인생을 즐길 줄 아는 예술가예요.' },
    ENTJ: { title: '똑똑한 리더 '샴'', desc: '의사표현이 확실하고 똑똑한 당신! 목표를 위해 집사를 조종(?)할 줄 아는 전략가예요.' },
    ENTP: { title: '장난꾸러기 '터키시 앙고라'', desc: '기발한 장난으로 집사를 놀래키는 당신! 똑똑하고 자유로운 영혼이에요.' },
    INTJ: { title: '도도한 천재 '스핑크스'', desc: '독특한 매력과 깊은 통찰력! 남의 시선 따위 신경 쓰지 않는 쿨한 고양이에요.' },
    INTP: { title: '철학자 고양이 '터키시 반'', desc: '혼자만의 생각에 잠기는 걸 즐기는 당신! 엉뚱하지만 천재적인 면모가 있어요.' },
    ENFJ: { title: '인싸 중의 인싸 '데본 렉스'', desc: '모든 사람과 친해지고 싶은 당신! 다정한 성격으로 주변에 온기를 전해요.' },
    ENFP: { title: '모험가 '먼치킨'', desc: '새로운 도전이 즐거운 당신! 작지만 강한 호기심으로 매일 꿈을 꾸는 고양이에요.' },
    INFJ: { title: '신비로운 '버만'', desc: '조용하고 속이 깊은 당신! 집사의 마음을 꿰뚫어 보는 신비한 능력이 있어요.' },
    INFP: { title: '몽글몽글 '코리안 숏헤어'', desc: '섬세하고 감수성 풍부한 당신! 마음을 연 상대에게는 한없이 다정한 고양이에요.' }
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
