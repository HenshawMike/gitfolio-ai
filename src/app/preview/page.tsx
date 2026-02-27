"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    CheckCircle,
    ArrowRight,
    Zap,
    Boxes,
    PenTool,
    Loader2,
    ExternalLink,
    Smartphone,
    Monitor,
    Tablet,
    RefreshCw,
    Sparkles,
    Send,
    Code2,
    Layout,
    Github,
    Mail,
    ChevronRight,
    Search
} from 'lucide-react';
import Link from 'next/link';

const logMessages = [
    "> gitfolio-ai initializing...",
    "> Analyzing repository structure...",
    "> Found Next.js project detected.",
    "> Reading package.json...",
    "> Identifying component patterns...",
    "> Generating component: Header.tsx...",
    "> Generating component: Hero.tsx...",
    "> Generating component: ProjectsGrid.tsx...",
    "> Styling with Tailwind CSS...",
    "> Optimizing assets...",
    "> Building production bundle...",
    "> Finalizing deployment...",
    "> Done! Portfolio ready."
];

const MockPortfolio = () => (
    <div className="w-full h-full bg-[#050505] overflow-y-auto font-sans text-slate-200">
        {/* Modern Glassy Header */}
        <header className="relative py-24 px-8 flex flex-col items-center text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full -z-10" />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-28 h-28 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-3xl mb-8 shadow-2xl rotate-3 flex items-center justify-center p-1"
            >
                <div className="w-full h-full bg-[#0a0a0a] rounded-[22px] flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-blue-500" />
                </div>
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
            >
                Henshaw Mike
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-xl font-medium max-w-2xl"
            >
                Software Engineer crafting immersive digital experiences through code & design.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center gap-4 mt-10"
            >
                <button className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all flex items-center gap-2">
                    Let&apos;s Talk <Mail className="w-4 h-4" />
                </button>
                <button className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                    Source Code <Github className="w-4 h-4" />
                </button>
            </motion.div>
        </header>

        {/* Dynamic Project Grid */}
        <main className="max-w-6xl mx-auto px-8 pb-32">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Layout className="w-7 h-7 text-blue-500" />
                    Works
                </h2>
                <div className="flex gap-2">
                    {['All', 'Web', 'Mobile', 'Design'].map(tab => (
                        <button key={tab} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === 'All' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl p-4 overflow-hidden"
                    >
                        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
                            <Code2 className="w-12 h-12 text-white/5 group-hover:scale-125 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="px-2">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Project Solaris</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                A decentralized cloud management platform with real-time analytics.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-[10px] rounded-full font-bold uppercase tracking-wider">Next.js 14</span>
                                <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-[10px] rounded-full font-bold uppercase tracking-wider">AWS/Lamba</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </main>
    </div>
);

export default function PreviewPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'building' | 'preview'>('building');
    const [logs, setLogs] = useState<string[]>([]);
    const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const containerRef = useRef<HTMLDivElement>(null);

    // Chat State
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'system', content: string }[]>([
        { role: 'system', content: "Generated 3 components and styled your portfolio. What would you like to tweak?" }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    useEffect(() => {
        if (status === 'building') {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex >= logMessages.length) {
                    clearInterval(interval);
                    setTimeout(() => setStatus('preview'), 1500);
                    return;
                }
                setLogs(prev => [...prev, logMessages[currentIndex]]);
                currentIndex++;

                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }, 600);
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;
        setChatMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
        setInputMessage("");

        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                role: 'system',
                content: `Processing update: "${inputMessage}". Refactoring components now...`
            }]);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
            {/* Ultra-Modern Navbar */}
            <header className="h-14 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-[60]">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180 text-white/40 group-hover:text-white" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                            {status === 'building' ? 'Build in Progress' : 'Design Editor'}
                        </span>
                    </div>
                </div>

                {status === 'preview' && (
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex bg-[#050505] p-1 rounded-xl border border-white/5">
                            {(['mobile', 'tablet', 'desktop'] as const).map((device) => (
                                <button
                                    key={device}
                                    onClick={() => setPreviewDevice(device)}
                                    className={`p-1.5 rounded-lg transition-all ${previewDevice === device
                                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'
                                        : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    {device === 'mobile' && <Smartphone className="w-4 h-4" />}
                                    {device === 'tablet' && <Tablet className="w-4 h-4" />}
                                    {device === 'desktop' && <Monitor className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                        <button className="bg-white text-black px-4 py-1.5 rounded-lg text-xs font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">
                            Ready to Ship
                        </button>
                    </div>
                )}
            </header>

            <main className="h-[calc(100vh-3.5rem)] overflow-hidden">
                <AnimatePresence mode="wait">
                    {status === 'building' ? (
                        <motion.div
                            key="building"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="h-full grid md:grid-cols-2"
                        >
                            <div className="p-12 flex flex-col justify-center max-w-2xl mx-auto w-full">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-tighter">
                                        <Sparkles className="w-3 h-3" /> AI Portolio Engine
                                    </div>
                                    <h2 className="text-5xl font-black tracking-tight leading-tight">
                                        Crafting your <br />
                                        <span className="text-blue-500">unique identity.</span>
                                    </h2>
                                    <p className="text-white/40 text-lg">
                                        Analyzing your GitHub profile to build a custom-tailored portfolio that stands out.
                                    </p>
                                </motion.div>

                                <div className="mt-12 group">
                                    <div
                                        ref={containerRef}
                                        className="h-[300px] bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 font-mono text-[13px] overflow-y-auto scrollbar-hide space-y-2.5 shadow-2xl"
                                    >
                                        {logs.map((log, i) => {
                                            if (!log) return null;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-start gap-3 group/line"
                                                >
                                                    <span className="text-blue-500/50 select-none">{(i + 1).toString().padStart(2, '0')}</span>
                                                    <span className={log.includes("Done") ? "text-green-400 font-bold" : "text-white/70"}>
                                                        {log.replace("> ", "")}
                                                    </span>
                                                </motion.div>
                                            );
                                        })}
                                        <div className="w-2 h-4 bg-blue-500 animate-pulse inline-block align-middle ml-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:flex bg-[#080808] border-l border-white/5 items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-blue-600/5 animate-pulse" />
                                <div className="w-[85%] h-[80%] bg-gradient-to-tr from-[#0a0a0a] to-[#111] rounded-[2.5rem] border border-white/10 p-8 relative shadow-2xl">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/60 backdrop-blur-[2px] z-20">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                                            <Loader2 className="w-16 h-16 text-blue-500 animate-spin relative" />
                                        </div>
                                        <p className="mt-6 text-white/40 text-sm font-medium tracking-widest uppercase animate-pulse">Designing Interface...</p>
                                    </div>
                                    {/* Mock shapes for skeleton */}
                                    <div className="space-y-6 opacity-20">
                                        <div className="w-20 h-20 bg-white/10 rounded-2xl mx-auto" />
                                        <div className="h-8 bg-white/10 rounded-lg w-1/2 mx-auto" />
                                        <div className="grid grid-cols-2 gap-4 mt-12">
                                            <div className="h-40 bg-white/5 rounded-2xl" />
                                            <div className="h-40 bg-white/5 rounded-2xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex"
                        >
                            {/* Editor Sidebar */}
                            <div className="w-[380px] border-r border-white/5 bg-[#0a0a0a] flex flex-col z-[50]">
                                <div className="p-6 border-b border-white/5">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="p-1.5 bg-blue-500/10 rounded-lg">
                                            <Sparkles className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <h2 className="font-bold text-sm tracking-tight">AI Assistant</h2>
                                    </div>
                                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider">Customization Active</p>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                                    {chatMessages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.role === 'user'
                                                ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                                                : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

                                <div className="p-6 bg-[#0a0a0a]">
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-px opacity-20 group-focus-within:opacity-100 transition-opacity" />
                                        <div className="relative bg-[#050505] rounded-2xl p-2 flex items-center gap-2">
                                            <textarea
                                                value={inputMessage}
                                                onChange={e => setInputMessage(e.target.value)}
                                                placeholder="Change colors, add sections..."
                                                className="flex-1 px-3 py-2 bg-transparent text-sm focus:outline-none resize-none min-h-[44px] max-h-32 text-white/90"
                                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                                            />
                                            <button
                                                onClick={handleSendMessage}
                                                disabled={!inputMessage.trim()}
                                                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-20 transition-all shrink-0"
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-center text-[10px] text-white/20 font-medium">
                                        AI portolio builder v1.0.2 • Beta Access
                                    </p>
                                </div>
                            </div>

                            {/* Viewport Canvas */}
                            <div className="flex-1 bg-[#050505] relative overflow-hidden flex items-center justify-center p-8 lg:p-12">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_70%)]" />

                                <motion.div
                                    layout
                                    transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                                    className={`relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] rounded-[2rem] overflow-hidden bg-[#050505] border-[8px] border-[#111] ${previewDevice === 'mobile' ? 'w-[375px] h-[667px]' :
                                        previewDevice === 'tablet' ? 'w-[768px] h-[1024px]' :
                                            'w-full max-w-6xl h-full max-h-[90vh]'
                                        }`}
                                >
                                    <MockPortfolio />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
