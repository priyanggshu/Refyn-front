import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Loader2, 
  AlertCircle, 
  Database, 
  Code, 
  ChevronRight,
  Server,
  RefreshCw,
  Lock,
  Clock,
  ArrowRight
} from "lucide-react";

// Enhanced data with more details
const steps = [
  { 
    id: 1,
    title: "Schema Extraction",
    description: "PostgreSQL schema structure analysis completed",
    status: "complete",
    time: "14:30:05",
    duration: "1m 42s",
    details: "Extracted 16 tables and 43 relationships",
    icon: <Code />
  },
  { 
    id: 2,
    title: "Schema Conversion",
    description: "Converting to AWS Aurora compatible format",
    status: "complete",
    time: "14:32:21",
    duration: "2m 16s",
    details: "Applied 7 AWS-specific optimizations",
    icon: <Server />
  },
  { 
    id: 3,
    title: "Data Validation",
    description: "Checking data integrity and constraints",
    status: "complete",
    time: "14:35:44",
    duration: "3m 23s",
    details: "All 16 tables validated, 2 warnings addressed",
    icon: <CheckCircle />
  },
  { 
    id: 4,
    title: "Data Migration",
    description: "Transferring records to AWS Aurora",
    status: "in-progress",
    time: "14:39:12",
    estimatedCompletion: "14:52:00",
    progress: 68,
    details: "7.2M records processed (11.6GB)",
    icon: <Database />
  },
  { 
    id: 5,
    title: "Verification & Indexing",
    description: "Ensuring data consistency after migration",
    status: "pending",
    estimatedDuration: "~5m",
    icon: <RefreshCw />
  },
  { 
    id: 6,
    title: "Completion & Security",
    description: "Setting up access controls and finalizing",
    status: "pending",
    estimatedDuration: "~3m",
    icon: <Lock />
  }
];

