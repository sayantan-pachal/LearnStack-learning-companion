import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react";
import { hashPassword } from "./utils/hash";

function ForgetPasswordOTP() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const users =
    JSON.parse(localStorage.getItem("learnstack_users")) || [];

  // STEP 1: Send OTP
  const sendOTP = (e) => {
    e.preventDefault();

    const userExists = users.find((u) => u.email === email);

    if (!userExists) {
      alert("No account found with this email");
      return;
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otpCode);

    alert(`Your OTP is: ${otpCode}`); // simulation
    console.log("OTP:", otpCode);

    setStep(2);
  };

  // STEP 2: Verify OTP & Reset
  const verifyOTP = async (e) => {
    e.preventDefault();

    if (otp !== generatedOTP) {
      alert("Invalid OTP");
      return;
    }

    const hashedNew = await hashPassword(newPassword);

    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, password: hashedNew } : u
    );

    localStorage.setItem(
      "learnstack_users",
      JSON.stringify(updatedUsers)
    );

    alert("Password reset successful 🔐");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-black">
      <div className="w-full max-w-md p-8 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Forgot Password 🔑
        </h1>

        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          {step === 1
            ? "We'll send you a verification code"
            : "Enter OTP and new password"}
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={sendOTP} className="mt-8 space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium
                bg-gradient-to-r from-blue-500 to-indigo-600 text-white
                       hover:shadow-lg hover:shadow-blue-500/40
                       dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/40
                       transition"
            >
              Send OTP
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={verifyOTP} className="mt-8 space-y-5">
            {/* OTP */}
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* New Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium
                bg-gradient-to-r from-blue-500 to-indigo-600 text-white
                       hover:shadow-lg hover:shadow-blue-500/40
                       dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/40
                       transition"
            >
              Verify & Reset
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgetPasswordOTP;