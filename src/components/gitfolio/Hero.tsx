"use client";
import React from 'react';
import { ArrowUp, Plus, Paperclip } from 'lucide-react';

type Props = {
  portfolioInput: string;
  setPortfolioInput: (v: string) => void;
  handleSubmit: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
};

export default function Hero({ portfolioInput, setPortfolioInput, handleSubmit, handleKeyPress }: Props) {
  return (
    <div className="w-full max-w-4xl text-center">
      {/* Headline */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
        Build Your Developer Portfolio
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
        Create your professional portfolio by connecting GitHub and chatting with AI
      </p>

      {/* Interactive Input Box */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="relative">
          <textarea
            value={portfolioInput}
            onChange={(e) => setPortfolioInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What kind of portfolio do you want to build?"
            className="w-full bg-white/95 backdrop-blur-sm border-0 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 text-lg resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-white/50 shadow-2xl"
            rows={3}
          />

          {/* Action Buttons */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
              <Paperclip className="w-5 h-5" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={portfolioInput.trim().length < 10}
            className="absolute bottom-4 right-4 w-10 h-10 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <p className="text-white/60 text-sm">
        Describe your ideal portfolio and let AI do the rest
      </p>
    </div>
  );
}
