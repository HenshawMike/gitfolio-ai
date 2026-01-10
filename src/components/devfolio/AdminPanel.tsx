"use client";
import React, { useState } from 'react';
import { Eye, Star, GitFork } from 'lucide-react';

type Repo = {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  selected: boolean;
};

type Data = {
  user: any;
  repos: Repo[];
  commits?: number;
};

type Props = {
  data: Data;
  onViewSite: () => void;
};

export default function AdminPanel({ data, onViewSite }: Props) {
  const [repos, setRepos] = useState<Repo[]>(data.repos);
  const selectedCount = repos.filter((r) => r.selected).length;

  const toggleRepo = (id: number) => {
    setRepos(repos.map(r => r.id === id ? { ...r, selected: !r.selected } : r));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={data.user.avatar} alt="" className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="font-semibold text-slate-900">{data.user.name}</h2>
              <p className="text-sm text-slate-500">@{data.user.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{selectedCount} repos selected</span>
            <button
              onClick={onViewSite}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Portfolio
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-slate-900 mb-2">Customize Your Portfolio</h1>
          <p className="text-slate-600">Select the repositories you want to feature on your portfolio site</p>
        </div>

        <div className="grid gap-4">
          {repos.map(repo => (
            <div
              key={repo.id}
              onClick={() => toggleRepo(repo.id)}
              className={`bg-white border-2 rounded-xl p-6 cursor-pointer transition-all ${repo.selected ? 'border-blue-500 shadow-md shadow-blue-100' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${repo.selected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                  {repo.selected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{repo.name}</h3>
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">{repo.language}</span>
                  </div>
                  <p className="text-slate-600 mb-4">{repo.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
