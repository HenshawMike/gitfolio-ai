"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

type Props = {
  onSubmit: () => void;
  username: string;
  setUsername: (v: string) => void;
  loading: boolean;
};

export default function Hero({ onSubmit, username, setUsername, loading }: Props) {
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
    <div className="max-w-2xl w-full text-center">
      <h1 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 leading-tight">
        Turn your GitHub into a portfolio
      </h1>
      <p className="text-xl text-gray-600 mb-12 font-light">
        Enter your GitHub email and automatically generate a beautiful portfolio website in minutes.
      </p>

      <div className="flex flex-col items-center gap-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
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
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-500">Free • No credit card required</p>
      </div>
    </div>
  );
}
