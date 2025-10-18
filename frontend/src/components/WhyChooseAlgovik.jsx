import React from "react";
import { motion } from "framer-motion";
import { Code, Target, Users, BookOpen, CheckCircle, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
    title: "Curated Question Bank",
    description: "300+ handpicked questions from real company interviews. Focus on what matters most.",
    examples: ["Two Sum", "LRU Cache", "Merge Intervals"]
  },
  {
    icon: <Code className="w-8 h-8 text-green-600" />,
    title: "Step-by-Step Solutions",
    description: "Detailed explanations with multiple approaches. Understand the 'why' behind each solution.",
    examples: ["Brute Force to Optimal", "Time/Space Analysis", "Edge Cases"]
  },
  {
    icon: <Target className="w-8 h-8 text-purple-600" />,
    title: "Company-Specific Prep",
    description: "Practice questions grouped by companies like Google, Amazon, Microsoft, and startups.",
    examples: ["Google: System Design", "Amazon: Leadership Principles", "Startups: Practical Coding"]
  },
  {
    icon: <Users className="w-8 h-8 text-orange-600" />,
    title: "Peer Learning",
    description: "Discuss solutions with fellow learners. Get unstuck with community support.",
    examples: ["Code Reviews", "Study Groups", "Pair Programming"]
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-red-600" />,
    title: "Progress Tracking",
    description: "Track your solved problems and identify weak areas with visual analytics.",
    examples: ["Solved Count", "Topic Mastery", "Daily Streak"]
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-600" />,
    title: "Interview Ready",
    description: "Mock interviews with common follow-up questions and behavioral rounds.",
    examples: ["Technical Rounds", "HR Questions", "System Design"]
  }
];

const WhyChooseAlgovik = () => {
  return (
    <section className="relative py-16 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute top-20 -left-20 w-60 h-60 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-45 blur-xl"></div>
      <div className="absolute bottom-20 -right-20 w-60 h-60 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-12 blur-xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
       <motion.h3 
  className="text-3xl font-semibold text-gray-800 dark:text-white mt-10 mb-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Why Choose <span className="text-indigo-600 dark:text-indigo-400">AlgoVik?</span>
</motion.h3>
<motion.p 
  className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2, duration: 0.6 }}
>
  AlgoVik isn’t just another coding site — it’s your personalized interview companion. 
  Practice curated DSA questions, take real mock interviews, and track your growth with smart progress insights.
</motion.p>

        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                {feature.examples.map((example, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    {example}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Ready to Start Practicing?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Join developers preparing for interviews with real questions and solutions
          </p>
          <motion.button
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={"/dsa"}> Start Learning Now</Link>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseAlgovik;