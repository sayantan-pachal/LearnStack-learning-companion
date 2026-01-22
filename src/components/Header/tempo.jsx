import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, BookOpen, Compass, Trophy, Users } from 'lucide-react';
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import ThemeToggle from "./ThemeToggle"

export default function Header() {
    const navLinks = [
        { to: "/", label: "Home" },
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
        <header className="shadow rounded-full fixed top-5 left-10 right-10 z-50 transition-all duration-300">
            <nav className="bg-[linear-gradient(180deg,#ffe8d6,#ffd7bc)] px-4 lg:px-6 py-2.5 dark:bg-[linear-gradient(180deg,#0b1220,#071025)]">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <Logo />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <ThemeToggle />
                        <Link
                            to="/get-started"
                            className="hidden lg:flex px-5 py-2 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50"
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
                                        className={({ isActive }) =>
                                            `font-semibold transition-colors duration-200 ${isActive ? "text-orange-700 dark:text-orange-500" : "text-gray-700 dark:text-gray-300"} lg:hover:bg-transparent hover:text-orange-700 dark:hover:text-orange-500 lg:p-0`
                                        }
                                    >{link.icon && <link.icon className="w-5 h-5" />} {link.label} </NavLink>
                                ))}
                                <Link
                                    to="/get-started"
                                    className="font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50"
                                >
                                    Get Started
                                </Link>
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
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-white/60 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                                    >{link.icon && <link.icon className="w-5 h-5" />} {link.label} </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}