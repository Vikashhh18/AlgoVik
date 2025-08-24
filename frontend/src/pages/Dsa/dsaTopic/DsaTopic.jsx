import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import ProgressBarForTopic from '../../../components/ProgressBarForTopic';
import axios from 'axios';
import { baseUrl } from '../../../utils/getUrl';
import { toast } from 'react-hot-toast';
import ProblemViewer from '../../../components/ProblemViewer';

// const DsaTopic = () => {
//   const { user, isSignedIn } = useUser();
//   const { getToken } = useAuth();
//   const userId = user?.id;

//   const [topics, setTopics] = useState([]);
//   const [progress, setProgress] = useState([]);

//   useEffect(() => {
//     fetch('/TopicWise.json')
//       .then(res => res.json())
//       .then(data => setTopics(data))
//       .catch(err => console.error('Failed to load topics:', err));
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchProgress = async () => {
//       try {
//         const token = await getToken();
//         const res = await axios.get(`${baseUrl}/api/progress?sheetName=topicWise`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProgress(res.data.progress);
//       } catch (err) {
//         console.error('Failed to fetch topic progress:', err);
//       }
//     };

//     fetchProgress();
//   }, [userId, getToken]);

//   const toggleProblemStatus = async (questionId) => {
//     if (!isSignedIn) {
//        toast.error("Please sign in to continue.");
//   return;
//     }

//     const token = await getToken();

//     const existing = (progress || []).find(
//       (entry) => entry.questionId === questionId && entry.sheetName === 'topicWise'
//     );

//     const newStatus = existing?.status === "solved" ? "unsolved" : "solved";

//     try {
//       await axios.post(`${baseUrl}/api/progress`, {
//         questionId,
//         sheetName: 'topicWise',
//         status: newStatus
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });

//       const updated = await axios.get(`${baseUrl}/api/progress?sheetName=topicWise`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setProgress(updated.data.progress);
//       toast.success(`Question marked as ${newStatus}`);
//     } catch (err) {
//       console.error('Error updating progress:', err);
//     }
//   };

//   const isSolved = (id) => {
//     return (progress || []).some(
//       (entry) => entry.questionId === id && entry.sheetName === "topicWise" && entry.status === "solved"
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="text-center mb-12 space-y-4">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
//             Topic-wise DSA Questions
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Master Data Structures and Algorithms topic by topic
//           </p>
//         </div>

//         {/* Topics Grid */}
//         <div className="space-y-12">
//           {topics.map((topicBlock, idx) => {
//             const total = topicBlock.questions.length;
//             const solved = topicBlock.questions.filter(q => isSolved(q.title)).length;
//             const progressPercentage = total === 0 ? 0 : (solved / total) * 100;

