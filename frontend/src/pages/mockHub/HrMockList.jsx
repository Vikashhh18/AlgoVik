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
    <div className="min-h-screen  px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">
            HR Interview Preparation
          </h1>
          <p className="text-indigo-600 text-lg">
            Top 10 Common Questions with Answering Tips
          </p>
        </div>

        <div className="space-y-4">
          {hrQuestions.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div 
                className="p-5 cursor-pointer flex justify-between items-center"
                onClick={() => toggleExpand(index)}
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {index + 1}. {item.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-indigo-500 transition-transform ${
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
                <div className="px-5 pb-5 pt-2 bg-indigo-50 text-gray-700">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-1.5 rounded-lg mr-3">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm">{item.tips}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Interview Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              Practice your answers but keep them natural and conversational
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              Maintain good eye contact and positive body language
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              Prepare 2-3 questions to ask the interviewer
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              Research the company thoroughly before the interview
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HrMockList;