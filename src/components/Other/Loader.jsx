import React from 'react';

export default function Loader() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa]/80 dark:bg-[#050505]/90 backdrop-blur-xl animate-in fade-in duration-500 fixed inset-0 z-50">

            {/* Animation Stage */}
            <div className="relative w-64 h-64 flex flex-col items-center justify-center">
                
                {/* ================= NEW PREMIUM BACKGROUND ================= */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    
                    {/* Outer slow-spinning tech ring */}
                    <div className="absolute w-48 h-48 border-[1.5px] border-dashed border-gray-300 dark:border-gray-700 rounded-full animate-[spin_12s_linear_infinite] opacity-60" />
                    
                    {/* Inner counter-spinning ring */}
                    <div className="absolute w-36 h-36 border border-gray-200 dark:border-gray-800 rounded-full animate-[spin_8s_linear_infinite_reverse] opacity-40" />

                    {/* Ambient Breathing Glow (Blue to Pink) */}
                    <div className="absolute w-32 h-32 bg-gradient-to-tr from-theme-blue-500 to-theme-pink-500 rounded-full blur-[40px] opacity-30 dark:opacity-40 animate-pulse" />
                </div>
                {/* ========================================================= */}

                {/* The Runner (Your existing SVG) */}
                <img
                    src="/Svg/loader1.svg"
                    alt="Loading"
                    className="w-32 h-32 relative z-10 dark:invert drop-shadow-xl"
                />

                {/* Subtle Ground Shadow to anchor the runner */}
                <div className="w-20 h-1.5 bg-black/10 dark:bg-white/10 blur-[2px] rounded-[100%] mt-[-28px] relative z-10 animate-pulse" />
            </div>

            {/* Loading Typography */}
            <div className="mt-8 flex flex-col items-center relative z-10">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-500 dark:to-theme-pink-400">
                        Loading
                    </h3>
                    
                    {/* Bouncing Dots */}
                    <div className="flex space-x-1.5 items-center mt-1">
                        <div className="w-2 h-2 bg-theme-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-theme-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
                
                <p className="mt-3 text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest animate-pulse">
                    Preparing your workspace
                </p>
            </div>

        </div>
    );
}