import React from "react";
import { BookOpen, FileText, Video, Code } from "lucide-react";

function Resources() {
  return (
    <div className="pt-28 px-4 pb-24 dark:bg-black lg:h-screen lg:overflow-y-auto">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          LearnStack{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            Resources
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
          Everything you need to learn — in one place 📚
        </p>

        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
          Explore handpicked study materials, tutorials, videos, and practice
          resources designed to help you understand concepts faster and learn
          more effectively.
        </p>
      </div>

      {/* Resource Categories */}
      <div className="mt-24 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow hover:scale-105 transition">
          <BookOpen className="w-10 h-10 mx-auto mb-4 text-blue-600 dark:text-purple-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Notes & Books
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Clear explanations and reference material.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow hover:scale-105 transition">
          <Video className="w-10 h-10 mx-auto mb-4 text-blue-600 dark:text-purple-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Video Tutorials
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Learn visually with curated video lessons.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow hover:scale-105 transition">
          <Code className="w-10 h-10 mx-auto mb-4 text-blue-600 dark:text-purple-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Practice & Code
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Hands-on problems and coding exercises.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow hover:scale-105 transition">
          <FileText className="w-10 h-10 mx-auto mb-4 text-blue-600 dark:text-purple-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Guides & PDFs
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Quick guides and downloadable resources.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resources;