import React, { useState, useEffect } from "react";
import { Trophy, Star, Flame, Medal, CheckCircle, Award, Download } from "lucide-react";
import {
  databases,
  DATABASE_ID,
  PROGRESS_COLLECTION_ID,
  COURSES_COLLECTION_ID
} from "../../appwrite/config";
import Loader from "../../components/Other/Loader";
import CertificateModal from "./CertificateModal"; // <-- Import the reusable view

function Achievements() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    badgesCount: 0,
    streak: 0,
    lessonsCompleted: 0,
    milestones: 0
  });

  const [earnedBadges, setEarnedBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for controlling the Certificate Modal
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    const fetchAchievementsData = async () => {
      try {
        setLoading(true);

        // Retrieve current user
        const userStr = localStorage.getItem("learnstack_user");
        const currentUser = userStr ? JSON.parse(userStr) : null;
        setUser(currentUser);

        // Fetch User Progress & Courses
        const progressRes = await databases.listDocuments(DATABASE_ID, PROGRESS_COLLECTION_ID);
        const progressData = progressRes.documents || [];

        const coursesRes = await databases.listDocuments(DATABASE_ID, COURSES_COLLECTION_ID);
        const coursesData = coursesRes.documents || [];

        let totalLessons = 0;
        let milestoneCount = 0;
        let badgesList = [];

        progressData.forEach((progressDoc) => {
          if (progressDoc.CompletedModules) {
            totalLessons += Number(progressDoc.CompletedModules);
          }

          const percent = Number(progressDoc.CompletionPercentage) || 0;
          if (percent === 100) {
            milestoneCount += 1;
          }

          // Check if Badge is 'Y' or 'C'
          const badgeValue = String(progressDoc.Badge || "").toUpperCase().trim();
          if (badgeValue === "Y" || badgeValue === "C") {

            // Find the matching course to get its specific Title
            const matchedCourse = coursesData.find(c =>
              String(c.ID) === String(progressDoc.CourseId) ||
              String(c.$id) === String(progressDoc.CourseId)
            );

            if (matchedCourse) {
              badgesList.push({
                id: progressDoc.$id || progressDoc.CourseId,
                courseName: matchedCourse.Title,
                badgeTitle: matchedCourse.Badge || "Course Scholar",
                date: progressDoc.Date || progressDoc.date || "N/A"
              });
            }
          }
        });

        setStats({
          badgesCount: badgesList.length,
          streak: 0,
          lessonsCompleted: totalLessons,
          milestones: milestoneCount
        });

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
      <div className="min-h-screen flex items-center justify-center dark:bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 pb-24 dark:bg-black min-h-screen font-dm">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white tracking-tight">
          Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            Achievements
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 font-medium">
          Track your progress. Celebrate every win 🎉
        </p>

        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
          Every step matters. Earn badges and unlock milestones automatically as you progress through LearnStack.
        </p>
      </div>

      {error ? (
        <div className="mt-12 text-center py-10 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 max-w-3xl mx-auto">
          <p className="text-lg font-bold">{error}</p>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="mt-20 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#0a0a0a] backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
              <Trophy className="w-10 h-10 mx-auto text-yellow-500 mb-3" />
              <p className="text-4xl font-black text-gray-900 dark:text-white">{stats.badgesCount}</p>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wider">Badges Earned</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#0a0a0a] backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
              <Flame className="w-10 h-10 mx-auto text-orange-500 mb-3" />
              <p className="text-4xl font-black text-gray-900 dark:text-white">{stats.streak}</p>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wider">Day Streak</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#0a0a0a] backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
              <CheckCircle className="w-10 h-10 mx-auto text-green-500 mb-3" />
              <p className="text-4xl font-black text-gray-900 dark:text-white">{stats.lessonsCompleted}</p>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wider">Lessons Done</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#0a0a0a] backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
              <Medal className="w-10 h-10 mx-auto text-blue-500 mb-3" />
              <p className="text-4xl font-black text-gray-900 dark:text-white">{stats.milestones}</p>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wider">Milestones</p>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="mt-28 max-w-6xl mx-auto">
            <h2 className="text-3xl font-black mb-10 text-center text-gray-900 dark:text-white flex items-center justify-center gap-3 tracking-tight">
              <Award className="w-8 h-8 text-indigo-500" />
              Your Earned Badges
            </h2>

            {earnedBadges.length === 0 ? (
              <div className="text-center py-20 bg-white/50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-black/20 dark:border-white/10">
                <Award className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-xl font-bold">No badges earned yet.</p>
                <p className="text-gray-400 dark:text-gray-500 mt-2">Complete courses to unlock your first certificate!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {earnedBadges.map((badge) => (
                  <button
                    key={badge.id}
                    onClick={() => setSelectedBadge(badge)}
                    className="text-left p-6 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 group flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <Star className="w-12 h-12 text-yellow-500 dark:text-yellow-400" fill="currentColor" />
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 dark:text-white text-center line-clamp-2">
                      {badge.courseName}
                    </h3>

                    <div className="flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors">
                      <Download className="w-3.5 h-3.5" /> View Certificate
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Motivation Footer */}
      <div className="mt-32 max-w-4xl mx-auto text-center border-t border-black/10 dark:border-white/10 pt-16">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Small wins lead to big success 🚀
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Keep learning, keep earning — your journey has just begun.
        </p>
      </div>

      {/* Renders the digital certificate modal when a badge is clicked */}
      <CertificateModal
        badge={selectedBadge}
        user={user}
        onClose={() => setSelectedBadge(null)}
      />

    </div>
  );
}

export default Achievements;