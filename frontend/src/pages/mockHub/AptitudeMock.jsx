// AptitudeMock.jsx
// The actual aptitude test page. Loads MCQ questions from MockAptitude.json
// based on the :aptId URL param. On submit, scores the answers and posts the result to the API.

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from '../../utils/getUrl';

const AptitudeMock = () => {
  const { aptId } = useParams();
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);           // list of MCQ question objects
  const [userAnswers, setUserAnswers] = useState({});       // { [questionId]: selectedOption }

  // Load questions for this aptitude topic from the public JSON file
  useEffect(() => {
    fetch('/MockAptitude.json')
      .then((res) => res.json())
      .then((data) => {
        const selected = data[aptId];
        if (selected?.mcqs) {
          setQuestions(selected.mcqs);
        } else {
          alert('Invalid aptitude topic or no questions found.');
        }
      })
      .catch((err) => {
        console.error('Error loading mock data:', err);
        alert('Failed to load aptitude mock test.');
      });
  }, [aptId]);

  // Called when the user clicks "Submit Test"
  const handleSubmit = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to continue.');
      return;
    }

    // Score by comparing user answers to correct answers
    const total = questions.length;
    const correct = questions.filter((q) => userAnswers[q.id] === q.answer).length;

    const result = {
      userId: user.id,
      mockId: aptId,
      correct,
      total,
      timestamp: new Date().toISOString(),
    };

    try {
      const token = await getToken();
      await axios.post(`${baseUrl}/api/mock`, result, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Test submitted! You got ${correct} out of ${total} correct.`);
      navigate('/mockhub/aptitude');
    } catch (error) {
      console.error('Error submitting result:', error);
      alert('Failed to submit your result.');
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-white mb-2">
            🧠 Aptitude Test – {aptId.replace(/_/g, ' ').toUpperCase()}
          </h1>
          <p className="text-blue-600 dark:text-gray-300">Answer all questions to complete the test</p>
        </div>

        {/* Loading State */}
        {questions.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading questions...</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Question Cards */}
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700"
              >
                <p className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                  Q{index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition ${
                        userAnswers[q.id] === opt
                          ? 'bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt}
                        checked={userAnswers[q.id] === opt}
                        onChange={() => setUserAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition font-medium"
              >
                Submit Test
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AptitudeMock;