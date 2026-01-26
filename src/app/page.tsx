'use client';
import Hero from '../components/gitfolio/Hero';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex items-center justify-center min-h-screen px-6">
        <Hero />
      </main>
    </div>
  );
}