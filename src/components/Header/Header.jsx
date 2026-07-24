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
    { to: "/learningpaths", label: "Learning Paths", icon: Compass },
    { to: "/resources", label: "Resources", icon: BookOpen },
    { to: "/community", label: "Community", icon: Users },
  ];
  
  const userLinks = [
    { to: "/profile", label: "My Profile" },
    { to: "/courses", label: "My Courses" },
    { to: "/achievements", label: "My Achievements" },
    { to: "/settings", label: "Account Settings" }, 
    { to: "/resetpassword", label: "Reset Password" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  
  const dropdownRef = useRef(null); 
  const showToast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { 
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

    if (userOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userOpen]);

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
    <header className="shadow rounded-full fixed top-2 left-3 right-3 lg:top-5 lg:left-10 lg:right-10 z-50 transition-all duration-300 bg-white/40 lg:backdrop-blur-sm dark:bg-gray-900/60">
      <nav className="px-3 py-2 lg:px-6 lg:py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          
          <Link to="/" className="flex items-center">
            <Logo1 />
          </Link>
          
          <div className="flex items-center lg:order-2 space-x-2 lg:space-x-3">
            <ThemeToggle />
            
            <Link
              to="/getstarted"
              className="hidden lg:flex px-4 py-2 lg:px-5 lg:py-2.5 rounded-full text-sm lg:text-base font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50"
            >
              Get Started
            </Link>
            
            {/* User Avatar & Dropdown */}
            <div ref={dropdownRef} className="relative flex items-center">
              <button 
                type="button"
                onClick={() => setUserOpen(!userOpen)} 
                aria-expanded={userOpen}
                className="focus:outline-none hover:opacity-80 transition"
              >
                {user ? (
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 p-[2px] shadow-md">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-900">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Student")}&background=dbeafe&color=1e3a8a&bold=true&font-size=0.5&length=2`}
                        alt={`${user?.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <UserRound className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500 dark:text-pink-400" />
                )}
              </button>
              
              {/* User Dropdown */}
              {userOpen && (
                <div 
                  className="absolute right-0 top-12 lg:top-14 w-56 bg-[#f0fdf4] dark:bg-gray-800 border dark:border-gray-700 rounded-tr-2xl rounded-bl-2xl shadow-xl overflow-hidden z-50"
                  role="menu"
                >
                  <div className="px-4 py-3 border-b dark:border-gray-700 bg-green-50/30 dark:bg-gray-800/50">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {user?.name || "Student"}
                    </p>
                    <p className="text-xs font-medium text-gray-500 truncate">
                      {user?.email || "Guest"}
                    </p>
                  </div>
                  <ul className="text-sm font-medium dark:text-gray-300" role="none">
                    {userLinks.map((link) => (
                      <li key={link.to} role="none">
                        <Link to={link.to} onClick={() => setUserOpen(false)} className="block px-4 py-2 hover:bg-green-100 dark:hover:bg-gray-700 transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li role="none">
                      <button type="button" onClick={handleLogout} className="w-full text-left font-bold block px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-1.5 ml-1 lg:hidden text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
              />
              {/* Responsive sidebar width: 75% on small phones, 50% on tablets */}
              <div className="absolute right-0 top-0 h-full w-[75%] sm:w-1/2 bg-[linear-gradient(180deg,#ffe8d6,#ffd7bc)] dark:bg-[linear-gradient(180deg,#0b1220,#071025)] shadow-2xl p-6 flex flex-col items-center justify-center space-y-6 overflow-y-auto">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `w-full px-4 py-3 rounded-2xl text-base font-bold transition-all duration-200 flex items-center space-x-3 hover:text-gray-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-gray-800 ${isActive ? "text-orange-700 bg-white/70 dark:text-orange-500 dark:bg-gray-800 shadow-sm" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    {link.icon && <link.icon className="w-5 h-5" />}
                    <span>{link.label}</span>
                  </NavLink>
                ))}
                
                <div className="w-full pt-4 border-t border-black/10 dark:border-white/10">
                  <NavLink
                    to="/get-started"
                    className="flex justify-center w-full px-6 py-4 rounded-2xl text-base font-bold transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 dark:from-purple-500 dark:to-pink-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </NavLink>
                </div>
                
                <div className="mt-auto pt-8 scale-90">
                  <Logo2 />
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop Nav Links */}
          <div className="hidden lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-row space-x-2 xl:space-x-6 font-medium">
              {navLinks.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `px-3 xl:px-4 py-2 rounded-full text-sm xl:text-base font-medium transition-all duration-200 flex items-center space-x-1.5 hover:text-gray-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-gray-800 ${isActive ? "text-orange-700 dark:text-orange-500 bg-slate-100 dark:bg-gray-800 shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
                  >
                    {link.icon && <link.icon className="w-4 h-4 xl:w-5 xl:h-5" />} 
                    <span>{link.label}</span>
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