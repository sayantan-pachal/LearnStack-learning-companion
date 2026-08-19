/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { 
    User, Mail, Phone, Edit2, Save, X, Loader2, ShieldCheck, 
    Clock, GraduationCap, Landmark, Book, ChevronDown, 
    Github, Linkedin, Globe, Award, CheckCircle2, ChevronRight
} from "lucide-react";
import { useToast } from "../../components/Other/ToastContext"; 
import { account, databases, DATABASE_ID, PROGRESS_COLLECTION_ID, COURSES_COLLECTION_ID } from "../../appwrite/config"; 
import CustomDropdown from "../../components/Other/CustomDropdown"; 
import Loader from "../../components/Other/Loader";

// ✨ IMPORTED: Certificate Modal so Profile can display them directly
import CertificateModal from "../Achievements/CertificateModal"; 

function Profile() {
    const showToast = useToast();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [completedCourses, setCompletedCourses] = useState([]);
    const [selectedCertificate, setSelectedCertificate] = useState(null); 

    const [formData, setFormData] = useState({
        name: "", phone: "", college: "", year: "", department: "",
        github: "", linkedin: "", portfolio: "" 
    });

    const deptRef = useRef(null);
    const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

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

    const getDisplayDepartment = (dept) => {
        if (!dept) return "Student";
        const shortNames = {
            "Computer Science & Engineering": "CSE",
            "Information Technology": "IT",
            "Electronics & Communication": "ECE",
            "Mechanical Engineering": "ME"
        };
        return shortNames[dept] || dept;
    };

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
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const sessionUser = await account.get();
                setUser(sessionUser);
                setFormData({
                    name: sessionUser.name || "",
                    phone: sessionUser.phone || "",
                    college: sessionUser.college || "",
                    year: sessionUser.year || "",
                    department: sessionUser.department || "",
                    github: sessionUser.github || sessionUser.Github || "",
                    linkedin: sessionUser.linkedin || sessionUser.Linkedin || "",
                    portfolio: sessionUser.portfolio || sessionUser.Portfolio || "",
                });

                const [progressRes, coursesRes] = await Promise.all([
                    databases.listDocuments(DATABASE_ID, PROGRESS_COLLECTION_ID),
                    databases.listDocuments(DATABASE_ID, COURSES_COLLECTION_ID)
                ]);

                const myProgress = progressRes.documents.filter(
                    doc => String(doc.UserId) === String(sessionUser.$id) || String(doc.userId) === String(sessionUser.$id)
                );

                const courseDict = coursesRes.documents.reduce((acc, course) => {
                    acc[String(course.ID || course.$id)] = course;
                    return acc;
                }, {});

                const completed = myProgress.reduce((acc, prog) => {
                    const badgeValue = String(prog.Badge || "").toUpperCase();
                    if (prog.CompletionPercentage >= 100 || badgeValue === "Y" || badgeValue === "C") {
                        const courseDetails = courseDict[String(prog.CourseId)];
                        if (courseDetails) {
                            
                            // ✨ IDENTICAL ROBUST DATE LOGIC TO ACHIEVEMENTS.JSX
                            const rawDate = prog.date || prog.Date || prog.$updatedAt;
                            let formattedDate = "N/A";
                            if (rawDate) {
                                const parsedDate = new Date(rawDate);
                                if (!isNaN(parsedDate.getTime())) {
                                    formattedDate = parsedDate.toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    });
                                } else {
                                    formattedDate = rawDate;
                                }
                            }

                            acc.push({
                                id: prog.$id,
                                courseName: courseDetails.Title,
                                badgeTitle: courseDetails.Badge || "Course Scholar",
                                date: formattedDate, // Uses the safely parsed date
                                progressDetails: prog
                            });
                        }
                    }
                    return acc;
                }, []);

                setCompletedCourses(completed);

            } catch (error) {
                showToast("Please log in to view your profile.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        if (!formData.name.trim()) return showToast("Name cannot be empty ⚠️", "error");
        setSaving(true);
        try {
            await account.updateProfile(
                user.email, formData.name, formData.phone,
                formData.college, formData.year, formData.department,
                formData.github, formData.linkedin, formData.portfolio
            );
            setUser({ ...user, ...formData });
            showToast("Profile updated successfully! 🎉", "success");
            setIsEditing(false);
        } catch (error) {
            showToast(error.message || "Failed to update profile", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-[#050505]">
                <Loader />
            </div>
        );
    }

    const inputBase = "w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-theme-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed";

    return (
        <div className="pt-28 px-4 pb-24 min-h-screen font-dm text-[#111] dark:text-gray-100 bg-[#f8f9fa] dark:bg-[#050505]">
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-500">

                <div className="mb-8 text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-500 dark:to-theme-pink-400">Profile</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: AVATAR & SOCIALS */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 rounded-[2rem] bg-white dark:bg-[#0a0a0a] shadow-xl shadow-theme-blue-500/5 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-theme-blue-500 to-theme-pink-500 p-1 mb-4 shadow-lg shadow-theme-blue-500/20">
                                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=dbeafe&color=2563eb&bold=true`} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white dark:border-[#0a0a0a]" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h2>
                            <p className="text-sm text-theme-blue-600 dark:text-theme-pink-400 font-bold mb-4 flex items-center justify-center gap-1.5 text-center">
                                <GraduationCap size={16} className="shrink-0" />
                                <span className="uppercase">{getDisplayDepartment(user.department)}</span>
                            </p>

                            {!isEditing && (
                                <div className="flex items-center gap-3 mb-6">
                                    {user.github && (
                                        <a href={user.github.startsWith('http') ? user.github : `https://${user.github}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#111] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-theme-blue-600 dark:hover:text-theme-blue-400 transition-colors border border-gray-200 dark:border-gray-800">
                                            <Github size={18} />
                                        </a>
                                    )}
                                    {user.linkedin && (
                                        <a href={user.linkedin.startsWith('http') ? user.linkedin : `https://${user.linkedin}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#111] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors border border-gray-200 dark:border-gray-800">
                                            <Linkedin size={18} />
                                        </a>
                                    )}
                                    {user.portfolio && (
                                        <a href={user.portfolio.startsWith('http') ? user.portfolio : `https://${user.portfolio}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#111] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border border-gray-200 dark:border-gray-800">
                                            <Globe size={18} />
                                        </a>
                                    )}
                                </div>
                            )}

                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center justify-center gap-1.5">
                                <ShieldCheck size={16} className="text-green-500" /> Verified Student
                            </p>

                            <div className="w-full pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3 text-sm">
                                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-2"><Clock size={16} /> Joined</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{user.joinDate || new Date(user.$createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ACCOUNT & CERTS */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* DETAILS FORM */}
                        <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#0a0a0a] shadow-xl shadow-theme-blue-500/5 border border-gray-200 dark:border-gray-800">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Account Details</h3>
                                {!isEditing ? (
                                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-bold text-theme-blue-600 dark:text-theme-blue-400 hover:opacity-80 transition-opacity bg-theme-blue-50 dark:bg-theme-blue-500/10 px-4 py-2 rounded-full">
                                        <Edit2 size={16} /> Edit Profile
                                    </button>
                                ) : (
                                    <button onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            name: user.name, phone: user.phone, college: user.college, year: user.year, department: user.department,
                                            github: user.github, linkedin: user.linkedin, portfolio: user.portfolio
                                        });
                                        setDeptDropdownOpen(false);
                                    }} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 px-4 py-2 bg-gray-50 dark:bg-[#111] rounded-full">
                                        <X size={16} /> Cancel
                                    </button>
                                )}
                            </div>

                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="text" disabled={!isEditing} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputBase} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="tel" disabled={!isEditing} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputBase} />
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">College / Institution</label>
                                        <div className="relative">
                                            <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="text" disabled={!isEditing} value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} placeholder="e.g., B. P. Poddar Institute..." className={inputBase} />
                                        </div>
                                    </div>

                                    <div ref={deptRef}>
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Department</label>
                                        <div className="relative">
                                            <Book className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                value={formData.department}
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                onFocus={() => isEditing && setDeptDropdownOpen(true)}
                                                placeholder="Select or type..."
                                                className={`${inputBase} pr-10`}
                                            />
                                            {isEditing && (
                                                <button type="button" onClick={() => setDeptDropdownOpen(!deptDropdownOpen)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                                    <ChevronDown size={16} className={`transition-transform duration-300 ${deptDropdownOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                            )}
                                            {deptDropdownOpen && isEditing && (
                                                <div className="absolute z-50 mt-2 w-full animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111] p-1.5 shadow-xl max-h-48 overflow-y-auto">
                                                    {predefinedDepartments.map((dept, idx) => (
                                                        <button key={idx} type="button"
                                                            onClick={() => {
                                                                setFormData({ ...formData, department: dept });
                                                                setDeptDropdownOpen(false);
                                                            }}
                                                            className={`flex w-full items-center justify-start rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left ${formData.department === dept ? 'bg-theme-blue-50 text-theme-blue-600 dark:bg-theme-blue-500/10 dark:text-theme-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                                }`}
                                                        >
                                                            {dept}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Current Year</label>
                                        <CustomDropdown
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            options={yearOptions}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">GitHub Profile</label>
                                        <div className="relative">
                                            <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="text" disabled={!isEditing} value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} placeholder="github.com/username" className={inputBase} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">LinkedIn Profile</label>
                                        <div className="relative">
                                            <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="text" disabled={!isEditing} value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} placeholder="linkedin.com/in/username" className={inputBase} />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Personal Portfolio</label>
                                        <div className="relative">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="text" disabled={!isEditing} value={formData.portfolio} onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })} placeholder="yourwebsite.com" className={inputBase} />
                                        </div>
                                    </div>
                                </div>

                                {/* Save Button */}
                                {isEditing && (
                                    <div className="pt-6">
                                        <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 text-white shadow-lg shadow-theme-blue-500/20 hover:shadow-theme-blue-500/40 disabled:opacity-70 active:scale-[0.98] transition-all">
                                            {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <><Save size={18} /> Save Profile Changes</>}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CERTIFICATIONS SECTION */}
                        <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#0a0a0a] shadow-xl shadow-theme-blue-500/5 border border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <Award size={20} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Certifications & Courses</h3>
                            </div>

                            {completedCourses.length === 0 ? (
                                <div className="text-center py-8 px-4 border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">You haven't completed any courses yet.</p>
                                    <p className="text-xs text-gray-400 mt-1">Finish a course to earn a certificate and display it here!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-3">
                                    {completedCourses.map((cert) => (
                                        <button 
                                            key={cert.id} 
                                            onClick={() => setSelectedCertificate(cert)}
                                            className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#111] hover:bg-theme-blue-50 dark:hover:bg-theme-blue-500/10 hover:border-theme-blue-200 dark:hover:border-theme-blue-800 hover:shadow-md transition-all group outline-none"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-theme-blue-600 dark:group-hover:text-theme-pink-400 transition-colors line-clamp-1">{cert.courseName}</h4>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-0.5">Completed: {cert.date}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-theme-blue-500 group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <CertificateModal 
                badge={selectedCertificate} 
                user={user} 
                onClose={() => setSelectedCertificate(null)} 
            />

        </div>
    );
}

export default Profile;