/* eslint-disable no-empty */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { account } from "../../appwrite/config"; 
import { useToast } from "../Other/ToastContext"; 

export default function Login({ onSwitchMode, onForgotClick }) {
    const navigate = useNavigate();
    const showToast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();
                navigate("/dashboard", { replace: true });
            } catch {}
        };
        checkSession();
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return showToast("Please enter both email and password ⚠️", "error");
        setLoading(true);
        try {
            await account.createEmailPasswordSession(email, password);
            showToast("Welcome back to LearnStack! 🚀", "success");
            navigate("/dashboard", { replace: true });
        } catch (error) {
            showToast(error.message || "Invalid email or password. ❌", "error");
        } finally {
            setLoading(false);
        }
    };

    const inputBase = "w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-smart-green-500 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-400 dark:text-white";

    return (
        <div className="w-full max-w-sm">

            <h1 className="font-fraunces font-black text-3xl text-center mb-1 tracking-tight">Welcome Back 👋</h1>
            <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-6">Sign in to continue your learning journey</p>

            <form className="space-y-3" onSubmit={handleLogin}>
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" required placeholder="student@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputBase} />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Password</label>
                        {/* Changed this line to trigger the local state instead of navigate */}
                        <button type="button" onClick={onForgotClick} className="text-[10px] font-bold text-smart-green-600 hover:text-smart-green-500">Forgot password?</button>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputBase} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg active:scale-95 transition-all disabled:opacity-70 text-sm">
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Sign In <ArrowRight size={16} /></>}
                </button>
            </form>

            <p className="mt-6 text-center text-xs font-bold text-gray-500 dark:text-gray-400">
                Don't have an account? <button type="button" onClick={onSwitchMode} className="text-smart-green-600 hover:text-smart-green-500">Sign up</button>
            </p>
        </div>
    );
}