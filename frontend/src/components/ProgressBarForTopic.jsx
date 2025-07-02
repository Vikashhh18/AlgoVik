import React from 'react';

const ProgressBarForTopic = ({ progress, totalQuestions, Topic }) => {
  return (
    <div className="w-full max-w-xs">
      <div className="flex justify-between mb-1 text-xs text-gray-500">
        <span>{Topic}</span>
        <span>{progress.toFixed(0)}% • {totalQuestions} Questions</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarForTopic;
