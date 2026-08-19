/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldQuestion, RefreshCw, ArrowLeft } from "lucide-react";
import { account } from "../../appwrite/config";
import { useToast } from "../Other/ToastContext";
import ThemeToggle from "../Other/ThemeToggle";
import Logo from "../../../public/Logo_badge";

function ResetPassword() {
    const navigate = useNavigate();
    const showToast = useToast();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [loading, setLoading] = useState(false);

    // CAPTCHA State
    const [captchaNum1, setCaptchaNum1] = useState(0);
    const [captchaNum2, setCaptchaNum2] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState("");

    const generateCaptcha = () => {
        setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
        setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
        setCaptchaAnswer("");
    };

    useEffect(() => {
        const sessionData = localStorage.getItem("learnstack_user");

        if (!sessionData) {
            navigate("/auth", { replace: true });
            return;
        }

        try {
            const parsedSession = JSON.parse(sessionData);
            setUserEmail(parsedSession.email);
        } catch (e) {
            navigate("/auth", { replace: true });
        }

        generateCaptcha();
    }, [navigate]);

    const handleReset = async (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword) {
            showToast("All fields are required ⚠️", "error");
            return;
        }
        if (newPassword.length < 8) {
            showToast("New password must be at least 8 characters long ⚠️", "error");
            return;
        }

        // Verify CAPTCHA
        if (parseInt(captchaAnswer) !== (captchaNum1 + captchaNum2)) {
            showToast("Incorrect Security Answer. Please try again.", "error");
            generateCaptcha();
            return;
        }

        setLoading(true);
        try {
            // Appwrite signature: updatePassword(newPassword, oldPassword)
            await account.updatePassword(newPassword, oldPassword);
            showToast("Password updated successfully 🔐", "success");
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error("Password Update Error:", error);
            showToast(error.message || "Failed to update password. Check your old password.", "error");
            generateCaptcha(); 
        } finally {
            setLoading(false);
        }
    };

    // Styling matches your Auth inputs perfectly
    const inputBase = "w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-400 text-gray-900 dark:text-white";

    return (
        <div className="relative min-h-[100dvh] flex items-center justify-center p-4 sm:p-6 bg-auth-bg1 dark:bg-auth-bg2 bg-cover bg-center font-dm text-[#111] dark:text-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-sm pointer-events-none" />

            {/* THEME TOGGLE */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
                <ThemeToggle />
            </div>

            {/* MAIN CARD: Strictly locked to 600px height just like Auth.jsx */}
            <div className="relative z-10 w-full max-w-4xl h-auto md:h-[600px] max-h-[95dvh] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-500">
                
                {/* LEFT SIDE: IMAGE PANEL (Identical to your Auth layout) */}
                <div className="hidden md:flex flex-col items-center justify-between w-1/2 h-full z-30 shadow-2xl bg-[#f5f5f5] dark:bg-[#111111]">
                    {/* Top Section: Logo */}
                    <div className="w-full flex justify-center pt-10">
                        <Logo />
                    </div>

                    {/* Bottom Section: Student Illustration */}
                    <div className="w-full flex-1 flex items-end justify-center pb-8 px-4">
                        <img 
                            src="/Svg/STUDENT.svg" 
                            alt="LearnStack Cover"
                            className="w-11/12 max-h-full object-contain"
                        />
                    </div>
                </div>

                {/* RIGHT SIDE: RESET PASSWORD FORM */}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-6 sm:p-8 md:p-10 relative z-20 overflow-y-auto scrollbar-hide">
                    
                    <div className="w-full max-w-sm mx-auto">
                        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                        </Link>

                        <h1 className="font-fraunces font-black text-3xl sm:text-4xl text-gray-900 dark:text-white mb-2 tracking-tight">
                            Reset Password <span className="text-blue-500">🔐</span>
                        </h1>

                        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
                            Secure the account associated with <span className="text-gray-900 dark:text-gray-200 font-bold block mt-1 truncate">{userEmail}</span>
                        </p>

                        <form onSubmit={handleReset} className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-widest">Current Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={showOld ? "text" : "password"}
                                        placeholder="Enter old password"
                                        value={oldPassword}
                                        required
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className={inputBase}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOld(!showOld)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors outline-none"
                                    >
                                        {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-widest">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={showNew ? "text" : "password"}
                                        placeholder="Minimum 8 characters"
                                        value={newPassword}
                                        required
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={inputBase}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors outline-none"
                                    >
                                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* CAPTCHA Section */}
                            <div className="pt-2">
                                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-widest flex items-center justify-between">
                                    <span>Security Check</span>
                                    <button type="button" onClick={generateCaptcha} className="hover:text-blue-500 transition-colors flex items-center gap-1 outline-none">
                                        <RefreshCw size={10} /> <span className="lowercase text-[9px]">refresh</span>
                                    </button>
                                </label>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/50 dark:bg-white/[0.05] border border-black/5 dark:border-white/5 text-sm font-black text-gray-900 dark:text-white tracking-widest select-none">
                                        <span>{captchaNum1}</span>
                                        <span className="text-blue-500">+</span>
                                        <span>{captchaNum2}</span>
                                        <span className="text-gray-400">=</span>
                                    </div>
                                    <div className="relative flex-[1.5]">
                                        <ShieldQuestion className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="number"
                                            required
                                            placeholder="Answer"
                                            value={captchaAnswer}
                                            onChange={(e) => setCaptchaAnswer(e.target.value)}
                                            className={`${inputBase} pr-4`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-[0.98] transition-all disabled:opacity-70 text-sm group"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>Update Password <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ResetPassword;