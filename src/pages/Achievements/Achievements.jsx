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
                id: `badge-${progressDoc.$id || progressDoc.CourseId}`,
                courseName: matchedCourse.Title,
                badgeTitle: getBadgeName(matchedCourse.Title),
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
        {/* ✨ Adjusted desktop padding/margins and font sizes (md:text-4xl instead of md:text-5xl) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              Your <span className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-700 dark:to-theme-pink-500 bg-clip-text text-transparent">Achievements</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Track your verified certificates and showcase your acquired skills.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-3 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl p-4 md:px-5 md:py-3 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-theme-blue-900/5 dark:shadow-none transition-transform">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-blue-100 to-theme-pink-50 dark:from-theme-blue-900/40 dark:to-theme-pink-900/40 flex items-center justify-center border border-white dark:border-gray-800 shadow-inner">
                <Award className="w-5 h-5 text-theme-blue-600 dark:text-theme-blue-400" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Certificates</p>
                <p className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-none">{stats.certificatesCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl p-4 md:px-5 md:py-3 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-theme-pink-900/5 dark:shadow-none transition-transform">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-pink-100 to-purple-100 dark:from-theme-pink-900/40 dark:to-purple-900/40 flex items-center justify-center border border-white dark:border-gray-800 shadow-inner">
                <ShieldCheck className="w-5 h-5 text-theme-pink-600 dark:text-theme-pink-400" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Badges</p>
                <p className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-none">{stats.subBadgesCount}</p>
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="mt-12 text-center py-8 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 max-w-3xl mx-auto">
            <p className="text-base font-bold">{error}</p>
          </div>
        ) : (
          <>
            {/* ================= CERTIFICATES GRID ================= */}
            <div className="mt-12">
              {/* ✨ Reduced section header size */}
              <h2 className="text-xl md:text-2xl font-black mb-6 text-gray-900 dark:text-white flex items-center gap-2 tracking-tight">
                <Award className="w-6 h-6 text-theme-blue-500" />
                Verified Certificates
              </h2>

              {earnedCertificates.length === 0 ? (
                <div className="text-center py-20 px-6 bg-white/50 dark:bg-[#111]/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 relative z-0 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-2">No Certificates Yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm md:text-base">
                    Complete courses and pass the final exams to unlock your first verified certificate.
                  </p>
                  <button
                    onClick={() => navigate("/courses")}
                    className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-xl mx-auto flex items-center gap-2 text-sm"
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
                      className={`group bg-white dark:bg-[#0a0a0a] p-6 rounded-[1.5rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-theme-blue-500/10 dark:hover:shadow-theme-blue-500/10 hover:border-theme-blue-300 dark:hover:border-theme-blue-500/50 transition-all duration-500 cursor-pointer flex flex-col items-center hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative w-24 h-24 mx-auto mb-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-theme-blue-200 to-theme-pink-200 dark:from-theme-blue-900/40 dark:to-theme-pink-900/40 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 opacity-60"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-white to-theme-blue-50 dark:from-gray-800 dark:to-[#1a1a1a] rounded-full flex items-center justify-center border border-white dark:border-gray-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                          <Award className="w-10 h-10 text-theme-blue-500 dark:text-theme-blue-400" />
                        </div>
                      </div>

                      {/* ✨ Reduced card font size */}
                      <h3 className="font-black text-lg text-gray-900 dark:text-white text-center line-clamp-2 leading-tight mb-2 group-hover:text-theme-blue-600 dark:group-hover:text-theme-pink-400 transition-colors">
                        {cert.courseName}
                      </h3>

                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-5 uppercase tracking-widest">
                        {cert.date}
                      </p>

                      <div className="mt-auto flex items-center gap-2 text-[11px] md:text-xs font-black uppercase tracking-wider text-theme-blue-600 dark:text-theme-pink-400 bg-theme-blue-50 dark:bg-theme-blue-500/10 group-hover:bg-theme-blue-100 dark:group-hover:bg-theme-blue-500/20 px-4 py-2.5 rounded-xl transition-colors w-full justify-center">
                        <Download className="w-3.5 h-3.5" /> View Certificate
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ================= SKILL BADGES SECTION ================= */}
            <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-6 h-6 text-theme-pink-500" />
                <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  Skill Badges
                </h2>
              </div>

              {earnedBadges.length === 0 ? (
                <div className="text-center py-20 px-6 bg-white/50 dark:bg-[#111]/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 relative z-0 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-2">No Badges Yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm md:text-base">
                    Complete specific course milestones and mini-challenges to earn skill badges.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-0">
                  {earnedBadges.map((badge, index) => (
                    <button
                      key={badge.id}
                      onClick={() => setSelectedBadge(badge)}
                      className={`group bg-white dark:bg-[#0a0a0a] p-6 rounded-[1.5rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-theme-pink-500/10 dark:hover:shadow-theme-pink-500/10 hover:border-theme-pink-300 dark:hover:border-theme-pink-500/50 transition-all duration-500 cursor-pointer flex flex-col items-center hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative w-24 h-24 mx-auto mb-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-theme-pink-200 to-purple-200 dark:from-theme-pink-900/40 dark:to-purple-900/40 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 opacity-60"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-white to-theme-pink-50 dark:from-gray-800 dark:to-[#1a1a1a] rounded-full flex items-center justify-center border border-white dark:border-gray-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                          <Star className="w-10 h-10 text-theme-pink-500 dark:text-theme-pink-400" fill="currentColor" />
                        </div>
                      </div>

                      <h3 className="font-black text-lg text-gray-900 dark:text-white text-center line-clamp-2 leading-tight mb-2 group-hover:text-theme-pink-600 dark:group-hover:text-theme-pink-400 transition-colors">
                        {badge.badgeTitle}
                      </h3>

                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-5 uppercase tracking-widest">
                        {badge.date}
                      </p>

                      <div className="mt-auto flex items-center gap-2 text-[11px] md:text-xs font-black uppercase tracking-wider text-theme-pink-600 dark:text-theme-pink-400 bg-theme-pink-50 dark:bg-theme-pink-500/10 group-hover:bg-theme-pink-100 dark:group-hover:bg-theme-pink-500/20 px-4 py-2.5 rounded-xl transition-colors w-full justify-center">
                        <Download className="w-3.5 h-3.5" /> View Badge
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