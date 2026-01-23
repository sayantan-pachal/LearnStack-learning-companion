import React from "react";
import { Compass, Layers, Code, Cpu, Rocket } from "lucide-react";

function LearningPaths() {
  return (
    <div className="pt-28 px-4 pb-24 dark:bg-black">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Learning{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            Paths
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
          Follow a clear roadmap. Learn step by step 🧭
        </p>

        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
          Our learning paths are carefully structured to guide you from
          fundamentals to advanced concepts, helping you build real skills with
          confidence and clarity.
        </p>
      </div>

      {/* Paths */}
      <div className="mt-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Beginner */}
        <div className="p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow hover:scale-[1.03] transition">
          <Layers className="w-12 h-12 mb-6 text-blue-600 dark:text-purple-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Beginner Path
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start from zero. Learn core concepts, basics, and essential tools.
          </p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <li>• Fundamentals & basics</li>
            <li>• Simple projects</li>
            <li>• Concept clarity</li>
          </ul>
        </div>

        {/* Intermediate */}
        <div className="p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow hover:scale-[1.03] transition">
          <Code className="w-12 h-12 mb-6 text-blue-600 dark:text-purple-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Intermediate Path
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Strengthen your knowledge and start building real-world projects.
          </p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <li>• Practical implementation</li>
            <li>• Medium-level projects</li>
            <li>• Problem solving</li>
          </ul>
        </div>

        {/* Advanced */}
        <div className="p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow hover:scale-[1.03] transition">
          <Cpu className="w-12 h-12 mb-6 text-blue-600 dark:text-purple-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Advanced Path
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Master advanced topics and prepare for industry-level challenges.
          </p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <li>• Advanced concepts</li>
            <li>• Optimization & performance</li>
            <li>• Industry-ready skills</li>
          </ul>
        </div>
      </div>

      {/* Motivation Section */}
      <div className="mt-28 max-w-4xl mx-auto text-center">
        <Rocket className="w-12 h-12 mx-auto mb-6 text-blue-600 dark:text-purple-400" />
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
          Choose a path. Stay consistent. Grow every day.
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          LearnStack helps you move forward with clarity — no confusion, no
          overwhelm.
        </p>
      </div>
    </div>
  );
}

export default LearningPaths;