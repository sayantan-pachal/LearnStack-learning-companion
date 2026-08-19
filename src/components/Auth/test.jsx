import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minus, X, RotateCcw } from 'lucide-react';

export default function HelpDeskTerminal() {
  const [input, setInput] = useState('');
  
  // Window State
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // Terminal History & Command Navigation
  const [history, setHistory] = useState([
    { type: 'system', text: 'LearnStack Support OS v3.0.0 (tty1)' },
    { type: 'system', text: `Login: ${new Date().toLocaleString()}` },
    { type: 'system', text: 'Establishing secure connection... [OK]' },
    { type: 'system', text: 'Type "help" to see available commands.' },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (!isMinimized && !isClosed) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isMinimized, isClosed]);

  // Keep focus on input
  const focusInput = () => {
    if (!isMinimized && !isClosed) {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    // Command History Navigation (Up/Down Arrows)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Enter') {
      const cmd = input.trim();
      const lowerCmd = cmd.toLowerCase();
      
      if (cmd) {
        setCmdHistory([...cmdHistory, cmd]);
      }
      setHistoryIndex(-1);

      const newHistory = [...history, { type: 'user', text: `student@learnstack:~$ ${cmd}` }];
      
      switch (lowerCmd) {
        case 'help':
          newHistory.push({ type: 'output', text: 'Available commands:' });
          newHistory.push({ type: 'output', text: '  about      - Platform information' });
          newHistory.push({ type: 'output', text: '  courses    - View course directory' });
          newHistory.push({ type: 'output', text: '  ls         - List directory contents' });
          newHistory.push({ type: 'output', text: '  status     - Check system health' });
          newHistory.push({ type: 'output', text: '  contact    - Reach human support' });
          newHistory.push({ type: 'output', text: '  ping       - Test server latency' });
          newHistory.push({ type: 'output', text: '  date       - Print system date/time' });
          newHistory.push({ type: 'output', text: '  uptime     - Show system uptime' });
          newHistory.push({ type: 'output', text: '  whoami     - Print effective userid' });
          newHistory.push({ type: 'output', text: '  clear      - Clear terminal screen' });
          break;
        case 'about':
          newHistory.push({ type: 'output', text: 'LearnStack: A collaborative learning ecosystem.' });
          newHistory.push({ type: 'output', text: 'Engineered for seamless education, skill tracking, and performance.' });
          newHistory.push({ type: 'output', text: 'Tech Stack: React, Node.js, Tailwind CSS, Appwrite.' });
          break;
        case 'ls':
          newHistory.push({ type: 'output', text: 'courses/   resources/   community/   settings/   resume.pdf' });
          break;
        case 'courses':
          newHistory.push({ type: 'output', text: '[ DIRECTORY ] : /var/www/learnstack/courses' });
          newHistory.push({ type: 'output', text: ' ├── Frontend Development' });
          newHistory.push({ type: 'output', text: ' ├── Backend Engineering' });
          newHistory.push({ type: 'output', text: ' └── Data Structures & Algorithms' });
          break;
        case 'status':
          newHistory.push({ type: 'success', text: '[ OK ] Authentication Node   : Online (12ms)' });
          newHistory.push({ type: 'success', text: '[ OK ] Primary Database      : Online (8ms)' });
          newHistory.push({ type: 'success', text: '[ OK ] Content Delivery Net  : Online (15ms)' });
          newHistory.push({ type: 'output', text: 'System Status: 100% Operational. No incidents reported.' });
          break;
        case 'ping':
          newHistory.push({ type: 'output', text: 'Pinging learnstack.server [192.168.1.1] with 32 bytes of data:' });
          newHistory.push({ type: 'output', text: 'Reply from 192.168.1.1: bytes=32 time=12ms TTL=54' });
          newHistory.push({ type: 'output', text: 'Reply from 192.168.1.1: bytes=32 time=11ms TTL=54' });
          newHistory.push({ type: 'success', text: 'Ping statistics: Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)' });
          break;
        case 'contact':
          newHistory.push({ type: 'output', text: 'Support Email : support@learnstack.com' });
          newHistory.push({ type: 'output', text: 'GitHub Issues : github.com/sayantan-pachal' });
          break;
        case 'date':
          newHistory.push({ type: 'output', text: new Date().toString() });
          break;
        case 'uptime':
          newHistory.push({ type: 'output', text: 'up 14 days, 3:12, 1 user, load average: 0.04, 0.08, 0.05' });
          break;
        case 'whoami':
          newHistory.push({ type: 'output', text: 'student' });
          break;
        case 'sudo':
          newHistory.push({ type: 'warning', text: 'student is not in the sudoers file. This incident will be reported.' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case '':
          break; 
        default:
          if (cmd.startsWith('sudo ')) {
            newHistory.push({ type: 'warning', text: 'Permission denied. Root privileges required.' });
          } else {
            newHistory.push({ type: 'error', text: `bash: ${lowerCmd}: command not found. Type "help" for available commands.` });
          }
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    // Outer Container with Glowing Tech Grid
    <div className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center py-20 px-4 sm:px-8 overflow-hidden font-dm">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Animated Inline SVG Header */}
        {!isMaximized && (
          <div className="mb-8 flex flex-col items-center text-center animate-in slide-in-from-top-10 duration-700">
            
            {/* Pure SVG Animated Tech Graphic (Zero Packages) */}
            <div className="relative w-32 h-32 mb-6 drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
                {/* Rotating Outer Dashed Ring */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" className="origin-center animate-[spin_12s_linear_infinite]" />
                {/* Counter-Rotating Inner Ring */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="20 10" className="origin-center animate-[spin_15s_linear_infinite_reverse]" opacity="0.6" />
                
                {/* Central Server Stack */}
                <rect x="35" y="32" width="30" height="8" rx="2" fill="currentColor" opacity="0.7" className="animate-pulse" />
                <rect x="35" y="46" width="30" height="8" rx="2" fill="currentColor" opacity="0.85" />
                <rect x="35" y="60" width="30" height="8" rx="2" fill="currentColor" opacity="1" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                
                {/* Server Status Lights */}
                <circle cx="40" cy="36" r="1.5" fill="#10B981" />
                <circle cx="44" cy="36" r="1.5" fill="#10B981" />
                
                <circle cx="40" cy="50" r="1.5" fill="#10B981" />
                <circle cx="44" cy="50" r="1.5" fill="#10B981" className="animate-pulse" />
                
                <circle cx="40" cy="64" r="1.5" fill="#10B981" />
                <circle cx="44" cy="64" r="1.5" fill="#EF4444" className="animate-ping" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Terminal</span>
            </h1>
            <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-lg mx-auto font-medium">
              Access the LearnStack mainframe. Execute commands to check system health, explore directories, or contact support.
            </p>
          </div>
        )}

        {/* --- THE TERMINAL COMPONENT --- */}
        {isClosed ? (
          <div className="w-full flex justify-center py-12 animate-in zoom-in duration-300">
            <button 
              onClick={() => {
                setIsClosed(false);
                setIsMinimized(false);
                setHistory([{ type: 'system', text: 'Session restored successfully.' }]);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#1e1e1e] text-gray-300 rounded-xl hover:text-white hover:bg-[#2d2d2d] shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-700 transition-all font-bold group"
            >
              <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-500" /> Reconnect to Server
            </button>
          </div>
        ) : (
          <div 
            className={`
              overflow-hidden bg-[#1e1e1e]/95 backdrop-blur-xl font-mono text-sm sm:text-base transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-gray-700/80
              ${isMaximized ? 'fixed inset-4 sm:inset-8 z-[9999] rounded-2xl w-auto max-w-none' : 'relative w-full rounded-2xl animate-in zoom-in-95'}
            `}
          >
            {/* Mac-style Window Header */}
            <div 
              className="bg-[#2d2d2d]/90 px-4 py-3 flex items-center justify-between border-b border-gray-800/80 select-none cursor-default"
              onDoubleClick={() => setIsMaximized(!isMaximized)}
            >
              <div className="flex items-center gap-2">
                {/* Close Button */}
                <button 
                  onClick={() => setIsClosed(true)}
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center group outline-none hover:brightness-110 shadow-inner"
                >
                  <X className="w-2.5 h-2.5 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                
                {/* Minimize Button */}
                <button 
                  onClick={() => {
                    setIsMinimized(!isMinimized);
                    if (isMaximized) setIsMaximized(false);
                  }}
                  className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center group outline-none hover:brightness-110 shadow-inner"
                >
                  <Minus className="w-2.5 h-2.5 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                
                {/* Maximize Button */}
                <button 
                  onClick={() => {
                    setIsMaximized(!isMaximized);
                    if (isMinimized) setIsMinimized(false);
                  }}
                  className="w-3.5 h-3.5 rounded-full bg-[#27c93f] flex items-center justify-center group outline-none hover:brightness-110 shadow-inner"
                >
                  <Maximize2 className="w-2.5 h-2.5 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold tracking-widest bg-black/20 px-4 py-1 rounded-md">
                <TerminalIcon className="w-3.5 h-3.5 text-gray-500" /> bash — root@learnstack
              </div>
              
              <div className="w-14"></div> {/* Spacer for center alignment */}
            </div>

            {/* Terminal Body */}
            <div 
              className={`
                p-4 sm:p-6 overflow-y-auto cursor-text transition-all duration-500
                ${isMinimized ? 'h-0 py-0 opacity-0' : isMaximized ? 'h-[calc(100vh-8rem)]' : 'h-[400px] sm:h-[480px]'}
              `}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides native scrollbar
              onClick={focusInput}
            >
              <div className="space-y-1.5 mb-2 leading-relaxed tracking-wide">
                {history.map((line, i) => (
                  <div 
                    key={i} 
                    className={`
                      ${line.type === 'system' ? 'text-gray-500 italic font-medium' : ''}
                      ${line.type === 'user' ? 'text-white font-bold mt-2' : ''}
                      ${line.type === 'output' ? 'text-blue-300 ml-4' : ''}
                      ${line.type === 'success' ? 'text-green-400 ml-4 font-medium' : ''}
                      ${line.type === 'warning' ? 'text-yellow-400 ml-4 font-bold' : ''}
                      ${line.type === 'error' ? 'text-red-400 font-bold' : ''}
                    `}
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              {/* Active Input Line */}
              <div className="flex items-center text-white relative mt-2 font-bold tracking-wide">
                <span className="text-green-400 mr-2 whitespace-nowrap">student@learnstack:~$</span>
                
                <div className="relative flex-1 flex items-center">
                  <span className="invisible whitespace-pre pr-1">{input}</span>
                  {/* Blinking Cursor aligned perfectly */}
                  <span 
                    className="absolute left-0 w-[8px] h-[1.2em] bg-gray-300 animate-pulse" 
                    style={{ left: `${input.length}ch` }}
                  ></span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="absolute inset-0 bg-transparent outline-none border-none text-transparent caret-transparent focus:ring-0 p-0 m-0 z-10 w-full"
                    spellCheck="false"
                    autoComplete="off"
                    autoFocus
                  />
                  <span className="absolute inset-0 pointer-events-none text-white whitespace-pre">{input}</span>
                </div>
              </div>
              <div ref={bottomRef} className="mt-4" />
            </div>

            {/* Global style to hide webkit scrollbars */}
            <style dangerouslySetInnerHTML={{__html: `
              .cursor-text::-webkit-scrollbar { display: none; }
            `}} />
          </div>
        )}
      </div>
    </div>
  );
}