import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, CheckCircle, AlertTriangle, Clock, X, Filter, SortDesc } from "lucide-react";

export default function MigrationsSection({ theme = "dark" }) {
  const [selected, setSelected] = useState(null);
  const [isHovering, setIsHovering] = useState(null);
  
  // Theme-based colors
  const colors = {
    dark: {
      bg: "bg-gradient-to-br from-gray-900 via-gray-950 to-purple-950/20",
      cardBg: "linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(13, 6, 49, 0.97))",
      text: "text-gray-200",
      textSecondary: "text-gray-400",
      textMuted: "text-gray-500",
      border: "rgba(139, 92, 246, 0.15)",
      shadowColor: "rgba(139, 92, 246, 0.18)",
      accent: "from-indigo-500 to-indigo-600",
      neutral: "from-gray-700 to-gray-800",
      neutralText: "text-gray-200",
      modalBg: "linear-gradient(135deg, rgba(17, 24, 39, 0.97), rgba(13, 6, 49, 0.99))",
      progressBg: "bg-gray-700"
    },
    light: {
      bg: "bg-gradient-to-br from-gray-50 via-white to-indigo-50/20",
      cardBg: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 253, 0.97))",
      text: "text-gray-800",
      textSecondary: "text-gray-600",
      textMuted: "text-gray-500",
      border: "rgba(139, 92, 246, 0.15)",
      shadowColor: "rgba(139, 92, 246, 0.12)",
      accent: "from-indigo-500 to-indigo-600",
      neutral: "from-gray-200 to-gray-300",
      neutralText: "text-gray-700",
      modalBg: "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(249, 250, 253, 0.99))",
      progressBg: "bg-gray-200"
    }
  };
  
  // Mock data
  const [mockMigrations, setMockMigrations] = useState([
    {
      id: "m1",
      name: "Production DB Migration",
      status: "completed",
      sourceDb: "MySQL 5.7",
      targetDb: "PostgreSQL 14",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      completedAt: new Date().toISOString(),
      progress: 100,
      tables: 42,
      records: 1250000
    },
    {
      id: "m2",
      name: "Analytics Schema Update",
      status: "running",
      sourceDb: "MongoDB 4.4",
      targetDb: "MongoDB 5.0",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      progress: 68,
      tables: 15,
      records: 890000
    },
    {
      id: "m3",
      name: "User Data Backup",
      status: "pending",
      sourceDb: "PostgreSQL 13",
      targetDb: "Cloud Storage",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      progress: 0,
      tables: 8,
      records: 450000
    }
  ]);

  // Status colors for both themes
  const statusColors = {
    completed: {
      color: "#10B981", // Emerald green
      bgLight: "bg-green-100",
      textLight: "text-green-800",
      borderLight: "border-green-200",
      bgDark: "bg-green-900/20",
      textDark: "text-green-400",
      borderDark: "border-green-700/20"
    },
    running: {
      color: "#3B82F6", // Blue
      bgLight: "bg-blue-100",
      textLight: "text-blue-800",
      borderLight: "border-blue-200",
      bgDark: "bg-blue-900/20",
      textDark: "text-blue-400",
      borderDark: "border-blue-700/20"
    },
    failed: {
      color: "#EF4444", // Red
      bgLight: "bg-red-100",
      textLight: "text-red-800",
      borderLight: "border-red-200",
      bgDark: "bg-red-900/20",
      textDark: "text-red-400",
      borderDark: "border-red-700/20"
    },
    pending: {
      color: "#F59E0B", // Amber
      bgLight: "bg-amber-100",
      textLight: "text-amber-800",
      borderLight: "border-amber-200",
      bgDark: "bg-amber-900/20",
      textDark: "text-amber-400",
      borderDark: "border-amber-700/20"
    }
  };

  // Update the progress of running migrations every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMockMigrations(prevMigrations => 
        prevMigrations.map(migration => {
          if (migration.status === "running" && migration.progress < 100) {
            const newProgress = Math.min(100, migration.progress + Math.floor(Math.random() * 3) + 1);
            
            return {
              ...migration,
              progress: newProgress,
              ...(newProgress === 100 ? {
                status: "completed",
                completedAt: new Date().toISOString()
              } : {})
            };
          }
          return migration;
        })
      );
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className={`w-full ${colors[theme].bg} rounded-xl shadow-md max-w-8xl mx-auto p-4 sm:p-6 lg:p-8 my-8 transition-all duration-300`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        boxShadow: `0 4px 20px ${colors[theme].shadowColor}`,
        border: `1px solid ${colors[theme].border}`
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className={`${colors[theme].text} flex items-center`}>
          <span 
            className="w-1 h-5 bg-indigo-500 rounded-r mr-4 inline-block" 
            style={{
              background: "linear-gradient(to bottom, #8B5CF6, #4F46E5)",
              boxShadow: `0 0 8px rgba(139, 92, 246, ${theme === 'dark' ? '0.5' : '0.3'})`
            }}
          ></span>
          <p className="text-xl" style={{ letterSpacing: "0.01em" }}>
            Your Migrations
          </p>
        </h2>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`text-sm px-3 py-1.5 rounded-md bg-gradient-to-r ${colors[theme].accent} text-white shadow-sm flex items-center gap-1`}
            style={{
              boxShadow: `0 2px 10px ${colors[theme].shadowColor}`,
              border: `1px solid ${colors[theme].border}`
            }}
          >
            <Filter size={14} />
            <span>Filter</span>
            <span className="opacity-60 text-xs">(All)</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`text-sm px-3 py-1.5 rounded-md bg-gradient-to-r ${colors[theme].neutral} ${colors[theme].neutralText} shadow-sm flex items-center gap-1`}
            style={{
              boxShadow: `0 2px 6px rgba(0, 0, 0, ${theme === 'dark' ? '0.2' : '0.1'})`,
              border: `1px solid rgba(75, 85, 99, ${theme === 'dark' ? '0.4' : '0.2'})`
            }}
          >
            <SortDesc size={14} />
            <span>Sort by</span>
            <span className="opacity-60 text-xs">(Recent)</span>
          </motion.button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {mockMigrations.map((migration) => (
          <MigrationCard
            key={migration.id}
            data={migration}
            onClick={() => setSelected(migration)}
            theme={theme}
            colors={colors[theme]}
            statusColors={statusColors}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <MigrationModal
            migration={selected}
            onClose={() => setSelected(null)}
            theme={theme}
            colors={colors[theme]}
            statusColors={statusColors}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function MigrationCard({ data, onClick, theme, colors, statusColors }) {
  const [isHovering, setIsHovering] = useState(false);
  
  const getStatusIcon = (status) => {
    switch(status) {
      case "completed":
        return <CheckCircle size={16} className={theme === "dark" ? "text-green-400" : "text-green-600"} />;
      case "running":
        return <Clock size={16} className={theme === "dark" ? "text-blue-400 animate-pulse" : "text-blue-600 animate-pulse"} />;
      case "failed":
        return <AlertTriangle size={16} className={theme === "dark" ? "text-red-400" : "text-red-600"} />;
      case "pending":
        return <Clock size={16} className={theme === "dark" ? "text-amber-400" : "text-amber-600"} />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    return theme === "dark" ? statusColors[status].textDark : statusColors[status].textLight;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer rounded-xl overflow-hidden relative"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        boxShadow: isHovering ? 
          `0 8px 20px -5px ${colors.shadowColor}, 0 0 8px rgba(139, 92, 246, 0.1)` : 
          `0 4px 12px rgba(0, 0, 0, ${theme === 'dark' ? '0.12' : '0.06'})`,
        backdropFilter: "blur(5px)",
        transition: "all 0.3s ease-in-out"
      }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-lg font-medium ${colors.text}`}>{data.name}</h3>
          <Badge variant={data.status} theme={theme} statusColors={statusColors}>{data.status}</Badge>
        </div>

        <div className={`flex gap-1 text-sm ${colors.textSecondary} mb-3 items-center`}>
          <span>{data.sourceDb}</span>
          <ArrowRight size={14} className="mx-1 text-indigo-400" strokeWidth={2.5} />
          <span>{data.targetDb}</span>
        </div>

        <div className={`flex justify-between text-xs ${colors.textMuted} mb-3`}>
          <div>
            <span className="inline-block mr-3">
              <span className={`font-medium ${colors.textSecondary}`}>Tables:</span> {data.tables}
            </span>
            <span>
              <span className={`font-medium ${colors.textSecondary}`}>Records:</span> {(data.records).toLocaleString()}
            </span>
          </div>
        </div>

        <div className={`text-xs ${colors.textMuted} mb-3`}>
          <span className={`font-medium ${colors.textSecondary}`}>Created:</span> {new Date(data.createdAt).toLocaleString()}
        </div>

        {/* Stylized progress bar */}
        <div className={`mt-2 w-full ${colors.progressBg} rounded-full h-1.5 overflow-hidden`} 
          style={{ 
            boxShadow: `inset 0 1px 2px rgba(0, 0, 0, ${theme === 'dark' ? '0.2' : '0.1'})`,
          }}>
          <div
            className="h-1.5 rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: `${data.progress || 0}%`,
              background: `linear-gradient(to right, ${statusColors[data.status].color}, ${statusColors[data.status].color}CC)`,
              boxShadow: `0 0 6px ${statusColors[data.status].color}99`
            }}
          ></div>
        </div>

        {/* Status indicator at bottom */}
        <div className="flex items-center justify-end mt-3 text-xs">
          <div className="flex gap-1 items-center">
            {getStatusIcon(data.status)}
            <span className={getStatusText(data.status)}>
              {data.status === "completed" && "Completed " + new Date(data.completedAt).toLocaleTimeString()}
              {data.status === "running" && `In progress (${data.progress}%)`}
              {data.status === "failed" && "Failed: " + (data.error || "Unknown error")}
              {data.status === "pending" && "Waiting to start"}
            </span>
          </div>
        </div>
      </div>
      
      {/* Shine effect on hover */}
      <div 
        className={`absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 transition-transform duration-700 ${
          isHovering ? 'translate-x-full' : '-translate-x-full'
        }`}>
      </div>
    </motion.div>
  );
}

function Badge({ children, variant = "default", theme, statusColors }) {
  const getVariantStyles = (status) => {
    if (theme === "dark") {
      return `${statusColors[status].bgDark} ${statusColors[status].textDark} ${statusColors[status].borderDark}`;
    } else {
      return `${statusColors[status].bgLight} ${statusColors[status].textLight} ${statusColors[status].borderLight}`;
    }
  };

  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getVariantStyles(variant)}`}
      style={{ 
        backdropFilter: "blur(8px)",
        boxShadow: `0 1px 2px rgba(0, 0, 0, ${theme === 'dark' ? '0.1' : '0.05'})`
      }}
    >
      {children}
    </span>
  );
}

function MigrationModal({ migration, onClose, theme, colors, statusColors }) {
  // Calculate durations and other metadata
  const calculateDuration = () => {
    if (migration.status === "completed" && migration.completedAt) {
      const start = new Date(migration.createdAt);
      const end = new Date(migration.completedAt);
      const diffMs = end - start;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHrs = Math.floor(diffMins / 60);
      const remainingMins = diffMins % 60;
      
      if (diffHrs > 0) {
        return `${diffHrs}h ${remainingMins}m`;
      } else {
        return `${diffMins}m`;
      }
    }
    return "In progress";
  };

  // Calculate transfer rate
  const calculateTransferRate = () => {
    if (migration.status === "completed" && migration.completedAt) {
      const start = new Date(migration.createdAt);
      const end = new Date(migration.completedAt);
      const diffSecs = (end - start) / 1000;
      const rate = Math.floor(migration.records / diffSecs);
      return `${rate.toLocaleString()} records/sec`;
    }
    return "Calculating...";
  };

  // Handle redirect to details page
  const handleViewDetails = () => {
    // In a real application, you would use your router to navigate
    window.location.href = `/dash/schemas/`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="max-w-xl w-full rounded-xl overflow-hidden relative z-50"
        style={{ 
          background: colors.modalBg,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, ${theme === 'dark' ? '0.5' : '0.25'}), 0 0 15px ${colors.shadowColor}`
        }}
      >
        <div className="relative p-6">
          {/* Header with gradient line */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className={`text-xl font-medium ${colors.text} flex items-center gap-2`}>
                {migration.name}
                <Badge variant={migration.status} theme={theme} statusColors={statusColors}>{migration.status}</Badge>
              </h2>
              <p className={`${colors.textSecondary} text-sm mt-1`}>
                ID: {migration.id}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`text-gray-400 hover:${colors.text} p-1 rounded-full`}
              style={{ 
                background: `rgba(${theme === 'dark' ? '255, 255, 255' : '0, 0, 0'}, 0.1)`,
                backdropFilter: "blur(5px)"
              }}
            >
              <X size={18} />
            </motion.button>
          </div>
          
          {/* Separator line with gradient */}
          <div 
            className="h-0.5 w-full my-4" 
            style={{ 
              background: "linear-gradient(to right, rgba(139, 92, 246, 0.5), transparent 80%)",
              boxShadow: `0 0 8px rgba(139, 92, 246, ${theme === 'dark' ? '0.3' : '0.2'})`
            }}
          ></div>
          
          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-6">
            <div>
              <p className={`${colors.textSecondary} text-xs mb-1`}>Source Database</p>
              <p className={`${colors.text} font-medium`}>{migration.sourceDb}</p>
            </div>
            <div>
              <p className={`${colors.textSecondary} text-xs mb-1`}>Target Database</p>
              <p className={`${colors.text} font-medium`}>{migration.targetDb}</p>
            </div>
            <div>
              <p className={`${colors.textSecondary} text-xs mb-1`}>Created At</p>
              <p className={colors.text}>{new Date(migration.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className={`${colors.textSecondary} text-xs mb-1`}>
                {migration.status === "completed" ? "Completed At" : "Status"}
              </p>
              <p className={colors.text}>
                {migration.status === "completed" 
                  ? new Date(migration.completedAt).toLocaleString()
                  : migration.status.charAt(0).toUpperCase() + migration.status.slice(1)
                }
              </p>
            </div>
            <div>
              <p className={`${colors.textSecondary} text-xs mb-1`}>Duration</p>
              <p className={colors.text}>{calculateDuration()}</p>
            </div>
            <div>
              <p className={`${colors.textSecondary} text-xs mb-1`}>Transfer Rate</p>
              <p className={colors.text}>{calculateTransferRate()}</p>
            </div>
            <div>
              <p className={`${colors.textSecondary} text-xs mb-1`}>Tables</p>
              <p className={colors.text}>{migration.tables}</p>
            </div>
            <div>
              <p className={`${colors.textSecondary} text-xs mb-1`}>Records</p>
              <p className={colors.text}>{migration.records.toLocaleString()}</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className={colors.textSecondary}>Progress</span>
              <span className={`font-medium ${colors.text}`}>{migration.progress}%</span>
            </div>
            <div className={`w-full ${colors.progressBg} rounded-full h-2 overflow-hidden`} 
              style={{ 
                boxShadow: `inset 0 1px 2px rgba(0, 0, 0, ${theme === 'dark' ? '0.2' : '0.1'})`,
              }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${migration.progress || 0}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-2 rounded-full"
                style={{ 
                  background: `linear-gradient(to right, ${statusColors[migration.status].color}, ${statusColors[migration.status].color}AA)`,
                  boxShadow: `0 0 10px ${statusColors[migration.status].color}60`
                }}
              ></motion.div>
            </div>
          </div>
          
          {/* Error message for failed migrations */}
          {migration.status === "failed" && migration.error && (
            <div className={`mt-4 p-3 rounded-lg ${theme === "dark" ? "bg-red-900/20 border-red-700/30" : "bg-red-100/70 border-red-300/50"} border`}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className={theme === "dark" ? "text-red-500" : "text-red-600"} />
                <div>
                  <p className={`${theme === "dark" ? "text-red-400" : "text-red-700"} font-medium text-sm`}>Error Details</p>
                  <p className={`${theme === "dark" ? "text-red-300" : "text-red-600"} text-xs mt-1`}>{migration.error}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* View Details button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
            className="w-full mt-6 mb-3 py-2.5 rounded-lg text-center text-white font-medium flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(to right, rgba(79, 70, 229, 0.9), rgba(67, 56, 202, 0.9))",
              boxShadow: `0 4px 10px rgba(79, 70, 229, ${theme === 'dark' ? '0.3' : '0.2'})`,
              border: "1px solid rgba(79, 70, 229, 0.3)"
            }}
          >
            <span>View Detailed Migration</span>
            <ArrowUpRight size={16} />
          </motion.button>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2.5 rounded-lg text-center text-white font-medium"
              style={{
                background: "linear-gradient(to right, rgba(139, 92, 246, 0.9), rgba(79, 70, 229, 0.9))",
                boxShadow: `0 4px 10px rgba(139, 92, 246, ${theme === 'dark' ? '0.3' : '0.2'})`,
                border: "1px solid rgba(139, 92, 246, 0.3)"
              }}
              onClick={onClose}
            >
              Close
            </motion.button>
            
            {migration.status !== "completed" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 py-2.5 rounded-lg text-center font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                style={{
                  background: `rgba(${theme === 'dark' ? '31, 41, 55, 0.5' : '229, 231, 235, 0.7'})`,
                  backdropFilter: "blur(5px)",
                  border: `1px solid rgba(${theme === 'dark' ? '75, 85, 99, 0.4' : '209, 213, 219, 0.6'})`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                {migration.status === "failed" ? "Retry" : migration.status === "running" ? "Cancel" : "Start"}
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Bottom decorative gradient */}
        <div 
          className="h-1 w-full" 
          style={{ 
            background: "linear-gradient(to right, #8B5CF6, #4F46E5)",
            boxShadow: `0 0 10px rgba(139, 92, 246, ${theme === 'dark' ? '0.5' : '0.3'})`
          }}
        ></div>
      </motion.div>
    </div>
  );
}