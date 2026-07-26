/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, BookOpen, Compass, Trophy, Users, Home, UserRound, Shapes } from 'lucide-react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo1 from "../../../public/Logo1";
import Logo2 from "../../../public/Logo2"; // Assuming this is a stacked/mobile logo
import ThemeToggle from "./ThemeToggle";
import { useToast } from "../Other/ToastContext";
import { account } from "../../appwrite/config";

export default function Header() {
  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/learningpaths", label: "Learning Paths", icon: Compass },
    { to: "/resources", label: "Resources", icon: BookOpen },
    { to: "/community", label: "Community", icon: Users },
    { to: "/courses", label: "Courses", icon: Shapes}
  ];
  
  const userLinks = [
    { to: "/profile", label: "My Profile" },
    { to: "/mycourses", label: "My Courses" },
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
      await account.deleteSession('current');
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
    <header className="shadow-sm rounded-full fixed top-2 left-3 right-3 lg:top-5 lg:left-10 lg:right-10 z-[100] transition-all duration-300 bg-white/70 lg:backdrop-blur-md dark:bg-black/60 border border-gray-200/50 dark:border-gray-800/50">
      <nav className="px-3 py-2 lg:px-6 lg:py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          
          <Link to="/" className="flex items-center">
            <Logo1 />
          </Link>
          
          <div className="flex items-center lg:order-2 space-x-2 lg:space-x-4">
            <ThemeToggle />
            
            {/* Conditional Auth Rendering */}
            {user ? (
              // Logged In: Show Avatar Dropdown
              <div ref={dropdownRef} className="relative flex items-center">
                <button 
                  type="button"
                  onClick={() => setUserOpen(!userOpen)} 
                  aria-expanded={userOpen}
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 p-[2px] shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#0a0a0a]">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "Student")}&background=dbeafe&color=2563eb&bold=true&font-size=0.4&length=2`}
                        alt={`${user.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </button>
                
                {/* User Dropdown Menu */}
                {userOpen && (
                  <div 
                    className="absolute right-0 top-12 lg:top-14 w-56 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2"
                    role="menu"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/[0.02]">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs font-medium text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <ul className="text-sm font-medium dark:text-gray-300 py-1" role="none">
                      {userLinks.map((link) => (
                        <li key={link.to} role="none">
                          <Link to={link.to} onClick={() => setUserOpen(false)} className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                      <div className="h-[1px] bg-gray-100 dark:bg-gray-800 my-1"></div>
                      <li role="none">
                        <button type="button" onClick={handleLogout} className="w-full text-left font-bold block px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              // Logged Out: Show Sign In / Get Started
              <div className="hidden lg:flex items-center gap-4">
                <Link to="/login" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Sign In
                </Link>
                <Link
                  to="/getstarted"
                  className="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/30"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-1.5 ml-1 lg:hidden text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
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
              <div className="absolute right-0 top-0 h-full w-[75%] sm:w-1/2 bg-[#FAFAFA] dark:bg-[#050505] border-l border-gray-200 dark:border-gray-800 shadow-2xl p-6 flex flex-col items-center justify-center space-y-6 overflow-y-auto animate-in slide-in-from-right-full">
                
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `w-full px-4 py-3 rounded-2xl text-base font-bold transition-all duration-200 flex items-center space-x-3 hover:text-blue-600 dark:hover:text-purple-400 hover:bg-blue-50 dark:hover:bg-white/[0.02] ${
                      isActive 
                        ? "text-blue-600 bg-blue-50 dark:text-purple-400 dark:bg-white/[0.05] shadow-sm" 
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {link.icon && <link.icon className="w-5 h-5" />}
                    <span>{link.label}</span>
                  </NavLink>
                ))}
                
                {/* Mobile CTA (Only show if logged out) */}
                {!user && (
                  <div className="w-full pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                    <Link
                      to="/login"
                      className="flex justify-center w-full px-6 py-3 rounded-2xl text-base font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/getstarted"
                      className="flex justify-center w-full px-6 py-3 rounded-2xl text-base font-bold transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 dark:from-purple-500 dark:to-pink-500"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
                
                <div className="mt-auto pt-8 scale-90 opacity-50">
                  <Logo2 />
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop Nav Links */}
          <div className="hidden lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-row space-x-2 xl:space-x-4 font-medium">
              {navLinks.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-purple-400 dark:hover:bg-gray-800/50 ${
                      isActive 
                        ? "text-blue-600 bg-blue-50 dark:text-purple-400 dark:bg-gray-800/50" 
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />} 
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