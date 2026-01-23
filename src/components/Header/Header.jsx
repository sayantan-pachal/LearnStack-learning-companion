import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, BookOpen, Compass, Trophy, Users, Home } from 'lucide-react';
import { Link, NavLink } from "react-router-dom";
// import Logo from "../../../public/lo";
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/resources", label: 'Resources', icon: BookOpen },
    { to: "/learningpaths", label: 'Learning Paths', icon: Compass },
    { to: "/achievements", label: 'Achievements', icon: Trophy },
    { to: "/community", label: 'Community', icon: Users },
  ];

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={"shadow rounded-full fixed top-5 left-10 right-10 z-50 transition-all duration-300  bg-white/40 lg:backdrop-blur-sm dark:bg-gray-900/60"}>
      <nav className="px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            {/* <Logo /> */}
            <div className="flex items-center space-x-2">
              {/* <div className="w-10 h-10 rounded-lg flex items-center justify-center
                                  bg-gradient-to-br from-blue-500 to-indigo-600
                                  dark:from-purple-500 dark:to-pink-500">
                <BookOpen className="w-6 h-6 text-white" />
              </div> */}
              <img src="/logo1.png" alt="LearnStack Logo" className="w-10 h-10" />

              <span className="text-xl font-bold text-gray-900 dark:text-white">
                LearnStack
              </span>
            </div>
          </Link>
          <div className="flex items-center lg:order-2">
            <ThemeToggle />
            <Link
              to="/get-started"
              className="hidden lg:flex px-5 py-2 rounded-full font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50"
            >
              Get Started
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center lg:p-2 mr-0 p-0 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {isOpen ? <X className="w-6 h-6" />
                : <Menu className="w-6 h-6" />}
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
                  >{link.icon && <link.icon className="w-5 h-5 m-2" />}{link.label} </NavLink>
                ))}
                <NavLink
                  to="/get-started"
                  className="px-10 py-4 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50"
                >
                  Get Started
                </NavLink>
                <div className="flex items-center space-x-2">
                  <img src="/logo1.png" alt="LearnStack Logo" className="w-10 h-10" />
                  <span className="flex flex-col items-center font-bold text-gray-900 dark:text-white leading-tight">
                    <span className="text-xl">
                      LearnStack
                    </span>
                    <span className="text-[11px] max-[900px]:text-[8px] text-gray-600 dark:text-gray-300 -mt-1">
                      v.0.9.0
                    </span>
                  </span>
                </div>
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
                    className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:text-gray-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-gray-800 ${isActive ? "text-orange-700 dark:text-orange-500 bg-white/70 dark:bg-gray-800" : "text-gray-700 dark:text-gray-300"}`}
                  >{link.icon && <link.icon className="w-5 h-5 mr-2" />} {link.label} </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}