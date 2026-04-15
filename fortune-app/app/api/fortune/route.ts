import { NextResponse } from 'next/server';

// Simple hash function to make fortune generation deterministic based on name
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export async function POST(request: Request) {
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const nameHash = hashCode(name);

  // Deterministic random number generator based on hash
  const pseudoRandom = (seed: number) => {
    let value = seed;
    return () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  };

  const random = pseudoRandom(nameHash);

  const score = Math.floor(random() * 101); // 0-100

  let message: string;
  if (score >= 90) {
    message = "오늘은 모든 것이 당신의 뜻대로 흘러갈 거예요! 행운이 가득합니다.";
  } else if (score >= 70) {
    message = "긍정적인 에너지가 가득한 하루! 작은 도전들이 좋은 결과로 이어질 거예요.";
  } else if (score >= 50) {
    message = "평범하지만 안정적인 하루입니다. 주변을 잘 살피면 좋은 기회를 찾을 수 있어요.";
  } else if (score >= 30) {
    message = "오늘은 조심스럽게 행동하는 것이 좋습니다. 작은 어려움이 있을 수 있어요.";
  } else {
    message = "다소 운이 따르지 않는 하루가 될 수 있지만, 긍정적인 마음을 잃지 마세요!";
  }

  const lunchOptions = [
    "든든한 제육볶음", "시원한 김치찌개", "매콤한 떡볶이", "상큼한 샐러드 파스타", "따뜻한 칼국수",
    "얼큰한 부대찌개", "고소한 비빔밥", "간단한 샌드위치", "새콤달콤 돈까스", "담백한 초밥"
  ];
  const dinnerOptions = [
    "화려한 스테이크", "푸짐한 삼겹살", "건강한 연어 스테이크", "매콤한 아귀찜", "향긋한 파스타",
    "전통 불고기", "해물찜", "중국집 코스 요리", "멕시칸 타코", "일식 오마카세"
  ];

  const lunchIndex = Math.floor(random() * lunchOptions.length);
  const dinnerIndex = Math.floor(random() * dinnerOptions.length);

  const lunch = lunchOptions[lunchIndex];
  const dinner = dinnerOptions[dinnerIndex];

  return NextResponse.json({ name, score, message, lunch, dinner });
}
