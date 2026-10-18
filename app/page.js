'use client';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (!apiKey.trim()) {
      alert('Masukkan Gemini API Key terlebih dahulu di kolom bawah!');
      return;
    }

    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: query }] }]
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setAnswer(data.candidates[0].content.parts[0].text);
      } else {
        setAnswer('Gagal mendapatkan respons. Periksa kembali API Key Anda.');
      }
    } catch (err) {
      setAnswer('Terjadi kesalahan koneksi.');
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

        {/* Form Input Pertanyaan */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
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

        {/* Input API Key langsung di halaman agar tidak ribet di Vercel */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <label style={{ fontSize: '0.75rem', color: '#71717a', display: 'block', marginBottom: '4px' }}>
            Masukkan Gemini API Key Anda (agar bisa langsung jalan):
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '0.85rem', outline: 'none' }}
          />
        </div>

        {/* Kotak Jawaban */}
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
