import React, { useState } from "react";

const hrQuestions = [
  {
    question: "Tell me about yourself.",
    tips: "Focus on your professional background, key skills, and achievements relevant to the role."
  },
  {
    question: "Why do you want to join our company?",
    tips: "Show your knowledge about the company and align your goals with their mission/values."
  },
  {
    question: "What are your strengths and weaknesses?",
    tips: "Be honest but strategic - mention weaknesses you're actively improving."
  },
  {
    question: "How do you handle stress and pressure?",
    tips: "Provide specific examples of your coping mechanisms in work situations."
  },
  {
    question: "Where do you see yourself in 5 years?",
    tips: "Show ambition but also commitment to growing with the company."
  },
  {
    question: "How do you handle failure?",
    tips: "Demonstrate learning mindset with concrete examples of overcoming setbacks."
  },
  {
    question: "What motivates you?",
    tips: "Connect your motivations to the job requirements and company culture."
  },
  {
    question: "Describe a challenging situation and how you overcame it.",
    tips: "Use STAR method (Situation, Task, Action, Result) to structure your answer."
  },
  {
    question: "How do you work in a team?",
    tips: "Show your collaborative skills with examples of successful teamwork."
  },
  {
    question: "Do you have any questions for us?",
    tips: "Prepare 2-3 thoughtful questions about the role, team, or company growth."
  }
];

const HrMockList = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-4">
            <svg className="w-10 h-10 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 dark:text-white mb-3">
            HR Interview Preparation
          </h1>
          <p className="text-xl text-indigo-600 dark:text-indigo-200 font-medium">
            Top 10 Common Questions with Answering Tips
          </p>
          <div className="mt-4 bg-indigo-200 dark:bg-indigo-800 h-1 w-24 mx-auto rounded-full"></div>
        </div>

        {/* Questions Section */}
        <div className="space-y-6 mb-16">
          {hrQuestions.map((item, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-indigo-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
            >
              <div 
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200">
                    {item.question}
                  </h3>
                </div>
                <svg
                  className={`w-6 h-6 text-indigo-500 dark:text-indigo-400 transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {expandedIndex === index && (
                <div className="px-6 pb-6 pt-2 bg-indigo-50 dark:bg-indigo-900/20 text-gray-700 dark:text-gray-300 animate-fadeIn">
                  <div className="flex items-start">
                    <div className="bg-indigo-200 dark:bg-indigo-700 p-2 rounded-lg mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-md leading-relaxed">{item.tips}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-indigo-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-lg mr-4">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Interview Success Tips</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl">
              <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Preparation
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Research the company thoroughly before the interview
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Practice your answers but keep them natural
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Prepare 2-3 questions to ask the interviewer
                </li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl">
              <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                During Interview
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Maintain good eye contact and positive body language
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Listen carefully and think before answering
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Be authentic and let your personality shine
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-indigo-700 dark:text-indigo-300 font-medium">
            Good luck with your interview preparation! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default HrMockList;