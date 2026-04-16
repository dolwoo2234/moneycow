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
    { question: '햇살 좋은 날, 당신이 피어나고 싶은 장소는?', choices: ['많은 사람이 오가는 화려한 정원 중앙', '숲속 깊은 곳, 나만의 조용한 쉼터'], type: 'EI' },
    { question: '바람에 실려 온 낯선 꽃향기를 맡았을 때?', choices: ['음, 장미 향이군. 근처에 꽃집이 있나 봐.', '이 향기는 마치 잊고 있던 어린 시절의 기억을 깨우는 것 같아.'], type: 'SN' },
    { question: '옆에 있는 꽃이 시들어 고개를 숙이고 있다면?', choices: ['물이 부족한가? 흙의 상태를 확인해본다.', '많이 힘들었지? 내 잎사귀로 햇빛을 가려줄게.'], type: 'TF' },
    { question: '꽃을 피우기 위한 당신의 계획은?', choices: ['매일 정해진 시간에 광합성을 하고 영양분을 섭취한다.', '비가 오면 오는 대로, 해가 뜨면 뜨는 대로 자연스럽게 피어난다.'], type: 'JP' },
    { question: '꽃다발에 여러 꽃과 함께 묶였을 때?', choices: ['"안녕! 우린 오늘 누구에게 기쁨을 주게 될까?"라며 인사를 건넨다.', '너무 답답해... 혼자 들판에 서 있을 때가 좋았어.'], type: 'EI' },
    { question: '벌이 다가와 꿀을 모으려 한다면?', choices: ['생태계의 순환이지. 기꺼이 꿀을 내어준다.', '벌과 친구가 되어 세상 밖 이야기를 들려달라고 한다.'], type: 'SN' },
    { question: '꽃꽂이를 하던 사람이 실수로 내 줄기를 꺾었다면?', choices: ['조심 좀 하지... 수명에 영향이 있을지 분석한다.', '상대방이 당황했을까 봐 괜찮다는 듯 향기를 더 내뿜는다.'], type: 'TF' },
    { question: '계절이 바뀌어 낙엽이 지기 시작할 때?', choices: ['다가올 추위를 대비해 미리 씨앗을 갈무리한다.', '마지막 불꽃을 태우듯 가장 아름다운 색으로 물든다.'], type: 'JP' },
    { question: '누군가 나를 뚫어지게 쳐다본다면?', choices: ['나의 아름다움을 마음껏 뽐내며 시선을 즐긴다.', '부끄러워서 꽃잎을 살짝 오므린다.'], type: 'EI' },
    { question: '비가 내리는 소리를 들으며 드는 생각은?', choices: ['수분 보충 시간이다! 뿌리에 힘을 준다.', '하늘이 들려주는 연주곡 같아, 마음이 차분해지네.'], type: 'SN' },
    { question: '친구가 "나 오늘 좀 시든 것 같지 않아?"라고 묻는다면?', choices: ['영양제가 필요해 보이네. 종류별로 추천해준다.', '무슨 일이 있었어? 네 마음이 시든 건 아니지?'], type: 'TF' },
    { question: '꽃밭의 위치를 옮겨야 한다면?', choices: ['새로운 위치의 일조량과 토양 상태를 꼼꼼히 따진다.', '새로운 이웃 꽃들을 만날 생각에 신이 난다.'], type: 'JP' }
];

const results = {
    ESTJ: { title: '강인한 생명력 \'해바라기\'', desc: '확고한 목표 의식과 리더십! 당신은 언제나 태양을 향해 당당하게 서 있는 든든한 존재예요.', image: 'result_sunflower.png' },
    ESTP: { title: '자유로운 영혼 \'개양귀비\'', desc: '어디서나 잘 적응하는 강한 생활력! 당신은 화려한 매력과 도전 정신을 가진 모험가예요.', image: 'result_poppy.png' },
    ESFJ: { title: '따뜻한 사랑 \'수국\'', desc: '조화롭고 다정한 성격! 당신은 주변 사람들을 하나로 묶어주는 포근한 배려의 소유자예요.', image: 'result_hydrangea.png' },
    ESFP: { title: '화려한 주인공 \'거베라\'', desc: '밝고 긍정적인 에너지! 당신은 존재만으로도 주변을 환하게 밝히는 분위기 메이커예요.', image: 'result_gerbera.png' },
    ISTJ: { title: '한결같은 신뢰 \'백합\'', desc: '순수하고 성실한 마음! 당신은 맡은 바 책임을 다하는 신뢰할 수 있는 단단한 사람이에요.', image: 'result_lily.png' },
    ISTP: { title: '쿨한 매력 \'라벤더\'', desc: '차분하고 독립적인 성향! 당신은 실용적이고 냉철한 판단력을 가진 매력적인 사람이에요.', image: 'result_lavender.png' },
    ISFJ: { title: '은은한 배려 \'안개꽃\'', desc: '묵묵히 남을 돕는 헌신적인 성격! 당신은 화려하진 않지만 없어서는 안 될 소중한 수호자예요.', image: 'result_baby_breath.png' },
    ISFP: { title: '섬세한 예술가 \'프리지아\'', desc: '순진함과 감수성! 당신은 자신만의 고유한 향기를 지닌 평화주의자 예술가예요.', image: 'result_freesia.png' },
    ENTJ: { title: '카리스마 리더 \'장미\'', desc: '열정적이고 확신에 찬 결단력! 당신은 목표를 향해 당당하게 나아가는 타고난 리더예요.', image: 'result_rose.png' },
    ENTP: { title: '독특한 천재 \'튤립\'', desc: '기발한 생각과 창의성! 당신은 고정관념을 거부하고 늘 새로운 것을 추구하는 혁신가예요.', image: 'result_tulip.png' },
    INTJ: { title: '고고한 통찰력 \'난초\'', desc: '독립적이고 지적인 분위기! 당신은 미래를 내다보는 예리한 통찰력과 전략적인 사고를 가졌어요.', image: 'result_orchid.png' },
    INTP: { title: '사색하는 구절초', desc: '논리적이고 호기심 많은 성격! 당신은 조용히 자신만의 지적 세계를 탐험하는 지식인이에요.', image: 'result_korean_chrysanthemum.png' },
    ENFJ: { title: '희망의 멘토 \'해바라기 성운\'', desc: '진심으로 타인을 위하는 따뜻한 마음! 당신은 사람들의 잠재력을 꽃피우는 멋진 조력자예요.', image: 'result_sunflower_nebula.png' },
    ENFP: { title: '톡톡 튀는 \'스위트피\'', desc: '상상력 풍부하고 자유로운 영혼! 당신은 매일매일 새로운 즐거움을 찾아 떠나는 여행자예요.', image: 'result_sweet_pea.png' },
    INFJ: { title: '신비로운 \'연꽃\'', desc: '깊은 내면과 통찰력! 당신은 타인의 아픔을 어루만지고 세상을 정화하는 신비한 능력이 있어요.', image: 'result_lotus.png' },
    INFP: { title: '꿈꾸는 \'물망초\'', desc: '순수한 감수성과 이상향! 당신은 자신만의 소중한 기억과 꿈을 간직한 낭만주의자예요.', image: 'result_forget_me_not.png' }
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
