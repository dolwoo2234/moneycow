"use client";

import { useState } from 'react';

interface Fortune {
  score: number;
  message: string;
  lunch: string;
  dinner: string;
}

export default function Home() {
  const [name, setName] = useState<string>('');
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('운세 확인 버튼 클릭됨, 이름:', name);
    setLoading(true);
    setFortune(null);
    setError(null);

    try {
      console.log('API 호출 시작...');
      const response = await fetch('/api/fortune', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      console.log('API 응답 상태:', response.status);

      if (!response.ok) {
        throw new Error('Failed to fetch fortune');
      }

      const data: Fortune = await response.json();
      console.log('받은 운세 데이터:', data);
      setFortune(data);
    } catch (err) {
      console.error('운세 호출 중 오류 발생:', err);
      setError('운세를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-5">
      <h1 className="display-4 fw-bold text-primary mb-4">오늘의 운세</h1>

      <div className="card shadow-lg p-4 p-md-5 w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group mb-3">
              <label htmlFor="nameInput" className="form-label fs-5">이름을 입력하세요:</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="nameInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 홍길동"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
              {loading ? '운세 확인 중...' : '운세 확인하기'}
            </button>
          </form>

          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              {error}
            </div>
          )}

          {fortune && (
            <div className="mt-4 text-center">
              <h2 className="fs-3 text-secondary mb-3">{name} 님의 오늘의 운세</h2>
              
              <div className="mb-4">
                <p className="fs-1 fw-bold text-success mb-2">{fortune.score}점</p>
                <p className="fs-5">{fortune.message}</p>
              </div>

              <div className="row mt-4">
                <div className="col-md-6 mb-3 mb-md-0">
                  <div className="card h-100 bg-light border-primary">
                    <div className="card-body">
                      <h3 className="card-title fs-4 text-primary">점심 추천</h3>
                      <p className="card-text fs-5">{fortune.lunch}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 bg-light border-primary">
                    <div className="card-body">
                      <h3 className="card-title fs-4 text-primary">저녁 추천</h3>
                      <p className="card-text fs-5">{fortune.dinner}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-5 text-muted">
        <p>&copy; {new Date().getFullYear()} 오늘의 운세. All rights reserved.</p>
      </footer>
    </main>
  );
}