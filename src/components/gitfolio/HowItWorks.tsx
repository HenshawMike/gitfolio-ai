import React from 'react';

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="max-w-4xl w-full mt-32 mb-20 px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
        How it <span className="gradient-text">Works</span>
      </h2>

      <div className="space-y-8 relative">
        {/* Connection Line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30 md:left-1/2 md:-ml-px"></div>

        {[
          {
            step: "1",
            title: "Enter your GitHub email",
            desc: "Provide your GitHub email and we'll fetch your public profile and repositories.",
            align: "right"
          },
          {
            step: "2",
            title: "Customize in admin panel",
            desc: "Access your admin panel to select which repositories you want to feature on your portfolio.",
            align: "left"
          },
          {
            step: "3",
            title: "Your portfolio is live",
            desc: "Your portfolio is automatically generated and you can access it anytime from your admin panel.",
            align: "right"
          }
        ].map((item, index) => (
          <div key={index} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Dot/Number */}
            <div className="flex-shrink-0 w-14 h-14 bg-black border border-white/20 rounded-full flex items-center justify-center font-bold text-xl relative z-10 mx-auto md:mx-0 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <span className="gradient-text">{item.step}</span>
            </div>

            {/* Content Card */}
            <div className="flex-1 ml-8 md:ml-0 md:w-[45%]">
              <div className={`p-6 rounded-2xl glass border border-white/10 hover:border-white/20 transition-colors ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>

            {/* Spacer for desktop layout */}
            <div className="hidden md:block md:w-[45%]" />
          </div>
        ))}
      </div>
    </div>
  );
}
