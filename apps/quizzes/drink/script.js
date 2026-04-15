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
    { question: '카페에 들어갔을 때 나의 행동은?', choices: ['메뉴판을 보기도 전에 이미 마음속으로 메뉴를 결정했다.', '신메뉴나 맛있어 보이는 사진을 보고 한참 고민한다.'], type: 'EI' },
    { question: '음료를 주문할 때 가장 중요하게 생각하는 것은?', choices: ['갈증 해소나 에너지 충전 등 음료 본연의 기능', '비주얼이나 사진이 예쁘게 나오는 정도'], type: 'SN' },
    { question: '친구가 내가 주문한 음료가 맛없다고 한다면?', choices: ['그래? 내 입맛엔 괜찮은데. (별생각 없음)', '아 정말? 주문 실패인가... 속상해진다.'], type: 'TF' },
    { question: '음료를 마시는 속도는?', choices: ['얼음이 녹기 전에 빠르게 다 마신다.', '대화를 나누며 천천히, 얼음이 다 녹을 때까지 마신다.'], type: 'JP' },
    { question: '단골 카페 사장님이 아는 척을 하신다면?', choices: ['반갑게 인사를 나누며 스몰 토크를 즐긴다.', '살짝 당황하며 짧게 대답하고 자리를 피한다.'], type: 'EI' },
    { question: '새로운 에이드의 맛을 묘사한다면?', choices: ['탄산이 강하고 레몬 시럽 맛이 많이 나.', '여름날의 싱그러운 바람을 한 입 머금은 것 같아!'], type: 'SN' },
    { question: '지인이 카페에서 음료를 쏟았다면?', choices: ['휴지를 가져다주고 닦는 걸 도와준다.', '괜찮아? 옷은 안 젖었어? 하며 걱정해준다.'], type: 'TF' },
    { question: '카페에 앉아 공부나 일을 할 때?', choices: ['정해진 시간 동안 할 분량을 딱 정해놓고 한다.', '분위기에 취해 내키는 대로 이것저것 한다.'], type: 'JP' },
    { question: '사람이 아주 많은 핫플레이스 카페, 나는?', choices: ['북적북적한 분위기에서 에너지를 얻는다.', '기가 빨려서 빨리 조용한 곳으로 가고 싶다.'], type: 'EI' },
    { question: '좋아하는 음료의 커스텀(옵션) 조절은?', choices: ['항상 먹던 방식대로 정확하게 주문한다.', '매번 그날의 기분에 따라 새롭게 시도해본다.'], type: 'SN' },
    { question: '연인이 내 음료를 한 입 뺏어 먹는다면?', choices: ['먹고 싶으면 하나 더 시켜줄까? (효율적)', '우리 입맛이 비슷하네! 기분이 좋다. (감성적)'], type: 'TF' },
    { question: '카페를 나갈 때 나의 테이블 상태는?', choices: ['쟁반과 쓰레기를 완벽하게 정리하고 나간다.', '대충 치우고 일어나거나 직원분께 맡긴다.'], type: 'JP' }
];

const results = {
    ESTJ: { title: '정석의 아이스 아메리카노', desc: '군더더기 없는 깔끔함과 확실한 에너지! 당신은 계획적이고 추진력이 뛰어난 리더예요.' },
    ESTP: { title: '톡 쏘는 청포도 에이드', desc: '어디서나 존재감 폭발! 당신은 활동적이고 적응력이 뛰어난 모험가 스타일이에요.' },
    ESFJ: { title: '달콤한 바닐라 라떼', desc: '누구에게나 호불호 없는 친절함! 당신은 주변 사람들을 잘 챙기는 따뜻한 배려가 넘쳐요.' },
    ESFP: { title: '화려한 딸기 파르페', desc: '인생은 축제! 당신은 밝고 긍정적인 에너지로 주변을 즐겁게 만드는 분위기 메이커예요.' },
    ISTJ: { title: '깊고 진한 따뜻한 홍차', desc: '변함없는 성실함과 신뢰! 당신은 원칙을 지키며 맡은 바 책임을 다하는 단단한 사람이에요.' },
    ISTP: { title: '쿨한 매력의 콜드브루', desc: '냉철한 판단력과 효율성! 당신은 필요한 말만 하는 담백하고 독립적인 스타일이에요.' },
    ISFJ: { title: '부드러운 밀크티', desc: '조용히 주변을 살피는 수호자! 당신은 헌신적이고 세심하게 타인을 돕는 따뜻한 마음을 가졌어요.' },
    ISFP: { title: '감성 가득한 녹차 라떼', desc: '예술적인 감각과 평화주의! 당신은 온화하고 현재의 행복을 소중히 여기는 낭만파예요.' },
    ENTJ: { title: '파워풀한 에너지 드링크', desc: '거침없는 야망과 결단력! 당신은 목표를 위해 전략적으로 움직이는 카리스마 리더예요.' },
    ENTP: { title: '기발한 민트초코 프라페', desc: '독창적인 아이디어 뱅크! 당신은 고정관념을 깨는 걸 즐기는 자유로운 사고의 소유자예요.' },
    INTJ: { title: '치밀한 더치커피', desc: '지적인 통찰력과 완벽주의! 당신은 미래를 설계하고 분석하는 것을 즐기는 전략가예요.' },
    INTP: { title: '알쏭달쏭한 아인슈페너', desc: '논리적이고 호기심 많은 철학자! 당신은 조용히 지적 세계를 탐험하는 지식인 스타일이에요.' },
    ENFJ: { title: '희망찬 레몬차', desc: '긍정적인 영향력을 전파하는 멘토! 당신은 타인의 성장을 돕고 이끄는 데 보람을 느껴요.' },
    ENFP: { title: '통통 튀는 패션후르츠 주스', desc: '무한한 상상력과 열정! 당신은 매일매일이 즐거운 호기심 가득한 자유로운 영혼이에요.' },
    INFJ: { title: '신비로운 보랏빛 타로 밀크티', desc: '깊은 통찰력과 강한 직관! 당신은 타인의 마음을 꿰뚫어 보는 신비한 매력이 있어요.' },
    INFP: { title: '몽글몽글 구름 스무디', desc: '순수한 감수성과 이상향! 당신은 자신만의 소중한 내면 세계를 간직한 낭만주의자예요.' }
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
