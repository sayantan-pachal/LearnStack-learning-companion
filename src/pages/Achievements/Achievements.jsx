import React, { useState, useEffect } from "react";
import { Trophy, Star, Award, Download, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  databases,
  DATABASE_ID,
  PROGRESS_COLLECTION_ID,
  COURSES_COLLECTION_ID
} from "../../appwrite/config";
import Loader from "../../components/Other/Loader";
import CertificateModal from "./CertificateModal";
import BadgeModal from "./BadgeModal";

// Helper function to generate cool, snappy badge names based on course titles
const getBadgeName = (courseName) => {
  if (!courseName) return "Skill Badge";
  
  const lowerName = courseName.toLowerCase();
  
  if (lowerName.includes("data structure") || lowerName.includes("algorithm") || lowerName.includes("dsa")) return "DSA Essentials";
  if (lowerName.includes("python")) return "Python Pro";
  if (lowerName.includes("javascript") || lowerName.includes("js")) return "JS Ninja";
  if (lowerName.includes("react")) return "React Specialist";
  if (lowerName.includes("html") || lowerName.includes("css") || lowerName.includes("frontend") || lowerName.includes("web")) return "Web Dev Master";
  if (lowerName.includes("backend") || lowerName.includes("node") || lowerName.includes("api")) return "Backend Architect";
  if (lowerName.includes("c#") || lowerName.includes("c++") || lowerName.includes("java") || lowerName.includes("c")) return "Core Developer";
  
  // Generic Fallback: Take the first 1-2 words and append "Essentials"
  const words = courseName.split(" ");
  if (words.length <= 2) return `${courseName} Essentials`;
  return `${words[0]} ${words[1]} Essentials`;
};

