import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Scale, ShieldCheck, Info, ArrowLeft } from 'lucide-react'; // ✨ Added ArrowLeft
import Terms from './Terms';
import Privacy from './Privacy';

export default function Legal() {
    const { hash } = useLocation();

    // Handles automatic smooth scrolling if a hash (e.g., #privacy) is in the URL
    useEffect(() => {
        if (hash) {
            // Remove the '#' to match the div IDs
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Slight delay ensures the DOM is fully rendered before scrolling
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <div className="pt-9 lg:pt-14 px-4 pb-24 min-h-screen bg-[#f8f9fa] dark:bg-[#050505] font-dm">
            <div className="max-w-[1200px] mx-auto animate-in fade-in zoom-in-95 duration-500">
                
                {/* ✨ NEW: Back to Dashboard Button */}
                <div className="mb-6">
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
                        Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-blue-600 to-theme-pink-500">Center</span>
                    </h1>
                    <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Everything you need to know about your rights, our responsibilities, and how we handle your data at LearnStack.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 relative">
                    
                    {/* LEFT SIDEBAR: Sticky Navigation */}
                    <div className="w-full lg:w-64 shrink-0">
                        <div className="lg:sticky lg:top-32 space-y-2 bg-white dark:bg-[#0a0a0a] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-3">Quick Links</h4>
                            
                            <Link 
                                to="#terms" 
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                    hash === '' || hash === '#terms' 
                                    ? 'bg-theme-blue-50 text-theme-blue-600 dark:bg-theme-blue-500/10 dark:text-theme-blue-400' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#111]'
                                }`}
                            >
                                <Scale className="w-4 h-4" /> Terms & Conditions
                            </Link>

                            <Link 
                                to="#privacy" 
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                    hash === '#privacy' 
                                    ? 'bg-theme-pink-50 text-theme-pink-600 dark:bg-theme-pink-500/10 dark:text-theme-pink-400' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#111]'
                                }`}
                            >
                                <ShieldCheck className="w-4 h-4" /> Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Main Content */}
                    <div className="flex-1 bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none p-6 sm:p-10 lg:p-12">
                        
                        <div className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-start gap-3 mb-10">
                            <Info className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                Please read these documents carefully. By accessing or using our services, you agree to be bound by our terms and consent to our privacy practices.
                            </p>
                        </div>

                        {/* Rendering the modular components */}
                        <div className="space-y-20">
                            <Terms />
                            
                            {/* Visual separator between the two sections */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
                            
                            <Privacy />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}