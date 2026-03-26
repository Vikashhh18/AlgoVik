import React from 'react';

const ProgressBar = ({ progress = 0, totalQuestions = 0, Topic = 'Topic' }) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const solvedCount = Math.round((safeProgress / 100) * totalQuestions);
  const remainingCount = totalQuestions - solvedCount;

  const getMessage = () => {
    if (safeProgress === 100) return 'You Crushed It! 🎉';
    if (safeProgress >= 70) return 'Almost There! Finish Strong!';
    if (safeProgress >= 30) return "Keep Going, You're Doing Great!";
    return "Let's Get Started!";
  };

  const getSubtext = () => {
    if (safeProgress === 100) return `All ${totalQuestions} problems solved. Amazing work!`;
    if (safeProgress >= 70) return `Only ${remainingCount} problems left! You're crushing it!`;
    if (safeProgress >= 30) return `You've completed ${solvedCount} problems. Just ${remainingCount} more to go!`;
    return 'Every expert was once a beginner. Solve 3 problems today to build momentum.';
  };

  const getButtonLabel = () => {
    if (safeProgress === 0) return 'Start Practicing';
    if (safeProgress === 100) return 'Review Progress';
    return 'Continue Practice';
  };

  // Conic gradient for the progress ring
  const conicStyle = {
    background:
      safeProgress === 0
        ? 'conic-gradient(rgb(199 210 254) 0%, rgb(199 210 254) 100%)'
        : `conic-gradient(rgb(99 102 241) ${safeProgress}%, rgb(226 232 240) ${safeProgress}%)`,
    transition: 'background 0.6s ease-in-out',
  };

  return (
    <section className="bg-white dark:bg-gray-800 py-10 sm:py-14 px-6 sm:px-8 rounded-2xl shadow-lg border border-gray-200/20 dark:border-gray-700/30">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left: Text */}
        <div className="text-center md:text-left space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            {Topic}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {getMessage()}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
            {getSubtext()}
          </p>
        </div>

        {/* Right: Ring + Stats */}
        <div className="flex items-center justify-center gap-8 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200/20 dark:border-gray-700/30">
          {/* Circular Progress Ring */}
          <div className="relative w-28 h-28 shrink-0">
            <div className="absolute inset-0 rounded-full" style={conicStyle} />
            <div className="absolute inset-[5px] bg-white dark:bg-gray-800 rounded-full flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 leading-none">
                {safeProgress.toFixed(0)}%
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {solvedCount}/{totalQuestions}
              </span>
            </div>
          </div>

          {/* Stats + Button */}
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Solved</p>
                <p className="text-base font-bold text-gray-900 dark:text-white">{solvedCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Remaining</p>
                <p className="text-base font-bold text-gray-900 dark:text-white">{remainingCount}</p>
              </div>
            </div>

            <button
              className="w-full mt-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Progress action"
            >
              {getButtonLabel()}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressBar;