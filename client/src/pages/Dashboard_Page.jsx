import { useState, useEffect } from "react";
import { Search, User, Sun, Moon, ChevronDown, LogOut } from "lucide-react";
import axios from "axios";

import MigrationChart from "../components/dashboard/MigrationChart";
import MigrationsSection from "../components/dashboard/Migrations";
import MigrationInsights from "../components/dashboard/Migration_Insights";
import MigrationStatistics from "../components/dashboard/MigrationStatistics";
import RollbackSnapshots from "../components/dashboard/Rollback_Section";
import EmailReports from "../components/dashboard/EmailsReport";
import QuickActions from "../components/dashboard/QuickActions";
import { useTheme } from "../contexts/ThemeContext";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [activeLogs, setActiveLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch logs data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("api/logs.json");
        setActiveLogs(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError("Failed to load logs. Please try again later.");
        setIsLoading(false);
        // Fallback to mock data if API fails
        setActiveLogs([
          {
            id: 1,
            timestamp: "14:32:54",
            message: "Migration #156 completed successfully",
            type: "success",
          },
          {
            id: 2,
            timestamp: "14:29:12",
            message: "Applying changes to users table",
            type: "info",
          },
          {
            id: 3,
            timestamp: "14:28:47",
            message: "Creating new index on products.category_id",
            type: "info",
          },
          {
            id: 4,
            timestamp: "14:25:33",
            message: "Failed to update foreign key constraint",
            type: "error",
          },
          {
            id: 5,
            timestamp: "14:22:19",
            message: "Migration #155 initiated by admin@example.com",
            type: "info",
          },
        ]);
      }
    };

    fetchData();
  }, []);

  // Simulate real-time logs
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        message: `Processing schema changes ${Math.floor(Math.random() * 100)}`,
        type: ["info", "success", "warning", "error"][
          Math.floor(Math.random() * 4)
        ],
      };

      setActiveLogs((prev) => [newLog, ...prev.slice(0, 6)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardContent
      activeLogs={activeLogs}
      isLoading={isLoading}
      error={error}
      isDropdownOpen={isDropdownOpen}
      setIsDropdownOpen={setIsDropdownOpen}
    />
  );
}

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(`Error during logout: ${error.message}`);
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Unexpected logout error:", error);
  }
};

