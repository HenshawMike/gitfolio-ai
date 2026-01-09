import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { MessageBubble } from "@/components/MessageBubble";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowRight, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: `👋 Welcome to your brainstorm session! I've analyzed your GitHub profile and I'm excited to help you craft a compelling portfolio.

Let's start by understanding your goals. **What's the primary purpose of your portfolio?**

• Looking for a new job or freelance clients
• Showcasing side projects and open source work
• Building a personal brand in the developer community
• Something else?`,
  },
];

const AI_RESPONSES = [
  `Great choice! Understanding your audience helps me tailor the narrative.

**Who do you want to see your portfolio?**
• Hiring managers at tech companies
• Startup founders
• Fellow developers & open source community
• Non-technical stakeholders`,
  `Perfect! Now let's talk about your projects.

Looking at your repositories, I noticed some interesting ones. **Which projects best represent your skills and would you like to highlight?**

I can help you write compelling descriptions that focus on:
• The problem you solved
• Your technical approach
• Measurable impact or outcomes`,
  `Excellent! I'm getting a clear picture of your developer story.

**What tone would you like for your portfolio?**
• Professional & polished (enterprise-ready)
• Friendly & approachable (startup vibes)
• Technical & detailed (fellow devs)
• Creative & unique (standing out)`,
  `I have everything I need! 🎉

Based on our conversation, here's what I'm thinking for your portfolio:

**Hero Section:** A bold statement about your expertise
**About:** Your journey and what drives you
**Featured Projects:** 3-4 key projects with impact stories
**Skills:** Technical stack organized by category
**Contact:** Easy ways to reach you

Ready to see the magic? Click "Generate Portfolio" to preview your new portfolio!`,
];

export default function Brainstorm() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const username = location.state?.username || "developer";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: AI_RESPONSES[responseIndex] || AI_RESPONSES[AI_RESPONSES.length - 1],
    };

    setMessages((prev) => [...prev, aiMessage]);
    setResponseIndex((prev) => Math.min(prev + 1, AI_RESPONSES.length - 1));
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleGeneratePortfolio = () => {
    const slug = username.toLowerCase().replace(/[^a-z0-9]/g, "-");
    navigate(`/portfolio/${slug}`, { state: { username, messages } });
  };

  const isComplete = responseIndex >= AI_RESPONSES.length - 1 && messages.length > 4;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Navbar />

      <main className="flex-1 pt-16 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold tracking-tight">
                Gitfolio<span className="text-primary">AI</span>
              </span>
              <div>
                <h1 className="font-semibold">Brainstorm Session</h1>
                <p className="text-sm text-muted-foreground font-mono">#{sessionId}</p>
              </div>
            </div>

            <AnimatePresence>
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Button
                    onClick={handleGeneratePortfolio}
                    className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    Generate Portfolio
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && (
                <MessageBubble role="assistant" content="" isLoading />
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
            <div className="flex gap-3 items-end">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your response..."
                className="min-h-[52px] max-h-32 resize-none bg-background border-border focus-visible:ring-primary"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-[52px] w-[52px] shrink-0 bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}


