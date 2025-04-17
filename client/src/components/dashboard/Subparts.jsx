import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";

export const LiveMigrationLogs = () => {
  const mockLogs = [
    {
      id: 1,
      timestamp: "14:32:54",
      message: "Migration #156 completed successfully",
      type: "success",
      details: "All 27 changes applied in 3.42s",
    },
    {
      id: 2,
      timestamp: "14:29:12",
      message: "Applying changes to users table",
      type: "info",
      details: "ALTER TABLE users ADD COLUMN last_login_at TIMESTAMP",
    },
    {
      id: 3,
      timestamp: "14:28:47",
      message: "Creating new index on products.category_id",
      type: "info",
      details: "CREATE INDEX idx_products_category ON products (category_id)",
    },
    {
      id: 4,
      timestamp: "14:25:33",
      message: "Failed to update foreign key constraint",
      type: "error",
      details: 'ERROR: relation "categories" does not exist',
    },
    {
      id: 5,
      timestamp: "14:22:19",
      message: "Migration #155 initiated by admin@example.com",
      type: "info",
      details: "Migration contains 4 operations",
    },
    {
      id: 6,
      timestamp: "13:55:02",
      message: "Schema backup created successfully",
      type: "success",
      details: "Stored at /backups/schema_20250412_135502.sql (2.7MB)",
    },
    {
      id: 7,
      timestamp: "13:42:11",
      message: "Migration #154 completed with warnings",
      type: "warning",
      details: "Index on orders.customer_id already exists, skipped",
    },
  ];

  const [activeLogs, setActiveLogs] = useState(mockLogs);
  const [expandedLog, setExpandedLog] = useState(null);
  const [isLive, setIsLive] = useState(true);
  const logsContainerRef = useRef(null);
  const [newLogIndicator, setNewLogIndicator] = useState(false);

  // Auto-scroll to bottom effect
  useEffect(() => {
    if (logsContainerRef.current && isLive) {
      logsContainerRef.current.scrollTop =
        logsContainerRef.current.scrollHeight;
    }
  }, [activeLogs, isLive]);

  // Simulate new logs appearing
  useEffect(() => {
    if (!isLive) return;

    const newLogMessages = [
      {
        message: "Checking integrity of foreign keys",
        type: "info",
        details: "Running validation checks on all constraints",
      },
      {
        message: "Migration #157 initiated by system@scheduler",
        type: "info",
        details: "Automated daily optimization",
      },
      {
        message: "Compressing historical data tables",
        type: "info",
        details: "Optimizing storage for analytics_2024_q1",
      },
      {
        message: "Updated partitioning scheme for logs table",
        type: "success",
        details: "Created 12 new monthly partitions",
      },
      {
        message: "Connection pool limit reached",
        type: "warning",
        details: "Current connections: 50/50, consider increasing limit",
      },
      {
        message: "Failed to connect to replica database",
        type: "error",
        details: "FATAL: password authentication failed for user 'replicator'",
      },
      {
        message: "Creating temporary table for data transfer",
        type: "info",
        details:
          "CREATE TEMP TABLE temp_users AS SELECT * FROM users WHERE created_at > '2025-01-01'",
      },
    ];

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * newLogMessages.length);
      const newMessage = newLogMessages[randomIndex];

      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        message: newMessage.message,
        type: newMessage.type,
        details: newMessage.details,
      };

      setActiveLogs((logs) => [newLog, ...logs].slice(0, 50));
      setNewLogIndicator(true);
      setTimeout(() => setNewLogIndicator(false), 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getIconForLogType = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-rose-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-400" />;
    }
  };

  const getLogTypeClass = (type) => {
    switch (type) {
      case "success":
        return "border-l-emerald-500 hover:bg-emerald-900 hover:bg-opacity-20";
      case "warning":
        return "border-l-amber-500 hover:bg-amber-900 hover:bg-opacity-20";
      case "error":
        return "border-l-rose-500 hover:bg-rose-900 hover:bg-opacity-20";
      default:
        return "border-l-blue-400 hover:bg-blue-900 hover:bg-opacity-20";
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case "success":
        return "text-emerald-400";
      case "warning":
        return "text-amber-400";
      case "error":
        return "text-rose-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <section className="bg-gray-900 rounded-xl shadow-lg p-5 transition-all hover:shadow-xl border border-gray-800 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-Montserrat font-semibold text-gray-300 flex items-center">
          <Terminal className="mr-3 h-6 w-6 text-green-400" />
          Live Migration Logs
        </h2>

        <div className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full mr-2 ${
              isLive ? "bg-green-500 animate-pulse" : "bg-gray-500"
            }`}
          ></div>
          <button
            onClick={() => setIsLive(!isLive)}
            className="flex items-center text-sm font-Outfit font-medium text-gray-300 hover:text-white transition-all"
          >
            <RefreshCw
              className={`mr-1.5 h-3 w-3 ${
                isLive ? "animate-spin text-green-400" : "text-gray-400"
              }`}
            />
            {isLive ? "Live" : "Paused"}
          </button>
        </div>
      </div>

      <div
        ref={logsContainerRef}
        className="bg-gray-950 rounded-lg border border-gray-800 h-80 overflow-y-auto custom-scrollbar"
      >
        <div className="leading-relaxed">
          {activeLogs.map((log, index) => (
            <div
              key={log.id}
              className={`border-l-2 pl-2 py-2.5 border-opacity-70 transition-all cursor-pointer ${getLogTypeClass(
                log.type
              )} ${expandedLog === log.id ? "bg-gray-800 bg-opacity-30" : ""} ${
                index === 0 && newLogIndicator ? "animate-highlight" : ""
              }`}
              onClick={() =>
                setExpandedLog(expandedLog === log.id ? null : log.id)
              }
            >
              <div className="flex items-start px-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getIconForLogType(log.type)}
                </div>
                <div className="ml-2.5 flex-1">
                  <div className="flex items-center">
                    <span className="font-mono text-xs text-gray-500 font-medium tracking-tight">
                      {log.timestamp}
                    </span>
                    <span className="mx-2 text-gray-600">|</span>
                    <span
                      className={`
                      ${getMessageColor(log.type)}
                      font-mono text-sm font-medium tracking-tight
                    `}
                    >
                      {log.message}
                    </span>
                  </div>

                  {expandedLog === log.id && (
                    <div className="mt-2 pl-2 border-l border-gray-700 animate-fadeIn">
                      <pre className="font-mono text-xs text-gray-400 bg-gray-900 rounded p-2 overflow-x-auto whitespace-pre-wrap">
                        {log.details}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs font-Montserrat text-gray-500">
          Showing {activeLogs.length} log entries
        </span>
        <div className="flex space-x-4">
          <span className="flex items-center font-Montserrat text-xs text-gray-400">
            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></div>
            Success
          </span>
          <span className="flex items-center font-Montserrat text-xs text-gray-400">
            <div className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></div>
            Warning
          </span>
          <span className="flex items-center font-Montserrat text-xs text-gray-400">
            <div className="h-2 w-2 rounded-full bg-rose-500 mr-1.5"></div>
            Error
          </span>
          <span className="flex items-center font-Montserrat text-xs text-gray-400">
            <div className="h-2 w-2 rounded-full bg-blue-400 mr-1.5"></div>
            Info
          </span>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.8);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.5);
          border-radius: 20px;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes highlight {
          0% {
            background-color: rgba(16, 185, 129, 0.2);
          }
          50% {
            background-color: rgba(16, 185, 129, 0.1);
          }
          100% {
            background-color: transparent;
          }
        }
        .animate-highlight {
          animation: highlight 2s ease-out;
        }
      `}</style>
    </section>
  );
};

