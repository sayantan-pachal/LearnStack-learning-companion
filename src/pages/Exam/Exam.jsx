import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/Other/Loader";
import { useToast } from "../../components/Other/ToastContext";
import { databases, DATABASE_ID, COURSES_COLLECTION_ID, PROGRESS_COLLECTION_ID } from "../../appwrite/config";
import ExamCard from "./ExamCard";
import ExamRunner from "./ExamRunner";

function Exams() {
    const [searchParams] = useSearchParams();
    const targetCourseId = searchParams.get("courseId");
    
    const navigate = useNavigate();
    const showToast = useToast();

    const [courses, setCourses] = useState([]);
    const [userProgress, setUserProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeExamCourse, setActiveExamCourse] = useState(null);
    const [activeProgressDoc, setActiveProgressDoc] = useState(null);

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                setLoading(true);
                const userStr = localStorage.getItem("learnstack_user");
                if (!userStr) return navigate("/login");

                // 1. Fetch all items from the collection
                const coursesRes = await databases.listDocuments(DATABASE_ID, COURSES_COLLECTION_ID);
                const allItems = coursesRes.documents || [];

                // 2. FILTER: Only keep items that are strictly courses
                const filteredCourses = allItems.filter(item => {
                    const itemType = String(item.Item_Type || "").trim().toLowerCase();
                    const itemId = String(item.ID || item.$id || "").trim().toUpperCase();
                    
                    // Keep if Item_Type is "course" OR ID starts with "CR"
                    return itemType === "course" || itemId.startsWith("CR");
                });

                setCourses(filteredCourses);

                // 3. Fetch user progress
                const progressRes = await databases.listDocuments(DATABASE_ID, PROGRESS_COLLECTION_ID);
                setUserProgress(progressRes.documents || []);

            } catch (error) {
                console.error("Error:", error);
                showToast("Failed to load exams.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchExamData();
    }, [navigate, showToast]);

    // Auto-open logic if redirected from CourseViewer
    useEffect(() => {
        if (!loading && targetCourseId && !activeExamCourse) {
            const courseToStart = courses.find(c => String(c.ID || c.$id) === String(targetCourseId));
            const progressDoc = userProgress.find(p => String(p.CourseId) === String(targetCourseId));
            
            if (courseToStart && progressDoc) {
                handleStartExam(courseToStart, progressDoc);
            } else if (courseToStart && !progressDoc) {
                showToast("You must enroll in this course to take the exam.", "error");
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, targetCourseId, courses, userProgress]);

    const handleStartExam = (course, progressDoc) => {
        if (progressDoc.Badge === "Y" || progressDoc.Badge === "C") {
            showToast("You have already passed this exam!", "success");
            return;
        }
        setActiveExamCourse(course);
        setActiveProgressDoc(progressDoc);
    };

    // Callback when user passes the exam to instantly update UI
    const handlePassSuccess = (passedCourseId) => {
        setUserProgress(prev => prev.map(p => 
            String(p.CourseId) === String(passedCourseId) ? { ...p, Badge: "Y" } : p
        ));
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center dark:bg-[#050505]"><Loader /></div>;
    }

    return (
        <>
            {/* The List View */}
            <div className="pt-28 px-4 pb-24 min-h-screen dark:bg-[#050505] font-dm">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
                            Certification <span className="text-indigo-600 dark:text-indigo-400">Exams</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                            Pass with 80% or higher to earn your verified badge. You must be enrolled in a course to unlock its exam.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(course => {
                            const courseId = String(course.ID || course.$id);
                            const progress = userProgress.find(p => String(p.CourseId) === courseId || String(p.courseId) === courseId);

                            return (
                                <ExamCard 
                                    key={courseId} 
                                    course={course} 
                                    progress={progress} 
                                    onStartExam={handleStartExam} 
                                    navigate={navigate} 
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* The Full-Screen Exam Runner overlay */}
            {activeExamCourse && (
                <ExamRunner 
                    course={activeExamCourse}
                    progressDoc={activeProgressDoc}
                    onClose={() => setActiveExamCourse(null)}
                    onPassSuccess={handlePassSuccess}
                />
            )}
        </>
    );
}

export default Exams;