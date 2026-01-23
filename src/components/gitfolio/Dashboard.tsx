"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Sparkles,
    Settings,
    CheckCircle,
    ArrowRight,
    Layers,
    Layout,
    Moon,
    Zap,
    Activity,
    PenTool,
    Boxes
} from 'lucide-react';

interface GitHubUser {
    name: string;
    username: string;
    avatar: string;
    bio: string;
}

interface Repo {
    id: number;
    name: string;
    description: string;
    stars: number;
    language: string;
}

interface DashboardProps {
    user: GitHubUser;
    repos: Repo[];
}

type Step = 'initial' | 'customize';

export default function Dashboard({ user, repos }: DashboardProps) {
    const router = useRouter();
    const [step, setStep] = useState<Step>('initial');
    const [customPrompt, setCustomPrompt] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    const startGeneration = () => {
        const params = new URLSearchParams();
        params.set('template', selectedTemplate);
        if (customPrompt) params.set('prompt', customPrompt);
        router.push(`/preview?${params.toString()}`);
    };



    return (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                        <img src={user.avatar} alt={user.username} className="relative w-16 h-16 rounded-full border-2 border-blue-500/30 shadow-2xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            Welcome, {user.username} <span className="text-blue-400">👋</span>
                        </h1>
                        <p className="text-blue-200/60 text-sm">
                            Your GitHub data will be used to generate your portfolio.
                        </p>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/50 flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        Connected
                    </div>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                <div className="space-y-12">
                    {/* Snapshot Card */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass p-8 rounded-3xl border border-white/10 space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Github className="w-5 h-5 text-blue-400" />
                                <h2 className="text-lg font-semibold text-white">GitHub Snapshot</h2>
                            </div>
                            <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                                Read Only
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-sm text-blue-200/80 leading-relaxed italic">
                                    "{user.bio || 'Building awesome things on GitHub'}"
                                </p>
                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Base Data</p>
                                    <p className="text-sm text-white/50 mt-1">
                                        {repos.length} Public Repositories analyzed
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Top Projects</p>
                                <div className="space-y-2">
                                    {repos.slice(0, 3).map(repo => (
                                        <div key={repo.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <code className="text-blue-400 text-sm font-mono truncate">{repo.name}</code>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs">
                                                <span className="text-white/40">{repo.language}</span>
                                                <span className="text-yellow-500/80 font-medium">★ {repo.stars}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-[10px] text-white/20 text-center">
                            This is the GitHub information GitFolio will use to generate your content.
                        </p>
                    </motion.div>

                    {/* Actions Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Option A - Quick Start */}
                        <motion.button
                            whileHover={{ scale: 1.02, translateY: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={startGeneration}
                            className="group relative p-8 rounded-3xl bg-white text-left overflow-hidden transition-all duration-300 shadow-2xl shadow-blue-500/10"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                <Sparkles className="w-24 h-24 text-black" />
                            </div>
                            <div className="relative space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black">Generate my portfolio</h3>
                                    <p className="text-black/60 text-sm mt-1 leading-relaxed">
                                        Automatically create a portfolio using your GitHub projects.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-black font-bold text-sm pt-4">
                                    Quick Start <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.button>

                        {/* Option B - Customize */}
                        <motion.button
                            whileHover={{ scale: 1.02, translateY: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep('customize')}
                            className={`group p-8 rounded-3xl border transition-all duration-300 text-left ${step === 'customize'
                                ? 'bg-blue-500 border-blue-400 shadow-xl shadow-blue-500/20'
                                : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                                }`}
                        >
                            <div className="space-y-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step === 'customize' ? 'bg-white/20' : 'bg-white/10 text-white'
                                    }`}>
                                    <Settings className={`w-6 h-6 ${step === 'customize' ? 'text-white' : 'text-blue-400'}`} />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${step === 'customize' ? 'text-white' : 'text-white'}`}>
                                        I want to customize it
                                    </h3>
                                    <p className={`text-sm mt-1 leading-relaxed ${step === 'customize' ? 'text-white/80' : 'text-white/40'}`}>
                                        Choose a style and describe what you want to highlight.
                                    </p>
                                </div>
                            </div>
                        </motion.button>
                    </div>

                    {/* Customize Panel */}
                    <AnimatePresence>
                        {step === 'customize' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="glass rounded-3xl border border-white/10 overflow-hidden"
                            >
                                <div className="p-8 space-y-8">
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <label className="text-sm font-semibold text-white/70">What should we highlight?</label>
                                            <textarea
                                                placeholder="Describe how you want your portfolio to look or what you want to emphasize..."
                                                value={customPrompt}
                                                onChange={(e) => setCustomPrompt(e.target.value)}
                                                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-sm font-semibold text-white/70">Choose a style</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { id: 'minimal', label: 'Minimal', icon: <Moon className="w-5 h-5" /> },
                                                    { id: 'dark', label: 'Dark', icon: <Moon className="w-5 h-5 text-blue-400" /> },
                                                    { id: 'modern', label: 'Modern', icon: <Layout className="w-5 h-5" /> },
                                                    { id: 'creative', label: 'Creative', icon: <Sparkles className="w-5 h-5 text-purple-400" /> }
                                                ].map(t => (
                                                    <button
                                                        key={t.id}
                                                        onClick={() => setSelectedTemplate(t.id)}
                                                        className={`p-4 rounded-2xl border transition-all text-left space-y-2 ${selectedTemplate === t.id
                                                            ? 'bg-blue-500/20 border-blue-500 text-white'
                                                            : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/[0.08]'
                                                            }`}
                                                    >
                                                        {t.icon}
                                                        <span className="block text-sm font-medium">{t.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4 border-t border-white/5">
                                        <button
                                            onClick={startGeneration}
                                            className="px-8 py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-400 transition-colors shadow-xl shadow-blue-500/20 flex items-center gap-2"
                                        >
                                            Generate portfolio <Sparkles className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </AnimatePresence>
        </div>
    );
}