function DashboardContent({
  activeLogs,
  isLoading,
  error,
  isDropdownOpen,
  setIsDropdownOpen,
}) {
  const { theme, toggleTheme } = useTheme();

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 via-black to-gray-900"
      : "bg-gradient-to-b from-blue-50 via-white to-sky-50";

  const headerGradient =
    theme === "dark"
      ? "bg-gradient-to-br from-black via-gray-950 to-purple-500/10"
      : "bg-gradient-to-br from-white via-blue-50 to-indigo-200/30";

  const cardGradient =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-400/10 to-black/25"
      : "bg-gradient-to-br from-white/80 to-blue-100/40";

  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const subTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor =
    theme === "dark" ? "border-stone-500/30" : "border-gray-200";
  const inputBg =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-900/80 to-gray-800/40"
      : "bg-gradient-to-br from-white to-gray-100/80";
  const inputBorder =
    theme === "dark" ? "border-gray-700/50" : "border-gray-300";
  const inputText = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <div
      className={`flex h-screen overflow-hidden ${bgGradient} backdrop-blur-lg transition-colors duration-500`}
    >
      <main
        className={`flex-1 overflow-y-auto clientc border-l ${borderColor} transition-colors duration-500`}
      >
        <div
          className={`min-h-screen ${
            theme === "dark" ? "bg-gray-900" : "bg-blue-50"
          } font-Outfit transition-colors duration-500`}
        >
          {/* Header */}
          <header
            className={`bg-transparent ${headerGradient} m-4 md:m-6 rounded-3xl shadow-lg backdrop-blur-sm bg-opacity-40 sticky top-0 z-10 border ${
              theme === "dark" ? "border-gray-800/30" : "border-gray-200/60"
            } transition-all duration-500`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              {/* Logo */}
              <div className="relative">
                <h1
                  className={`text-2xl font-Krona ${textColor} tracking-tight bg-clip-text ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-white to-gray-300"
                      : "bg-gradient-to-r from-gray-800 to-indigo-600"
                  } transition-colors duration-500`}
                >
                  Refyn
                </h1>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500/80 to-transparent"></div>
              </div>

              {/* Right side controls */}
              <div className="flex items-center space-x-3 md:space-x-5">
                {/* Search Bar - Responsive */}
                <div className="relative group hidden sm:block">
                  <input
                    type="text"
                    placeholder="Search migrations..."
                    className={`px-12 py-3 rounded-3xl border ${inputBorder} w-48 md:w-64 lg:w-80 ${inputBg} ${inputText} shadow-inner focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 focus:outline-none transition-all duration-300`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search
                      className={`size-5 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      } group-hover:text-indigo-400 transition-colors duration-300`}
                    />
                  </div>
                </div>

                {/* Mobile Search Icon */}
                <button
                  className={`sm:hidden ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-white hover:bg-gray-100 text-gray-700"
                  } p-3 rounded-full cursor-pointer transition transform hover:scale-105 hover:shadow-lg border ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <Search className="size-5" />
                </button>

                {/* Theme Toggle Dropdown */}
                <div className="relative">
                  <button
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-100"
                    } p-3 rounded-full cursor-pointer transition transform hover:scale-105 hover:shadow-lg flex items-center gap-2 border ${
                      theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-expanded={isDropdownOpen}
                    aria-label="User menu"
                  >
                    {theme === "dark" ? (
                      <Moon className="size-5 text-indigo-300" />
                    ) : (
                      <Sun className="size-5 text-amber-400" />
                    )}
                    <ChevronDown
                      className={`size-4 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      } transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl ${
                        theme === "dark"
                          ? "bg-gray-800 border border-gray-700"
                          : "bg-white border border-gray-200"
                      } py-1 z-20 animate-fadeIn overflow-hidden`}
                    >
                      {/* Theme Toggle Option */}
                      <button
                        className={`flex items-center gap-2 px-4 py-3 text-sm ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        } w-full text-left transition-colors duration-150`}
                        onClick={() => {
                          toggleTheme();
                          setIsDropdownOpen(false);
                        }}
                      >
                        {theme === "dark" ? (
                          <>
                            <Sun className="size-4 text-amber-400" />
                            <span>Light Mode</span>
                          </>
                        ) : (
                          <>
                            <Moon className="size-4 text-indigo-400" />
                            <span>Dark Mode</span>
                          </>
                        )}
                      </button>

                      {/* Profile Option */}
                      <button
                        className={`flex items-center gap-2 px-4 py-3 text-sm ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        } w-full text-left transition-colors duration-150 border-t ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-200"
                        }`}
                      >
                        <User
                          className={`size-4 ${
                            theme === "dark"
                              ? "text-indigo-300"
                              : "text-indigo-500"
                          }`}
                        />
                        <span>My Profile</span>
                      </button>

                      {/* Logout Option */}
                      <button
                        onClick={handleLogout}
                        className={`flex items-center gap-2 px-4 py-3 text-sm ${
                          theme === "dark"
                            ? "text-red-500 hover:bg-gray-700"
                            : "text-red-500 hover:bg-gray-100"
                        } w-full text-left transition-colors duration-150 border-t ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-200"
                        }`}
                      >
                        <LogOut className="size-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* User Profile Button */}
                <button
                  className={`bg-gradient-to-br ${
                    theme === "dark"
                      ? "from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600"
                      : "from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500"
                  } text-gray-100 p-3 rounded-full cursor-pointer transition transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center`}
                >
                  <User className="size-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 flex flex-col lg:flex-row">
            {/* Left Section */}
            <div className="w-full lg:w-4/5 lg:pr-8 space-y-8">
              {/* Stats Cards */}
              <MigrationStatistics theme={theme} />

              {/* Migration Overview Chart */}
              <MigrationChart theme={theme} />

              <MigrationsSection theme={theme} />
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/5 lg:pl-1 space-y-4 mt-8 lg:mt-0">
              {/* Quick Actions */}
              <QuickActions theme={theme} />

              <MigrationInsights theme={theme} />

              {/* Rollback Snapshots */}
              <RollbackSnapshots theme={theme} />
            </div>
          </main>
          {/* Email Summary */}
          <EmailReports theme={theme} />

          {/* Loading indicator */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div
                className={`${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } rounded-lg p-6 shadow-xl flex items-center space-x-4 animate-fadeIn`}
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Loading dashboard data...
                </p>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg animate-fadeIn">
              <p className="font-medium">{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper Components
function StatsCard({ title, value, icon, color, theme }) {
  const cardBg =
    theme === "dark"
      ? "from-gray-400/10 to-black/25"
      : "from-white/80 to-blue-100/40";

  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const subTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderStyle =
    theme === "dark" ? "border-[#8B5CFA4D]" : "border-indigo-200";

  return (
    <div className="relative overflow-hidden backdrop-blur-md w-48 h-52 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:border hover:border-[#8B5CFA4D] group animate-fadeIn">
      {/* Subtle gradient border */}
      <div
        className={`absolute inset-0 p-0.5 rounded-xl bg-gradient-to-br ${
          theme === "dark"
            ? "from-gray-900 via-transparent to-black"
            : "from-blue-50 via-transparent to-white"
        } opacity-50`}
      ></div>

      {/* Glass effect background */}
      <div
        className={`relative bg-transparent bg-gradient-to-br ${cardBg} rounded-xl p-4 h-full`}
      >
        {/* Background glow - smaller and more subtle */}
        <div
          className={`absolute -right-3 -bottom-3 size-16 ${color.replace(
            "bg-",
            "bg-"
          )}/10 blur-xl rounded-full transition-opacity duration-300 group-hover:opacity-100 opacity-50`}
        ></div>

        <div className="relative flex flex-col items-center text-center">
          <div
            className={`bg-${color} p-3 mt-4 rounded-full text-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-110`}
          >
            {icon}
          </div>

          <div className="py-8 space-y-1 w-full">
            <p
              className={`text-sm font-Syne font-medium ${subTextColor} tracking-wide uppercase`}
            >
              {title}
            </p>
            <p className={`text-2xl font-semibold font-Outfit ${textColor}`}>
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label, color, hoverColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  return (
    <button
      className={`bg-gradient-to-br ${
        isHovered ? hoverColor : color
      } text-white p-4 rounded-2xl shadow-md 
      transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center h-24
      relative overflow-hidden group animate-fadeIn`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-white opacity-10 rounded-lg"></div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-white opacity-10 rounded-t-lg"></div>

      {/* Icon with pulse animation on hover */}
      <div className="relative z-10 text-white mb-2 group-hover:animate-pulse">
        {icon}
      </div>

      {/* Label with slight glow effect */}
      <span className="relative z-10 pt-4 text-sm font-Montserrat tracking-wide">
        {label}
      </span>

      {/* Mirror shine effect that moves on hover */}
      <div
        className={`absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white to-black/15 
      -skew-x-12 transform transition-transform duration-700 ${
        isHovered ? "translate-x-full" : "-translate-x-full"
      }`}
      ></div>
    </button>
  );
}