function Achievements() {
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    certificatesCount: 0,
    subBadgesCount: 0 
  });

  const [earnedCertificates, setEarnedCertificates] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchievementsData = async () => {
      try {
        setLoading(true);

        const userStr = localStorage.getItem("learnstack_user");
        const currentUser = userStr ? JSON.parse(userStr) : null;
        setUser(currentUser);

        const [progressRes, coursesRes] = await Promise.all([
          databases.listDocuments(DATABASE_ID, PROGRESS_COLLECTION_ID),
          databases.listDocuments(DATABASE_ID, COURSES_COLLECTION_ID)
        ]);

        const progressData = progressRes.documents || [];
        const coursesData = coursesRes.documents || [];

        let certificatesList = [];
        let badgesList = [];

        progressData.forEach((progressDoc) => {
          const badgeValue = String(progressDoc.Badge || "").toUpperCase().trim();

          // If the user has passed the course (Y or C)
          if (badgeValue === "Y" || badgeValue === "C") {
            const matchedCourse = coursesData.find(c =>
              String(c.ID) === String(progressDoc.CourseId) ||
              String(c.$id) === String(progressDoc.CourseId)
            );

            if (matchedCourse) {
              // =========================================================
              // STRICT DATE LOGIC
              // =========================================================
              const rawDate = progressDoc.date || progressDoc.Date;
              let formattedDate = "N/A";

              if (rawDate) {
                const parsedDate = new Date(rawDate);
                if (!isNaN(parsedDate.getTime())) {
                  formattedDate = parsedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });
                } else {
                  formattedDate = rawDate;
                }
              }
              // =========================================================

              // 1. Add to Certificates List
              certificatesList.push({
                id: progressDoc.$id || progressDoc.CourseId,
                courseName: matchedCourse.Title,
                badgeTitle: matchedCourse.Badge || "Course Scholar",
                date: formattedDate, 
                progressDetails: progressDoc
              });

              // 2. Add to Skill Badges List
              badgesList.push({
                // Add a 'badge-' prefix so React keys don't clash with certificates
                id: `badge-${progressDoc.$id || progressDoc.CourseId}`, 
                courseName: matchedCourse.Title,
                badgeTitle: getBadgeName(matchedCourse.Title), // Dynamically generate snappy name
                date: formattedDate,
                progressDetails: progressDoc
              });
            }
          }
        });

        setStats({
          certificatesCount: certificatesList.length,
          subBadgesCount: badgesList.length 
        });

        setEarnedCertificates(certificatesList);
        setEarnedBadges(badgesList);

      } catch (err) {
        console.error("Failed to load achievements:", err);
        setError("Could not load your achievements. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievementsData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#050505]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 pb-24 bg-[#FAFAFA] dark:bg-[#050505] min-h-screen font-dm">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                Your <span className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500 bg-clip-text text-transparent">Achievements</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Track your verified certificates and showcase your acquired skills.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-4 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl p-4 md:px-6 md:py-4 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-blue-900/5 dark:shadow-none transition-transform">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-indigo-900/40 dark:to-blue-900/40 flex items-center justify-center border border-white dark:border-gray-800 shadow-inner">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Certificates</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white leading-none">{stats.certificatesCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl p-4 md:px-6 md:py-4 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-purple-900/5 dark:shadow-none transition-transform">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 flex items-center justify-center border border-white dark:border-gray-800 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-pink-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Badges</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white leading-none">{stats.subBadgesCount}</p>
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="mt-12 text-center py-10 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 max-w-3xl mx-auto">
            <p className="text-lg font-bold">{error}</p>
          </div>
        ) : (
          <>
            {/* ================= CERTIFICATES GRID ================= */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-black mb-8 text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
                <Award className="w-7 h-7 text-indigo-500" />
                Verified Certificates
              </h2>

              {earnedCertificates.length === 0 ? (
                <div className="text-center py-24 px-6 bg-white/50 dark:bg-[#111]/50 backdrop-blur-sm rounded-[3rem] border border-dashed border-gray-300 dark:border-gray-800 relative z-0 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No Certificates Yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
                    Complete courses and pass the final exams to unlock your first verified certificate.
                  </p>
                  <button
                    onClick={() => navigate("/courses")}
                    className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105 shadow-xl mx-auto flex items-center gap-2"
                  >
                    Browse Courses <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-0">
                  {earnedCertificates.map((cert, index) => (
                    <button
                      key={cert.id}
                      onClick={() => setSelectedCertificate(cert)}
                      className={`group bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-500 cursor-pointer flex flex-col items-center hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative w-28 h-28 mx-auto mb-6">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60"></div>
                          <div className="relative w-full h-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-[#1a1a1a] rounded-full flex items-center justify-center border border-white dark:border-gray-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                              <Award className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                          </div>
                      </div>
                      
                      <h3 className="font-black text-xl text-gray-900 dark:text-white text-center line-clamp-2 leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {cert.courseName}
                      </h3>
                      
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-widest">
                          {cert.date}
                      </p>

                      <div className="mt-auto flex items-center gap-2 text-sm font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 px-5 py-2.5 rounded-xl transition-colors w-full justify-center">
                        <Download className="w-4 h-4" /> View Certificate
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ================= SKILL BADGES SECTION ================= */}
            <div className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-7 h-7 text-purple-500" />
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  Skill Badges
                </h2>
              </div>

              {earnedBadges.length === 0 ? (
                  <div className="text-center py-24 px-6 bg-white/50 dark:bg-[#111]/50 backdrop-blur-sm rounded-[3rem] border border-dashed border-gray-300 dark:border-gray-800 relative z-0 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No Badges Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
                        Complete specific course milestones and mini-challenges to earn skill badges.
                    </p>
                  </div>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-0">
                    {earnedBadges.map((badge, index) => (
                      <button
                        key={badge.id}
                        onClick={() => setSelectedBadge(badge)}
                        className={`group bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-500 cursor-pointer flex flex-col items-center hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative w-28 h-28 mx-auto mb-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60"></div>
                            <div className="relative w-full h-full bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-[#1a1a1a] rounded-full flex items-center justify-center border border-white dark:border-gray-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <Star className="w-12 h-12 text-purple-500 dark:text-purple-400" fill="currentColor" />
                            </div>
                        </div>
                        
                        <h3 className="font-black text-xl text-gray-900 dark:text-white text-center line-clamp-2 leading-tight mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {badge.badgeTitle}
                        </h3>
                        
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-widest">
                            {badge.date}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-sm font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 px-5 py-2.5 rounded-xl transition-colors w-full justify-center">
                          <Download className="w-4 h-4" /> View Badge
                        </div>
                      </button>
                    ))}
                  </div>
              )}
            </div>

          </>
        )}

      </div>
      <CertificateModal
        badge={selectedCertificate}
        user={user}
        onClose={() => setSelectedCertificate(null)}
      />

      <BadgeModal
        badge={selectedBadge}
        user={user}
        onClose={() => setSelectedBadge(null)}
      />

    </div>
  );
}

export default Achievements;