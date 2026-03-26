import React from "react";
import { motion } from "framer-motion";
import { HiLightBulb, HiCode, HiChatAlt2, HiUserGroup } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";

const STEPS = [
  {
    icon:    <HiLightBulb className="h-5 w-5" />,
    iconCls: "text-amber-600 dark:text-amber-400",
    accent:  "#f59e0b",
    title:   "Learn Core Concepts",
    desc:    "Master essential DSA topics with structured learning paths and clear explanations.",
    step:    "01",
  },
  {
    icon:    <HiCode className="h-5 w-5" />,
    iconCls: "text-blue-600 dark:text-blue-400",
    accent:  "#3b82f6",
    title:   "Practice Questions",
    desc:    "Solve curated problems with difficulty levels and track your progress in real-time.",
    step:    "02",
  },
  {
    icon:    <HiChatAlt2 className="h-5 w-5" />,
    iconCls: "text-pink-600 dark:text-pink-400",
    accent:  "#ec4899",
    title:   "Get AI Assistance",
    desc:    "Instant help with doubts and code explanations from our intelligent assistant.",
    step:    "03",
  },
  {
    icon:    <HiUserGroup className="h-5 w-5" />,
    iconCls: "text-purple-600 dark:text-purple-400",
    accent:  "#8b5cf6",
    title:   "Share & Learn",
    desc:    "Contribute interview experiences and learn from the community's real stories.",
    step:    "04",
  },
];

function StepCard({ s, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Connector line (desktop only) */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-10 left-full w-6 h-px bg-gray-200 dark:bg-gray-95 0 z-10"
        />
      )}

      <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col">

        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center ${s.iconCls}`}
            style={{ boxShadow: `0 4px 12px ${s.accent}22` }}
          >
            {s.icon}
          </div>
          <span className="text-xs font-bold text-gray-300 dark:text-gray-600 tabular-nums">
            {s.step}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {s.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
          {s.desc}
        </p>

        {/* CTA arrow */}
        <div className="flex items-center gap-1.5 mt-5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          <span>Get started</span>
          <FaArrowRight className="text-xs" aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}

export default function HowAlgoVikWorks() {
  return (
    <section className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-30"
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
            Simple process
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            How{" "}
            <span className="text-indigo-600 dark:text-indigo-400">AlgoVik</span>{" "}
            Works
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Four simple steps to master coding interviews and boost your career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <StepCard key={s.step} s={s} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-10"
        >
          Start your journey today and transform your coding skills
        </motion.p>
      </div>
    </section>
  );
}