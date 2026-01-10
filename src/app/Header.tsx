import { Github } from "lucide-react";
import Link from 'next/link';

export default function Header() {
    return (
        <>
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <Github className="w-6 h-6 text-gray-700" />
                    <span className="text-xl font-normal text-gray-700">GitFolio</span>
                </div>
                <nav className="flex items-center gap-6">
                    <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">
                        Features
                    </Link>
                    <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Sign in</button>
                </nav>
            </header>

        </>
    )
}