"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

type Props = {
  onSubmit: () => void;
  username: string;
  setUsername: (v: string) => void;
  loading: boolean;
};

export default function FinalCTA({ onSubmit, username, setUsername, loading }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = username.trim();
    const usernameRegex = /^[a-zA-Z0-9-]{1,39}$/;
    if (!value) return;
    if (!usernameRegex.test(value)) {
      alert('Please enter a valid GitHub username (no spaces, 1-39 chars).');
      return;
    }
    onSubmit();
  };

  return (
    <div className="max-w-2xl w-full text-center py-24 px-4">
      <div className="p-8 md:p-12 rounded-3xl glass relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 relative z-10">
          Ready to create your portfolio?
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="github-username"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-white placeholder-white/30 transition-all font-mono"
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black px-8 py-4 rounded-xl hover:bg-gray-100 transition-all font-bold shadow-lg shadow-white/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Loading...' : (
                <>
                  Start
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
          <p className="text-white/40 text-sm mt-4">
            Join thousands of developers building their brand.
          </p>
        </form>
      </div>
    </div>
  );
}
