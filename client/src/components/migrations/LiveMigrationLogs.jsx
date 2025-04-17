import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, XCircle, AlertTriangle, Terminal, Maximize2, Minimize2 } from "lucide-react";

const LiveMigrationLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState("all");
  const logsEndRef = useRef(null);

  // Mock data generation for demonstration
  useEffect(() => {
    const logTypes = ["info", "success", "error", "warning"];
    const logMessages = [
      "Starting migration process",
      "Connecting to database",
      "Creating new table: users_roles",
      "Adding foreign key constraints",
      "Error: Duplicate key violation",
      "Warning: Slow query detected",
      "Creating index on users table",
      "Success: Migration completed in 3.2s",
      "Rolling back transaction",
      "Updating schema version table",
      "Schema validation successful"
    ];
    
    // Generate some initial logs
    const initialLogs = Array.from({ length: 5 }, (_, i) => {
      const type = logTypes[Math.floor(Math.random() * logTypes.length)];
      const message = logMessages[Math.floor(Math.random() * logMessages.length)];
      const timestamp = new Date(Date.now() - (5 - i) * 60000).toLocaleTimeString();
      
      return { id: i, type, message, timestamp };
    });
    
    setLogs(initialLogs);
    setLoading(false);
    
    // Simulate incoming logs
    const interval = setInterval(() => {
      const type = logTypes[Math.floor(Math.random() * logTypes.length)];
      const message = logMessages[Math.floor(Math.random() * logMessages.length)];
      const timestamp = new Date().toLocaleTimeString();
      const id = Date.now();
      
      setLogs(prevLogs => [...prevLogs, { id, type, message, timestamp }].slice(-20));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const filteredLogs = logs.filter(log => {
    if (filter === "all") return true;
    return log.type === filter;
  });

  const getLogIcon = (type) => {
    switch (type) {
      case "success": return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case "error": return <XCircle className="h-4 w-4 text-red-400" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      default: return <Terminal className="h-4 w-4 text-blue-400" />;
    }
  };

  const getLogStyle = (type) => {
    switch (type) {
      case "success": return "border-l-4 border-emerald-500 bg-emerald-900/20";
      case "error": return "border-l-4 border-red-500 bg-red-900/20";
      case "warning": return "border-l-4 border-amber-500 bg-amber-900/20";
      default: return "border-l-4 border-blue-500 bg-blue-900/20";
    }
  };

  return (
    <motion.div 
      className={`bg-slate-900 rounded-xl border border-indigo-500/20 shadow-lg overflow-hidden transition-all ${
        expanded ? "fixed inset-4 z-50" : "h-96"
      }`}
      layout
    >
      <div className="flex justify-between items-center p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-indigo-100">Live Migration Logs</h3>
          {logs.length > 0 && (
            <span className="bg-indigo-900/50 text-indigo-300 text-xs py-0.5 px-2 rounded-full">
              {logs.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg text-sm py-1 px-2 text-slate-300"
          >
            <option value="all">All Logs</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded hover:bg-slate-800 transition-colors"
          >
            {expanded ? (
              <Minimize2 className="h-5 w-5 text-slate-400" />
            ) : (
              <Maximize2 className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
      
      <div className={`overflow-y-auto p-4 ${expanded ? "h-[calc(100%-8rem)]" : "h-72"}`}>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full gap-2">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-500" />
            <span className="text-slate-400">Initializing log stream...</span>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full gap-2 text-slate-500">
            <Terminal className="h-12 w-12 text-slate-700" />
            <span>No logs available</span>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-2">
              {filteredLogs.map((log) => (
                <motion.div
                  key={log.id}
                  className={`p-2 rounded-lg ${getLogStyle(log.type)}`}
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-2">
                    {getLogIcon(log.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span className="capitalize">{log.type}</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <p className="text-indigo-100 text-sm">{log.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </AnimatePresence>
        )}
      </div>
      
      <div className="p-3 border-t border-slate-700 flex justify-between items-center text-xs text-slate-500">
        <span>Logs auto-refresh every 30s</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>Live Connection Active</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveMigrationLogs;