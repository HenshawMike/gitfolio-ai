"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Sparkles,
    Settings,
    CheckCircle,
    ArrowRight,
    Layout,
    Moon,
    Zap,
    PenTool,
    Boxes,
} from "lucide-react";

/* ---------- Types ---------- */

interface GitHubUser {
    name: string;
    username: string;
    email?: string;
    avatar: string;
    bio: string;
    location?: string;
    followers?: number;
    following?: number;
}

interface Repo {
    id: number;
    name: string;
    description: string;
    stars: number;
    language: string;
    selected?: boolean;
}

interface DashboardData {
    user: GitHubUser;
    repos: Repo[];
    commits?: number;
    pullRequests?: number;
    issues?: number;
}

interface DashboardProps {
    data: DashboardData;
    onViewSite?: () => void;
}

type Step = "initial" | "customize" | "generating" | "complete";

/* ---------- Component ---------- */

export default function Dashboard({ data, onViewSite }: DashboardProps) {
    const { user, repos } = data;

    const [step, setStep] = useState<Step>("initial");
    const [customPrompt, setCustomPrompt] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("modern");
    const [genProgress, setGenProgress] = useState(0);

    const genSteps = [
        { label: "Analyzing GitHub", icon: <Boxes className="w-5 h-5" /> },
        { label: "Generating content", icon: <PenTool className="w-5 h-5" /> },
        { label: "Building portfolio", icon: <Zap className="w-5 h-5" /> },
    ];

    const currentGenStepIndex = Math.min(
        Math.floor((genProgress / 100) * genSteps.length),
        genSteps.length - 1
    );

    const startGeneration = () => {
        setStep("generating");
        setGenProgress(0);
    };

    useEffect(() => {
        if (step === "generating") {
            const interval = setInterval(() => {
                setGenProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setStep("complete"), 500);
                        return 100;
                    }
                    return prev + Math.random() * 5;
                });
            }, 200);

            return () => clearInterval(interval);
        }
    }, [step]);

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
                        <img
                            src={user.avatar}
                            alt={user.username}
                            className="relative w-16 h-16 rounded-full border-2 border-blue-500/30"
                        />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Welcome, {user.username}
                        </h1>
                        <p className="text-sm text-blue-200/60">
                            Your GitHub data will be used to generate your portfolio.
                        </p>
                    </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                    <Github className="w-4 h-4" />
                    Connected
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {step === "generating" && (
                    <motion.div
                        key="generating"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="glass p-12 rounded-3xl border border-white/10 text-center space-y-8"
                    >
                        <div className="relative w-24 h-24 mx-auto">
                            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
                            <motion.div
                                className="absolute inset-0 border-4 border-t-blue-500 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">
                                Building your portfolio
                            </h2>

                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                    animate={{ width: `${genProgress}%` }}
                                />
                            </div>

                            <div className="flex flex-col items-start gap-3 max-w-md mx-auto">
                                {genSteps.map((s, i) => (
                                    <div
                                        key={s.label}
                                        className={`flex items-center gap-3 ${i <= currentGenStepIndex
                                                ? "text-blue-400"
                                                : "text-white/20"
                                            }`}
                                    >
                                        {i < currentGenStepIndex ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            s.icon
                                        )}
                                        <span className="text-sm">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass p-12 rounded-3xl border border-white/10 text-center space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-white">
                            Your portfolio is ready
                        </h2>

                        <button
                            onClick={onViewSite}
                            className="px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center gap-2 mx-auto"
                        >
                            View My Portfolio
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {step === "initial" && (
                    <div className="space-y-8">
                        <div className="glass p-8 rounded-3xl border border-white/10">
                            <p className="text-white/70 mb-4">
                                {repos.length} repositories analyzed
                            </p>

                            <div className="space-y-2">
                                {repos.slice(0, 3).map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="flex justify-between p-3 rounded-xl bg-white/[0.03]"
                                    >
                                        <span className="text-blue-400 font-mono text-sm">
                                            {repo.name}
                                        </span>
                                        <span className="text-yellow-500 text-sm">
                                            ★ {repo.stars}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={startGeneration}
                                className="p-8 rounded-3xl bg-white text-black text-left"
                            >
                                <Zap className="w-6 h-6 mb-4" />
                                <h3 className="text-xl font-bold">Generate my portfolio</h3>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStep("customize")}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left"
                            >
                                <Settings className="w-6 h-6 mb-4 text-blue-400" />
                                <h3 className="text-xl font-bold text-white">
                                    Customize it
                                </h3>
                            </motion.button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
