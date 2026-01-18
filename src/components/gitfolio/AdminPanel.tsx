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
    <div className="min-h-screen text-foreground">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass sticky top-0 z-40 border-b border-border p-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text cursor-pointer"
            >
              GitFolio Studio
            </motion.div>
            <div className="text-muted-foreground">•</div>
            <div className="text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border">
              {data.user.name}'s Portfolio
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewSite}
              className="px-4 py-2 glass hover:bg-white/10 rounded-lg flex items-center space-x-2 transition-colors border border-border"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center space-x-2 shadow-lg shadow-primary/20"
            >
              <Share className="w-4 h-4" />
              <span>Publish</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)] overflow-hidden">
        {/* Left Sidebar */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-80 glass border-r border-border p-6 overflow-y-auto"
        >
          <div className="space-y-8">
            {/* Profile Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Github className="w-4 h-4" />
                Profile
              </h3>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary/30 border border-border">
                <img src={data.user.avatar} alt={data.user.name} className="w-10 h-10 rounded-full border-2 border-primary/20" />
                <div className="overflow-hidden">
                  <div className="font-medium truncate">{data.user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">@{data.user.username}</div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="flex items-start space-x-3 p-2 hover:bg-secondary/30 rounded-lg transition-colors cursor-pointer group">
                  <input type="checkbox" defaultChecked={customizations.showBio} className="mt-1 rounded border-border bg-secondary text-primary focus:ring-primary" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">{data.user.bio}</span>
                </label>
                <label className="flex items-center space-x-3 p-2 hover:bg-secondary/30 rounded-lg transition-colors cursor-pointer group">
                  <input type="checkbox" defaultChecked={customizations.showLocation} className="rounded border-border bg-secondary text-primary focus:ring-primary" />
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{data.user.location}</span>
                </label>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">GitHub Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/20 border border-border rounded-xl p-3 text-center hover:border-primary/50 transition-colors">
                  <div className="text-xl font-bold text-foreground">{data.commits}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Commits</div>
                </div>
                <div className="bg-secondary/20 border border-border rounded-xl p-3 text-center hover:border-primary/50 transition-colors">
                  <div className="text-xl font-bold text-foreground">{data.pullRequests}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">PRs</div>
                </div>
                <div className="bg-secondary/20 border border-border rounded-xl p-3 text-center hover:border-primary/50 transition-colors">
                  <div className="text-xl font-bold text-foreground">{data.issues}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Issues</div>
                </div>
                <div className="bg-secondary/20 border border-border rounded-xl p-3 text-center hover:border-primary/50 transition-colors">
                  <div className="text-xl font-bold text-foreground">{data.user.followers}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Followers</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'projects' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  }`}
              >
                <span>Projects</span>
                <span className="bg-background/50 px-2 py-0.5 rounded text-xs">{selectedRepos.length}</span>
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'design' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  }`}
              >
                <span>Design</span>
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'seo' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  }`}
              >
                <span>SEO</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Center Preview */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 bg-secondary/10 m-4 rounded-2xl border border-border overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="h-full flex items-center justify-center relative">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="text-4xl">✨</div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Portfolio Preview</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Your changes update in real-time. Click the button below to see the full experience.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-foreground text-background font-medium rounded-full hover:opacity-90 transition-opacity"
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
          className="w-96 glass border-l border-border p-6 overflow-y-auto"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Select Projects</h3>
                  <span className="text-xs text-muted-foreground">{selectedRepos.length} selected</span>
                </div>
                <div className="space-y-3">
                  {data.repos.map((repo) => (
                    <div
                      key={repo.id}
                      className={`group p-4 rounded-xl border transition-all cursor-pointer ${selectedRepos.some(r => r.id === repo.id)
                          ? 'border-primary/50 bg-primary/5'
                          : 'border-border bg-secondary/10 hover:border-border/80 hover:bg-secondary/20'
                        }`}
                      onClick={() => toggleRepoSelection(repo.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium truncate">{repo.name}</h4>
                            {selectedRepos.some(r => r.id === repo.id) && (
                              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{repo.description}</p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              <span>{repo.stars}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="w-3 h-3" />
                              <span>{repo.forks}</span>
                            </span>
                            {repo.language && (
                              <span className="px-1.5 py-0.5 rounded-full bg-secondary border border-border">
                                {repo.language}
                              </span>
                            )}
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
                className="space-y-6"
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Design Customization
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Theme</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Dark', 'Light', 'Auto'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setCustomizations(prev => ({ ...prev, theme: theme.toLowerCase() }))}
                          className={`px-3 py-2 rounded-lg text-sm border transition-all ${customizations.theme === theme.toLowerCase()
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-secondary/20 border-border hover:bg-secondary/40'
                            }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Primary Color</label>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-secondary/20 border border-border">
                      <input
                        type="color"
                        value={customizations.primaryColor}
                        onChange={(e) => setCustomizations(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
                      />
                      <span className="text-sm font-mono text-muted-foreground">{customizations.primaryColor}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Layout Style</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-xl border border-primary/50 bg-primary/5 flex flex-col items-center gap-2 text-primary">
                        <div className="w-8 h-12 border border-current rounded border-dashed opacity-50" />
                        <span className="text-xs font-medium">Single Page</span>
                      </button>
                      <button className="p-4 rounded-xl border border-border bg-secondary/10 flex flex-col items-center gap-2 text-muted-foreground hover:bg-secondary/20 transition-colors">
                        <div className="w-8 h-12 border border-current rounded border-dashed opacity-50 flex flex-col gap-1">
                          <div className="h-2 border-b border-current border-dashed" />
                          <div className="h-2 border-b border-current border-dashed" />
                        </div>
                        <span className="text-xs font-medium">Multi Page</span>
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
                className="space-y-6"
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  SEO Optimization
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Meta Title</label>
                    <input
                      type="text"
                      defaultValue={`${data.user.name} - Developer Portfolio`}
                      className="w-full bg-secondary/20 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Meta Description</label>
                    <textarea
                      rows={4}
                      defaultValue={`Portfolio of ${data.user.name}, a ${data.user.bio}. View my projects and get in touch.`}
                      className="w-full bg-secondary/20 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-green-500 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-bold">SEO Score: 85/100</span>
                  </div>
                  <p className="text-xs text-green-600/80">Great start! Adding more relevant keywords to your description could boost visibility.</p>
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