import React from 'react'
import { FaGraduationCap, FaBriefcase, FaHandshake } from 'react-icons/fa'
import student1 from '../assets/student1.jpeg'
import student2 from '../assets/student2.jpeg'
import student3 from '../assets/student3.jpeg'


const successStories = [
  {
    name: 'Priya Verma',
    role: 'Software Engineer @ Google',
    photo: '/avatars/priya.jpg',
    quote: 'algoVik helped me structure my interview prep and land my dream role at Google.',
    image: student1
  },
  {
    name: 'Rohan Singh',
    role: 'Backend Developer @ Amazon',
    photo: '/avatars/rohan.jpg',
    quote: 'The mock interview feature gave me the confidence to ace Amazon s coding rounds.',
    image: student2
  },
  {
    name: 'Sneha Patel',
    role: 'Full-Stack Engineer @ Microsoft',
    photo: '/avatars/sneha.jpg',
    quote: 'I loved the guided problem sets and progress tracker—it kept me motivated every day.',
    image: student3
  },
]

export default function AlumniSection() {
  return (
    <section className="bg-white py-16">

      <div className="max-w-screen-2xl mx-auto px-6">
        <h3 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Alumni Success Stories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {successStories.map(({ name, role, quote,image }, idx) => (
            <div
              key={idx}
              className="min-w-[280px] bg-gray-50 rounded-xl shadow p-6 flex-none"
            >
              <img
                src={image}
                alt={name}
                className="h-16 w-16 rounded-full object-cover mb-4 mx-auto"
              />
              <h4 className="text-lg font-semibold text-gray-800 text-center">
                {name}
              </h4>
              <p className="text-sm text-gray-500 text-center mb-4">
                {role}
              </p>
              <blockquote className="text-gray-600 italic text-center">
                “{quote}”
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
