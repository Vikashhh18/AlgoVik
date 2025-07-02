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
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-6 text-indigo-900 leading-tight">
          Your Interview Readiness Hub
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Choose a mock test to sharpen your skills for your dream job.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockCategories.map((mock, index) => {
            const CardContent = (
              <div
                className={`block p-7 rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1
                ${mock.bgClass} ${mock.disabled ? 'pointer-events-none' : ''}`}
              >
                <div className="flex items-center mb-3">
                  <span className="text-4xl mr-3">{mock.icon}</span>
                  <h2 className={`text-2xl font-bold ${mock.disabled ? 'text-gray-500' : 'text-gray-900'}`}>
                    {mock.title}
                  </h2>
                </div>
                <p className={`text-lg ${mock.disabled ? 'text-gray-500' : 'text-gray-700'}`}>
                  {mock.description}
                </p>
                {mock.disabled && (
                  <span className="mt-4 inline-block text-sm font-semibold px-3 py-1 rounded-full bg-gray-200 text-gray-600">
                    Coming Soon
                  </span>
                )}
              </div>
            );

            return mock.disabled ? (
              <div key={index} aria-disabled className="rounded-2xl">{CardContent}</div>
            ) : (
              <Link to={mock.route} key={index} className="rounded-2xl">
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
