import React, { useState, useEffect } from "react";
import { X, PlayCircle, FileText, CheckCircle2, Lock } from "lucide-react";

const CourseModal = ({ isOpen, onClose, course }) => {
    const [activeLesson, setActiveLesson] = useState(null);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Set the first lesson as active by default (Mocking a module structure)
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveLesson({
                id: 1,
                title: course?.Title || "Main Course Content",
                type: course?.YouTube_ID ? "video" : "pdf",
                url: course?.YouTube_ID || course?.Resource_Link,
            });
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen, course]);

    if (!isOpen || !course) return null;

    // Mocking a module list. In the future, this can be fetched from your database based on the course ID.
    const modules = [
        {
            title: "Module 1: Introduction",
            lessons: [
                { id: 1, title: course.Title, type: course.YouTube_ID ? "video" : "pdf", url: course.YouTube_ID || course.Resource_Link, completed: true },
                { id: 2, title: "Prerequisites & Setup", type: "pdf", url: "#", completed: false },
            ]
        },
        {
            title: "Module 2: Core Concepts",
            lessons: [
                { id: 3, title: "Deep Dive into Theory", type: "video", url: "dummy", locked: true },
                { id: 4, title: "Practical Application", type: "video", url: "dummy", locked: true },
            ]
        }
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-6xl h-[85vh] bg-white dark:bg-[#0a0a0a] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-800">

                {/* Close Button (Mobile Absolute, Desktop handled in header) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 md:hidden p-2 bg-gray-900/50 text-white rounded-full backdrop-blur"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Sidebar: Modules & Syllabus */}
                <div className="w-full md:w-80 h-1/3 md:h-full border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 flex flex-col bg-gray-50 dark:bg-[#050505]">
                    <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]">
                        <h2 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{course.Title}</h2>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mt-1">{course.Department} • Sem {course.Semester}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
                        {modules.map((mod, i) => (
                            <div key={i}>
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                                    {mod.title}
                                </h3>
                                <div className="space-y-1">
                                    {mod.lessons.map(lesson => (
                                        <button
                                            key={lesson.id}
                                            disabled={lesson.locked}
                                            onClick={() => setActiveLesson(lesson)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${activeLesson?.id === lesson.id
                                                    ? "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 font-medium"
                                                    : "hover:bg-gray-200 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                                                } ${lesson.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            {lesson.locked ? (
                                                <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                                            ) : lesson.type === "video" ? (
                                                <PlayCircle className={`w-4 h-4 shrink-0 ${activeLesson?.id === lesson.id ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`} />
                                            ) : (
                                                <FileText className={`w-4 h-4 shrink-0 ${activeLesson?.id === lesson.id ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`} />
                                            )}

                                            <span className="text-sm line-clamp-2 flex-1">{lesson.title}</span>

                                            {lesson.completed && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Content: Video / PDF Viewer */}
                <div className="flex-1 h-2/3 md:h-full bg-black relative flex flex-col">
                    {/* Desktop Header */}
                    <div className="hidden md:flex justify-between items-center p-4 bg-gray-900 absolute top-0 w-full z-10">
                        <h3 className="text-white font-medium text-sm truncate pr-4">{activeLesson?.title}</h3>
                        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Viewer */}
                    <div className="flex-1 w-full h-full md:pt-14 bg-[#0a0a0a] flex items-center justify-center">
                        {activeLesson?.type === "video" ? (
                            <iframe
                                className="w-full h-full max-h-full"
                                src={`https://www.youtube.com/embed/${activeLesson.url}?autoplay=1`}
                                title={activeLesson.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <iframe
                                className="w-full h-full bg-white"
                                src={activeLesson?.url}
                                title={activeLesson?.title}
                            ></iframe>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseModal;