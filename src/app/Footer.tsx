import { Github } from "lucide-react";

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="border-t border-gray-200 py-8 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Github className="w-5 h-5" />
                        <span className="text-sm">© 2026 DevFolio</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
                    </div>
                </div>
            </footer>
        </>
    )
}