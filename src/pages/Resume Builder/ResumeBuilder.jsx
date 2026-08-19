/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Download, LayoutTemplate, Loader2 } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer'; 
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import ResumePDF from './ResumePDF'; 

export default function ResumeBuilder({ user }) {
    // Pre-filled with DEMO reference data
    const [personal, setPersonal] = useState({
        name: "ALEXANDER WRIGHT",
        subtitle: "SOFTWARE ENGINEERING STUDENT | FULL-STACK DEVELOPER - CLOUD ENTHUSIAST",
        location: "Seattle, Washington, USA",
        email: "alex.wright.dev@example.com",
        githubLinkedin: "alex-wright-dev",
        website: "alexwright.vercel.app"
    });

    const [overview, setOverview] = useState("Software Engineering student and Full-Stack Developer with proven expertise in building scalable, production-ready applications. Strong foundation in Data Structures and Algorithms, with hands-on proficiency in React, Node.js, Python, Java, and C++. Currently developing EduCollab, a collaborative learning platform, and previously engineered EcoHarvest, an agricultural web application integrating real-time data and machine learning insights. Focused on clean architecture, maintainable code, and solving real-world problems through thoughtful design.");

    const [education, setEducation] = useState([
        { id: 1, degree: "Bachelor of Science in Computer Science", school: "University of Technology and Advanced Sciences", date: "2025 - 2029" }
    ]);

    const [skills, setSkills] = useState("Java, Python, C++, JavaScript, C#, C | React, Node.js, Express, Tailwind CSS, API Integration | Git, GitHub");

    const [projects, setProjects] = useState([
        {
            id: 1,
            title: 'EcoHarvest',
            subtitle: 'Smart Agriculture Dashboard (React, AI/ML Integration)',
            date: '2026',
            liveLink: '',
            githubLink: '',
            bullets: "Engineered a full-stack farming dashboard that integrates real-time environmental data with AI-assisted crop monitoring and actionable agricultural recommendations.\nImplemented machine learning-based image analysis to accurately identify crop diseases, enabling early intervention and yield optimization for farmers.\nOptimized front-end architecture for maximum speed and accessibility, achieving an overall Google Lighthouse score of 95+."
        },
        {
            id: 2,
            title: 'Developer Portfolio Website',
            subtitle: 'Personal Project (React, Tailwind CSS)',
            date: '2025 - Present',
            liveLink: '',
            githubLink: '',
            bullets: "Architected and deployed a highly responsive, modern portfolio to showcase software engineering projects, technical certifications, and professional milestones.\nEngineered for peak performance, accessibility, and SEO, achieving a perfect 100 Google Lighthouse score on desktop and near-perfect metrics across mobile devices.\nDesigned a clean, intuitive UI/UX with seamless integration to external professional platforms (GitHub, LinkedIn)."
        },
        {
            id: 3,
            title: 'EduCollab',
            subtitle: 'Collaborative Learning Platform (React, Node.js, Python)',
            date: '2026 - Present',
            liveLink: '',
            githubLink: '',
            bullets: "Currently developing a comprehensive full-stack educational platform designed to streamline collaborative learning and track student skill progression.\nArchitecting scalable backend logic and database structures to handle complex user interactions and dynamic content delivery.\nBuilding a responsive, state-driven frontend to ensure a seamless and intuitive experience for educators and learners."
        }
    ]);

    const [certifications, setCertifications] = useState([
        { id: 1, name: "Developing Back-End Apps with Node.js and Express | TechCorp | Coursera", date: "July, 2026" },
        { id: 2, name: "Python for Data Science, AI & Development | TechCorp | Coursera", date: "May, 2026" },
        { id: 3, name: "Developing Front-End Apps with React | TechCorp | Coursera", date: "January, 2026" },
        { id: 4, name: "Introduction to Software Engineering | TechCorp | Coursera", date: "November, 2025" }
    ]);

    const addProject = () => setProjects([...projects, { id: Date.now(), title: '', subtitle: '', date: '', bullets: '' }]);
    const removeProject = (id) => setProjects(projects.filter(p => p.id !== id));

    const addCert = () => setCertifications([...certifications, { id: Date.now(), name: '', date: '' }]);
    const removeCert = (id) => setCertifications(certifications.filter(c => c.id !== id));

    const addEducation = () => setEducation([...education, { id: Date.now(), degree: '', school: '', date: '' }]);
    const removeEducation = (id) => setEducation(education.filter(e => e.id !== id));

    const formData = { personal, overview, education, skills, projects, certifications };
    const formSetters = { setPersonal, setOverview, setEducation, setSkills, setProjects, setCertifications };
    const formActions = { addProject, removeProject, addCert, removeCert, addEducation, removeEducation };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] font-dm px-4 sm:px-8 lg:px-14 pt-24 lg:pt-32 pb-12">

            {/* Header */}
            <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-5">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <LayoutTemplate className="w-6 h-6 sm:w-8 sm:h-8 text-theme-blue-500" /> ATS Resume Builder
                    </h1>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">Live A4 preview. Optimized for Applicant Tracking Systems.</p>
                </div>

                {/* PDF Download Button */}
                <PDFDownloadLink
                    document={<ResumePDF data={formData} />}
                    fileName={`${personal.name.replace(/\s+/g, '_')}_Resume.pdf`}
                    className="w-full sm:w-auto flex justify-center items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 sm:py-2.5 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
                >
                    {({ loading }) => (
                        <>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                            {loading ? 'Generating PDF...' : 'Download PDF'}
                        </>
                    )}
                </PDFDownloadLink>
            </div>

            {/* Grid Container */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Side: FORM */}
                <div className="lg:col-span-5 w-full">
                    <ResumeForm data={formData} setters={formSetters} actions={formActions} />
                </div>

                {/* Right Side: PREVIEW */}
                <div className="lg:col-span-7 w-full overflow-hidden">
                    <ResumePreview data={formData} />
                </div>

            </div>
        </div>
    );
}