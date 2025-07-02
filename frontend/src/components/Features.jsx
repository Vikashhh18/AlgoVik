import React from 'react'
import { FaBookOpen, FaTasks, FaChartLine, FaFileCode } from 'react-icons/fa'
import Card from './Card'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'DSA Library',
    icon: <FaFileCode className="h-8 w-8 text-indigo-600" />, 
    description: 'Curated problem sets organized by topic and difficulty, with one-click access to solutions.',
    path:"/dsa"
},
{
    title: 'Notes Repository',
    icon: <FaBookOpen className="h-8 w-8 text-indigo-600" />, 
    description: 'Cheat-sheet-style summaries and code snippets for CS fundamentals, languages, and web tech.',
    path:"/notes"
},
{
    title: 'To-Do List',
    icon: <FaTasks className="h-8 w-8 text-indigo-600" />, 
    description: 'Create study tasks, view completion bars, and earn badges as you hit your coding goals.',
    path:"/todo"
},
{
    title: 'Mock Interview Hub',
    icon: <FaChartLine className="h-8 w-8 text-indigo-600" />, 
    description: 'Timed practice sessions with instant feedback, performance charts, and interview-ready prep.',
    path:"/mockhub"
  },
]

export default function Features() {
  return (
    <section id='features' className="bg-gray-50 py-16">
      <div className="max-w-screen-2xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 max-w-screen-2xl sm:grid-cols-2 gap-10">
          {features.map((feature, idx) => (
            <Link to={feature.path} key={idx}>
            <Card feature={feature} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
