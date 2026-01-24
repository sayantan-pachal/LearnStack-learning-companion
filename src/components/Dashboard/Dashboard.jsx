import React, { useMemo } from "react";
import { BookOpen, Compass, Trophy, Users, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const session = useMemo(
    () => JSON.parse(localStorage.getItem("learnstack_user")),
    []
  );

  const users = useMemo(
    () => JSON.parse(localStorage.getItem("learnstack_users")) || [],
    []
  );

  const currentUser = users.find(
    (u) => u.email === session?.email
  );

  const handleLogout = () => {
    localStorage.removeItem("learnstack_user");
    navigate("/login", { replace: true });
  };

  const cards = [
    { title: "Resources", desc: "Access notes & tutorials", icon: BookOpen, link: "/resources", color: "from-blue-500 to-indigo-600" },
    { title: "Learning Paths", desc: "Step-by-step roadmaps", icon: Compass, link: "/learningpaths", color: "from-green-500 to-emerald-600" },
    { title: "Achievements", desc: "Track milestones", icon: Trophy, link: "/achievements", color: "from-yellow-500 to-orange-600" },
    { title: "Community", desc: "Learn with peers", icon: Users, link: "/community", color: "from-pink-500 to-rose-600" },
  ];

  return (
    <div className="pt-28 px-4 pb-24 dark:bg-black">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-start gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Welcome back{currentUser?.name ? `, ${currentUser.name}` : ""} 👋
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Logged in as{" "}
            <span className="font-medium">{session.email}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-red-500 text-white hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Progress */}
      <div className="mt-10 max-w-6xl mx-auto p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your Progress
        </p>
        <div className="mt-3 w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          35% completed — keep going 💪
        </p>
      </div>

      {/* Cards */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow
                       hover:scale-[1.03] transition"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${card.color}`}
            >
              <card.icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Motivation */}
      <div className="mt-24 max-w-4xl mx-auto text-center">
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
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