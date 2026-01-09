import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Github, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface GitHubInputFormProps {
  size?: "default" | "large";
}

export function GitHubInputForm({ size = "default" }: GitHubInputFormProps) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    // Simulate a brief loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate(`/scan/${username.trim()}`);
  };

  const isLarge = size === "large";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md mx-auto"
    >
      <div
        className={`relative flex items-center gap-2 p-2 rounded-2xl border border-border bg-card/50 shadow-card ${
          isLarge ? "p-3" : ""
        }`}
      >
        <div className="flex items-center pl-3 text-muted-foreground">
          <Github className={isLarge ? "w-6 h-6" : "w-5 h-5"} />
        </div>
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 ${
            isLarge ? "text-lg h-12" : ""
          }`}
        />
        <Button
          type="submit"
          disabled={!username.trim() || isLoading}
          size={isLarge ? "lg" : "default"}
          className="gap-2 rounded-xl bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline">Start Building</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Enter any public GitHub username to get started
      </p>
    </motion.form>
  );
}
