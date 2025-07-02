import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/getUrl";

const mockTests = [
  {
    id: "mock1",
    title: "Mock Test 1",
    description: "10 MCQs + 2 Coding | 45 Minutes",
    route: "/mockhub/coding/mock1"
  },
  {
    id: "mock2",
    title: "Mock Test 2",
    description: "10 MCQs + 2 Coding | 45 Minutes",
    route: "/mockhub/coding/mock2"
  },
  {
    id: "mock3",
    title: "Mock Test 3",
    description: "10 MCQs + 2 Coding | 45 Minutes",
    route: "/mockhub/coding/mock3"
  },
  {
    id: "mock4",
    title: "Mock Test 4",
    description: "10 MCQs + 2 Coding | 45 Minutes",
    route: "/mockhub/coding/mock4"
  }
];


const CodingMockList = () => {

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
      console.log(res);
      const solvedMockIds = res.data.map((item) => item.mockId);
      console.log(solvedMockIds)
      setSolvedMock(solvedMockIds);
    } catch (error) {
      console.error("Error fetching solved mocks:", error);
    }
  };

  if (user) fetchSolvedMocks();
}, [user]);

console.log(solvedMock)



  return (
  <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-white to-slate-100">
  <div className="max-w-5xl mx-auto">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-blue-800">
      🧠 Coding Round – Choose a Mock Test
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {mockTests.map((mock, index) => {
        const isSolved = solvedMock.includes(mock.id);

        return (
          <div
            key={index}
            className="bg-white border border-blue-200 p-6 rounded-2xl shadow hover:shadow-lg transition-all flex flex-col justify-between" // Added flex-col and justify-between
          >
            <div> 
              <h2 className="text-xl font-semibold mb-2 text-blue-700">
                {mock.title}
              </h2>
              <p className="text-gray-700 mb-4">{mock.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4"> 
              <Link
                to={mock.route}
                className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium" // Added font-medium
              >
                Start Test →
              </Link>

              <div className="">
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
          </div>
        );
      })}
    </div>
  </div>
</div>
  );
};

export default CodingMockList;
