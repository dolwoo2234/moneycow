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
    { question: '숲속 파티 초대장을 받았다! 나의 반응은?', choices: ['신난다! 숲속 친구들을 모두 만날 생각에 설렌다.', '재미있겠지만, 모르는 동물이 많을까 봐 조금 걱정된다.'], type: 'EI' },
    { question: '길을 걷다 탐스러운 열매를 발견했을 때?', choices: ['오, 맛있어 보이네! 일단 먹을 수 있는 건지 확인한다.', '이 열매를 먹으면 몸이 커지거나 특별한 능력이 생길 것 같아!'], type: 'SN' },
    { question: '친구가 나무에서 떨어져 다쳤다!', choices: ['어디가 다쳤어? 119 다람쥐를 부르고 응급처치를 한다.', '너무 아프겠다... 울지 마, 내가 옆에 있어 줄게.'], type: 'TF' },
    { question: '겨울잠을 준비하는 나의 자세는?', choices: ['식량 저장 계획을 완벽하게 세우고 보관함을 정리한다.', '졸릴 때까지 놀다가 발등에 불 떨어지면 준비한다.'], type: 'JP' },
    { question: '새로운 숲으로 이사를 가게 되었다!', choices: ['이사 가자마자 옆집 동물들에게 인사를 다닌다.', '조용히 내 둥지를 정리하며 적응할 시간을 갖는다.'], type: 'EI' },
    { question: '하늘에 떠 있는 구름을 보며 드는 생각은?', choices: ['구름이 낮게 떴네, 곧 비가 오려나?', '폭신폭신한 솜사탕 같아! 저 위에 누우면 어떨까?'], type: 'SN' },
    { question: '내가 아끼는 도토리를 친구가 잃어버렸다면?', choices: ['다음에 꼭 갚아! 라고 정확히 말한다.', '속상하지만 친구가 더 미안해할까 봐 괜찮다고 한다.'], type: 'TF' },
    { question: '내일은 숲속 마켓이 열리는 날!', choices: ['사야 할 리스트를 미리 적어둔다.', '가서 마음에 드는 게 있으면 즉흥적으로 산다.'], type: 'JP' },
    { question: '많은 동물 앞에서 발표를 해야 한다면?', choices: ['시선 집중이 즐겁다! 내 목소리를 뽐낸다.', '심장이 두근거려... 빨리 끝내고 내려가고 싶다.'], type: 'EI' },
    { question: '나무 위에서 본 숲의 풍경은?', choices: ['나무가 울창하고 공기가 맑네.', '마치 한 폭의 그림 같아, 평화로운 동화 속 같아.'], type: 'SN' },
    { question: '친구가 선물을 줬는데 내 스타일이 아닐 때', choices: ['솔직하게 말하고 다른 걸로 바꿀 수 있는지 묻는다.', '정성이 고마우니 기쁘게 웃으며 고맙다고 한다.'], type: 'TF' },
    { question: '하루 일과를 마친 후 나는?', choices: ['정해진 시간에 잠자리에 든다.', '더 놀고 싶어서 늦게까지 깨어 있다가 늦잠을 잔다.'], type: 'JP' }
];

    ESTJ: { title: '철저한 지휘관 '호랑이'', desc: '강한 책임감과 리더십! 당신은 숲의 질서를 지키는 든든한 지도자예요.', image: 'result_tiger.png' },
    ESTP: { title: '모험가 '여우'', desc: '두려움 없는 도전 정신! 당신은 위기 상황에서도 기발한 재치를 발휘해요.', image: 'result_fox.png' },
    ESFJ: { title: '다정한 수호자 '강아지'', desc: '사교적이고 따뜻한 당신! 주변 친구들을 잘 챙기는 친절한 친구예요.', image: 'result_dog.png' },
    ESFP: { title: '인기쟁이 '돌고래'', desc: '에너지 넘치는 분위기 메이커! 당신은 언제 어디서나 즐거움을 선사해요.', image: 'result_dolphin.png' },
    ISTJ: { title: '성실한 일꾼 '개미'', desc: '맡은 일은 끝까지 해내는 당신! 규칙과 질서를 소중히 여기는 신뢰의 상징이에요.', image: 'result_ant.png' },
    ISTP: { title: '자유로운 사냥꾼 '늑대'', desc: '독립심이 강하고 냉철한 당신! 도구 사용 능력이 뛰어나고 실용적이에요.', image: 'result_wolf.png' },
    ISFJ: { title: '따뜻한 동반자 '사슴'', desc: '차분하고 헌신적인 당신! 조용하지만 주변 사람들에게 큰 힘이 되어줘요.', image: 'result_deer.png' },
    ISFP: { title: '평화로운 예술가 '고양이'', desc: '온화하고 감수성 풍부한 당신! 현재의 행복을 즐길 줄 아는 낭만파예요.', image: 'result_cat.png' },
    ENTJ: { title: '카리스마 리더 '사자'', desc: '확신에 찬 결단력! 당신은 목표를 향해 거침없이 나아가는 타고난 리더예요.', image: 'result_lion.png' },
    ENTP: { title: '창의적인 지략가 '원숭이'', desc: '아이디어가 샘솟는 당신! 고정관념에서 벗어난 새로운 시각을 가졌어요.', image: 'result_monkey.png' },
    INTJ: { title: '냉철한 전략가 '올빼미'', desc: '지적인 통찰력과 분석력! 당신은 미래를 내다보고 계획하는 브레인이에요.', image: 'result_owl.png' },
    INTP: { title: '사색하는 철학자 '코알라'', desc: '혼자만의 생각에 잠기는 걸 즐기는 당신! 논리적이고 호기심이 아주 많아요.', image: 'result_koala.png' },
    ENFJ: { title: '친절한 멘토 '판다'', desc: '타인을 진심으로 응원하는 당신! 사람들의 마음을 움직이는 힘이 있어요.', image: 'result_panda.png' },
    ENFP: { title: '활발한 모험가 '래서판다'', desc: '무한한 긍정 에너지! 당신은 새로운 가능성을 찾아 끊임없이 도전해요.', image: 'result_red_panda.png' },
    INFJ: { title: '신비로운 예언가 '유니콘'', desc: '깊은 통찰력과 강한 직관! 당신은 세상을 더 나은 곳으로 만들고 싶어 해요.', image: 'result_unicorn.png' },
    INFP: { title: '꿈꾸는 이상가 '토끼'', desc: '몽글몽글 따뜻한 감성! 당신은 자신만의 순수한 내면 세계를 소중히 여겨요.', image: 'result_rabbit.png' }


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

    // Add image handling logic
    const resultImgElement = document.getElementById('result-img');
    if (resultImgElement && result.image) {
        resultImgElement.src = `assets/results/${result.image}`;
        resultImgElement.alt = `${nameInput.value}님의 결과 이미지`;
        resultImgElement.style.display = 'block';
    } else if (resultImgElement) {
        resultImgElement.style.display = 'none'; // Hide if no image is available
    }
}
// Modified file for image handling
