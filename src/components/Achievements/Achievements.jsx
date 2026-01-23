import React from "react";
import { Trophy, Star, Flame, Medal, CheckCircle } from "lucide-react";

function Achievements() {
  return (
    <div className="pt-28 px-4 pb-24 dark:bg-black">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            Achievements
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
          Track your progress. Celebrate every win 🎉
        </p>

        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
          Every step matters. Earn badges, maintain streaks, and unlock milestones
          as you continue learning with LearnStack.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-20 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow text-center">
          <Trophy className="w-10 h-10 mx-auto text-yellow-500 mb-3" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow text-center">
          <Flame className="w-10 h-10 mx-auto text-orange-500 mb-3" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">7</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow text-center">
          <CheckCircle className="w-10 h-10 mx-auto text-green-500 mb-3" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow text-center">
          <Medal className="w-10 h-10 mx-auto text-blue-500 mb-3" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Milestones</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-28 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center text-gray-900 dark:text-white">
          Earned Badges
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            { title: "First Step", desc: "Completed your first lesson" },
            { title: "Consistency", desc: "7-day learning streak" },
            { title: "Explorer", desc: "Explored 5 learning paths" },
            { title: "Achiever", desc: "Completed 20 lessons" },
          ].map((badge, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow text-center hover:scale-[1.05] transition"
            >
              <Star className="w-10 h-10 mx-auto text-yellow-400 mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {badge.title}
              </h3>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation */}
      <div className="mt-32 max-w-4xl mx-auto text-center">
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
          Small wins lead to big success 🚀
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Keep learning, keep earning — your journey has just begun.
        </p>
      </div>
    </div>
  );
}

export default Achievements;