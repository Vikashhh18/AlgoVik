import React from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase } from 'react-icons/fa'

const successStories = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer @ Google',
    quote: 'The structured DSA practice and mock interviews helped me crack the coding rounds with confidence.',
    achievement: 'Placed in 3 months'
  },
  {
    name: 'Rohan Kumar',
    role: 'Backend Developer @ Amazon',
    quote: 'Company-specific question banks and real interview scenarios prepared me for actual workplace challenges.',
    achievement: '3 offers received'
  },
  {
    name: 'Anjali Patel',
    role: 'Full-Stack Engineer @ Microsoft',
    quote: 'The community support and detailed solutions helped me improve my problem-solving approach significantly.',
    achievement: 'From beginner to offer'
  },
]

export default function AlumniSection() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute top-10 -right-10 w-40 h-40 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-45 blur-xl"></div>
      <div className="absolute bottom-10 -left-10 w-40 h-40 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-12 blur-xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Success <span className="text-indigo-600 dark:text-indigo-400">Stories</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Real developers who transformed their careers with Algovik
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {successStories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
            >
              {/* Quote */}
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  "{story.quote}"
                </p>
              </div>

              {/* Profile Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {story.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {story.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {story.role}
                  </p>
                </div>
              </div>

              {/* Achievement */}
              <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                <FaBriefcase className="w-4 h-4" />
                {story.achievement}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  )
}