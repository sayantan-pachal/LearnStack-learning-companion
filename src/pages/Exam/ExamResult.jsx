import React from "react";
import { XCircle } from "lucide-react";

const ExamResult = ({ passed, score, onClose, onRetake, onViewBadge }) => {
    
    return (
        <div className="fixed inset-0 z-[500] bg-gray-50 dark:bg-[#050505] flex items-center justify-center font-dm animate-in zoom-in-95 duration-300 p-4 overflow-hidden">
            
            {/* ✨ Background Confetti SVG (Rendered only if passed) */}
            {passed && (
                <img 
                    src="/Svg/Confetti.svg" 
                    alt="Confetti Background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none z-0 animate-in fade-in duration-700"
                />
            )}

            {/* Main Result Card */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-6 md:p-10 max-w-2xl w-full text-center shadow-2xl relative z-10 pointer-events-auto">
                
                {passed ? (
                    /* ✨ Replaced Award Icon with Successful Target SVG */
                    <img 
                        src="/Svg/Successful target.svg" 
                        alt="Successful Target" 
                        className="w-32 h-32 sm:w-80 sm:h-80 mx-auto mb-2 sm:mb-4 object-contain drop-shadow-xl"
                    />
                ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-inner">
                        <XCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                )}
                
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {passed ? "Congratulations!" : "Keep Trying!"}
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-2 sm:mb-4">
                    {/* ✨ Updated text gradient to use theme-blue and theme-pink */}
                    You scored <span className={`font-black text-xl sm:text-2xl ${passed ? "text-transparent bg-clip-text bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-700 dark:to-theme-pink-500" : "text-red-500"}`}>{score}%</span>
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                    {passed ? (
                        <button onClick={onViewBadge} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-700 dark:to-theme-pink-500 hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 text-sm sm:text-base">
                            View My Badge
                        </button>
                    ) : (
                        <button onClick={onRetake} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-theme-blue-600 hover:bg-theme-blue-700 dark:bg-theme-blue-700 dark:hover:bg-theme-blue-600 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 text-sm sm:text-base">
                            Retake Exam
                        </button>
                    )}
                    <button onClick={onClose} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-all text-sm sm:text-base">
                        Exit
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default ExamResult;