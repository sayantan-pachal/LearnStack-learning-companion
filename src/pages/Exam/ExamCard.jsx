import React from "react";
import { Lock, Unlock, Award, ClipboardList } from "lucide-react";

const ExamCard = ({ course, progress, onStartExam, navigate }) => {
    const isEnrolled = !!progress;
    const hasPassed = progress?.Badge === "Y" || progress?.Badge === "C";

    return (
        <div className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col ${
            isEnrolled 
            ? "bg-white dark:bg-[#111] border-indigo-100 dark:border-indigo-900/30 shadow-md hover:shadow-xl hover:-translate-y-1" 
            : "bg-gray-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-gray-800 opacity-75 grayscale-[0.5]"
        }`}>
            
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${isEnrolled ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600" : "bg-gray-200 dark:bg-gray-800 text-gray-500"}`}>
                    <ClipboardList className="w-6 h-6" />
                </div>
                {hasPassed ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                        <Award className="w-3.5 h-3.5" /> Passed
                    </span>
                ) : isEnrolled ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                        <Unlock className="w-3.5 h-3.5" /> Unlocked
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
                        <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {course.Title} Final Exam
            </h3>
            
            <div className="mt-auto pt-6">
                {hasPassed ? (
                    <button 
                        onClick={() => navigate("/achievements")}
                        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
                    >
                        View Certificate
                    </button>
                ) : isEnrolled ? (
                    <button 
                        onClick={() => onStartExam(course, progress)}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-lg hover:shadow-indigo-500/30"
                    >
                        Start Exam
                    </button>
                ) : (
                    <button 
                        onClick={() => navigate("/courses")}
                        className="w-full py-3 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl font-bold transition-colors hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                        Enroll to Unlock
                    </button>
                )}
            </div>
        </div>
    );
};

export default ExamCard;