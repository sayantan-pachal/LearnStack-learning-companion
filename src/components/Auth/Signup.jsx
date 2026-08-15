/* eslint-disable no-empty */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { account } from "../../appwrite/config"; 
import { useToast } from "../Other/ToastContext";

export default function Signup({ onSwitchMode }) {
    const navigate = useNavigate();
    const showToast = useToast();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); 
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isOtpStep, setIsOtpStep] = useState(false);
    const [userOtp, setUserOtp] = useState("");

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
            showToast(`Account verified! Welcome to LearnStack, ${name}! 🚀`, "success");
            navigate("/dashboard", { replace: true });
        } catch (error) {
            showToast(error.message || "Incorrect verification code. Try again. ❌", "error");
        } finally {
            setLoading(false);
        }
    };

    const inputBase = "w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-smart-green-500 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-400 dark:text-white";

    return (
        <div className="w-full max-w-sm">

            <h1 className="font-fraunces font-black text-3xl text-center mb-1 tracking-tight">Join LearnStack</h1>

            {!isOtpStep ? (
                <>
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
                                    
                                    {/* ✨ The floating border hint */}
                                    <span className="absolute -bottom-1.5 right-4 bg-white dark:bg-[#0a0a0a] px-1.5 text-[8px] font-bold text-gray-400 tracking-wider rounded-sm pointer-events-none">
                                        MIN 8 CHARS
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-smart-green-900/20 active:scale-95 transition-all disabled:opacity-70 text-sm">
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Get Code <ArrowRight size={16} /></>}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-xs font-bold text-gray-500 dark:text-gray-400">
                        Already registered? <button type="button" onClick={onSwitchMode} className="text-smart-green-600 hover:text-smart-green-500">Login</button>
                    </p>
                </>
            ) : (
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
        </div>
    );
}