import React, { useState, useEffect, useMemo } from "react";
import { X, PlayCircle, FileText, Lock, Clock, BookOpen, GraduationCap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Import the database methods and constants
import { databases, DATABASE_ID, PROGRESS_COLLECTION_ID, ID } from "../../appwrite/config";

const CourseModal = ({ isOpen, onClose, course }) => {
    const [isEnrolling, setIsEnrolling] = useState(false);
    const navigate = useNavigate();

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    // Dynamic Module Generation Strategy
    const modules = useMemo(() => {
        if (!course) return [];

        const videoIds = course.YouTube_ID ? course.YouTube_ID.split(',').map(id => id.trim()).filter(Boolean) : [];
        const resourceLinks = course.Resource_Link ? course.Resource_Link.split(',').map(link => link.trim()).filter(Boolean) : [];

        const itemsList = videoIds.length > 0 ? videoIds : resourceLinks;
        const isVideo = videoIds.length > 0;

        if (itemsList.length === 0) return [];

        const lessonsPerModule = 5;
        const generatedModules = [];

        for (let i = 0; i < itemsList.length; i += lessonsPerModule) {
            const chunk = itemsList.slice(i, i + lessonsPerModule);
            const moduleNumber = Math.floor(i / lessonsPerModule) + 1;

            const lessons = chunk.map((itemUrl, index) => ({
                id: `${moduleNumber}-${index + 1}`,
                title: `Lesson ${i + index + 1}`,
                type: isVideo ? "video" : "pdf",
                url: itemUrl,
                locked: true 
            }));

            generatedModules.push({
                title: `Module ${moduleNumber}: Section Overview`,
                lessons: lessons
            });
        }

        return generatedModules;
    }, [course]);

    if (!isOpen || !course) return null;

    const handleEnroll = async () => {
        setIsEnrolling(true);
        try {
            // 1. Get logged-in user
            const userStr = localStorage.getItem("learnstack_user");
            if (!userStr) {
                alert("Please log in to enroll in this course.");
                setIsEnrolling(false);
                return;
            }
            const user = JSON.parse(userStr);
            const courseId = course.id || course.$id || course.ID;

            // 2. Check if already enrolled (listDocuments auto-filters by userId in your config)
            const existingProgress = await databases.listDocuments(DATABASE_ID, PROGRESS_COLLECTION_ID);
            const isAlreadyEnrolled = existingProgress.documents.some(doc => String(doc.CourseId) === String(courseId));

            // 3. Create the enrollment record matching your exact Sheet headers
            if (!isAlreadyEnrolled) {
                await databases.createDocument(
                    DATABASE_ID,
                    PROGRESS_COLLECTION_ID,
                    ID.unique(),
                    {
                        UserId: user.userId,
                        CourseId: courseId,
                        CompletedModules: 0,
                        CompletionPercentage: 0
                    }
                );
            }

            setIsEnrolling(false);
            onClose(); 
            navigate("/mycourses"); 
            
        } catch (error) {
            console.error("Failed to enroll:", error);
            alert("An error occurred while enrolling. Please try again.");
            setIsEnrolling(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#0a0a0a] rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Course Details & Syllabus */}
                <div className="w-full md:w-3/5 lg:w-2/3 h-full overflow-y-auto scrollbar-thin flex flex-col border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
                    <div className="p-6 md:p-8 md:pb-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                            <GraduationCap className="w-4 h-4" />
                            {course.Department} • Semester {course.Semester}
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            {course.Title}
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                            {course.Description || "Dive into this comprehensive course designed to give you a deep understanding of the subject matter. Perfect for engineering students looking to strengthen their core concepts."}
                        </p>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Course Syllabus</h3>
                        
                        <div className="space-y-4 pb-8">
                            {modules.length > 0 ? modules.map((mod, i) => (
                                <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-white/[0.02] overflow-hidden">
                                    <div className="p-4 bg-white dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-gray-800 font-semibold text-gray-900 dark:text-white flex justify-between items-center">
                                        {mod.title}
                                        <span className="text-xs text-gray-500 font-medium">{mod.lessons.length} lessons</span>
                                    </div>
                                    <div className="p-2">
                                        {mod.lessons.map(lesson => (
                                            <div key={lesson.id} className="flex items-center gap-3 p-3 text-gray-600 dark:text-gray-400">
                                                {lesson.type === "video" ? (
                                                    <PlayCircle className="w-4 h-4 text-blue-500 dark:text-purple-400 shrink-0" />
                                                ) : (
                                                    <FileText className="w-4 h-4 text-blue-500 dark:text-purple-400 shrink-0" />
                                                )}
                                                <span className="text-sm">{lesson.title}</span>
                                                <Lock className="w-3.5 h-3.5 ml-auto opacity-40 shrink-0" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-500 italic text-sm">Syllabus content is being updated.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Enrollment Card */}
                <div className="w-full md:w-2/5 lg:w-1/3 bg-[#FAFAFA] dark:bg-[#050505] p-6 md:p-8 flex flex-col sticky top-0">
                    <div className="aspect-video w-full rounded-2xl bg-gray-200 dark:bg-gray-800 mb-6 overflow-hidden relative shadow-sm">
                        {course.YouTube_ID ? (
                            <img
                                src={`https://img.youtube.com/vi/${course.YouTube_ID.split(',')[0].trim()}/maxresdefault.jpg`}
                                alt="Course Thumbnail"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://img.youtube.com/vi/${course.YouTube_ID.split(',')[0].trim()}/hqdefault.jpg`;
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40">
                                <BookOpen className="w-12 h-12 text-blue-400 dark:text-blue-700" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/40">
                                <PlayCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-500" /> Format</span>
                            <span className="font-semibold">{course.YouTube_ID ? "Video Lectures" : "Interactive PDF"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-500" /> Access</span>
                            <span className="font-semibold">Lifetime access</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Total Items</span>
                            <span className="font-semibold">{modules.reduce((total, mod) => total + mod.lessons.length, 0)} Lessons</span>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                        <button
                            onClick={handleEnroll}
                            disabled={isEnrolling}
                            className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                                isEnrolling 
                                ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed" 
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-purple-500 dark:to-pink-500 shadow-lg shadow-blue-500/30 dark:shadow-purple-500/30 hover:-translate-y-0.5"
                            }`}
                        >
                            {isEnrolling ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Enrolling...
                                </>
                            ) : (
                                "Enroll in Course"
                            )}
                        </button>
                        <p className="text-xs text-center text-gray-500 font-medium">
                            Enrolling will add this to your personal dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseModal;