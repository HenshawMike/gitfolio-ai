import React from 'react';

export default function Features() {
  return (
    <div id="features" className="max-w-6xl w-full mt-24 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-slide-up text-foreground">
        Everything you need to showcase your work
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: (
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            title: "Instant Setup",
            description: "Enter your GitHub email and your portfolio is ready in seconds. No configuration needed."
          },
          {
            icon: (
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            ),
            title: "Fully Customizable",
            description: "Choose which repositories to showcase and update your portfolio anytime from the admin panel."
          },
          {
            icon: (
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            ),
            title: "Easy to Share",
            description: "Get a clean, professional URL to share with recruiters, clients, and your network."
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="text-center p-8 rounded-xl border border-border bg-card text-card-foreground animate-slide-up hover:border-primary/20 transition-colors"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-6 text-primary">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
