"use client";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminPanel from '../../components/gitfolio/AdminPanel';
import { motion, AnimatePresence } from 'framer-motion';

// Mock GitHub data for demonstration
const mockGitHubData = {
  user: {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Full-stack developer passionate about open source',
    location: 'San Francisco, CA',
    followers: 234,
    following: 189,
  },
  repos: [
    { id: 1, name: 'awesome-react-app', description: 'A modern React application with TypeScript', stars: 45, forks: 12, language: 'TypeScript', url: 'https://github.com', selected: true },
    { id: 2, name: 'nodejs-api-boilerplate', description: 'Production-ready Node.js API template', stars: 89, forks: 23, language: 'JavaScript', url: 'https://github.com', selected: true },
    { id: 3, name: 'css-animations-library', description: 'Beautiful CSS animations collection', stars: 156, forks: 34, language: 'CSS', url: 'https://github.com', selected: true },
    { id: 4, name: 'python-data-viz', description: 'Data visualization tools in Python', stars: 67, forks: 15, language: 'Python', url: 'https://github.com', selected: false },
    { id: 5, name: 'machine-learning-playground', description: 'ML experiments and tutorials', stars: 234, forks: 56, language: 'Python', url: 'https://github.com', selected: true }
  ],
  commits: 1247,
  pullRequests: 89,
  issues: 145,
};

const LoadingScreen = () => (
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
        <p className="text-blue-200/80 font-medium animate-pulse">Loading Dashboard...</p>
      </div>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

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
            <AdminPanel data={mockGitHubData} onViewSite={handleViewSite} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
