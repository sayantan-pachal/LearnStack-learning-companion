import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

export default function GitHubHeatmap({ githubUrl }) {
  
  // Helper function to smartly extract JUST the username, no matter what the user pasted
  const extractUsername = (url) => {
    if (!url || typeof url !== 'string') return null;
    
    // Remove trailing slashes, http://, https://, and github.com/
    let cleanUrl = url.trim().replace(/\/+$/, "");
    cleanUrl = cleanUrl.replace(/^(https?:\/\/)?(www\.)?github\.com\//i, '');
    
    // If there are still slashes (e.g. they pasted a repo link), just grab the first part (the user)
    const parts = cleanUrl.split('/');
    return parts[0] || null;
  };

  const username = extractUsername(githubUrl);

  // EMPTY STATE: If they clicked "I don't have an account" during signup
  if (!username) {
    return (
      <div className="bg-white dark:bg-[#0a0a0a] border border-dashed border-gray-300 dark:border-gray-800 rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center h-[200px]">
         <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-[#111] flex items-center justify-center mb-3">
            <Github className="w-6 h-6 text-gray-400" />
         </div>
         <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1">No GitHub Linked</h3>
         <p className="text-xs font-medium text-gray-500 max-w-[250px]">
            Update your profile with your GitHub link to see your daily activity heatmap here.
         </p>
      </div>
    );
  }

  // ACTIVE STATE: User has a GitHub linked
  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[1.5rem] sm:rounded-3xl p-5 sm:p-6 shadow-sm overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-[#111] flex items-center justify-center text-gray-900 dark:text-white">
            <Github className="w-4 h-4" />
          </div>
          <h3 className="font-black text-gray-900 dark:text-white text-sm sm:text-base">GitHub Activity</h3>
        </div>
        <a 
          href={`https://github.com/${username}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] sm:text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1 bg-gray-50 dark:bg-[#111] px-2.5 py-1.5 rounded-md"
        >
          @{username} <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      
      {/* 
         The API allows us to pass a hex color code. We are using '3b82f6' which is the standard Tailwind Blue-500. 
         We use overflow-x-auto so it scrolls nicely on mobile phones!
      */}
      <div className="w-full overflow-x-auto scrollbar-hide pb-2">
        <img 
          src={`https://ghchart.rshah.org/3b82f6/${username}`} 
          alt={`${username}'s GitHub Heatmap`}
          className="min-w-[700px] w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 dark:invert dark:hue-rotate-[180deg] dark:contrast-125" 
        />
      </div>
    </div>
  );
}