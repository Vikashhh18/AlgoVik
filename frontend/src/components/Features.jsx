import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBookOpen, FaChartLine, FaFileCode,
  FaComments, FaClipboardList, FaArrowRight, FaRobot,
} from "react-icons/fa";

const FEATURES = [
  {
    title:       "DSA Library",
    icon:        <FaFileCode className="h-5 w-5" />,
    description: "250+ curated problems with difficulty filters and detailed solutions.",
    path:        "/dsa",
    accent:      "#6366f1",
    iconCls:     "text-indigo-600 dark:text-indigo-400",
  },
  {
    title:       "AI Roadmap Generator",
    icon:        <FaRobot className="h-5 w-5" />,
    description: "Get a personalised, week-by-week DSA roadmap tailored to your goals.",
    path:        "/generate-roadmap",
    accent:      "#8b5cf6",
    iconCls:     "text-violet-600 dark:text-violet-400",
  },
  {
    title:       "AI Assistant",
    icon:        <FaComments className="h-5 w-5" />,
    description: "Instant help with DSA doubts and code logic explanations.",
    path:        "/askAi",
    accent:      "#ec4899",
    iconCls:     "text-pink-600 dark:text-pink-400",
  },
  {
    title:       "Interview Experiences",
    icon:        <FaClipboardList className="h-5 w-5" />,
    description: "Learn from real interview stories from top companies.",
    path:        "/interview-expereience",
    accent:      "#f97316",
    iconCls:     "text-orange-600 dark:text-orange-400",
  },
  {
    title:       "Notes & Cheat Sheets",
    icon:        <FaBookOpen className="h-5 w-5" />,
    description: "Quick-access notes for CS fundamentals and dev topics.",
    path:        "/notes",
    accent:      "#22c55e",
    iconCls:     "text-green-600 dark:text-green-400",
  },
  {
    title:       "Mock Interview Hub",
    icon:        <FaChartLine className="h-5 w-5" />,
    description: "Practice with timed sessions and performance feedback.",
    path:        "/mockhub",
    accent:      "#06b6d4",
    iconCls:     "text-cyan-600 dark:text-cyan-400",
  },
];

function FeatureCard({ feature, index }) {
  const { title, icon, description, path, accent, iconCls } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <Link to={path} className="block h-full" aria-label={`Go to ${title}`}>
        {/* No hover:border-transparent, hover:shadow-xl, hover:-translate-y-1 */}
        <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">

          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-5 ${iconCls}`}
            style={{ boxShadow: `0 4px 12px ${accent}22` }}
          >
            {icon}
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>

          {/* CTA arrow */}
          <div className="flex items-center gap-1.5 mt-5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            <span>Explore</span>
            <FaArrowRight className="text-xs" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
            Everything in one place
          </div>

          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Everything You Need to{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Crack Any Interview</span>
          </h2>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            From DSA to soft skills — master every aspect with expert-curated tools,
            practice tests, and real-world challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={feature.title} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}