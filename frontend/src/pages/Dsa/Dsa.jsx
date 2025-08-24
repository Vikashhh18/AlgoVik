import React from 'react';
import { Link } from 'react-router-dom';
import DsaTopic from './dsaTopic/DsaTopic';

const Dsa = () => {
  const dsaSheets = [
    {
      topic: "Top algoVik Important Questions",
      description: "Ideal for last-minute prep: cover the absolute must-know problems to make the strongest impact in your coding rounds.",
      path: "/algo-top-questions"
    },
    {
      topic: "75 Most Important Questions for Interview",
      description: "A balanced collection that goes beyond the essentials—give yourself a solid foundation without getting overwhelmed.",
      path: "/75-interview"
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="text-center sm:text-left mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Data Structures & Algorithms
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
            Master essential patterns and problem-solving techniques
          </p>
        </div>

        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 sm:mb-6">
            Practice Sheets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {dsaSheets.map(({ topic, description, path }, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-700/50 transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {topic}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-4">
                    {description}
                  </p>
                  <Link
                    to={path}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <span>Start Practice</span>
                    <span className="ml-2">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12">
          <DsaTopic/>
        </div>
      </div>
    </section>
  );
};

export default Dsa;
