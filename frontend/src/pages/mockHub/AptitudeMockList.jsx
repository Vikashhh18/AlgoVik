// AptitudeMockList.jsx
// Lists all available aptitude mock tests with a stats overview at the top.
// Fetches which mocks the current user has already completed from the API.
// Structurally mirrors CodingMockList — same card layout, same stats grid.

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { baseUrl } from '../../utils/getUrl';

// All available aptitude mock tests
const aptitudeMocks = [
  { id: 'verbal_ability',        title: 'Verbal Ability',        description: '10 MCQs | 15 mins', route: '/mockhub/aptitude/verbal_ability',        icon: '📚' },
  { id: 'logical_reasoning',     title: 'Logical Reasoning',     description: '10 MCQs | 15 mins', route: '/mockhub/aptitude/logical_reasoning',     icon: '🧩' },
  { id: 'quantitative_aptitude', title: 'Quantitative Aptitude', description: '10 MCQs | 15 mins', route: '/mockhub/aptitude/quantitative_aptitude', icon: '🔢' },
  { id: 'data_interpretation',   title: 'Data Interpretation',   description: '10 MCQs | 15 mins', route: '/mockhub/aptitude/data_interpretation',   icon: '📊' },
];

// Reusable stat box used in the overview grid
const StatBox = ({ label, value, valueClass = 'text-gray-900 dark:text-white' }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    <div className={`text-2xl font-bold ${valueClass}`}>{value}</div>
  </div>
);

// Completed / Not Started status badge shown on each card
const StatusBadge = ({ isSolved }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
    ${isSolved
      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
  >
    {isSolved ? (
      <>
        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Completed
      </>
    ) : (
      <>
        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Not Started
      </>
    )}
  </span>
);

const AptitudeMockList = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  // Stores the IDs of mocks the user has already completed
  const [solvedMock, setSolvedMock] = useState([]);

  // Fetch completed mock IDs for the current user on mount
  useEffect(() => {
    const fetchSolvedMocks = async () => {
      try {
        if (!user) return;
        const token = await getToken();
        const res = await axios.get(`${baseUrl}/api/mock/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSolvedMock(res.data.map((item) => item.mockId));
      } catch (error) {
        console.error('Error fetching solved aptitude mocks:', error);
      }
    };

    fetchSolvedMocks();
  }, [user, getToken]);

  const completedCount = solvedMock.length;
  const successRate = aptitudeMocks.length ? Math.round((completedCount / aptitudeMocks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Aptitude Tests
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sharpen your logical, quantitative, and analytical skills
          </p>
        </div>

        {/* Stats Overview */}
        <div className="max-w-4xl mx-auto mb-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatBox label="Total Tests" value={aptitudeMocks.length} />
          <StatBox label="Completed" value={completedCount} />
          <StatBox label="Success Rate" value={`${successRate}%`} valueClass="text-emerald-600 dark:text-emerald-400" />
          <StatBox label="Time Per Test" value="15 min" />
        </div>

        {/* Mock Test Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {aptitudeMocks.map((mock, index) => {
            const isSolved = solvedMock.includes(mock.id);

            return (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="p-6 flex flex-col h-full">

                  {/* Card Header: icon + title + description */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                      <span className="text-2xl">{mock.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{mock.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300">{mock.description}</p>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                      MCQ Format
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
                      15 Minutes
                    </span>
                  </div>

                  {/* Card Footer: Start link + status badge */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to={mock.route}
                      className="inline-flex items-center text-base font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                    >
                      Start Test
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <StatusBadge isSolved={isSolved} />
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AptitudeMockList;