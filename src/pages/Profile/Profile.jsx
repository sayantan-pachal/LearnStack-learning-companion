/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { User, Mail, Phone, Edit2, Save, X, Loader2, ShieldCheck, Clock, GraduationCap, Landmark, Book, ChevronDown } from "lucide-react";
import { useToast } from "../../components/Other/ToastContext"; 
import { account } from "../../appwrite/config"; 
import CustomDropdown from "../../components/Other/CustomDropdown"; 

function Profile() {
    const showToast = useToast();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "", phone: "", college: "", year: "", department: ""
    });

    // Combobox specific state & ref
    const deptRef = useRef(null);
    const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

    // Predefined suggestions for the Department combobox
    const predefinedDepartments = [
        "Computer Science & Engineering",
        "Information Technology",
        "Electronics & Communication",
        "Mechanical Engineering"
    ];

    const yearOptions = [
        { label: "1st Year", value: "1" },
        { label: "2nd Year", value: "2" },
        { label: "3rd Year", value: "3" },
        { label: "4th Year", value: "4" }
    ];

    // Helper function to format the department name for display under the avatar
    const getDisplayDepartment = (dept) => {
        if (!dept) return "Student";
        
        const shortNames = {
            "Computer Science & Engineering": "CSE",
            "Information Technology": "IT",
            "Electronics & Communication": "ECE",
            "Mechanical Engineering": "ME"
        };

        // Return the short name if it matches exactly, otherwise return what they typed
        return shortNames[dept] || dept;
    };

    // Close the department dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (deptRef.current && !deptRef.current.contains(event.target)) {
                setDeptDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const sessionUser = await account.get();
                setUser(sessionUser);
                setFormData({
                    name: sessionUser.name || "",
                    phone: sessionUser.phone || "",
                    college: sessionUser.college || "",
                    year: sessionUser.year || "",
                    department: sessionUser.department || "",
                });
            } catch (error) {
                showToast("Please log in to view your profile.", "error");
            }
        };
        fetchUser();
    }, []);

    const handleSave = async () => {
        if (!formData.name.trim()) return showToast("Name cannot be empty ⚠️", "error");
        setLoading(true);
        try {
            await account.updateProfile(user.email, formData.name, formData.phone, formData.college, formData.year, formData.department);
            setUser({ ...user, ...formData });
            showToast("Profile updated successfully! 🎉", "success");
            setIsEditing(false);
        } catch (error) {
            showToast(error.message || "Failed to update profile", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center dark:bg-[#0a0a0a]"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>;

    const inputBase = "w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed";

    return (
        <div className="pt-28 px-4 pb-24 min-h-screen font-dm text-[#111] dark:text-gray-100 dark:bg-[#0a0a0a] bg-[url('/bg-pattern.svg')] bg-fixed bg-cover">
            <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
                
                <div className="mb-10 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">Profile</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="p-8 rounded-[2rem] bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl shadow-xl border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 p-1 mb-4 shadow-lg shadow-blue-500/20">
                                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=dbeafe&color=1e3a8a&bold=true`} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-900"/>
                            </div>
                            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                            <p className="text-sm text-blue-600 dark:text-purple-400 font-semibold mb-6 flex items-center justify-center gap-1 text-center px-2">
                                <GraduationCap size={16} className="shrink-0" /> 
                                {/* Applied the mapping function right here! */}
                                <span className="uppercase">{getDisplayDepartment(user.department)}</span>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center justify-center gap-1">
                                <ShieldCheck size={16} className="text-green-500" /> Student Account
                            </p>

                            <div className="w-full pt-6 border-t border-black/10 dark:border-white/10 flex flex-col gap-3 text-sm">
                                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-2"><Clock size={16} /> Joined</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-200">{user.joinDate}</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Powered by Spachal</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="p-8 rounded-[2rem] bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl shadow-xl border border-black/5 dark:border-white/5">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold">Account Details</h3>
                                {!isEditing ? (
                                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-purple-400 hover:opacity-80 transition-opacity bg-blue-50 dark:bg-purple-500/10 px-4 py-2 rounded-full"><Edit2 size={16} /> Edit Profile</button>
                                ) : (
                                    <button onClick={() => { setIsEditing(false); setFormData({ name: user.name, phone: user.phone, college: user.college, year: user.year, department: user.department }); setDeptDropdownOpen(false); }} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 px-4 py-2"><X size={16} /> Cancel</button>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input type="text" disabled={!isEditing} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputBase} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input type="tel" disabled={!isEditing} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputBase} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">College / Institution</label>
                                    <div className="relative">
                                        <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input type="text" disabled={!isEditing} value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} placeholder="e.g., B. P. Poddar Institute of Management and Technology" className={inputBase} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Department Combobox (Input + Dropdown) */}
                                    <div className="mt-1" ref={deptRef}>
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Department</label>
                                        <div className="relative">
                                            <Book className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                                            <input 
                                                type="text" 
                                                disabled={!isEditing} 
                                                value={formData.department} 
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })} 
                                                onFocus={() => isEditing && setDeptDropdownOpen(true)}
                                                placeholder="Select or type..." 
                                                className={`${inputBase} pr-10`} 
                                            />
                                            {/* Dropdown Chevron Button */}
                                            {isEditing && (
                                                <button 
                                                    type="button"
                                                    onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                                >
                                                    <ChevronDown size={16} className={`transition-transform duration-300 ${deptDropdownOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                            )}

                                            {/* Dropdown Options List */}
                                            {deptDropdownOpen && isEditing && (
                                                <div className="absolute z-50 mt-2 w-full animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-1.5 shadow-xl max-h-48 overflow-y-auto">
                                                    {predefinedDepartments.map((dept, idx) => (
                                                        <button
                                                            key={idx}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData({ ...formData, department: dept });
                                                                setDeptDropdownOpen(false);
                                                            }}
                                                            className={`flex w-full items-center justify-start rounded-xl px-3 py-2.5 text-sm transition-colors text-left ${
                                                                formData.department === dept
                                                                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                                                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'
                                                            }`}
                                                        >
                                                            {dept}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Year Dropdown using CustomDropdown */}
                                    <div className="mt-1">
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Current Year</label>
                                        <CustomDropdown 
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            options={yearOptions}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="pt-4">
                                        <button onClick={handleSave} disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg disabled:opacity-70 transition-all">
                                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Save size={20} /> Save Changes</>}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;