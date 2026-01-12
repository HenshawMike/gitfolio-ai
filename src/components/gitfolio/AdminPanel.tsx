"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Eye,
  Download,
  Share,
  Code,
  Palette,
  FileText,
  Github,
  Star,
  GitFork,
  Calendar,
  MapPin,
  Building,
  Mail,
  Globe,
  CheckCircle,
  XCircle,
  Edit3,
  Zap,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';

// Types for the data
interface GitHubUser {
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
}

interface Repo {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  selected: boolean;
}

interface GitHubData {
  user: GitHubUser;
  repos: Repo[];
  commits: number;
  pullRequests: number;
  issues: number;
}

interface AdminPanelProps {
  data: GitHubData;
  onViewSite: () => void;
}

// Loading component with professional progress
const LoadingScreen: React.FC<{ progress: number }> = ({ progress }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center z-50"
  >
    <div className="text-center space-y-8">
      <div className="text-6xl">🚀</div>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-white"
      >
        Building Your Portfolio
      </motion.h2>
      <div className="w-80 mx-auto">
        <div className="bg-white/20 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-pink-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <motion.p
          key={progress}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/80 text-sm"
        >
          {progress < 25 && "Analyzing your GitHub profile..."}
          {progress >= 25 && progress < 50 && "Selecting best projects..."}
          {progress >= 50 && progress < 75 && "Generating portfolio structure..."}
          {progress >= 75 && "Applying design and layout..."}
        </motion.p>
      </div>
    </div>
  </motion.div>
);

// Main AdminPanel component
const AdminPanel: React.FC<AdminPanelProps> = ({ data, onViewSite }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedRepos, setSelectedRepos] = useState(data.repos.filter(r => r.selected));
  const [customizations, setCustomizations] = useState({
    theme: 'dark',
    primaryColor: '#8B5CF6',
    showBio: true,
    showLocation: true,
    showStats: true
  });

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const toggleRepoSelection = (repoId: number) => {
    setSelectedRepos(prev =>
      prev.some(r => r.id === repoId)
        ? prev.filter(r => r.id !== repoId)
        : [...prev, data.repos.find(r => r.id === repoId)!]
    );
  };

  if (loading) {
    return <LoadingScreen progress={Math.min(progress, 100)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}

              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
            >
              GitFolio Studio
            </motion.div>
            <div className="text-white/60">•</div>
            <div className="text-white/80">{data.user.name}'s Portfolio</div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewSite}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center space-x-2"
            >
              <Share className="w-4 h-4" />
              <span>Publish</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-80 bg-black/20 backdrop-blur-lg border-r border-white/10 p-6 overflow-y-auto"
        >
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Github className="w-5 h-5" />
                <span>Profile</span>
              </h3>
              <div className="flex items-center space-x-3">
                <img src={data.user.avatar} alt={data.user.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-medium">{data.user.name}</div>
                  <div className="text-sm text-white/60">@{data.user.username}</div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked={customizations.showBio} className="rounded" />
                  <span>Bio: {data.user.bio}</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked={customizations.showLocation} className="rounded" />
                  <MapPin className="w-4 h-4" />
                  <span>{data.user.location}</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <Mail className="w-4 h-4" />
                  <span>{data.user.email}</span>
                </label>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">GitHub Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-400">{data.commits}</div>
                  <div className="text-xs text-white/60">Commits</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">{data.pullRequests}</div>
                  <div className="text-xs text-white/60">PRs</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{data.issues}</div>
                  <div className="text-xs text-white/60">Issues</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-400">{data.user.followers}</div>
                  <div className="text-xs text-white/60">Followers</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'projects' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'
                }`}
              >
                Projects ({selectedRepos.length})
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'design' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'
                }`}
              >
                Design
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'seo' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'
                }`}
              >
                SEO
              </button>
            </div>
          </div>
        </motion.div>

        {/* Center Preview */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 bg-white/5 backdrop-blur-lg m-4 rounded-2xl overflow-hidden"
        >
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">🔮</div>
              <h3 className="text-xl font-semibold">Portfolio Preview</h3>
              <p className="text-white/60">Live preview will appear here</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
              >
                Open Full Preview
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-96 bg-black/20 backdrop-blur-lg border-l border-white/10 p-6 overflow-y-auto"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold">Select Projects</h3>
                <div className="space-y-3">
                  {data.repos.map((repo) => (
                    <div
                      key={repo.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        selectedRepos.some(r => r.id === repo.id)
                          ? 'border-green-400 bg-green-400/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => toggleRepoSelection(repo.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{repo.name}</h4>
                            {selectedRepos.some(r => r.id === repo.id) ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-white/40" />
                            )}
                          </div>
                          <p className="text-sm text-white/60 mt-1">{repo.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-white/50">
                            <span className="flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>{repo.stars}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <GitFork className="w-3 h-3" />
                              <span>{repo.forks}</span>
                            </span>
                            <span>{repo.language}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'design' && (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Design Customization</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                      <option>Dark</option>
                      <option>Light</option>
                      <option>Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Color</label>
                    <input
                      type="color"
                      defaultValue={customizations.primaryColor}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Layout Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        Single Page
                      </button>
                      <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        Multi Page
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div
                key="seo"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>SEO Optimization</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Title</label>
                    <input
                      type="text"
                      defaultValue={`${data.user.name} - Developer Portfolio`}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Description</label>
                    <textarea
                      rows={3}
                      defaultValue={`Portfolio of ${data.user.name}, a ${data.user.bio}. View my projects and get in touch.`}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2"
                    ></textarea>
                  </div>
                </div>
                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">SEO Score: 85/100</span>
                  </div>
                  <p className="text-xs text-green-300 mt-1">Good! Consider adding more keywords.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;