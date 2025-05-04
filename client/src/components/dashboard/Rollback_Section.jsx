import { useState } from "react";
import { ArrowUpCircle, History, Calendar, RefreshCw, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RollbackSnapshots({ theme, snapshots = mockSnapshots }) {
  const isDark = theme === "dark";
  
  // Enhanced color palette that responds to theme
  const primaryColor = isDark ? "#8B5CF6" : "#7C3AED"; // Purple
  const secondaryColor = isDark ? "#4F46E5" : "#4338CA"; // Indigo
  const subtleBorder = isDark 
    ? "1px solid rgba(139, 92, 246, 0.15)" 
    : "1px solid rgba(124, 58, 237, 0.15)";
  
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const refreshSnapshots = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <motion.section
      className={`bg-${isDark ? 'gray-800/40' : 'white/80'} backdrop-blur-md rounded-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-500/30'} shadow-lg overflow-hidden transition-all duration-300 h-80`}
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
                background: `linear-gradient(to bottom, ${primaryColor}, ${primaryColor}AA)`,
                boxShadow: `0 0 8px ${primaryColor}50`
              }}
            ></div>
            <h2 className={`text-${isDark ? 'gray-200' : 'gray-700'} font-Montserrat font-semibold text-lg`}>
              Rollback Snapshots
            </h2>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200`}
            onClick={refreshSnapshots}
            disabled={isLoading}
          >
            <RefreshCw 
              size={16} 
              className={`${isLoading ? 'animate-spin' : ''} ${isDark ? 'text-gray-300' : 'text-gray-600'}`} 
            />
          </motion.button>
        </div>
        
        <div className="space-y-3 overflow-y-auto max-h-72 pr-1 scrollbar-thin">
          <AnimatePresence>
            {snapshots.map((snapshot, index) => (
              <motion.div
                key={snapshot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="relative rounded-lg overflow-hidden group"
                style={{
                  background: isDark ? "rgba(17, 24, 39, 0.4)" : "rgba(249, 250, 251, 0.7)",
                  backdropFilter: "blur(8px)",
                  border: subtleBorder,
                  transition: "all 0.2s ease"
                }}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <History size={16} style={{ color: primaryColor }} />
                      <h3 className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
                        {snapshot.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className={`flex items-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Calendar size={12} className="mr-1.5" />
                        <span>{snapshot.timestamp}</span>
                      </div>
                      <div className={`flex items-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Clock size={12} className="mr-1.5" />
                        <span>{snapshot.changes} changes</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full transition-colors flex items-center justify-center"
                    style={{
                      background: isDark 
                        ? "rgba(139, 92, 246, 0.1)" 
                        : "rgba(124, 58, 237, 0.05)",
                      backdropFilter: "blur(4px)",
                      border: isDark 
                        ? "1px solid rgba(139, 92, 246, 0.2)" 
                        : "1px solid rgba(124, 58, 237, 0.15)",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <ArrowUpCircle 
                      size={18} 
                      style={{ 
                        color: primaryColor,
                        transition: "color 0.2s ease"
                      }} 
                    />
                  </motion.button>
                </div>
                
                {/* Subtle highlight on hover */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 transform transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ 
                    background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}00)`,
                    boxShadow: `0 0 6px ${primaryColor}40`
                  }}
                ></div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {snapshots.length === 0 && (
            <div 
              className={`text-center py-8 rounded-lg ${isDark ? 'bg-gray-800/40' : 'bg-gray-100/60'}`}
              style={{
                backdropFilter: "blur(8px)",
                border: subtleBorder
              }}
            >
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No snapshots available</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom border gradient */}
      <div 
        className="h-1 w-full" 
        style={{ 
          background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
          boxShadow: `0 0 10px ${primaryColor}30`
        }}
      ></div>
    </motion.section>
  );
}

const mockSnapshots = [
  {
    id: 1,
    name: "Pre-User Model Update",
    timestamp: "2025-04-12 08:23:45",
    changes: 3,
  },
  {
    id: 2,
    name: "Order Processing Flow",
    timestamp: "2025-04-10 14:12:33",
    changes: 5,
  },
  {
    id: 3,
    name: "Product Category Refactor",
    timestamp: "2025-04-05 11:45:22",
    changes: 8,
  },
  {
    id: 4,
    name: "Initial Schema",
    timestamp: "2025-03-28 09:33:17",
    changes: 12,
  },
];