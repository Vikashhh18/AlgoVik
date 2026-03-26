/**
 * GenerateRoadmap.jsx
 *
 * AI-powered DSA roadmap generator with streaming, PDF export, and recruiter summary.
 *
 * Architecture:
 *  - Constants / config at top (easy to extend)
 *  - Pure helper functions (no side-effects)
 *  - Small, single-responsibility sub-components
 *  - One top-level component wiring everything together
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FaRobot, FaBullseye, FaLayerGroup, FaClock, FaBook,
  FaArrowRight, FaSpinner, FaCheckCircle, FaRedo,
  FaDownload, FaLinkedin, FaShare, FaGithub, FaFileAlt,
} from "react-icons/fa";
import { HiLightningBolt, HiSparkles } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import OpenAI from "openai";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// ─────────────────────────────────────────────────────────────────────────────
// 1. CONSTANTS & CONFIG
// ─────────────────────────────────────────────────────────────────────────────

/** Groq-compatible OpenAI client (browser-safe for demos). */
const groqClient = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

const MODEL = "llama-3.3-70b-versatile";

/** Skills we scan for in the generated roadmap to show resume badges. */
const RESUME_SKILLS = [
  "Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming",
  "Recursion", "Sorting", "Searching", "System Design", "OOP", "SQL",
  "Backtracking", "Bit Manipulation", "Hashing", "Heaps", "Tries",
];

export const GOALS = [
  { value: "placement",   label: "Campus Placement", icon: "🎓", desc: "Land your first job" },
  { value: "faang",       label: "FAANG / Big Tech",  icon: "🏆", desc: "Top-tier companies"  },
  { value: "internship",  label: "Internship",         icon: "💼", desc: "Summer/winter intern" },
  { value: "competitive", label: "Competitive Coding", icon: "⚡", desc: "Contests & rankings"  },
];

export const LEVELS = [
  { value: "beginner",     label: "Beginner",     icon: "🌱", desc: "Just starting" },
  { value: "intermediate", label: "Intermediate", icon: "🔥", desc: "Know the basics" },
  { value: "advanced",     label: "Advanced",     icon: "🚀", desc: "Push limits"    },
];

export const DURATIONS = [
  { value: "1", label: "1 Month",   sub: "Intensive sprint" },
  { value: "3", label: "3 Months",  sub: "Balanced pace"    },
  { value: "6", label: "6 Months",  sub: "Deep mastery"     },
];

export const DAILY_HOURS = [
  { value: "1", label: "1 hr/day",  sub: "Light"           },
  { value: "2", label: "2 hrs/day", sub: "Steady"          },
  { value: "3", label: "3+ hrs/day",sub: "Full commitment" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. PURE HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/** System prompt for the LLM. */
function buildSystemPrompt() {
  return `You are an expert DSA interview coach. Generate a detailed, recruiter-impressive roadmap.

Rules:
- Be specific: name LeetCode problems, patterns, and time estimates per week
- Include a "Recruiter Summary" section highlighting transferable skills
- Add "Resume Keywords" section with industry-standard terms
- Add an "Interview Readiness Checklist" at the end
- Use clean markdown: headers, bullet lists, and tables where helpful
- Keep it actionable — every item should have a clear next step`;
}

/** User prompt built from form values. */
function buildUserPrompt({ goal, level, duration, hours }) {
  const goalLabel = GOALS.find((g) => g.value === goal)?.label ?? goal;
  const levelLabel = LEVELS.find((l) => l.value === level)?.label ?? level;

  return `Generate a DSA roadmap for:
- Goal: ${goalLabel}
- Level: ${levelLabel}
- Timeline: ${duration} months
- Daily commitment: ${hours}+ hours

Include:
1. Week-by-week plan with specific LeetCode problems
2. Skills summary suitable for a resume/LinkedIn
3. Interview readiness checklist`;
}

/** Extract skill keywords present in the generated roadmap text. */
function extractSkillsFromRoadmap(text) {
  const lower = text.toLowerCase();
  return RESUME_SKILLS.filter((skill) => lower.includes(skill.toLowerCase()));
}

/** Export a DOM element to a multi-page PDF. */
async function exportElementToPDF(element, filename) {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth  = 190; // A4 usable width in mm
  const pageHeight = 277; // A4 usable height in mm
  const imgWidth   = pageWidth;
  const imgHeight  = (canvas.height * imgWidth) / canvas.width;

  let remainingHeight = imgHeight;
  let yOffset = 0;

  // First page
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, yOffset, imgWidth, imgHeight);
  remainingHeight -= pageHeight;

  // Additional pages if content overflows
  while (remainingHeight > 0) {
    yOffset = remainingHeight - imgHeight;
    pdf.addPage();
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, yOffset, imgWidth, imgHeight);
    remainingHeight -= pageHeight;
  }

  pdf.save(filename);
}

