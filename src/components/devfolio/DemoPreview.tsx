import React from 'react';

export default function DemoPreview() {
  return (
    <div className="max-w-2xl w-full mt-20 mb-16">
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 bg-white rounded-md px-4 py-1.5 text-sm text-gray-500 font-mono text-left">
            johndoe.devfolio.app
          </div>
        </div>

        <div className="text-left space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
            <div>
              <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="h-8 w-16 bg-blue-100 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="h-8 w-16 bg-blue-100 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="h-8 w-16 bg-blue-100 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="h-4 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
