"use client";
import { ArrowRight } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type Props = {};

export default function Hero({}: Props) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      // User is signed in, go to dashboard
      router.push('/dashboard');
    } else {
      // User is not signed in, go to sign in
      router.push('/sign-in');
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-full max-w-4xl text-center">
        <div className="animate-pulse">
          <div className="h-12 bg-white/20 rounded-lg mb-6"></div>
          <div className="h-6 bg-white/20 rounded mb-12"></div>
          <div className="h-12 bg-white/20 rounded-full mx-auto w-48"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl text-center">
      {/* Headline */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
        Build Your Developer Portfolio
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
        Create your professional portfolio by connecting GitHub and chatting with AI
      </p>

      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-colors text-lg font-medium flex items-center gap-3 mx-auto shadow-2xl hover:shadow-white/10"
      >
        Get started
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Additional Info */}
      <p className="text-white/60 text-sm mt-8">
        Connect your GitHub and let AI build your portfolio
      </p>
    </div>
  );
}
