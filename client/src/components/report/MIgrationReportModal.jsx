import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function MigrationReportModal({
  migration,
  onClose,
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-xl relative border border-slate-800"
      >
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-indigo-100 mb-1">{migration.name}</h2>
        <p className="text-sm text-slate-400 mb-4">{migration.dbType} • {migration.startTime}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-slate-300 mb-4">
          <div>
            <p className="text-slate-500">Status</p>
            <p className={
              migration.status === "Success"
                ? "text-green-400"
                : migration.status === "Error"
                ? "text-red-400"
                : "text-yellow-400 animate-pulse"
            }>
              {migration.status}
            </p>
          </div>
          <div>
            <p className="text-slate-500">Duration</p>
            <p>{migration.duration}</p>
          </div>
          <div>
            <p className="text-slate-500">Tables Migrated</p>
            <p>{migration.totalTables}</p>
          </div>
          <div>
            <p className="text-slate-500">Rows Affected</p>
            <p>{migration.totalRows.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-slate-800/60 rounded-lg p-4 text-sm text-slate-300 max-h-48 overflow-y-auto">
          <p className="text-slate-400 font-medium mb-2">Executed Queries:</p>
          <ul className="list-disc list-inside space-y-2">
            {migration.queries.map((query, idx) => (
              <li key={idx} className="break-words">{query}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
