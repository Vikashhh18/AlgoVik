import React, { useEffect, useState,useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { baseUrl } from '../utils/getUrl';
const Dashboard = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [sheetProgress, setSheetProgress] = useState([]);

  const sheets = useMemo(() => [
    { name: 'top75', label: 'Top 75', link: '/75-interview', total: 75 },
    { name: 'top50', label: 'Top 50', link: '/algo-top-questions', total: 50 },
    { name: 'topicWise', label: 'Topic wise questions', link: '/dsa', total: 180 },
  ], []);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = await getToken();
        const sheetResults = await Promise.all(
          sheets.map(async (sheet) => {
            try {
              const res = await axios.get(
                `${baseUrl}/api/progress?sheetName=${sheet.name}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              const solved = res.data.progress.filter(p => p.status === 'solved').length;
              const total = sheet.total;
              const progress = Math.round((solved / total) * 100);
              return { ...sheet, progress };
            } catch {
              return { ...sheet, progress: 0 };
            }
          })
        );
        setSheetProgress(sheetResults);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [getToken, sheets]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 p-8 sm:p-12">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
            <div className="relative">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Welcome back, {user?.firstName || 'Coder'} 👋
              </h1>
              <p className="text-indigo-100 text-lg sm:text-xl max-w-2xl">
                Track your progress, practice questions, and improve your coding skills.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Question Sets Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sheetProgress.map((sheet, i) => (
                <Link 
                  key={i}
                  to={sheet.link}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-indigo-500/5 group-hover:to-indigo-500/5 dark:group-hover:from-indigo-500/10 dark:group-hover:via-indigo-500/10 dark:group-hover:to-indigo-500/10 transition-all duration-500"></div>
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                        <span className="text-2xl">
                          {sheet.name === 'top75' ? '🎯' : sheet.name === 'top50' ? '⭐' : '📚'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{sheet.label}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {Math.round((sheet.progress * sheet.total) / 100)} of {sheet.total} completed
                        </p>
                      </div>
                    </div>

                    {/* Progress Circle */}
                    <div className="relative pt-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                        <div 
                          className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 transition-all duration-500"
                          style={{ width: `${sheet.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{sheet.progress}%</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 flex justify-end">
                      <span className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform duration-200">
                        Continue Learning
                        <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Questions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Questions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {sheetProgress.reduce((acc, sheet) => acc + sheet.total, 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Questions Solved */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Questions Solved</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {sheetProgress.reduce((acc, sheet) => acc + Math.round((sheet.progress * sheet.total) / 100), 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Average Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Average Progress</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(sheetProgress.reduce((acc, sheet) => acc + sheet.progress, 0) / sheetProgress.length)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Time to Complete */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                  <span className="text-2xl">⏳</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Est. Time to Complete</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round((sheetProgress.reduce((acc, sheet) => acc + sheet.total, 0) - 
                      sheetProgress.reduce((acc, sheet) => acc + Math.round((sheet.progress * sheet.total) / 100), 0)) * 0.5)} hrs
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
