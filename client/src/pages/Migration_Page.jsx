import React, { useState } from "react";
import MigrationOverview from "../components/migrations/MigrationOverview";
import NewMigrationModal from "../components/migrations/NewMigrationModal";
import MigrationTable from "../components/migrations/MigrationTable";
import MigrationDetailsDrawer from "../components/migrations/MigrationDetailsDrawer";
import { LiveMigrationLogs } from "../components/dashboard/Subparts";
import Sidebar from "../components/dashboard/Sidebar";
import { RefreshCw, Settings } from "lucide-react";
import { motion } from "framer-motion";
import SchemaDiffViewer from "../components/migrations/SchemaDiff";

const MigrationPage = () => {
  const [selectedMigrationId, setSelectedMigrationId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showMigrationDetails, setShowMigrationDetails] = useState(false);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleSelectMigration = (id) => {
    setSelectedMigrationId(id);
    setShowMigrationDetails(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      <Sidebar />
      <main className="md:w-[75%] flex-1 overflow-y-auto p-6 custom-scrollbar">
        <motion.div
          className="max-w-7xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="flex justify-between items-center pb-4">
            <motion.h1
              className="text-3xl font-bold"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Database Migrations
            </motion.h1>

            <motion.div
              className="flex space-x-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={handleRefresh}
                className="p-2 rounded-full bg-transparent text-gray-400 hover:text-white transition-all border border-gray-800"
                aria-label="Refresh"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                className="p-2 rounded-full bg-transparent text-gray-400 hover:text-white transition-all border border-gray-800"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </motion.div>
          </div>

          {/* Migration Overview Stats */}
          <MigrationOverview />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Migration Table (Left and Middle) */}
            <motion.div
              className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-4 border-b border-gray-900 flex justify-between items-center">
                <div className="text-left">
                  <h2 className="font-Syne text-lg font-bold">
                    MIGRATION DETAILS
                  </h2>
                </div>
              </div>
              <MigrationTable
                key={`table-${refreshKey}`}
                onSelectMigration={handleSelectMigration}
              />
            </motion.div>

            <motion.div
              className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* logs */}
              <LiveMigrationLogs />
            </motion.div>
          </div>

          {/* Migration Details Drawer */}
          {showMigrationDetails && selectedMigrationId && (
            <MigrationDetailsDrawer
              migrationId={selectedMigrationId}
              onClose={() => setShowMigrationDetails(false)}
            />
          )}
        </motion.div>
        <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.8);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.5);
          border-radius: 50px;
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
      </main>

      <div className="md:w-[25%] overflow-y-auto custom-scrollbar">
        {/* Start New Migration Button */}
        <NewMigrationModal />
        
        {/* Right Column (Logs) */}
        <motion.div
          className="space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Schema Diff */}
          <SchemaDiffViewer />

          {/* Timeline */}
          {/* <MigrationTimelineViewer /> */}
        </motion.div>
      </div>
    </div>
  );
};

export default MigrationPage;
