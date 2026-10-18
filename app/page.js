'use client';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setAnswer(data.error || 'Terjadi kesalahan pada server.');
      }
    } catch (err) {
      setAnswer('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#f4f4f5', padding: '24px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px', background: 'linear-gradient(to right, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Agil.ai
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '24px' }}>
          Mesin pencari & asisten AI pribadi Anda.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tanyakan sesuatu..."
            style={{ flex: 1, backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', padding: '0 20px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? '...' : 'Cari'}
          </button>
        </form>

        {answer && (
          <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '20px', textAlign: 'left', whiteSpace: 'pre-wrap', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: '#34d399' }}>Jawaban Agil.ai:</strong>
            {answer}
          </div>
        )}
      </div>
    </main>
  );
}
