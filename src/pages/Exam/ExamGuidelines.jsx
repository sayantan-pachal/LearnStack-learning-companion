import React from "react";
import { ShieldCheck, Clock, ClipboardX, Award, PlayCircle } from "lucide-react";

const ExamGuidelines = ({ courseTitle, questionsCount, onStart, onClose }) => {
    return (
        <div className="fixed inset-0 z-[500] bg-gray-50 dark:bg-[#050505] flex items-center justify-center font-dm animate-in fade-in duration-300 p-4">
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 sm:p-12 max-w-2xl w-full shadow-2xl">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Exam Guidelines</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">{courseTitle} Final Exam</p>
                    </div>
                </div>

                <div className="space-y-6 mb-10">
                    <div className="flex gap-4 items-start">
                        <Clock className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Time Limit: {questionsCount} Minutes</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">You have exactly 1 minute per question. The exam will automatically submit when the timer reaches zero.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <ClipboardX className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Anti-Cheating Enabled</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Text selection, copying, and right-clicking are strictly disabled in this environment.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <Award className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Passing Criteria</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">You must score 80% or higher to earn your verified certification badge.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <button onClick={onClose} className="px-6 py-4 flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-all">
                        Cancel
                    </button>
                    <button 
                        onClick={onStart} 
                        className="px-6 py-4 flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        <PlayCircle className="w-5 h-5" /> Start Exam Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamGuidelines;