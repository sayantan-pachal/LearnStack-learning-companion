
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, BookOpen, Compass, Trophy, Users } from 'lucide-react';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark" // default dark
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [theme]);

  const navItems = [
    { name: 'Resources', icon: BookOpen },
    { name: 'Learning Paths', icon: Compass },
    { name: 'Achievements', icon: Trophy },
    { name: 'Community', icon: Users },
  ];

  return (
    <header
  className={`rounded-full fixed top-5 left-10 right-10 z-50 transition-all duration-300
    ${scrolled
      ? 'bg-white/70 backdrop-blur-md shadow-lg dark:bg-gray-900/80 dark:shadow-black/20'
      : 'bg-white/40 backdrop-blur-sm dark:bg-gray-900/60'
    }
  `}
>
  <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center
          bg-gradient-to-br from-blue-500 to-indigo-600
          dark:from-purple-500 dark:to-pink-500">
          <BookOpen className="w-6 h-6 text-white" />
        </div>

        <span className="text-xl font-bold text-gray-900 dark:text-white">
          LearnStack
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              flex items-center space-x-2
              text-gray-700 hover:text-gray-900 hover:bg-white/60
              dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
          >
            <item.icon className="w-4 h-4" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="rounded-full shadow-md transition-colors duration-300
            bg-gray-200 hover:bg-gray-300 text-gray-800
            dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white
            lg:px-2.5 lg:py-2.5 mr-2"
        >
          {theme === 'dark'
            ? <Sun className="w-5 h-5 text-yellow-400" />
            : <Moon className="w-5 h-5 text-gray-600" />
          }
        </button>

        {/* Get Started */}
        <button
          className="hidden md:block px-5 py-2 rounded-lg font-medium transition-all duration-200
            bg-gradient-to-r from-blue-500 to-indigo-600 text-white
            hover:shadow-lg hover:shadow-blue-500/50
            dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50"
        >
          Get Started
        </button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg
            text-gray-700 hover:bg-white/60
            dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {mobileMenuOpen
            ? <X className="w-6 h-6" />
            : <Menu className="w-6 h-6" />
          }
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="md:hidden py-4 rounded-lg mt-2 mb-2
        bg-white/50 backdrop-blur-md
        dark:bg-gray-800/50"
      >
        {navItems.map((item) => (
          <button
            key={item.name}
            className="w-full px-4 py-3 text-left transition-colors
              flex items-center space-x-3
              text-gray-700 hover:bg-white/60 hover:text-gray-900
              dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}

        <button
          className="w-full mx-4 mt-3 px-4 py-2 rounded-lg font-medium
            bg-gradient-to-r from-blue-500 to-indigo-600 text-white
            dark:from-purple-500 dark:to-pink-500"
        >
          Get Started
        </button>
      </div>
    )}
  </nav>
</header>

  )
}

export default Header