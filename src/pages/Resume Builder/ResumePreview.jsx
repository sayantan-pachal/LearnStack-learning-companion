import React, { useState, useEffect, useRef } from 'react';

export default function ResumePreview({ data }) {
  const { personal, overview, education, skills, projects, certifications } = data;

  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Responsive scaling magic for the UI
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const targetWidth = 794; // A4 width in pixels

        if (containerWidth < targetWidth) {
          setScale(containerWidth / targetWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="flex justify-center bg-gray-200/50 dark:bg-black/50 rounded-2xl items-start py-8 sm:py-12 print-hide-bg"
        style={{ maxWidth: '100%', width: '100%' }}
      >
        <div
          className="print-reset-transform"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            marginBottom: scale < 1 ? `-${297 * (1 - scale)}mm` : '0',
            // Helps mobile browsers recognize this is selectable text, not an image
            userSelect: 'text',
            WebkitUserSelect: 'text'
          }}
        >
          {/* THE ACTUAL RESUME */}
          <div
            className="resume-wrapper bg-white text-black shadow-2xl shrink-0"
            style={{
              width: '210mm',
              height: '297mm', // Strict A4 height
              padding: '16mm 20mm',
              boxSizing: 'border-box',
              overflow: 'hidden' // Prevents UI spillover
            }}
          >

            {/* --- HEADER --- */}
            <div className="mb-2 border-b-[1.5px] border-gray-400 pb-2">
              <h1 className="text-4xl font-serif tracking-wide uppercase font-bold text-gray-900 mb-0.5">{personal.name || "Your Name"}</h1>
              <p className="text-[13px] font-medium uppercase text-gray-800 tracking-widest mb-0.5">{personal.subtitle}</p>
              <p className="text-[13px] text-gray-600">
                {personal.location} | <a href={`mailto:${personal.email}`}>
                  {personal.email}
                </a> | <a >
                  GitHub & LinkedIn: {personal.githubLinkedin}
                </a> | <a href={personal.website}>
                  Website
                </a>
              </p>
            </div>

            {/* --- PROFESSIONAL OVERVIEW --- */}
            <div className="mb-3">
              <h2 className="text-base font-bold uppercase text-gray-900 mb-1">Professional Overview</h2>
              <p className="text-[13px] text-gray-700 text-justify">{overview}</p>
            </div>

            {/* --- EDUCATION --- */}
            <div className="mb-3">
              <h2 className="text-base font-bold uppercase text-gray-900">Education</h2>
              <div className="space-y-1.5">
                {education.map((edu, index) => (
                  <div key={edu.id || index} className="flex justify-between items-start text-[13px]">
                    <p className="text-gray-700"><span className="font-bold">{edu.degree}</span> | {edu.school}</p>
                    <p className="text-gray-600 whitespace-nowrap">{edu.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* --- TECHNICAL SKILLS --- */}
            <div className="mb-3">
              <h2 className="text-base font-bold uppercase text-gray-900">Technical Skills</h2>
              <p className="text-[13px] leading-relaxed text-gray-700">{skills}</p>
            </div>

            {/* --- PROJECTS --- */}
            <div className="mb-3">
              <h2 className="text-base font-bold uppercase text-gray-900 mb-1">Projects</h2>
              <div className="space-y-2">
                {projects.map((proj, index) => (
                  <div key={proj.id || index}>
                    <div className="flex justify-between items-start text-[13px] mb-1">
                      <p className="text-gray-800 text-sm">
                        <a className="font-bold" href={proj.liveLink}>
                          {proj.title}
                        </a> | <a className="text-gray-600" href={proj.githubLink} >
                          {proj.subtitle}
                        </a>
                      </p>
                      <p className="text-gray-600 whitespace-nowrap">{proj.date}</p>
                    </div>
                    <ul className="list-disc pl-10 text-[13px] text-gray-700 space-y-0 text-justify">
                      {proj.bullets && proj.bullets.split('\n').filter(b => b.trim() !== '').map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* --- PROFESSIONAL DEVELOPMENT --- */}
            <div className="mb-3">
              <h2 className="text-base font-bold uppercase text-gray-900 mb-1">Professional Development</h2>
              <div className="space-y-1">
                {certifications.map((cert, index) => (
                  <div key={cert.id || index} className="flex justify-between items-start text-[13px]">
                    <p className="text-gray-800">{cert.name}</p>
                    <p className="text-gray-600 whitespace-nowrap">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}