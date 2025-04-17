import React, { useState, useEffect } from "react";
import {
  BarChart3,
  ArrowUpCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Upload,
  Plus,
  RefreshCw,
  Download,
  FileCode,
  Mail,
  Lightbulb,
  ChevronRight,
  Terminal,
  History,
  Database,
  DatabaseZap,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import MigrationOverviewChart from "../components/dashboard/Migration_Overview";
import {
  LiveMigrationLogs,
  MigrationHistoryTable,
  SchemaViewer,
} from "../components/dashboard/Subparts";

// Mock data for the dashboard
const migrationStats = {
  total: 156,
  successful: 129,
  failed: 8,
  pending: 19,
};

const chartData = [
  { name: "Jan", migrations: 12, successful: 10, failed: 2 },
  { name: "Feb", migrations: 19, successful: 17, failed: 2 },
  { name: "Mar", migrations: 15, successful: 13, failed: 2 },
  { name: "Apr", migrations: 23, successful: 20, failed: 3 },
  { name: "May", migrations: 28, successful: 25, failed: 3 },
  { name: "Jun", migrations: 18, successful: 17, failed: 1 },
  { name: "Jul", migrations: 41, successful: 37, failed: 4 },
];

const mockLogs = [
  {
    id: 1,
    timestamp: "14:32:54",
    message: "Migration #156 completed successfully",
    type: "success",
  },
  {
    id: 2,
    timestamp: "14:29:12",
    message: "Applying changes to users table",
    type: "info",
  },
  {
    id: 3,
    timestamp: "14:28:47",
    message: "Creating new index on products.category_id",
    type: "info",
  },
  {
    id: 4,
    timestamp: "14:25:33",
    message: "Failed to update foreign key constraint",
    type: "error",
  },
  {
    id: 5,
    timestamp: "14:22:19",
    message: "Migration #155 initiated by admin@example.com",
    type: "info",
  },
  {
    id: 6,
    timestamp: "13:55:02",
    message: "Schema backup created successfully",
    type: "success",
  },
  {
    id: 7,
    timestamp: "13:42:11",
    message: "Migration #154 completed with warnings",
    type: "warning",
  },
];

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

const mockSnapshots = [
  {
    id: 1,
    name: "Pre-User Model Update",
    timestamp: "2025-04-12 08:23:45",
    changes: 3,
  },
  {
    id: 2,
    name: "Order Processing Flow",
    timestamp: "2025-04-10 14:12:33",
    changes: 5,
  },
  {
    id: 3,
    name: "Product Category Refactor",
    timestamp: "2025-04-05 11:45:22",
    changes: 8,
  },
  {
    id: 4,
    name: "Initial Schema",
    timestamp: "2025-03-28 09:33:17",
    changes: 12,
  },
];

const mockInsights = [
  {
    id: 1,
    title: "Add index to improve query performance",
    description:
      "Creating an index on orders.status could improve performance by ~45%",
    priority: "high",
  },
  {
    id: 2,
    title: "Consider adding timestamps to all tables",
    description:
      "For consistency, add created_at and updated_at to remaining 3 tables",
    priority: "medium",
  },
  {
    id: 3,
    title: "Normalize address data",
    description:
      "Current address storage is inefficient, consider creating a separate addresses table",
    priority: "medium",
  },
];

const mockEmails = [
  {
    id: 1,
    subject: "Weekly Migration Report - Apr 12",
    sent: "2025-04-12 07:00:00",
    recipients: 5,
  },
  {
    id: 2,
    subject: "ALERT: Failed Migration #152",
    sent: "2025-04-09 14:22:15",
    recipients: 3,
  },
  {
    id: 3,
    subject: "Monthly Schema Overview - March",
    sent: "2025-04-01 08:15:30",
    recipients: 8,
  },
];

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

// The main Dashboard component
export default function Dashboard() {
  // Simulate real-time logs
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        message: `Processing schema changes ${Math.floor(Math.random() * 100)}`,
        type: ["info", "success", "warning", "error"][
          Math.floor(Math.random() * 4)
        ],
      };

      setActiveLogs((prev) => [newLog, ...prev.slice(0, 6)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-Outfit">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm backdrop-blur-sm bg-opacity-50 sticky z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <DatabaseZap className="h-8 w-8 text-amber-500" />
            <h1 className="text-xl font-Krona font-extralight text-gray-300">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search migrations..."
                className="pl-12 pr-8 py-2 placeholder:text-sm rounded-xl border border-gray-700 block w-64 bg-gray-900/50 text-gray-400"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button className="bg-indigo-700 hover:bg-indigo-700 text-gray-200 font-Syne p-2 rounded-lg cursor-pointer transition transform hover:scale-105 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              <span>New Migration</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <section>
              <h2 className="text-lg font-Montserrat font-semibold text-gray-300 mb-4 flex items-center">
                <span className="w-1 h-5 bg-indigo-500 rounded-r mr-2.5 inline-block"></span>
                Migration Statistics
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Migrations"
                  value={migrationStats.total}
                  icon={<BarChart3 size={40} />}
                  color="bg-indigo-500"
                />
                <StatsCard
                  title="Successful"
                  value={migrationStats.successful}
                  icon={<CheckCircle2 size={40} />}
                  color="bg-emerald-500"
                />
                <StatsCard
                  title="Failed"
                  value={migrationStats.failed}
                  icon={<XCircle size={40} />}
                  color="bg-rose-500"
                />
                <StatsCard
                  title="Pending"
                  value={migrationStats.pending}
                  icon={<Clock size={40} />}
                  color="bg-amber-500"
                />
              </div>
            </section>

            {/* Migration Overview Chart */}
            <MigrationOverviewChart />

            {/* Live Migration Logs */}
            <LiveMigrationLogs />

            {/* Schema Viewer */}
            <SchemaViewer />

            {/* Migration History Table */}
            <MigrationHistoryTable />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <h2 className="text-xl font-Syne font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <QuickActionButton
                  icon={<Plus />}
                  label="New Migration"
                  color="bg-indigo-600 hover:bg-indigo-700"
                />
                <QuickActionButton
                  icon={<Upload />}
                  label="Upload Schema"
                  color="bg-emerald-600 hover:bg-emerald-700"
                />
                <QuickActionButton
                  icon={<RefreshCw />}
                  label="Refresh Status"
                  color="bg-sky-600 hover:bg-sky-700"
                />
                <QuickActionButton
                  icon={<Download />}
                  label="Export Logs"
                  color="bg-amber-600 hover:bg-amber-700"
                />
              </div>
            </section>

            {/* Rollback Snapshots */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <h2 className="text-xl font-Syne font-bold text-gray-900 dark:text-white mb-4">
                Rollback Snapshots
              </h2>
              <div className="space-y-3">
                {mockSnapshots.map((snapshot) => (
                  <div
                    key={snapshot.id}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {snapshot.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {snapshot.timestamp} • {snapshot.changes} changes
                      </p>
                    </div>
                    <button className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 p-2 rounded-full transition-colors">
                      <ArrowUpCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Insights */}
            <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-Syne font-bold mb-4 flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" />
                AI Insights
              </h2>
              <div className="space-y-4">
                {mockInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors"
                  >
                    <div className="flex items-start">
                      <span
                        className={`inline-block w-2 h-2 mt-2 mr-3 rounded-full ${
                          insight.priority === "high"
                            ? "bg-rose-400"
                            : insight.priority === "medium"
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        }`}
                      ></span>
                      <div>
                        <h3 className="font-medium">{insight.title}</h3>
                        <p className="text-sm text-indigo-100">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-white/20 hover:bg-white/30 font-medium py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <span>View All Insights</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </section>

            {/* Email Summary */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <h2 className="text-xl font-Syne font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-indigo-500" />
                Email Reports
              </h2>
              <div className="space-y-3">
                {mockEmails.map((email) => (
                  <div
                    key={email.id}
                    className="border-l-4 border-indigo-500 pl-3 py-2"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {email.subject}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sent {email.sent} • {email.recipients} recipients
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                View All Reports
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="relative overflow-hidden backdrop-blur-md rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group">
      {/* Subtle gradient border */}
      <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-50"></div>

      {/* Glass effect background */}
      <div className="relative bg-black/15 rounded-xl p-4 h-full border border-white/10">
        {/* Background glow - smaller and more subtle */}
        <div
          className={`absolute -right-3 -bottom-3 w-16 h-16 ${color.replace(
            "bg-",
            "bg-"
          )}/10 blur-xl rounded-full transition-opacity duration-300 group-hover:opacity-100 opacity-50`}
        ></div>

        <div className="relative flex flex-col items-center text-center">
          <div
            className={`${color} p-3 mb-4 rounded-2xl text-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-lg`}
          >
            {icon}
          </div>

          <div className="space-y-2 w-full">
            <p className="text-xs font-Syne font-medium text-gray-400 tracking-wide uppercase">
              {title}
            </p>
            <p className="text-3xl font-semibold font-Outfit text-white">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label, color }) {
  return (
    <button
      className={`${color} text-white p-4 rounded-lg shadow transition transform hover:scale-105 flex flex-col items-center justify-center h-24`}
    >
      <div className="text-white mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}