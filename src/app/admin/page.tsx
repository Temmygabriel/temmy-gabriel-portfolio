'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] grid-pattern flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#2E86AB]/20 border border-[#2E86AB]/40 flex items-center justify-center mx-auto mb-4">
            <span className="font-mono text-sm text-[#38B2D8] font-bold">TG</span>
          </div>
          <h1 className="text-2xl text-[#F0F4F8]" style={{ fontFamily: 'var(--font-display)' }}>
            Admin Panel
          </h1>
          <p className="text-[#5A7A94] text-sm mt-1 font-mono">temmy.gabriel portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0D1420] border border-[#1E2D3D] rounded-2xl p-8 space-y-5">
          <div>
            <label className="block font-mono text-xs text-[#5A7A94] mb-2 tracking-wide">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#080C14] border border-[#1E2D3D] rounded-lg px-4 py-3 text-[#F0F4F8] focus:outline-none focus:border-[#2E86AB] transition-colors font-mono text-sm"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#2E86AB] hover:bg-[#38B2D8] text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-[#5A7A94] text-xs mt-6 font-mono">
          ← <a href="/" className="hover:text-[#9DB4C8] transition-colors">Back to portfolio</a>
        </p>
      </div>
    </div>
  );
}
