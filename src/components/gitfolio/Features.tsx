import React from 'react';

export default function Features() {
  return (
    <div id="features" className="max-w-5xl w-full mt-20">
      <h2 className="text-3xl font-normal text-gray-900 text-center mb-12">
        Everything you need to showcase your work
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Instant setup</h3>
          <p className="text-gray-600 text-sm">
            Enter your GitHub email and your portfolio is ready in seconds. No configuration needed.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Fully customizable</h3>
          <p className="text-gray-600 text-sm">
            Choose which repositories to showcase and update your portfolio anytime from the admin panel.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Easy to share</h3>
          <p className="text-gray-600 text-sm">
            Get a clean, professional URL to share with recruiters, clients, and your network.
          </p>
        </div>
      </div>
    </div>
  );
}
