import { HiLightBulb, HiCode, HiChatAlt2, HiUserGroup } from "react-icons/hi";
import { motion } from "framer-motion";

const HowAlgoVikWorks = () => {
  const steps = [
    {
      icon: <HiLightBulb className="text-yellow-500 text-4xl" />,
      title: "Learn Core Concepts",
      desc: "Master essential DSA topics with structured learning paths and clear explanations.",
      step: "01"
    },
    {
      icon: <HiCode className="text-blue-500 text-4xl" />,
      title: "Practice Questions",
      desc: "Solve curated problems with difficulty levels and track your progress in real-time.",
      step: "02"
    },
    {
      icon: <HiChatAlt2 className="text-green-500 text-4xl" />,
      title: "Get AI Assistance",
      desc: "Instant help with doubts and code explanations from our intelligent assistant.",
      step: "03"
    },
    {
      icon: <HiUserGroup className="text-purple-500 text-4xl" />,
      title: "Share & Learn",
      desc: "Contribute interview experiences and learn from the community's real stories.",
      step: "04"
    },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute top-10 -right-10 w-40 h-40 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-45 blur-xl"></div>
      <div className="absolute bottom-10 -left-10 w-40 h-40 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 dark:opacity-10 rotate-12 blur-xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            How <span className="text-indigo-600 dark:text-indigo-400">AlgoVik</span> Works
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Simple steps to master coding interviews and boost your career
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Start your journey today and transform your coding skills
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowAlgoVikWorks;