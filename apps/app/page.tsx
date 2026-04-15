"use client";

import Link from 'next/link';

export default function Home() {
  const apps = [
    {
      title: "오늘의 운세",
      description: "당신의 오늘 하루 점수와 추천 메뉴를 확인해보세요!",
      icon: "🍀",
      href: "/fortune",
      color: "bg-primary"
    },
    {
      title: "나는 어떤 빵일까?",
      description: "재미있는 빵 심리테스트로 나의 MBTI 성향을 알아보세요.",
      icon: "🍞",
      href: "/quiz/index.html",
      color: "bg-warning"
    }
  ];

  return (
    <main className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-5">
      <header className="text-center mb-5">
        <h1 className="display-3 fw-bold text-dark mb-3">BREAD & FORTUNE</h1>
        <p className="fs-4 text-muted">원하시는 서비스를 선택해주세요</p>
      </header>

      <div className="row g-4 w-100 justify-content-center" style={{ maxWidth: '900px' }}>
        {apps.map((app, index) => (
          <div key={index} className="col-md-6">
            <Link href={app.href} style={{ textDecoration: 'none' }}>
              <div className="card h-100 shadow-sm border-0 p-4 text-center hover-card transition-all" style={{ cursor: 'pointer', borderRadius: '20px' }}>
                <div className="card-body">
                  <div className="display-1 mb-4">{app.icon}</div>
                  <h2 className="card-title fw-bold mb-3">{app.title}</h2>
                  <p className="card-text text-muted fs-5 mb-4">{app.description}</p>
                  <div className={`btn ${app.color} text-white btn-lg px-5 rounded-pill`}>
                    시작하기
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>

      <footer className="mt-5 pt-5 text-muted">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </footer>
    </main>
  );
}
