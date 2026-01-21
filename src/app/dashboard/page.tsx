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
    async function initDashboard() {
      if (!isLoaded) return;
      if (!user) {
        router.push('/sign-in');
        return;
      }

      try {
        setLoadingMessage("Fetching your data...");
        // Get the Supabase token from Clerk
        let token = null;
        try {
          token = await getToken({ template: 'supabase' });
        } catch (tokenError: any) {
          if (tokenError.message?.includes("No JWT template exists")) {
            console.warn("Clerk JWT template 'supabase' not found. Data fetching might fail if RLS is enabled.");
            setLoadingMessage("Configuration Error: Missing Clerk JWT Template 'supabase'");
            // We can continue to try the sync API, which is server-side
          } else {
            throw tokenError;
          }
        }

        const supabaseClient = createClerkSupabaseClient(token || "");

        // Try to fetch existing profile and repos
        const { data: profile, error: profileError } = await supabaseClient.from('profiles').select('*').maybeSingle();
        const { data: repos, error: reposError } = await supabaseClient.from('repositories').select('*');

        if (profile && repos && repos.length > 0) {
          setGithubData({
            user: {
              name: profile.full_name,
              username: profile.username,
              avatar: profile.avatar_url,
              bio: profile.bio,
            },
            repos: repos.map(r => ({ ...r, selected: r.is_selected }))
          });
          setIsLoading(false);
          setShowContent(true);
        } else {
          // If we got a permission error, it's likely the JWT template issue
          if (profileError?.code === 'PGRST301' || reposError?.code === 'PGRST301' || profileError?.message?.includes('JWT')) {
            setLoadingMessage("Authentication Error: Please set up the 'supabase' JWT template in Clerk.");
            setIsLoading(false);
            return;
          }

          // Trigger sync if no data
          setLoadingMessage("Syncing with GitHub...");
          const syncResponse = await fetch('/api/sync-github', { method: 'POST' });
          const syncData = await syncResponse.json();

          if (syncData.success) {
            // Re-fetch after sync
            const { data: newProfile } = await supabaseClient.from('profiles').select('*').maybeSingle();
            const { data: newRepos } = await supabaseClient.from('repositories').select('*');

            if (newProfile && newRepos) {
              setGithubData({
                user: {
                  name: newProfile.full_name,
                  username: newProfile.username,
                  avatar: newProfile.avatar_url,
                  bio: newProfile.bio,
                },
                repos: newRepos.map((r: any) => ({ ...r, selected: r.is_selected }))
              });
            }
          } else {
            console.error("Sync failed:", syncData.error);
          }
          setIsLoading(false);
          setShowContent(true);
        }
      } catch (error) {
        console.error("Dashboard init error:", error);
        setIsLoading(false);
      }
    }

    initDashboard();
  }, [user, isLoaded, router, getToken]);

  if (!isLoaded || (isLoaded && !user) || isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <AnimatePresence mode="wait">
        {!showContent || !githubData ? (
          <LoadingScreen key="loader" message={loadingMessage} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard user={githubData.user} repos={githubData.repos} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

