'use client';
import { useState } from 'react';
import { Search, Globe, Loader2, Sparkles, ExternalLink } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Gagal memproses pencarian');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
          Agil.ai
        </h1>
        <p className="text-gray-400 text-sm mb-8">Tanyakan apa saja, cari di seluruh internet.</p>
        
        <form onSubmit={handleSearch} className="relative flex items-center mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik pertanyaan Anda di sini..."
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-2xl py-4 pl-12 pr-16 outline-none focus:border-blue-500 text-white"
          />
          <Search className="absolute left-4 w-5 h-5 text-gray-500" />
          <button type="submit" disabled={loading || !query} className="absolute right-2 p-2 bg-blue-600 rounded-xl text-white">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </form>

        {result && result.answer && (
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 text-left shadow-2xl text-sm leading-relaxed">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold border-b border-gray-800 pb-3">
              <Sparkles className="w-4 h-4" /> Jawaban Agil.ai
            </div>
            <div className="whitespace-pre-wrap text-gray-200">{result.answer}</div>
            
            {result.sources && result.sources.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2 mb-3 text-blue-400 font-bold text-xs">
                  <Globe className="w-4 h-4" /> Referensi Pencarian Web
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.sources.map((src, i) => (
                    <a key={i} href={src.url} target="_blank" className="flex items-center gap-1 bg-[#1a1a1a] px-3 py-1.5 rounded-lg text-xs text-gray-300 hover:text-white border border-gray-700">
                      <span className="truncate max-w-[150px]">{src.title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
              }
