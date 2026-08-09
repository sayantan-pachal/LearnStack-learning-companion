/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useMemo, useEffect } from "react";
import { X, PlayCircle, CheckCircle, FileText, Menu, ClipboardList, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Simple parser to extract just the YouTube Video ID
const extractYouTubeID = (url) => {
    if (!url) return null;
    const cleanUrl = String(url).trim();
    const match = cleanUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return (match && match[2].length === 11) ? match[2] : cleanUrl; // Fallback to raw ID if regex fails
};

const CourseViewer = ({ isOpen, onClose, course }) => {
    const [activeLesson, setActiveLesson] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    // Prevent background scrolling when open & reset sidebar state
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setIsSidebarOpen(true);
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    // Memoize the lesson generation so it only recalculates if the course changes
    const lessons = useMemo(() => {
        if (!course) return [];

        const videoLinks = course.YouTube_ID ? course.YouTube_ID.split(',').map(id => id.trim()).filter(Boolean) : [];
        const resourceLinks = course.Resource_Link ? course.Resource_Link.split(',').map(link => link.trim()).filter(Boolean) : [];

        const itemsList = videoLinks.length > 0 ? videoLinks : resourceLinks;
        const isVideo = videoLinks.length > 0;

        if (itemsList.length === 0) return [];

        return itemsList.map((itemUrl, index) => {
            const videoId = isVideo ? extractYouTubeID(itemUrl) : null;
            
            return {
                id: `lesson-${index + 1}`,
                title: `Lesson ${index + 1}`,
                type: isVideo ? "video" : "pdf",
                videoId: videoId,
                url: itemUrl,
                isCompleted: false 
            };
        });
    }, [course]);

    // Manage active lesson state when modal opens/closes
    useEffect(() => {
        if (isOpen && lessons.length > 0) {
            setActiveLesson(lessons[0]);
        } else if (!isOpen) {
            setActiveLesson(null);
        }
    }, [isOpen, lessons]);

    if (!isOpen || !course) return null;

    const progressPercent = course.progressDetails?.CompletionPercentage || 0;

    return (
        <div className="fixed inset-0 z-[300] bg-white dark:bg-[#050505] flex flex-col animate-in fade-in duration-300">
            
            {/* Top Navigation Bar */}
            <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] flex items-center justify-between px-4 md:px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onClose}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h2 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white line-clamp-1">
                        {course.Title}
                    </h2>
                </div>
                
                {/* Progress Bar (Hidden on very small screens) */}
                <div className="hidden md:flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {progressPercent}% Completed
                    </span>
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-600 dark:bg-purple-500 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
                
                {/* Left Side: Video/PDF Player Area */}
                <div className="flex-1 flex flex-col bg-black overflow-y-auto scrollbar-hide transition-all duration-300">
                    {activeLesson ? (
                        <div className="w-full aspect-video bg-black shrink-0 relative">
                            {activeLesson.type === "video" ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${activeLesson.videoId}?autoplay=1&rel=0`}
                                    title={activeLesson.title}
                                    className="w-full h-full absolute inset-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
                                    <FileText className="w-16 h-16 text-blue-400 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Reading Material</h3>
                                    <a 
                                        href={activeLesson.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-colors mt-4 shadow-lg"
                                    >
                                        Open Document
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full aspect-video flex items-center justify-center bg-gray-900 text-gray-400 font-medium">
                            Loading lesson...
                        </div>
                    )}
                    
                    {/* Lesson Description Area */}
                    <div className="p-6 md:p-8 bg-white dark:bg-[#050505] flex-1">
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">
                            {activeLesson ? activeLesson.title : "Course Overview"}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                            {course.Description || "Pay close attention to the concepts covered in this module. Take notes and ensure you understand the fundamentals."}
                        </p>
                    </div>
                </div>

                {/* Right Side: Collapsible Sidebar */}
                <div 
                    className={`bg-[#FAFAFA] dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-gray-800 flex flex-col shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
                        isSidebarOpen 
                            ? "w-full lg:w-[400px] xl:w-[450px] h-[50vh] lg:h-auto" 
                            : "w-full lg:w-[60px] h-14 lg:h-auto"
                    }`}
                >
                    {/* Sidebar Toggle Header */}
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="h-14 w-full flex items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-[#111] transition-colors cursor-pointer px-4 relative z-10"
                        title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        <div className="w-6 h-6 flex items-center justify-center shrink-0 text-gray-500 transition-transform duration-300">
                            {isSidebarOpen ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </div>
                        <h3 
                            className={`font-bold text-gray-900 dark:text-white whitespace-nowrap ml-3 transition-opacity duration-200 ${
                                isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none hidden lg:block"
                            }`}
                        >
                            Course Content
                        </h3>
                    </button>
                    
                    {/* Scrollable Sidebar Content */}
                    <div className={`flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin transition-opacity duration-300 flex flex-col ${
                        isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}>
                        <div className="p-4 space-y-4 w-full lg:w-[400px] xl:w-[450px] flex-1 flex flex-col">
                            
                            {/* Module List */}
                            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex-1">
                                <div className="p-4 bg-gray-50 dark:bg-[#0d0d0d] font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 text-sm">
                                    Module
                                </div>
                                <div>
                                    {lessons.map(lesson => {
                                        const isActive = activeLesson?.id === lesson.id;
                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => setActiveLesson(lesson)}
                                                className={`w-full flex items-center gap-3 p-3 text-left transition-colors border-b last:border-0 border-gray-100 dark:border-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-white/[0.04] ${
                                                    isActive ? "bg-blue-50 dark:bg-purple-500/10" : ""
                                                }`}
                                            >
                                                {/* Thumbnail Image */}
                                                <div className="shrink-0 w-24 h-14 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                                                    {lesson.type === "video" && lesson.videoId ? (
                                                        <img 
                                                            src={`https://img.youtube.com/vi/${lesson.videoId}/mqdefault.jpg`} 
                                                            alt="thumbnail" 
                                                            className="w-full h-full object-cover" 
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                                            <FileText className="w-5 h-5 text-blue-500" />
                                                        </div>
                                                    )}
                                                    
                                                    {/* Hover Play Icon */}
                                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                        <PlayCircle className="w-6 h-6 text-white shadow-sm" />
                                                    </div>
                                                </div>

                                                {/* Lesson Details */}
                                                <div className="flex flex-col flex-1 overflow-hidden">
                                                    <span className={`text-sm font-medium line-clamp-2 leading-tight ${isActive ? "text-blue-700 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"}`}>
                                                        {lesson.title}
                                                    </span>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <span className="text-[10px] uppercase font-bold text-gray-500">
                                                            {lesson.type === "video" ? "Video" : "Document"}
                                                        </span>
                                                        {lesson.isCompleted && <CheckCircle className="w-3.5 h-3.5 text-green-500" />}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Exam Section */}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 shrink-0">
                                {/* Optimized styling to fit inside the sidebar gracefully */}
                                <p className="text-gray-500 dark:text-gray-400 text-xs text-center font-medium mb-3">
                                    Pass with 80% or higher to earn your verified badge.
                                </p>
                                <button
                                    onClick={() => {
                                        onClose(); 
                                        navigate(`/exam?courseId=${course.ID || course.$id}`);
                                    }}
                                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <ClipboardList className="w-5 h-5" />
                                    Take Final Exam
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseViewer;