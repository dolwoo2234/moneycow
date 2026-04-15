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
    { question: '우주선을 타고 새로운 은하계에 도착했다!', choices: ['당장 밖으로 나가 외계 생명체들과 인사를 나눈다.', '창밖으로 안전한지 충분히 확인한 후 조심스럽게 나간다.'], type: 'EI' },
    { question: '먼지 구름 사이로 반짝이는 미지의 물체를 발견했을 때?', choices: ['오, 희귀한 광물인가? 성분을 분석해봐야겠어.', '저건 블랙홀의 입구일지도 몰라! 다른 차원으로 연결될 거야.'], type: 'SN' },
    { question: '동료 우주비행사가 향수병에 걸려 슬퍼한다면?', choices: ['지구까지 남은 거리와 도착 예정 시간을 계산해준다.', '따뜻한 우주 차를 건네며 동료의 마음을 위로해준다.'], type: 'TF' },
    { question: '행성 탐사 일정을 짤 때 나의 스타일은?', choices: ['분 단위로 탐사 경로와 산소 소모량을 계산한다.', '그날그날 행성 컨디션에 따라 끌리는 곳으로 간다.'], type: 'JP' },
    { question: '우주 정거장에서 파티가 열렸다!', choices: ['모든 대원과 어울리며 우주 댄스를 즐긴다.', '구석에서 우주 풍경을 감상하며 조용히 즐긴다.'], type: 'EI' },
    { question: '우주복 헬멧 너머로 본 지구의 모습은?', choices: ['파란 바다와 구름이 선명하게 보이네.', '우주의 보석 같아, 우리가 지켜야 할 아름다운 생명의 요람이야.'], type: 'SN' },
    { question: '우주선에 결함이 생겨 경고음이 울린다면?', choices: ['매뉴얼을 즉시 확인하고 고장 부위를 수리한다.', '당황스럽지만 동료들이 불안해하지 않게 진정시킨다.'], type: 'TF' },
    { question: '탐사 중 발견한 희귀 식물을 어떻게 할까?', choices: ['정해진 표본 보관함에 순서대로 정리한다.', '일단 가방에 넣고 나중에 생각한다.'], type: 'JP' },
    { question: '외계인과의 첫 대화, 나는?', choices: ['먼저 손을 흔들며 적극적으로 소통을 시도한다.', '외계인이 먼저 신호를 보낼 때까지 관찰한다.'], type: 'EI' },
    { question: '무중력 상태에서 떠다니는 기분은?', choices: ['몸이 가벼워져서 움직이기 편하군.', '구름 위를 걷는 기분이야, 마치 자유로운 영혼이 된 것 같아.'], type: 'SN' },
    { question: '미션 성공 후 보너스를 받는다면?', choices: ['앞으로의 우주 여행 비용으로 저축한다.', '동료들과 함께 멋진 우주 만찬을 즐긴다.'], type: 'TF' },
    { question: '내일은 블랙홀 탐사가 예정되어 있다!', choices: ['장비 점검을 마치고 일찍 잠자리에 든다.', '블랙홀 너머에 무엇이 있을지 상상하느라 잠을 설친다.'], type: 'JP' }
];

const results = {
    ESTJ: { title: '질서의 수호자 '토성'', desc: '강력한 고리처럼 원칙과 질서를 중요하게 여기는 당신! 리더십이 뛰어나요.' },
    ESTP: { title: '열정의 모험가 '화성'', desc: '불타는 에너지와 추진력! 당신은 어떤 장애물도 두려워하지 않는 용감한 개척자예요.' },
    ESFJ: { title: '다정한 중력 '지구'', desc: '모두를 끌어당기는 따뜻한 매력! 당신은 주변 사람들을 행복하게 만드는 능력이 있어요.' },
    ESFP: { title: '빛나는 주인공 '태양'', desc: '우주의 중심에서 빛나는 당신! 당신의 밝은 에너지는 모두에게 활력을 줘요.' },
    ISTJ: { title: '성실한 관찰자 '수성'', desc: '조용히 태양 주위를 도는 수성처럼 성실한 당신! 꼼꼼하고 신뢰할 수 있는 사람이에요.' },
    ISTP: { title: '독립적인 탐험가 '명왕성'', desc: '멀리 떨어져 있어도 자신만의 길을 가는 당신! 냉철한 판단력과 독립심을 가졌어요.' },
    ISFJ: { title: '은은한 수호자 '달'', desc: '밤하늘을 비추는 달처럼 다정한 당신! 묵묵히 주변을 챙기는 따뜻한 성격이에요.' },
    ISFP: { title: '아름다운 예술가 '금성'', desc: '사랑과 아름다움의 행성! 당신은 섬세한 감각과 평화로운 마음을 가진 예술가예요.' },
    ENTJ: { title: '거대한 지휘관 '목성'', desc: '우주에서 가장 큰 행성처럼 거대한 야망! 당신은 목표를 향해 나아가는 타고난 지휘관이에요.' },
    ENTP: { title: '번뜩이는 천재 '천왕성'', desc: '옆으로 누워 도는 독특함! 당신은 고정관념을 깨는 기발한 아이디어 뱅크예요.' },
    INTJ: { title: '신비로운 전략가 '해왕성'', desc: '푸른 신비로움과 깊은 통찰력! 당신은 미래를 내다보는 전략적인 사고를 가졌어요.' },
    INTP: { title: '사색하는 혜성', desc: '어디로 튈지 모르는 지적 호기심! 당신은 논리적이고 탐구심이 강한 사색가예요.' },
    ENFJ: { title: '희망의 성운', desc: '별들이 태어나는 곳처럼 희망을 주는 당신! 사람들의 잠재력을 끌어올리는 따뜻한 멘토예요.' },
    ENFP: { title: '통통 튀는 안드로메다', desc: '무한한 상상력과 가능성! 당신은 언제나 새로운 꿈을 찾아 떠나는 자유로운 영혼이에요.' },
    INFJ: { title: '깊은 통찰의 은하수', desc: '수많은 별의 조화처럼 깊은 내면! 당신은 타인의 마음을 어루만지는 통찰력을 가졌어요.' },
    INFP: { title: '몽환적인 소행성', desc: '작지만 빛나는 자신만의 세계! 당신은 순수한 감수성과 꿈을 간직한 이상가예요.' }
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
