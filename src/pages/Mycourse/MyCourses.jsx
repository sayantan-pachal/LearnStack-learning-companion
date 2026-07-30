import React, { useState, useEffect } from "react";
import { BookOpen, PlayCircle, Trophy, ArrowRight, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Other/Loader";
import { databases, DATABASE_ID, COURSES_COLLECTION_ID, PROGRESS_COLLECTION_ID } from "../../appwrite/config";
import CourseViewer from "./CourseViewer"; // Import the new full-screen component

function MyCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State for the full-screen viewer
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                setLoading(true);
                const userStr = localStorage.getItem("learnstack_user");
                if (!userStr) {
                    navigate("/login"); 
                    return;
                }

                // 1. Fetch the user's enrollments from UserProgress sheet
                const progressRes = await databases.listDocuments(DATABASE_ID, PROGRESS_COLLECTION_ID);
                const userProgress = progressRes.documents || [];

                if (userProgress.length === 0) {
                    setEnrolledCourses([]);
                    setLoading(false);
                    return;
                }

                // 2. Fetch ALL courses to match metadata (Titles, Thumbnails)
                const coursesRes = await databases.listDocuments(DATABASE_ID, COURSES_COLLECTION_ID);
                const allCourses = coursesRes.documents || [];

                // 3. Map the progress records to the full course data
                const mappedCourses = userProgress.map(progress => {
                    // RESILIENT ID MAPPING: Checks both capitalized and lowercase variations from the Sheet
                    const pCourseId = progress.CourseId || progress.courseId;

                    const matchedCourse = allCourses.find(c => 
                        String(c.ID) === String(pCourseId) || 
                        String(c.$id) === String(pCourseId) || 
                        String(c.id) === String(pCourseId)
                    );

                    if (matchedCourse) {
                        return {
                            ...matchedCourse,
                            progressDetails: progress // Attach the UserProgress row data
                        };
                    }
                    return null;
                }).filter(Boolean); // Remove any nulls if a course was deleted from the main DB

                setEnrolledCourses(mappedCourses);

            } catch (error) {
                console.error("Failed to load My Courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, [navigate]);

    const handleOpenCourse = (course) => {
        setSelectedCourse(course);
        setIsViewerOpen(true);
    };

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
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                            <LayoutDashboard className="w-8 h-8 text-blue-600 dark:text-purple-500" />
                            My Learning
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Pick up right where you left off.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white dark:bg-[#111] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-blue-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Enrolled</p>
                            <p className="text-xl font-black text-gray-900 dark:text-white">{enrolledCourses.length} Courses</p>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                {enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
                        {enrolledCourses.map((course) => {
                            const firstVideoId = course.YouTube_ID ? course.YouTube_ID.split(',')[0].trim() : null;
                            const progressPercent = course.progressDetails?.CompletionPercentage || 0;

                            return (
                                <div
                                    key={course.id || course.$id || course.ID}
                                    onClick={() => handleOpenCourse(course)}
                                    className="group bg-white dark:bg-[#0a0a0a] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-purple-500/50 transition-all duration-300 cursor-pointer flex flex-col"
                                >
                                    {/* Thumbnail */}
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                                        {firstVideoId ? (
                                            <img
                                                src={`https://img.youtube.com/vi/${firstVideoId}/maxresdefault.jpg`}
                                                alt={course.Title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.onerror = null; 
                                                    e.target.src = `https://img.youtube.com/vi/${firstVideoId}/hqdefault.jpg`;
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40">
                                                <BookOpen className="w-12 h-12 text-blue-300 dark:text-blue-700" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                            <PlayCircle className="w-12 h-12 text-white" />
                                        </div>
                                    </div>

                                    {/* Card Content & Progress Bar */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-2 mb-4 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
                                            {course.Title}
                                        </h3>

                                        <div className="mt-auto space-y-3">
                                            <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
                                                <span>{progressPercent}% Complete</span>
                                                <span>{course.progressDetails?.CompletedModules || 0} Modules</span>
                                            </div>
                                            
                                            {/* Progress Track */}
                                            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${progressPercent}%` }}
                                                />
                                            </div>

                                            <div className="pt-2 flex items-center justify-end text-sm font-bold text-blue-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                                                Continue <ArrowRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-[#111] rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 relative z-0">
                        <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Courses Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            You haven't enrolled in any courses. Browse the catalog to start learning!
                        </p>
                        <button
                            onClick={() => navigate("/courses")}
                            className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-xl font-bold transition-colors"
                        >
                            Browse Courses
                        </button>
                    </div>
                )}
            </div>

            {/* Reusable Full-Screen Course Viewer */}
            <CourseViewer 
                isOpen={isViewerOpen} 
                onClose={() => setIsViewerOpen(false)} 
                course={selectedCourse} 
            />

        </div>
    );
}

export default MyCourses;