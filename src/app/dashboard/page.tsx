"use client";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminPanel from '../../components/gitfolio/AdminPanel';

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

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [user, isLoaded, router]);

  const handleViewSite = () => {
    // Handle viewing the portfolio site
    console.log('View site clicked');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPanel data={mockGitHubData} onViewSite={handleViewSite} />
    </div>
  );
}