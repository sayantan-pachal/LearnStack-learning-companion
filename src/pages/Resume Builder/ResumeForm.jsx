import React from 'react';
import { Plus, Trash2, User, Book, Briefcase, Code, FileText, Award } from 'lucide-react';

export default function ResumeForm({ data, setters, actions }) {
    const { personal, overview, education, skills, projects, certifications } = data;
    const { setPersonal, setOverview, setEducation, setSkills, setProjects, setCertifications } = setters;
    const { addProject, removeProject, addCert, removeCert, addEducation, removeEducation } = actions;

    const inputClass = "w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-theme-blue-500 outline-none text-sm dark:text-white transition-all";

    // ✨ FIX: Removed max-h-[80vh] and overflow-y-auto so the form expands naturally
    return (
        <div className="space-y-6 print-hide">

            {/* Header Info */}
            <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><User className="w-4 h-4 text-theme-blue-500" /> Header Info</h3>
                <div className="space-y-3">
                    <input type="text" placeholder="Full Name" value={personal.name} onChange={e => setPersonal({ ...personal, name: e.target.value })} className={inputClass} />
                    <input type="text" placeholder="Subtitle (e.g. FULL-STACK DEVELOPER)" value={personal.subtitle} onChange={e => setPersonal({ ...personal, subtitle: e.target.value })} className={inputClass} />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Location" value={personal.location} onChange={e => setPersonal({ ...personal, location: e.target.value })} className={inputClass}/>
                        <input type="email" placeholder="Email" value={personal.email} onChange={e => setPersonal({ ...personal, email: e.target.value })} className={inputClass} />
                        <input type="text" placeholder="GitHub & LinkedIn" value={personal.githubLinkedin} onChange={e => setPersonal({ ...personal, githubLinkedin: e.target.value })} className={inputClass} />
                        <input type="text" placeholder="Website" value={personal.website} onChange={e => setPersonal({ ...personal, website: e.target.value })} className={inputClass} />
                    </div>
                </div>
            </div>

            {/* Overview & Skills */}
            <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-theme-pink-500" /> Overview & Skills</h3>
                <textarea placeholder="Professional Overview..." value={overview} onChange={e => setOverview(e.target.value)} className={`${inputClass} resize-none h-32 mb-3 scrollbar-hide`} />
                <textarea placeholder="Technical Skills (Comma separated)..." value={skills} onChange={e => setSkills(e.target.value)} className={`${inputClass} resize-none h-20 scrollbar-hide`} />
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Book className="w-4 h-4 text-purple-500" /> Education</h3>
                    <button onClick={addEducation} className="text-purple-500 hover:bg-purple-50 p-1.5 rounded-lg"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="space-y-4">
                    {education.map((edu, index) => (
                        <div key={edu.id} className="relative group border border-gray-100 dark:border-gray-800 p-3 rounded-xl">
                            <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-500"><Trash2 className="w-4 h-4" /></button>
                            <div className="grid grid-cols-3 gap-2 mb-2 pr-6">
                                <input type="text" placeholder="Degree (e.g. Bachelor of Technology)" value={edu.degree} onChange={e => { const n = [...education]; n[index].degree = e.target.value; setEducation(n); }} className={`${inputClass} col-span-2 font-bold`} />
                                <input type="text" placeholder="Date (e.g. 2025-29)" value={edu.date} onChange={e => { const n = [...education]; n[index].date = e.target.value; setEducation(n); }} className={inputClass} />
                            </div>
                            <input type="text" placeholder="School / University Name" value={edu.school} onChange={e => { const n = [...education]; n[index].school = e.target.value; setEducation(n); }} className={inputClass} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Projects */}
            <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Briefcase className="w-4 h-4 text-emerald-500" /> Projects</h3>
                    <button onClick={addProject} className="text-emerald-500 hover:bg-emerald-50 p-1.5 rounded-lg"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="space-y-4">
                    {projects.map((proj, index) => (
                        <div key={proj.id} className="relative group border border-gray-100 dark:border-gray-800 p-3 rounded-xl">
                            <button onClick={() => removeProject(proj.id)} className="absolute top-2 right-2 text-red-500"><Trash2 className="w-4 h-4" /></button>

                            <div className="grid grid-cols-3 gap-2 mb-2 pr-6">
                                <input type="text" placeholder="Project Title" value={proj.title} onChange={e => { const n = [...projects]; n[index].title = e.target.value; setProjects(n); }} className={`${inputClass} col-span-2 font-bold`} />
                                <input type="text" placeholder="Date" value={proj.date} onChange={e => { const n = [...projects]; n[index].date = e.target.value; setProjects(n); }} className={inputClass} />
                            </div>

                            <input type="text" placeholder="Subtitle / Tech Stack" value={proj.subtitle} onChange={e => { const n = [...projects]; n[index].subtitle = e.target.value; setProjects(n); }} className={`${inputClass} mb-2`} />

                            {/* NEW: Live Link and GitHub Link */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                                <input type="url" placeholder="Live Link (Optional)" value={proj.liveLink || ''} onChange={e => { const n = [...projects]; n[index].liveLink = e.target.value; setProjects(n); }} className={inputClass} />
                                <input type="url" placeholder="GitHub Repo (Optional)" value={proj.githubLink || ''} onChange={e => { const n = [...projects]; n[index].githubLink = e.target.value; setProjects(n); }} className={inputClass} />
                            </div>

                            <textarea placeholder="Bullet points (Separate with a new line)" value={proj.bullets} onChange={e => { const n = [...projects]; n[index].bullets = e.target.value; setProjects(n); }} className={`${inputClass} resize-none h-32 text-sm scrollbar-hide`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Award className="w-4 h-4 text-yellow-500" /> Professional Development</h3>
                    <button onClick={addCert} className="text-yellow-500 hover:bg-yellow-50 p-1.5 rounded-lg"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="space-y-3">
                    {certifications.map((cert, index) => (
                        <div key={cert.id} className="flex items-center gap-2">

                            {/* Course Name gets all available space and won't squish */}
                            <div className="flex-1 min-w-0">
                                <input
                                    type="text"
                                    placeholder="Course Name | Issuer"
                                    value={cert.name}
                                    onChange={e => { const n = [...certifications]; n[index].name = e.target.value; setCertifications(n); }}
                                    className={inputClass}
                                />
                            </div>

                            {/* Date gets a strict width and will NEVER shrink */}
                            <div className="w-24 sm:w-36 shrink-0">
                                <input
                                    type="text"
                                    placeholder="Date"
                                    value={cert.date}
                                    onChange={e => { const n = [...certifications]; n[index].date = e.target.value; setCertifications(n); }}
                                    className={inputClass}
                                />
                            </div>

                            <button
                                onClick={() => removeCert(cert.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}