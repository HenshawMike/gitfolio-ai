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
    <div className="max-w-2xl w-full text-center py-16">
      <h2 className="text-3xl font-normal text-gray-900 mb-6">Ready to create your portfolio?</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your-github-username"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base placeholder-slate-400 text-slate-900"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-base font-medium shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : (
              <>
                Start
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
