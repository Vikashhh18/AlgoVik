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

    if (user) fetchSolvedMocks();
  }, [user]);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-white to-slate-100">
      <div className="max-w-5xl mx-auto rounded-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-16 text-blue-700">
          📊 Aptitude Round – Choose a Mock Test
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {aptitudeMocks.map((mock, index) => {
            const isSolved = solvedMock.includes(mock.id);

            return (
              <div
                key={index}
                className="bg-white border border-blue-200 p-6 rounded-2xl shadow hover:shadow-lg transition-all"
              >
                <h2 className="text-xl font-bold mb-2 text-blue-600">
                  {mock.title}
                </h2>
                <p className="text-gray-700 mb-4">{mock.description}</p>

                <div className="flex items-center justify-between">
                  <Link
                    to={mock.route}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition hover:shadow-md"
                  >
                    Start Test →
                  </Link>

                  <button
                    disabled
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      isSolved
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {isSolved ? "✅ Solved" : "⏳ Not Solved"}
                  </button>
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
