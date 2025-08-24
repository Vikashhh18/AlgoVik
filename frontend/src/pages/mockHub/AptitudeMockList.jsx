import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/getUrl";

const aptitudeMocks = [
  {
    id: "verbal_ability",
    title: "Verbal Ability",
    description: "10 MCQs | 15 mins",
    route: "/mockhub/aptitude/verbal_ability"
  },
  {
    id: "logical_reasoning",
    title: "Logical Reasoning",
    description: "10 MCQs | 15 mins",
    route: "/mockhub/aptitude/logical_reasoning"
  },
  {
    id: "quantitative_aptitude",
    title: "Quantitative Aptitude",
    description: "10 MCQs | 15 mins",
    route: "/mockhub/aptitude/quantitative_aptitude"
  },
  {
    id: "data_interpretation",
    title: "Data Interpretation",
    description: "10 MCQs | 15 mins",
    route: "/mockhub/aptitude/data_interpretation"
  }
];

const AptitudeMockList = () => {
  const [solvedMock, setSolvedMock] = useState([]);
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchSolvedMocks = async () => {
      try {
        if (!user) return;

        const token = await getToken();
        const res = await axios.get(`${baseUrl}/api/mock/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const solvedIds = res.data.map((item) => item.mockId);
        setSolvedMock(solvedIds);
      } catch (error) {
        console.error("Error fetching solved aptitude mocks:", error);
      }
    };

    fetchSolvedMocks();
  }, [user, getToken]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
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
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Tests</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{aptitudeMocks.length}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{solvedMock.length}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">Success Rate</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {aptitudeMocks.length ? Math.round((solvedMock.length / aptitudeMocks.length) * 100) : 0}%
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">Time Per Test</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">15 min</div>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {aptitudeMocks.map((mock, index) => {
            const isSolved = solvedMock.includes(mock.id);

            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Test Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                      <span className="text-2xl">
                        {mock.id.includes('verbal') && '📚'}
                        {mock.id.includes('logical') && '🧩'}
                        {mock.id.includes('quantitative') && '🔢'}
                        {mock.id.includes('data') && '📊'}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {mock.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">{mock.description}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                      MCQ Format
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
                      15 Minutes
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to={mock.route}
                      className="inline-flex items-center text-base font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                    >
                      Start Test
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>

                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${isSolved
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
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
