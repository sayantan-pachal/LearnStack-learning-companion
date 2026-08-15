import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ThemeToggle from "../Header/ThemeToggle";

export default function Auth() {
    // Modes: 'login', 'signup', 'forgot'
    const [authMode, setAuthMode] = useState('login');

    // Determine which side is active based on mode
    const isRightPanelActive = authMode === 'login' || authMode === 'forgot';

    return (
        <div className="relative min-h-[100dvh] flex items-center justify-center p-4 sm:p-6 bg-auth-bg1 dark:bg-auth-bg2 bg-cover bg-center font-dm text-[#111] dark:text-gray-100">
            <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-sm pointer-events-none" />

            {/* THEME TOGGLE */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
                <ThemeToggle />
            </div>

            <div className="relative z-10 w-full max-w-4xl h-auto md:h-[600px] max-h-[95dvh] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col md:flex-row">
                
                {/* ========================================================= */}
                {/* LEFT SIDE: SIGNUP FORM */}
                {/* ========================================================= */}
                <div className={`hidden md:flex absolute top-0 left-0 w-1/2 h-full z-10 items-center justify-center p-8 transition-all duration-[800ms] ease-in-out ${
                    !isRightPanelActive ? 'opacity-100 brightness-100 scale-100 delay-100' : 'opacity-0 brightness-50 scale-95 pointer-events-none'
                }`}>
                    {/* Only render Signup when active to prevent hidden form tabbing */}
                    {!isRightPanelActive && <Signup onSwitchMode={() => setAuthMode('login')} />}
                </div>

                {/* ========================================================= */}
                {/* RIGHT SIDE: LOGIN OR FORGOT PASSWORD */}
                {/* ========================================================= */}
                <div className={`hidden md:flex absolute top-0 right-0 w-1/2 h-full z-10 items-center justify-center p-8 transition-all duration-[800ms] ease-in-out ${
                    isRightPanelActive ? 'opacity-100 brightness-100 scale-100 delay-100' : 'opacity-0 brightness-50 scale-95 pointer-events-none'
                }`}>
                    {authMode === 'login' && (
                        <Login 
                            onSwitchMode={() => setAuthMode('signup')} 
                            onForgotClick={() => setAuthMode('forgot')} 
                        />
                    )}
                    {authMode === 'forgot' && (
                        <ForgotPassword onBackToLogin={() => setAuthMode('login')} />
                    )}
                </div>
                {/* ========================================================= */}
                {/* DESKTOP VIEW: SLIDING IMAGE PANEL */}
                {/* ========================================================= */}
                <div className={`hidden md:block absolute top-0 left-0 w-1/2 h-full z-30 transition-transform duration-[1800ms] cubic-bezier(0.4, 0, 0.2, 1) shadow-2xl ${
                    isRightPanelActive ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <img 
                        src="/error.svg" 
                        alt="LearnStack Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* ========================================================= */}
                {/* MOBILE VIEW: Responsive Stack */}
                {/* ========================================================= */}
                <div className="md:hidden w-full h-full relative z-20 flex flex-col items-center justify-center p-5 sm:p-8 overflow-y-auto scrollbar-hide">
                    <div className="w-full flex justify-center py-4">
                        {authMode === 'login' && (
                            <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
                                <Login onSwitchMode={() => setAuthMode('signup')} onForgotClick={() => setAuthMode('forgot')} />
                            </div>
                        )}
                        {authMode === 'signup' && (
                            <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
                                <Signup onSwitchMode={() => setAuthMode('login')} />
                            </div>
                        )}
                        {authMode === 'forgot' && (
                            <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
                                <ForgotPassword onBackToLogin={() => setAuthMode('login')} />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}