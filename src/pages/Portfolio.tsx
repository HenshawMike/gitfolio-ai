import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Copy,
  Download,
  Check,
  Edit3,
  Star,
  ArrowUpRight,
} from "lucide-react";

interface Project {
  name: string;
  description: string;
  impact: string;
  techStack: string[];
  url: string;
  stars: number;
}

const SAMPLE_PROJECTS: Project[] = [
  {
    name: "DevFlow",
    description: "A modern developer productivity dashboard that aggregates GitHub, Jira, and Slack data into actionable insights.",
    impact: "Reduced context switching by 40% for engineering teams",
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    url: "https://github.com",
    stars: 234,
  },
  {
    name: "CodeReview AI",
    description: "AI-powered code review assistant that provides intelligent suggestions and catches potential issues before merge.",
    impact: "Improved code quality scores by 25% across 50+ repositories",
    techStack: ["Python", "FastAPI", "OpenAI", "Docker"],
    url: "https://github.com",
    stars: 567,
  },
  {
    name: "React Component Library",
    description: "A comprehensive, accessible component library built with React and TypeScript, used by developers worldwide.",
    impact: "500+ weekly downloads, 50+ GitHub stars",
    techStack: ["React", "TypeScript", "Storybook", "Jest"],
    url: "https://github.com",
    stars: 189,
  },
];

const SKILLS = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"] },
  { category: "DevOps", items: ["Docker", "AWS", "GitHub Actions", "Terraform", "Kubernetes"] },
  { category: "Tools", items: ["Git", "Figma", "VS Code", "Jira", "Notion"] },
];

export default function Portfolio() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const username = location.state?.username || slug || "Developer";
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Portfolio link has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your portfolio is being exported as markdown...",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Navbar />

      {/* Editor Toolbar */}
      <div className="fixed top-20 right-4 z-40 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="gap-2 glass border-border"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="gap-2 glass border-border"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>

      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Avatar className="w-28 h-28 mx-auto mb-6 border-4 border-primary/30 shadow-glow">
              <AvatarImage src={`https://github.com/${username}.png`} alt={displayName} />
              <AvatarFallback className="text-3xl">{displayName[0]}</AvatarFallback>
            </Avatar>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 outline-none"
              contentEditable
              suppressContentEditableWarning
            >
              Hi, I'm <span className="text-gradient">{displayName}</span> 👋
            </h1>

            <p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto outline-none"
              contentEditable
              suppressContentEditableWarning
            >
              Full-stack developer passionate about building products that make a difference. 
              I turn complex problems into elegant, user-friendly solutions.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity">
                <Mail className="w-4 h-4" />
                Get in Touch
              </Button>
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              About Me
              <Edit3 className="w-4 h-4 text-muted-foreground" />
            </h2>
            <div
              className="prose prose-invert prose-lg max-w-none text-muted-foreground outline-none"
              contentEditable
              suppressContentEditableWarning
            >
              <p>
                I'm a software engineer with 5+ years of experience building web applications 
                and developer tools. Currently focused on creating AI-powered solutions that 
                help developers be more productive.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open source projects, 
                writing technical blog posts, or exploring the latest in web technologies. 
                I believe in clean code, thoughtful architecture, and building things that last.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {SAMPLE_PROJECTS.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full group bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <h3
                          className="text-xl font-semibold group-hover:text-primary transition-colors outline-none"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          {project.name}
                        </h3>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      </div>

                      <p
                        className="text-muted-foreground mb-4 flex-1 outline-none"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {project.description}
                      </p>

                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 mb-4">
                        <p className="text-sm font-medium text-primary flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          {project.impact}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Skills & Technologies</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="bg-gradient-card border-border">
                    <CardContent className="p-5">
                      <h3 className="font-semibold mb-3 text-primary">
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="bg-gradient-card border-border p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
              <p className="text-muted-foreground mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg" className="gap-2">
                  <Mail className="w-5 h-5" />
                  Email Me
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="w-5 h-5" />
                  GitHub
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Twitter className="w-5 h-5" />
                  Twitter
                </Button>
              </div>
            </Card>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
