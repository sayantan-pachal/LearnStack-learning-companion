import React, { useState, useEffect } from "react";
import { Code2, ExternalLink, Flame, Timer, Loader2 } from "lucide-react";

// Fallback list in case the live LeetCode API fails or is blocked
const fallbackChallenges = [
    { id: 1, title: "Two Sum", difficulty: "Easy", color: "text-emerald-500", bg: "bg-emerald-500/10", time: "15 mins", link: "https://leetcode.com/problems/two-sum/" },
    { id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", color: "text-amber-500", bg: "bg-amber-500/10", time: "30 mins", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { id: 3, title: "Merge k Sorted Lists", difficulty: "Hard", color: "text-red-500", bg: "bg-red-500/10", time: "45 mins", link: "https://leetcode.com/problems/merge-k-sorted-lists/" }
];

export default function DailyChallenge() {
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLiveDailyChallenge = async () => {
            try {
                // Fetching the ACTUAL daily problem from a public LeetCode API wrapper
                const response = await fetch("https://alfa-leetcode-api.onrender.com/daily");

                if (!response.ok) throw new Error("Live API failed");

                const data = await response.json();

                // Map Leetcode difficulty to your UI colors
                let color = "text-emerald-500";
                let bg = "bg-emerald-500/10";
                let time = "15 mins";

                if (data.difficulty === "Medium") {
                    color = "text-amber-500";
                    bg = "bg-amber-500/10";
                    time = "30 mins";
                } else if (data.difficulty === "Hard") {
                    color = "text-red-500";
                    bg = "bg-red-500/10";
                    time = "45 mins";
                }

                // Set the live challenge
                setChallenge({
                    title: data.questionTitle,
                    difficulty: data.difficulty,
                    link: `${data.questionLink}`,
                    color,
                    bg,
                    time
                });

            } catch (error) {
                console.warn("Could not fetch live LeetCode daily, using fallback list.", error);

                // Fallback: Pick a consistent offline problem based on the day of the year
                const now = new Date();
                const start = new Date(now.getFullYear(), 0, 0);
                const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));
                setChallenge(fallbackChallenges[dayOfYear % fallbackChallenges.length]);
            } finally {
                setLoading(false);
            }
        };

        fetchLiveDailyChallenge();
    }, []);

    return (
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[1.25rem] sm:rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden group">

            {/* Decorative LeetCode-style orange glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center">
                        <Code2 className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-sm sm:text-base">Daily Challenge</h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded">
                    <Flame className="w-3 h-3" /> Live
                </div>
            </div>

            <div className="relative z-10 min-h-[100px] flex flex-col justify-center">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-4 opacity-50">
                        <Loader2 className="w-6 h-6 animate-spin text-orange-500 mb-2" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Fetching LeetCode...</span>
                    </div>
                ) : (
                    <>
                        <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg leading-snug mb-3 line-clamp-2">
                            {challenge.title}
                        </h4>

                        <div className="flex items-center gap-3 mb-5">
                            <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded ${challenge.bg} ${challenge.color}`}>
                                {challenge.difficulty}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-gray-500">
                                <Timer className="w-3 h-3" /> ~{challenge.time}
                            </span>
                        </div>

                        <a
                            href={challenge.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2.5 sm:py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            Solve on LeetCode <ExternalLink className="w-4 h-4" />
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}