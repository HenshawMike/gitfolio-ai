"use client";
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Dashboard from '../../components/gitfolio/Dashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { createClerkSupabaseClient } from '@/lib/supabase';

const LoadingScreen = ({ message = "Loading Dashboard..." }: { message?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014]"
  >
    <div className="relative flex flex-col items-center">
      <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
        <p className="text-blue-200/80 font-medium animate-pulse">{message}</p>
      </div>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  const [showContent, setShowContent] = useState(false);
  const [githubData, setGithubData] = useState<{ user: any; repos: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Authenticating...");

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    } else if (isLoaded && user) {
      // Add a small delay for smoother transition
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [user, isLoaded, router]);

  const handleViewSite = () => {
    // Handle viewing the portfolio site
    console.log('View site clicked');
  };

  if (!isLoaded || !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <AnimatePresence mode="wait">
        {!showContent ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard user={mockGitHubData.user} repos={mockGitHubData.repos} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

