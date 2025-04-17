import React, { useState, useEffect } from 'react';
import { FileDiff, ArrowLeft, ArrowRight, Copy, CheckCircle, Clock, ChevronRight, Calendar } from 'lucide-react';

// Mock data: replace with your real fetched data
const migrations = [
  {
    id: 1,
    name: 'create_users_table',
    timestamp: '2025-04-10 14:32:21',
    status: 'success',
    schemaDiff: `+ CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);`,
    timeline: [
      { step: 'Started', time: '2025-04-10 14:30:05' },
      { step: 'Schema Analyzed', time: '2025-04-10 14:31:12' },
      { step: 'Migration Executed', time: '2025-04-10 14:32:06' },
      { step: 'Completed', time: '2025-04-10 14:32:21' },
    ],
  },
  {
    id: 2,
    name: 'add_email_to_users_table',
    timestamp: '2025-04-11 09:15:46',
    status: 'success',
    schemaDiff: `+ ALTER TABLE users ADD COLUMN email TEXT;
+ CREATE INDEX idx_users_email ON users(email);`,
    timeline: [
      { step: 'Started', time: '2025-04-11 09:12:22' },
      { step: 'Schema Updated', time: '2025-04-11 09:14:35' },
      { step: 'Index Created', time: '2025-04-11 09:15:10' },
      { step: 'Verification', time: '2025-04-11 09:15:30' },
      { step: 'Completed', time: '2025-04-11 09:15:46' },
    ],
  },
  {
    id: 3,
    name: 'drop_name_from_users_table',
    timestamp: '2025-04-12 11:24:08',
    status: 'failed',
    schemaDiff: `- ALTER TABLE users DROP COLUMN name;`,
    timeline: [
      { step: 'Started', time: '2025-04-12 11:22:40' },
      { step: 'Schema Analyzed', time: '2025-04-12 11:23:15' },
      { step: 'Migration Attempted', time: '2025-04-12 11:23:55' },
      { step: 'Error: Foreign Key Violation', time: '2025-04-12 11:24:08', status: 'error' },
    ],
  },
  {
    id: 4,
    name: 'add_role_to_users_table',
    timestamp: '2025-04-13 08:05:12',
    status: 'pending',
    schemaDiff: `+ ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';`,
    timeline: [
      { step: 'Started', time: '2025-04-13 08:04:50' },
      { step: 'Schema Analysis', time: '2025-04-13 08:05:01' },
      { step: 'Waiting for Execution', time: '2025-04-13 08:05:12', status: 'pending' },
    ],
  },
];

