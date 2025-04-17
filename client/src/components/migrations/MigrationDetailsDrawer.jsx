import React, { useState } from "react";
import { RefreshCw, InfoIcon } from "lucide-react";
import { motion } from "framer-motion";

const MigrationDetailsDrawer = ({ migrationId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [migration, setMigration] = useState(null);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  React.useEffect(() => {
    const fetchMigrationDetails = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/migrations/${migrationId}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        setTimeout(() => {
          setMigration({
            id: migrationId,
            name: "add_user_roles_table_v2",
            dbType: "PostgreSQL",
            status: Math.random() > 0.3 ? "Success" : Math.random() > 0.5 ? "Error" : "Pending",
            startTime: new Date(Date.now() - 3600000).toLocaleString(),
            endTime: Math.random() > 0.2 ? new Date().toLocaleString() : null,
            totalTables: 12,
            totalRows: 5839,
            duration: "8m 32s",
            queries: [
              "CREATE TABLE user_roles (id SERIAL PRIMARY KEY, user_id INT NOT NULL, role_id INT NOT NULL);",
              "ALTER TABLE users ADD COLUMN last_login TIMESTAMP;",
              "CREATE INDEX idx_user_roles ON user_roles(user_id, role_id);"
            ]
          });
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load migration details");
        setLoading(false);
      }
    };

    fetchMigrationDetails();
  }, [migrationId]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen sm:items-center p-4 text-center">
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle bg-slate-900 rounded-2xl border border-indigo-500/30 shadow-xl shadow-indigo-900/30 relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
            <h3 className="text-xl font-bold text-indigo-100">
              Migration Details
            </h3>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-slate-800 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center p-8 text-red-400">
              <InfoIcon className="w-12 h-12 mx-auto mb-4 text-red-400/70" />
              <p>{error}</p>
              <button 
                onClick={onClose} 
                className="mt-4 px-4 py-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : migration && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-xs uppercase text-slate-500 font-medium mb-1">Migration Name</p>
                  <p className="text-indigo-100 font-medium">{migration.name}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-xs uppercase text-slate-500 font-medium mb-1">Database Type</p>
                  <p className="text-indigo-100 font-medium">{migration.dbType}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-xs uppercase text-slate-500 font-medium mb-1">Status</p>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium
                    ${migration.status === "Success" ? "bg-green-900/30 text-green-400" : 
                      migration.status === "Error" ? "bg-red-900/30 text-red-400" : 
                      "bg-yellow-900/30 text-yellow-400"}`
                  }>
                    <span className={`w-2 h-2 rounded-full mr-1.5
                      ${migration.status === "Success" ? "bg-green-400" : 
                        migration.status === "Error" ? "bg-red-400" : 
                        "bg-yellow-400 animate-pulse"}`
                    }></span>
                    {migration.status}
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-xs uppercase text-slate-500 font-medium mb-1">Duration</p>
                  <p className="text-indigo-100 font-medium">{migration.duration}</p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-xl">
                <p className="text-xs uppercase text-slate-500 font-medium mb-2">Migration Queries</p>
                <div className="space-y-2">
                  {migration.queries.map((query, index) => (
                    <div key={index} className="bg-slate-900 p-3 rounded-lg border border-slate-700 font-mono text-sm text-indigo-200 overflow-x-auto">
                      {query}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-xs uppercase text-slate-500 font-medium mb-1">Tables Affected</p>
                  <p className="text-indigo-100 font-medium">{migration.totalTables}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-xs uppercase text-slate-500 font-medium mb-1">Rows Processed</p>
                  <p className="text-indigo-100 font-medium">{migration.totalRows.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-xs uppercase text-slate-500 font-medium mb-1">Started At</p>
                  <p className="text-indigo-100 font-medium">{migration.startTime}</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-700">
                <motion.button 
                  onClick={onClose} 
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
                {migration.status === "Error" && (
                  <motion.button
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium hover:from-indigo-500 hover:to-blue-500 transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Retry Migration</span>
                  </motion.button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};


export default MigrationDetailsDrawer;