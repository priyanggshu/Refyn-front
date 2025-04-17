import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import MigrationReportModal from "../components/report/MIgrationReportModal";
import Sidebar from "../components/dashboard/Sidebar";

const mockMigrations = [
  {
    id: "1",
    name: "Customer DB Migration",
    dbType: "PostgreSQL",
    status: "Success",
    duration: "3m 24s",
    totalTables: 12,
    totalRows: 23450,
    queries: ["ALTER TABLE customers ADD COLUMN age INT;"],
    startTime: "2024-04-14 10:15:32"
  },
  {
    id: "2",
    name: "Analytics Cleanup",
    dbType: "MongoDB",
    status: "Error",
    duration: "1m 08s",
    totalTables: 5,
    totalRows: 800,
    queries: ["db.analytics.remove({ old: true });"],
    startTime: "2024-04-12 16:45:10"
  },
  {
    id: "3",
    name: "Payments Index Update",
    dbType: "MySQL",
    status: "Pending",
    duration: "-",
    totalTables: 3,
    totalRows: 12000,
    queries: ["CREATE INDEX idx_payments_date ON payments(date);"],
    startTime: "2024-04-16 08:30:00"
  }
];

export default function ReportPage() {
  const [selectedMigration, setSelectedMigration] = useState(null);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 bg-slate-950 overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Migration Reports</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMigrations.map((migration) => (
            <motion.div
              key={migration.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer p-5 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-md hover:shadow-lg hover:shadow-indigo-600/20 transition-all"
              onClick={() => setSelectedMigration(migration)}
            >
              <div className="mb-2 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-indigo-100">
                  {migration.name}
                </h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1
                    ${migration.status === "Success" ? "bg-green-900/30 text-green-400" :
                    migration.status === "Error" ? "bg-red-900/30 text-red-400" :
                    "bg-yellow-900/30 text-yellow-400 animate-pulse"}`}
                >
                  {migration.status === "Pending" && (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="inline-block w-2 h-2 rounded-full bg-yellow-400"
                    />
                  )}
                  {migration.status}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-2">{migration.dbType}</p>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>⏱ {migration.duration}</span>
                <span>📅 {migration.startTime}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedMigration && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <MigrationReportModal
                migration={selectedMigration}
                onClose={() => setSelectedMigration(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
