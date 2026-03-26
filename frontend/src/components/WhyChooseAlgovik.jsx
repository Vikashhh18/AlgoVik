/**
 * WhyChooseAlgovik.jsx
 *
 * Feature grid + bottom CTA explaining AlgoVik's differentiators.
 * Uses Framer Motion for scroll-triggered reveals.
 * Removed: broken <Link> inside <motion.button>, animate on mount (use whileInView instead).
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code, Target, Users, BookOpen,
  CheckCircle, Star, ArrowRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon:        <BookOpen className="w-7 h-7" />,
    iconColor:   "text-blue-600 dark:text-blue-400",
    iconBg:      "bg-blue-50 dark:bg-blue-950/50",
    title:       "Curated Question Bank",
    description: "300+ handpicked questions from real company interviews. Focus on what matters most.",
    examples:    ["Two Sum", "LRU Cache", "Merge Intervals"],
  },
  {
    icon:        <Code className="w-7 h-7" />,
    iconColor:   "text-green-600 dark:text-green-400",
    iconBg:      "bg-green-50 dark:bg-green-950/50",
    title:       "Step-by-Step Solutions",
    description: "Detailed explanations with multiple approaches. Understand the 'why' behind each solution.",
    examples:    ["Brute Force to Optimal", "Time/Space Analysis", "Edge Cases"],
  },
  {
    icon:        <Target className="w-7 h-7" />,
    iconColor:   "text-purple-600 dark:text-purple-400",
    iconBg:      "bg-purple-50 dark:bg-purple-950/50",
    title:       "Company-Specific Prep",
    description: "Practice questions grouped by Google, Amazon, Microsoft, and startups.",
    examples:    ["Google: System Design", "Amazon: Leadership", "Startups: Practical Coding"],
  },
  {
    icon:        <Users className="w-7 h-7" />,
    iconColor:   "text-orange-600 dark:text-orange-400",
    iconBg:      "bg-orange-50 dark:bg-orange-950/50",
    title:       "Peer Learning",
    description: "Discuss solutions with fellow learners and get unstuck with community support.",
    examples:    ["Code Reviews", "Study Groups", "Pair Programming"],
  },
  {
    icon:        <CheckCircle className="w-7 h-7" />,
    iconColor:   "text-red-600 dark:text-red-400",
    iconBg:      "bg-red-50 dark:bg-red-950/50",
    title:       "Progress Tracking",
    description: "Track your solved problems and identify weak areas with visual analytics.",
    examples:    ["Solved Count", "Topic Mastery", "Daily Streak"],
  },
  {
    icon:        <Star className="w-7 h-7" />,
    iconColor:   "text-yellow-600 dark:text-yellow-400",
    iconBg:      "bg-yellow-50 dark:bg-yellow-950/50",
    title:       "Interview Ready",
    description: "Mock interviews with common follow-up questions and behavioural rounds.",
    examples:    ["Technical Rounds", "HR Questions", "System Design"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Single feature card. */
function FeatureCard({ feature, index }) {
  const { icon, iconColor, iconBg, title, description, examples } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
    >
      {/* Icon + title */}
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl flex-shrink-0 ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-1">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>

      {/* Examples */}
      <ul className="space-y-1.5 mt-auto">
        {examples.map((ex) => (
          <li key={ex} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" aria-hidden="true" />
            {ex}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function WhyChooseAlgovik() {
  return (
    <section className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Decorative blobs */}
      <div aria-hidden="true" className="absolute top-16 -left-24 w-64 h-64 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-10 blur-3xl" />
      <div aria-hidden="true" className="absolute bottom-16 -right-24 w-64 h-64 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
            Why us?
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Why Choose{" "}
            <span className="text-indigo-600 dark:text-indigo-400">AlgoVik?</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            AlgoVik isn't just another coding site — it's your personalised interview companion.
            Practice curated DSA questions, take real mock interviews, and track your growth.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* Bottom CTA card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center bg-white dark:bg-gray-900 rounded-2xl p-10 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Start Practicing?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-7 max-w-md mx-auto">
            Join thousands of developers preparing for interviews with real questions and solutions.
          </p>
          <Link
            to="/dsa"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Start Learning Now
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}