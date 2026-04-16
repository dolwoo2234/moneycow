const startPage = document.getElementById('start-page');
const questionPage = document.getElementById('question-page');
const resultPage = document.getElementById('result-page');
const nameInput = document.getElementById('name');
const startBtn = document.getElementById('start-btn');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const progress = document.querySelector('.progress');
const resultTitle = document.getElementById('result-title');
const resultImg = document.getElementById('result-img');
const resultDesc = document.getElementById('result-desc');

const questions = [
    { question: '빵집 진열대에 놓였을 때, 나는?', choices: ['손님들이 날 보게끔 맨 앞에 서고 싶다!', '구석진 곳에서 조용히 고소한 향이나 풍길래...'], type: 'EI' },
    { question: '제빵사가 내 몸에 건포도를 박으려고 한다!', choices: ['음, 건포도군. 영양가가 올라가겠어.', '이 건포도는 사실 외계에서 온 감시 장치가 아닐까?'], type: 'SN' },
    { question: '옆에 있던 식빵이 바닥에 떨어졌다!', choices: ['이미 늦었어. 3초 룰은 근거 없는 낭설이야.', '어떡해!! 아프진 않니? 누가 좀 도와줘요!!'], type: 'TF' },
    { question: '오븐에 들어갈 시간이 다가왔다!', choices: ['정확히 45분 발효를 마쳤지. 계획대로군.', '벌써? 조금만 더 부풀어 오르고 싶었는데...!'], type: 'JP' },
    { question: '빵 봉투에 여러 빵과 함께 담겼을 때, 나는?', choices: ['안녕? 난 소금빵이야! 넌 어디서 왔어?', '질식할 것 같아... 제발 말 걸지 말아줘...'], type: 'EI' },
    { question: '손님이 나를 한 입 베어 물었을 때의 느낌은?', choices: ['바삭한 껍질과 촉촉한 속살의 조화가 예술이군.', '이것은 마치 입안에서 펼쳐지는 밀가루의 대서사시!'], type: 'SN' },
    { question: '내가 너무 타버렸을 때, 제빵사가 슬퍼한다면?', choices: ['온도 조절 실패네요. 다음엔 5도만 낮추세요.', '울지 마세요... 전 타버려도 당신의 정성을 알아요.'], type: 'TF' },
    { question: '내일 팔릴 빵들이 미리 준비될 때, 나는?', choices: ['정해진 트레이, 정해진 순서대로 대기해야지.', '어디로 팔려나갈지 모르는 이 스릴이 즐거워!'], type: 'JP' },
    { question: '새로운 토핑이 내 몸에 뿌려진다면?', choices: ['이건 치즈 가루군. 짭짤한 맛이 추가되겠어.', '눈이 내리는 것 같아! 난 이제 눈꽃 빵이야!'], type: 'SN' },
    { question: '유통기한이 지나서 폐기될 위기에 처했다면?', choices: ['식품위생법상 당연한 절차지. 담담히 받아들인다.', '내 생이 이렇게 짧다니... 누군가의 입속에서 행복을 주고 싶었는데...'], type: 'TF' },
    { question: '빵집의 배경 음악이 너무 크다면?', choices: ['신난다! 리듬에 맞춰 반죽을 더 찰지게 해볼까?', '너무 시끄러워... 조용히 발효에만 집중하고 싶어.'], type: 'EI' },
    { question: '포장지가 바뀌게 되었다!', choices: ['미리 공지된 대로 새 옷으로 갈아입어야지.', '오! 갑자기 분위기 전환? 나쁘지 않은데?'], type: 'JP' }
];

