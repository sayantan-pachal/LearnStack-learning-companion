/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, BookOpen, Compass, Trophy, Users, User, Home, UserRound } from 'lucide-react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo1 from "../../../public/Logo1";
import Logo2 from "../../../public/Logo2";
import ThemeToggle from "./ThemeToggle";
import { useToast } from "../Other/ToastContext";
import { account } from "../../appwrite/config";

export default function Header() {
  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/resources", label: 'Resources', icon: BookOpen },
    { to: "/learningpaths", label: 'Learning Paths', icon: Compass },
    { to: "/achievements", label: 'Achievements', icon: Trophy },
    { to: "/community", label: 'Community', icon: Users },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  
  const dropdownRef = useRef(null); 
  const showToast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserOpen(false);
      }
    };

    if (userOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userOpen]);

  // Fetch user session directly from local storage via config
  useEffect(() => {
    const checkUser = async () => {
      try {
        const sessionUser = await account.get();
        setUser(sessionUser);
      } catch (error) {
        setUser(null); 
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession();
      setUser(null);
      setUserOpen(false);
      showToast("Logged out successfully. See you soon! 👋", "success");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      showToast("Failed to logout. Please try again.", "error");
    }
  };

  return (
    <header className="shadow rounded-full fixed top-5 left-10 right-10 z-50 transition-all duration-300 bg-white/40 lg:backdrop-blur-sm dark:bg-gray-900/60">
      <nav className="px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <Logo1 />
          </Link>
          <div className="flex items-center lg:order-2 space-x-2">
            <ThemeToggle />
            <Link
              to="/get-started"
              className="hidden lg:flex px-5 py-2 rounded-full font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50"
            >
              Get Started
            </Link>
            
            {/* User Avatar & Dropdown Container with Ref */}
            <div ref={dropdownRef} className="relative flex items-center ml-2">
              <button 
                type="button"
                onClick={() => setUserOpen(!userOpen)} 
                aria-expanded={userOpen}
                aria-haspopup="true"
                aria-label="Toggle user menu"
                className="focus:outline-none hover:opacity-80 transition"
              >
                {user ? (
  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 p-[2px] shadow-md">
    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-900">
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.name || "Student"
        )}&background=dbeafe&color=1e3a8a&bold=true&font-size=0.5&length=2`}
        alt={`${user?.name}'s avatar`}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
) : (
  <UserRound className="w-6 h-6 text-blue-500 dark:text-pink-400" aria-hidden="true" />
)}
              </button>
              
              {/* User Dropdown */}
              {userOpen && (
                <div 
                  className="absolute right-0 top-14 w-56 bg-[#f0fdf4] dark:bg-gray-800 border dark:border-gray-700 rounded-tr-2xl rounded-bl-2xl shadow-xl overflow-hidden z-50"
                  role="menu"
                >
                  <div className="px-4 py-3 border-b dark:border-gray-700 bg-green-50/30 dark:bg-gray-800/50">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate" title={user?.name}>
                      {user?.name || "Student"}
                    </p>
                    <p className="text-xs font-medium text-gray-500 truncate" title={user?.email}>
                      {user?.email || "Guest"}
                    </p>
                  </div>
                  <ul className="text-sm font-medium dark:text-gray-300" role="none">
                    <li role="none">
                      <Link to="/profile" role="menuitem" onClick={() => setUserOpen(false)} className="block px-4 py-2 hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">
                        Profile
                      </Link>
                    </li>
                    <li role="none">
                      <Link to="/reset-password" role="menuitem" onClick={() => setUserOpen(false)} className="block px-4 py-2 hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">
                        Reset Password
                      </Link>
                    </li>
                    <li role="none">
                      <Link to="/settings" role="menuitem" onClick={() => setUserOpen(false)} className="block px-4 py-2 hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">
                        Settings
                      </Link>
                    </li>
                    <li role="none">
                      <button type="button" role="menuitem" onClick={handleLogout} className="w-full text-left font-bold block px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center lg:p-2 ml-2 p-0 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              {/* Sidebar */}
              <div className="absolute font-medium right-0 top-0 h-full w-1/2 bg-[linear-gradient(180deg,#ffe8d6,#ffd7bc)] dark:bg-[linear-gradient(180deg,#0b1220,#071025)] shadow-lg p-6 flex flex-col items-center justify-center space-y-6">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:text-gray-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-gray-800 ${isActive ? "text-orange-700 bg-white/70 dark:text-orange-500 dark:bg-gray-800" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    {link.icon && <link.icon className="w-5 h-5 m-2" />}
                    {link.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/get-started"
                  className="px-6 py-4 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </NavLink>
                {/* logo */}
                <Logo2 />
              </div>
            </div>
          )}
          
          {/* Desktop nav */}
          <div className="hidden lg:flex lg:w-auto lg:order-1 lg:shadow-none">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navLinks.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:text-gray-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-gray-800 hover:bg-slate-100 ${isActive ? "text-orange-700 dark:text-orange-500 bg-slate-100 dark:bg-gray-800" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    {link.icon && <link.icon className="w-5 h-5 mr-2" />} 
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}