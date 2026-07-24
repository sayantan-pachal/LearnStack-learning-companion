import React from 'react';

export default function Loader() {
    return (
        <div className="w-full h-full min-h-[100vh] flex flex-col items-center justify-center bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-md transition-all duration-300">

            {/* Custom CSS Animations injected locally */}
            <style>
                {`
                    @keyframes speed-line {
                        0% { transform: translateX(100%); opacity: 0; }
                        15% { opacity: 1; }
                        85% { opacity: 1; }
                        100% { transform: translateX(-100%); opacity: 0; }
                    }
                    .speed-line-1 { animation: speed-line 0.6s linear infinite; }
                    .speed-line-2 { animation: speed-line 0.8s linear infinite 0.2s; }
                    .speed-line-3 { animation: speed-line 0.5s linear infinite 0.4s; }
                    .speed-line-4 { animation: speed-line 0.7s linear infinite 0.1s; }
                `}
            </style>

            {/* Animation Stage */}
            <div className="relative w-72 h-40 flex items-center justify-center overflow-hidden rounded-3xl">

                {/* Speed Lines */}
                <div className="absolute top-8 left-0 w-full h-[2px] bg-blue-500/40 rounded-full speed-line-1" />
                <div className="absolute top-14 left-0 w-full h-[3px] bg-indigo-500/60 rounded-full speed-line-2" />
                <div className="absolute bottom-16 left-0 w-full h-[2px] bg-purple-500/40 rounded-full speed-line-3" />
                <div className="absolute bottom-8 left-0 w-full h-[1px] bg-pink-500/50 rounded-full speed-line-4" />

                {/* 
                    The Runner
                    Added dark:invert so the black SVG becomes white in dark mode 
                */}
                <img
                    src="/loader1.svg"
                    alt="Loading..."
                    className="w-40 h-40 dark:invert"
                />
                <img
                    src="/loader2.svg"
                    alt="Loading..."
                    className="w-40 h-40  drop-shadow-md"
                />

                {/* The Glowing Ground/Track */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm rounded-full" />
            </div>

            {/* Loading Typography */}
            <div className="mt-6 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 animate-pulse">
                <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-purple-500">
                    Loading
                </h3>
                    <span className="flex space-x-1 mt-4">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                    Getting things ready for you
                </p>
            </div>

        </div>
    );
}