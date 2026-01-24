/**
 * @snippet-name Modern Gradient Hero Section
 * @category component
 * @subcategory hero
 * @tags gradient, modern, cta, responsive
 * @framework nextjs
 * @description A modern hero section with gradient background, animated text, and call-to-action buttons
 */

'use client';
import { motion } from 'framer-motion';

export default function GradientHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Animated background shapes */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
                >
                    Build Your Dream
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">
                        Portfolio
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
                >
                    AI-powered portfolio generation in seconds. No coding required.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
                        Get Started Free
                    </button>
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                        View Examples
                    </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                >
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white">10K+</div>
                        <div className="text-white/70 mt-1">Portfolios Created</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white">30s</div>
                        <div className="text-white/70 mt-1">Average Build Time</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-white">98%</div>
                        <div className="text-white/70 mt-1">Satisfaction Rate</div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    );
}
