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
    { question: '나무 위에서 본 숲의 풍경은?', choices: ['나무가 울창하고 공기가 맑네.', '마치 한 폭의 그림 같아, 평화로운 동화 속 같아.'], type: 'SN' },
    { question: '낯선 동물이 다가와 인사를 건넨다면?', choices: ['일단 경계하며 거리를 두고 관찰한다.', '반갑게 인사하며 말을 건다.'], type: 'EI' },
    { question: '숲에 큰 비가 내리기 시작한다면?', choices: ['동굴이나 바위 밑으로 피해야지. 안전 우선!', '비 오는 숲의 운치를 즐기며 산책을 한다.'], type: 'JP' },
    { question: '친구들과 맛있는 열매를 발견했다!', choices: ['공평하게 나누어 먹을 방법을 찾는다.', '배고픈 친구에게 내 몫까지 양보한다.'], type: 'TF' },
    { question: '가장 자신 있는 나의 신체 부위는?', choices: ['사냥하기 좋은 날카로운 발톱!', '멋진 무늬가 그려진 꼬리.'], type: 'SN' },
    { question: '길을 가다 함정에 빠진 친구를 본다면?', choices: ['어떻게 빠져나갈지 지략을 짜낸다.', '바로 밧줄을 가져오거나 도와줄 방법을 찾는다.'], type: 'TF' },
    { question: '오늘 하루 나를 가장 행복하게 한 것은?', choices: ['내가 목표한 사냥(업무)을 성공적으로 마친 것.', '친구들과 함께 따뜻한 햇살 아래 낮잠을 잔 것.'], type: 'JP' },
    { question: '다른 동물이 나의 방식을 비난한다면?', choices: ['내 방식이 왜 효율적인지 논리적으로 설명한다.', '상대방이 왜 그렇게 생각하는지 고민하며 속상해한다.'], type: 'TF' },
    { question: '내일은 어떤 일을 하고 싶은가?', choices: ['어제 발견한 새로운 사냥터를 탐색한다.', '평화롭게 숲을 구경하며 시간을 보낸다.'], type: 'JP' },
    { question: '나를 표현하는 키워드는?', choices: ['열정, 용기, 리더십', '친절, 평화, 예술'], type: 'SN' },
    { question: '숲에서 열리는 축제, 나의 역할은?', choices: ['멋진 공연을 기획하고 무대를 지휘한다.', '맛있는 열매를 나누어주며 친구들과 소통한다.'], type: 'EI' },
    { question: '잠들기 전 마지막으로 하는 생각은?', choices: ['내일은 더 멋진 숲을 만들 거야!', '오늘 만난 친구들과의 따뜻한 순간들을 회상한다.'], type: 'TF' }
];

const results = {
    ESTJ: { title: "철저한 지휘관 '호랑이'", desc: '강한 책임감과 리더십! 당신은 숲의 질서를 지키는 든든한 지도자예요.', image: 'result_tiger.png' },
    ESTP: { title: "모험가 '여우'", desc: '두려움 없는 도전 정신! 당신은 위기 상황에서도 기발한 재치를 발휘해요.', image: 'result_fox.png' },
    ESFJ: { title: "다정한 수호자 '강아지'", desc: '사교적이고 따뜻한 당신! 주변 친구들을 잘 챙기는 친절한 친구예요.', image: 'result_dog.png' },
    ESFP: { title: "인기쟁이 '돌고래'", desc: '에너지 넘치는 분위기 메이커! 당신은 언제 어디서나 즐거움을 선사해요.', image: 'result_dolphin.png' },
    ISTJ: { title: "성실한 일꾼 '개미'", desc: '맡은 일은 끝까지 해내는 당신! 규칙과 질서를 소중히 여기는 신뢰의 상징이에요.', image: 'result_ant.png' },
    ISTP: { title: "자유로운 사냥꾼 '늑대'", desc: '독립심이 강하고 냉철한 당신! 도구 사용 능력이 뛰어나고 실용적이에요.', image: 'result_wolf.png' },
    ISFJ: { title: "따뜻한 동반자 '사슴'", desc: '차분하고 헌신적인 당신! 조용하지만 주변 사람들에게 큰 힘이 되어줘요.', image: 'result_deer.png' },
    ISFP: { title: "평화로운 예술가 '고양이'", desc: '온화하고 감수성 풍부한 당신! 현재의 행복을 즐길 줄 아는 낭만파예요.', image: 'result_cat.png' },
    ENTJ: { title: "카리스마 리더 '사자'", desc: '확신에 찬 결단력! 당신은 목표를 향해 거침없이 나아가는 타고난 리더예요.', image: 'result_lion.png' },
    ENTP: { title: "창의적인 지략가 '원숭이'", desc: '아이디어가 샘솟는 당신! 고정관념에서 벗어난 새로운 시각을 가졌어요.', image: 'result_monkey.png' },
    INTJ: { title: "냉철한 전략가 '올빼미'", desc: '지적인 통찰력과 분석력! 당신은 미래를 내다보고 계획하는 브레인이에요.', image: 'result_owl.png' },
    INTP: { title: "사색하는 철학자 '코알라'", desc: '혼자만의 생각에 잠기는 걸 즐기는 당신! 논리적이고 호기심이 아주 많아요.', image: 'result_koala.png' },
    ENFJ: { title: "친절한 멘토 '판다'", desc: '타인을 진심으로 응원하는 당신! 사람들의 마음을 움직이는 힘이 있어요.', image: 'result_panda.png' },
    ENFP: { title: "활발한 모험가 '래서판다'", desc: '무한한 긍정 에너지! 당신은 새로운 가능성을 찾아 끊임없이 도전해요.', image: 'result_red_panda.png' },
    INFJ: { title: "신비로운 예언가 '유니콘'", desc: '깊은 통찰력과 강한 직관! 당신은 세상을 더 나은 곳으로 만들고 싶어 해요.', image: 'result_unicorn.png' },
    INFP: { title: "꿈꾸는 이상가 '토끼'", desc: '몽글몽글 따뜻한 감성! 당신은 자신만의 순수한 내면 세계를 소중히 여겨요.', image: 'result_rabbit.png' }
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
    
    const resultImgElement = document.getElementById('result-img');
    const noImageText = document.getElementById('no-image-text');
    if (resultImgElement && result.image) {
        resultImgElement.src = `assets/results/${result.image}`;
        resultImgElement.alt = `${nameInput.value}님의 결과 이미지`;
        resultImgElement.style.display = 'block';
        if (noImageText) noImageText.style.display = 'none';
    } else if (resultImgElement) {
        resultImgElement.style.display = 'none';
        if (noImageText) noImageText.style.display = 'block';
    }
}
