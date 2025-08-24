import React from 'react';

const ProgressBar = ({ progress = 0, totalQuestions = 0, Topic = "Topic"}) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const solvedCount = Math.round((safeProgress / 100) * totalQuestions)
  const remainingCount = totalQuestions - solvedCount;

  const getMessage = () => {
    if (safeProgress < 30) return "Let's Get Started!";
    if (safeProgress < 70) return "Keep Going, You're Doing Great!";
    return "Almost There! Finish Strong!";
  };

  const getSubtext = () => {
    if (safeProgress < 30) return "Every expert was once a beginner. Solve 3 problems today to build momentum.";
    if (safeProgress < 70) return `You've completed ${solvedCount} problems. Just ${remainingCount} more to go!`;
    return `Only ${remainingCount} problems left! You're crushing it!`;
  };

  const getButtonLabel = () => {
    if (safeProgress === 0) return "Start Practicing";
    if (safeProgress === 100) return "Review Progress";
    return "Continue Practice";
  };

  return (
    <section className="bg-white dark:bg-gray-800 py-12 sm:py-16 px-4 sm:px-6 rounded-2xl shadow-lg border border-gray-200/20 dark:border-gray-700/30">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-indigo-600 dark:text-indigo-400">{Topic} - </span>
            {getMessage()}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">{getSubtext()}</p>
        </div>

        <div className="flex items-center justify-center gap-8 p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200/20 dark:border-gray-700/30 backdrop-blur-sm">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            
            {/* Progress circle */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, ${
                  safeProgress === 0 
                    ? '#e5e7eb' 
                    : `rgb(99 102 241 / ${safeProgress}%) ${safeProgress}%, #e5e7eb ${safeProgress}%`
                })`,
                transition: 'all 0.5s ease-in-out',
              }}
            ></div>
            
            {/* Center content */}
            <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center flex-col text-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {safeProgress.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {solvedCount}/{totalQuestions}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Solved</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{solvedCount}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Remaining</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{remainingCount}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                className="w-full px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Progress button"
              >
                {getButtonLabel()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressBar;
