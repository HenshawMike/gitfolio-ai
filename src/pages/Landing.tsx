import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GitHubInputForm } from "@/components/GitHubInputForm";
import { motion } from "framer-motion";
import { Code2, Sparkles, Zap, Palette, MessageSquare, Rocket } from "lucide-react";
import heroPattern from "@/assets/hero-pattern.png";

const features = [
  {
    icon: Code2,
    title: "Smart Scanning",
    description: "Automatically analyze your GitHub profile, repos, and contributions",
  },
  {
    icon: MessageSquare,
    title: "AI Brainstorm",
    description: "Guided conversation to craft your unique developer narrative",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Modern, responsive portfolios that stand out",
  },
  {
    icon: Zap,
    title: "Instant Deploy",
    description: "One-click publish to your custom subdomain",
  },
];

const stats = [
  { value: "10K+", label: "Portfolios Created" },
  { value: "50K+", label: "Repos Analyzed" },
  { value: "98%", label: "Satisfaction" },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroPattern} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>
      
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 pt-12 md:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Powered by AI</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Turn your GitHub into a{" "}
                <span className="text-gradient">stunning portfolio</span>{" "}
                in minutes
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Let AI analyze your code, guide your story, and generate a 
                professional portfolio that showcases your best work.
              </p>
            </motion.div>

            <GitHubInputForm size="large" />

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How it works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Three simple steps to transform your GitHub into a portfolio that gets you noticed
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-24 md:mt-32 text-center"
          >
            <div className="max-w-2xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-card border border-border shadow-card">
              <Rocket className="w-12 h-12 mx-auto text-primary mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to stand out?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of developers who've already transformed their GitHub presence
              </p>
              <GitHubInputForm />
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
