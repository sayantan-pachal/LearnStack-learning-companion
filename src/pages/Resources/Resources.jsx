import React, { useState } from "react";
import { BookOpen, FileText, Video, Code, Search, ExternalLink } from "lucide-react";

function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - eventually, you can fetch this from your Google Sheets backend!
  const resourcesList = [
    { id: 1, title: "React for Beginners", category: "Video Tutorials", icon: Video, link: "#" },
    { id: 2, title: "Data Structures in Java", category: "Notes & Books", icon: BookOpen, link: "#" },
    { id: 3, title: "100 Python Challenges", category: "Practice & Code", icon: Code, link: "#" },
    { id: 4, title: "Tailwind CSS Cheat Sheet", category: "Guides & PDFs", icon: FileText, link: "#" },
    { id: 5, title: "Advanced JavaScript Concepts", category: "Video Tutorials", icon: Video, link: "#" },
    { id: 6, title: "Git & GitHub Crash Course", category: "Guides & PDFs", icon: FileText, link: "#" },
  ];

  const categories = [
    { name: "Notes & Books", icon: BookOpen, desc: "Clear explanations and reference material." },
    { name: "Video Tutorials", icon: Video, desc: "Learn visually with curated video lessons." },
    { name: "Practice & Code", icon: Code, desc: "Hands-on problems and coding exercises." },
    { name: "Guides & PDFs", icon: FileText, desc: "Quick guides and downloadable resources." },
  ];

  // Filter logic based on search and category
  const filteredResources = resourcesList.filter((resource) => {
    const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 px-4 pb-24 min-h-screen dark:bg-[#0a0a0a] font-dm text-[#111] dark:text-gray-100 lg:overflow-y-auto">
      
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
          LearnStack{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            Resources
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-medium text-gray-700 dark:text-gray-300">
          Everything you need to learn — in one place 📚
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-16">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for tutorials, notes, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-white/[0.05] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Interactive Category Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <button
          onClick={() => setActiveCategory("All")}
          className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
            activeCategory === "All"
              ? "bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500 text-white shadow-lg shadow-blue-500/30 border-transparent"
              : "bg-white/60 dark:bg-white/[0.02] border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/[0.05]"
          }`}
        >
          <h3 className="font-bold text-lg">All Resources</h3>
          <p className={`text-sm mt-1 ${activeCategory === "All" ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
            Browse everything we have to offer.
          </p>
        </button>

        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border group ${
                isActive
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500 text-white shadow-lg shadow-blue-500/30 border-transparent"
                  : "bg-white/60 dark:bg-white/[0.02] border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/[0.05]"
              }`}
            >
              <cat.icon className={`w-8 h-8 mb-3 ${isActive ? "text-white" : "text-blue-600 dark:text-purple-400 group-hover:scale-110 transition-transform"}`} />
              <h3 className="font-bold text-lg">{cat.name}</h3>
              <p className={`text-sm mt-1 ${isActive ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Resource Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {activeCategory === "All" ? "Latest Resources" : activeCategory}
          </h2>
          <span className="text-sm font-medium text-gray-500 px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full">
            {filteredResources.length} items
          </span>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <a
                key={resource.id}
                href={resource.link}
                className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-purple-500/20 text-blue-600 dark:text-purple-400">
                    <resource.icon size={24} />
                  </div>
                  <ExternalLink size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
                  {resource.title}
                </h3>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-auto">
                  {resource.category}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-black/20 dark:border-white/20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No resources found matching your search.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-600 dark:text-purple-400 font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default Resources;