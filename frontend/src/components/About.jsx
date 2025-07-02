import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">About This Platform</h1>

      <p className="text-lg mb-8 leading-relaxed">
        Our mission is simple — to make mastering Data Structures and Algorithms (DSA) and interview preparation 
        more structured, motivating, and trackable for every learner. This platform is your personal tech journey 
        — not just a question bank, but a full ecosystem for growth.
      </p>

      {/* Why this platform */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">📌 Why This Platform?</h2>
          <p className="leading-relaxed">
            <span className='text-indigo-600 text-md font-semibold' >algoVik</span> often feels overwhelming — scattered questions, no structure, and no way to track progress. 
            This platform solves that by offering curated sheets, topic-wise breakdowns, mock tests, notes, and a 
            personalized dashboard — all in one place.
          </p>
        </div>

        {/* About the Creator */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">👨‍💻 Meet the Creator</h2>
          <p className="leading-relaxed">
            I’m <strong className="text-indigo-600">Vikash Sharma</strong>, a B.Tech 2nd-year student specializing in Data Science. 
            After solving 800+ DSA questions and mentoring friends, I decided to build this platform to help others stay focused, 
            track progress, and enjoy the learning process. Every feature is built with intention — by a student, for students.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">🧱 Tech Stack</h2>
          <ul className="list-disc list-inside leading-relaxed">
            <li><strong>Frontend:</strong> React, Tailwind CSS, Clerk Auth</li>
            <li><strong>Backend:</strong> Express.js, MongoDB (Mongoose)</li>
            <li><strong>Routing & State:</strong> React Router, Axios, useState/useEffect</li>
            <li><strong>Hosting:</strong> Vercel (Frontend) & Render (Backend)</li>
          </ul>
        </div>

        {/* What's next */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">🚀 What’s Coming Next</h2>
          <ul className="list-disc list-inside leading-relaxed">
            <li>Responsive Dark Mode 🌙 (optional toggle)</li>
            <li>Leaderboard & profile-based ranking system</li>
            <li>Daily coding goals & streak tracking</li>
            <li>Explanations and notes per DSA problem</li>
            <li>Mock test performance analytics</li>
            <li>More sheets: System Design, SQL, OS MCQs</li>
          </ul>
        </div>

        <div>
          <Link
            to="/dsa"
            className="flex mt-10 items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
          >
            Explore the features of algoVik <FaArrowRight />
          </Link>
        </div>

        {/* Footer */}
        <div className="pt-12 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 text-center">
          Built with ❤️ & caffeine — to support learners like you. <br />
          © {new Date().getFullYear()} Vikash Sharma. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default About;
