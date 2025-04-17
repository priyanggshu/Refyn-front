import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, BarChart, RefreshCw, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MigrationOverview() {
  const [stats, setStats] = useState({
    total: 10,
    successful: 7,
    failed: 2,
    ongoing: 1,
    avgDuration: "3m 42s",
    lastWeek: {
      total: 8,
      successful: 6,
      failed: 1,
      ongoing: 1
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const refreshStats = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
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

  // Calculate percentage change for insights
  const calculateChange = (current, previous) => {
    if (!previous) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };
  
  const successRate = Math.round((stats.successful / stats.total) * 100) || 0;
  
  return (
    <motion.div
      className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-800 mb-6 hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-Montserrat font-semibold text-gray-300 flex items-center">
          <span className="w-1 h-5 bg-indigo-500 rounded-r mr-2.5 inline-block"></span>
          Migration Overview
        </h2>
        
        <button 
          onClick={refreshStats}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 font-Outfit"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Migrations */}
        <motion.div 
          className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-70 rounded-xl border border-gray-700 backdrop-blur-sm"
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-indigo-900 bg-opacity-50 p-2 rounded-lg">
              <BarChart className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <span className="text-sm text-gray-400 font-Outfit">Total</span>
              <p className="text-2xl font-bold font-Syne text-gray-200">{stats.total}</p>
            </div>
          </div>
          <div className="text-xs px-2 py-1 bg-indigo-900 bg-opacity-50 text-indigo-400 rounded-lg font-Outfit">
            +{calculateChange(stats.total, stats.lastWeek.total)}%
          </div>
        </motion.div>
        
        {/* Successful Migrations */}
        <motion.div 
          className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-70 rounded-xl border border-gray-700 backdrop-blur-sm"
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-emerald-900 bg-opacity-50 p-2 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-sm text-gray-400 font-Outfit">Successful</span>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold font-Syne text-gray-200">{stats.successful}</p>
                <p className="text-sm text-emerald-400 mb-1 font-Outfit">({successRate}%)</p>
              </div>
            </div>
          </div>
          <div className="text-xs px-2 py-1 bg-emerald-900 bg-opacity-50 text-emerald-400 rounded-lg font-Outfit">
            +{calculateChange(stats.successful, stats.lastWeek.successful)}%
          </div>
        </motion.div>
        
        {/* Failed Migrations */}
        <motion.div 
          className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-70 rounded-xl border border-gray-700 backdrop-blur-sm"
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(239, 68, 68, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-900 bg-opacity-50 p-2 rounded-lg">
              <XCircle className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <span className="text-sm text-gray-400 font-Outfit">Failed</span>
              <p className="text-2xl font-bold font-Syne text-gray-200">{stats.failed}</p>
            </div>
          </div>
          <div className="text-xs px-2 py-1 bg-red-900 bg-opacity-50 text-red-400 rounded-lg font-Outfit">
            {calculateChange(stats.failed, stats.lastWeek.failed)}%
          </div>
        </motion.div>
        
        {/* Ongoing Migrations */}
        <motion.div 
          className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-70 rounded-xl border border-gray-700 backdrop-blur-sm"
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(245, 158, 11, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-amber-900 bg-opacity-50 p-2 rounded-lg">
              <Clock className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <span className="text-sm text-gray-400 font-Outfit">In Progress</span>
              <p className="text-2xl font-bold font-Syne text-gray-200">{stats.ongoing}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs px-2 py-1 bg-amber-900 bg-opacity-50 text-amber-400 rounded-lg font-Outfit">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            Live
          </div>
        </motion.div>
      </div>
      
      {/* Toggle for additional insights */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-xl border border-gray-700 text-gray-300 font-Outfit mb-2 transition-colors"
        whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.8)" }}
      >
        <span className="font-medium">Migration Insights</span>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.div>
      </motion.button>
      
      {/* Additional insights panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700">
              <div className="flex flex-col p-3 bg-gray-800 bg-opacity-60 rounded-lg">
                <span className="text-sm text-gray-400 font-Outfit">Average Duration</span>
                <p className="font-medium font-Syne text-gray-200">{stats.avgDuration}</p>
              </div>
              <div className="flex flex-col p-3 bg-gray-800 bg-opacity-60 rounded-lg">
                <span className="text-sm text-gray-400 font-Outfit">Success Rate</span>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-2 text-xs flex rounded-full bg-gray-700">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${successRate}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                    ></motion.div>
                  </div>
                  <p className="font-medium font-Syne text-emerald-400">{successRate}%</p>
                </div>
              </div>
              <div className="flex flex-col p-3 bg-gray-800 bg-opacity-60 rounded-lg">
                <span className="text-sm text-gray-400 font-Outfit">Last 7 Days</span>
                <p className="font-medium font-Syne text-gray-200">{stats.lastWeek.total} migrations</p>
                <div className="flex text-xs gap-2 mt-1">
                  <span className="text-emerald-400">{stats.lastWeek.successful} success</span>
                  <span className="text-red-400">{stats.lastWeek.failed} failed</span>
                </div>
              </div>
              {stats.ongoing > 0 && (
                <div className="flex flex-col p-3 bg-amber-900 bg-opacity-20 border border-amber-800 rounded-lg">
                  <span className="text-sm text-amber-400 font-Outfit flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                    Migration in Progress
                  </span>
                  <p className="font-medium font-Syne text-amber-300">{stats.ongoing} active</p>
                  <span className="text-xs text-gray-400 mt-1">Started 12 minutes ago</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}