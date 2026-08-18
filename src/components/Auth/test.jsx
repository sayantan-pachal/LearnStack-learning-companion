import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minus, X } from 'lucide-react';

export default function TerminalResume() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Sayantan OS v1.0.0' },
    { type: 'system', text: 'Type "help" to see available commands.' },
  ]);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new commands are entered
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep focus on the invisible input when clicking anywhere in the terminal
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', text: `guest@sayantan-os:~$ ${input}` }];
      
      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'output', text: 'Available commands:' });
          newHistory.push({ type: 'output', text: '  whoami     - Display summary' });
          newHistory.push({ type: 'output', text: '  skills     - List technical skills' });
          newHistory.push({ type: 'output', text: '  projects   - Show recent work' });
          newHistory.push({ type: 'output', text: '  contact    - Display contact info' });
          newHistory.push({ type: 'output', text: '  clear      - Clear terminal screen' });
          break;
        case 'whoami':
          newHistory.push({ type: 'output', text: 'Sayantan Pachal' });
          newHistory.push({ type: 'output', text: 'Computer Science Engineering Student & Software Developer.' });
          newHistory.push({ type: 'output', text: 'Passionate about problem-solving and building scalable web applications.' });
          break;
        case 'skills':
          newHistory.push({ type: 'output', text: '[ Languages ] : Python, Java, JavaScript, C, C++, C#' });
          newHistory.push({ type: 'output', text: '[ Frontend ]  : React, Tailwind CSS, HTML, CSS' });
          newHistory.push({ type: 'output', text: '[ Core ]      : Data Structures and Algorithms (Java/C++)' });
          break;
        case 'projects':
          newHistory.push({ type: 'output', text: '1. Automated Quiz Generator' });
          newHistory.push({ type: 'output', text: '2. Personal Portfolio (sayantanpachal.vercel.app)' });
          newHistory.push({ type: 'output', text: '3. JS Calculator & 25+5 Clock' });
          break;
        case 'contact':
          newHistory.push({ type: 'output', text: 'GitHub   : github.com/sayantan-pachal' });
          newHistory.push({ type: 'output', text: 'LinkedIn : linkedin.com/in/sayantan-pachal' });
          newHistory.push({ type: 'output', text: 'Website  : sayantanpachal.vercel.app' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case '':
          break; // Do nothing on empty enter
        default:
          newHistory.push({ type: 'error', text: `bash: ${cmd}: command not found. Type "help" for a list of commands.` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-[#1e1e1e] font-mono text-sm sm:text-base animate-in zoom-in-95 duration-500">
      
      {/* Mac-style Window Header */}
      <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-gray-900 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center group cursor-pointer">
            <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
          </div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center group cursor-pointer">
            <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
          </div>
          <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center group cursor-pointer">
            <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold tracking-widest">
          <TerminalIcon className="w-3 h-3" /> bash — sayantan-os
        </div>
        <div className="w-12"></div> {/* Spacer for center alignment */}
      </div>

      {/* Terminal Body */}
      <div 
        className="p-4 h-[400px] sm:h-[450px] overflow-y-auto scrollbar-thin cursor-text"
        onClick={focusInput}
      >
        <div className="space-y-1.5 mb-2">
          {history.map((line, i) => (
            <div 
              key={i} 
              className={`
                ${line.type === 'system' ? 'text-gray-400 italic' : ''}
                ${line.type === 'user' ? 'text-white font-bold' : ''}
                ${line.type === 'output' ? 'text-theme-blue-300 ml-4' : ''}
                ${line.type === 'error' ? 'text-red-400' : ''}
              `}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Active Input Line */}
        <div className="flex items-center text-white">
          <span className="text-green-400 font-bold mr-2">guest@sayantan-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none border-none text-white caret-transparent focus:ring-0 p-0 m-0"
            spellCheck="false"
            autoComplete="off"
            autoFocus
          />
          {/* Custom Blinking Cursor (follows text) */}
          <span className="w-2 h-4 bg-gray-300 animate-pulse -ml-[100%] translate-x-[calc(100%+0.5ch)]" style={{ marginLeft: `-${input.length}ch` }}></span>
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}