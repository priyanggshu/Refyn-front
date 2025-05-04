import React, { useState, useEffect } from "react";
import {
  FileDiff,
  Copy,
  CheckCircle,
  Clock,
  ChevronRight,
  Calendar,
  Database,
  ArrowRight,
} from "lucide-react";

// Mock data: replace with your real fetched data
const migrations = [
  {
    id: 1,
    name: "create_users_table",
    timestamp: "2025-04-10 14:32:21",
    status: "success",
    schemaDiff: `+ CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);`,
    timeline: [
      { step: "Started", time: "2025-04-10 14:30:05" },
      { step: "Schema Analyzed", time: "2025-04-10 14:31:12" },
      { step: "Migration Executed", time: "2025-04-10 14:32:06" },
      { step: "Completed", time: "2025-04-10 14:32:21" },
    ],
  },
];

export default function SchemaDiff() {
  const [selectedMigration, setSelectedMigration] = useState(migrations[0]);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
      animateTimeline();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (copiedToClipboard) {
      const timer = setTimeout(() => setCopiedToClipboard(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedToClipboard]);

  const animateTimeline = () => {
    setAnimatedItems([]);
    if (selectedMigration) {
      const timelineLength = selectedMigration.timeline.length;
      for (let i = 0; i < timelineLength; i++) {
        setTimeout(() => {
          setAnimatedItems((prev) => [...prev, i]);
        }, i * 300);
      }
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(selectedMigration.schemaDiff);
    setCopiedToClipboard(true);
  };

  const highlightDiff = (diffText) => {
    if (!diffText) return null;

    const lines = diffText.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("+")) {
        return (
          <div
            key={index}
            className="text-green-400 bg-green-950 bg-opacity-40 px-1 rounded"
          >
            {line}
          </div>
        );
      } else if (line.startsWith("-")) {
        return (
          <div
            key={index}
            className="text-red-400 bg-red-950 bg-opacity-40 px-1 rounded"
          >
            {line}
          </div>
        );
      }
      return <div key={index}>{line}</div>;
    });
  };

  return (
    <div
      className={`bg-black text-white w-xl font-Montserrat rounded-xl border border-blue-400/30 transition-all duration-500 ease-in-out ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center p-4 border-b border-gray-800">
        <FileDiff className="text-blue-400 mr-2 size-5" />
        <h2 className="font-Krona my-2">Suggested Schema</h2>
      </div>

      {/* Progress Tracker / Timeline */}
      <div className="p-6">
        <div className="ml-2">
          {/* Timeline steps */}
          <div className="relative ml-4">
            {/* Schema Diff Viewer */}
            <div className="ml-6 mb-8">
              <div className="flex items-center mb-2">
                <FileDiff className="text-blue-400 mr-2 h-5 w-5" />
                <h3 className="font-semibold text-purple-200">Schema Diff</h3>
              </div>
              <div className="relative">
                <div className="overflow-auto bg-gray-900/80 text-gray-100 font-mono text-sm p-4 rounded-lg border border-purple-900/40">
                  <pre className="whitespace-pre-wrap">
                    {highlightDiff(selectedMigration.schemaDiff)}
                  </pre>
                </div>
                <button
                  onClick={handleCopyToClipboard}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedToClipboard ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Timeline line */}
            <div className="absolute h-full w-0.5 bg-purple-900/50 left-0 top-0 -ml-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
