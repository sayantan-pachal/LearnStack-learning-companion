import React, { useState } from "react";
import { Headphones, ExternalLink, Play, Music } from "lucide-react";
import CustomDropdown from "../../components/Other/CustomDropdown";

// Clean curated list, removed the color properties
const playlist = [
  { id: 1, title: "Unstoppable", artist: "Sia", lang: "English", tag: "Motivation" },
  { id: 2, title: "Kar Har Maidan Fateh", artist: "Sukhwinder Singh", lang: "Hindi", tag: "Energy" },
  { id: 3, title: "Ekla Chalo Re", artist: "Kishore Kumar", lang: "Bengali", tag: "Resilience" },
  { id: 4, title: "Interstellar (Main Theme)", artist: "Hans Zimmer", lang: "Instrumental", tag: "Deep Focus" },
  { id: 5, title: "Aarambh Hai Prachand", artist: "Piyush Mishra", lang: "Hindi", tag: "Fire" },
  { id: 6, title: "Believer", artist: "Imagine Dragons", lang: "English", tag: "Power" },
  { id: 7, title: "Lakshya Theme", artist: "Shankar Ehsaan Loy", lang: "Hindi", tag: "Focus" },
  { id: 8, title: "Amra Korbo Joy", artist: "Hemanta Mukherjee", lang: "Bengali", tag: "Positivity" },
  { id: 9, title: "Lofi Hip Hop Radio", artist: "Lofi Girl", lang: "Instrumental", tag: "Study Flow" },
  { id: 10, title: "Remember The Name", artist: "Fort Minor", lang: "English", tag: "Grind" },
  { id: 11, title: "Zinda", artist: "Siddharth Mahadevan", lang: "Hindi", tag: "Energy" },
  { id: 12, title: "Aalo Amar Aalo", artist: "Rabindranath Tagore", lang: "Bengali", tag: "Calm" },
  { id: 13, title: "Lose Yourself", artist: "Eminem", lang: "English", tag: "Motivation" },
  { id: 14, title: "Chak De India", artist: "Sukhwinder Singh", lang: "Hindi", tag: "Victory" },
  { id: 15, title: "Cornfield Chase", artist: "Hans Zimmer", lang: "Instrumental", tag: "Deep Focus" },
];

const platformOptions = [
  { label: "YouTube", value: "youtube" },
  { label: "YouTube Music", value: "youtube music" },
  { label: "Spotify", value: "spotify" },
  { label: "Apple Music", value: "apple" },
  { label: "JioSaavn", value: "jiosaavn" }
];

export default function MusicApp() {
  const [platform, setPlatform] = useState("youtube");

  const getPlayLink = (title, artist) => {
    const query = encodeURIComponent(`${title} ${artist}`);
    switch (platform) {
      case "spotify":
        return `https://open.spotify.com/search/${query}`;
      case "apple":
        return `https://music.apple.com/us/search?term=${query}`;
      case "jiosaavn":
        return `https://www.jiosaavn.com/search/${query}`;
      case "youtube music":
        return `https://music.youtube.com/search?q=${query}`;
      case "youtube":
      default:
        return `https://www.youtube.com/results?search_query=${query}`;
    }
  };

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 flex flex-col h-full">
      
      {/* Top Bar - Z-50 keeps dropdown above the list */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-900 dark:text-white">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight leading-tight">Focus Hub</h3>
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Productivity Audio</p>
          </div>
        </div>

        {/* Platform Selector */}
        <div className="w-full sm:w-40 relative z-50">
          <CustomDropdown 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value)} 
            options={platformOptions} 
          />
        </div>
      </div>

      {/* Song List - Z-0 ensures it stays beneath the dropdown */}
      <div className="space-y-1 overflow-y-auto h-full scrollbar-thin pr-2 relative z-0 pb-2 scrollbar-hide">
        {playlist.map((song) => (
          <a
            key={song.id}
            href={getPlayLink(song.title, song.artist)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#111] transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-4 min-w-0">
              
              {/* Minimalist Square Icon */}
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-all shrink-0">
                {/* Switches from Music note to Play button on hover */}
                <Music className="w-4 h-4 group-hover:hidden" />
                <Play className="w-4 h-4 hidden group-hover:block ml-0.5 fill-current" />
              </div>

              <div className="min-w-0">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {song.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500 font-medium truncate">{song.artist}</span>
                  <span className="text-[10px] text-gray-400 font-medium">• {song.lang}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 pl-2">
              <span className="hidden sm:inline-flex px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-medium text-gray-500">
                {song.tag}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}