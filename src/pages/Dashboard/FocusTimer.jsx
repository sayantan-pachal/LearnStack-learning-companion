/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Coffee } from 'lucide-react';

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'

  // Ref to hold the audio object so we can play/pause it seamlessly
  // Using a clean, professional notification beep from Google's free sound library
  const alarmSound = useRef(new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'));

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      
      // Play the sound when the timer finishes
      alarmSound.current.play().catch((err) => console.log("Audio play prevented by browser:", err));
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Helper function to stop the alarm if it's currently ringing
  const stopAlarm = () => {
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
  };

  const toggleTimer = () => {
    stopAlarm(); // Stop ringing if user clicks play/pause
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    stopAlarm();
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode) => {
    stopAlarm();
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  // Format time (e.g., 25:00)
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  // Calculate progress percentage for the ring/bar
  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[1.25rem] sm:rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden group">
      
      {/* Decorative Glow */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800`}>
        <div 
          className={`h-full transition-all duration-1000 ${mode === 'focus' ? 'bg-theme-blue-500' : 'bg-emerald-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between mb-6 pt-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${mode === 'focus' ? 'bg-theme-blue-50 dark:bg-theme-blue-500/10 text-theme-blue-600' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600'}`}>
            {mode === 'focus' ? <Timer className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
          </div>
          <h3 className="font-black text-gray-900 dark:text-white text-sm sm:text-base">
            {mode === 'focus' ? 'Focus Session' : 'Short Break'}
          </h3>
        </div>
        
        {/* Mode Toggles */}
        <div className="flex bg-gray-100 dark:bg-[#111] rounded-lg p-1">
          <button 
            onClick={() => switchMode('focus')}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'focus' ? 'bg-white dark:bg-gray-800 text-theme-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Focus
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'break' ? 'bg-white dark:bg-gray-800 text-emerald-500 shadow-sm' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Break
          </button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center py-4">
        <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight tabular-nums mb-6">
          {minutes}:{seconds}
        </h1>
        
        {/* Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={resetTimer}
            className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#111] flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button 
            onClick={toggleTimer}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${mode === 'focus' ? 'bg-theme-blue-600 hover:bg-theme-blue-700 hover:shadow-theme-blue-500/20' : 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-emerald-500/20'}`}
          >
            {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
        </div>
      </div>

    </div>
  );
}