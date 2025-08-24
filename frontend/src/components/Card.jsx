import React from 'react'

const Card = ({ feature }) => {
  return (
    <div className="bg-white dark:bg-gray-800 h-full rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-700/30 transition-shadow duration-300">
      <div className="p-6 h-full flex flex-col items-center text-center">
        <div className="bg-indigo-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
          <div className="text-indigo-600 dark:text-indigo-400">
            {feature.icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

export default Card
