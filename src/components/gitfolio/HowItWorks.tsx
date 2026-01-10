import React from 'react';

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="max-w-4xl w-full mt-24 mb-20">
      <h2 className="text-3xl font-normal text-gray-900 text-center mb-12">How it works</h2>

      <div className="space-y-8">
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">1</div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Enter your GitHub email</h3>
            <p className="text-gray-600">Provide your GitHub email and we'll fetch your public profile and repositories.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">2</div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Customize in admin panel</h3>
            <p className="text-gray-600">Access your admin panel to select which repositories you want to feature on your portfolio.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">3</div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Your portfolio is live</h3>
            <p className="text-gray-600">Your portfolio is automatically generated and you can access it anytime from your admin panel.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
