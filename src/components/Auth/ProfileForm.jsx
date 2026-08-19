import React, { useState, useRef, useEffect } from "react";
import { 
    GraduationCap, BookOpen, ChevronDown, 
    Github, Linkedin, Link as LinkIcon, Loader2, ArrowRight , ArrowUpRight
} from "lucide-react";
import CustomDropdown from "../Other/CustomDropdown";

export default function ProfileForm({ onSubmit, loading, initialData = {} }) {
    // Academic State
    const [college, setCollege] = useState(initialData.college || "");
    const [year, setYear] = useState(initialData.year || "");
    const [department, setDepartment] = useState(initialData.department || "");
    
    // Professional State
    const [github, setGithub] = useState(initialData.github || "");
    const [linkedin, setLinkedin] = useState(initialData.linkedin || "");
    const [portfolio, setPortfolio] = useState(initialData.portfolio || "");

    // Account Toggle State
    const [noGithub, setNoGithub] = useState(false);
    const [noLinkedin, setNoLinkedin] = useState(false);

    const deptRef = useRef(null);
    const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

    const predefinedDepartments = [
        "Computer Science & Engineering",
        "Information Technology",
        "Electronics & Communication",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering"
    ];

    const yearOptions = [
        { label: "1st Year", value: "1" },
        { label: "2nd Year", value: "2" },
        { label: "3rd Year", value: "3" },
        { label: "4th Year", value: "4" }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (deptRef.current && !deptRef.current.contains(event.target)) {
                setDeptDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ 
            college, 
            year, 
            department, 
            github: noGithub ? "" : github, 
            linkedin: noLinkedin ? "" : linkedin, 
            portfolio 
        });
    };

    const inputBase = "w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-theme-blue-500 dark:focus:ring-theme-pink-500 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-400 dark:text-white";

    return (
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            
            {/* --- ACADEMIC DETAILS --- */}
            <div className="space-y-2">
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">
                        College / University <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" required placeholder="e.g. IIT Madras..." value={college} onChange={(e) => setCollege(e.target.value)} className={inputBase} />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col justify-end">
                        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">
                            Current Year <span className="text-red-500">*</span>
                        </label>
                        <CustomDropdown value={year} onChange={(e) => setYear(e.target.value)} options={yearOptions} />
                    </div>

                    <div className="flex flex-col justify-end" ref={deptRef}>
                        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">
                            Department <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                            <input 
                                type="text" required placeholder="e.g. CSE" 
                                value={department} onChange={(e) => setDepartment(e.target.value)} 
                                onFocus={() => setDeptDropdownOpen(true)}
                                className={`${inputBase} pr-8`} 
                            />
                            <button 
                                type="button" onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <ChevronDown size={14} className={`transition-transform duration-300 ${deptDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {deptDropdownOpen && (
                                <div className="absolute z-50 mt-1 w-full animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-1.5 shadow-xl max-h-48 overflow-y-auto scrollbar-hide">
                                    {predefinedDepartments.map((dept, idx) => (
                                        <button
                                            key={idx} type="button"
                                            onClick={() => { setDepartment(dept); setDeptDropdownOpen(false); }}
                                            className={`flex w-full items-center justify-start rounded-xl px-3 py-2.5 text-xs transition-colors text-left ${
                                                department === dept ? 'bg-theme-blue-50 text-theme-blue-600 dark:bg-theme-blue-500/10 dark:text-theme-blue-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'
                                            }`}
                                        >
                                            {dept}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PROFESSIONAL LINKS --- */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                
                {/* GitHub */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                            GitHub {!noGithub && <span className="text-red-500">*</span>}
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={noGithub}
                                onChange={(e) => {
                                    setNoGithub(e.target.checked);
                                    if(e.target.checked) setGithub("");
                                }}
                                className="w-3 h-3 rounded border-gray-300 dark:border-gray-600 text-theme-blue-600 cursor-pointer focus:ring-theme-blue-500"
                            />
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                I don't have an account
                            </span>
                        </label>
                    </div>
                    {!noGithub ? (
                        <div className="relative animate-in fade-in zoom-in-95 duration-200">
                            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" required placeholder="github.com/username" value={github} onChange={(e) => setGithub(e.target.value)} className={inputBase} />
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-between pl-4 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-dashed border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Ready to start coding?</span>
                            <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors shadow-sm flex items-center gap-1">
                                Create GitHub Account <ArrowUpRight className="w-3 h-3" />
                            </a>
                        </div>
                    )}
                </div>
                
                {/* LinkedIn */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                            LinkedIn {!noLinkedin && <span className="text-red-500">*</span>}
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={noLinkedin}
                                onChange={(e) => {
                                    setNoLinkedin(e.target.checked);
                                    if(e.target.checked) setLinkedin("");
                                }}
                                className="w-3 h-3 rounded border-gray-300 dark:border-gray-600 text-theme-blue-600 cursor-pointer focus:ring-theme-blue-500"
                            />
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                I don't have an account
                            </span>
                        </label>
                    </div>
                    {!noLinkedin ? (
                        <div className="relative animate-in fade-in zoom-in-95 duration-200">
                            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" required placeholder="linkedin.com/in/username" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className={inputBase} />
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-between pl-4 pr-3 py-2.5 rounded-xl bg-theme-blue-50 dark:bg-theme-blue-500/10 border border-dashed border-theme-blue-200 dark:border-theme-blue-500/30 animate-in fade-in zoom-in-95 duration-200">
                            <span className="text-xs font-medium text-theme-blue-700 dark:text-theme-blue-400">Build your network!</span>
                            <a href="https://www.linkedin.com/signup" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-white bg-theme-blue-600 hover:bg-theme-blue-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm flex items-center gap-1">
                                Create LinkedIn Account <ArrowUpRight className="w-3 h-3" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Portfolio Row (Stays purely optional) */}
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">
                        Portfolio / Website <span className="normal-case font-medium opacity-70">(Optional)</span>
                    </label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="url" placeholder="https://yourwebsite.com" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className={inputBase} />
                    </div>
                </div>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 mt-6 rounded-xl font-bold bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-700 dark:to-theme-pink-500 text-white shadow-lg active:scale-95 transition-all disabled:opacity-70 text-sm hover:opacity-90">
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Complete Setup <ArrowRight size={16} /></>}
            </button>
        </form>
    );
}