//             return (
//               <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/20 dark:border-gray-700/30 overflow-hidden backdrop-blur-sm">
//                 {/* Topic Header */}
//                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                     <div className="flex items-center gap-3">
//                       <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
//                         <span className="text-2xl">{topicBlock.emoji}</span>
//                       </div>
//                       <div>
//                         <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                           {topicBlock.topic}
//                         </h2>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                           {solved} of {total} questions solved
//                         </p>
//                       </div>
//                     </div>
//                     <div className="w-full sm:w-1/3">
//                       <ProgressBarForTopic
//                         progress={progressPercentage}
//                         totalQuestions={total}
//                         Topic={topicBlock.topic}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Questions Table */}
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-50/50 dark:bg-gray-900/50">
//                       <tr>
//                         <th scope="col" className="px-6 py-4 text-left">
//                           <div className="flex items-center gap-2">
//                             <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Problem</span>
//                             <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">({total})</span>
//                           </div>
//                         </th>
//                         <th scope="col" className="px-6 py-4 text-center text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
//                           Difficulty
//                         </th>
//                         <th scope="col" className="px-6 py-4 text-right text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
//                           Status
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                       {topicBlock.questions.map((q, i) => {
//                         const solved = isSolved(q.title);
//                         return (
//                           <tr 
//                             key={i} 
//                             className="group hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-200"
//                           >
//                             <td className="px-6 py-4">
//                               <a
//                                 href={q.link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
//                               >
//                                 <span className="flex items-center justify-center w-6 h-6 text-xs text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
//                                   {String(i + 1).padStart(2, '0')}
//                                 </span>
//                                 <span className="line-clamp-1">{q.title}</span>
//                               </a>
//                             </td>
//                             <td className="px-6 py-4 text-center">
//                               <span
//                                 className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
//                                   q.difficulty === 'Easy'
//                                     ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-600/10'
//                                     : q.difficulty === 'Medium'
//                                     ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-600/10'
//                                     : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-600/10'
//                                 }`}
//                               >
//                                 {q.difficulty}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4">
//                               <div className="flex items-center justify-end gap-3">
//                                 <span
//                                   className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
//                                     solved
//                                       ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-600/10'
//                                       : 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400 ring-1 ring-gray-600/10'
//                                   }`}
//                                 >
//                                   {solved ? (
//                                     <>
//                                       <svg
//                                         className="mr-1.5 h-3 w-3"
//                                         fill="currentColor"
//                                         viewBox="0 0 20 20"
//                                       >
//                                         <path
//                                           fillRule="evenodd"
//                                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                           clipRule="evenodd"
//                                         />
//                                       </svg>
//                                       Solved
//                                     </>
//                                   ) : (
//                                     'Pending'
//                                   )}
//                                 </span>
//                                 <button
//                                   onClick={() => toggleProblemStatus(q.title)}
//                                   className={`p-1.5 rounded-lg transition-all duration-200 ${
//                                     solved
//                                       ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40'
//                                       : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
//                                   }`}
//                                 >
//                                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                   </svg>
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };


const DsaTopic = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const userId = user?.id;

  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

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
    if (!isSignedIn) {
       toast.error("Please sign in to continue.");
  return;
    }

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
      toast.success(`Question marked as ${newStatus}`);
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const isSolved = (id) => {
    return (progress || []).some(
      (entry) => entry.questionId === id && entry.sheetName === "topicWise" && entry.status === "solved"
    );
  };

  const handleProblemClick = (question) => {
    setSelectedProblem(question);
  };

  const handleBackToTopics = () => {
    setSelectedProblem(null);
  };

  const handleProblemSolved = (questionTitle) => {
    toggleProblemStatus(questionTitle);
    toast.success('Problem solved! 🎉');
  };

  // If a problem is selected, show the problem viewer
  if (selectedProblem) {
    return (
      <ProblemViewer
        problem={selectedProblem}
        onBack={handleBackToTopics}
        onSolved={handleProblemSolved}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Topic-wise DSA Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master Data Structures and Algorithms topic by topic. Click on any question to open the coding environment.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="space-y-12">
          {topics.map((topicBlock, idx) => {
            const total = topicBlock.questions.length;
            const solved = topicBlock.questions.filter(q => isSolved(q.title)).length;
            const progressPercentage = total === 0 ? 0 : (solved / total) * 100;

            return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/20 dark:border-gray-700/30 overflow-hidden backdrop-blur-sm">
                {/* Topic Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                        <span className="text-2xl">{topicBlock.emoji}</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {topicBlock.topic}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {solved} of {total} questions solved
                        </p>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/3">
                      <ProgressBarForTopic
                        progress={progressPercentage}
                        totalQuestions={total}
                        Topic={topicBlock.topic}
                      />
                    </div>
                  </div>
                </div>

                {/* Questions Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Problem</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">({total})</span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                          Difficulty
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                          Actions
                        </th>
                        <th scope="col" className="px-6 py-4 text-right text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {topicBlock.questions.map((q, i) => {
                        const solved = isSolved(q.title);
                        return (
                          <tr 
                            key={i} 
                            className="group hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-200"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3 text-sm font-medium text-gray-900 dark:text-white">
                                <span className="flex items-center justify-center w-6 h-6 text-xs text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="line-clamp-1">{q.title}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span
                                className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                                  q.difficulty === 'Easy'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-600/10'
                                    : q.difficulty === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-600/10'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-600/10'
                                }`}
                              >
                                {q.difficulty}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleProblemClick(q)}
                                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-colors"
                                >
                                  Solve
                                </button>
                                <a
                                  href={q.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md transition-colors"
                                >
                                  LeetCode
                                </a>
                              </div>
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
                                  onClick={() => toggleProblemStatus(q.title)}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

// export default DsaTopic;
export default DsaTopic;
