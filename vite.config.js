"use client";

import { useState } from 'react';

export default function FeaturesTabs() {
  const [activeTab, setActiveTab] = useState('charities');

  const tabs = [
    { id: 'charities', label: 'Charities/Causes' },
    { id: 'fundraisers', label: 'Fundraisers' },
    { id: 'crowdfunders', label: "Crowdfunder's" },
    { id: 'politicians', label: 'Politicians' },
    { id: 'corporates', label: 'Corporates' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-fade-in">
            Show me features for...
          </h1>

          {/* Tab Navigation with Glass Effect */}
          <div className="inline-flex flex-wrap justify-center gap-3 p-2 bg-white/40 backdrop-blur-lg rounded-2xl border border-white/60 shadow-xl">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`px-8 py-3 rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 animate-slide-up ${activeTab === tab.id
                    ? 'bg-teal-700 text-white shadow-lg shadow-teal-700/30'
                    : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 hover:shadow-md'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area with Glass Card */}
        <div className="mt-16">
          <div className="bg-white/50 backdrop-blur-lg rounded-3xl border border-white/60 shadow-2xl p-12 transform transition-all duration-500 animate-fade-in-up">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600 text-lg">
                Discover amazing features tailored for {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}