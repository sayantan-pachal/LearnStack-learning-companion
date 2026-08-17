/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Download, LayoutTemplate, Loader2 } from 'lucide-react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';

export default function ResumeBuilder({ user }) {

    const previewRef = useRef();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = () => {
        window.print();
    };
    // Pre-filled with your reference data
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

    // Action Handlers
    const handlePrint = () => window.print();

    const addProject = () => setProjects([...projects, { id: Date.now(), title: '', subtitle: '', date: '', bullets: '' }]);
    const removeProject = (id) => setProjects(projects.filter(p => p.id !== id));

    const addCert = () => setCertifications([...certifications, { id: Date.now(), name: '', date: '' }]);
    const removeCert = (id) => setCertifications(certifications.filter(c => c.id !== id));

    const addEducation = () => setEducation([...education, { id: Date.now(), degree: '', school: '', date: '' }]);
    const removeEducation = (id) => setEducation(education.filter(e => e.id !== id));

    // Package props cleanly
    const formData = { personal, overview, education, skills, projects, certifications };
    const formSetters = { setPersonal, setOverview, setEducation, setSkills, setProjects, setCertifications };
    const formActions = { addProject, removeProject, addCert, removeCert, addEducation, removeEducation };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] font-dm p-14 pt-24 lg:pt-32">

            {/* Header */}
            <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <LayoutTemplate className="w-8 h-8 text-theme-blue-500" /> ATS Resume Builder
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Live A4 preview. Optimized for Applicant Tracking Systems.</p>
                </div>

                {/* Updated Download Button with Loading State */}
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                </button>
            </div>

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Side: FORM */}
                <div className="lg:col-span-5">
                    <ResumeForm data={formData} setters={formSetters} actions={formActions} />
                </div>

                {/* Right Side: PREVIEW (Notice the ref is passed here!) */}
                <div className="lg:col-span-7">
                    <ResumePreview ref={previewRef} data={formData} />
                </div>

            </div>
        </div>
    );
}