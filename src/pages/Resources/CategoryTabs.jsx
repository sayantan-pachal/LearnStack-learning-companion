import React from "react";
import { Info, X } from "lucide-react";

const CategoryTabs = ({ categories, activeCategory, setActiveCategory, activeInfo, setActiveInfo }) => {
  return (
    <div className="max-w-6xl mx-auto relative z-0 mb-8">
      <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-3 md:items-center md:justify-start">
        <button
          onClick={() => { setActiveCategory("All"); setActiveInfo(null); }}
          className={`col-span-2 md:col-span-1 px-6 py-3 rounded-full transition-all duration-200 border shadow-sm ${
            activeCategory === "All"
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500 text-white border-transparent"
              : "bg-white/60 dark:bg-white/[0.02] border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/[0.05]"
          }`}
        >
          <span className="font-bold text-base md:text-lg whitespace-nowrap">All Resources</span>
        </button>

        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <div key={cat.name} className="flex shadow-sm rounded-full border border-black/10 dark:border-white/10 overflow-hidden bg-white/60 dark:bg-white/[0.01]">
              <button
                onClick={() => { setActiveCategory(cat.name); setActiveInfo(null); }}
                className={`flex items-center gap-2 px-4 py-3 transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500 text-white"
                    : "hover:bg-white dark:hover:bg-white/[0.05]"
                }`}
              >
                <cat.icon className={`w-3 h-3 md:w-5 md:h-5 ${isActive ? "text-white" : "text-blue-600 dark:text-purple-400"}`} />
                <span className="font-bold text-xs md:text-base whitespace-nowrap">{cat.name}</span>
              </button>
              <button
                onClick={() => setActiveInfo(activeInfo === cat.name ? null : cat.name)}
                className={`px-0.5 py-3 md:px-3 md:py-3 flex items-center justify-center transition-colors border-l ${
                  isActive
                    ? "bg-indigo-700/50 dark:bg-pink-700/50 border-white/20 text-white hover:bg-indigo-700 dark:hover:bg-pink-700"
                    : "hover:bg-gray-100 dark:hover:bg-white/10 border-black/5 dark:border-white/5 text-gray-400 hover:text-blue-500 dark:hover:text-purple-400"
                }`}
                title={`What is ${cat.name}?`}
              >
                <Info size={18} />
              </button>
            </div>
          );
        })}
      </div>

      {activeInfo && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300 shadow-inner">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 md:mt-0" />
            <p className="text-sm md:text-base font-medium text-blue-900 dark:text-blue-200">
              <span className="font-bold mr-1">{activeInfo}:</span> 
              {categories.find(c => c.name === activeInfo)?.desc}
            </p>
          </div>
          <button 
            onClick={() => setActiveInfo(null)} 
            className="p-1.5 shrink-0 bg-blue-100 hover:bg-blue-200 dark:bg-blue-800/50 dark:hover:bg-blue-800 rounded-full transition-colors text-blue-700 dark:text-blue-300"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;