import React, { useState, useEffect, useMemo } from "react";
import { BookOpen, PlayCircle, Search, Filter } from "lucide-react";
import CourseModal from "./CourseModal";
import Loader from "../../components/Other/Loader";
import { databases, DATABASE_ID, COURSES_COLLECTION_ID } from "../../appwrite/config"; 
import CustomDropdown from "../../components/Other/CustomDropdown";
import { departmentOptions, semesterOptions } from "../../data/learningpaths";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Filters
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedSemester, setSelectedSemester] = useState("All");

    // Modal State
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const courseDeptOptions = [{ label: "All Departments", value: "All" }, ...departmentOptions];
    const courseSemOptions = [{ label: "All Semesters", value: "All" }, ...semesterOptions];

    useEffect(() => {
        // Automatically grab the search query from the URL if it exists
        const params = new URLSearchParams(window.location.search);
        const urlSearchQuery = params.get("search");
        if (urlSearchQuery) {
            setSearchQuery(urlSearchQuery);
        }

        const loadCourses = async () => {
            try {
                setLoading(true);
                const response = await databases.listDocuments(DATABASE_ID, COURSES_COLLECTION_ID);
                
                if (response && response.documents) {
                    const courseData = response.documents.filter(item => item.Item_Type === "Course");
                    setCourses(courseData);
                }
            } catch (error) {
                console.error("Failed to load courses:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    const openCourse = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesSearch = (course.Title || "").toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDept = selectedDept === "All" || course.Department === selectedDept;
            const matchesSem = selectedSemester === "All" || course.Semester === selectedSemester;
            return matchesSearch && matchesDept && matchesSem;
        });
    }, [courses, searchQuery, selectedDept, selectedSemester]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#050505]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="pt-28 px-4 pb-24 bg-[#FAFAFA] dark:bg-[#050505] min-h-screen font-dm">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="max-w-5xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700 mb-12">
                    <h1 className="text-3xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white">
                        LearnStack{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
                            Courses
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-10 text-gray-700 dark:text-gray-300">
                        Access full-length video courses and structured study materials.
                    </p>

                    {/* Filters & Search Container */}
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 relative z-10">
                        <div className="relative w-full md:flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 outline-none transition-all shadow-sm text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-row gap-4 w-full md:w-2/5">
                            <div className="relative w-1/2 z-20 text-gray-900 dark:text-white">
                                <CustomDropdown value={selectedDept} options={courseDeptOptions} onChange={(e) => setSelectedDept(e.target.value)} />
                            </div>
                            <div className="relative w-1/2 z-10 text-gray-900 dark:text-white">
                                <CustomDropdown value={selectedSemester} options={courseSemOptions} onChange={(e) => setSelectedSemester(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-0">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id || course.$id || Math.random()}
                            onClick={() => openCourse(course)}
                            className="group bg-white dark:bg-[#0a0a0a] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-purple-500/50 transition-all duration-300 cursor-pointer flex flex-col"
                        >
                            {/* Thumbnail Area */}
                            <div className="aspect-video bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                                {course.YouTube_ID ? (
                                    <img
                                        src={`https://img.youtube.com/vi/${course.YouTube_ID.split(',')[0].trim()}/maxresdefault.jpg`}
                                        alt={course.Title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40">
                                        <BookOpen className="w-12 h-12 text-blue-300 dark:text-blue-700" />
                                    </div>
                                )}

                                {/* Play Overlay overlay on hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <PlayCircle className="w-12 h-12 text-white" />
                                </div>

                                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-2 py-1 rounded-md text-gray-900 dark:text-white uppercase tracking-wider">
                                    {course.Department}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
                                    {course.Title}
                                </h3>

                                <div className="mt-auto flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <BookOpen className="w-3.5 h-3.5" /> Sem {course.Semester}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                                        {course.YouTube_ID ? "Video Course" : "PDF Course"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-20 bg-white/50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-black/20 dark:border-white/20 mt-8 relative z-0">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No courses found matching your filters.</p>
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

            {/* The Floating Window Modal */}
            <CourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                course={selectedCourse}
            />

        </div>
    );
}

export default Courses;