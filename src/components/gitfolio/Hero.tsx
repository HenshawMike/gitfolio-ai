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
    <div className="w-full max-w-3xl text-center space-y-8 animate-fade-in pt-20 pb-16">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-sm font-medium text-foreground animate-slide-up mx-auto">
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        AI-Powered Portfolio Builder
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
        Build Your Developer Portfolio
        <br /> in Minutes
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
        Connect your GitHub, chat with our AI, and deploy a stunning portfolio that gets you hired.
      </p>

      {/* Get Started Button */}
      <div className="flex flex-col items-center gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={handleGetStarted}
          className="group relative px-8 py-3.5 bg-black text-white rounded-lg font-semibold text-base md:text-lg transition-all shadow-sm"
        >
          <span className="flex items-center gap-2">
            Get started for free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
        <p className="text-muted-foreground/60 text-sm">
          No credit card required · Open Source
        </p>
      </div>
    </div>
  );
}
