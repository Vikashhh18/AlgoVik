import React from 'react'
import { FaBookOpen, FaTasks, FaChartLine, FaFileCode } from 'react-icons/fa'
import Card from './Card'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'DSA Library',
    icon: <FaFileCode className="h-7 w-7" />,
    description: 'Curated problem sets organized by topic and difficulty, with one-click access to solutions.',
    path: "/dsa"
  },
  {
    title: 'Notes Repository',
    icon: <FaBookOpen className="h-7 w-7" />,
    description: 'Cheat-sheet-style summaries and code snippets for CS fundamentals, languages, and web tech.',
    path: "/notes"
  },
  {
    title: 'To-Do List',
    icon: <FaTasks className="h-7 w-7" />,
    description: 'Create study tasks, view completion bars, and earn badges as you hit your coding goals.',
    path: "/todo"
  },
  {
    title: 'Mock Interview Hub',
    icon: <FaChartLine className="h-7 w-7" />,
    description: 'Timed practice sessions with instant feedback, performance charts, and interview-ready prep.',
    path: "/mockhub"
  },
]

export default function Features() {
  return (
    <section id='features' className="bg-gray-50 dark:bg-gray-900 dark:border-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to ace your technical interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-lg md:max-w-none mx-auto">
          {features.map((feature, idx) => (
            <Link to={feature.path} key={idx} className="group">
              <Card feature={feature} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
