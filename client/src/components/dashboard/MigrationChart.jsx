import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Line
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";


const initialDemoData = [
  { timestamp: "00:00", migrations: 70, successful: 65, failed: 5 },
  { timestamp: "01:00", migrations: 50, successful: 45, failed: 5 },
  { timestamp: "02:00", migrations: 30, successful: 28, failed: 2 },
  { timestamp: "03:00", migrations: 90, successful: 85, failed: 5 },
  { timestamp: "04:00", migrations: 60, successful: 54, failed: 6 },
  { timestamp: "05:00", migrations: 40, successful: 37, failed: 3 },
  { timestamp: "06:00", migrations: 80, successful: 76, failed: 4 },
  { timestamp: "07:00", migrations: 75, successful: 70, failed: 5 },
];

const MigrationChart = ({ theme }) => {
  const [timeframe, setTimeframe] = useState("24h");
  const [data, setData] = useState(initialDemoData);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessRate, setShowSuccessRate] = useState(true);

  // Dynamic color variables
  const colors = useMemo(() => ({
    graph: theme === 'dark' ? "#8B5CF6" : "#6D28D9",
    shadow: theme === 'dark' ? "rgba(139, 92, 246, 0.18)" : "rgba(109, 40, 217, 0.12)",
    success: theme === 'dark' ? "#10B981" : "#059669",
    failed: theme === 'dark' ? "#F87171" : "#EF4444",
    background: theme === 'dark' ? "rgba(17, 24, 39, 0.5)" : "rgba(243, 244, 246, 0.5)",
    text: theme === 'dark' ? "#E5E7EB" : "#1F2937",
    subtext: theme === 'dark' ? "#9CA3AF" : "#6B7280",
    border: theme === 'dark' ? "rgba(139, 92, 246, 0.08)" : "rgba(109, 40, 217, 0.12)",
    gridLines: theme === 'dark' ? "#4B5563" : "#E5E7EB",
    cardBg: theme === 'dark' ? "rgba(17, 24, 39, 0.7)" : "rgba(255, 255, 255, 0.7)",
  }), [theme]);

  // Fetch data based on timeframe
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // In a real implementation, you would fetch from your API
        // const response = await axios.get(`/api/migration-data?timeframe=${timeframe}`);
        // setData(response.data);
        
        // For demo purposes, simulate a fetch delay and use demo data
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Generate appropriate data based on timeframe
        const generateTimeframeData = () => {
          switch(timeframe) {
            case '7d':
              return Array(7).fill().map((_, i) => ({
                timestamp: `Day ${i+1}`,
                migrations: Math.floor(Math.random() * 100) + 30,
                successful: Math.floor((Math.random() * 0.2 + 0.75) * (Math.random() * 100 + 30)),
                failed: Math.floor(Math.random() * 20)
              }));
            case '30d':
              return Array(10).fill().map((_, i) => ({
                timestamp: `Week ${i+1}`,
                migrations: Math.floor(Math.random() * 300) + 100,
                successful: Math.floor((Math.random() * 0.1 + 0.8) * (Math.random() * 300 + 100)),
                failed: Math.floor(Math.random() * 50)
              }));
            default: // 24h
              return initialDemoData;
          }
        };
        
        setData(generateTimeframeData());
      } catch (error) {
        console.error("Error fetching migration data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

  // Simulate new incoming data
  useEffect(() => {
    if (timeframe !== "24h") return; // Only update live for 24h view
    
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        const [lastHour] = last.timestamp.split(':').map(Number);
        const newHour = (lastHour + 1) % 24;
        const newMigrations = Math.floor(Math.random() * 80) + 20;
        const newSuccessful = Math.floor(newMigrations * (Math.random() * 0.2 + 0.7));
        const newFailed = newMigrations - newSuccessful;
        const newTimestamp = `${newHour.toString().padStart(2, '0')}:00`;

        const updated = [...prev.slice(1), {
          timestamp: newTimestamp,
          migrations: newMigrations,
          successful: newSuccessful,
          failed: newFailed
        }];
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [timeframe]);

  // Calculate metrics
  const calculateSuccessRate = (item) => {
    return item.migrations > 0
      ? (item.successful / item.migrations) * 100
      : 0;
  };

  const metrics = useMemo(() => {
    if (!data.length) return { total: 0, avgSuccess: 0, trend: 0 };
    
    const total = data.reduce((sum, item) => sum + item.migrations, 0);
    const avgSuccess = data.reduce((sum, item) => sum + calculateSuccessRate(item), 0) / data.length;
    
    // Calculate trend (comparing first half to second half)
    const midpoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, midpoint);
    const secondHalf = data.slice(midpoint);
    
    const firstHalfAvg = firstHalf.reduce((sum, item) => sum + item.migrations, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, item) => sum + item.migrations, 0) / secondHalf.length;
    
    const trend = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
    
    return { 
      total, 
      avgSuccess, 
      trend
    };
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const successRate = calculateSuccessRate(item).toFixed(1);

      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg p-3"
          style={{
            background: theme === 'dark' ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
            color: colors.text,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
          }}
        >
          <p className="font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm flex justify-between">
              <span style={{ color: colors.subtext }}>Total:</span> 
              <span className="ml-4 font-medium">{item.migrations}</span>
            </p>
            <p className="text-sm flex justify-between">
              <span style={{ color: colors.success }}>Success Rate:</span>
              <span className="ml-4 font-medium">{successRate}%</span>
            </p>
            <p className="text-sm flex justify-between">
              <span style={{ color: colors.subtext }}>Successful:</span>
              <span className="ml-4 font-medium">{item.successful}</span>
            </p>
            <p className="text-sm flex justify-between">
              <span style={{ color: colors.failed }}>Failed:</span>
              <span className="ml-4 font-medium">{item.failed}</span>
            </p>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const CustomActiveDot = ({ cx, cy, index, dataKey }) => {
    const color = dataKey === "successful" ? colors.success : colors.graph;
    
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#fff"
        stroke={color}
        strokeWidth={2}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        style={{ filter: `drop-shadow(0 0 3px ${colors.shadow})`, cursor: 'pointer' }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      />
    );
  };

  // Get the latest migration count for the digital meter
  const latestMigrationCount = data[data.length - 1]?.migrations || 0;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl shadow-md max-w-8xl mx-auto pb-4 p-6"
      style={{
        background: theme === 'dark'
          ? "linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(17, 24, 39, 0.9))"
          : "linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(243, 244, 246, 0.9))",
        borderColor: colors.border,
        boxShadow: `0 4px 20px ${colors.shadow}`
      }}
    >
      {/* Header with filters and title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-gray-300 flex items-center mb-4 sm:mb-0">
          <span
            style={{
              background: `linear-gradient(to bottom, ${colors.graph}, ${theme === 'dark' ? "#4F46E5" : "#4338CA"})`,
              boxShadow: `0 0 8px ${colors.shadow}`,
            }}
            className="w-1 h-5 rounded-r mr-4 inline-block"
          ></span>
          <span 
            className="font-medium text-lg"
            style={{ color: colors.text }}
          >
            Migration Overview
          </span>
        </h2>
        
        <div className="flex items-center space-x-2">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-md p-1 flex">
            {["24h", "7d", "30d"].map((period) => (
              <motion.button
                key={period}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1 rounded-md text-sm relative"
                onClick={() => setTimeframe(period)}
                disabled={isLoading}
              >
                {timeframe === period && (
                  <motion.span
                    layoutId="activeTimeframe"
                    className="absolute inset-0 rounded-md z-0"
                    style={{ 
                      background: colors.graph,
                      boxShadow: `0 2px 6px ${colors.shadow}` 
                    }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span
                  className="relative z-10"
                  style={{ 
                    color: timeframe === period ? 'white' : colors.subtext
                  }}
                >
                  {period}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
    
      
      {/* Digital Meter and Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              value="" 
              className="sr-only peer" 
              checked={showSuccessRate}
              onChange={() => setShowSuccessRate(!showSuccessRate)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            <span className="ml-3 text-sm font-medium" style={{ color: colors.subtext }}>Show Success Rate</span>
          </label>
        </div>
        
        <div
          className="px-4 py-2 font-mono text-lg rounded-lg flex items-center"
          style={{
            background: theme === 'dark' ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
            color: colors.text,
            border: `1px solid ${colors.border}`,
            boxShadow: `0 2px 6px ${colors.shadow}`
          }}
        >
          <span className="text-xs uppercase mr-2" style={{ color: colors.subtext }}>Latest:</span>
          <motion.span 
            key={latestMigrationCount}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-medium"
          >
            {latestMigrationCount}
          </motion.span>
          <motion.span 
            animate={{ 
              opacity: [1, 0.5, 1], 
              transition: { repeat: Infinity, duration: 1.5 } 
            }}
            className="ml-1 w-2 h-2 rounded-full bg-green-500"
          ></motion.span>
        </div>
      </div>

      {/* Main Chart */}
      <div 
        className="relative rounded-lg overflow-hidden"
        style={{ 
          background: colors.background,
          borderRadius: "12px",
          border: `1px solid ${colors.border}`,
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          height: "320px",
          padding: "16px 8px 16px 0"
        }}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div 
                className="w-10 h-10 border-4 rounded-full animate-spin"
                style={{ 
                  borderColor: `${colors.graph} transparent transparent transparent` 
                }}
              ></div>
              <p className="mt-4 text-sm" style={{ color: colors.text }}>Loading data...</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGraph" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.graph} stopOpacity={0.6}/>
                  <stop offset="95%" stopColor={colors.graph} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.success} stopOpacity={0.6}/>
                  <stop offset="95%" stopColor={colors.success} stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <XAxis 
                dataKey="timestamp" 
                tick={{ fill: colors.text, fontSize: 12 }}
                axisLine={{ stroke: colors.gridLines }}
                tickLine={{ stroke: colors.gridLines }}
              />
              
              <YAxis 
                tick={{ fill: colors.text, fontSize: 12 }} 
                axisLine={{ stroke: colors.gridLines }}
                tickLine={{ stroke: colors.gridLines }}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <CartesianGrid 
                stroke={colors.gridLines} 
                strokeDasharray="3 3" 
                vertical={false} 
                opacity={0.3} 
              />
              
              <Area 
                type="monotone" 
                dataKey="migrations" 
                stroke={colors.graph} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorGraph)" 
                activeDot={(props) => <CustomActiveDot {...props} />}
                animationDuration={1000}
              />
              
              {showSuccessRate && (
                <Line 
                  type="monotone" 
                  dataKey="successful" 
                  stroke={colors.success} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={(props) => <CustomActiveDot {...props} dataKey="successful" />}
                  animationDuration={1000}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
        
        {/* Gradient reflection effect at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${colors.background}, transparent)`,
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px"
          }}
        />
      </div>
      
      {/* Data point details */}
      <AnimatePresence>
        {hoveredIndex !== null && data[hoveredIndex] && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-3 rounded-lg"
            style={{ 
              background: theme === 'dark' ? "rgba(31, 41, 55, 0.5)" : "rgba(249, 250, 251, 0.5)",
              backdropFilter: "blur(5px)",
              border: `1px solid ${colors.border}`
            }}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: colors.text }}>
                  {data[hoveredIndex].timestamp}
                </p>
                <p className="text-xs" style={{ color: colors.subtext }}>
                  {data[hoveredIndex].migrations} total migrations
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: colors.success }}>
                  {calculateSuccessRate(data[hoveredIndex]).toFixed(1)}% success rate
                </p>
                <p className="text-xs" style={{ color: colors.subtext }}>
                  {data[hoveredIndex].successful} successful, {data[hoveredIndex].failed} failed
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-xs" style={{ color: colors.subtext }}>
        <div className="italic">
          Data {timeframe === "24h" ? "refreshes" : "sampled"} every {timeframe === "24h" ? "5 seconds" : timeframe === "7d" ? "day" : "week"}
        </div>
        <div className="flex items-center">
          <motion.span 
            animate={{ 
              opacity: [1, 0.5, 1], 
              transition: { repeat: Infinity, duration: 1.5 } 
            }}
            className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"
          ></motion.span>
          Live updates {timeframe !== "24h" && "disabled for historical views"}
        </div>
      </div>
    </motion.section>
  );
};

export default MigrationChart;