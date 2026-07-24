import React, { useState, useEffect } from "react";
import { BookOpen, Compass, Trophy, Users, LogOut, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { account, databases, PROGRESS_COLLECTION_ID, DATABASE_ID } from "../../appwrite/config";
import Loader from "../../components/Other/Loader";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Authenticate and Load Data
  useEffect(() => {
    const initDashboard = async () => {
      try {
        // 1. Get active user session
        const currentUser = await account.get();
        setUser(currentUser);

        // 2. Fetch user's progress from Google Sheets
        // This hits the doGet function we just added to Apps Script
        const progressData = await databases.listDocuments(DATABASE_ID, PROGRESS_COLLECTION_ID);
        
        // Calculate progress if data exists (Mock calculation based on documents)
        if (progressData.documents && progressData.documents.length > 0) {
            // Example: If you have a 'completionPercentage' column in your UserProgress sheet
            const latestProgress = progressData.documents[0].completionPercentage || 0;
            setProgress(latestProgress);
        } else {
            setProgress(0); // Default for new users
        }

      } catch (error) {
        console.error("Dashboard initialization failed:", error);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate]);

  const cards = [
    { title: "Resources", desc: "Access notes & tutorials", icon: BookOpen, link: "/resources", color: "from-blue-500 to-indigo-600" },
    { title: "Learning Paths", desc: "Step-by-step roadmaps", icon: Compass, link: "/learningpaths", color: "from-green-500 to-emerald-600" },
    { title: "Achievements", desc: "Track milestones", icon: Trophy, link: "/achievements", color: "from-yellow-500 to-orange-600" },
    { title: "Community", desc: "Learn with peers", icon: Users, link: "/community", color: "from-pink-500 to-rose-600" },
  ];

  const formatName = (name = "") => 
    name.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 pb-24 dark:bg-black min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-white text-wrap">
            Welcome back{user?.name ? `, ${formatName(user.name)}` : ""} 👋
          </h1>
          <p className="mt-3 text-sm md:text-lg text-gray-600 dark:text-gray-400">
            Logged in as <span className="font-medium">{user?.email}</span>
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-10 max-w-6xl mx-auto p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow border border-gray-100 dark:border-gray-800">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Your Progress
        </p>
        <div className="mt-4 w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          {progress}% completed — keep going 💪
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="group p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow border border-gray-100 dark:border-gray-800 hover:border-indigo-100 dark:hover:border-indigo-500/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${card.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Motivation */}
      <div className="mt-20 max-w-4xl mx-auto text-center px-4">
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          Consistency beats intensity 🔥
        </p>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Even 30 minutes a day can change your future.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;