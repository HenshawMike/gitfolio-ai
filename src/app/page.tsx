'use client';
import React from 'react';
import { Github } from 'lucide-react';
import Footer from './Footer';

export default function LandingPage() {
  const handleConnect = () => {
    // In production: window.location.href = '/api/auth/github'
    console.log('Redirecting to GitHub OAuth...');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Github className="w-6 h-6 text-gray-700" />
          <span className="text-xl font-normal text-gray-700">GitFolio</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Sign in</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Hero Section */}
          <h1 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 leading-tight">
            Turn your GitHub into a portfolio
          </h1>

          <p className="text-xl text-gray-600 mb-12 font-light">
            Connect your GitHub account and automatically generate a beautiful portfolio website in minutes.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleConnect}
              className="group flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-base font-medium shadow-sm"
            >
              <Github className="w-5 h-5" />
              Connect with GitHub
            </button>
            <p className="text-sm text-gray-500">
              Free • No credit card required
            </p>
          </div>
 
        </div>

      </main>
              <Footer />
    </div>
  );
}