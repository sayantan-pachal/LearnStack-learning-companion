/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Compass, Book, Target, CheckCircle2, Filter } from "lucide-react";
import { account } from "../../appwrite/config";
import CustomDropdown from "../../components/Other/CustomDropdown";

export default function LearningPaths() {
    const [selectedDept, setSelectedDept] = useState("Computer Science");
    const [selectedSemester, setSelectedSemester] = useState("Semester 4");

    // Auto-fill from profile if available
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await account.get();
                if (user.department) setSelectedDept(user.department);
                if (user.year) setSelectedSemester(`Semester ${parseInt(user.year) * 2}`); // Defaults to even sem of their year
            } catch (err) { }
        };
        fetchUser();
    }, []);

    // Configuration arrays for CustomDropdown
    const departmentOptions = [
        { label: "Computer Science & Engineering", value: "Computer Science" },
        { label: "Information Technology", value: "Information Technology" },
        { label: "Electronics & Communication", value: "Electronics" }
    ];

    const semesterOptions = [
        { label: "1st Year, 1st Semester", value: "Semester 1" },
        { label: "1st Year, 2nd Semester", value: "Semester 2" },
        { label: "2nd Year, 3rd Semester", value: "Semester 3" },
        { label: "2nd Year, 4th Semester", value: "Semester 4" },
        { label: "3rd Year, 5th Semester", value: "Semester 5" },
        { label: "3rd Year, 6th Semester", value: "Semester 6" }
    ];

    // Mock Roadmap Data - This will change dynamically based on the dropdowns
    const roadmaps = {
        "Computer Science": {
            "Semester 4": [
                { month: "Month 1", title: "Data Structures Mastery", desc: "Advanced Trees, Graphs, and Dynamic Programming.", skills: ["C++", "Java"] },
                { month: "Month 2", title: "Algorithm Design", desc: "Greedy algorithms, Divide & Conquer, and time complexity.", skills: ["Problem Solving"] },
                { month: "Month 3", title: "Database Management", desc: "SQL queries, Normalization, and ACID properties.", skills: ["SQL", "Relational Algebra"] },
                { month: "Month 4", title: "Operating Systems Core", desc: "Process scheduling, Deadlocks, and Memory management.", skills: ["OS Concepts"] },
                { month: "Month 5", title: "Frontend Frameworks", desc: "Component architecture, hooks, and state management.", skills: ["React", "JavaScript"] },
                { month: "Month 6", title: "Capstone Project", desc: "Build a full-stack application integrating DB and Frontend.", skills: ["Git", "Tailwind CSS"] },
            ]
        }
    };

    // Fallback if combination doesn't exist in mock data yet
    const currentPath = roadmaps[selectedDept]?.[selectedSemester] || [
        { month: "Months 1-6", title: "Path Incoming", desc: "We are currently curating the perfect roadmap for this semester.", skills: ["Coming Soon"] }
    ];

    return (
        <div className="pt-28 px-4 pb-24 min-h-screen dark:bg-[#0a0a0a] font-dm text-[#111] dark:text-gray-100">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Learning <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">Paths</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A structured 6-month roadmap curated for your exact degree and semester.
                    </p>
                </div>

                {/* Filters Box */}
                <div className="relative z-40 bg-white/60 dark:bg-gray-900/60 border border-black/10 dark:border-white/10 rounded-3xl p-6 mb-12 shadow-lg backdrop-blur-sm flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center gap-3 text-gray-500 w-full md:w-auto md:min-w-max pb-2 md:pb-0">
                        <Filter size={20} />
                        <span className="font-bold">Customize Path:</span>
                    </div>

                    <div className="flex-1 w-full relative z-20">
                        <CustomDropdown 
                            value={selectedDept}
                            options={departmentOptions}
                            onChange={(e) => setSelectedDept(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 w-full relative z-10">
                        <CustomDropdown 
                            value={selectedSemester}
                            options={semesterOptions}
                            onChange={(e) => setSelectedSemester(e.target.value)}
                        />
                    </div>
                </div>

                {/* 6-Month Roadmap Timeline */}
                <div className="relative border-l-2 border-blue-200 dark:border-blue-900/50 ml-6 md:ml-8 pl-8 md:pl-12 space-y-12">
                    {currentPath.map((step, idx) => (
                        <div key={idx} className="relative group">
                            {/* Timeline dot */}
                            <div className="absolute -left-[45px] md:-left-[61px] top-1 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 border-4 border-blue-500 dark:border-blue-400 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Content Card */}
                            <div className="bg-white/80 dark:bg-gray-800/80 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                                <span className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 block">
                                    {step.month}
                                </span>
                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">{step.desc}</p>

                                <div className="flex flex-wrap gap-2">
                                    {step.skills.map((skill, sIdx) => (
                                        <span key={sIdx} className="px-3 py-1 text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-lg">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}