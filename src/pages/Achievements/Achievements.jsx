import React, { useState, useEffect } from "react";
import { Trophy, Star, Flame, Medal, CheckCircle, Award } from "lucide-react";
import { 
  databases, 
  DATABASE_ID, 
  PROGRESS_COLLECTION_ID, 
  COURSES_COLLECTION_ID 
} from "../../appwrite/config"; 
import Loader from "../../components/Other/Loader";

function Achievements() {
  const [stats, setStats] = useState({
    badgesCount: 0,
    streak: 7, // Static placeholder for now, update if you add an ActivityLogs streak calculator
    lessonsCompleted: 0,
    milestones: 0
  });
  
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievementsData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch User Progress (Your config.js automatically filters this for the current user)
        const progressRes = await databases.listDocuments(DATABASE_ID, PROGRESS_COLLECTION_ID);
        const progressData = progressRes.documents || [];

        // 2. Fetch Courses to get the Title and Badge names
        const coursesRes = await databases.listDocuments(DATABASE_ID, COURSES_COLLECTION_ID);
        const coursesData = coursesRes.documents || [];

        let totalLessons = 0;
        let milestoneCount = 0;
        let badgesList = [];

        progressData.forEach((progressDoc) => {
          // Calculate Total Lessons/Modules Completed
          if (progressDoc.CompletedModules) {
            totalLessons += Number(progressDoc.CompletedModules);
          }

          // Calculate Milestones (Courses at 100%)
          const percent = Number(progressDoc.CompletionPercentage) || 0;
          if (percent === 100) {
            milestoneCount += 1;
          }

          // Collect Earned Badges
          // If the Badge column in UserProgress is true/marked OR the course is 100% complete
          if (progressDoc.Badge || percent === 100) {
            // Find the matching course to get its specific Badge name and Title
            const matchedCourse = coursesData.find(c => c.ID === progressDoc.CourseId);

            if (matchedCourse && matchedCourse.Badge) {
              badgesList.push({
                id: progressDoc.CourseId, // Using CourseId as a unique key
                title: matchedCourse.Badge, // The badge name from the Courses sheet
                desc: `Earned from ${matchedCourse.Title}`,
                date: progressDoc.$updatedAt || new Date().toISOString() // Fallback if $updatedAt isn't present
              });
            }
          }
        });

        setStats({
          badgesCount: badgesList.length,
          streak: 7, 
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
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-purple-500 dark:to-pink-500">
            Achievements
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
          Track your progress. Celebrate every win 🎉
        </p>

        <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
          Every step matters. Earn badges, maintain streaks, and unlock milestones
          as you continue learning with LearnStack.
        </p>
      </div>

      {error ? (
          <div className="mt-12 text-center py-10 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 max-w-3xl mx-auto">
            <p className="text-lg font-bold">{error}</p>
          </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mt-20 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
              <Trophy className="w-10 h-10 mx-auto text-yellow-500 mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.badgesCount}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Badges Earned</p>
            </div>

            <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
              <Flame className="w-10 h-10 mx-auto text-orange-500 mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.streak}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Day Streak</p>
            </div>

            <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
              <CheckCircle className="w-10 h-10 mx-auto text-green-500 mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.lessonsCompleted}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Lessons Completed</p>
            </div>

            <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
              <Medal className="w-10 h-10 mx-auto text-blue-500 mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.milestones}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Milestones</p>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="mt-28 max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-10 text-center text-gray-900 dark:text-white flex items-center justify-center gap-3">
              <Award className="w-8 h-8 text-indigo-500" />
              Earned Badges
            </h2>

            {earnedBadges.length === 0 ? (
                <div className="text-center py-16 bg-white/50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-black/20 dark:border-white/20">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No badges earned yet. Complete courses to start earning!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-black/5 dark:border-white/5 backdrop-blur-sm shadow-sm text-center hover:scale-[1.05] hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="bg-yellow-100 dark:bg-yellow-900/20 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/40 transition-colors">
                        <Star className="w-10 h-10 text-yellow-500 dark:text-yellow-400" fill="currentColor" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {badge.title}
                      </h3>
                      <p className="text-xs font-medium mt-2 text-gray-500 dark:text-gray-400">
                        {badge.desc}
                      </p>
                    </div>
                  ))}
                </div>
            )}
          </div>
        </>
      )}

      {/* Motivation */}
      <div className="mt-32 max-w-4xl mx-auto text-center border-t border-black/10 dark:border-white/10 pt-16">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Small wins lead to big success 🚀
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Keep learning, keep earning — your journey has just begun.
        </p>
      </div>
    </div>
  );
}

export default Achievements;