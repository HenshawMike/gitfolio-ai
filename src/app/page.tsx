'use client';
import React, { useState } from 'react';
import Hero from '../components/gitfolio/Hero';
import AdminPanel from '../components/gitfolio/AdminPanel';
import PortfolioSite from '../components/gitfolio/PortfolioSite';

// Mock GitHub data for demonstration
const mockGitHubData = {
  user: {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Full-stack developer passionate about open source',
    location: 'San Francisco, CA',
    followers: 234,
    following: 189,
  },
  repos: [
    { id: 1, name: 'awesome-react-app', description: 'A modern React application with TypeScript', stars: 45, forks: 12, language: 'TypeScript', url: 'https://github.com', selected: true },
    { id: 2, name: 'nodejs-api-boilerplate', description: 'Production-ready Node.js API template', stars: 89, forks: 23, language: 'JavaScript', url: 'https://github.com', selected: true },
    { id: 3, name: 'css-animations-library', description: 'Beautiful CSS animations collection', stars: 156, forks: 34, language: 'CSS', url: 'https://github.com', selected: true },
    { id: 4, name: 'python-data-viz', description: 'Data visualization tools in Python', stars: 67, forks: 15, language: 'Python', url: 'https://github.com', selected: false },
    { id: 5, name: 'machine-learning-playground', description: 'ML experiments and tutorials', stars: 234, forks: 56, language: 'Python', url: 'https://github.com', selected: true }
  ],
  commits: 1247,
  pullRequests: 89,
  issues: 145,
};

export default function LandingPage() {
  const [page, setPage] = useState<'landing' | 'admin' | 'portfolio'>('landing');
  const [portfolioInput, setPortfolioInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (portfolioInput.trim().length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPage('admin');
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleViewSite = () => setPage('portfolio');
  const handleBackToAdmin = () => setPage('admin');

  if (page === 'admin') {
    return <AdminPanel data={mockGitHubData} onViewSite={handleViewSite} />;
  }

  if (page === 'portfolio') {
    return <PortfolioSite data={mockGitHubData} onBackToAdmin={handleBackToAdmin} />;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <main className="flex items-center justify-center min-h-screen px-6">
        <Hero portfolioInput={portfolioInput} setPortfolioInput={setPortfolioInput} handleSubmit={handleSubmit} handleKeyPress={handleKeyPress} />
      </main>
    </div>
  );
}