import React, { useState, useEffect, useMemo } from "react";
import { BookOpen, FileText, Video, Code } from "lucide-react";
import { departmentOptions, semesterOptions } from "../../data/learningpaths";
import { databases, DATABASE_ID, COURSES_COLLECTION_ID } from "../../appwrite/config";
import Loader from "../../components/Other/Loader";

// Import the new modular components
import ResourceCard from "./ResourceCard";
import ResourceFilters from "./ResourceFilters";
import CategoryTabs from "./CategoryTabs";

function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [activeInfo, setActiveInfo] = useState(null);

  const [resourcesList, setResourcesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const resourceDeptOptions = [{ label: "All Departments", value: "All" }, ...(departmentOptions || [])];
  const resourceSemOptions = [{ label: "All Semesters", value: "All" }, ...(semesterOptions || [])];

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
        if (response && response.documents) setResourcesList(response.documents);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);

  const mappedResourcesList = useMemo(() => {
    return resourcesList.map(item => {
      let frontendCat = "Guides & PDFs";
      if (item.Item_Type === "Course") frontendCat = "Video Tutorials";
      else if (item.Category === "Book") frontendCat = "Notes & Books";
      else if (item.Category === "DSA" || item.Category === "System Design") frontendCat = "Practice & Code";
      return { ...item, FrontendCategory: frontendCat };
    });
  }, [resourcesList]);

  const filteredResources = useMemo(() => {
    let filtered = mappedResourcesList.filter((resource) => {
      const matchesCategory = activeCategory === "All" || resource.FrontendCategory === activeCategory;
      const matchesSearch = (resource.Title || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === "All" || resource.Department === selectedDept;
      const matchesSem = selectedSemester === "All" || String(resource.Semester) === String(selectedSemester);
      return matchesCategory && matchesSearch && matchesDept && matchesSem;
    });

    filtered.sort((a, b) => {
      const dateA = a.Date_Added ? new Date(a.Date_Added).getTime() : 0;
      const dateB = b.Date_Added ? new Date(b.Date_Added).getTime() : 0;
      return dateB - dateA;
    });

    return filtered;
  }, [activeCategory, searchQuery, selectedDept, selectedSemester, mappedResourcesList]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-black"><Loader /></div>;
  }

  const latestResources = filteredResources.slice(0, 6);
  const remainingResources = filteredResources.slice(6);

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
        <p className="text-lg md:text-xl mb-10 text-gray-700 dark:text-gray-300">
          Everything you need to learn in one place...
        </p>

        {/* Extracted Search & Dropdown Component */}
        <ResourceFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedSemester={selectedSemester}
          setSelectedSemester={setSelectedSemester}
          resourceDeptOptions={resourceDeptOptions}
          resourceSemOptions={resourceSemOptions}
        />
      </div>

      {/* Extracted Categories Tab Component */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeInfo={activeInfo}
        setActiveInfo={setActiveInfo}
      />

      {/* Grid Layouts */}
      <div className="max-w-6xl mx-auto relative z-0 mt-8">

        {error ? (
          <div className="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-dashed border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400">
            <p className="text-lg font-bold">{error}</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-20 bg-white/50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-black/20 dark:border-white/20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No resources found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDept("All");
                setSelectedSemester("All");
                setActiveCategory("All");
              }}
              className="mt-4 text-blue-600 dark:text-purple-400 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : activeCategory === "All" ? (
          <div className="flex flex-col gap-12">
            {latestResources.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Latest Resources</h2>
                  <span className="text-sm font-medium text-gray-500 px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full">
                    {latestResources.length} items
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestResources.map(res => <ResourceCard key={res.ID || res.$id} resource={res} IconComponent={getIconForCategory(res.FrontendCategory)} />)}
                </div>
              </div>
            )}

            {remainingResources.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold border-t border-gray-200 dark:border-gray-800 pt-8 w-full">
                    All Resources
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingResources.map(res => <ResourceCard key={res.ID || res.$id} resource={res} IconComponent={getIconForCategory(res.FrontendCategory)} />)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{activeCategory}</h2>
              <span className="text-sm font-medium text-gray-500 px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full">
                {filteredResources.length} items
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(res => <ResourceCard key={res.ID || res.$id} resource={res} IconComponent={getIconForCategory(res.FrontendCategory)} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resources;