// Enhanced status icons with animations
const StatusIcon = ({ status, icon }) => {
  switch (status) {
    case "complete":
      return (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-900/30 flex items-center justify-center border-2 border-green-500"
        >
          <CheckCircle className="text-green-500 w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      );
    case "in-progress":
      return (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-900/30 flex items-center justify-center border-2 border-blue-500"
        >
          <Loader2 className="animate-spin text-blue-500 w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      );
    case "error":
      return (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-900/30 flex items-center justify-center border-2 border-red-500"
        >
          <AlertCircle className="text-red-500 w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      );
    default:
      return (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-600"
        >
          {icon && React.cloneElement(icon, { size: 16, className: "text-gray-400" })}
        </motion.div>
      );
  }
};

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function DataMigrationStepper() {
  const [progress, setProgress] = useState(68);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Simulate progress increase for the in-progress step
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(timer);
          return 95;
        }
        return prev + 0.5;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Determine if mobile view
  const isMobile = windowWidth < 768;
  
  return (
    <div className="bg-black text-white w-full px-4 md:px-6 lg:px-8 py-2 md:py-4">
      <div className="w-full mx-auto">
        {/* Migration Title Info */}
        <div className="mb-6">          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <div className="mb-4 md:mb-0">
              <h2 className="text-base md:text-xl text-white font-semibold flex items-center">
                <Database className="text-purple-500 mr-2" size={20} />
                Monthly User Data Migration
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                PostgreSQL Production to AWS Aurora Cluster
              </p>
            </div>
            
            <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
              <span className="px-2 py-1 bg-gray-800 rounded-md text-gray-300">
                Started: 14:30:05
              </span>
              <span className="px-2 py-1 bg-blue-900/30 rounded-md text-blue-300">
                In Progress
              </span>
              <span className="px-2 py-1 bg-gray-800 rounded-md text-gray-300">
                ETA: 14:52:00
              </span>
            </div>
          </div>
          
          {/* Overall Progress Bar */}
          <div className="px-3 py-3 bg-blue-900/20 border border-blue-800/40 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-blue-200 text-sm md:text-base">Overall Progress</span>
              <span className="text-blue-300 font-mono text-sm">{progress.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-blue-950 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: "68%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-blue-400 mt-1">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>4/6 steps complete</span>
              </div>
              <span>{Math.round(progress/100 * 18.8)} GB of 18.8 GB</span>
            </div>
          </div>
        </div>
        
        {/* Steps Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base md:text-lg font-semibold flex items-center">
            <RefreshCw className="text-purple-500 mr-2" size={isMobile ? 16 : 18} />
            <span>Migration Steps</span>
          </h3>
          
          <div className="text-xs text-gray-400 flex items-center">
            <motion.div 
              className="flex items-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Loader2 className="w-3 h-3 md:w-4 md:h-4 mr-1 animate-spin" />
              <span>Live updating</span>
            </motion.div>
          </div>
        </div>
    
        {/* Timeline Steps */}
        <motion.div
          className="relative ml-2 md:ml-5 pb-4"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Timeline vertical line */}
          <div className="absolute left-0 top-5 w-0.5 h-[calc(100%-40px)] bg-gradient-to-b from-purple-500 via-blue-600 to-gray-700"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative mb-6 last:mb-0 pl-8 md:pl-12"
              variants={itemVariants}
            >
              {/* Timeline connector and status icon */}
              <div className="absolute -left-4 md:-left-5 top-0">
                <StatusIcon status={step.status} icon={step.icon} />
              </div>
              
              <div className="bg-gray-900/60 rounded-lg p-3 md:p-4 border border-gray-800 hover:border-purple-800/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h4 className="text-base md:text-lg font-semibold flex items-center">
                      <span className="mr-2 text-gray-400 text-sm">#{step.id}</span>
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                  </div>
                  
                  <div className="flex items-center mt-2 md:mt-0">
                    {step.status === "complete" && (
                      <span className="px-2 md:px-3 py-1 bg-green-900/30 text-green-400 text-xs font-medium rounded-full border border-green-700/30">
                        Complete
                      </span>
                    )}
                    {step.status === "in-progress" && (
                      <span className="px-2 md:px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-medium rounded-full border border-blue-700/30">
                        In Progress
                      </span>
                    )}
                    {step.status === "pending" && (
                      <span className="px-2 md:px-3 py-1 bg-gray-800 text-gray-400 text-xs font-medium rounded-full border border-gray-700/30">
                        Pending
                      </span>
                    )}
                    {step.status === "error" && (
                      <span className="px-2 md:px-3 py-1 bg-red-900/30 text-red-400 text-xs font-medium rounded-full border border-red-700/30">
                        Error
                      </span>
                    )}
                  </div>
                </div>

                
                
                {/* Progress bar for in-progress step */}
                {step.status === "in-progress" && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{step.details}</span>
                      <span>{step.progress}%</span>
                    </div>
                    <motion.div
                      className="h-1.5 bg-gray-800 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div 
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${step.status === "in-progress" ? progress : 0}%` }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                )}
                
                {/* Details for complete steps */}
                {step.status === "complete" && (
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                    <div className="flex items-center">
                      <Clock size={14} className="text-gray-500 mr-1 md:mr-2" />
                      <span className="text-gray-400">Time: </span>
                      <span className="ml-1 text-gray-300 font-mono">{step.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="text-gray-500 mr-1 md:mr-2" />
                      <span className="text-gray-400">Duration: </span>
                      <span className="ml-1 text-gray-300 font-mono">{step.duration}</span>
                    </div>
                    {step.details && (
                      <div className="col-span-1 md:col-span-2 flex items-start mt-1">
                        <ChevronRight size={14} className="text-purple-500 mr-1 mt-0.5" />
                        <span className="text-gray-300">{step.details}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Estimated time for pending steps */}
                {step.status === "pending" && (
                  <div className="mt-2 flex items-center text-xs md:text-sm text-gray-500">
                    <Clock size={14} className="mr-1 md:mr-2" />
                    <span>Estimated duration: {step.estimatedDuration}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}