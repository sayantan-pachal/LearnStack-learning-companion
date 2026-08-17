import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, User, Book, Briefcase, Code, LayoutTemplate, Award, FileText } from 'lucide-react';

export default function ResumeBuilder({ user }) {
  const [personal, setPersonal] = useState({
    name: "SAYANTAN PACHAL",
    subtitle: "COMPUTER SCIENCE & ENGINEERING | FULL-STACK DEVELOPER - AI ENTHUSIAST",
    location: "Howrah, West Bengal, India",
    email: "pachalsayantan@gmail.com",
    githubLinkedin: "sayantan-pachal",
    website: "sayantanpachal.vercel.app"
  });

  const [overview, setOverview] = useState("Computer Science Engineering student and Full-Stack Developer with proven expertise in building scalable, production-ready applications. Strong foundation in Data Structures and Algorithms, with hands-on proficiency in React, Node.js, Python, Java, and C++. Currently developing LearnStack, a collaborative learning platform, and previously engineered SmartKrishi, an agricultural web application integrating real-time data and machine learning insights. Focused on clean architecture, maintainable code, and solving real-world problems through thoughtful design.");

  const [education, setEducation] = useState([
    { id: 1, degree: "Bachelor of Technology", school: "B. P. Poddar Institute of Management and Technology, MAKAUT", date: "2025 - 29" }
  ]);

  const [skills, setSkills] = useState("Java, Python, C++, JavaScript, C#, C | React, Node.js, Express, Tailwind CSS, API Integration | Git, GitHub");
  
  const [projects, setProjects] = useState([
    { 
        id: 1, 
        title: 'SmartKrishi', 
        subtitle: 'Smart Agriculture Dashboard (React, AI/ML Integration)',
        date: '2026',
        bullets: "Engineered a full-stack farming dashboard that integrates real-time environmental data with AI-assisted crop monitoring and actionable agricultural recommendations.\nImplemented machine learning-based image analysis to accurately identify crop diseases, enabling early intervention and yield optimization for farmers.\nOptimized front-end architecture for maximum speed and accessibility, achieving an overall Google Lighthouse score of 95+."
    },
    { 
        id: 2, 
        title: 'Personal Portfolio Website', 
        subtitle: 'Personal Project (React, Tailwind CSS)',
        date: '2025 - Present',
        bullets: "Architected and deployed a highly responsive, modern portfolio to showcase software engineering projects, technical certifications, and professional milestones.\nEngineered for peak performance, accessibility, and SEO, achieving a perfect 100 Google Lighthouse score on desktop and near-perfect metrics across mobile devices.\nDesigned a clean, intuitive UI/UX with seamless integration to external professional platforms (GitHub, LinkedIn)."
    },
    { 
        id: 3, 
        title: 'LearnStack', 
        subtitle: 'Collaborative Learning Platform (React, Node.js, Python)',
        date: '2026 - Present',
        bullets: "Currently developing a comprehensive full-stack educational platform designed to streamline collaborative learning and track student skill progression.\nArchitecting scalable backend logic and database structures to handle complex user interactions and dynamic content delivery.\nBuilding a responsive, state-driven frontend to ensure a seamless and intuitive experience for educators and learners."
    }
  ]);

  const [certifications, setCertifications] = useState([
    { id: 1, name: "Developing Back-End Apps with Node.js and Express | IBM | Coursera", date: "July, 2026" },
    { id: 2, name: "Python for Data Science, AI & Development | IBM | Coursera", date: "May, 2026" },
    { id: 3, name: "Developing Front-End Apps with React | IBM | Coursera", date: "January, 2026" },
    { id: 4, name: "Introduction to Software Engineering | IBM | Coursera", date: "November, 2025" }
  ]);

  const handlePrint = () => window.print();

  const addProject = () => setProjects([...projects, { id: Date.now(), title: '', subtitle: '', date: '', bullets: '' }]);
  const removeProject = (id) => setProjects(projects.filter(p => p.id !== id));

  const addCert = () => setCertifications([...certifications, { id: Date.now(), name: '', date: '' }]);
  const removeCert = (id) => setCertifications(certifications.filter(c => c.id !== id));

  const inputClass = "w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-theme-blue-500 outline-none text-sm dark:text-white transition-all";

  return (
    <>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] font-dm pb-20 pt-24 lg:pt-32 px-4 print:p-0 print:bg-white">
        
        {/* Header (Hidden when printing) */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 print-hide">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <LayoutTemplate className="w-8 h-8 text-theme-blue-500" /> ATS Resume Builder
            </h1>
            <p className="text-gray-500 text-sm mt-1">Live A4 preview. Optimized for Applicant Tracking Systems.</p>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>

        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:max-w-none">
          
          {/* ================= LEFT SIDE: EDITOR (Hidden when printing) ================= */}
          <div className="lg:col-span-5 space-y-6 overflow-y-auto max-h-[80vh] scrollbar-thin pr-2 print-hide">
            
            <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><User className="w-4 h-4 text-theme-blue-500" /> Header Info</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Full Name" value={personal.name} onChange={e => setPersonal({...personal, name: e.target.value})} className={inputClass} />
                <input type="text" placeholder="Subtitle (e.g. FULL-STACK DEVELOPER)" value={personal.subtitle} onChange={e => setPersonal({...personal, subtitle: e.target.value})} className={inputClass} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Location" value={personal.location} onChange={e => setPersonal({...personal, location: e.target.value})} className={inputClass} />
                  <input type="email" placeholder="Email" value={personal.email} onChange={e => setPersonal({...personal, email: e.target.value})} className={inputClass} />
                  <input type="text" placeholder="GitHub & LinkedIn Handles" value={personal.githubLinkedin} onChange={e => setPersonal({...personal, githubLinkedin: e.target.value})} className={inputClass} />
                  <input type="text" placeholder="Website" value={personal.website} onChange={e => setPersonal({...personal, website: e.target.value})} className={inputClass} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-theme-pink-500" /> Overview & Skills</h3>
              <textarea placeholder="Professional Overview..." value={overview} onChange={e => setOverview(e.target.value)} className={`${inputClass} resize-none h-24 mb-3`} />
              <textarea placeholder="Technical Skills..." value={skills} onChange={e => setSkills(e.target.value)} className={`${inputClass} resize-none h-16`} />
            </div>

            <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Briefcase className="w-4 h-4 text-emerald-500" /> Projects</h3>
                <button onClick={addProject} className="text-emerald-500 hover:bg-emerald-50 p-1.5 rounded-lg"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div key={proj.id} className="relative group border border-gray-100 dark:border-gray-800 p-3 rounded-xl">
                    <button onClick={() => removeProject(proj.id)} className="absolute top-2 right-2 text-red-500"><Trash2 className="w-4 h-4" /></button>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <input type="text" placeholder="Title" value={proj.title} onChange={e => { const n = [...projects]; n[index].title = e.target.value; setProjects(n); }} className={`${inputClass} col-span-2`} />
                      <input type="text" placeholder="Date" value={proj.date} onChange={e => { const n = [...projects]; n[index].date = e.target.value; setProjects(n); }} className={inputClass} />
                    </div>
                    <input type="text" placeholder="Subtitle / Tech Stack" value={proj.subtitle} onChange={e => { const n = [...projects]; n[index].subtitle = e.target.value; setProjects(n); }} className={`${inputClass} mb-2`} />
                    <textarea placeholder="Bullet points (Separate with a new line)" value={proj.bullets} onChange={e => { const n = [...projects]; n[index].bullets = e.target.value; setProjects(n); }} className={`${inputClass} resize-none h-24 text-xs`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: TRUE A4 PREVIEW ================= */}
          <div className="lg:col-span-7 flex justify-center bg-gray-200/50 dark:bg-black/50 rounded-2xl p-4 sm:p-8 overflow-x-auto print-hide-bg items-start">
            
            <div className="resume-wrapper w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl shrink-0" style={{ padding: '16mm 20mm' }}>
              
              {/* --- HEADER --- */}
              <div className="mb-4">
                <h1 className="text-2xl font-serif tracking-wide uppercase font-bold text-gray-900 mb-0.5">{personal.name}</h1>
                <p className="text-[11px] font-medium uppercase text-gray-700 tracking-wider mb-1">{personal.subtitle}</p>
                <p className="text-[9.5px] text-gray-600 mb-2">
                  {personal.location} | {personal.email} | GitHub & LinkedIn: {personal.githubLinkedin} | Website: {personal.website}
                </p>
                <div className="w-full h-[1.5px] bg-gray-800"></div>
              </div>

              {/* --- PROFESSIONAL OVERVIEW --- */}
              <div className="mb-4">
                <h2 className="text-[12px] font-bold uppercase text-gray-900 mb-1">Professional Overview</h2>
                <p className="text-[10px] leading-relaxed text-gray-800 text-justify">{overview}</p>
              </div>

              {/* --- EDUCATION --- */}
              <div className="mb-4">
                <h2 className="text-[12px] font-bold uppercase text-gray-900 mb-1">Education</h2>
                {education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-start text-[10px]">
                    <p className="text-gray-800"><span className="font-bold">{edu.degree}</span> | {edu.school}</p>
                    <p className="text-gray-600 whitespace-nowrap">{edu.date}</p>
                  </div>
                ))}
              </div>

              {/* --- TECHNICAL SKILLS --- */}
              <div className="mb-4">
                <h2 className="text-[12px] font-bold uppercase text-gray-900 mb-1">Technical Skills</h2>
                <p className="text-[10px] text-gray-800">{skills}</p>
              </div>

              {/* --- PROJECTS --- */}
              <div className="mb-4">
                <h2 className="text-[12px] font-bold uppercase text-gray-900 mb-2">Projects</h2>
                <div className="space-y-3">
                  {projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-start text-[10px] mb-1">
                        <p className="text-gray-800"><span className="font-bold">{proj.title}</span> | <span className="text-gray-600">{proj.subtitle}</span></p>
                        <p className="text-gray-600 whitespace-nowrap">{proj.date}</p>
                      </div>
                      <ul className="list-disc pl-4 text-[10px] leading-relaxed text-gray-800 space-y-0.5">
                        {proj.bullets.split('\n').filter(b => b.trim() !== '').map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- PROFESSIONAL DEVELOPMENT --- */}
              <div>
                <h2 className="text-[12px] font-bold uppercase text-gray-900 mb-1">Professional Development</h2>
                <div className="space-y-0.5">
                  {certifications.map(cert => (
                    <div key={cert.id} className="flex justify-between items-start text-[10px]">
                      <p className="text-gray-800">{cert.name}</p>
                      <p className="text-gray-600 whitespace-nowrap">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* --- INLINE PRINT CSS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
            @page { 
                size: A4 portrait; 
                margin: 0; 
            }
            
            html, body {
                width: 210mm !important;
                height: 297mm !important;
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            /* Hide absolutely everything in the body by default */
            body * { 
                visibility: hidden; 
            }
            
            /* Reposition the resume wrapper to take over the entire screen */
            .resume-wrapper {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 210mm !important;
                height: 297mm !important;
                margin: 0 !important;
                box-shadow: none !important;
                border: none !important;
                page-break-inside: avoid !important;
            }
            
            /* Make the wrapper and all its children visible */
            .resume-wrapper, .resume-wrapper * {
                visibility: visible;
            }
            
            /* Utility classes to hide specific elements */
            .print-hide, .print-hide * { 
                display: none !important; 
                visibility: hidden !important;
            }

            .print-hide-bg {
                background: transparent !important;
                padding: 0 !important;
            }
        }
      `}} />
    </>
  );
}