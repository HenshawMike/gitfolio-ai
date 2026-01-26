import React from 'react';

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="max-w-4xl w-full mt-32 mb-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
        How it Works
      </h2>

      <div className="space-y-8 relative">
        {/* Connection Line */}
        <div className="absolute left-[24px] top-4 bottom-4 w-px bg-border md:left-1/2 md:-ml-px"></div>

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
            <div className="flex-shrink-0 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center font-bold text-lg relative z-10 mx-auto md:mx-0 text-foreground">
              {item.step}
            </div>

            {/* Content Card */}
            <div className="flex-1 ml-8 md:ml-0 md:w-[45%]">
              <div className={`p-6 rounded-xl border border-border bg-card text-card-foreground ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
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
