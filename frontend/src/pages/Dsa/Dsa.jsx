/**
 * Dsa.jsx
 *
 * Landing page for the DSA section.
 * Shows practice sheet cards + the full topic-wise question browser.
 */

import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import DsaTopic from "./dsaTopic/DsaTopic";

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const DSA_SHEETS = [
  {
    topic:       "Top AlgoVik Important Questions",
    description: "Ideal for last-minute prep — the absolute must-know problems to make the strongest impact in your coding rounds.",
    path:        "/algo-top-questions",
    badge:       "50 Problems",
    accent:      "indigo",
  },
  {
    topic:       "75 Most Important Questions",
    description: "A balanced collection that builds a solid foundation without overwhelming you — perfect for a structured study plan.",
    path:        "/75-interview",
    badge:       "75 Problems",
    accent:      "violet",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component
// ─────────────────────────────────────────────────────────────────────────────

/** Single practice sheet card. */
function SheetCard({ sheet }) {
  const accentMap = {
    indigo: {
      badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
      btn:   "bg-indigo-600 hover:bg-indigo-700",
      glow:  "hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20",
    },
    violet: {
      badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      btn:   "bg-violet-600 hover:bg-violet-700",
      glow:  "hover:shadow-violet-100 dark:hover:shadow-violet-900/20",
    },
  };

  const { badge, btn, glow } = accentMap[sheet.accent];

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg ${glow} transition-all duration-300 hover:-translate-y-0.5 overflow-hidden`}
    >
      <div className="p-6 flex flex-col h-full gap-3">
        {/* Badge */}
        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${badge}`}>
          {sheet.badge}
        </span>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{sheet.topic}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
          {sheet.description}
        </p>

        <Link
          to={sheet.path}
          className={`inline-flex items-center gap-2 px-5 py-2.5 ${btn} text-white text-sm font-medium rounded-xl transition-colors duration-200 self-start mt-2`}
        >
          Start Practice
          <FaArrowRight className="text-xs" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function Dsa() {
  return (
    <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Data Structures & Algorithms
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Master essential patterns and problem-solving techniques
          </p>
        </div>

        {/* Practice sheets */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-5">
            Practice Sheets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DSA_SHEETS.map((sheet) => (
              <SheetCard key={sheet.path} sheet={sheet} />
            ))}
          </div>
        </div>

        {/* Topic-wise questions */}
        <DsaTopic />
      </div>
    </section>
  );
}