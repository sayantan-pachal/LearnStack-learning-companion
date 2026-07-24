import React, { useState, useEffect, useMemo } from "react";
import { BookOpen, FileText, Video, Code, Search, ExternalLink, Info, X } from "lucide-react";
import CustomDropdown from "../../components/Other/CustomDropdown";
import { departmentOptions, semesterOptions } from "../../data/learningpaths";
import { databases, DATABASE_ID, COURSES_COLLECTION_ID } from "../../appwrite/config"; 
import Loader from "../../components/Other/Loader"; 

function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [activeInfo, setActiveInfo] = useState(null);

  // Backend Integration States
  const [resourcesList, setResourcesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const resourceDeptOptions = [{ label: "All Departments", value: "All" }, ...departmentOptions];
  const resourceSemOptions = [{ label: "All Semesters", value: "All" }, ...semesterOptions];

  const categories = [
    { name: "Notes & Books", icon: BookOpen, desc: "Clear explanations and reference material to help you study." },
    { name: "Video Tutorials", icon: Video, desc: "Learn visually with curated, high-quality video lessons." },
    { name: "Practice & Code", icon: Code, desc: "Hands-on problems, projects, and coding exercises." },
    { name: "Guides & PDFs", icon: FileText, desc: "Quick cheat sheets, guides, and downloadable resources." },
  ];

  const getIconForCategory = (categoryName) => {
    switch (categoryName) {
      case "Video Tutorials": return Video;
      case "Notes & Books": return BookOpen;
      case "Practice & Code": return Code;
      case "Guides & PDFs": return FileText;
      default: return BookOpen;
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await databases.listDocuments(DATABASE_ID, COURSES_COLLECTION_ID);
        
        if (response && response.documents) {
            setResourcesList(response.documents);
        } else {
            setResourcesList([]);
        }
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = useMemo(() => {
    let filtered = resourcesList.filter((resource) => {
      const matchesCategory = activeCategory === "All" || resource.Category === activeCategory;
      const matchesSearch = (resource.Title || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === "All" || resource.Department === selectedDept;
      const matchesSem = selectedSemester === "All" || resource.Semester === selectedSemester;
      
      return matchesCategory && matchesSearch && matchesDept && matchesSem;
    });

    filtered.sort((a, b) => {
      const dateA = a.Date_Added ? new Date(a.Date_Added) : new Date(0);
      const dateB = b.Date_Added ? new Date(b.Date_Added) : new Date(0);
      return dateB - dateA;
    });

    return filtered.slice(0, 6);
    
  }, [activeCategory, searchQuery, selectedDept, selectedSemester, resourcesList]);

  
  // If data is loading, show your awesome custom full-page loader!
      if (isLoading) {
          return (
              <div className="min-h-screen flex items-center justify-center dark:bg-black">
                  <Loader />
              </div>
          );
      }

  return (
    <div className="pt-28 px-4 pb-24 min-h-screen dark:bg-[#0a0a0a] font-dm text-[#111] dark:text-gray-100 lg:overflow-y-auto">
      
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-6xl font-black mb-6 tracking-tight">
          LearnStack{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            Resources
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-10 font-extralight text-gray-700 dark:text-gray-300">
          Everything you need to learn - in one place 📚
        </p>

        {/* Filters & Search Container */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-12 relative z-10">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for tutorials, notes, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-row gap-4 w-full md:w-2/5">
            <div className="relative w-1/2 z-20">
              <CustomDropdown value={selectedDept} options={resourceDeptOptions} onChange={(e) => setSelectedDept(e.target.value)} />
            </div>
            <div className="relative w-1/2 z-10">
              <CustomDropdown value={selectedSemester} options={resourceSemOptions} onChange={(e) => setSelectedSemester(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Category Cards */}
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

      {/* Resource Grid Loading, Error, and Render States */}
      <div className="max-w-6xl mx-auto relative z-0 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {activeCategory === "All" ? "Latest Resources" : activeCategory}
          </h2>
          <span className="text-sm font-medium text-gray-500 px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full">
            {filteredResources.length} items
          </span>
        </div>

        {error ? (
          <div className="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-dashed border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400">
            <p className="text-lg font-bold">{error}</p>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const IconComponent = getIconForCategory(resource.Category);
              
              return (
                <a
                  key={resource.ID || resource.$id || Math.random()} 
                  href={resource.Resource_Link || (resource.YouTube_ID ? `https://youtube.com/watch?v=${resource.YouTube_ID}` : "#")} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-purple-500/20 text-blue-600 dark:text-purple-400">
                      <IconComponent size={24} />
                    </div>
                    <ExternalLink size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
                    {resource.Title}
                  </h3>
                  
                  <div className="flex gap-2 flex-wrap mb-4 mt-2">
                      <span className="text-xs font-bold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">
                          {resource.Department}
                      </span>
                      <span className="text-xs font-bold px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md">
                          {resource.Semester}
                      </span>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {resource.Category}
                    </span>
                    {resource.Date_Added && (
                      <span className="text-xs font-semibold text-gray-400">
                        {new Date(resource.Date_Added).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-black/20 dark:border-white/20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No resources found matching your filters.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedDept("All");
                setSelectedSemester("All");
              }}
              className="mt-4 text-blue-600 dark:text-purple-400 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default Resources;