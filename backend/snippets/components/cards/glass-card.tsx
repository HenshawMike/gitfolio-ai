/**
 * @snippet-name Glassmorphism Card
 * @category component
 * @subcategory card
 * @tags glassmorphism, card, modern, blur
 * @framework nextjs
 * @description A modern card component with glassmorphism effect, backdrop blur, and subtle animations
 */

'use client';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
    return (
        <div
            className={`
        bg-white/10 
        backdrop-blur-lg 
        border border-white/20 
        rounded-2xl 
        p-6 
        shadow-xl 
        ${hover ? 'hover:bg-white/15 hover:scale-105 hover:shadow-2xl transition-all duration-300' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
