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
    <section className="bg-white py-16 px-6 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      
    <div className="text-center md:text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="text-indigo-600 ">{Topic} - </span>{getMessage()}
        </h2>
        <p className="text-gray-600 text-lg">{getSubtext()}</p>
      </div>
      <div className="flex items-center justify-center gap-8 p-6 rounded-xl shadow-sm bg-gray-50 border border-gray-100">
        
        <div className="relative w-32 h-32">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(#4f46e5 ${safeProgress * 3.6}deg, #e5e7eb ${safeProgress * 3.6}deg)`,
              transition: 'background 0.5s ease-in-out',
            }}
          ></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center flex-col text-center">
            <span className="text-2xl font-bold text-indigo-600">{safeProgress.toFixed(1)}%</span>
            <span className="text-sm text-gray-500">{solvedCount}/{totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-indigo-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">Solved</p>
              <p className="text-lg font-semibold">{solvedCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">Remaining</p>
              <p className="text-lg font-semibold">{remainingCount}</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow hover:shadow-md"
              aria-label="Progress button"
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
