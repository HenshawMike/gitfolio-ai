import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-semibold tracking-tight">
            Gitfolio<span className="text-primary">AI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Sign in with GitHub</span>
            <span className="sm:hidden">Sign in</span>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
