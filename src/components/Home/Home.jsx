import React from "react";
import { ArrowRight, BookOpen, Compass, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="pt-28 px-4 pb-24 dark:bg-black">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          Learn smarter with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            LearnStack
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
          Your student-friendly learning companion 🚀
        </p>

        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
          LearnStack helps you discover the right resources, follow structured
          learning paths, and track your progress — all in one place. Whether
          you're starting from scratch or sharpening your skills, we’ve got you
          covered.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/get-started"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white
                       bg-gradient-to-r from-blue-500 to-indigo-600
                       hover:shadow-lg hover:shadow-blue-500/40
                       dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/40
                       transition-all"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Link>

          <Link
            to="/learningpaths"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium
                       text-gray-800 dark:text-gray-200
                       bg-gray-100 hover:bg-gray-200
                       dark:bg-gray-800 dark:hover:bg-gray-700
                       transition-all"
          >
            Explore Learning Paths
          </Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow">
          <BookOpen className="w-10 h-10 mx-auto mb-4 text-blue-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Curated Resources
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            High-quality study materials selected to save your time.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow">
          <Compass className="w-10 h-10 mx-auto mb-4 text-blue-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Guided Paths
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Step-by-step learning paths for structured growth.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow">
          <Trophy className="w-10 h-10 mx-auto mb-4 text-blue-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Track Progress
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Stay motivated by tracking what you’ve learned.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;