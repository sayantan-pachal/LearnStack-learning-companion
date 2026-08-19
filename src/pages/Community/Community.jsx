/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { Users, MessageSquare, Heart, BookOpen, PlusCircle, Info, X, Clock } from "lucide-react";
import { useToast } from "../../components/Other/ToastContext";

const INITIAL_POSTS = [
  {
    id: 1,
    title: "Best roadmap for learning DSA in college?",
    content: "I am in my 2nd year and want to start competitive programming. Should I go with Java or C++?",
    author: "Amit",
    replies: 12,
    time: "2 hours ago",
    avatarColor: "bg-blue-500"
  },
  {
    id: 2,
    title: "React vs Angular – what should beginners choose?",
    content: "Looking to get into frontend development. Which framework has better job opportunities right now?",
    author: "Sneha",
    replies: 8,
    time: "5 hours ago",
    avatarColor: "bg-pink-500"
  },
  {
    id: 3,
    title: "Free resources to learn Python effectively",
    content: "Can anyone share some good GitHub repos or YouTube playlists for Python automation?",
    author: "Rahul",
    replies: 15,
    time: "1 day ago",
    avatarColor: "bg-green-500"
  },
];

function Community() {
  const showToast = useToast();
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Post Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Load posts from Local Storage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("learnstack_community_preview");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem("learnstack_community_preview", JSON.stringify(INITIAL_POSTS));
    }
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast("Please enter a title for your discussion.", "error");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      author: "You", // Since this is a local preview, we just label it "You"
      replies: 0,
      time: "Just now",
      avatarColor: "bg-purple-500"
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("learnstack_community_preview", JSON.stringify(updatedPosts));
    
    setNewTitle("");
    setNewContent("");
    setIsModalOpen(false);
    showToast("Discussion posted locally! 🎉", "success");
  };

  return (
    <div className="pt-24 lg:pt-32 px-4 pb-24 min-h-screen font-dm bg-[#f8f9fa] dark:bg-[#050505]">
      
      {/* --- PREVIEW DISCLAIMER BANNER --- */}
      <div className="max-w-5xl mx-auto mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-2xl p-4 flex items-start sm:items-center gap-3 shadow-sm">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300 leading-relaxed">
            <strong className="font-bold">Interactive Preview Mode:</strong> This community board is currently an illustration. 
            We are actively developing the real-time backend. Any discussions you post right now will be saved locally to your browser so you can test the UI!
          </p>
        </div>
      </div>

      {/* --- HEADER --- */}
      <div className="max-w-5xl mx-auto text-center animate-in zoom-in-95 duration-700">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">
          LearnStack{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-500 dark:to-theme-pink-400">
            Community
          </span>
        </h1>

        <p className="text-lg md:text-xl font-bold mb-6 text-gray-700 dark:text-gray-300">
          Learn together. Grow together. 🚀
        </p>

        <p className="text-sm md:text-base max-w-2xl mx-auto text-gray-500 dark:text-gray-400 font-medium">
          Ask questions, share knowledge, help others, and connect with students
          who are on the exact same learning journey as you.
        </p>
      </div>

      {/* --- COMMUNITY STATS --- */}
      <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        {[
          { icon: Users, count: "1.2k", label: "Members", color: "text-blue-500" },
          { icon: MessageSquare, count: "340", label: "Discussions", color: "text-indigo-500" },
          { icon: BookOpen, count: "180", label: "Resources", color: "text-green-500" },
          { icon: Heart, count: "2.4k", label: "Likes Given", color: "text-pink-500" },
        ].map((stat, idx) => (
          <div key={idx} className="p-6 rounded-[1.5rem] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none text-center hover:-translate-y-1 transition-transform duration-300">
            <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
            <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.count}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* --- DISCUSSIONS FEED --- */}
      <div className="mt-20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Recent Discussions
          </h2>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:shadow-lg transition-all active:scale-95 text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Start Discussion
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-5 sm:p-6 rounded-[1.5rem] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div className={`hidden sm:flex w-10 h-10 rounded-full ${post.avatarColor} items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {post.author.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-theme-blue-600 dark:group-hover:text-theme-blue-400 transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  {post.content && (
                    <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                  )}
                  
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <div className={`sm:hidden w-4 h-4 rounded-full ${post.avatarColor} flex items-center justify-center text-white text-[8px]`}>
                        {post.author.charAt(0).toUpperCase()}
                      </div>
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.time}</span>
                    <span className="flex items-center gap-1 text-theme-blue-600 dark:text-theme-blue-400"><MessageSquare className="w-3.5 h-3.5" /> {post.replies} Replies</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CALL TO ACTION --- */}
      <div className="mt-24 max-w-3xl mx-auto text-center animate-in fade-in duration-1000 delay-500">
        <p className="text-lg font-black text-gray-900 dark:text-white">
          Everyone starts somewhere 💙
        </p>
        <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          Ask your first question or help someone today — learning is better together.
        </p>
      </div>

      {/* --- NEW POST MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-[#111] rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Create Discussion</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">Discussion Title</label>
                <input
                  type="text"
                  required
                  placeholder="What's on your mind?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-theme-blue-500 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">Details (Optional)</label>
                <textarea
                  rows="4"
                  placeholder="Add some context to your question..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-theme-blue-500 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 text-white shadow-lg shadow-theme-blue-500/20 active:scale-[0.98] transition-all text-sm"
                >
                  Post to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Community;