import React, { useEffect } from "react";
import { Award, XCircle } from "lucide-react";

const ExamResult = ({ passed, score, onClose, onRetake, onViewBadge }) => {
    
    // Generate native floating pieces of paper when passed
    useEffect(() => {
        if (!passed) return;

        const container = document.getElementById("confetti-container");
        if (!container) return;

        const colors = ["#4f46e5", "#10b981", "#f59e0b", "#ec4899", "#3b82f6"];
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "absolute bottom-0 w-3 h-4 rounded-sm opacity-90 animate-shoot-up";
            
            // Random horizontal positioning, colors, and flight angles
            const randomX = Math.random() * window.innerWidth;
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomDuration = 1.5 + Math.random() * 2; // Between 1.5s and 3.5s
            const randomDelay = Math.random() * 0.5;

            particle.style.left = `${randomX}px`;
            particle.style.backgroundColor = randomColor;
            particle.style.animationDuration = `${randomDuration}s`;
            particle.style.animationDelay = `${randomDelay}s`;

            container.appendChild(particle);

            // Clean up DOM elements after animation finishes
            setTimeout(() => {
                particle.remove();
            }, (randomDuration + randomDelay) * 1000);
        }
    }, [passed]);

    return (
        <div id="confetti-container" className="fixed inset-0 z-[500] bg-gray-50 dark:bg-[#050505] flex items-center justify-center font-dm animate-in zoom-in-95 duration-300 p-4 overflow-hidden pointer-events-none">
            
            {/* Embedded styles for the paper shooting effect */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes shootUp {
                    0% {
                        transform: translateY(20vh) rotate(0deg) scale(0.5);
                        opacity: 1;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-80vh) rotate(720deg) scale(1);
                        opacity: 0;
                    }
                }
                .animate-shoot-up {
                    animation: shootUp ease-out forwards;
                }
            `}} />

            {/* Main Result Card (Pointer-events enabled so buttons are clickable) */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-8 md:p-16 max-w-2xl w-full text-center shadow-2xl relative z-10 pointer-events-auto">
                {passed ? (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-bounce">
                        <Award className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                        <XCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                )}
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
                    {passed ? "Congratulations!" : "Keep Trying!"}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                    You scored <span className={`font-black text-xl sm:text-2xl ${passed ? "text-green-500" : "text-red-500"}`}>{score}%</span>
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                    {passed ? (
                        <button onClick={onViewBadge} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 text-sm sm:text-base">
                            View My Badge
                        </button>
                    ) : (
                        <button onClick={onRetake} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 text-sm sm:text-base">
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