// CodingMock.jsx
// The actual coding mock test page. Loads MCQs + coding problems from MockCoding.json
// based on the :mockId URL param. On submit, scores the MCQs and posts the result to the API.

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from '../../utils/getUrl';

// Difficulty badge color map
const DIFFICULTY_COLORS = {
  Easy:   'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard:   'bg-red-100 text-red-800',
};

const CodingMock = () => {
  const { mockId } = useParams();
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [mock, setMock] = useState(null);          // full mock data (mcqs + coding)
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOption }

  // Load mock data for the current mockId from the public JSON file
  useEffect(() => {
    fetch('/MockCoding.json')
      .then((res) => res.json())
      .then((data) => setMock(data[mockId]))
      .catch((err) => {
        console.error(err);
        alert('Error loading mock data');
      });
  }, [mockId]);

  // Called when the user clicks "Submit Test"
  const handleSubmit = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to continue.');
      return;
    }
    if (!mock) return;

    // Score the MCQs by comparing user answers to correct answers
    const total = mock.mcqs.length;
    const correct = mock.mcqs.filter((q) => userAnswers[q.id] === q.answer).length;

    const result = {
      mockId,
      userId: user.id,
      total,
      correct,
      timestamp: new Date().toISOString(),
    };

    try {
      const token = await getToken();
      await axios.post(`${baseUrl}/api/mock`, result, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Test submitted! You got ${correct} out of ${total} correct.`);
      navigate('/mockhub/coding');
    } catch (err) {
      console.error('Error saving result:', err);
      alert('Something went wrong while submitting.');
    }
  };

  // Show loading state while JSON is being fetched
  if (!mock) {
    return <p className="text-center mt-10 text-gray-600 dark:text-gray-300">Loading {mockId}...</p>;
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-white mb-2">
            🧠 {mockId.replace('mock', 'Mock Test ')} – Coding Round
          </h1>
          <p className="text-blue-600 font-bold dark:text-white">Complete all sections to finish the test</p>
        </div>

        {/* ── MCQ Section ── */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {/* Section Header */}
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <span className="text-blue-600 text-xl">🧪</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Multiple Choice Questions</h2>
          </div>

          <div className="space-y-4">
            {mock.mcqs.map((q, index) => (
              <div key={q.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow transition">
                <p className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                  Q{index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label
                      key={i}
                      className="flex items-center space-x-3 p-2 hover:bg-blue-50 dark:hover:bg-gray-900 rounded cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt}
                        onChange={() => setUserAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Coding Problems Section ── */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          {/* Section Header */}
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <span className="text-blue-600 text-xl">💻</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Coding Problems</h2>
          </div>

          <div className="space-y-4">
            {mock.coding.map((problem, i) => (
              <div key={problem.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow transition">
                {/* Problem title + difficulty badge */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Q{i + 1}. {problem.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${DIFFICULTY_COLORS[problem.difficulty] ?? DIFFICULTY_COLORS.Hard}`}>
                    {problem.difficulty}
                  </span>
                </div>

                {/* Link to solve on LeetCode */}
                <a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Solve on LeetCode
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* Manual "mark as solved" checkbox */}
                <div className="mt-3 flex items-center">
                  <input
                    type="checkbox"
                    id={`solved-${problem.id}`}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor={`solved-${problem.id}`} className="cursor-pointer ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Mark as solved
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            Submit Test
          </button>
        </div>

      </div>
    </div>
  );
};

export default CodingMock;