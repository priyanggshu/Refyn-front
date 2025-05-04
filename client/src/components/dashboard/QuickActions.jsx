import { Plus, Download, RefreshCw, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const QuickActions = ({ theme }) => {
  const isDark = theme === "dark";
  
  const containerVariants = {
    hover: { y: -4 }
  };
  
  const QuickActionButton = ({ icon, label, color, hoverColor }) => (
    <motion.button
      className={`flex items-center justify-start gap-3 w-full p-3 rounded-lg bg-gradient-to-r ${color} text-white font-medium shadow-sm transition-all duration-300 group`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`rounded-full p-2 bg-white/10 backdrop-blur-sm transition-all group-hover:bg-white/20`}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.button>
  );

  return (
    <motion.section
      variants={containerVariants}
      whileHover="hover"
      className={`bg-${isDark ? 'gray-800/40' : 'white/80'} backdrop-blur-md rounded-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/70'} shadow-lg p-6 transition-all duration-300`}
    >
      <div className="flex items-center mb-5">
        <div className={`w-1.5 h-6 ${isDark ? 'bg-indigo-400' : 'bg-indigo-500'} rounded-r mr-3`}></div>
        <h2 className={`text-${isDark ? 'gray-200' : 'gray-700'} font-Montserrat font-semibold text-lg`}>
          Quick Actions
        </h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <QuickActionButton
          icon={<Plus size={20} />}
          label="New Migration"
          color={isDark ? "from-indigo-500 to-indigo-700/60" : "from-indigo-400 to-indigo-600"}
        />
        <QuickActionButton
          icon={<Download size={20} />}
          label="Export Logs"
          color={isDark ? "from-amber-500 to-amber-700/60" : "from-amber-400 to-amber-600"}
        />
        <QuickActionButton
          icon={<RefreshCw size={20} />}
          label="Refresh Status"
          color={isDark ? "from-sky-500 to-sky-700/60" : "from-sky-400 to-sky-600"}
        />
        <QuickActionButton
          icon={<LogOut size={20} />}
          label="Logout"
          color={isDark ? "from-red-500 to-red-700/60" : "from-red-400 to-red-600"}
        />
      </div>
    </motion.section>
  );
};

export default QuickActions;