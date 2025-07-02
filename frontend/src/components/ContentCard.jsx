import React from 'react'

const ContentCard = () => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col">
  <div className="flex items-center mb-4">
    <span className="text-2xl mr-3">🌳</span>
    <h3 className="text-lg font-semibold">Binary Trees</h3>
  </div>
  <p className="text-gray-600 flex-grow">
    Understand tree traversals, height, and balancing…
  </p>
  <div className="mt-4">
    <div className="h-1 bg-indigo-200 rounded overflow-hidden">
      <div className="h-full bg-indigo-600" style={{ width: '45%' }}></div>
    </div>
    <span className="text-sm text-gray-500 mt-1">45% complete</span>
  </div>
</div>

  )
}

export default ContentCard