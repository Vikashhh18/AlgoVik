/**
 * AskAIPage.jsx
 *
 * DSA-focused AI chat interface with streaming-ready architecture,
 * markdown rendering, syntax highlighting, and a complexity cheatsheet sidebar.
 *
 * Architecture:
 *  - Constants / config at top
 *  - Pure helper functions
 *  - Small, single-responsibility sub-components
 *  - One top-level component with clean state management
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Send, Code, BookOpen, Brain, Bot, User, CornerDownLeft,
} from "lucide-react";
import { generateAIResponse } from "./openAi";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// ─────────────────────────────────────────────────────────────────────────────
// 1. CONSTANTS & CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const MAX_INPUT_LENGTH = 500;

/** Quick-access DSA topic buttons shown in the sidebar / mobile strip. */
const DSA_TOPICS = [
  { icon: <Code size={16} />,     label: "Time Complexity",      prompt: "Explain time complexity with examples" },
  { icon: <Brain size={16} />,    label: "Binary Trees",         prompt: "Explain traversal algorithms for binary trees" },
  { icon: <BookOpen size={16} />, label: "Dynamic Programming",  prompt: "What is dynamic programming and when to use it?" },
  { icon: <Code size={16} />,     label: "Graph Algorithms",     prompt: "Compare BFS and DFS with examples" },
];

/** Big-O complexity reference shown in the sidebar. */
const COMPLEXITY_ROWS = [
  { notation: "O(1)",      name: "Constant",    rating: "Excellent", color: "green"  },
  { notation: "O(log n)",  name: "Logarithmic", rating: "Great",     color: "green"  },
  { notation: "O(n)",      name: "Linear",      rating: "Good",      color: "yellow" },
  { notation: "O(n²)",     name: "Quadratic",   rating: "Avoid",     color: "red"    },
];

