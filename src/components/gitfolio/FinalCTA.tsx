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
    <div className="max-w-2xl w-full text-center py-20 px-4">
      <div className="p-8 md:p-12 rounded-2xl border border-border bg-card shadow-sm relative overflow-hidden text-card-foreground">

        <h2 className="text-3xl md:text-4xl font-bold mb-8 relative z-10 text-foreground">
          Ready to create your portfolio?
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="github-username"
              className="flex-1 px-5 py-3.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-input text-foreground placeholder:text-muted-foreground transition-all font-mono"
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg hover:bg-primary/90 transition-all font-semibold shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Loading...' : (
                <>
                  Start
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          <p className="text-muted-foreground/80 text-sm mt-4">
            Join thousands of developers building their brand.
          </p>
        </form>
      </div>
    </div>
  );
}
