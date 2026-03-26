// MockHub.jsx
// Landing page for the Interview Readiness Hub.
// Shows 4 category cards: Coding, Aptitude, HR, System Design.
// Disabled cards (like System Design) are not wrapped in a Link.

import React from 'react';
import { Link } from 'react-router-dom';

// Each category card's data is defined here so the JSX stays clean
const mockCategories = [
  {
    title: '🧠 Coding Round',
    description: '10 MCQs + 2 Coding Questions to test your DSA skills',
    route: '/mockhub/coding',
    icon: '💻',
    colorClass: 'bg-blue-100 dark:bg-blue-900/30',
    tagLabel: 'MCQ + Coding',
    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    disabled: false,
  },
  {
    title: '📐 Aptitude Round',
    description: 'Test your logical reasoning and math aptitude',
    route: '/mockhub/aptitude',
    icon: '🔢',
    colorClass: 'bg-green-100 dark:bg-green-900/30',
    tagLabel: '45 mins',
    tagColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    disabled: false,
  },
  {
    title: '💬 HR Round',
    description: 'Professional soft skills assessment for behavioral interviews',
    route: '/mockhub/hr',
    icon: '🤝',
    colorClass: 'bg-purple-100 dark:bg-purple-900/30',
    tagLabel: null, // no tag for HR
    disabled: false,
  },
  {
    title: '🧱 System Design',
    description: 'High-level design problems for advanced learners',
    route: '#',
    icon: '🏗️',
    colorClass: 'bg-gray-100 dark:bg-gray-700',
    tagLabel: null,
    disabled: true,
  },
];

// The card UI — same for all categories
const MockCard = ({ mock }) => (
  <div className={`group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300
    ${mock.disabled ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl hover:scale-[1.02]'}`}>
    <div className="relative p-8">
      {/* Icon + Title + Description */}
      <div className="flex items-start space-x-4 mb-6">
        <div className={`p-3 rounded-xl ${mock.colorClass}`}>
          <span className="text-3xl">{mock.icon}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{mock.title}</h2>
          <p className="text-gray-600 dark:text-gray-300">{mock.description}</p>
        </div>
      </div>

      {/* Footer: action label + optional tag */}
      <div className="flex items-center justify-between mt-8">
        {mock.disabled ? (
          // Disabled state — show "Coming Soon" pill
          <span className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full">
            Coming Soon
          </span>
        ) : (
          // Active state — show "Start Practice" with animated arrow
          <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
            Start Practice
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        )}

        {/* Optional feature tag (e.g. "MCQ + Coding", "45 mins") */}
        {mock.tagLabel && (
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${mock.tagColor}`}>
            {mock.tagLabel}
          </span>
        )}
      </div>
    </div>
  </div>
);

const MockHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
            Interview Readiness Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Practice with our comprehensive mock tests to prepare for every aspect of your technical interviews.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {mockCategories.map((mock, index) =>
            // Disabled cards are plain divs; active cards are Links
            mock.disabled ? (
              <div key={index}>
                <MockCard mock={mock} />
              </div>
            ) : (
              <Link to={mock.route} key={index} className="block">
                <MockCard mock={mock} />
              </Link>
            )
          )}
        </div>

      </div>
    </div>
  );
};

export default MockHub;