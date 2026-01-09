import { Star, GitFork, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProjectCardProps {
  name: string;
  description: string;
  language?: string;
  stars: number;
  forks: number;
  url: string;
  topics?: string[];
  index?: number;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Rust: "bg-orange-500",
  Go: "bg-cyan-500",
  Ruby: "bg-red-500",
  Java: "bg-red-600",
  "C++": "bg-pink-500",
  C: "bg-gray-500",
  Shell: "bg-emerald-500",
};

export function ProjectCard({
  name,
  description,
  language,
  stars,
  forks,
  url,
  topics = [],
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group h-full bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description || "No description provided"}
          </p>

          {topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {topics.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
            {language && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    languageColors[language] || "bg-gray-400"
                  }`}
                />
                <span>{language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{forks.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