// import { useState, useEffect } from "react";
import {
  FileCode,
  Code2,
  Copy,
  Check,
  ChevronsLeftRightEllipsis,
} from "lucide-react";

export const SchemaViewer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("sql");

  const mockSchema = `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`;

  // Simulating loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mockSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animation for schema lines appearing
  const SchemaContent = () => {
    const [lines, setLines] = useState([]);

    useEffect(() => {
      if (!isLoading) {
        const schemaLines = mockSchema.split("\n");
        const timer = setInterval(() => {
          if (lines.length < schemaLines.length) {
            setLines((prev) => [...prev, schemaLines[prev.length]]);
          } else {
            clearInterval(timer);
          }
        }, 50);

        return () => clearInterval(timer);
      }
    }, [isLoading]);

    return (
      <div className="font-mono text-base text-emerald-100 space-y-0.5">
        {lines.map((line, index) => (
          <div
            key={index}
            className="transform transition-all duration-300 opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: "forwards",
            }}
          >
            {line}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-900 rounded-xl p-6 shadow-lg transition-all duration-500 border border-gray-800 hover:shadow-xl backdrop-blur-lg bg-opacity-90 relative overflow-hidden group">
      {/* Glassmorphism decoration elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-600 rounded-full opacity-10 blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-Montserrat font-semibold text-gray-300 mb-4 flex items-center">
          <ChevronsLeftRightEllipsis className="mr-2 size-8 text-green-600" />
          Schema Viewer
        </h2>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("sql")}
              className={`px-3 py-1 rounded-md text-sm font-Outfit transition-all ${
                activeTab === "sql"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-950 text-gray-400 hover:bg-gray-800"
              }`}
            >
              SQL
            </button>
            <button
              onClick={() => setActiveTab("visual")}
              className={`px-3 py-1 rounded-md text-sm font-Outfit transition-all ${
                activeTab === "visual"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-950 text-gray-400 hover:bg-gray-800"
              }`}
            >
              Visual
            </button>
          </div>
        </div>

        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-950 bg-opacity-80 z-20 rounded-lg backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-800 rounded-full animate-spin"></div>
                <p className="mt-4 font-Syne text-indigo-400">
                  Loading schema...
                </p>
              </div>
            </div>
          )}

          <div className="bg-gray-950 bg-opacity-90 rounded-lg border border-gray-800 backdrop-blur-md transition-all duration-300 group-hover:border-indigo-600/30">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <Code2 className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-Montserrat text-gray-300">
                  database_schema.sql
                </span>
              </div>
              <button
                onClick={copyToClipboard}
                className="p-1.5 rounded-md bg-gray-900 hover:bg-gray-800 transition-all text-gray-400 hover:text-white"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="p-6 h-72 overflow-y-auto custom-scrollbar">
              {activeTab === "sql" ? (
                <SchemaContent />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-gray-900 rounded-full mb-4">
                      <FileCode className="h-10 w-10 text-indigo-400" />
                    </div>
                    <p className="font-Syne text-gray-300">
                      Visual schema coming soon
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="text-xs font-Outfit text-gray-400">
                3 tables
              </span>
            </div>
            <span className="text-xs font-Outfit text-gray-400">
              Last updated: Today
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.4);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.6);
        }
      `}</style>
    </section>
  );
};


// break point

import { History, ChevronLeft, ChevronRight, Filter, ArrowUpDown } from "lucide-react";

export const MigrationHistoryTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [migrations, setMigrations] = useState([]);
  
  const mockMigrationHistory = [
    {
      id: 156,
      name: "Add user preferences",
      author: "Sarah Chen",
      timestamp: "2025-04-12 14:32:54",
      status: "success",
      duration: "45s",
    },
    {
      id: 155,
      name: "Update product constraints",
      author: "John Miller",
      timestamp: "2025-04-12 13:15:22",
      status: "success",
      duration: "38s",
    },
    {
      id: 154,
      name: "Add order tracking fields",
      author: "Sarah Chen",
      timestamp: "2025-04-11 16:45:11",
      status: "warning",
      duration: "1m 12s",
    },
    {
      id: 153,
      name: "Refactor user authentication",
      author: "Alex Johnson",
      timestamp: "2025-04-11 11:22:05",
      status: "success",
      duration: "2m 05s",
    },
    {
      id: 152,
      name: "Add product categories",
      author: "John Miller",
      timestamp: "2025-04-09 09:45:18",
      status: "failed",
      duration: "1m 47s",
    },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      animateTableRows();
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animate rows appearing one by one
  const animateTableRows = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < mockMigrationHistory.length) {
        setMigrations(prev => [...prev, mockMigrationHistory[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
  };
  
  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return "bg-emerald-900/30 text-emerald-300 border border-emerald-500/30";
      case "failed":
        return "bg-red-900/30 text-red-300 border border-red-500/30";
      default:
        return "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30";
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-900 rounded-xl p-6 shadow-lg transition-all duration-500 border border-gray-800 hover:shadow-xl backdrop-blur-lg bg-opacity-90 relative overflow-hidden group">
      {/* Glassmorphism decoration elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-600 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-Montserrat font-semibold text-gray-300 mb-4 flex items-center">
          <span className="w-1 h-5 bg-indigo-500 rounded-r mr-2.5 inline-block"></span>
          Migration History
        </h2>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition-all border border-gray-800 hover:border-indigo-500/30">
              <Filter className="h-4 w-4" />
            </button>
            <button 
              className="p-2 rounded-md bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition-all border border-gray-800 hover:border-indigo-500/30 animate-spin-slow"
              onClick={() => {
                setIsLoading(true);
                setMigrations([]);
                setTimeout(() => {
                  setIsLoading(false);
                  animateTableRows();
                }, 1200);
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-950 bg-opacity-80 z-20 rounded-lg backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-800 rounded-full animate-spin"></div>
                <p className="mt-4 font-Syne text-indigo-400">Loading migrations...</p>
              </div>
            </div>
          )}

          <div className="bg-gray-950 bg-opacity-80 rounded-lg border border-gray-800 backdrop-blur-md transition-all duration-300 group-hover:border-indigo-600/30 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-900 bg-opacity-60">
                  <tr>
                    {[
                      { id: "id", name: "ID" },
                      { id: "name", name: "Name" },
                      { id: "author", name: "Author" },
                      { id: "timestamp", name: "Date" },
                      { id: "status", name: "Status" },
                      { id: "duration", name: "Duration" }
                    ].map((column) => (
                      <th
                        key={column.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-Montserrat text-gray-400 uppercase tracking-wider"
                        onClick={() => handleSort(column.id)}
                      >
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors">
                          {column.name}
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {migrations.map((migration, index) => (
                    <tr
                      key={migration.id}
                      className="hover:bg-gray-900/50 transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-Outfit font-medium text-indigo-300">
                        #{migration.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-Outfit text-gray-300">
                        {migration.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-Outfit text-gray-300">
                        {migration.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-Outfit text-gray-300">
                        {migration.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getStatusBadge(migration.status)}`}
                        >
                          {migration.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-Outfit text-gray-300">
                        {migration.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {migrations.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <History className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 font-Outfit">No migration history found</p>
              </div>
            )}
            
            <div className="px-6 py-4 bg-gray-900/40 flex justify-between items-center">
              <p className="text-sm text-gray-400 font-Outfit">
                Showing {migrations.length} of 156 migrations
              </p>
              <div className="flex space-x-2">
                <button className="bg-gray-900 text-gray-400 px-3 py-1.5 rounded-md border border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition-all flex items-center gap-1 text-sm font-Outfit">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-all flex items-center gap-1 text-sm font-Outfit">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow:hover {
          animation: spin-slow 1.5s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.4);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.6);
        }
      `}</style>
    </section>
  );
}