import React from 'react';
import { Github, ExternalLink, Star, GitFork, Settings } from 'lucide-react';

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
  onBackToAdmin: () => void;
};

export default function PortfolioSite({ data, onBackToAdmin }: Props) {
  const selectedRepos = data.repos.filter(r => r.selected);
  const siteUrl = `${data.user.username}.devfolio.app`;

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm font-mono">{siteUrl}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToAdmin}
              className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Admin Panel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Share Site
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <img src={data.user.avatar} alt="" className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-500" />
          <h1 className="text-5xl font-bold text-white mb-4">{data.user.name}</h1>
          <p className="text-xl text-slate-400 mb-6">{data.user.bio}</p>
          <div className="flex items-center justify-center gap-8 text-slate-300">
            <span className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              @{data.user.username}
            </span>
            <span>{data.user.location}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{data.commits}</div>
            <div className="text-slate-400">Commits</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{selectedRepos.length}</div>
            <div className="text-slate-400">Projects</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{data.user.followers}</div>
            <div className="text-slate-400">Followers</div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {selectedRepos.map(repo => (
              <div key={repo.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{repo.name}</h3>
                  <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">{repo.language}</span>
                </div>
                <p className="text-slate-400 mb-4">{repo.description}</p>
                <div className="flex items-center justify-between">
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
                  <a href={repo.url} className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-medium">
                    View Code
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
