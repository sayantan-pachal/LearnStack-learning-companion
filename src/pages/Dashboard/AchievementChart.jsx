import React from "react";
import { BarChart3, Trophy } from "lucide-react";

export default function AchievementChart({ chartData, maxChartValue, currentYear }) {
    
    // ✨ THE FIX: We force the chart to always have a minimum scale of 3.
    // This stops 1 certificate from stretching to the ceiling.
    const yMax = Math.max(maxChartValue, 3);
    
    // ✨ We dynamically calculate the lines so they don't get crowded if someone has 20 certs.
    // If yMax is 3, 4, 5, the step is 1 (Lines at 1, 2, 3...)
    const yStep = Math.max(1, Math.ceil(yMax / 5)); 

    const gridLines = [];
    for (let i = yStep; i <= yMax; i += yStep) {
        gridLines.push(i);
    }

    return (
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[1.5rem] sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-theme-blue-500/5 transition-shadow duration-500">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-theme-blue-500 shrink-0" /> 
                        <span className="truncate">Certifications Earned</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Your learning velocity in {currentYear}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-theme-blue-50 dark:bg-theme-blue-500/10 flex items-center justify-center shrink-0 ml-2">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-theme-blue-600 dark:text-theme-blue-400" />
                </div>
            </div>
            
            {/* Chart Area Wrapper */}
            <div className="flex flex-col h-48 sm:h-56 mt-6">
                
                {/* Graph + Grid Lines Area (Separated from text to make math perfect) */}
                <div className="flex-1 relative flex items-end gap-1 sm:gap-2 md:gap-4 border-b border-gray-200 dark:border-gray-800">
                    
                    {/* Perfectly Aligned Background Grid Lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
                        {gridLines.map(lineVal => (
                            <div 
                                key={lineVal} 
                                className="absolute w-full border-t border-dashed border-gray-400"
                                // Mathematically aligns the line exactly to the height percentage
                                style={{ bottom: `${(lineVal / yMax) * 100}%` }}
                            ></div>
                        ))}
                    </div>

                    {/* The Bars */}
                    {chartData.map((data, index) => (
                        <div key={index} className="flex-1 w-full relative flex items-end justify-center h-full z-10 group">
                            <div 
                                className="w-full max-w-[1.5rem] sm:max-w-[2.5rem] rounded-t-md sm:rounded-t-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-t group-hover:from-theme-blue-600 group-hover:to-theme-pink-500 transition-all duration-300 relative cursor-pointer" 
                                // The height percentage matches the grid lines flawlessly
                                style={{ height: `${(data.count / yMax) * 100}%`, minHeight: data.count > 0 ? '4px' : '0' }}
                            >
                                {data.count > 0 && (
                                    <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl transform group-hover:-translate-y-1 z-20">
                                        {data.count}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* X-Axis Labels (Fixed Height at Bottom) */}
                <div className="h-6 mt-3 flex gap-1 sm:gap-2 md:gap-4">
                    {chartData.map((data, index) => (
                        <div key={index} className="flex-1 flex justify-center items-center">
                            <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                                {data.month.substring(0, 1)}<span className="hidden sm:inline">{data.month.substring(1)}</span>
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}