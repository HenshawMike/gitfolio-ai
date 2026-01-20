"use client";
import { ArrowRight } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type Props = {};

export default function Hero({ }: Props) {
  const { isLoaded } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  if (!isLoaded) {
    return (
      <div className="w-full max-w-4xl text-center">
        <div className="animate-pulse space-y-8">
          <div className="h-20 bg-white/5 rounded-2xl w-3/4 mx-auto backdrop-blur-sm"></div>
          <div className="h-8 bg-white/5 rounded-lg w-1/2 mx-auto"></div>
          <div className="h-14 bg-white/5 rounded-full w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl text-center space-y-8 animate-fade-in">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-white/80 animate-slide-up">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        AI-Powered Portfolio Builder
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
        Build Your <span className="gradient-text">Developer Portfolio</span>
        <br /> in Seconds
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
        Stop wrestling with code. Connect your GitHub, chat with our AI, and deploy a stunning portfolio that gets you hired.
      </p>

      {/* Get Started Button */}
      <div className="flex flex-col items-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={handleGetStarted}
          className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
        >
          <span className="flex items-center gap-2">
            Get started for free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        <p className="text-white/40 text-sm">
          No credit card required · Open Source
        </p>
      </div>
    </div>
  );
}
