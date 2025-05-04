import { useState } from "react";
import { Database, UploadCloud, ShieldCheck, Users, ArrowRight, AlertCircle, Copy, Check, ExternalLink } from "lucide-react";

export default function MigrationSettings({ settings }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedField, setCopiedField] = useState(null);
  const [expanded, setExpanded] = useState(false);

  if (!settings) {
    return (
      <div className="mx-6 md:mx-12 my-4 md:my-6 rounded-2xl bg-zinc-950/50 border border-zinc-800/60 p-8 text-center text-zinc-400 shadow-lg">
        <AlertCircle className="mx-auto mb-4 text-zinc-500" size={28} />
        <p className="text-lg">No migration settings available</p>
      </div>
    );
  }

  const { sourceDb, targetDb, migrationType = "standard", rbac = [] } = settings;

  const maskConnection = (connStr) => {
    try {
      const url = new URL(connStr);
      return `${url.protocol}//${url.username}:****@${url.hostname}:${url.port}/${url.pathname.replace("/", "")}`;
    } catch {
      return "Invalid connection string";
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const openExternalLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-6 md:mx-auto my-4 md:my-8 rounded-2xl bg-gradient-to-br from-black via-gray-950 to-purple-500/10 border-2 border-red-900/20 backdrop-blur-sm shadow-2xl">
      <div className="p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800/50 pb-5 gap-4">
          <h2 className="text-xl font-medium text-zinc-100 flex items-center">
            <ShieldCheck className="mr-3 text-indigo-400" size={22} />
            Migration Configuration
          </h2>
          
          <div className="flex gap-3">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "overview" 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30" 
                : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "details" 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30" 
                : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Connection Details
            </button>
          </div>

          <div 
            className="bg-zinc-800/40 px-4 py-2 rounded-lg text-sm font-medium text-indigo-300 border border-indigo-900/30 hover:bg-zinc-800/60 transition-colors cursor-default flex items-center"
          >
            {migrationType.toUpperCase()}
          </div>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Database Connection */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <div className="w-full md:w-5/12">
                  <div className="flex items-center bg-zinc-900/70 rounded-xl border border-zinc-800/60 p-4 hover:border-zinc-700/60 transition-colors group">
                    <Database className="text-teal-400 mr-3 flex-shrink-0 group-hover:text-teal-300 transition-colors" size={20} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-zinc-400 mb-1 group-hover:text-zinc-300 transition-colors">Source Database</div>
                      <Tooltip text={sourceDb}>
                        <div className="text-sm text-zinc-200 truncate group-hover:text-white transition-colors">{maskConnection(sourceDb)}</div>
                      </Tooltip>
                    </div>
                    <button 
                      className="ml-2 p-2 rounded-lg bg-zinc-800/50 text-zinc-500 hover:bg-zinc-800 hover:text-teal-400 transition-all"
                      onClick={() => copyToClipboard(sourceDb, "source")}
                      aria-label="Copy source connection string"
                    >
                      {copiedField === "source" ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="hidden md:flex justify-center">
                  <div className="h-10 w-10 rounded-full bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center">
                    <ArrowRight className="text-zinc-600" size={18} />
                  </div>
                </div>
                
                <div className="w-full md:w-5/12">
                  <div className="flex items-center bg-zinc-900/70 rounded-xl border border-zinc-800/60 p-4 hover:border-zinc-700/60 transition-colors group">
                    <UploadCloud className="text-blue-400 mr-3 flex-shrink-0 group-hover:text-blue-300 transition-colors" size={20} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-zinc-400 mb-1 group-hover:text-zinc-300 transition-colors">Target Database</div>
                      <Tooltip text={targetDb}>
                        <div className="text-sm text-zinc-200 truncate group-hover:text-white transition-colors">{maskConnection(targetDb)}</div>
                      </Tooltip>
                    </div>
                    <button 
                      className="ml-2 p-2 rounded-lg bg-zinc-800/50 text-zinc-500 hover:bg-zinc-800 hover:text-blue-400 transition-all"
                      onClick={() => copyToClipboard(targetDb, "target")}
                      aria-label="Copy target connection string"
                    >
                      {copiedField === "target" ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Roles */}
            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-5 hover:border-zinc-700/40 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-indigo-400" size={20} />
                <h3 className="text-sm font-medium text-zinc-200">Access Control</h3>
              </div>
              
              {rbac.length ? (
                <div className="flex flex-wrap gap-2">
                  {(expanded ? rbac : rbac.slice(0, 5)).map((role, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/40 text-sm text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 hover:text-zinc-200 transition-all cursor-default"
                    >
                      {role}
                    </span>
                  ))}
                  {!expanded && rbac.length > 5 && (
                    <button
                      className="px-3 py-1.5 rounded-lg bg-zinc-800/30 border border-zinc-700/30 text-sm text-indigo-400 hover:bg-indigo-900/20 hover:border-indigo-800/40 transition-all"
                      onClick={() => setExpanded(true)}
                    >
                      +{rbac.length - 5} more
                    </button>
                  )}
                  {expanded && rbac.length > 5 && (
                    <button
                      className="px-3 py-1.5 rounded-lg bg-zinc-800/30 border border-zinc-700/30 text-sm text-indigo-400 hover:bg-indigo-900/20 hover:border-indigo-800/40 transition-all"
                      onClick={() => setExpanded(false)}
                    >
                      Show less
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex items-center text-sm text-zinc-500 italic">
                  <div className="p-1.5 mr-2 rounded-md bg-zinc-800/40 border border-zinc-800">
                    <AlertCircle size={16} className="text-zinc-500" />
                  </div>
                  No role restrictions applied to this migration
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "details" && (
          <div className="space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-5">
              <h3 className="text-sm font-medium text-zinc-200 mb-4">Connection Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs text-zinc-400 mb-2">Source Connection</h4>
                  <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/60 text-sm text-zinc-300 font-mono break-all">
                    {sourceDb}
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button 
                      className="px-3 py-1.5 rounded-lg bg-zinc-800/60 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-teal-400 transition-all flex items-center gap-1"
                      onClick={() => copyToClipboard(sourceDb, "source-full")}
                    >
                      {copiedField === "source-full" ? <Check size={14} /> : <Copy size={14} />}
                      {copiedField === "source-full" ? "Copied!" : "Copy connection string"}
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs text-zinc-400 mb-2">Target Connection</h4>
                  <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/60 text-sm text-zinc-300 font-mono break-all">
                    {targetDb}
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button 
                      className="px-3 py-1.5 rounded-lg bg-zinc-800/60 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-blue-400 transition-all flex items-center gap-1"
                      onClick={() => copyToClipboard(targetDb, "target-full")}
                    >
                      {copiedField === "target-full" ? <Check size={14} /> : <Copy size={14} />}
                      {copiedField === "target-full" ? "Copied!" : "Copy connection string"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-5">
              <h3 className="text-sm font-medium text-zinc-200 mb-4">Migration Type Details</h3>
              <div className="text-sm text-zinc-400">
                <p>Migration type: <span className="text-indigo-400 font-medium">{migrationType.toUpperCase()}</span></p>
                <p className="mt-2">This migration is configured with {rbac.length ? `${rbac.length} access roles` : "no access role restrictions"}.</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-zinc-800/40">
                <button 
                  className="px-4 py-2 rounded-lg bg-indigo-600/90 text-white text-sm hover:bg-indigo-500 transition-colors flex items-center gap-2"
                  onClick={() => openExternalLink("https://example.com/docs/migrations")}
                >
                  <ExternalLink size={16} />
                  View Migration Documentation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Tooltip({ children, text }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && (
        <div className="absolute z-50 top-full mt-2 left-0 transform bg-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-lg shadow-xl border border-zinc-700/50 w-auto max-w-md">
          {text}
        </div>
      )}
    </div>
  );
}