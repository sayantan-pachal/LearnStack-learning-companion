import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { account } from "../../appwrite/config";
import { useToast } from "../Other/ToastContext"; // Update path if needed

function ForgetPassword() {
  const navigate = useNavigate();
  const showToast = useToast();

  // States
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP to Email
  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter your email address ⚠️", "error");
      return;
    }

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

  // Step 2: Verify OTP and Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (userOtp.length !== 6) {
      showToast("Please enter a valid 6-digit code. ⚠️", "error");
      return;
    }
    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters 🔑", "error");
      return;
    }

    setLoading(true);
    try {
      await account.resetPasswordWithOTP(email, userOtp, newPassword);
      showToast("Password reset successful! 🔐 You can now log in.", "success");
      navigate("/login", { replace: true });
    } catch (error) {
      showToast(error.message || "Invalid or expired OTP. ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-smart-green-500 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-400 dark:text-white";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-auth-bg1 dark:bg-auth-bg2 bg-cover bg-center bg-no-repeat font-dm text-[#111] dark:text-gray-100 py-12">
      <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-sm pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-[2.5rem] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl border border-black/10 dark:border-white/10 animate-in fade-in zoom-in duration-500">
        <h1 className="font-fraunces font-black text-4xl text-center mb-2 tracking-tight">
          Recover Account <span className="text-smart-green-500">🔑</span>
        </h1>

        {step === 1 && (
          <>
            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
              Enter your registered LearnStack email address.
            </p>
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                  <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" required placeholder="student@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputBase} />
                  </div>
              </div>
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 mt-6 rounded-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl shadow-smart-green-900/20 active:scale-95 transition-all disabled:opacity-70 text-base">
                {loading ? <Loader2 className="animate-spin" /> : <>Send Reset Code <ArrowRight size={20} /></>}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-6">
                <div className="w-12 h-12 bg-smart-green-50 dark:bg-smart-green-900/20 text-smart-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={24} />
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Code sent to <span className="text-gray-900 dark:text-white font-bold">{email}</span>
                </p>
            </div>
            
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                  <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest text-center">6-Digit Code</label>
                  <div className="relative max-w-[200px] mx-auto mb-4">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" maxLength="6" required placeholder="123456" value={userOtp} onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ''))} className={`${inputBase} text-center font-bold tracking-widest text-lg`} />
                  </div>
              </div>

              <div>
                  <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showPassword ? "text" : "password"} required placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputBase} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
              </div>

              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 mt-6 rounded-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl shadow-smart-green-900/20 active:scale-95 transition-all disabled:opacity-70 text-base">
                {loading ? <Loader2 className="animate-spin" /> : <>Reset Password <ArrowRight size={20} /></>}
              </button>
            </form>
          </>
        )}

        <p className="mt-8 text-center text-sm font-bold">
          <Link to="/login" className="text-gray-500 hover:text-smart-green-600 transition-colors">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;