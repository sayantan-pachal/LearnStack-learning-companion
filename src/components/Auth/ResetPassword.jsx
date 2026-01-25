import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../../utils/hash";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";


function ResetPassword() {
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);


    const session = JSON.parse(localStorage.getItem("learnstack_user"));

    // 🔒 protect route
    useEffect(() => {
        if (!session?.isLoggedIn) {
            navigate("/login", { replace: true });
        }
    }, [navigate, session]);

    const handleReset = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            alert("All fields are required");
            return;
        }

        const users =
            JSON.parse(localStorage.getItem("learnstack_users")) || [];

        const hashedOld = await hashPassword(oldPassword);
        const hashedNew = await hashPassword(newPassword);

        const updatedUsers = users.map((u) => {
            if (u.email === session.email) {
                if (u.password !== hashedOld) {
                    alert("Old password is incorrect");
                    throw new Error("Wrong password");
                }
                return { ...u, password: hashedNew };
            }
            return u;
        });

        localStorage.setItem(
            "learnstack_users",
            JSON.stringify(updatedUsers)
        );

        alert("Password updated successfully 🔐");
        navigate("/dashboard", { replace: true });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 dark:bg-black">
            <div className="w-full max-w-md p-8 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                    Reset Password 🔐
                </h1>

                <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                    Secure your account with a new password
                </p>

                <form onSubmit={handleReset} className="mt-8 space-y-5">
                    {/* Old Password */}
                    <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                        <input
                            type={showOld ? "text" : "password"}
                            placeholder="••••••••"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2 rounded-lg bg-white dark:bg-gray-800
               border border-gray-300 dark:border-gray-700
               text-gray-900 dark:text-white
               focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            {showOld ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* New Password */}
                    <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                        <input
                            type={showNew ? "text" : "password"}
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2 rounded-lg bg-white dark:bg-gray-800
               border border-gray-300 dark:border-gray-700
               text-gray-900 dark:text-white
               focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium
                   bg-gradient-to-r from-blue-500 to-indigo-600 text-white
                   hover:shadow-lg hover:shadow-blue-500/40
                   dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/40
                   transition"
                    >
                        Update Password
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;