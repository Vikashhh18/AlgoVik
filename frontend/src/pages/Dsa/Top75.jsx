import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import { useUser, useAuth, SignInButton } from '@clerk/clerk-react';
import axios from 'axios'
import { baseUrl } from '../../utils/getUrl.js';
import toast from 'react-hot-toast';


const Top75 = () => {
   const { isSignedIn } = useUser();
  const { user } = useUser();
  const { getToken } = useAuth();
  const userId = user?.id;

  const [useProgress, setUseProgress] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/75Questions.json')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong while loading questions');
      });
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchProgress = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${baseUrl}/api/progress?sheetName=top75`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUseProgress(res.data.progress);
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    };

    fetchProgress();
  }, [userId]);


const toggleProblemStatus = async (problemId) => {
  try {
     if (!isSignedIn) {
       toast.error("Please sign in to continue.");
  return;
    }

    const token = await getToken();

  
    const existing = useProgress.find(
  (entry) => String(entry.questionId) === String(problemId) && entry.sheetName === "top75"
);


    const newStatus = existing?.status === "solved" ? "unsolved" : "solved";

    await axios.post(
      `${baseUrl}/api/progress`,
      {
        questionId: String(problemId),
        sheetName: "top75",
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await axios.get(`${baseUrl}/api/progress?sheetName=top75`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUseProgress(res.data.progress);
    toast.success(`Question marked as ${newStatus}`);
  } catch (err) {
    console.error("Failed to update progress:", err);
  }
};

 const isSolved = (id) => {
  return useProgress?.some(
    (entry) =>
      String(entry.questionId) === String(id) &&
      entry.sheetName === 'top75' &&
      entry.status === 'solved'
  );
};

  const solvedCount = useProgress.filter(
    (entry) => entry.sheetName === 'top75' && entry.status === 'solved'
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Top 75 Interview Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master these essential coding questions to ace your technical interviews
          </p>
          
          {/* Progress Overview */}
          <div className="mt-8">
            <ProgressBar
              Topic="AlgoVik 75"
              progress={(solvedCount / questions.length) * 100}
              totalQuestions={questions.length}
            />
          </div>
        </div>

        {/* Questions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/20 dark:border-gray-700/30 overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Problem</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">({questions.length})</span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {questions.map((p, i) => {
                  const solved = isSolved(p.id);
                  return (
                    <tr 
                      key={p.id} 
                      className="group hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-200"
                    >
                      <td className="px-6 py-4">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                        >
                          <span className="flex items-center justify-center w-6 h-6 text-xs text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="line-clamp-1">{p.title}</span>
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                            p.difficulty === 'Easy'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-600/10'
                              : p.difficulty === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-600/10'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-600/10'
                          }`}
                        >
                          {p.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              solved
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-600/10'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400 ring-1 ring-gray-600/10'
                            }`}
                          >
                            {solved ? (
                              <>
                                <svg
                                  className="mr-1.5 h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Solved
                              </>
                            ) : (
                              'Pending'
                            )}
                          </span>
                          <button
                            onClick={() => toggleProblemStatus(p.id)}
                            className={`p-1.5 rounded-lg transition-all duration-200 ${
                              solved
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40'
                                : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Top75;