/** Build a ready-to-paste LinkedIn post from form state. */
function buildLinkedInPost(form) {
  const goalLabel = GOALS.find((g) => g.value === form.goal)?.label ?? "";
  return [
    `🎯 Just built my personalized DSA roadmap!`,
    ``,
    `Goal: ${goalLabel}`,
    `Timeline: ${form.duration} months | Daily: ${form.hours}+ hrs`,
    ``,
    `Cracking coding interviews one day at a time 💪`,
    `#DSA #CodingInterview #FAANG #TechCareer`,
  ].join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SMALL, FOCUSED SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** Tiny labelled section header. */
function SectionLabel({ icon, label }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">
      <span>{icon}</span>
      {label}
    </p>
  );
}

/**
 * Clickable option card used for Goal / Level / Duration / Hours selectors.
 * Accepts any item with { value, label, icon?, desc?, sub? }.
 */
function OptionCard({ item, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.value)}
      aria-pressed={isSelected}
      className={`
        group relative flex flex-col items-start gap-1 rounded-xl border p-3 text-left
        transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
        ${isSelected
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 shadow-sm"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-indigo-300"
        }
      `}
    >
      {isSelected && (
        <FaCheckCircle
          className="absolute top-2 right-2 text-indigo-500 text-xs"
          aria-hidden="true"
        />
      )}
      {item.icon && <span className="text-xl">{item.icon}</span>}
      <span className="font-semibold text-sm text-gray-900 dark:text-white">{item.label}</span>
      {(item.desc || item.sub) && (
        <span className="text-xs text-gray-400">{item.desc ?? item.sub}</span>
      )}
    </button>
  );
}