export default function MergedMigrationViewer() {
  const [selectedMigration, setSelectedMigration] = useState(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedItems, setAnimatedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('both'); // 'both', 'diff', 'timeline'
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Set the first migration as selected by default
    if (migrations.length > 0 && !selectedMigration) {
      setSelectedMigration(migrations[0]);
      setCurrentIndex(0);
    }
    
    // Set initial load to false after first render
    if (isInitialLoad) {
      setTimeout(() => setIsInitialLoad(false), 300);
    }
  }, []);

  useEffect(() => {
    if (copiedToClipboard) {
      const timer = setTimeout(() => setCopiedToClipboard(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedToClipboard]);

  useEffect(() => {
    if (selectedMigration) {
      setAnimatedItems([]);
      const timer = setTimeout(() => {
        const timelineLength = selectedMigration.timeline.length;
        const itemIntervals = Array.from({ length: timelineLength }, (_, i) => setTimeout(() => {
          setAnimatedItems(prev => [...prev, i]);
        }, i * 300));
        
        return () => itemIntervals.forEach(clearTimeout);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [selectedMigration]);

  const handleCopyToClipboard = () => {
    if (selectedMigration) {
      navigator.clipboard.writeText(selectedMigration.schemaDiff);
      setCopiedToClipboard(true);
    }
  };

  const navigateMigration = (direction) => {
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex < 0) {
      newIndex = migrations.length - 1;
    } else if (newIndex >= migrations.length) {
      newIndex = 0;
    }
    
    setSelectedMigration(migrations[newIndex]);
    setCurrentIndex(newIndex);
  };

  const highlightDiff = (diffText) => {
    if (!diffText) return null;
    
    const lines = diffText.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('+')) {
        return (
          <div key={index} className="text-green-400 bg-green-900 bg-opacity-20 px-1 rounded">
            {line}
          </div>
        );
      } else if (line.startsWith('-')) {
        return (
          <div key={index} className="text-red-400 bg-red-900 bg-opacity-20 px-1 rounded">
            {line}
          </div>
        );
      }
      return <div key={index}>{line}</div>;
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <span className="bg-gray-700/30 text-green-400 text-sm p-2 rounded-xl">Success</span>;
      case 'failed':
        return <span className="bg-gray-700/30 text-red-400 font-semibold text-sm p-2 rounded-xl">Failed</span>;
      case 'pending':
        return <span className="bg-gray-700/30 text-yellow-400 text-sm p-2 rounded-xl">Pending</span>;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'error':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  // Format migration name for more elegant display
  const formatMigrationName = (name) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className={`bg-gray-950 bg-opacity-60 backdrop-filter backdrop-blur-lg overflow-y-auto mx-1 p-6 rounded-xl border border-gray-800 shadow-xl font-mono transition-all duration-500 ease-in-out ${isInitialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileDiff className="text-blue-400 mr-2 h-6 w-6" />
          <h2 className="font-Krona text-white text-sm">Migration Manager</h2>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigateMigration('prev')}
            className="p-2 rounded-lg bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-gray-300 transition-colors"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button 
            onClick={() => navigateMigration('next')}
            className="p-2 rounded-lg bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-gray-300 transition-colors"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex space-x-2 mb-4 font-Montserrat">
        <button
          onClick={() => setActiveTab('both')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'both' 
              ? 'bg-fuchsia-800 bg-opacity-50 text-white border-2 border-blue-200/60 shadow-lg shadow-blue-900/20' 
              : 'bg-gray-800 bg-opacity-50 text-gray-200 hover:bg-opacity-70'
          }`}
        >
          Both Views
        </button>
        <button
          onClick={() => setActiveTab('diff')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'diff' 
              ? 'bg-fuchsia-800 bg-opacity-50 text-white border-2 border-blue-200/60 shadow-lg shadow-blue-900/20' 
              : 'bg-gray-800 bg-opacity-50 text-gray-200 hover:bg-opacity-70'
          }`}
        >
          Schema Diff
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'timeline' 
              ? 'bg-fuchsia-800 bg-opacity-50 text-white border-2 border-blue-200/60 shadow-lg shadow-blue-900/20' 
              : 'bg-gray-800 bg-opacity-50 text-gray-200 hover:bg-opacity-70'
          }`}
        >
          Timeline
        </button>
      </div>

      {/* Migration List - Horizontal Scrollable */}
      <div className="flex overflow-x-auto pb-2 mb-4 -mx-2 px-2 custom-scrollbar">
        {migrations.map((migration, index) => (
          <button
            key={migration.id}
            onClick={() => {
              setSelectedMigration(migration);
              setCurrentIndex(index);
            }}
            className={`flex-shrink-0 mr-2 my-1 px-2 py-1 rounded-xl text-sm transition-all ${
              selectedMigration?.id === migration.id
                ? 'bg-blue-600 bg-opacity-40 text-blue-200 shadow-lg shadow-blue-900/20 scale-105'
                : 'bg-gray-800 bg-opacity-50 text-gray-200 hover:bg-opacity-70 hover:scale-105 border border-transparent'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="tracking-wide py-1">{formatMigrationName(migration.name)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Migration Info */}
      {selectedMigration && (
        <div className="flex justify-between items-center my-4 px-1">
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {new Date(selectedMigration.timestamp).toLocaleDateString()} at {new Date(selectedMigration.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div>
            {getStatusBadge(selectedMigration.status)}
          </div>
        </div>
      )}

      {/* Main Content Area - Vertical Layout */}
      <div className="flex flex-col space-y-4">
        {/* Schema Diff Viewer */}
        {(activeTab === 'both' || activeTab === 'diff') && (
          <div className={`transition-all duration-500 ease-in-out ${isInitialLoad || !selectedMigration ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="flex items-center mb-2">
              <FileDiff className="text-blue-400 mr-2 size-5" />
              <h3 className="font-Montserrat font-semibold text-purple-200/90">Schema Diff</h3>
            </div>
            <div className="relative">
              <div className="h-auto overflow-auto bg-white/10 bg-opacity-70 text-gray-100 font-mono text-sm p-4 rounded-xl border border-gray-600 backdrop-filter backdrop-blur-sm">
                {selectedMigration ? (
                  <pre className="whitespace-pre-wrap">{highlightDiff(selectedMigration.schemaDiff)}</pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p>Select a migration to view diff</p>
                  </div>
                )}
              </div>
              
              {/* Copy button */}
              {selectedMigration && (
                <button
                  onClick={handleCopyToClipboard}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-gray-700 bg-opacity-70 hover:bg-opacity-100 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedToClipboard ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-white" />
                  )}
                </button>
              )}
            </div>
          </div>
        )}

                {/* Timeline Viewer */}
                {(activeTab === 'both' || activeTab === 'timeline') && (
          <div className={`transition-all duration-500 ease-in-out ${isInitialLoad || !selectedMigration ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="flex items-center mb-2">
              <Clock className="text-purple-400 mr-2 h-4 w-4" />
              <h3 className="font-Montserrat font-semibold text-purple-200/90">Timeline</h3>
            </div>
            <div className="h-auto p-4 overflow-auto bg-white/10 custom-scrollbar bg-opacity-70 rounded-xl border border-gray-700 backdrop-filter backdrop-blur-sm">
              {selectedMigration ? (
                <ul className="space-y-6 relative">
                  {selectedMigration.timeline.map((event, index) => (
                    <li 
                      key={index} 
                      className={`flex transition-all duration-500 ease-in-out ${
                        animatedItems.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                    >
                      {/* Timeline line */}
                      {index < selectedMigration.timeline.length - 1 && (
                        <div className="absolute ml-1.5 mt-3 w-0.5 h-10 bg-gray-700"></div>
                      )}
                      
                      {/* Timeline dot */}
                      <div className={`w-3 h-3 mt-1.5 rounded-full ${getStatusColor(event.status || 'default')} z-10 flex-shrink-0`}></div>
                      
                      {/* Content */}
                      <div className="ml-4 bg-gray-900 bg-opacity-40 backdrop-filter backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-md w-full hover:bg-opacity-60 transition-all duration-300">
                        <p className="font-semibold text-white">{event.step}</p>
                        <p className="text-xs text-gray-300 mt-1">{event.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <Clock className="h-10 w-10 mb-2 opacity-50" />
                  <p>Select a migration to view timeline</p>
                </div>
              )}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
} 
