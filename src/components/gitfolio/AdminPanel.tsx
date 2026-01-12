"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Palette,
  Code,
  Download,
  Eye,
  Share,
  Github,
  Star,
  GitFork,
  Calendar,
  MapPin,
  Building,
  Mail,
  Globe,
  ChevronRight,
  Check,
  X,
  Play,
  Terminal,
  FileText,
  Zap,
  Sparkles
} from 'lucide-react';

interface GitHubData {
  user: {
    name: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
    location: string;
    followers: number;
    following: number;
  };
  repos: Array<{
    id: number;
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
    selected: boolean;
  }>;
  commits: number;
  pullRequests: number;
  issues: number;
}

interface AdminPanelProps {
  data: GitHubData;
  onViewSite: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ data, onViewSite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedRepos, setSelectedRepos] = useState(data.repos.filter(repo => repo.selected));

  const loadingSteps = [
    "Analyzing your GitHub profile...",
    "Selecting best projects...",
    "Generating portfolio structure...",
    "Applying design and layout..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(prev + increment, 100);
        setCurrentStep(Math.floor((newProgress / 100) * loadingSteps.length));
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const toggleRepoSelection = (repoId: number) => {
    setSelectedRepos(prev =>
      prev.some(repo => repo.id === repoId)
        ? prev.filter(repo => repo.id !== repoId)
        : [...prev, data.repos.find(repo => repo.id === repoId)!]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full mx-4"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <Sparkles className="w-full h-full text-yellow-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Building Your Portfolio</h2>
            <p className="text-white/80">{loadingSteps[currentStep] || loadingSteps[0]}</p>
          </div>

          <div className="space-y-4">
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                style={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>Progress</span>
              <span>{Math.round(loadingProgress)}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">GitFolio Studio</h1>
              <p className="text-sm text-white/60">Welcome back, {data.user.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewSite}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-shadow"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg font-medium flex items-center space-x-2 hover:bg-green-500/30 transition-colors"
            >
              <Share className="w-4 h-4" />
              <span>Publish</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Dashboard */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto"
        >
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={data.user.avatar}
                  alt={data.user.name}
                  className="w-12 h-12 rounded-full border-2 border-white/20"
                />
                <div>
                  <h3 className="font-semibold">{data.user.name}</h3>
                  <p className="text-sm text-white/60">@{data.user.username}</p>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-3">{data.user.bio}</p>
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{data.user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Github className="w-4 h-4" />
                  <span>{data.followers} followers</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-2">
              {[
                { id: 'projects', label: 'Projects', icon: Github },
                { id: 'design', label: 'Design', icon: Palette },
                { id: 'code', label: 'Code Editor', icon: Code },
                { id: 'terminal', label: 'Terminal', icon: Terminal },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </motion.button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h4 className="font-semibold mb-3">GitHub Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{data.commits}</div>
                  <div className="text-xs text-white/60">Commits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{data.pullRequests}</div>
                  <div className="text-xs text-white/60">PRs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{data.issues}</div>
                  <div className="text-xs text-white/60">Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{selectedRepos.length}</div>
                  <div className="text-xs text-white/60">Selected</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Center Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 bg-black/10 backdrop-blur-sm p-6"
          >
            <div className="bg-white/5 rounded-2xl h-full border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold">Portfolio Preview</h2>
              </div>
              <div className="p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
                  <p className="text-white/60 mb-4">Your portfolio will appear here</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onViewSite}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium"
                  >
                    Open Full Preview
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-96 bg-black/20 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto"
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
                  <h3 className="text-lg font-semibold mb-4">Select Projects</h3>
                  <div className="space-y-3">
                    {data.repos.map((repo) => (
                      <motion.div
                        key={repo.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          selectedRepos.some(r => r.id === repo.id)
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                        onClick={() => toggleRepoSelection(repo.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{repo.name}</h4>
                          {selectedRepos.some(r => r.id === repo.id) ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <div className="w-5 h-5 border border-white/30 rounded" />
                          )}
                        </div>
                        <p className="text-sm text-white/70 mb-3">{repo.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span>{repo.stars}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GitFork className="w-4 h-4 text-white/60" />
                              <span>{repo.forks}</span>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-white/10 rounded text-xs">{repo.language}</span>
                        </div>
                      </motion.div>
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
                  <h3 className="text-lg font-semibold mb-4">Design Customization</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Theme</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Light', 'Dark', 'Auto'].map((theme) => (
                          <button
                            key={theme}
                            className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Primary Color</label>
                      <div className="flex space-x-2">
                        {['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'].map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Layout</label>
                      <div className="space-y-2">
                        {['Single Page', 'Multi Page', 'Grid', 'Minimal'].map((layout) => (
                          <button
                            key={layout}
                            className="w-full p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-left text-sm"
                          >
                            {layout}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Code Editor</h3>
                  <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                    <div className="text-center py-8">
                      <Code className="w-12 h-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">Code editor will be integrated here</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'terminal' && (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Terminal</h3>
                  <div className="bg-black/60 rounded-xl p-4 border border-white/10 font-mono text-sm">
                    <div className="text-green-400 mb-2">$ gitfolio --help</div>
                    <div className="text-white/80">Welcome to GitFolio Terminal</div>
                    <div className="text-white/60">Type 'help' for available commands</div>
                    <div className="mt-4 flex items-center">
                      <span className="text-green-400 mr-2">$</span>
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span>Auto-save</span>
                      <div className="w-10 h-6 bg-green-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span>SEO Optimization</span>
                      <div className="w-10 h-6 bg-green-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Source Code</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;