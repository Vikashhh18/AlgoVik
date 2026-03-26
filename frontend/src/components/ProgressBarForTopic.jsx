import React from 'react';

const ProgressBarForTopic = ({ progress = 0, totalQuestions = 0, Topic = 'Topic' }) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const solvedCount = Math.round((safeProgress / 100) * totalQuestions);

  return (
    <div className="w-full sm:w-64">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
          {Topic}
        </span>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 ml-2 shrink-0">
          {solvedCount}/{totalQuestions} &nbsp;·&nbsp; {safeProgress.toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 transition-all duration-500"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBarForTopic;