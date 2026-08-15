import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { account } from "../../appwrite/config";
import { useToast } from "../Other/ToastContext";

// Notice the new prop onBackToLogin
export default function ForgetPassword({ onBackToLogin }) {
    const showToast = useToast();

    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [email, setEmail] = useState("");
    const [userOtp, setUserOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRequestReset = async (e) => {
        e.preventDefault();
        if (!email) return showToast("Please enter your email address ⚠️", "error");

        setLoading(true);
        try {
            await account.sendResetOTP(email);
            showToast("Password reset code sent to your email! 📩", "success");
            setStep(2);
        } catch (error) {
            showToast(error.message || "Account not found.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (userOtp.length !== 6) return showToast("Please enter a valid 6-digit code. ⚠️", "error");
        if (newPassword.length < 8) return showToast("Password must be at least 8 characters 🔑", "error");

        setLoading(true);
        try {
            await account.resetPasswordWithOTP(email, userOtp, newPassword);
            showToast("Password reset successful! 🔐 You can now log in.", "success");
            
            // Automatically switch back to the login screen!
            onBackToLogin();
        } catch (error) {
            showToast(error.message || "Invalid or expired OTP. ❌", "error");
        } finally {
            setLoading(false);
        }
    };

    // Compact input style
    const inputBase = "w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-smart-green-500 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-400 dark:text-white";

    return (
        <div className="w-full max-w-sm animate-in slide-in-from-right-4 duration-300">
            <h1 className="font-fraunces font-black text-3xl text-center mb-1 tracking-tight">
                Recover Account
            </h1>

            {step === 1 && (
                <>
                    <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-6">
                        Enter your registered LearnStack email address.
                    </p>
                    <form onSubmit={handleRequestReset} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="email" required placeholder="student@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputBase} />
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg active:scale-95 transition-all disabled:opacity-70 text-sm">
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Send Reset Code <ArrowRight size={16} /></>}
                        </button>
                    </form>
                </>
            )}

            {step === 2 && (
                <div className="animate-in fade-in duration-300">
                    <div className="text-center mb-5">
                        <div className="w-12 h-12 bg-smart-green-50 dark:bg-smart-green-900/20 text-smart-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <ShieldCheck size={24} />
                        </div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Code sent to <br/><span className="text-gray-900 dark:text-white font-bold">{email}</span>
                        </p>
                    </div>
                    
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest text-center">6-Digit Code</label>
                            <div className="relative max-w-[180px] mx-auto">
                                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" maxLength="6" required placeholder="123456" value={userOtp} onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ''))} className={`${inputBase} text-center font-bold tracking-widest text-base`} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type={showPassword ? "text" : "password"} required placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputBase} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                                {/* Floating border hint exactly like Signup! */}
                                <span className="absolute -bottom-1.5 right-4 bg-white dark:bg-[#0a0a0a] px-1.5 text-[8px] font-bold text-gray-400 tracking-wider rounded-sm pointer-events-none">
                                    MIN 8 CHARS
                                </span>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg active:scale-95 transition-all disabled:opacity-70 text-sm">
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Reset Password <ArrowRight size={16} /></>}
                        </button>
                    </form>
                </div>
            )}

            <p className="mt-6 text-center text-xs font-bold">
                <button type="button" onClick={onBackToLogin} className="text-gray-500 hover:text-smart-green-600 transition-colors">
                    Back to Login
                </button>
            </p>
        </div>
    );
}