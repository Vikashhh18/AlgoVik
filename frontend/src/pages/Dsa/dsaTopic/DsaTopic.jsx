import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import ProgressBarForTopic from '../../../components/ProgressBarForTopic';
import axios from 'axios';
import { baseUrl } from '../../../utils/getUrl';

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProgress(res.data.progress);
      } catch (err) {
        console.error('Failed to fetch topic progress:', err);
      }
    };

    fetchProgress();
  }, [userId, getToken]);

  const toggleProblemStatus = async (questionId) => {
    if (!isSignedIn) return alert('Please sign in');

    const token = await getToken();

    const existing = (progress || []).find(
      (entry) => entry.questionId === questionId && entry.sheetName === 'topicWise'
    );

    const newStatus = existing?.status === "solved" ? "unsolved" : "solved";

    try {
      await axios.post(`${baseUrl}/api/progress`, {
        questionId,
        sheetName: 'topicWise',
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const updated = await axios.get(`${baseUrl}/api/progress?sheetName=topicWise`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProgress(updated.data.progress);
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const isSolved = (id) => {
    return (progress || []).some(
      (entry) => entry.questionId === id && entry.sheetName === "topicWise" && entry.status === "solved"
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Topic-wise DSA Questions</h1>

      {topics.map((topicBlock, idx) => {
        const total = topicBlock.questions.length;
        const solved = topicBlock.questions.filter(q => isSolved(q.title)).length;
        const progressPercentage = total === 0 ? 0 : (solved / total) * 100;

        return (
          <div key={idx} className="mb-14">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-2xl">{topicBlock.emoji}</span> {topicBlock.topic}
              </h2>
              <ProgressBarForTopic
                progress={progressPercentage}
                totalQuestions={total}
                Topic={topicBlock.topic}
              />
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Problem</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Difficulty</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topicBlock.questions.map((q, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <a href={q.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:underline">
                          {q.title}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          q.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          isSolved(q.title) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {isSolved(q.title) ? 'Solved' : 'Pending'}
                        </span>
                        <input
                          type="checkbox"
                          checked={isSolved(q.title)}
                          onChange={() => toggleProblemStatus(q.title)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </td>
                    </tr>
                  ))}
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
