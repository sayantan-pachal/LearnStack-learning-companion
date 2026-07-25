import React, { useState, useEffect } from "react";
import { 
  BookOpen, Compass, Trophy, Users, PlayCircle, 
  Clock, FileText, Video, Calendar, Flame, CheckCircle2, Bookmark
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { account, databases, PROGRESS_COLLECTION_ID, DATABASE_ID } from "../../appwrite/config";
import Loader from "../../components/Other/Loader";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [goals, setGoals] = useState([
  { id: 1, text: "Complete Array & String section", done: true },
  { id: 2, text: "Build a markdown previewer", done: false },
  { id: 3, text: "Review Java OOP concepts", done: false }
]);

const toggleGoal = (id) => {
  setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
};

  // In a real app, these would be fetched from your database
  const [activeCourses, setActiveCourses] = useState([
    { id: 1, title: "Data Structures & Algorithms in Java", progress: 68, lastAccessed: "2 hours ago" },
    { id: 2, title: "Foundational C# Mastery", progress: 32, lastAccessed: "Yesterday" },
    { id: 3, title: "Advanced React & Tailwind CSS", progress: 85, lastAccessed: "3 days ago" }
  ]);

  const [recentResources, setRecentResources] = useState([
    { id: 1, title: "Big O Notation Cheat Sheet", type: "pdf", icon: FileText, color: "text-red-500" },
    { id: 2, title: "React useMemo hook explained", type: "video", icon: Video, color: "text-blue-500" },
    { id: 3, title: "C++ Pointers Memory Management", type: "article", icon: BookOpen, color: "text-green-500" }
  ]);

  const [weeklyActivity, setWeeklyActivity] = useState([
    { day: "M", active: true }, { day: "T", active: true }, { day: "W", active: false },
    { day: "T", active: true }, { day: "F", active: true }, { day: "S", active: false }, { day: "S", active: false }
  ]);

  const [savedItems, setSavedItems] = useState([
  { id: 1, title: "System Design Interview Prep", type: "PDF Guide", time: "15 min read" },
  { id: 2, title: "CSS Flexbox Interactive Cheatsheet", type: "Resource Link", time: "Interactive" }
]);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        // Fetch actual progress/activity data here in the future
      } catch (error) {
        console.error("Dashboard initialization failed:", error);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, [navigate]);

  const formatName = (name = "") => 
    name.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

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
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome back{user?.name ? `, ${formatName(user.name)}` : ""} 👋
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            You're on a <span className="font-bold text-orange-500 dark:text-orange-400">4-day learning streak</span>. Keep it up!
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Core Content (Courses & Resources) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Continue Learning Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Continue Learning</h2>
                <Link to="/learningpaths" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">View all</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCourses.map(course => (
                  <div key={course.id} className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-blue-500/30 transition-colors shadow-sm group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {course.lastAccessed}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-1000 ease-out" 
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Saved for Later Section */}
<section>
  <div className="flex items-center gap-2 mb-4">
    <Bookmark className="w-5 h-5 text-gray-500" />
    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved for Later</h2>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {savedItems.map(item => (
      <div key={item.id} className="group p-4 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-indigo-500/30 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {item.type}
            </span>
            <Bookmark className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 fill-transparent group-hover:fill-indigo-500/20 transition-all" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
            {item.title}
          </h3>
        </div>
        <div className="mt-3 text-xs text-gray-500 font-medium">
          {item.time}
        </div>
      </div>
    ))}
  </div>
</section>

            {/* Recent Resources Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recently Accessed</h2>
              <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
                {recentResources.map((resource, index) => (
                  <div 
                    key={resource.id} 
                    className={`flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer ${
                      index !== recentResources.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center ${resource.color}`}>
                      <resource.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{resource.title}</h4>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{resource.type}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-gray-300 dark:text-gray-700 hover:text-green-500 transition-colors" />
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sidebar (Activity & Quick Links) */}
          <div className="space-y-8">
            
            {/* Weekly Activity / Calendar Snippet */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-gray-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">Activity</h3>
              </div>
              
              <div className="flex justify-between items-end h-24 mb-4">
                {weeklyActivity.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-8 rounded-md transition-all duration-500 ${
                        day.active 
                          ? 'bg-blue-600 dark:bg-blue-500 h-16' 
                          : 'bg-gray-100 dark:bg-gray-800 h-4'
                      }`}
                    />
                    <span className="text-xs font-semibold text-gray-500">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm">
                <span className="text-gray-500">This week</span>
                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" /> 12.5 hrs
                </span>
              </div>
            </div>

            {/* Quick Actions (Your original cards reimagined as a sidebar menu) */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white px-2 py-2 mb-2 text-sm uppercase tracking-wider">Quick Actions</h3>
              
              <Link to="/resources" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Browse Resources</div>
                  <div className="text-xs text-gray-500">Find new notes & tutorials</div>
                </div>
              </Link>
              
              <Link to="/learningpaths" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Learning Paths</div>
                  <div className="text-xs text-gray-500">View your roadmaps</div>
                </div>
              </Link>

              <Link to="/achievements" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Achievements</div>
                  <div className="text-xs text-gray-500">Track your milestones</div>
                </div>
              </Link>
            </div>
            {/* Daily Goals */}
<div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-bold text-gray-900 dark:text-white">Daily Goals</h3>
    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md">
      {goals.filter(g => g.done).length}/{goals.length}
    </span>
  </div>
  
  <div className="space-y-3">
    {goals.map((goal) => (
      <label 
        key={goal.id} 
        className="flex items-start gap-3 cursor-pointer group"
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input 
            type="checkbox" 
            className="peer sr-only" 
            checked={goal.done}
            onChange={() => toggleGoal(goal.id)}
          />
          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-700 rounded transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 group-hover:border-blue-500"></div>
          <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={3} />
        </div>
        <span className={`text-sm font-medium transition-all ${
          goal.done 
            ? "text-gray-400 dark:text-gray-600 line-through" 
            : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
        }`}>
          {goal.text}
        </span>
      </label>
    ))}
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;