import { Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-8 px-6 backdrop-blur-sm relative z-10 bg-black/20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-gray-400 font-medium">
                    <Github className="w-5 h-5" />
                    <span className="text-sm">© 2026 gitFolio</span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    )
}