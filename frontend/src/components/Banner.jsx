/**
 * Banner.jsx  (Hero section)
 *
 * Full-viewport hero with:
 * - Animated mount reveal
 * - Dot-grid + radial glow decorations
 * - CTA adapts to Clerk auth state
 * - Feature card on desktop right
 * - Bottom wave transition to next section
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { useUser, SignInButton } from "@clerk/clerk-react";

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: "🧩", text: "250+ Curated DSA Problems"    },
  { icon: "📊", text: "Topic-wise Progress Tracker"  },
  { icon: "🎯", text: "Mock Interviews & Aptitude"   },
  { icon: "🧭", text: "Personalized Dashboard"       },
  { icon: "📝", text: "Todo Management With Notes"   },
];

const STATS = [
  { value: "250+", label: "Problems" },
  { value: "15+",  label: "Topics"   },
  { value: "10k+", label: "Users"    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Gradient pill CTA button used for primary action. */
function PrimaryButton({ children, onClick, as: Tag = "button", to, ...rest }) {
  const cls = `inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm
    hover:scale-105 active:scale-95 transition-all duration-200`;
  const style = {
    background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    boxShadow:  "0 0 16px rgba(99,102,241,0.35)",
  };

  if (Tag === Link) return <Link to={to} className={cls} style={style} {...rest}>{children}</Link>;
  return <Tag onClick={onClick} className={cls} style={style} {...rest}>{children}</Tag>;
}

/** Feature card shown on desktop right side. */
function FeatureCard() {
  return (
    <div className="relative">
      {/* Shadow offset layer */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/30" />

      <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
        {/* Card header */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Why AlgoVik?</h3>
            <p className="text-xs text-gray-400">Everything you need to succeed</p>
          </div>
        </div>

        {/* Feature list */}
        <ul className="space-y-3.5">
          {FEATURES.map((f) => (
            <li
              key={f.text}
              className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors duration-150 cursor-default group"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                {f.icon}
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{f.text}</span>
              <FaCheck className="ml-auto text-indigo-400 text-xs flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </li>
          ))}
        </ul>

        {/* Card footer */}
        <div className="mt-7 pt-5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <p className="text-xs text-gray-400">Free to start. No credit card.</p>
          <span className="text-xs font-semibold text-indigo-500 flex items-center gap-1">
            Join now <FaArrowRight className="text-[10px]" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function Banner() {
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);

  // Trigger mount animation on first render
  useEffect(() => { setMounted(true); }, []);

  const scrollToFeatures = () =>
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950 min-h-[calc(100vh-56px)] flex flex-col">

      {/* ── Background decorations ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(99,102,241,0.08) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute top-[-120px] left-[-80px] w-[480px] h-[480px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[-100px] right-[-80px] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />

      {/* ── Main content ────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left column */}
            <div
              className={`space-y-8 transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/60">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 tracking-wide">
                  Interview Prep Platform
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white">
                Crack the Code,<br />
                <span className="relative">
                  <span className="text-indigo-600 dark:text-indigo-400">Ace the Interview</span>
                  {/* Decorative underline */}
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 300 8"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 6 C50 2, 100 7, 150 4 C200 1, 250 6, 299 3"
                      stroke="#6366f1" strokeWidth="2.5"
                      strokeLinecap="round" strokeOpacity="0.4"
                    />
                  </svg>
                </span>
                <span className="block text-4xl lg:text-5xl mt-1 text-gray-500 dark:text-gray-400 font-bold">
                  with AlgoVik
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
                Targeted problem sets, expert-curated notes, and achievement tracking —
                all designed to get you hired.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                {isSignedIn ? (
                  <PrimaryButton as={Link} to="/dsa">
                    Go To DSA <FaArrowRight className="text-xs" aria-hidden="true" />
                  </PrimaryButton>
                ) : (
                  <SignInButton mode="modal">
                    <PrimaryButton as="button">
                      Get Started Free <FaArrowRight className="text-xs" aria-hidden="true" />
                    </PrimaryButton>
                  </SignInButton>
                )}

                <button
                  type="button"
                  onClick={scrollToFeatures}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:scale-105 active:scale-95 transition-all duration-200 bg-white dark:bg-transparent"
                >
                  Explore features
                </button>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 pt-2">
                {STATS.map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — feature card (desktop only) */}
            <div
              className={`hidden lg:block transition-all duration-700 delay-150 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <FeatureCard />
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom wave ─────────────────────────────────────────────── */}
      <svg
        className="relative z-10 w-full block"
        style={{ marginTop: "-1px" }}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          className="text-gray-50 dark:text-gray-900"
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
        />
      </svg>
    </section>
  );
}