const results = {
    ESTJ: { title: '따끈따끈 식빵', desc: '당신은 누구에게나 사랑받는 따뜻하고 부드러운 마음의 소유자군요!', image: 'result_shokupang.png' },
    ESFJ: { title: '겉바속촉 크루아상', desc: '겉으로는 바삭해 보이지만 속은 누구보다 부드러운, 반전 매력의 당신!', image: 'result_croissant.png' },
    ISTJ: { title: '새콤달콤 사워도우', desc: '독특한 매력으로 주변 사람들을 사로잡는, 개성 만점 예술가 타입!', image: 'result_sourdough.png' },
    ISFJ: { title: '단짠단짠 소금빵', desc: '무심한 듯 시크하지만 은근히 다정한, 매력적인 츤데레!', image: 'result_salt_bread.png' },
    ESTP: { title: '에너자이저 베이글', desc: '언제나 활기 넘치는 당신! 주변 사람들에게 긍정적인 에너지를 나눠주는군요.', image: 'result_bagel.png' },
    ESFP: { title: '달콤한 도넛', desc: '달콤한 매력으로 주변을 사로잡는 당신! 파티에 빠질 수 없는 주인공이네요.', image: 'result_donut.png' },
    ISTP: { title: '담백한 바게트', desc: '필요한 말만 하는 담백한 당신! 혼자만의 시간을 즐기는 고독한 미식가군요.', image: 'result_baguette.png' },
    ISFP: { title: '말랑말랑 모닝빵', desc: '말랑말랑 부드러운 당신! 주변 사람들을 편안하게 만들어주는 능력이 있군요.', image: 'result_morning_bread.png' },
    ENTJ: { title: '카리스마 맘모스빵', desc: '카리스마 넘치는 리더십의 소유자! 당신의 계획은 언제나 완벽하군요.', image: 'result_mammoth_bread.png' },
    ENTP: { title: '통통 튀는 팝콘', desc: '어디로 튈지 모르는 통통 튀는 매력의 당신! 기발한 아이디어로 주변을 놀라게 하는군요.', image: 'result_popcorn.png' },
    INTJ: { title: '치밀한 밀푀유', desc: '겹겹이 쌓인 생각처럼 치밀하고 섬세한 당신! 완벽주의적인 성향을 가지고 있군요.', image: 'result_millefeuille.png' },
    INTP: { title: '알쏭달쏭 꽈배기', desc: '생각이 많고 알쏭달쏭한 당신! 엉뚱한 매력으로 사람들을 끌어당기는군요.', image: 'result_twisted_doughnut.png' },
    ENFJ: { title: '따뜻한 카스텔라', desc: '따뜻한 마음으로 사람들을 챙기는 당신! 주변에 항상 사람들이 끊이지 않는군요.', image: 'result_castella.png' },
    ENFP: { title: '상큼한 레몬 마들렌', desc: '상큼하고 발랄한 매력의 당신! 주변에 긍정적인 기운을 불어넣는군요.', image: 'result_lemon_madeleine.png' },
    INFJ: { title: '속 깊은 앙버터', desc: '겉으로는 차가워 보이지만 속은 따뜻하고 달콤한 당신! 속 깊은 생각으로 사람들에게 감동을 주는군요.', image: 'result_ang_butter.png' },
    INFP: { title: '몽글몽글 구름빵', desc: '몽글몽글한 상상 속을 헤엄치는 당신! 섬세한 감성의 소유자군요.', image: 'result_cloud_bread.png' }
};

let currentQuestion = 0;
let userAnswers = '';

startBtn.addEventListener('click', () => {
    if (nameInput.value === '') {
        alert('이름을 입력해주세요!');
        return;
    }
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
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        });
        choicesEl.appendChild(button);
    });
}

function showResult() {
    questionPage.classList.add('hidden');
    resultPage.classList.remove('hidden');

    const mbtiCounts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    for (const char of userAnswers) {
        mbtiCounts[char]++;
    }

    const mbti = [
        mbtiCounts.E >= mbtiCounts.I ? 'E' : 'I',
        mbtiCounts.S >= mbtiCounts.N ? 'S' : 'N',
        mbtiCounts.T >= mbtiCounts.F ? 'T' : 'F',
        mbtiCounts.J >= mbtiCounts.P ? 'J' : 'P'
    ].join('');

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
