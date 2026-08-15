/* eslint-disable no-empty */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, GraduationCap, BookOpen, ChevronDown } from "lucide-react";
import { account } from "../../appwrite/config"; 
import { useToast } from "../Other/ToastContext";
import CustomDropdown from "../Other/CustomDropdown"; 

export default function Signup({ onSwitchMode }) {
    const navigate = useNavigate();
    const showToast = useToast();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); 
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [userOtp, setUserOtp] = useState("");

    const [isProfileStep, setIsProfileStep] = useState(false);
    const [college, setCollege] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");

    const [loading, setLoading] = useState(false);
    
    // ✨ New state to handle the final loading animation
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

    // Combobox specific state & ref for Department
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

    // Close the department dropdown when clicking outside
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
        const checkSession = async () => {
            try {
                await account.get();
                navigate("/dashboard", { replace: true });
            } catch {}
        };
        checkSession();
    }, [navigate]);

    const handleRequestSignup = async (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !password) return showToast("All fields are required ⚠️", "error");
        if (password.length < 8) return showToast("Password must be at least 8 characters long ⚠️", "error");
        setLoading(true);
        try {
            await account.sendVerificationOTP(email, name, phone, password);
            showToast("Verification code sent to your email! 📩", "success");
            setIsOtpStep(true); 
        } catch (error) {
            showToast(error.message || "Failed to verify credentials. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!userOtp || userOtp.length !== 6) return showToast("Please enter a valid 6-digit code. ⚠️", "error");
        setLoading(true);
        try {
            await account.verifyAndCreateAccount(email, userOtp);
            await account.createEmailPasswordSession(email, password);
            showToast(`Account verified! Let's set up your profile. 🎓`, "success");
            setIsOtpStep(false);
            setIsProfileStep(true);
        } catch (error) {
            showToast(error.message || "Incorrect verification code. Try again. ❌", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteProfile = async (e) => {
        e.preventDefault();
        if (!college || !year || !department) return showToast("All fields are required ⚠️", "error");
        setLoading(true);
        try {
            // Update the profile in the database
            await account.updateProfile(email, name, phone, college, year, department);
            
            // ✨ Show the beautiful "Construction" animation
            setShowSuccessAnimation(true);
            
            // Artificial delay of 3 seconds to let the animation play out
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            showToast(`Welcome to LearnStack, ${name}! 🚀`, "success");
            navigate("/dashboard", { replace: true });
        } catch (error) {
            showToast(error.message || "Failed to update profile. Try again.", "error");
            setLoading(false); // Only stop loading if there's an error
        }
    };

    const inputBase = "w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-smart-green-500 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-400 dark:text-white";

    return (
        <div className="w-full max-w-sm">
            {/* Hide the main title if the success animation is playing to keep it clean */}
            {!showSuccessAnimation && (
                <h1 className="font-fraunces font-black text-3xl text-center mb-1 tracking-tight">Join LearnStack</h1>
            )}

            {!isOtpStep && !isProfileStep && !showSuccessAnimation && (
                <div className="animate-in fade-in duration-300">
                    <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-5">Create your account to start your learning journey</p>

                    <form className="space-y-4" onSubmit={handleRequestSignup}>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" required placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} className={inputBase} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="email" required placeholder="student@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputBase} />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="tel" required placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputBase} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputBase} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                    <span className="absolute -bottom-1.5 right-4 bg-white dark:bg-[#0a0a0a] px-1.5 text-[8px] font-bold text-gray-400 tracking-wider rounded-sm pointer-events-none">
                                        MIN 8 CHARS
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg active:scale-95 transition-all disabled:opacity-70 text-sm">
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Get Code <ArrowRight size={16} /></>}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-xs font-bold text-gray-500 dark:text-gray-400">
                        Already registered? <button type="button" onClick={onSwitchMode} className="text-smart-green-600 hover:text-smart-green-500">Login</button>
                    </p>
                </div>
            )}

            {isOtpStep && !showSuccessAnimation && (
                <div className="animate-in slide-in-from-right-4 duration-300">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-smart-green-50 dark:bg-smart-green-900/20 text-smart-green-600 rounded-full flex items-center justify-center mx-auto mb-3"><Mail size={24} /></div>
                        <h2 className="font-bold text-lg mb-1">Check your email</h2>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">We sent a 6-digit code to <br/><span className="text-gray-900 dark:text-white font-bold">{email}</span></p>
                    </div>

                    <form className="space-y-4" onSubmit={handleVerifyOtp}>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest text-center">Enter 6-Digit Code</label>
                            <div className="relative max-w-[180px] mx-auto">
                                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" maxLength="6" required placeholder="123456" value={userOtp} onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ''))} className={`${inputBase} text-center font-bold tracking-widest text-base`} />
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg active:scale-95 transition-all disabled:opacity-70 text-sm">
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Verify Account <ArrowRight size={16} /></>}
                        </button>
                    </form>
                    <p className="mt-5 text-center text-xs font-bold text-gray-500 dark:text-gray-400">
                        Wrong email? <button type="button" onClick={() => setIsOtpStep(false)} className="text-smart-green-600">Go back</button>
                    </p>
                </div>
            )}

            {isProfileStep && !showSuccessAnimation && (
                <div className="animate-in slide-in-from-right-4 duration-300">
                    <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-5">Just a few more details to personalize your experience.</p>

                    <form className="space-y-4" onSubmit={handleCompleteProfile}>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">College / University</label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" required placeholder="e.g. IIT Madras..." value={college} onChange={(e) => setCollege(e.target.value)} className={inputBase} />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col justify-end">
                                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Current Year</label>
                                <CustomDropdown
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    options={yearOptions}
                                />
                            </div>

                            <div className="flex flex-col justify-end" ref={deptRef}>
                                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Department</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="e.g. CSE" 
                                        value={department} 
                                        onChange={(e) => setDepartment(e.target.value)} 
                                        onFocus={() => setDeptDropdownOpen(true)}
                                        className={`${inputBase} pr-8`} 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${deptDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {deptDropdownOpen && (
                                        <div className="absolute z-50 mt-1 w-full animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-1.5 shadow-xl max-h-48 overflow-y-auto">
                                            {predefinedDepartments.map((dept, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => {
                                                        setDepartment(dept);
                                                        setDeptDropdownOpen(false);
                                                    }}
                                                    className={`flex w-full items-center justify-start rounded-xl px-3 py-2.5 text-xs transition-colors text-left ${
                                                        department === dept
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
                        </div>

                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg active:scale-95 transition-all disabled:opacity-70 text-sm">
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Complete Setup <ArrowRight size={16} /></>}
                        </button>
                    </form>
                </div>
            )}

            {/* ✨ NEW: The Loading Animation Screen */}
            {showSuccessAnimation && (
                <div className="animate-in zoom-in-95 fade-in duration-500 flex flex-col items-center justify-center py-10">
                    <img 
                        src="../../../public/Svg/Construction.svg" 
                        alt="Building Workspace" 
                        className="w-40 h-40 object-contain drop-shadow-xl mb-6"
                    />
                    <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">Setting up your workspace</h2>
                    <p className="text-sm font-bold text-smart-green-600 dark:text-smart-green-400 animate-pulse">
                        Personalizing your dashboard...
                    </p>
                </div>
            )}
        </div>
    );
}