import { useState, useEffect } from "react";
import { BarChart, CheckCircle, XCircle, Clock, RefreshCw, TrendingUp, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MigrationStatistics({ theme = "dark" }) {
  const [migrationStats, setMigrationStats] = useState({
    total: 1842,
    successful: 1634,
    failed: 128,
    pending: 80,
    avgDuration: "3m 42s",
    lastWeek: {
      total: 98,
      successful: 86,
      failed: 9,
      pending: 3
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [timeFilter, setTimeFilter] = useState("all");
  
  // Theme-aware color scheme
  const colors = {
    dark: {
      background: "bg-gradient-to-br from-black via-gray-950 to-purple-500/15",
      cardBg: "bg-gradient-to-br from-gray-900/80 to-gray-800/50",
      text: "text-gray-200",
      subText: "text-gray-400",
      border: "border-gray-700",
      shadow: "shadow-xl shadow-purple-900/10",
      hoverShadow: "shadow-xl shadow-purple-800/20",
      primary: {
        bg: "#8B5CF6",
        shadow: "rgba(139, 92, 246, 0.3)",
        text: "text-purple-300"
      },
      success: {
        bg: "#10B981",
        shadow: "rgba(16, 185, 129, 0.3)",
        text: "text-emerald-300"
      },
      warning: {
        bg: "#F59E0B",
        shadow: "rgba(245, 158, 11, 0.3)",
        text: "text-amber-300"
      },
      danger: {
        bg: "#EF4444",
        shadow: "rgba(239, 68, 68, 0.3)",
        text: "text-rose-300"
      }
    },
    light: {
      background: "bg-gradient-to-br from-gray-50 via-white to-purple-100/30",
      cardBg: "bg-white",
      text: "text-gray-800",
      subText: "text-gray-600",
      border: "border-gray-200",
      shadow: "shadow-lg shadow-purple-200/30",
      hoverShadow: "shadow-xl shadow-purple-300/30",
      primary: {
        bg: "#8B5CF6",
        shadow: "rgba(139, 92, 246, 0.2)",
        text: "text-purple-700"
      },
      success: {
        bg: "#10B981",
        shadow: "rgba(16, 185, 129, 0.2)",
        text: "text-emerald-700"
      },
      warning: {
        bg: "#F59E0B", 
        shadow: "rgba(245, 158, 11, 0.2)",
        text: "text-amber-700"
      },
      danger: {
        bg: "#EF4444",
        shadow: "rgba(239, 68, 68, 0.2)",
        text: "text-rose-700"
      }
    }
  };
  
  const currentTheme = colors[theme];
  
  const refreshStats = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        // Simulate updated stats
        setMigrationStats(prev => ({
          ...prev,
          total: prev.total + Math.floor(Math.random() * 5),
          successful: prev.successful + Math.floor(Math.random() * 4),
          failed: prev.failed + (Math.random() > 0.7 ? 1 : 0),
          pending: Math.max(1, Math.floor(Math.random() * 5)),
          lastWeek: {
            ...prev.lastWeek,
            total: prev.lastWeek.total + Math.floor(Math.random() * 2),
            successful: prev.lastWeek.successful + Math.floor(Math.random() * 2),
          }
        }));
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Failed to fetch migration stats:", error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    refreshStats();
    // Set up polling for live stats every 30 seconds
    const interval = setInterval(refreshStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get filtered stats based on timeFilter
  const getFilteredStats = () => {
    if (timeFilter === "week") {
      return migrationStats.lastWeek;
    }
    return {
      total: migrationStats.total,
      successful: migrationStats.successful,
      failed: migrationStats.failed,
      pending: migrationStats.pending
    };
  };

  const filteredStats = getFilteredStats();
  
  // Calculate percentage change for insights
  const successRate = Math.round((filteredStats.successful / filteredStats.total) * 100) || 0;
  const failureRate = Math.round((filteredStats.failed / filteredStats.total) * 100) || 0;
  
  return (
    <motion.section
      className={`rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-sm ${currentTheme.background} ${currentTheme.shadow}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <span 
              className="w-1 h-6 rounded-r mr-3 hidden sm:inline-block" 
              style={{
                background: `linear-gradient(to bottom, ${currentTheme.primary.bg}, ${currentTheme.primary.bg}CC)`,
                boxShadow: `0 0 8px ${currentTheme.primary.shadow}`
              }}
            ></span>
            <h2 className={`${currentTheme.text} font-medium text-lg md:text-xl`}>
              Database Migration Statistics
            </h2>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {/* Time filter buttons */}
            <div className={`flex rounded-lg overflow-hidden ${currentTheme.border} border`}>
              <button
                onClick={() => setTimeFilter("all")}
                className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  timeFilter === "all" 
                    ? `bg-purple-600 text-white` 
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => setTimeFilter("week")}
                className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                  timeFilter === "week" 
                    ? `bg-purple-600 text-white` 
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                }`}
              >
                <Calendar size={12} />
                Last Week
              </button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshStats}
              disabled={isLoading}
              className={`text-gray-400 hover:text-white p-2 rounded-lg transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-gray-100'}`}
              style={{
                backdropFilter: "blur(4px)",
                border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              <RefreshCw 
                size={16} 
                className={`${isLoading ? "animate-spin" : ""}`} 
              />
            </motion.button>
          </div>
        </div>
        
        {/* Main stats cards with responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="Total Migrations" 
            value={filteredStats.total} 
            icon={<BarChart size={24} />}
            theme={theme}
            colorType="primary"
            isHovering={isHovering}
          />
          <StatsCard 
            title="Successful" 
            value={filteredStats.successful} 
            icon={<CheckCircle size={24} />}
            theme={theme}
            colorType="success"
            subtext={`${successRate}% success rate`}
            isHovering={isHovering}
          />
          <StatsCard 
            title="Failed" 
            value={filteredStats.failed} 
            icon={<XCircle size={24} />}
            theme={theme}
            colorType="danger"
            subtext={`${failureRate}% failure rate`}
            isHovering={isHovering}
          />
          <StatsCard 
            title="Pending" 
            value={filteredStats.pending} 
            icon={<Clock size={24} className="animate-pulse" />}
            theme={theme}
            colorType="warning"
            hasPulse={true}
            isHovering={isHovering}
          />
        </div>

        
      </div>
      
      {/* Bottom border gradient */}
      <div 
        className="h-1 w-full"
        style={{
          background: `linear-gradient(to right, ${currentTheme.primary.bg}, transparent)`
        }}
      ></div>
    </motion.section>
  );
}

// Enhanced responsive stat card component with theme support
function StatsCard({ title, value, icon, theme, colorType, subtext, hasPulse = false, isHovering: parentIsHovering }) {
  const [isHovering, setIsHovering] = useState(false);
  
  const colors = {
    dark: {
      primary: { bg: "#8B5CF6", shadow: "rgba(139, 92, 246, 0.3)" },
      success: { bg: "#10B981", shadow: "rgba(16, 185, 129, 0.3)" },
      warning: { bg: "#F59E0B", shadow: "rgba(245, 158, 11, 0.3)" },
      danger: { bg: "#EF4444", shadow: "rgba(239, 68, 68, 0.3)" }
    },
    light: {
      primary: { bg: "#8B5CF6", shadow: "rgba(139, 92, 246, 0.2)" },
      success: { bg: "#10B981", shadow: "rgba(16, 185, 129, 0.2)" },
      warning: { bg: "#F59E0B", shadow: "rgba(245, 158, 11, 0.2)" },
      danger: { bg: "#EF4444", shadow: "rgba(239, 68, 68, 0.2)" }
    }
  };

  const color = colors[theme][colorType];
  
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 transform ${
        theme === 'dark' 
          ? 'bg-gray-900/70' 
          : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        boxShadow: isHovering 
          ? `0 6px 12px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.1)'}, 0 0 2px ${color.shadow}` 
          : theme === 'dark' 
            ? '0 4px 6px rgba(0, 0, 0, 0.2)' 
            : '0 2px 5px rgba(0, 0, 0, 0.05)',
        border: theme === 'dark'
          ? isHovering ? `1px solid rgba(139, 92, 246, 0.3)` : `1px solid rgba(75, 85, 99, 0.2)`
          : isHovering ? `1px solid rgba(139, 92, 246, 0.2)` : `1px solid rgba(229, 231, 235, 0.8)`
      }}
    >
      {/* Glass effect background */}
      <div className={`relative p-5 h-full flex flex-col items-center text-center`}>
        {/* Background glow - smaller and more subtle */}
        <div
          className={`absolute -right-3 -bottom-3 size-16 blur-xl rounded-full transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-40"
          }`}
          style={{ backgroundColor: `${color.bg}20` }}
        ></div>

        <div className="relative flex flex-col items-center text-center w-full">
          <div
            className="p-3 rounded-full text-white shadow-md flex items-center justify-center transition-all duration-300"
            style={{ 
              backgroundColor: color.bg,
              boxShadow: isHovering ? `0 0 12px ${color.shadow}` : `0 0 8px ${color.shadow}`
            }}
          >
            {hasPulse ? (
              <div className="relative">
                <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ backgroundColor: `${color.bg}30` }}></span>
                {icon}
              </div>
            ) : icon}
          </div>

          <div className="pt-4 space-y-1 w-full">
            <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} tracking-wide uppercase`}>
              {title}
            </p>
            <p className={`py-1 text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {value.toLocaleString()}
            </p>
            {subtext && <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{subtext}</p>}
          </div>
        </div>
      </div>
      
      {/* Shine effect on hover */}
      <div 
        className={`absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 transform transition-transform duration-700 ${
          isHovering ? 'translate-x-full' : '-translate-x-full'
        }`}>
      </div>
    </motion.div>
  );
}

// Insight card component with theme support
function InsightCard({ title, value, icon, colorType, theme, customContent, subtext }) {
  const [isHovering, setIsHovering] = useState(false);
  
  const colors = {
    dark: {
      primary: { bg: "#8B5CF6", shadow: "rgba(139, 92, 246, 0.3)" },
      success: { bg: "#10B981", shadow: "rgba(16, 185, 129, 0.3)" },
      warning: { bg: "#F59E0B", shadow: "rgba(245, 158, 11, 0.3)" },
      danger: { bg: "#EF4444", shadow: "rgba(239, 68, 68, 0.3)" }
    },
    light: {
      primary: { bg: "#8B5CF6", shadow: "rgba(139, 92, 246, 0.2)" },
      success: { bg: "#10B981", shadow: "rgba(16, 185, 129, 0.2)" },
      warning: { bg: "#F59E0B", shadow: "rgba(245, 158, 11, 0.2)" },
      danger: { bg: "#EF4444", shadow: "rgba(239, 68, 68, 0.2)" }
    }
  };

  const color = colors[theme][colorType];
  
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={`rounded-lg overflow-hidden relative transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900/60 border-gray-800' 
          : 'bg-white border-gray-200'
      } border`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        boxShadow: isHovering 
          ? `0 4px 8px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'}`
          : 'none'
      }}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="p-1.5 rounded"
            style={{ 
              backgroundColor: `${color.bg}20`,
              color: color.bg
            }}
          >
            {icon}
          </div>
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{title}</span>
        </div>
        
        {customContent ? (
          customContent
        ) : (
          <>
            <p className={`font-medium text-xl ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{value}</p>
            {subtext && (typeof subtext === 'string' ? (
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{subtext}</p>
            ) : subtext)}
          </>
        )}
      </div>
      
      {/* Subtle highlight on hover */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5 transform transition-all duration-300"
        style={{ 
          background: `linear-gradient(to right, ${color.bg}, ${color.bg}00)`,
          opacity: isHovering ? 1 : 0,
          boxShadow: isHovering ? `0 0 6px ${color.shadow}` : "none"
        }}
      ></div>
    </motion.div>
  );
}