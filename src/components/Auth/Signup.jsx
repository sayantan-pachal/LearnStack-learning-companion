import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import { account } from "../../appwrite/config"; 
import { useToast } from "../Other/ToastContext";
import ProfileForm from "./ProfileForm";

export default function Signup({ onSwitchMode, onStepChange }) {
    const navigate = useNavigate();
    const showToast = useToast();

    // 1 = Basic Info, 2 = Profile Info, 3 = OTP Verification
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Basic Info State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); 
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    // Profile Info State (Saved temporarily until OTP is verified)
    const [profileData, setProfileData] = useState(null);

    // OTP & Legal Checkboxes State
    const [userOtp, setUserOtp] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false); 
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false); // ✨ Added specific state for Privacy

    // ==========================================
    // STEP 1: Handle Basic Info
    // ==========================================
    const handleBasicSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !password) return showToast("All fields are required ⚠️", "error");
        if (password.length < 8) return showToast("Password must be at least 8 characters long ⚠️", "error");
        
        // Move to Profile Step
        setStep(2);
        onStepChange?.('profile'); 
    };

    // ==========================================
    // STEP 2: Handle Profile Info & Send OTP
    // ==========================================
    const handleProfileSubmit = async (formData) => {
        if (!formData.college || !formData.year || !formData.department) {
            return showToast("Academic fields are required ⚠️", "error");
        }
        
        // Save the profile data in state
        setProfileData(formData);
        setLoading(true);
        
        try {
            await account.sendVerificationOTP(email, name, phone, password);
            showToast("Verification code sent to your email! 📩", "success");
            
            setStep(3);
            onStepChange?.('otp');
            
        } catch (error) {
            showToast(error.message || "Failed to send verification code. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // STEP 3: Verify OTP & ACTUALLY Create Account
    // ==========================================
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        if (!userOtp || userOtp.length !== 6) return showToast("Please enter a valid 6-digit code. ⚠️", "error");
        
        // ✨ Validate BOTH checkboxes
        if (!acceptedTerms || !acceptedPrivacy) {
            return showToast("You must accept the Terms and Privacy Policy to proceed. ⚖️", "error");
        }
        
        setLoading(true);
        try {
            await account.verifyAndCreateAccount(email, userOtp);
            await account.createEmailPasswordSession(email, password);
            await account.updateProfile(
                email, name, phone, 
                profileData.college, profileData.year, profileData.department,
                profileData.github, profileData.linkedin, profileData.portfolio
            );
            
            showToast(`Welcome to LearnStack, ${name}! 🚀`, "success");
            navigate("/dashboard", { replace: true });

        } catch (error) {
            showToast(error.message || "Incorrect verification code. Try again. ❌", "error");
            setLoading(false); 
        } 
    };

    const inputBase = "w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-theme-blue-500 dark:focus:ring-theme-pink-500 focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-400 dark:text-white";

    return (
        <div className="w-full max-w-sm relative mx-auto">
            <h1 className="font-fraunces font-black text-3xl text-center mb-1 tracking-tight">Join LearnStack</h1>

            {/* --- STEP 1: BASIC INFO --- */}
            {step === 1 && (
                <div className="animate-in fade-in duration-300">
                    <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-5">Create your account to start your learning journey</p>

                    <form className="space-y-4" onSubmit={handleBasicSubmit}>
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
                                    <input type="tel" required placeholder="9876543210" minLength={10} maxLength={10} pattern="[0-9]{10}" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputBase} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputBase} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                    <span className="absolute -bottom-1.5 right-4 bg-[#f8f9fa] dark:bg-[#050505] px-1.5 text-[8px] font-bold text-gray-400 tracking-wider rounded-sm pointer-events-none">
                                        MIN 8 CHARS
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-bold bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-700 dark:to-theme-pink-500 text-white shadow-lg active:scale-95 transition-all text-sm hover:opacity-90">
                            Continue to Profile <ArrowRight size={16} />
                        </button>
                    </form>

                    <p className="mt-5 text-center text-xs font-bold text-gray-500 dark:text-gray-400">
                        Already registered? <button type="button" onClick={onSwitchMode} className="text-theme-blue-600 hover:text-theme-pink-500 dark:text-theme-blue-400 dark:hover:text-theme-pink-400 transition-colors">Login</button>
                    </p>
                </div>
            )}

            {/* --- STEP 2: PROFILE INFO --- */}
            {step === 2 && (
                <div className="animate-in slide-in-from-right-4 duration-300">
                    <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-5">Just a few more details to personalize your experience.</p>
                    
                    <ProfileForm onSubmit={handleProfileSubmit} loading={loading} />

                    <button 
                        type="button" 
                        onClick={() => { setStep(1); onStepChange?.('form'); }} 
                        className="w-full flex justify-center items-center gap-1 mt-4 text-xs font-bold text-gray-500 hover:text-theme-blue-600 transition-colors"
                    >
                        <ArrowLeft size={12} /> Back to Basic Info
                    </button>
                </div>
            )}

            {/* --- STEP 3: OTP VERIFICATION --- */}
            {step === 3 && (
                <div className="animate-in slide-in-from-right-4 duration-300">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-theme-blue-50 dark:bg-theme-blue-900/20 text-theme-blue-600 dark:text-theme-pink-400 rounded-full flex items-center justify-center mx-auto mb-3"><Mail size={24} /></div>
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

                        {/* ✨ FIXED: Independent Checkboxes */}
                        <div className="pt-2">
                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-2 mb-2">
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-700 text-theme-blue-600 focus:ring-theme-blue-500 dark:bg-[#111] cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-tight cursor-pointer flex-1">
                                    I accept the application's{" "}
                                    <Link to="/legal#terms&conditions" target="_blank" className="text-theme-blue-600 hover:text-theme-pink-500 dark:text-theme-blue-400 dark:hover:text-theme-pink-400 transition-colors underline decoration-dotted underline-offset-2">
                                        Terms & Conditions
                                    </Link>
                                </label>
                            </div>
                            
                            {/* Privacy Policy Checkbox */}
                            <div className="flex items-start gap-2 pb-1">
                                <input 
                                    type="checkbox" 
                                    id="privacy" 
                                    checked={acceptedPrivacy}
                                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                                    className="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-700 text-theme-blue-600 focus:ring-theme-blue-500 dark:bg-[#111] cursor-pointer"
                                />
                                <label htmlFor="privacy" className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-tight cursor-pointer flex-1">
                                    I read and agree to the {" "}
                                    <Link to="/legal#privacy" target="_blank" className="text-theme-blue-600 hover:text-theme-pink-500 dark:text-theme-blue-400 dark:hover:text-theme-pink-400 transition-colors underline decoration-dotted underline-offset-2">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl font-bold bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-700 dark:to-theme-pink-500 text-white shadow-lg active:scale-95 transition-all disabled:opacity-70 text-sm hover:opacity-90">
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Create Account <ArrowRight size={16} /></>}
                        </button>
                    </form>
                    <p className="mt-5 text-center text-xs font-bold text-gray-500 dark:text-gray-400">
                        Wrong email? <button type="button" onClick={() => { setStep(1); onStepChange?.('form'); }} className="text-theme-blue-600 hover:text-theme-pink-500 dark:text-theme-blue-400 dark:hover:text-theme-pink-400 transition-colors">Go back</button>
                    </p>
                </div>
            )}
        </div>
    );
}