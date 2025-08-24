import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import { useUser, SignInButton } from '@clerk/clerk-react'

const Banner = () => {
  const { isSignedIn } = useUser();
  const features = [
    "250+ Curated DSA Problems",
    "Topic-wise Progress Tracker",
    "Mock Interviews & Aptitude Tests",
    "Personalized Dashboard",
    "Todo Management With Notes",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 min-h-screen flex items-center justify-center">

      <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-45 blur-xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-12 blur-xl"></div>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center">
       
        <div className="text-center lg:text-left space-y-8">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white">
            Crack the Code,<br />
            <span className="text-indigo-600 dark:text-indigo-400">Ace the Interview With AlgoVik</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
            Targeted problem sets, expert-curated notes, and achievement tracking designed for interview success.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            {isSignedIn ? (
              <Link
                to="/dsa"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
              >
                Go To DSA <FaArrowRight />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="px-6 font-semibold py-2 cursor-pointer bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md">
                  Get Started
                </button>
              </SignInButton>
            )}

            <button
              onClick={() => {
                const section = document.getElementById("features");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-semibold rounded-full shadow-md hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
            >
              Explore <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 flex items-center gap-2">
              <span className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                <svg className="w-6 h-6 text-indigo-700 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </span>
              Why Choose AlgoVik?
            </h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-32"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          className="dark:fill-gray-800"
          d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,154.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  )
}

export default Banner;