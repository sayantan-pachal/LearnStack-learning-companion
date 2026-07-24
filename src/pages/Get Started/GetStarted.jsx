import React from "react";
import { BookOpen, Compass, Trophy, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <div className="pt-28 px-4 pb-24 dark:bg-black">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Get Started with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            LearnStack
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
          Your journey to better skills starts here 🚀
        </p>

        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
          LearnStack is built to guide students step-by-step — from learning fundamentals
          to building real-world skills and confidence.
        </p>
      </div>

      {/* Steps */}
      <div className="mt-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          {
            icon: BookOpen,
            title: "Explore Resources",
            desc: "Find notes, tutorials, videos, and tools curated for students.",
            link: "/resources",
          },
          {
            icon: Compass,
            title: "Choose a Learning Path",
            desc: "Follow structured roadmaps designed for beginners to advanced learners.",
            link: "/learningpaths",
          },
          {
            icon: Trophy,
            title: "Track Achievements",
            desc: "Stay motivated by tracking progress, milestones, and achievements.",
            link: "/achievements",
          },
          {
            icon: Users,
            title: "Join the Community",
            desc: "Ask questions, share knowledge, and grow together with peers.",
            link: "/community",
          },
        ].map((step, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow hover:scale-[1.02] transition"
          >
            <step.icon className="w-10 h-10 text-blue-500 dark:text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {step.desc}
            </p>

            <Link
              to={step.link}
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-600 dark:text-purple-400 hover:underline"
            >
              Go to {step.title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Motivation Section */}
      <div className="mt-32 max-w-4xl mx-auto text-center">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          You don’t need to know everything to start.
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Start small. Stay consistent. LearnStack will help you grow one step at a time.
        </p>

        <Link
          to="/learningpaths"
          className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-lg font-medium
                     bg-gradient-to-r from-blue-500 to-indigo-600 text-white
                     hover:shadow-lg hover:shadow-blue-500/40
                     dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/40
                     transition"
        >
          Start Learning Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default GetStarted;