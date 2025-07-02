import React from 'react'

const Card = ({ feature }) => {
  return (
    <div className="bg-white rounded-xl shadow-md md:p-5 sm:p-5 lg:p-6 lg:ml-8 lg:mr-8 flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-200">
      <div className="text-indigo-600 mb-4 text-4xl">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {feature.title}
      </h3>
      <p className="text-gray-600 space-x-2 pl-7 flex-grow">
        {feature.description}
      </p>
    </div>
  )
}

export default Card
