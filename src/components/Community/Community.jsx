import React from "react";
import { Users, MessageSquare, Heart, BookOpen, PlusCircle } from "lucide-react";

function Community() {
  return (
    <div className="pt-28 px-4 pb-24 dark:bg-black">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          LearnStack{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            Community
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
          Learn together. Grow together. 🚀
        </p>

        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
          Ask questions, share knowledge, help others, and connect with students
          who are on the same learning journey as you.
        </p>
      </div>

      {/* Community Stats */}
      <div className="mt-20 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow text-center">
          <Users className="w-10 h-10 mx-auto text-blue-500 mb-3" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2k</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow text-center">
          <MessageSquare className="w-10 h-10 mx-auto text-indigo-500 mb-3" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">340</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Discussions</p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow text-center">
          <BookOpen className="w-10 h-10 mx-auto text-green-500 mb-3" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">180</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Resources Shared</p>
        </div>

        <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow text-center">
          <Heart className="w-10 h-10 mx-auto text-pink-500 mb-3" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">2.4k</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
        </div>
      </div>

      {/* Discussions */}
      <div className="mt-28 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Recent Discussions
          </h2>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/40 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/40 transition">
            <PlusCircle className="w-5 h-5" />
            New Post
          </button>
        </div>

        <div className="space-y-6">
          {[
            {
              title: "Best roadmap for learning DSA in college?",
              author: "Amit",
              replies: 12,
            },
            {
              title: "React vs Angular – what should beginners choose?",
              author: "Sneha",
              replies: 8,
            },
            {
              title: "Free resources to learn Python effectively",
              author: "Rahul",
              replies: 15,
            },
          ].map((post, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow hover:scale-[1.01] transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Posted by {post.author}</span>
                <span>{post.replies} replies</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-32 max-w-4xl mx-auto text-center">
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
          Everyone starts somewhere 💙
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Ask your first question or help someone today — learning is better together.
        </p>
      </div>
    </div>
  );
}

export default Community;