/** Color utility map for complexity ratings. */
const RATING_COLORS = {
  green:  { text: "text-green-600 dark:text-green-400",  bg: "bg-green-100 dark:bg-green-900/40"  },
  yellow: { text: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/40" },
  red:    { text: "text-red-600 dark:text-red-400",       bg: "bg-red-100 dark:bg-red-900/40"       },
};

/** The bot's opening greeting. */
const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi there! 👋 I'm AlgoVik, your DSA assistant. I can explain concepts, analyse code complexity, or suggest approaches to problems. What would you like to work on?",
  timestamp: new Date(),
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. PURE HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Format a Date to HH:MM string. */
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Strip timestamps and role metadata so only {role, content}
 * pairs are sent to the AI API.
 */
function toApiMessages(messages) {
  return messages.map(({ role, content }) => ({ role, content }));
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SMALL, FOCUSED SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** User / bot avatar circle. */
function Avatar({ role }) {
  return role === "user" ? (
    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
      <User size={14} className="text-white" aria-hidden="true" />
    </div>
  ) : (
    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md flex-shrink-0">
      <Bot size={14} className="text-white" aria-hidden="true" />
    </div>
  );
}

/**
 * Markdown renderer used for assistant messages.
 * Handles code blocks, tables, lists, and inline code.
 */
function AssistantMarkdown({ content }) {
  return (
    <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-3 leading-relaxed text-sm sm:text-base">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="text-xl font-bold mt-6 mb-4 text-gray-900 dark:text-white border-b pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold mt-5 mb-3 text-gray-800 dark:text-gray-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-medium mt-4 mb-2 text-gray-800 dark:text-gray-100">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 mb-4 pl-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 mb-4 pl-4">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
              {children}
            </td>
          ),
          code: ({ inline, className, children }) => {
            const match = /language-(\w+)/.exec(className ?? "");
            const language = match?.[1] ?? "";

            return !inline && language ? (
              <div className="my-4 rounded-lg overflow-hidden">
                {/* Code block header */}
                <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-xs text-gray-300">
                  <span>{language}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(String(children))}
                    className="hover:text-white transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <SyntaxHighlighter
                  style={atomDark}
                  language={language}
                  PreTag="div"
                  className="text-sm m-0 rounded-b-lg"
                  showLineNumbers
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm font-mono text-pink-600 dark:text-pink-400">
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/** A single chat bubble (user or assistant). */
function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar role={message.role} />

        <div className="flex flex-col min-w-0">
          <div
            className={`
              p-2.5 sm:p-4 rounded-2xl shadow-sm break-words
              ${isUser
                ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-none"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700"
              }
            `}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
            ) : (
              <AssistantMarkdown content={message.content} />
            )}
          </div>

          <span className={`text-xs mt-1 text-gray-400 ${isUser ? "text-right mr-1" : "ml-1"}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Animated three-dot typing indicator. */
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-2">
        <Avatar role="assistant" />
        <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-1.5">
            {[0, 150, 300].map((delay) => (
              <div
                key={delay}
                className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sidebar (desktop) — quick topics + complexity cheatsheet. */
function Sidebar({ onQuickPrompt }) {
  return (
    <aside className="hidden md:flex flex-col w-64 flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <h2 className="font-semibold text-gray-800 dark:text-white mb-4 text-lg">DSA Topics</h2>

      <nav className="space-y-2 mb-6" aria-label="Quick DSA topics">
        {DSA_TOPICS.map((topic) => (
          <button
            key={topic.label}
            type="button"
            onClick={() => onQuickPrompt(topic.prompt)}
            className="w-full flex items-center gap-2 p-3 rounded-lg text-left cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/30 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors group"
          >
            <span className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              {topic.icon}
            </span>
            <span className="text-gray-700 dark:text-gray-300 text-sm">{topic.label}</span>
          </button>
        ))}
      </nav>

      {/* Complexity cheatsheet */}
      <h2 className="font-semibold text-gray-800 dark:text-white mb-3 text-lg">
        Complexity Cheatsheet
      </h2>
      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-sm shadow-sm border border-gray-200 dark:border-gray-600 divide-y divide-gray-100 dark:divide-gray-600">
        {COMPLEXITY_ROWS.map(({ notation, name, rating, color }) => {
          const { text, bg } = RATING_COLORS[color];
          return (
            <div key={notation} className="flex justify-between items-center py-2">
              <div>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{notation}</span>
                <span className="text-xs text-gray-400 ml-1">· {name}</span>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${text} ${bg}`}>
                {rating}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

/** Horizontal scrollable topic pills shown on mobile. */
function MobileTopicStrip({ onQuickPrompt }) {
  return (
    <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-2">
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {DSA_TOPICS.map((topic) => (
          <button
            key={topic.label}
            type="button"
            onClick={() => onQuickPrompt(topic.prompt)}
            className="flex-shrink-0 flex items-center h-8 px-3 bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-300 rounded-full text-xs border border-gray-200 dark:border-gray-600 shadow-sm transition-colors active:scale-95 whitespace-nowrap"
          >
            <span className="mr-1.5 text-indigo-600 dark:text-indigo-400">{topic.icon}</span>
            {topic.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Text input + send button row. */
function ChatInput({ value, onChange, onSend, onKeyDown, isLoading }) {
  const canSend = !isLoading && value.trim().length > 0;

  return (
    <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2 sm:py-3 z-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          {/* Text field */}
          <div className="flex-1 relative">
            <input
              type="text"
              maxLength={MAX_INPUT_LENGTH}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about DSA concepts…"
              aria-label="Message input"
              className="w-full h-10 sm:h-12 px-3 sm:px-4 pr-14 outline-none rounded-full border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base shadow-sm transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium pointer-events-none">
              {value.length}/{MAX_INPUT_LENGTH}
            </span>
          </div>

          {/* Send button */}
          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            aria-label="Send message"
            className={`
              h-10 sm:h-12 aspect-square rounded-full flex items-center justify-center
              transition-all active:scale-95 disabled:cursor-not-allowed
              ${canSend
                ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400"
              }
            `}
          >
            <Send size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="flex items-center justify-center gap-1 mt-1.5 text-[10px] sm:text-xs text-gray-400">
          <CornerDownLeft size={10} aria-hidden="true" />
          Press Enter to send
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function AskAIPage() {
  const [messages,  setMessages]  = useState([INITIAL_MESSAGE]);
  const [input,     setInput]     = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // ── Auto-scroll to the latest message ────────────────────────────────────
  const scrollToBottom = useCallback((instant = false) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: instant ? "auto" : "smooth",
      block: "end",
    });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);
  useEffect(() => { scrollToBottom(true); }, []); // instant on mount

  // ── Send a message and fetch AI response ─────────────────────────────────
  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input.trim(), timestamp: new Date() };

    // Optimistically add user message, clear input
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    scrollToBottom(true);

    try {
      const history = toApiMessages([...messages, userMessage]);
      const response = await generateAIResponse(history);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response, timestamp: new Date() },
      ]);

      // Small delay lets the DOM paint before we scroll
      setTimeout(() => scrollToBottom(), 100);
    } catch (err) {
      toast.error(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, scrollToBottom]);

  // ── Keyboard shortcut: Enter → send, Shift+Enter → newline ───────────────
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // ── Pre-fill input from quick-topic buttons ───────────────────────────────
  const handleQuickPrompt = useCallback((prompt) => {
    setInput(prompt);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 overflow-hidden">

      {/* ── Desktop sidebar ──────────────────────────────────────────── */}
      <Sidebar onQuickPrompt={handleQuickPrompt} />

      {/* ── Main chat column ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Message list */}
        <main
          className="flex-1 p-2 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}

          {isLoading && <TypingIndicator />}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </main>

        {/* ── Mobile topic strip ───────────────────────────────────── */}
        <MobileTopicStrip onQuickPrompt={handleQuickPrompt} />

        {/* ── Input row ────────────────────────────────────────────── */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}