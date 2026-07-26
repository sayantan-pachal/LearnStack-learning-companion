import React, { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Compass, Trophy, ChevronRight, Sparkles, LayoutDashboard, Menu, X, Github, 
  Linkedin, Twitter, UserPlus, LogIn, Star, Quote, CheckCircle2, Zap, Target } from "lucide-react";

import { Link } from "react-router-dom";
import Logo1 from "../../../public/Logo1"
import Logo2 from "../../../public/Logo2"
import ThemeToggle from "../../components/Header/ThemeToggle";

// --- HEADER COMPONENT ---
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 py-4 shadow-sm"
          : "bg-transparent py-6"
        }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <Logo1 />

        {/* Navigation Cluster: Toggle is always visible, links hide on mobile */}
        <div className="flex items-center gap-4 md:gap-8 text-sm font-semibold">

          {/* Always Visible Theme Toggle */}
          <ThemeToggle />

          {/* Desktop Navigation Links */}
          <a href="#about" className="hidden md:flex text-gray-500 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
            About
          </a>
          <a href="#features" className="hidden md:flex text-gray-500 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
            Features
          </a>
          <Link to="/login" className="hidden md:flex text-gray-900 dark:text-white hover:text-blue-600 hover:opacity-70 transition-opacity">
            Sign In
          </Link>

          <Link to="/signup" className="hidden md:flex group relative px-6 py-2.5 hover:dark:text-white bg-gray-900 dark:bg-white text-white dark:text-black rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all">
            <div className="absolute inset-0 w-full h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            <span className="relative z-10 flex items-center gap-2">
              Get Started <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- FOOTER COMPONENT ---
