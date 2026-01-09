import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ProfileSkeleton, ProjectCardSkeleton, StatsSkeleton } from "@/components/SkeletonLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Building2,
  Link as LinkIcon,
  Users,
  GitFork,
  Star,
  Code2,
  GithubIcon,
  ArrowRight,
} from "lucide-react";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  company: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  topics: string[];
}

export default function Scan() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!username) return;

      try {
        setIsLoading(true);
        setError(null);

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`),
        ]);

        if (!userRes.ok) {
          throw new Error("User not found");
        }

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        setUser(userData);
        setRepos(reposData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const topLanguages = [...new Set(repos.filter((r) => r.language).map((r) => r.language))].slice(0, 5);

  const handleStartBrainstorm = () => {
    const sessionId = Math.random().toString(36).substring(7);
    navigate(`/brainstorm/${sessionId}`, { state: { username, user, repos } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              GitHub Profile Scan
            </h1>
            <p className="text-muted-foreground">
              Analyzing <span className="text-primary font-mono">@{username}</span>
            </p>
          </motion.div>

          {error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <p className="text-destructive text-lg mb-4">{error}</p>
              <Button variant="outline" onClick={() => navigate("/")}>
                Go Back
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {/* Profile Card */}
              {isLoading ? (
                <ProfileSkeleton />
              ) : user ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-gradient-card border-border shadow-card">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Avatar className="w-24 h-24 border-2 border-primary/30">
                          <AvatarImage src={user.avatar_url} alt={user.name} />
                          <AvatarFallback>{user.name?.[0] || user.login[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center sm:text-left">
                          <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
                          <p className="text-primary font-mono">@{user.login}</p>
                          {user.bio && (
                            <p className="mt-2 text-muted-foreground">{user.bio}</p>
                          )}

                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-sm text-muted-foreground">
                            {user.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {user.location}
                              </span>
                            )}
                            {user.company && (
                              <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {user.company}
                              </span>
                            )}
                            {user.blog && (
                              <a
                                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-primary transition-colors"
                              >
                                <LinkIcon className="w-4 h-4" />
                                Website
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : null}

              {/* Stats */}
              {isLoading ? (
                <StatsSkeleton />
              ) : user ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {[
                    { icon: Code2, label: "Repositories", value: user.public_repos },
                    { icon: Star, label: "Total Stars", value: totalStars },
                    { icon: Users, label: "Followers", value: user.followers },
                    { icon: GitFork, label: "Following", value: user.following },
                  ].map((stat) => (
                    <Card key={stat.label} className="bg-gradient-card border-border">
                      <CardContent className="p-4 text-center">
                        <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              ) : null}

              {/* Languages */}
              {!isLoading && topLanguages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap justify-center gap-2"
                >
                  {topLanguages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-sm">
                      {lang}
                    </Badge>
                  ))}
                </motion.div>
              )}

              {/* Top Repositories */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Top Repositories</h3>
                {isLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <ProjectCardSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repos.map((repo, index) => (
                      <ProjectCard
                        key={repo.id}
                        name={repo.name}
                        description={repo.description}
                        language={repo.language}
                        stars={repo.stargazers_count}
                        forks={repo.forks_count}
                        url={repo.html_url}
                        topics={repo.topics}
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              {!isLoading && user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-center pt-8"
                >
                  <Card className="bg-gradient-card border-border p-8 max-w-xl mx-auto">
                    <h2 className="text-3xl font-semibold tracking-tight text-center mb-4">
                      Gitfolio<span className="text-primary">AI</span>
                    </h2>
                    <h3 className="text-xl font-bold mb-2">Ready to build your portfolio?</h3>
                    <p className="text-muted-foreground mb-6">
                      Start a brainstorm session with AI to craft your unique developer story
                    </p>
                    <Button
                      size="lg"
                      onClick={handleStartBrainstorm}
                      className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      Start Brainstorm Session
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Card>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
