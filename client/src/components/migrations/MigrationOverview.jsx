import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GalleryVerticalEnd, CheckCheck, CircleX, Hourglass } from "lucide-react";

export default function MigrationOverview() {
  const [stats, setStats] = useState({
    total: 10,
    successful: 7,
    failed: 2,
    inProgress: 1
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const refreshStats = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, fetch actual data
      // const response = await fetch("/api/migrations/stats");
      // const data = await response.json();
      // setStats(data);
      
      // Simulating API call
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
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Total Migrations */}
      <motion.div 
        className="flex flex-col items-center justify-center bg-gray-900 rounded-lg border border-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="text-gray-300 font-Krona mb-2">Total</div>
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-blue-900 mr-2">
          <GalleryVerticalEnd className="size-5" />
          </div>
          <span className="text-2xl font-bold text-white font-Outfit">{stats.total}</span>
        </div>
      </motion.div>
      
      {/* Successful Migrations */}
      <motion.div 
        className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg border border-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="text-gray-300 mb-2 font-Krona">Successful</div>
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-green-700 mr-2">
          <CheckCheck className="size-5" />
          </div>
          <span className="text-2xl font-bold text-white font-Outfit">{stats.successful}</span>
          <span className="text-white font-semibold ml-1">%</span>
        </div>
      </motion.div>
      
      {/* Failed Migrations */}
      <motion.div 
        className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg border border-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="text-gray-300 mb-2 font-Krona">Failed</div>
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-red-800 mr-2">
            <CircleX className="size-5"/>
          </div>
          <span className="text-2xl font-bold text-white font-Outfit">{stats.failed}</span>
        </div>
      </motion.div>
      
      {/* In Progress Migrations */}
      <motion.div 
        className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg border border-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="text-gray-300 mb-2 font-Krona">In Progress</div>
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-yellow-700 mr-2">
          <Hourglass className="size-5"/>
          </div>
          <span className="text-2xl font-bold text-white font-Outfit">{stats.inProgress}</span>
        </div>
      </motion.div>
    </div>
  );
}