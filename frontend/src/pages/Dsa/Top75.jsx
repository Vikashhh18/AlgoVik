import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import { useUser, useAuth, SignInButton } from '@clerk/clerk-react';
import axios from 'axios'
import { baseUrl } from '../../utils/getUrl.js';


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
      alert("Please sign in first");
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
  <div className="px-6">
  <ProgressBar
    Topic="Top AlgoVik"
    progress={(solvedCount / questions.length) * 100}
    totalQuestions={questions.length}
  />

  <div className="bg-white rounded-xl mb-12 shadow-md border border-gray-100 overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-indigo-50">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
            Problem
          </th>
          <th className="px-6 py-4 text-center text-sm font-semibold text-indigo-700 uppercase tracking-wide">
            Difficulty
          </th>
          <th className="px-6 py-4 text-right text-sm font-semibold text-indigo-700 uppercase tracking-wide">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {questions.map((p, i) => {
          const solved = isSolved(p.id);
          return (
            <tr key={p.id} className="hover:bg-gray-50 transition duration-150">
              <td className="px-6 py-4">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-800 hover:text-indigo-600 transition"
                >
                  {i + 1}. {p.title}
                </a>
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                    p.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-700'
                      : p.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {p.difficulty}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      solved
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {solved ? (
                      <>
                        <svg
                          className="mr-1 h-3 w-3 text-green-500"
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
                      <>Pending</>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    checked={solved}
                    onChange={() => toggleProblemStatus(p.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                  />
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
};

export default Top75;