const Footer = () => {
  return (
    <footer className="max-w-7xl md:ml-10 px-6 pb-12 pt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">

        <Logo2 />

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-500 dark:text-gray-400">
          <a href="#about" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">About</a>
          <a href="#features" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">Features</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">Terms of Service</a>
        </div>

        {/* Social Icons styled as the requested buttons */}
        <div className="flex gap-4">
          {[
            { icon: Github, link: "https://github.com/sayantan-pachal", label: "GitHub Profile" },
            { icon: Linkedin, link: "https://linkedin.com/in/sayantan-pachal", label: "LinkedIn Profile" },
            { icon: Twitter, link: "#", label: "Twitter Profile" }
          ].map((social, i) => (
            <a
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-400 hover:text-blue-600 hover:border-blue-600 dark:hover:text-purple-400 dark:hover:border-purple-400 transition-all shadow-sm"
            >
              <social.icon className="w-4 h-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
        © {new Date().getFullYear()} LEARNSTACK. BUILT BY SAYANTAN PACHAL. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

// --- MAIN HOME COMPONENT ---
function Home() {

  const advantages = [
    {
      icon: BookOpen,
      title: "Centralize Your Semester",
      desc: "Stop hunting for lost PDFs and bookmarked YouTube tutorials. Keep all your department notes and coding resources in one organized hub."
    },
    {
      icon: Target,
      title: "Structured Learning Paths",
      desc: "Don't know what to learn next? Follow our curated, step-by-step roadmaps designed specifically for engineering and tech students."
    },
    {
      icon: Zap,
      title: "Track Your Consistency",
      desc: "Build unbreakable study habits. Log your activity, track your course progress, and maintain your weekly learning streaks."
    }
  ];

  const reviews = [
    {
      name: "Rahul S.",
      role: "CSE Student",
      text: "LearnStack completely changed how I prepare for exams. Having all my Data Structures videos and PDF notes in one dashboard is a lifesaver.",
      rating: 5
    },
    {
      name: "Priya M.",
      role: "Self-taught Developer",
      text: "The learning paths are incredible. It cuts out the noise of YouTube algorithms and just gives me exactly what I need to practice next.",
      rating: 5
    },
    {
      name: "Aman K.",
      role: "Tech Enthusiast",
      text: "The UI is gorgeous and the dark mode is perfect for late-night coding sessions. Built by a student who actually understands the struggle!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-dm bg-[#FAFAFA] dark:bg-[#050505] text-gray-900 dark:text-gray-100 overflow-hidden selection:bg-blue-500 selection:text-white">
      <Header />

      <main className="flex-grow pt-32 pb-24 px-4 relative">

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-purple-900/10 pointer-events-none -z-10" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 dark:bg-purple-600/20 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-400/20 dark:bg-pink-600/20 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-blue-600 dark:text-blue-400 text-sm font-semibold mb-8 hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Built for Students, by a Student
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 dark:text-white tracking-tight leading-[1.1]">
            Learn smarter with <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500 dark:from-blue-700 dark:to-pink-500">
                LearnStack
              </span><div
                className="-bottom-2 left-0 w-full h-3 -z-10 -rotate-1
             bg-gradient-to-r
             from-blue-500/15
             via-blue-500/45
             to-blue-500/15
             dark:from-blue-500/20
             dark:via-blue-500/60
             dark:to-blue-500/20"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-6 font-medium text-gray-700 dark:text-gray-300">
            Your unified learning and resource companion 🚀
          </p>

          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
            Stop losing track of YouTube tutorials, PDFs, and coding guides. LearnStack brings everything into one structured platform so you can focus on what actually matters: learning.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-white text-lg
                         bg-gradient-to-r from-blue-600 to-indigo-600 
                         hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5
                         dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/30
                         transition-all duration-300"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg
                         text-gray-800 dark:text-gray-200
                         bg-white dark:bg-gray-900 
                         border border-gray-200 dark:border-gray-800
                         hover:bg-gray-50 dark:hover:bg-gray-800 hover:-translate-y-0.5
                         transition-all duration-300 shadow-sm"
            >
              How it Works
            </a>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="mt-32 max-w-5xl mx-auto px-4 scroll-mt-24">
          <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What is LearnStack?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                As a computer science engineering student, keeping track of scattered coding tutorials, semester notes, and practice platforms can get overwhelming.
                LearnStack was built to solve this exact problem.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300"><strong>Unified Database:</strong> One central hub for all your college semester notes, PDFs, and video tutorials.</span>
                </li>
                <li className="flex items-start gap-3">
                  <LayoutDashboard className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300"><strong>Personalized Dashboard:</strong> Create an account to log your learning activity and track your progress over time.</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-square max-w-sm mx-auto bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-purple-900/40 dark:to-blue-900/40 rounded-3xl p-6 shadow-inner relative overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="absolute top-10 left-10 w-32 h-10 bg-white/60 dark:bg-black/40 rounded-lg backdrop-blur-md"></div>
                <div className="absolute top-24 left-10 w-48 h-10 bg-white/60 dark:bg-black/40 rounded-lg backdrop-blur-md"></div>
                <div className="absolute top-10 right-10 w-16 h-16 bg-blue-500/20 rounded-full backdrop-blur-md"></div>
                <div className="absolute bottom-10 left-10 w-[80%] h-32 bg-white/80 dark:bg-black/60 rounded-xl backdrop-blur-md border border-white/20 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <div id="features" className="mt-32 max-w-6xl mx-auto scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powerful tools designed specifically for students and self-taught developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            <div className="group relative bg-white dark:bg-[#0a0a0a] rounded-[2rem] p-8 border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-blue-500/50 transition-colors shadow-sm">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500" aria-hidden="true">
                <BookOpen className="w-32 h-32 text-blue-600" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" aria-hidden="true">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">Curated Resources</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Filter through high-quality study materials, video tutorials, and guides systematically selected by department and semester.
                </p>
              </div>
            </div>

            <div className="group relative bg-white dark:bg-[#0a0a0a] rounded-[2rem] p-8 border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-indigo-500/50 transition-colors shadow-sm">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500" aria-hidden="true">
                <Compass className="w-32 h-32 text-indigo-600" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" aria-hidden="true">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">Guided Paths</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Stop wondering what to learn next. Follow step-by-step learning roadmaps explicitly designed for structured technical growth.
                </p>
              </div>
            </div>

            <div className="group relative bg-white dark:bg-[#0a0a0a] rounded-[2rem] p-8 border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-purple-500/50 transition-colors shadow-sm">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500" aria-hidden="true">
                <Trophy className="w-32 h-32 text-purple-600" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400" aria-hidden="true">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">Accountability</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Create an account to securely log your activity, track exactly what you’ve accomplished, and view your personalized progress dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>


      <div className="pb-24 bg-[#FAFAFA] dark:bg-[#050505] font-dm overflow-hidden relative">

        {/* Background Blurs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-purple-900/10 pointer-events-none -z-10" />
        <div className="absolute top-40 -left-20 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-60 -right-20 w-96 h-96 bg-indigo-400/20 dark:bg-pink-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto">

          {/* --- HERO & AUTH WIDGETS --- */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white tracking-tight leading-[1.1]">
              Ready to upgrade your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-400 dark:to-pink-500">
                study routine?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Join the platform that helps students organize the chaos of self-learning. Choose your path below to enter LearnStack.
            </p>

            {/* Auth Action Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">

              {/* Sign Up Widget */}
              <div className="relative group bg-white dark:bg-[#0a0a0a] p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">New Here?</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Create your free account to save resources, track your progress, and build your dashboard.
                  </p>
                  <Link
                    to="/signup"
                    className="w-full inline-flex justify-center items-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                  >
                    Create Account <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Sign In Widget */}
              <div className="relative group bg-white dark:bg-[#0a0a0a] p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                    <LogIn className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Already have an account? Sign in to pick up right where you left off.
                  </p>
                  <Link
                    to="/login"
                    className="w-full inline-flex justify-center items-center gap-2 py-3.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold rounded-xl transition-colors"
                  >
                    Sign In <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* --- ADVANTAGES SECTION --- */}
          <div className="mt-32">
            <div className="text-center mb-12">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 block">Why LearnStack?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Built for the modern student</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((adv, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-center mb-6">
                    <adv.icon className="w-8 h-8 text-blue-600 dark:text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{adv.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* --- REVIEWS / SOCIAL PROOF --- */}
          <div className="mt-32 bg-white/40 dark:bg-[#0a0a0a]/40 border border-gray-200 dark:border-gray-800 rounded-[3rem] p-8 md:p-16 backdrop-blur-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Don't just take our word for it</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <div key={i} className="bg-white dark:bg-[#121212] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative">
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-100 dark:text-gray-800" />

                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 font-medium mb-8 relative z-10">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center text-blue-700 dark:text-purple-300 font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">{review.name}</h4>
                      <p className="text-xs text-gray-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;