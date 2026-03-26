import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaArrowRight } from "react-icons/fa";

const SUCCESS_STORIES = [
  {
    name:        "Priya Sharma",
    role:        "Software Engineer",
    company:     "Google",
    quote:       "The structured DSA practice and mock interviews helped me crack the coding rounds with full confidence.",
    achievement: "Placed in 3 months",
    pillCls:     "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
    avatarGrad:  "from-blue-500 to-indigo-600",
    accent:      "#6366f1",
  },
  {
    name:        "Rohan Kumar",
    role:        "Backend Developer",
    company:     "Amazon",
    quote:       "Company-specific question banks and real interview scenarios prepared me for actual workplace challenges.",
    achievement: "3 offers received",
    pillCls:     "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
    avatarGrad:  "from-orange-500 to-rose-500",
    accent:      "#f97316",
  },
  {
    name:        "Anjali Patel",
    role:        "Full-Stack Engineer",
    company:     "Microsoft",
    quote:       "Community support and detailed solutions helped me improve my problem-solving approach significantly.",
    achievement: "Beginner to offer",
    pillCls:     "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400",
    avatarGrad:  "from-green-500 to-teal-500",
    accent:      "#22c55e",
  },
];

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

function StoryCard({ story, index }) {
  const { name, role, company, quote, achievement, pillCls, avatarGrad, accent } = story;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      {/* No hover bg, border, shadow or translate changes */}
      <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col">

        {/* Decorative quote mark */}
        <div
          className="text-4xl font-serif text-indigo-200 dark:text-indigo-800 leading-none mb-3 select-none"
          aria-hidden="true"
        >
          "
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-6">
          {quote}
        </p>

        {/* Profile row */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarGrad} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
            style={{ boxShadow: `0 4px 12px ${accent}33` }}
            aria-hidden="true"
          >
            {getInitials(name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{name}</p>
            <p className="text-xs text-gray-400 truncate">{role} @ {company}</p>
          </div>
        </div>

        {/* Achievement pill + arrow */}
        <div className="mt-4 flex items-center justify-between">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${pillCls}`}>
            <FaBriefcase className="text-[10px]" aria-hidden="true" />
            {achievement}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            <span>Read more</span>
            <FaArrowRight className="text-[10px]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AlumniSection() {
  return (
    <section className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
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
            Real results
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Success{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Stories</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Real developers who transformed their careers with AlgoVik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUCCESS_STORIES.map((story, i) => (
            <StoryCard key={story.name} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}