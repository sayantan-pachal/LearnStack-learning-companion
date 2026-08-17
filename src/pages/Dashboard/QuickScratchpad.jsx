import React, { useState, useEffect } from 'react';
import { Edit3, CheckCircle2 } from 'lucide-react';

export default function QuickScratchpad() {
  const [note, setNote] = useState(() => localStorage.getItem("learnstack_scratchpad") || "");
  const [saved, setSaved] = useState(false);

  // Auto-save logic with debounce (waits 500ms after you stop typing to save)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("learnstack_scratchpad", note);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000); // Hide checkmark after 2 seconds
    }, 500); 
    
    return () => clearTimeout(timeoutId);
  }, [note]);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[1.25rem] sm:rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col h-[350px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center">
            <Edit3 className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
          </div>
          <h3 className="font-black text-gray-900 dark:text-white text-sm sm:text-base">Quick Scratchpad</h3>
        </div>
        
        {/* Animated Saved Indicator */}
        <div className={`flex items-center gap-1 text-[10px] font-bold text-green-500 transition-opacity duration-300 ${saved ? 'opacity-100' : 'opacity-0'}`}>
          <CheckCircle2 className="w-3 h-3" /> Saved
        </div>
      </div>
      
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Paste a code snippet, URL, or quick idea here... It auto-saves!"
        className="w-full flex-1 resize-none bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-xl p-4 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-theme-blue-500/30 transition-all scrollbar-thin"
      />
    </div>
  );
}