import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  BarChart,
  RefreshCw,
  TrendingUp,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MigrationInsights({ theme }) {
  const isDark = theme === "dark";
  
  // Enhanced color palette that responds to theme
  const graphColor = isDark ? "#8B5CF6" : "#7C3AED"; // Purple
  const successColor = isDark ? "#10B981" : "#059669"; // Green
  const warningColor = isDark ? "#F59E0B" : "#D97706"; // Amber
  const errorColor = isDark ? "#EF4444" : "#DC2626"; // Red
  const blueAccent = isDark ? "#60A5FA" : "#3B82F6"; // Blue
  
  const [stats, setStats] = useState({
    total: 1842,
    successful: 1634,
    failed: 128,
    ongoing: 80,
    avgDuration: "3m 42s",
    lastWeek: {
      total: 98,
      successful: 86,
      failed: 9,
      ongoing: 3,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const refreshStats = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        // Simulate updated stats
        setStats((prev) => ({
          ...prev,
          total: prev.total + Math.floor(Math.random() * 5),
          successful: prev.successful + Math.floor(Math.random() * 4),
          failed: prev.failed + (Math.random() > 0.7 ? 1 : 0),
          ongoing: Math.max(1, Math.floor(Math.random() * 5)),
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

  const successRate = Math.round((stats.successful / stats.total) * 100) || 0;

  return (
    <motion.section
      className={`bg-${isDark ? 'gray-800/40' : 'white/80'} backdrop-blur-md rounded-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/70'} shadow-lg overflow-hidden transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div 
              className="w-1.5 h-6 rounded-r mr-3"
              style={{
                background: `linear-gradient(to bottom, ${graphColor}, ${graphColor}AA)`,
                boxShadow: `0 0 8px ${graphColor}50`
              }}
            ></div>
            <h2 className={`text-${isDark ? 'gray-200' : 'gray-700'} font-Montserrat font-semibold text-lg`}>
              Insights
            </h2>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200`}
            onClick={refreshStats}
            disabled={isLoading}
          >
            <RefreshCw 
              size={16} 
              className={`${isLoading ? 'animate-spin' : ''} ${isDark ? 'text-gray-300' : 'text-gray-600'}`} 
            />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <InsightCard
            title="Average Duration"
            value={stats.avgDuration}
            icon={<Clock size={16} />}
            color={blueAccent}
            theme={theme}
          />

          <InsightCard
            title="Success Rate"
            customContent={
              <div className="relative pt-1">
                <div className={`overflow-hidden h-2 mb-2 text-xs flex rounded-full ${isDark ? 'bg-gray-700/50' : 'bg-gray-200/70'}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${successRate}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap justify-center rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${successColor}, ${successColor}CC)`,
                      boxShadow: `0 0 10px ${successColor}50`,
                    }}
                  ></motion.div>
                </div>
                <p className="font-medium font-Syne" style={{ color: successColor }}>
                  {successRate}%
                </p>
              </div>
            }
            icon={<TrendingUp size={16} />}
            color={successColor}
            theme={theme}
          />

          <InsightCard
            title="Last 7 Days"
            value={`${stats.lastWeek.total} migrations`}
            subtext={
              <div className="flex text-xs gap-3 mt-1">
                <span className="flex items-center gap-1" style={{ color: successColor }}>
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: successColor }}></span>
                  {stats.lastWeek.successful} success
                </span>
                <span className="flex items-center gap-1" style={{ color: errorColor }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: errorColor }}></span>
                  {stats.lastWeek.failed} failed
                </span>
              </div>
            }
            icon={<BarChart size={16} />}
            color={graphColor}
            theme={theme}
          />
        </div>

        {/* Active migration alert */}
        {stats.ongoing > 0 && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="p-3 rounded-lg flex items-center justify-between"
              style={{
                background: `linear-gradient(to right, ${isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)'}, ${isDark ? 'rgba(245, 158, 11, 0.05)' : 'rgba(245, 158, 11, 0.02)'})`,
                border: `1px solid ${isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)'}`,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(245, 158, 11, 0.2)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping absolute"></span>
                  <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                </div>
                <div>
                  <p className={`font-medium text-xs py-2 ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>
                    Active Migrations
                  </p>
                  <p className={`text-xs ${isDark ? 'text-amber-100/60' : 'text-amber-500/70'}`}>
                    started 12 minutes ago
                  </p>
                </div>
              </div>
              <div className={`font-semibold pl-4 ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>
                {stats.ongoing}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom border gradient */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(to right, ${graphColor}, ${graphColor}99)`,
          boxShadow: `0 0 10px ${graphColor}30`,
        }}
      ></div>
    </motion.section>
  );
}

// Insight card component
function InsightCard({ title, value, icon, color, customContent, subtext, theme }) {
  const isDark = theme === "dark";
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="rounded-lg overflow-hidden relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        background: isDark ? "rgba(17, 24, 39, 0.4)" : "rgba(249, 250, 251, 0.7)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)'}`,
        transition: "all 0.2s ease",
      }}
    >
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <div style={{ color }}>{icon}</div>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</span>
        </div>

        {customContent ? (
          customContent
        ) : (
          <>
            <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{value}</p>
            {subtext &&
              (typeof subtext === "string" ? (
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{subtext}</p>
              ) : (
                subtext
              ))}
          </>
        )}
      </div>

      {/* Subtle highlight on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transform transition-all duration-300"
        style={{
          background: `linear-gradient(to right, ${color}, ${color}00)`,
          opacity: isHovering ? 1 : 0,
          boxShadow: isHovering ? `0 0 6px ${color}40` : "none",
        }}
      ></div>
    </motion.div>
  );
}