/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useMemo, useEffect } from "react";
import { X, PlayCircle, CheckCircle, FileText, Menu } from "lucide-react";

// Simple parser to extract just the YouTube Video ID
const extractYouTubeID = (url) => {
    const cleanUrl = String(url).trim();
    const match = cleanUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return (match && match[2].length === 11) ? match[2] : cleanUrl; // Fallback to raw ID if regex fails
};

const CourseViewer = ({ isOpen, onClose, course }) => {
    const [activeLesson, setActiveLesson] = useState(null);

    // Prevent background scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    // Build the modules list based on the current course
    const modules = useMemo(() => {
        if (!course) return [];

        const videoLinks = course.YouTube_ID ? course.YouTube_ID.split(',').map(id => id.trim()).filter(Boolean) : [];
        const resourceLinks = course.Resource_Link ? course.Resource_Link.split(',').map(link => link.trim()).filter(Boolean) : [];

        const itemsList = videoLinks.length > 0 ? videoLinks : resourceLinks;
        const isVideo = videoLinks.length > 0;

        if (itemsList.length === 0) return [];

        const lessonsPerModule = 5;
        const generatedModules = [];
        let lessonCounter = 1;

        for (let i = 0; i < itemsList.length; i += lessonsPerModule) {
            const chunk = itemsList.slice(i, i + lessonsPerModule);
            const moduleNumber = Math.floor(i / lessonsPerModule) + 1;

            const lessons = chunk.map((itemUrl) => {
                const videoId = isVideo ? extractYouTubeID(itemUrl) : null;
                
                return {
                    id: `lesson-${lessonCounter}`,
                    title: `Lesson ${lessonCounter}`,
                    type: isVideo ? "video" : "pdf",
                    videoId: videoId,
                    url: itemUrl,
                    isCompleted: false 
                };
            });
            
            lessonCounter += chunk.length;

            generatedModules.push({
                title: `Module ${moduleNumber}`,
                lessons: lessons
            });
        }

        return generatedModules;
    }, [course]);

    // THE FIX: Reset activeLesson when the course changes or modal opens/closes
    useEffect(() => {
        if (isOpen && modules.length > 0) {
            // Always set to the first lesson of the current course's modules
            setActiveLesson(modules[0].lessons[0]);
        }
        
        // When the modal closes, wipe the state clean
        if (!isOpen) {
            setActiveLesson(null);
        }
    }, [isOpen, course, modules]);

    if (!isOpen || !course) return null;

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
                <div className="hidden md:flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {course.progressDetails?.CompletionPercentage || 0}% Completed
                    </span>
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-600 dark:bg-purple-500 rounded-full transition-all"
                            style={{ width: `${course.progressDetails?.CompletionPercentage || 0}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
                
                {/* Left Side: Video Player Area */}
                <div className="flex-1 flex flex-col bg-black overflow-y-auto">
                    {activeLesson ? (
                        <div className="w-full aspect-video bg-black shrink-0 relative">
                            {activeLesson.type === "video" ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${activeLesson.videoId}?autoplay=1&rel=0`}
                                    title={activeLesson.title}
                                    className="w-full h-full absolute inset-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
                                    <FileText className="w-16 h-16 text-blue-400 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Reading Material</h3>
                                    <a 
                                        href={activeLesson.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-colors mt-4"
                                    >
                                        Open Document
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full aspect-video flex items-center justify-center bg-gray-900 text-gray-400">
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

                {/* Right Side: Syllabus / Module List */}
                <div className="w-full lg:w-[400px] xl:w-[450px] bg-[#FAFAFA] dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-gray-800 flex flex-col h-[50vh] lg:h-auto shrink-0 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] flex items-center gap-2">
                        <Menu className="w-5 h-5 text-gray-500" />
                        <h3 className="font-bold text-gray-900 dark:text-white">Course Content</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
                        {modules.map((mod, idx) => (
                            <div key={idx} className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
                                <div className="p-4 bg-gray-50 dark:bg-[#0d0d0d] font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 text-sm">
                                    {mod.title}
                                </div>
                                <div>
                                    {mod.lessons.map(lesson => {
                                        const isActive = activeLesson?.id === lesson.id;
                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => setActiveLesson(lesson)}
                                                className={`w-full flex items-center gap-3 p-3 text-left transition-colors border-b last:border-0 border-gray-100 dark:border-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-white/[0.04] ${
                                                    isActive ? "bg-blue-50 dark:bg-purple-500/10" : ""
                                                }`}
                                            >
                                                {/* Thumbnail Image Logic */}
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
                                                    
                                                    {/* Hover play icon overlay */}
                                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                        <PlayCircle className="w-6 h-6 text-white shadow-sm" />
                                                    </div>
                                                </div>

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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseViewer;