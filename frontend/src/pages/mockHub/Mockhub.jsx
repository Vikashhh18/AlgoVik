import React from 'react';
import { Link } from 'react-router-dom';

const mockCategories = [
  {
    title: '🧠 Coding Round',
    description: '10 MCQs + 2 Coding Questions to test your DSA skills',
    route: '/mockhub/coding',
    bgClass: 'bg-blue-100 border-blue-200 hover:border-blue-300 text-blue-800',
    icon: '💻',
    disabled: false
  },
  {
    title: '📐 Aptitude Round',
    description: 'Test your logical reasoning and math aptitude',
    route: '/mockhub/aptitude',
    bgClass: 'bg-green-100 border-green-200 hover:border-green-300 text-green-800',
    icon: '🔢',
    disabled: false
  },
  {
    title: '💬 HR Round',
    description: 'Professional soft skills assessment for behavioral interviews',
    route: '/mockhub/hr',
    bgClass: 'bg-purple-100 border-purple-200 hover:border-purple-300 text-purple-800',
    icon: '🤝',
    disabled: false
  },
  {
    title: '🧱 System Design',
    description: 'High-level design problems for advanced learners',
    route: '#',
    bgClass: 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed opacity-70',
    icon: '🏗️',
    disabled: true
  }
];

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

        {/* Mock Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {mockCategories.map((mock, index) => {
            const CardContent = (
              <div className={`group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300
                ${mock.disabled ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl hover:scale-[1.02]'}`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-grid-black dark:bg-grid-white"></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`p-3 rounded-xl transition-colors duration-300
                      ${mock.disabled ? 'bg-gray-100 dark:bg-gray-700' : 
                        mock.title.includes('Coding') ? 'bg-blue-100 dark:bg-blue-900/30' :
                        mock.title.includes('Aptitude') ? 'bg-green-100 dark:bg-green-900/30' :
                        mock.title.includes('HR') ? 'bg-purple-100 dark:bg-purple-900/30' :
                        'bg-gray-100 dark:bg-gray-700'}`}>
                      <span className="text-3xl">{mock.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {mock.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        {mock.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-8">
                    {mock.disabled ? (
                      <span className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full">
                        Coming Soon
                      </span>
                    ) : (
                      <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                        Start Practice
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    )}

                    {/* Features Tags */}
                    <div className="flex gap-2">
                      {mock.title.includes('Coding') && (
                        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                          MCQ + Coding
                        </span>
                      )}
                      {mock.title.includes('Aptitude') && (
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                          45 mins
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );

            return mock.disabled ? (
              <div key={index} className="rounded-2xl">
                {CardContent}
              </div>
            ) : (
              <Link to={mock.route} key={index} className="block">
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MockHub;
