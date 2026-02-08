import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { hashPassword } from "./utils/hash";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showpassword, setShowpassword] = useState(false);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("learnstack_user"));
    if (session?.isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("learnstack_users")) || [];

    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      alert("User already exists. Please login.");
      return;
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await hashPassword(password);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("learnstack_users", JSON.stringify(users));

    // auto-login after signup
    localStorage.setItem(
      "learnstack_user",
      JSON.stringify({
        isLoggedIn: true,
        email,
        loginTime: new Date().toISOString(),
      }),
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-black">
      <div className="w-full max-w-md p-8 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Create Account ✨
        </h1>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          Start your learning journey today
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSignup}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                name="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showpassword ? "text" : "password"}
                required
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowpassword(!showpassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showpassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/40 transition"
          >
            Sign Up
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-purple-400 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
