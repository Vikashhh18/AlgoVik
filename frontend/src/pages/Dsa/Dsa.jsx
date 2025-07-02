import React, { useEffect, useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
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
    <section className="mt-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Data Structures & Algorithms</h1>
        <p className="text-gray-600 mt-2">Master essential patterns and problem-solving techniques</p>
      </div>

      <div className="mb-16">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Practice Sheets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 gap-6">
          {dsaSheets.map(({ topic, description, path }, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{topic}</h3>
                <p className="text-gray-500 mb-4">{description}</p>
                <Link
                  to={path}
                  className="inline-block px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Start Practice &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <DsaTopic/>
      </div>
    </section>
  );
};

export default Dsa;
