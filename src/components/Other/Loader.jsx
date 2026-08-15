import React from 'react';

export default function Loader() {
    // Array map for speed lines to keep JSX clean and DRY
    const speedLines = [
        { id: 1, classes: "top-8 h-[2px] bg-blue-500/40", animation: "speed-line 0.6s linear infinite" },
        { id: 2, classes: "top-14 h-[3px] bg-indigo-500/60", animation: "speed-line 0.8s linear infinite 0.2s" },
        { id: 3, classes: "bottom-16 h-[2px] bg-purple-500/40", animation: "speed-line 0.5s linear infinite 0.4s" },
        { id: 4, classes: "bottom-8 h-[1px] bg-pink-500/50", animation: "speed-line 0.7s linear infinite 0.1s" },
    ];

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white/80 dark:bg-[#050505]/90 backdrop-blur-xl animate-in fade-in duration-500 z-50">

            {/* Custom CSS Animations */}
            <style>
                {`
                    @keyframes speed-line {
                        0% { transform: translateX(100%); opacity: 0; }
                        15% { opacity: 1; }
                        85% { opacity: 1; }
                        100% { transform: translateX(-100%); opacity: 0; }
                    }
                `}
            </style>

            {/* Animation Stage */}
            <div className="relative w-72 h-40 flex items-center justify-center overflow-hidden rounded-3xl">
                
                {/* Speed Lines Mapped */}
                {speedLines.map((line) => (
                    <div 
                        key={line.id}
                        className={`absolute left-0 w-full rounded-full ${line.classes}`}
                        style={{ animation: line.animation }}
                    />
                ))}

                {/* The Runner */}
                <img
                    src="/loader1.svg"
                    alt="Loading"
                    className="w-40 h-40 dark:invert relative z-10"
                />

                {/* The Glowing Ground/Track (Enhanced with pulse) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60 blur-[6px] rounded-full animate-pulse" />
            </div>

            {/* Loading Typography */}
            <div className="mt-8 flex flex-col items-center">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-400 dark:to-purple-500">
                        Loading...
                    </h3>
                    
                    {/* Bouncing Dots - Fixed Alignment */}
                    <div className="flex space-x-1.5 items-center mt-1">
                        <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
                
                <p className="mt-3 text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest animate-pulse">
                    Getting things ready for you
                </p>
            </div>

        </div>
    );
}