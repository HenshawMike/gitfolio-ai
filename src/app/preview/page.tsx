"use client";

import React, { useState, useEffect } from 'react';
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
    Sparkles
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

export default function PreviewPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'building' | 'preview'>('building');
    const [logs, setLogs] = useState<string[]>([]);
    const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Chat State
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'system', content: string }[]>([
        { role: 'system', content: "I've built your portfolio based on your GitHub profile. You can ask me to change colors, fonts, or sections!" }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const chatEndRef = React.useRef<HTMLDivElement>(null);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    // Mock build logs


    useEffect(() => {
        if (status === 'building') {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex >= logMessages.length) {
                    clearInterval(interval);
                    setTimeout(() => setStatus('preview'), 1000);
                    return;
                }
                if (logMessages[currentIndex]) {
                    setLogs(prev => [...prev, logMessages[currentIndex]]);
                }
                currentIndex++;

                // Auto-scroll
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }, 800);

            return () => clearInterval(interval);
        }
    }, [status]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const userMsg = inputMessage;
        setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInputMessage("");

        // Simulate AI thinking and response
        setTimeout(() => {
            setChatMessages(prev => [...prev, { role: 'system', content: `Creating a variation for "${userMsg}"... (This is a demo, no code changes will apply)` }]);
        }, 1000);
    };

    const MockPortfolio = () => (
        <div className="w-full h-full bg-white overflow-y-auto font-sans text-slate-900">
            {/* Mock Portfolio Header */}
            <div className="bg-slate-900 text-white p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 shadow-xl animate-pulse"></div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight">My Awesome Portfolio</h1>
                <p className="text-slate-400 text-lg">Full Stack Developer & UI Designer</p>
                <div className="flex justify-center gap-4 mt-8">
                    <button className="px-6 py-2 bg-white text-slate-900 rounded-full font-medium hover:bg-blue-50 transition-colors">Contact Me</button>
                    <button className="px-6 py-2 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors">View Github</button>
                </div>
            </div>

            {/* Mock Content */}
            <div className="max-w-5xl mx-auto p-12 space-y-16">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-blue-500" /> Featured Projects
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="group border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
                                <div className="h-48 bg-slate-100 rounded-xl mb-6 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                    Project Demo Preview
                                </div>
                                <h3 className="font-bold text-xl mb-2 text-slate-800">Project {i}</h3>
                                <p className="text-slate-500 leading-relaxed mb-4">
                                    A stunning web application built with Next.js, Tailwind CSS, and Supabase. Features real-time data sync and beautiful UI animations.
                                </p>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">React</span>
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">TypeScript</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">About Me</h2>
                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed text-lg">
                            I am a passionate developer who loves building tools for other developers.
                            My journey started with a simple HTML file and has evolved into building complex full-stack applications.
                            This portfolio was automatically generated by GitFolio in seconds, analyzing my GitHub activity to create a personalized showcase.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen gradient-bg flex flex-col font-sans">
            {/* Navbar */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50"
            >
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
                    </Link>
                    <div className="h-4 w-px bg-white/10" />
                    <span className="font-semibold text-white tracking-wide">
                        {status === 'building' ? 'GitFolio Builder' : 'Portfolio Editor'}
                    </span>
                </div>

                {status === 'preview' && (
                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 p-1 rounded-lg flex items-center gap-1 border border-white/5">
                            <button
                                onClick={() => setPreviewDevice('mobile')}
                                className={`p-2 rounded-md transition-all ${previewDevice === 'mobile' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                            >
                                <Smartphone className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPreviewDevice('tablet')}
                                className={`p-2 rounded-md transition-all ${previewDevice === 'tablet' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                            >
                                <Tablet className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPreviewDevice('desktop')}
                                className={`p-2 rounded-md transition-all ${previewDevice === 'desktop' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-500/20">
                            Publish Site <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </motion.header>

            <main className="flex-1 overflow-hidden relative flex flex-col">
                <AnimatePresence mode="wait">
                    {status === 'building' ? (
                        <motion.div
                            key="building"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex-1 flex"
                        >
                            {/* Terminal / Code View */}
                            <div className="w-full md:w-1/2 p-8 flex flex-col gap-6 border-r border-white/10 bg-[#0A0A0A]">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-blue-400 mb-4">
                                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                        <span className="text-xs font-mono uppercase tracking-widest">System Active</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">
                                        Building your masterpiece
                                    </h2>
                                    <p className="text-white/40">
                                        Generating portfolio based on your GitHub activity...
                                    </p>
                                </div>

                                <div
                                    ref={containerRef}
                                    className="flex-1 bg-black/50 rounded-xl border border-white/10 p-6 font-mono text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent space-y-3 shadow-inner"
                                >
                                    {logs.map((log, i) => {
                                        if (!log) return null;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-start gap-3 text-white/80"
                                            >
                                                <span className="text-blue-500 shrink-0 mt-0.5">➜</span>
                                                <span className={log.includes("Done") ? "text-green-400 font-bold" : ""}>{log.replace("> ", "")}</span>
                                            </motion.div>
                                        );
                                    })}
                                    <div className="h-4 w-3 bg-blue-500 animate-pulse inline-block" />
                                </div>
                            </div>

                            {/* Live Preview Placeholder (Blurry/Skeleton) */}
                            <div className="hidden md:flex w-1/2 bg-slate-900 items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                                <div className="w-[80%] h-[80%] glass rounded-xl border border-white/5 p-4 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center flex-col gap-4">
                                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                                        <p className="text-white/60 font-medium animate-pulse">Generating UI...</p>
                                    </div>
                                    <div className="w-full h-full bg-white/5 rounded-lg opacity-50 blur-sm transform scale-95 group-hover:scale-100 transition-transform duration-700" />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1 flex h-full overflow-hidden"
                        >
                            {/* Left Chat Pane */}
                            <div className="w-[400px] border-r border-white/10 bg-[#0A0A0A] flex flex-col shadow-2xl z-10 md:min-w-[320px]">
                                {/* Chat Header */}
                                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                                    <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-blue-400" />
                                        AI Editor
                                    </h2>
                                    <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Beta</div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                                    {chatMessages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-sm shadow-lg shadow-blue-500/10'
                                                : 'bg-white/10 text-white/80 rounded-bl-sm border border-white/5'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t border-white/10 glass bg-black/50">
                                    <div className="relative">
                                        <textarea
                                            value={inputMessage}
                                            onChange={e => setInputMessage(e.target.value)}
                                            placeholder="Example: Make the background dark, add more padding..."
                                            className="w-full bg-white/5 rounded-xl p-3 pr-12 text-sm text-white resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 min-h-[50px] border border-white/5 placeholder:text-white/20"
                                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={!inputMessage.trim()}
                                            className="absolute right-2 bottom-2 p-1.5 bg-blue-500 rounded-lg text-white hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-white/20 mt-2 text-center">
                                        AI can make mistakes. Review generated changes.
                                    </p>
                                </div>
                            </div>

                            {/* Right Preview Pane */}
                            <div className="flex-1 bg-black/90 flex flex-col items-center justify-center p-8 overflow-hidden relative">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                <div
                                    className={`relative transition-all duration-500 ease-in-out shadow-2xl rounded-2xl overflow-hidden border-[10px] border-slate-800 bg-white z-0
                                    ${previewDevice === 'mobile' ? 'w-[375px] h-[667px]' :
                                            previewDevice === 'tablet' ? 'w-[768px] h-[1024px]' :
                                                'w-full max-w-6xl h-full max-h-[85vh]'}`}
                                >
                                    <MockPortfolio />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
