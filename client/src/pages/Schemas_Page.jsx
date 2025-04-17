import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import DiffViewer from "react-diff-viewer";
import SchemaDiffViewer from "../components/migrations/SchemaDiff";
import Sidebar from "../components/dashboard/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  EyeOff,
  Eye,
  CheckCircle,
  XCircle,
  Maximize2,
  Minimize2,
  Copy,
  Database,
  GitBranch,
  History,
} from "lucide-react";

const SchemaPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDiffOnly, setShowDiffOnly] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentSchema, setCurrentSchema] = useState(`-- Initial schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);`);

  const [aiSuggestion, setAiSuggestion] = useState(`-- Modified schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);`);

  const [showMigrationHistory, setShowMigrationHistory] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [activeTab, setActiveTab] = useState("schema");
  const [showTooltip, setShowTooltip] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiSuggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleShowDiffOnly = () => {
    setShowDiffOnly(!showDiffOnly);
  };

  // Simulate loading for demo purposes
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
        setIsSaved(false);
      }, 2000);
    }, 1000);
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Stats for display
  const stats = [
    {
      title: "Total Migrations",
      count: 10,
      icon: <Database size={32} />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Success Rate",
      count: "78%",
      icon: <CheckCircle size={32} />,
      color: "from-green-600 to-green-800",
    },
    {
      title: "Failed",
      count: 2,
      icon: <XCircle size={32} />,
      color: "from-red-500 to-red-600",
    },
    {
      title: "In Progress",
      count: 1,
      icon: <History size={32} />,
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white font-Outfit">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 relative"
        >
          <h1 className="text-4xl font-bold font-Syne bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Database Schema Editor
          </h1>
          <p className="text-gray-400 mt-2 font-Montserrat">
            Edit your database schema and see AI-powered suggestions in
            real-time
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-0 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg flex items-center space-x-2 text-sm font-bold transition-all duration-200 shadow-lg shadow-blue-900/20"
          >
            <span>Start New Migration</span>
            <PlusCircle size={16} />
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-2 mb-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="backdrop-blur-md bg-transparent bg-gradient-to-br from-transparent via-gray-950 to-black/90 bg-opacity-5 border border-gray-900 rounded-xl mx-2 p-4 shadow-xl transition-all duration-300 hover:bg-opacity-10 hover:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 mt-2 font-Montserrat font-semibold ">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold ml-2 mt-2 font-Montserrat">
                    {stat.count}
                  </h3>
                </div>
                <div
                  className={`rounded-full p-2 mr-1 bg-gradient-to-br ${stat.color} shadow-lg`}
                >
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Control Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex mx-4 mb-6 font-Montserrat"
        >
          <button
            onClick={() => setActiveTab("schema")}
            className={`px-5 py-3 text-sm font-medium relative ${
              activeTab === "schema"
                ? "text-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Schema Editor
            {activeTab === "schema" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "schema" && (
            <motion.div
              key="schema"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Schema Editor */}
                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl text-green-600 font-bold font-Syne">
                      Current Schema
                    </h2>
                    <div className="flex space-x-2 relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={simulateLoading}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg flex items-center space-x-2 text-sm font-medium transition-all duration-200 shadow-lg shadow-blue-900/20"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Saving...</span>
                          </div>
                        ) : isSaved ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle size={16} />
                            <span>Saved!</span>
                          </div>
                        ) : (
                          <span>Save Changes</span>
                        )}
                      </motion.button>

                      <AnimatePresence>
                        {showTooltip && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 top-full mt-2 px-3 py-2 bg-green-600 text-white text-xs rounded-md shadow-lg z-10 whitespace-nowrap"
                          >
                            Schema saved successfully!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="backdrop-blur-lg bg-opacity-5 border border-gray-900 rounded-xl overflow-hidden shadow-xl">
                    <div className="bg-gray-900 bg-opacity-80 p-3 border-b border-gray-800 flex justify-between items-center">
                      <span className="text-gray-400 text-sm font-mono">
                        schema.sql
                      </span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <MonacoEditor
                        height="350px"
                        defaultLanguage="sql"
                        value={currentSchema}
                        onChange={(value) => setCurrentSchema(value || "")}
                        theme={editorTheme}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          padding: { top: 20 },
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.section>

                {/* AI Suggestion Diff Preview */}
                <motion.section
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="rounded-lg overflow-hidden border border-gray-800 bg-black">
                    {/* Header section with title and action buttons */}
                    <div className="px-6 py-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-purple-400">
                        AI Suggestions
                      </h2>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-gray-800 rounded-lg text-white">
                          Apply Changes
                        </button>
                        <button className="px-4 py-2 bg-purple-600 rounded-lg text-white">
                          Dismiss
                        </button>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="border-t border-gray-800">
                      {/* Change description bar */}
                      <div className="bg-gray-900 p-4 flex items-center space-x-4">
                        <div className="bg-purple-900 rounded-full p-2 text-purple-400 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </div>
                        <span className="text-white text-lg">
                          Adding email field and timestamp to users table
                        </span>
                      </div>

                      {/* Diff viewer controls */}
                      <div className="bg-gray-900 p-3 flex justify-end gap-2 border-b border-gray-800">
                        <button
                          onClick={toggleShowDiffOnly}
                          className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-800 text-gray-300"
                        >
                          {showDiffOnly ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                          <span>Diff Only</span>
                        </button>
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-800 text-gray-300"
                        >
                          <Copy size={16} />
                          <span>{copied ? "Copied!" : "Copy"}</span>
                        </button>
                        <button className="p-1 rounded-md bg-gray-800 text-gray-300">
                          <Maximize2 size={16} />
                        </button>
                      </div>

                      {/* Diff viewer */}
                      <div className="bg-gray-900">
                        <DiffViewer
                          oldValue={currentSchema}
                          newValue={aiSuggestion}
                          splitView={false}
                          hideLineNumbers={false}
                          showDiffOnly={showDiffOnly}
                          useDarkTheme={true}
                          styles={{
                            variables: {
                              dark: {
                                diffViewerBackground: "#111827",
                                diffViewerColor: "#e2e8f0",
                              },
                            },
                            line: {
                              padding: "0",
                            },
                            lineNumber: {
                              color: "#4b5563",
                              minWidth: "1em",
                            },
                            content: {
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "1rem",
                            },
                            gutter: {
                              backgroundColor: "#1e293b",
                            },
                            add: {
                              color: "#bef264",
                            },
                            added: {
                              backgroundColor: "rgba(4, 120, 87, 0.2)",
                            },
                            remove: {
                              color: "#fda4af",
                            },
                            removed: {
                              backgroundColor: "rgba(220, 38, 38, 0.2)",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.section>
              </div>

              {/* Migration History */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6"
              >

                <AnimatePresence>
                  {showMigrationHistory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 backdrop-blur-lg bg-black bg-opacity-5 border border-gray-800 rounded-lg shadow-xl p-4">
                        <div className="mb-6">
                          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                            <GitBranch size={16} className="text-blue-400" />
                            <span className="font-mono">20250413_153022</span>
                            <span className="px-2 py-0.5 bg-blue-900 bg-opacity-50 rounded text-xs">
                              Latest
                            </span>
                          </div>
                          <SchemaDiffViewer />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SchemaPage;
