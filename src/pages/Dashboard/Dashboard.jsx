import React, { useState, useEffect } from "react";
import { 
  BookOpen, Compass, Trophy, PlayCircle, 
  ArrowRight, CheckCircle2, Video, FileText, CalendarDays, Sparkles
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { account, databases, PROGRESS_COLLECTION_ID, COURSES_COLLECTION_ID, DATABASE_ID } from "../../appwrite/config";
import Loader from "../../components/Other/Loader";
import TodoApp from "./TodoApp";
import MusicApp from "./MusicApp";
import DailyQuote from "./DailyQuote";
import AchievementChart from "./AchievementChart";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeCourses, setActiveCourses] = useState([]);
  const [recentResources, setRecentResources] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const currentUser = await account.get();
        setUser(currentUser);

        const [progressRes, coursesRes] = await Promise.all([
          databases.listDocuments(DATABASE_ID, PROGRESS_COLLECTION_ID),
          databases.listDocuments(DATABASE_ID, COURSES_COLLECTION_ID)
        ]);

        const allProgress = progressRes.documents;
        const allCourses = coursesRes.documents;

        const myProgress = allProgress.filter(
          doc => String(doc.UserId) === String(currentUser.$id) || String(doc.userId) === String(currentUser.$id)
        );

        // 1. REAL ACTIVE COURSES
        const enrolledCoursesData = myProgress.map(prog => {
          const badgeValue = String(prog.Badge || "").toUpperCase();
          if (prog.CompletionPercentage >= 100 || badgeValue === "Y" || badgeValue === "C") return null;

          const courseDetails = allCourses.find(c => 
            String(c.ID) === String(prog.CourseId) || String(c.$id) === String(prog.CourseId)
          );
          
          if (!courseDetails) return null;
          
          return {
            id: prog.$id,
            courseId: courseDetails.$id || courseDetails.ID,
            title: courseDetails.Title,
            progress: prog.CompletionPercentage || 0,
            lastAccessed: new Date(prog.$updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          };
        }).filter(Boolean);

        setActiveCourses(enrolledCoursesData);

        // 2. REAL ACHIEVEMENT GRAPH DATA
        const monthCounts = new Array(12).fill(0);
        myProgress.forEach(prog => {
            const badgeValue = String(prog.Badge || "").toUpperCase();
            if (badgeValue === "Y" || badgeValue === "C") {
                const dateStr = prog.date || prog.Date || prog.$updatedAt;
                if (dateStr) {
                    const date = new Date(dateStr);
                    if (!isNaN(date.getTime())) {
                        monthCounts[date.getMonth()] += 1;
                    }
                }
            }
        });

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        setChartData(months.map((m, i) => ({ month: m, count: monthCounts[i] })));

        // 3. REAL NEW ADDITIONS
        const sortedCourses = [...allCourses].sort((a, b) => new Date(b.$createdAt || 0) - new Date(a.$createdAt || 0));
        const newestResources = sortedCourses.slice(0, 3).map((res) => ({
            id: res.$id || Math.random(),
            title: res.Title,
            type: res.YouTube_ID ? "Video Course" : "PDF Resource",
            icon: res.YouTube_ID ? Video : FileText,
            date: new Date(res.$createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));
        
        setRecentResources(newestResources);

      } catch (error) {
        console.error("Dashboard initialization failed:", error);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const formatName = (name = "") => 
    name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");

  // ✨ UPDATED: Strict greeting logic!
  const getGreeting = () => {
    const hour = new Date().getHours();
    
    // From 6:00 AM to 11:59 AM
    if (hour >= 6 && hour < 12) return "Good morning";
    
    // From 12:00 PM to 4:59 PM
    if (hour >= 12 && hour < 17) return "Good afternoon";
    
    // From 5:00 PM to 11:59 PM
    if (hour >= 17 && hour <= 23) return "Good evening";
    
    // From 12:00 AM to 5:59 AM
    return "Up late"; 
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-[#050505]">
        <Loader />
      </div>
    );
  }

  const maxChartValue = Math.max(...chartData.map(d => d.count), 1);
  const currentYear = new Date().getFullYear();
  const greeting = getGreeting();

  return (
    <div className="pt-24 sm:pt-28 px-4 pb-20 sm:pb-24 bg-[#f8f9fa] dark:bg-[#050505] min-h-screen font-dm overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* ================= HERO SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 shadow-sm">
                <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 text-theme-blue-500" /> {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight flex flex-wrap items-center gap-2 sm:gap-3">
              {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 dark:from-theme-blue-500 dark:to-theme-pink-400 break-words">{user?.name ? formatName(user.name) : "Learner"}</span>
            </h1>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          
          {/* LEFT COLUMN (Wider) */}
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            <div className="flex md:hidden">
              <DailyQuote  />
            </div>
            {/* ACHIEVEMENT GRAPH COMPONENT */}
            <AchievementChart chartData={chartData} maxChartValue={maxChartValue} currentYear={currentYear} />

            {/* IN PROGRESS COURSES */}
            <div>
              <div className="flex justify-between items-end mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-theme-pink-500 shrink-0" /> Active Learning
                </h2>
                <Link to="/mylearning" className="text-xs sm:text-sm font-bold text-theme-blue-600 hover:text-theme-pink-500 transition-colors whitespace-nowrap">
                    View Library →
                </Link>
              </div>
              
              {activeCourses.length === 0 ? (
                  <div className="bg-white dark:bg-[#0a0a0a] border border-dashed border-gray-300 dark:border-gray-800 rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-10 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 dark:bg-[#111] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-gray-100 dark:border-gray-800">
                          <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">You're all caught up!</h3>
                      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 max-w-sm mx-auto px-4">You have no active courses right now. Ready to start something new?</p>
                      <button onClick={() => navigate("/courses")} className="bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold hover:shadow-lg hover:shadow-theme-blue-500/20 transition-all hover:-translate-y-0.5">
                          Browse Catalog
                      </button>
                  </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {activeCourses.map(course => (
                    <div key={course.id} onClick={() => navigate("/mylearning")} className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 hover:shadow-xl hover:shadow-theme-blue-500/10 hover:border-theme-blue-300 dark:hover:border-theme-blue-500/50 transition-all duration-300 cursor-pointer group flex flex-col">
                        <div className="flex justify-between items-start mb-4 sm:mb-6">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-[#111] flex items-center justify-center group-hover:bg-theme-blue-50 dark:group-hover:bg-theme-blue-500/10 transition-colors shrink-0">
                                <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-theme-blue-600 dark:group-hover:text-theme-blue-400 transition-colors" />
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-[#111] px-2 py-1 rounded-md border border-gray-100 dark:border-gray-800 whitespace-nowrap">
                                {course.lastAccessed}
                            </span>
                        </div>
                        
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-4 sm:mb-6 line-clamp-2 leading-snug group-hover:text-theme-blue-600 dark:group-hover:text-theme-pink-400 transition-colors">
                            {course.title}
                        </h3>
                        
                        <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between text-[10px] sm:text-xs font-bold mb-2 sm:mb-3">
                                <span className="text-gray-500">Progress</span>
                                <span className="text-gray-900 dark:text-white">{course.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 sm:h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                <div 
                                    className="h-full rounded-full bg-gradient-to-r from-theme-blue-600 to-theme-pink-500 transition-all duration-1000 ease-out" 
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
              )}
            </div>
            
            {/* MUSIC APP */}
            <section className="h-[380px] sm:h-[450px]">
                <MusicApp />
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 sm:space-y-8 xl:pl-4">
            
            <div className="hidden md:flex">
              <DailyQuote  />
            </div>
            
            {/* QUICK ACTIONS BENTO */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Link to="/courses" className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[1.25rem] sm:rounded-3xl p-4 sm:p-5 hover:shadow-lg hover:border-theme-blue-300 dark:hover:border-theme-blue-500/50 transition-all group flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-theme-blue-50 dark:bg-theme-blue-500/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-theme-blue-600 dark:text-theme-blue-400" />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-xs sm:text-sm">Library</h3>
                </Link>

                <Link to="/learningpaths" className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[1.25rem] sm:rounded-3xl p-4 sm:p-5 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-500/50 transition-all group flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                        <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-xs sm:text-sm">Roadmaps</h3>
                </Link>
            </div>

            {/* RECENTLY ADDED */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[1.5rem] sm:rounded-3xl p-5 sm:p-6 shadow-sm">
                <h3 className="font-black text-base sm:text-lg text-gray-900 dark:text-white mb-4 sm:mb-6">New Releases</h3>
                <div className="space-y-3 sm:space-y-4">
                    {recentResources.map((resource) => (
                    <div key={resource.id} onClick={() => navigate("/courses")} className="group flex items-center gap-3 sm:gap-4 cursor-pointer">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 flex items-center justify-center shrink-0 group-hover:bg-theme-pink-50 dark:group-hover:bg-theme-pink-500/10 transition-colors">
                            <resource.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-theme-pink-500 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate group-hover:text-theme-pink-600 dark:group-hover:text-theme-pink-400 transition-colors">{resource.title}</h4>
                            <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 sm:mt-1">{resource.type} • {resource.date}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* TODO APP */}
            <section className="h-[380px] sm:h-[450px]">
                <TodoApp />
            </section>

          </div>

        </div>
        {/* ================= FOOTER PUNCHLINE ================= */}
        <div className="pt-10 pb-6 flex flex-col items-center justify-center text-center animate-in fade-in duration-1000 delay-500">
            <div className="w-16 h-1 bg-gradient-to-r from-theme-blue-500 to-theme-pink-500 rounded-full mb-6 opacity-50"></div>
            <p className="text-sm md:text-base font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                Stay curious. <span className="text-theme-blue-500 dark:text-theme-blue-400">Keep building.</span>
            </p>
        </div>
      </div>
    </div>
  );
}