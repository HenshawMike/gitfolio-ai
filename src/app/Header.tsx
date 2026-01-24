import { Github } from "lucide-react";
import Link from 'next/link';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between bg-transparent z-50">
            <div className="flex items-center gap-2">
                <Link href="/" className="text-2xl font-bold text-white">GitFolio</Link>
            </div>
            <nav className="flex items-center gap-6">
                <Link href="#features" className="text-sm text-white/80 hover:text-white transition-colors">
                    Features
                </Link>
                <a href="#how-it-works" className="text-sm text-white/80 hover:text-white transition-colors">How it works</a>
                
                <SignedOut>
                    <div className="flex items-center gap-4">
                        <SignInButton mode="modal">
                            <button className="text-sm text-white/90 hover:text-white font-bold transition-colors">
                                Sign in
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="px-4 py-1.5 text-sm font-bold text-white border border-white/50 hover:border-white rounded-full transition-colors bg-transparent hover:bg-white/10">
                                Sign up
                            </button>
                        </SignUpButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div className="bg-white/10 backdrop-blur-sm p-1 rounded-full">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </SignedIn>
            </nav>
        </header>
    );
}