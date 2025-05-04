import { useState, useEffect } from "react";
import {
  RefreshCw, User, Settings, Database, Sparkles, Code, FileCheck,
  ServerCrash, LogOut, Clock, ChevronDown, Sun, Moon, Menu, X,
} from "lucide-react";

import { LiveMigrationLogs, SchemaViewer } from "../components/dashboard/Subparts";
import SchemaDiff from "../components/migrations/SchemaDiff";
import DataMigrationStepper from "../components/migrations/Migration_Progress";
import RollbackOptions from "../components/migrations/Rollback_Options";
import MigrationSettings from "../components/migrations/MigrationSettings";
import { useTheme } from "../contexts/ThemeContext";

export default function MigrationDashboard() {
  const [activeTab, setActiveTab] = useState("schema");
  const [animateIn, setAnimateIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentMigration, setCurrentMigration] = useState({
    name: "Monthly User Data Migration",
    sourceDb: "PostgreSQL Production",
    targetDb: "AWS Aurora Cluster",
    createdAt: "April 15, 2025",
    lastUpdated: "April 22, 2025",
    status: "pending",
    initiatedBy: "stuzus",
    progress: 2,
  });
  const [isRollbackModalOpen, setIsRollbackModalOpen] = useState(false);

  const handleOpenRollbackModal = () => {
    setIsRollbackModalOpen(true);
  };

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const { theme, toggleTheme } = useTheme();

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 via-black to-gray-900"
      : "bg-gradient-to-b from-blue-50 via-white to-sky-50";

  const headerGradient =
    theme === "dark"
      ? "bg-gradient-to-br from-black via-gray-950 to-purple-500/20"
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

  const migrationSteps = [
    {
      id: 1,
      label: "Schema Extraction",
      completed: true,
      icon: <Code size={16} />,
    },
    {
      id: 2,
      label: "Schema Conversion (AI-assisted)",
      completed: true,
      icon: <Sparkles size={16} />,
    },
    {
      id: 3,
      label: "Data Validation",
      completed: false,
      icon: <FileCheck size={16} />,
    },
    {
      id: 4,
      label: "Data Migration (Batch Progress)",
      completed: false,
      icon: <Database size={16} />,
    },
    {
      id: 5,
      label: "Completion / Error Recovery",
      completed: false,
      icon: <ServerCrash size={16} />,
    },
  ];

  const tabs = [
    { id: "schema", label: "Schema", icon: <Code size={16} /> },
    {
      id: "dataMigration",
      label: "Data Migration",
      icon: <Database size={16} />,
    },
    {
      id: "settings",
      label: "Migration Settings",
      icon: <Settings size={16} />,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <div className="bg-black border-2 border-yellow-400/60 border-opacity-30 text-indigo-100 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-Outfit flex items-center gap-2 shadow-lg shadow-yellow-400/20">
            <div className="size-2 rounded-full bg-yellow-400"></div>
            <span className="hidden xs:inline">Pending</span>
          </div>
        );
      case "running":
        return (
          <div className="bg-gray-950 border border-gray-400/25 text-yellow-400 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-Outfit flex items-center gap-2 shadow-lg shadow-yellow-900/20">
            <RefreshCw size={14} className="animate-spin" />
            <span className="hidden xs:inline">Running</span>
          </div>
        );
      case "completed":
        return (
          <div className="bg-transparent bg-gradient-to-br from-gray-800 to-black/40 border border-gray-500/10 text-green-400 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-Outfit flex items-center gap-2 shadow-lg shadow-green-900/20">
            <div className="size-2 rounded-full bg-green-400"></div>
            <span className="hidden xs:inline">Completed</span>
          </div>
        );
      case "failed":
        return (
          <div className="border border-red-900 text-gray-300 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-Outfit flex items-center gap-2 shadow-lg shadow-red-950/20">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <span className="hidden xs:inline">Failed</span>
          </div>
        );
      default:
        return (
          <div className="bg-gray-900 bg-opacity-20 backdrop-blur-md border border-gray-500 border-opacity-30 text-gray-300 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 shadow-lg shadow-gray-900/20">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span className="hidden xs:inline">{status}</span>
          </div>
        );
    }
  };

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
            className={`bg-transparent ${headerGradient} mx-2 md:m-4 rounded-2xl md:rounded-3xl shadow-lg backdrop-blur-sm bg-opacity-40 sticky top-0 z-10 border ${
              theme === "dark" ? "border-gray-800/30" : "border-gray-200/60"
            } transition-all duration-500`}
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 lg:py-4 flex justify-between items-center">
              {/* Logo and Migration Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <h1
                    className={`text-xl md:text-2xl font-Krona ${textColor} tracking-tight bg-clip-text ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-white to-gray-300"
                        : "bg-gradient-to-r from-gray-800 to-indigo-600"
                    } transition-colors duration-500`}
                  >
                    Refyn
                  </h1>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500/80 to-transparent"></div>
                </div>
                
                {/* Migration Status - Desktop */}
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-2 md:gap-3">
                {/* Mobile menu button */}
                <button
                  className="lg:hidden p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700/50"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="size-5 text-gray-300" />
                  ) : (
                    <Menu className="size-5 text-gray-300" />
                  )}
                </button>

                {/* Desktop actions */}
                <div className="hidden lg:flex items-center gap-3">
                  <button
                    onClick={handleOpenRollbackModal}
                    className="bg-transparent bg-gradient-to-br from-black to-red-950 border border-red-500/30 text-gray-300 px-3 py-1.5 rounded-full text-xs font-Outfit flex items-center gap-2 shadow-lg shadow-red-700/10 hover:bg-red-900/20 transition-all duration-300"
                  >
                    <div className="size-2 rounded-full bg-red-600"></div>
                    <span>Rollback</span>
                  </button>
                </div>

                {/* Theme Toggle Dropdown */}
                <div className="relative">
                  <button
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800/80 hover:bg-gray-700/90"
                        : "bg-white/90 hover:bg-gray-100"
                    } p-2 md:p-3 rounded-full cursor-pointer transition transform hover:scale-105 hover:shadow-lg flex items-center gap-1 border ${
                      theme === "dark" ? "border-gray-700/60" : "border-gray-200"
                    }`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-expanded={isDropdownOpen}
                    aria-label="User menu"
                  >
                    {theme === "dark" ? (
                      <Moon className="size-4 md:size-5 text-indigo-300" />
                    ) : (
                      <Sun className="size-4 md:size-5 text-amber-400" />
                    )}
                    <ChevronDown
                      className={`hidden md:block size-4 ${
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
                          ? "bg-gray-800/95 border border-gray-700"
                          : "bg-white/95 border border-gray-200"
                      } py-1 z-50 animate-fadeIn overflow-hidden backdrop-blur-sm`}
                    >
                      {/* Theme Toggle Option */}
                      <button
                        className={`flex items-center gap-2 px-4 py-3 text-sm ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700/80"
                            : "text-gray-700 hover:bg-gray-100/80"
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
                            ? "text-gray-300 hover:bg-gray-700/80"
                            : "text-gray-700 hover:bg-gray-100/80"
                        } w-full text-left transition-colors duration-150 border-t ${
                          theme === "dark"
                            ? "border-gray-700/60"
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
                            ? "text-red-400 hover:bg-gray-700/80"
                            : "text-red-500 hover:bg-gray-100/80"
                        } w-full text-left transition-colors duration-150 border-t ${
                          theme === "dark"
                            ? "border-gray-700/60"
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
                  } text-gray-100 p-2 md:p-3 rounded-full cursor-pointer transition transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center`}
                >
                  <User className="size-4 md:size-5" />
                </button>
              </div>
            </div>
            
            {/* Mobile dropdown menu */}
            {isMobileMenuOpen && (
              <div className={`lg:hidden px-4 pb-3 pt-1 ${
                theme === "dark" ? "bg-gray-900/70" : "bg-white/70"
              } backdrop-blur-md rounded-b-2xl animate-fadeIn border-t ${
                theme === "dark" ? "border-gray-800/40" : "border-gray-200/60"
              }`}>
                <div className="flex justify-between items-center py-2">
                  <span className={`text-xs font-mono ${subTextColor}`}>{currentMigration.name}</span>
                  {getStatusBadge(currentMigration.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={handleOpenRollbackModal}
                    className="bg-transparent bg-gradient-to-br from-black to-red-950 border border-red-500/30 text-gray-300 px-3 py-1.5 rounded-full text-xs font-Outfit flex items-center justify-center gap-2 shadow-md shadow-red-700/10 hover:bg-red-900/20 transition-all duration-300"
                  >
                    <div className="size-2 rounded-full bg-red-600"></div>
                    <span>Rollback</span>
                  </button>
                  
                  <button className="flex items-center justify-center gap-2 bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 px-3 py-1.5 rounded-full text-xs border border-gray-700/40 transition-all duration-300">
                    <Settings size={14} />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            )}
          </header>

          {/* Migration Progress Overview */}
          <div className={`mx-2 md:mx-4 mt-3 md:mt-4 p-3 md:p-4 rounded-xl md:rounded-2xl ${
            theme === "dark" ? "bg-gray-900/60" : "bg-white/60"
          } border ${
            theme === "dark" ? "border-gray-800/40" : "border-gray-200/60"
          } shadow-md backdrop-blur-sm transition-all duration-700 ${
            animateIn ? "opacity-100" : "opacity-0"
          }`}>
            <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
              <div>
                <h2 className={`text-lg md:text-xl font-medium ${textColor}`}>{currentMigration.name}</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs md:text-sm">
                  <span className={subTextColor}>
                    <span className="opacity-70">Source:</span> {currentMigration.sourceDb}
                  </span>
                  <span className={subTextColor}>
                    <span className="opacity-70">Target:</span> {currentMigration.targetDb}
                  </span>
                  <span className={subTextColor}>
                    <span className="opacity-70">Updated:</span> {currentMigration.lastUpdated}
                  </span>
                </div>
              </div>
              
              <div className="mt-2 md:mt-0 flex items-center gap-2">
                <div className="text-xs md:text-sm bg-gray-800/40 px-2 py-1 rounded-md border border-gray-700/30">
                  <span className={`${subTextColor} mr-1`}>Progress:</span>
                  <span className={textColor}>{currentMigration.progress}/5</span>
                </div>
                
                <div className="h-1.5 md:h-2 flex-1 md:w-40 bg-gray-800/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full"
                    style={{ width: `${(currentMigration.progress / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`flex flex-col md:flex-row mt-3 mx-2 md:mx-4 transition-all duration-700 delay-300 ${
              animateIn ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Progress Tracker */}
            <div className="w-full md:w-1/2 p-3 md:p-6">
              <h2 className="text-sm mb-4 md:mb-6 flex items-center gap-2 font-Krona">
                <Clock className="size-4 md:size-5 text-yellow-400" />
                Progress Tracker / Timeline
              </h2>
              <div className="flex flex-col">
                {migrationSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex mb-6 md:mb-8 relative transition-all duration-300 hover:translate-x-1"
                  >
                    {/* Timeline connector */}
                    {index < migrationSteps.length - 1 && (
                      <div
                        className={`absolute left-4 top-4 w-0.5 h-8 md:h-12 transition-all duration-700 ${
                          currentMigration.progress >= step.id
                            ? "bg-gradient-to-b from-purple-500 to-black"
                            : "bg-gray-700"
                        }`}
                      ></div>
                    )}

                    {/* Step circle */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                        currentMigration.progress >= step.id
                          ? "bg-gradient-to-br from-black/10 to-purple-600 text-white shadow-lg shadow-indigo-700/50"
                          : "bg-gray-800 text-gray-400 border border-gray-700"
                      }`}
                    >
                      {step.id}
                    </div>

                    {/* Step label */}
                    <div className="ml-4 flex items-center gap-2">
                      <div
                        className={`p-2 rounded-md backdrop-blur-md transition-all duration-300 ${
                          currentMigration.progress >= step.id
                            ? "bg-transparent bg-gradient-to-br from-indigo-700/90 to-black bg-opacity-20 border border-indigo-900/40 shadow-lg shadow-indigo-900/10"
                            : "bg-transparent bg-gradient-to-br from-transparent to-gray-600/30 bg-opacity-30 border border-gray-800/30"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <p
                        className={`transition-all font-Outfit duration-300 text-sm md:text-base ${
                          currentMigration.progress >= step.id
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Migration Logs */}
            <div className="w-full md:w-1/2 p-3 md:p-4">
              <LiveMigrationLogs />
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            className={`border-t border-gray-800/40 mt-4 transition-all duration-700 delay-500 ${
              animateIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 md:px-6 py-3 md:py-4 relative flex items-center gap-2 transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-indigo-300"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span
                    className={`transition-all duration-300 ${
                      activeTab === tab.id ? "text-indigo-400" : "text-gray-500"
                    }`}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-sm"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div
              className={`mx-2 md:mx-4 my-4 transition-all duration-700 delay-400 ${
                animateIn ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Schema */}
              {activeTab === "schema" && (
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  <div className="w-full lg:w-1/2 p-2 md:p-4">
                    <SchemaViewer />
                  </div>
                  <div className="w-full lg:w-1/2 p-2 md:p-4">
                    <SchemaDiff />
                  </div>
                </div>
              )}

              {activeTab === "dataMigration" && <DataMigrationStepper />}
              {activeTab === "settings" && (
                <MigrationSettings
                  settings={{
                    sourceDb: "postgres://admin:secret@prod-db.io:5432/db_main",
                    targetDb:
                      "postgres://admin:secret@backup-db.io:5432/db_backup",
                    migrationType: "incremental",
                    rbac: ["Admin", "DevOps"],
                  }}
                />
              )}
            </div>
            <RollbackOptions
              isOpen={isRollbackModalOpen}
              setIsOpen={setIsRollbackModalOpen}
            />
          </div>

          {/* Custom style for scrollbars */}
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(31, 41, 55, 0.5);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(
                to bottom,
                rgba(99, 102, 241, 0.5),
                rgba(168, 85, 247, 0.5)
              );
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(
                to bottom,
                rgba(99, 102, 241, 0.8),
                rgba(168, 85, 247, 0.8)
              );
            }
          `}</style>
        </div>
      </main>
    </div>
  );
}