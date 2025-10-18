import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaBookOpen, 
  FaTasks, 
  FaChartLine, 
  FaFileCode, 
  FaComments, 
  FaClipboardList, 
  FaArrowRight,
  FaCheck 
} from "react-icons/fa";

const features = [
  {
    title: "DSA Library",
    icon: <FaFileCode className="h-6 w-6" />,
    description: "250+ curated problems with difficulty filters and detailed solutions.",
    path: "/dsa",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "AI Interview Assistant",
    icon: <FaComments className="h-6 w-6" />,
    description: "Get instant help with DSA doubts and code logic explanations.",
    path: "/askAi",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "To-Do Tracker",
    icon: <FaTasks className="h-6 w-6" />,
    description: "Organize daily coding tasks and track your progress.",
    path: "/todo",
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Interview Experiences",
    icon: <FaClipboardList className="h-6 w-6" />,
    description: "Learn from real interview stories from top companies.",
    path: "/interview-expereience",
    color: "from-orange-500 to-yellow-600",
  },
  {
    title: "Notes & Cheat Sheets",
    icon: <FaBookOpen className="h-6 w-6" />,
    description: "Quick-access notes for CS fundamentals and development topics.",
    path: "/notes",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Mock Interview Hub",
    icon: <FaChartLine className="h-6 w-6" />,
    description: "Practice with timed sessions and performance feedback.",
    path: "/mockhub",
    color: "from-cyan-500 to-blue-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-16 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute top-20 -left-20 w-60 h-60 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-45 blur-xl"></div>
      <div className="absolute bottom-20 -right-20 w-60 h-60 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-12 blur-xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
  Everything You Need to{" "}
  <span className="text-indigo-600 dark:text-indigo-400">Crack Any Interview</span>
</h2>
<p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
  From DSA to soft skills — master every aspect with our expert-curated tools, practice tests, and real-world challenges.
</p>

        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group"
            >
              <Link to={feature.path} className="block h-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 h-full">
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                    <span>Explore feature</span>
                    <FaArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}