/** Progress bar showing how many of 4 fields are filled. */
function FormProgress({ filled, total = 4 }) {
  const pct = Math.round((filled / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>{filled} of {total} selected</span>
        <span>{filled === total ? "✅ Ready!" : "Complete all fields"}</span>
      </div>
      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-purple-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

/** Animated loading placeholder shown before the first streaming token arrives. */
function StreamingLoader() {
  return (
    <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 text-center">
      <div className="relative w-16 h-16 mx-auto">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
        <FaRobot
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600"
          aria-hidden="true"
        />
      </div>
      <p className="mt-4 font-semibold text-gray-800 dark:text-white">AI Specialist at Work</p>
      <p className="text-sm text-gray-500">Analysing your profile & crafting your roadmap…</p>
    </div>
  );
}

/** Renders markdown with syntax-highlighted code blocks. */
function RoadmapMarkdown({ content }) {
  return (
    <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white border-b pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold mt-6 mb-2 text-indigo-600 dark:text-indigo-400">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
              {children}
            </ul>
          ),
          li: ({ children }) => <li className="text-sm">{children}</li>,
          code: ({ inline, className, children }) => {
            const match = /language-(\w+)/.exec(className ?? "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                className="text-sm"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-indigo-600 text-xs">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/** Summary card displayed above the roadmap once generated. */
function RecruiterSummaryCard({ form, skills, onExportPDF, onShareLinkedIn, onCopyLink }) {
  const goalLabel  = GOALS.find((g) => g.value === form.goal)?.label  ?? "—";
  const levelLabel = LEVELS.find((l) => l.value === form.level)?.label ?? "—";

  return (
    <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-2xl flex-shrink-0">
          🏆
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
            📊 Recruiter Summary
          </h3>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[
              { label: "Target",   value: goalLabel },
              { label: "Level",    value: levelLabel },
              { label: "Timeline", value: `${form.duration} months` },
              { label: "Daily",    value: `${form.hours}+ hrs` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Skills badges */}
          {skills.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">
                🎯 Skills You'll Master (Resume-Ready)
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <FaDownload aria-hidden="true" /> Export PDF
            </button>
            <button
              onClick={onShareLinkedIn}
              className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
            >
              <FaLinkedin aria-hidden="true" /> Share
            </button>
            <button
              onClick={onCopyLink}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <FaShare aria-hidden="true" /> Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/** Initial empty form state. */
const EMPTY_FORM = { goal: "", level: "", duration: "", hours: "" };

export default function GenerateRoadmap() {
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const resultRef  = useRef(null);
  const roadmapRef = useRef(null);

  // Derived state
  const filledCount = Object.values(form).filter(Boolean).length;
  const isComplete  = filledCount === 4;
  const skills      = roadmap ? extractSkillsFromRoadmap(roadmap) : [];

  // ── Field setter factory ──────────────────────────────────────────────────
  const setField = useCallback(
    (key) => (value) => setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  // ── Scroll to results when roadmap starts streaming ───────────────────────
  useEffect(() => {
    if (roadmap && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [!!roadmap]); // only trigger on transition from empty → has content

  // ── Generate roadmap via Groq streaming ──────────────────────────────────
  const handleGenerate = useCallback(async () => {
    if (!isComplete || loading) return;

    setLoading(true);
    setRoadmap("");
    setError("");

    try {
      const stream = await groqClient.chat.completions.create({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user",   content: buildUserPrompt(form) },
        ],
        temperature: 0.7,
        stream: true,
      });

      let accumulated = "";
      for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content ?? "";
        accumulated += token;
        setRoadmap(accumulated);
      }
    } catch (err) {
      console.error("[GenerateRoadmap] API error:", err);
      setError(
        err?.status === 429
          ? "Rate limit hit — please wait a moment and try again."
          : "Failed to generate the roadmap. Please check your API key and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [form, isComplete, loading]);

  // ── Export handlers ───────────────────────────────────────────────────────
  const handleExportPDF = useCallback(async () => {
    if (!roadmapRef.current) return;
    const filename = `dsa-roadmap-${new Date().toISOString().split("T")[0]}.pdf`;
    try {
      await exportElementToPDF(roadmapRef.current, filename);
    } catch (err) {
      console.error("[GenerateRoadmap] PDF export failed:", err);
    }
  }, []);

  const handleShareLinkedIn = useCallback(() => {
    navigator.clipboard.writeText(buildLinkedInPost(form));
    alert("📋 LinkedIn post copied! Go paste it on your profile.");
  }, [form]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
  }, []);

  const handleReset = useCallback(() => {
    setRoadmap("");
    setForm(EMPTY_FORM);
    setError("");
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Subtle dot-grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(99,102,241,0.07) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-12 lg:py-16">

        {/* ── Page header ────────────────────────────────────────────── */}
        <header className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            AI-Powered{" "}
            <span className="text-indigo-600 dark:text-indigo-400">DSA Roadmap</span>
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Create a recruiter-impressive, personalised roadmap to ace your coding interviews.
          </p>
        </header>

        {/* ── Form card ──────────────────────────────────────────────── */}
        <section
          aria-label="Roadmap configuration"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 lg:p-8 space-y-8"
        >
          {/* Goal */}
          <div>
            <SectionLabel icon={<FaBullseye />} label="Your Goal" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {GOALS.map((g) => (
                <OptionCard
                  key={g.value}
                  item={g}
                  isSelected={form.goal === g.value}
                  onSelect={setField("goal")}
                />
              ))}
            </div>
          </div>

          {/* Level */}
          <div>
            <SectionLabel icon={<FaLayerGroup />} label="Current Level" />
            <div className="grid grid-cols-3 gap-2.5">
              {LEVELS.map((l) => (
                <OptionCard
                  key={l.value}
                  item={l}
                  isSelected={form.level === l.value}
                  onSelect={setField("level")}
                />
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <SectionLabel icon={<FaClock />} label="Timeline" />
            <div className="grid grid-cols-3 gap-2.5">
              {DURATIONS.map((d) => (
                <OptionCard
                  key={d.value}
                  item={d}
                  isSelected={form.duration === d.value}
                  onSelect={setField("duration")}
                />
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <SectionLabel icon={<FaBook />} label="Daily Study" />
            <div className="grid grid-cols-3 gap-2.5">
              {DAILY_HOURS.map((h) => (
                <OptionCard
                  key={h.value}
                  item={h}
                  isSelected={form.hours === h.value}
                  onSelect={setField("hours")}
                />
              ))}
            </div>
          </div>

          {/* Progress indicator */}
          <FormProgress filled={filledCount} />

          {/* Generate button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!isComplete || loading}
            className={`
              w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl
              font-semibold text-sm transition-all duration-200
              ${isComplete && !loading
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02] hover:shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" aria-hidden="true" />
                AI is crafting your roadmap…
              </>
            ) : (
              <>
                <HiLightningBolt aria-hidden="true" />
                Generate Roadmap
                <FaArrowRight aria-hidden="true" />
              </>
            )}
          </button>
        </section>

        {/* ── Loading animation (shown while waiting for first token) ── */}
        {loading && !roadmap && <StreamingLoader />}

        {/* ── Error message ──────────────────────────────────────────── */}
        {error && (
          <div
            role="alert"
            className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </div>
        )}

        {/* ── Roadmap results ────────────────────────────────────────── */}
        {roadmap && (
          <div ref={resultRef} className="mt-10 animate-fadeIn">

            {/* Recruiter summary + export actions */}
            <RecruiterSummaryCard
              form={form}
              skills={skills}
              onExportPDF={handleExportPDF}
              onShareLinkedIn={handleShareLinkedIn}
              onCopyLink={handleCopyLink}
            />

            {/* Roadmap content card (also the PDF target) */}
            <div
              ref={roadmapRef}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 lg:p-8"
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <HiSparkles className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">
                      Your Personalised Roadmap
                    </h2>
                    <p className="text-xs text-gray-400">
                      {GOALS.find((g) => g.value === form.goal)?.label}
                      {" · "}{form.duration} months{" · "}{form.hours} hr/day
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FaRedo aria-hidden="true" /> Reset
                </button>
              </div>

              <RoadmapMarkdown content={roadmap} />

              {/* Streaming cursor */}
              {loading && (
                <span
                  className="inline-block w-2 h-4 bg-indigo-500 animate-pulse ml-1 align-middle"
                  aria-label="Generating…"
                />
              )}
            </div>

            {/* Footer links */}
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                <FaGithub aria-hidden="true" /> Track Progress
              </a>
              <a
                href="https://leetcode.com/problemset/all/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <FaFileAlt aria-hidden="true" /> Practice Problems
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}