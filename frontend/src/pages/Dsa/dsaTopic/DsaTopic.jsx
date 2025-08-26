import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import ProgressBarForTopic from '../../../components/ProgressBarForTopic';
import axios from 'axios';
import { baseUrl } from '../../../utils/getUrl';
import toast from 'react-hot-toast';

const DsaTopic = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const userId = user?.id;

  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetch('/TopicWise.json')
      .then(res => res.json())
      .then(data => setTopics(data))
      .catch(err => console.error('Failed to load topics:', err));
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchProgress = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${baseUrl}/api/progress?sheetName=topicWise`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProgress(res.data.progress);
      } catch (err) {
        console.error('Failed to fetch topic progress:', err);
      }
    };

    fetchProgress();
  }, [userId, getToken]);

  const toggleProblemStatus = async (questionId) => {
    if (!isSignedIn) {
      toast.error("Please sign in to continue.");
      return;
    }

    try {
      const token = await getToken();
      const existing = progress.find(
        (entry) => entry.questionId === questionId && entry.sheetName === 'topicWise'
      );

      const newStatus = existing?.status === "solved" ? "unsolved" : "solved";

      await axios.post(`${baseUrl}/api/progress`, {
        questionId,
        sheetName: 'topicWise',
        status: newStatus
      }, { headers: { Authorization: `Bearer ${token}` } });

      const updated = await axios.get(`${baseUrl}/api/progress?sheetName=topicWise`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProgress(updated.data.progress);
      toast.success(`Question marked as ${newStatus}`);
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const isSolved = (id) => {
    return progress.some(
      (entry) => entry.questionId === id && entry.sheetName === "topicWise" && entry.status === "solved"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-10">
        Topic-wise DSA Questions
      </h1>

      {topics.map((topicBlock, idx) => {
        const total = topicBlock.questions.length;
        const solved = topicBlock.questions.filter(q => isSolved(q.id || q.title)).length;
        const progressPercentage = total === 0 ? 0 : (solved / total) * 100;

        return (
          <div key={idx} className="mb-10 sm:mb-16">
            {/* Topic Header with Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-white flex items-center gap-2">
                <span>{topicBlock.emoji}</span> {topicBlock.topic}
              </h2>
              <ProgressBarForTopic
                progress={progressPercentage}
                totalQuestions={total}
                Topic={topicBlock.topic}
              />
            </div>

            {/* Table Wrapper for Mobile Scroll */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/20 dark:border-gray-700/30 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-xs sm:text-sm">
                <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                      Problem
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                      Difficulty
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {topicBlock.questions.map((q, i) => {
                    const solved = isSolved(q.id || q.title);
                    return (
                      <tr key={i} className="group hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all">
                        {/* Problem */}
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <a href={q.link} target="_blank" rel="noopener noreferrer"
                             className="flex items-center gap-2 sm:gap-3 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-xs sm:text-sm">
                            <span className="flex items-center justify-center w-6 h-6 text-[10px] sm:text-xs text-gray-400 group-hover:text-indigo-500">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {q.title}
                          </a>
                        </td>

                        {/* Difficulty */}
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                          <span className={`px-2 sm:px-3 py-1 inline-flex text-[10px] sm:text-xs font-semibold rounded-full ${
                            q.difficulty === 'Easy'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : q.difficulty === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {q.difficulty}
                          </span>
                        </td>

                        {/* Status + Toggle */}
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center justify-end gap-2 sm:gap-3">
                            <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                              solved
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400'
                            }`}>
                              {solved ? 'Solved' : 'Pending'}
                            </span>
                            <button
                              onClick={() => toggleProblemStatus(q.id || q.title)}
                              className={`p-1 sm:p-1.5 rounded-lg transition ${
                                solved
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:bg-gray-200'
                              }`}
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        );
      })}
    </div>
  );
};

export default DsaTopic;
