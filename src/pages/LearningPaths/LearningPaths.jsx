/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Compass, Book, Target, CheckCircle2, Filter } from "lucide-react";
import { account, databases, DATABASE_ID, ROADMAPS_COLLECTION_ID } from "../../appwrite/config";
import CustomDropdown from "../../components/Other/CustomDropdown";
import Loader from "../../components/Other/Loader";
import { departmentOptions, semesterOptions } from "../../data/learningpaths";

export default function LearningPaths() {
    const [selectedDept, setSelectedDept] = useState("Computer Science");
    const [selectedSemester, setSelectedSemester] = useState("Semester 4");

    // New states for fetching data
    const [pathData, setPathData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user profile defaults & Smart Semester Calculation
    // Fetch user profile defaults & Smart Semester Calculation
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await account.get();

                // 1. Map the profile department string to the dropdown values
                if (user.department) {
                    const rawDept = user.department.toLowerCase();
                    if (rawDept.includes("computer")) setSelectedDept("Computer Science");
                    else if (rawDept.includes("information") || rawDept.includes("it")) setSelectedDept("Information Technology");
                    else if (rawDept.includes("electronic")) setSelectedDept("Electronics");
                    else setSelectedDept("Computer Science"); // Fallback
                }

                // 2. Smart Semester Calculation
                if (user.year) {
                    const currentMonth = new Date().getMonth(); // 0 = Jan, 11 = Dec
                    const yearNum = parseInt(user.year); // e.g., 2 (for 2nd Year)

                    // July to Dec (>= 6) = Odd Semesters. Jan to June (< 6) = Even Semesters.
                    const isOddSemester = currentMonth >= 6;
                    const calculatedSemester = isOddSemester ? (yearNum * 2 - 1) : (yearNum * 2);

                    setSelectedSemester(`Semester ${calculatedSemester}`);
                }
            } catch (err) {
                console.error("No user logged in or error fetching profile");
            }
        };
        fetchUser();
    }, []);

    // Fetch Database Info
    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                setLoading(true);
                const response = await databases.listDocuments(DATABASE_ID, ROADMAPS_COLLECTION_ID);
                setPathData(response.documents);
            } catch (error) {
                console.error("Failed to fetch roadmap data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmaps();
    }, []);

    

    // If data is loading, show your awesome custom full-page loader!
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-black">
                <Loader />
            </div>
        );
    }

    // Dynamically filter the fetched data based on dropdown selections
    const filteredPath = pathData.filter(
        (item) => item.department === selectedDept && item.semester === selectedSemester
    );

    // Fallback if combination doesn't exist or hasn't loaded yet
    const currentPath = filteredPath.length > 0 ? filteredPath : [
        { month: "Months 1-6", title: "Path Incoming", desc: "We are currently curating the perfect roadmap for this semester.", skills: "Coming Soon" }
    ];

    return (
        <div className="pt-28 px-4 pb-24 min-h-screen dark:bg-[#0a0a0a] font-dm text-[#111] dark:text-gray-100">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Learning <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">Paths</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Master your semester with a structured 6-month roadmap-3 months for academics and 3 months for building in-demand industry skills.
                    </p>
                </div>

                {/* Filters Box */}
                <div className="relative z-40 bg-white/60 dark:bg-gray-900/60 border border-black/10 dark:border-white/10 rounded-3xl p-4 mb-12 shadow-lg backdrop-blur-sm flex flex-col md:flex-row items-center gap-4">
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
                <div className="relative border-l-2 border-blue-200 dark:border-blue-900/50 ml-6 md:ml-8 pl-8 md:pl-12 space-y-12 min-h-[400px]">

                    {currentPath.map((step, idx) => {
                        // Handle skills whether they come as a comma-separated string from Sheets or an array
                        const skillsArray = typeof step.skills === 'string'
                            ? step.skills.split(',').map(s => s.trim())
                            : step.skills || [];

                        return (
                            <div key={idx} className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                                        {skillsArray.map((skill, sIdx) => (
                                            <span key={sIdx} className="px-3 py-1 text-xs font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-lg">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
}