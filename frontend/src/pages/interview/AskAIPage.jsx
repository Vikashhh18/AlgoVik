import React, { useState, useRef, useEffect } from "react";
import { Send, Code, BookOpen, Brain, Bot, User, CornerDownLeft } from "lucide-react";
import { generateAIResponse } from "./openAi";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AskAIPage = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! 👋 I'm AlgoVik, your DSA assistant. I can help explain concepts, analyze code complexity, or suggest approaches to problems. What would you like to work on today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Quick DSA topics
  const dsaTopics = [
    { icon: <Code size={16} />, title: "Time Complexity", prompt: "Explain time complexity with examples" },
    { icon: <Brain size={16} />, title: "Binary Trees", prompt: "Explain traversal algorithms for binary trees" },
    { icon: <BookOpen size={16} />, title: "Dynamic Programming", prompt: "What is dynamic programming and when to use it?" },
    { icon: <Code size={16} />, title: "Graph Algorithms", prompt: "Compare BFS and DFS algorithms" },
  ];

  const scrollToBottom = (instant = false) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: instant ? "auto" : "smooth",
        block: "end"
      });
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial scroll when component mounts
  useEffect(() => {
    scrollToBottom(true);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Scroll immediately when user sends message
      scrollToBottom(true);

      const messageHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await generateAIResponse(messageHistory);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response, timestamp: new Date() },
      ]);
      
      // Small delay before scrolling to show the AI response
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 overflow-hidden">
      {/* Sidebar - desktop only */}
      <div className="hidden md:flex flex-col w-64 flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="font-semibold text-gray-800 dark:text-white mb-4 text-lg">
          DSA Topics
        </h2>
        <div className="space-y-2 mb-6">
          {dsaTopics.map((topic, index) => (
            <div
              key={index}
              onClick={() => handleQuickPrompt(topic.prompt)}
              className="p-3 rounded-lg cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition group border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700"
            >
              <div className="flex items-center">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2 group-hover:scale-110 transition-transform">
                  {topic.icon}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {topic.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cheatsheet */}
        <div className="mt-4">
          <h2 className="font-semibold text-gray-800 dark:text-white mb-3 text-lg">
            Complexity Cheatsheet
          </h2>
          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-sm shadow-sm border border-gray-200 dark:border-gray-600">
            {[
              ["O(1): Constant", "Excellent", "text-green-600 dark:text-green-400"],
              ["O(log n): Logarithmic", "Great", "text-green-600 dark:text-green-400"],
              ["O(n): Linear", "Good", "text-yellow-600 dark:text-yellow-400"],
              ["O(n²): Quadratic", "Poor", "text-red-600 dark:text-red-400"],
            ].map(([label, rating, color], i) => (
              <div
                key={i}
                className={`flex justify-between items-center py-2 ${i < 3 ? "border-b border-gray-100 dark:border-gray-600" : ""}`}
              >
                <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">{label}</span>
                <span className={`${color} text-xs font-medium px-2 py-1 rounded-full bg-opacity-20 ${color.includes('green') ? 'bg-green-500' : color.includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}>
                  {rating}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex-1 p-2 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[85%] sm:max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex-shrink-0 ${msg.role === "user" ? "order-2 ml-2" : "order-1 mr-2"}`}>
                  {msg.role === "user" ? (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                      <User size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className={`flex-1 min-w-0 ${msg.role === "user" ? "order-1" : "order-2"}`}>
                  <div
                    className={`p-2.5 sm:p-4 rounded-2xl shadow-sm break-words ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-none ml-auto"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert break-words">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            // Improved Markdown components for better styling
                            p: ({node, ...props}) => (
                              <p className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base" {...props} />
                            ),
                            h1: ({node, ...props}) => (
                              <h1 className="text-xl font-bold mt-6 mb-4 text-gray-900 dark:text-white border-b pb-2" {...props} />
                            ),
                            h2: ({node, ...props}) => (
                              <h2 className="text-lg font-semibold mt-5 mb-3 text-gray-800 dark:text-gray-100" {...props} />
                            ),
                            h3: ({node, ...props}) => (
                              <h3 className="text-base font-medium mt-4 mb-2 text-gray-800 dark:text-gray-100" {...props} />
                            ),
                            ul: ({node, ...props}) => (
                              <ul className="list-disc list-inside space-y-1 mb-4 pl-5" {...props} />
                            ),
                            ol: ({node, ...props}) => (
                              <ol className="list-decimal list-inside space-y-1 mb-4 pl-5" {...props} />
                            ),
                            li: ({node, ...props}) => (
                              <li className="mb-1" {...props} />
                            ),
                            blockquote: ({node, ...props}) => (
                              <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-gray-700 dark:text-gray-300" {...props} />
                            ),
                            table: ({node, ...props}) => (
                              <div className="overflow-x-auto my-4">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
                              </div>
                            ),
                            th: ({node, ...props}) => (
                              <th className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider" {...props} />
                            ),
                            td: ({node, ...props}) => (
                              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300" {...props} />
                            ),
                            code: ({node, inline, className, children, ...props}) => {
                              const match = /language-(\w+)/.exec(className || '');
                              const language = match ? match[1] : '';
                              
                              return !inline && language ? (
                                <div className="my-4 rounded-lg overflow-hidden">
                                  <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-xs text-gray-200">
                                    <span>{language}</span>
                                    <button className="text-gray-400 hover:text-white">
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
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                </div>
                              ) : (
                                <code className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm font-mono text-pink-600 dark:text-pink-400" {...props}>
                                  {children}
                                </code>
                              );
                            },
                            a: ({node, ...props}) => (
                              <a className="text-indigo-600 dark:text-indigo-400 hover:underline" {...props} />
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                  <div
                    className={`text-xs mt-1 text-gray-500 ${
                      msg.role === "user" ? "text-right mr-2" : "ml-2"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[75%] sm:max-w-[70%]">
                <div className="mr-2 flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md">
                    <Bot size={14} className="text-white" />
                  </div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Topics (Mobile) */}
        <div className="md:hidden sticky bottom-0 left-0 right-0 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-10">
          <div className="px-2 py-2">
            <div className="flex overflow-x-auto gap-2 scrollbar-none mask-fade-edges">
              {dsaTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(topic.prompt)}
                  className="flex-shrink-0 flex items-center h-8 px-3 bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-300 rounded-full text-xs border shadow-sm transition active:scale-95 whitespace-nowrap"
                >
                  <span className="mr-1.5 text-indigo-600 dark:text-indigo-400">{topic.icon}</span>
                  {topic.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2 sm:py-3 z-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  maxLength={500}
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 pr-12 outline-none rounded-full border focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 transition-all text-sm sm:text-base shadow-sm"
                  placeholder="Ask about DSA concepts..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                  {input.length}/500
                </div>
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`h-10 sm:h-12 aspect-square rounded-full flex items-center justify-center transition-all active:scale-95 disabled:cursor-not-allowed ${
                  isLoading || !input.trim()
                    ? "bg-gray-200 text-gray-400 dark:bg-gray-700"
                    : "bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
                }`}
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="flex justify-center mt-1.5">
              <div className="text-[10px] sm:text-xs text-gray-500 flex items-center">
                <CornerDownLeft size={10} className="mr-1" />
                Press Enter to send
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAIPage;