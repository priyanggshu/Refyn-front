import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, Ban, Eye, RotateCcw, Plus, Filter, ChevronDown, Archive, X, Search, AlertTriangle } from 'lucide-react';

// Sample data for snapshots
const initialSnapshots = [
  {
    id: 'snap_001',
    migrationName: 'Add Orders Table',
    createdAt: 'Apr 12, 2025 10:20',
    schemaVersion: 'v2.3.0',
    status: 'Healthy',
    tables: ['users', 'orders', 'products', 'categories'],
    size: '1.2 MB',
    description: 'Added orders table with foreign keys to users and products'
  },
  {
    id: 'snap_002',
    migrationName: 'Init Migration',
    createdAt: 'Apr 10, 2025 12:03',
    schemaVersion: 'v2.2.8',
    status: 'Deprecated',
    tables: ['users', 'products', 'categories'],
    size: '0.9 MB',
    description: 'Initial schema setup with core tables'
  },
  {
    id: 'snap_003',
    migrationName: 'Add User Preferences',
    createdAt: 'Apr 8, 2025 15:45',
    schemaVersion: 'v2.2.5',
    status: 'Healthy',
    tables: ['users', 'products', 'categories', 'preferences'],
    size: '1.0 MB',
    description: 'Added user preferences table with JSON storage capabilities'
  },
  {
    id: 'snap_004',
    migrationName: 'Product Schema Update',
    createdAt: 'Apr 5, 2025 09:15',
    schemaVersion: 'v2.2.0',
    status: 'Archived',
    tables: ['users', 'products', 'categories'],
    size: '0.8 MB',
    description: 'Updated product schema with inventory tracking fields'
  }
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Healthy':
      return 'bg-green-100 text-green-700 border border-green-300';
    case 'Deprecated':
      return 'bg-red-100 text-red-700 border border-red-300';
    case 'Archived':
      return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-300';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Healthy':
      return <BadgeCheck className="inline h-4 w-4 mr-1" />;
    case 'Deprecated':
      return <Ban className="inline h-4 w-4 mr-1" />;
    case 'Archived':
      return <Archive className="inline h-4 w-4 mr-1" />;
    default:
      return null;
  }
};

const SnapshotPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [filteredSnapshots, setFilteredSnapshots] = useState(initialSnapshots);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);
  const [newSnapshotName, setNewSnapshotName] = useState('');

  // Toggle card expansion
  const toggleCard = (id, e) => {
    // Prevent expanding when clicking buttons
    if (e.target.closest('button')) return;
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Handle view button click
  const handleViewSnapshot = (snapshot, e) => {
    e.stopPropagation();
    setSelectedSnapshot(snapshot);
    setViewModalOpen(true);
  };

  // Handle restore button click
  const handleRestoreSnapshot = (snapshot, e) => {
    e.stopPropagation();
    setSelectedSnapshot(snapshot);
    setRestoreModalOpen(true);
  };

  // Handle actual restore operation
  const confirmRestore = () => {
    // Mock the restore operation
    setTimeout(() => {
      // Update all other snapshots to be non-active
      const updatedSnapshots = snapshots.map(snap => ({
        ...snap,
        status: snap.id === selectedSnapshot.id ? 'Healthy' : snap.status === 'Healthy' ? 'Archived' : snap.status
      }));
      
      setSnapshots(updatedSnapshots);
      setFilteredSnapshots(applyFilters(updatedSnapshots, statusFilter, searchTerm));
      setRestoreModalOpen(false);
      
      // Show success feedback (would be toast notification in real app)
      alert(`Successfully restored to snapshot: ${selectedSnapshot.migrationName}`);
    }, 1000);
  };

  // Create new snapshot
  const handleCreateSnapshot = () => {
    if (!newSnapshotName.trim()) {
      alert('Please enter a snapshot name');
      return;
    }

    const newSnapshot = {
      id: `snap_${(snapshots.length + 1).toString().padStart(3, '0')}`,
      migrationName: newSnapshotName,
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      schemaVersion: `v2.3.${snapshots.length + 1}`,
      status: 'Healthy',
      tables: ['users', 'products', 'orders', 'categories'],
      size: '1.3 MB',
      description: 'Newly created snapshot'
    };

    const updatedSnapshots = [newSnapshot, ...snapshots];
    setSnapshots(updatedSnapshots);
    setFilteredSnapshots(applyFilters(updatedSnapshots, statusFilter, searchTerm));
    setIsCreatingSnapshot(false);
    setNewSnapshotName('');
  };

  // Apply filters to snapshots
  const applyFilters = (snaps, status, term) => {
    return snaps.filter(snap => {
      const matchesStatus = status === 'All' || snap.status === status;
      const matchesTerm = term === '' || 
        snap.migrationName.toLowerCase().includes(term.toLowerCase()) ||
        snap.description.toLowerCase().includes(term.toLowerCase());
      return matchesStatus && matchesTerm;
    });
  };

  // Handle filter changes
  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setFilteredSnapshots(applyFilters(snapshots, status, searchTerm));
    setFilterOpen(false);
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredSnapshots(applyFilters(snapshots, statusFilter, term));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 px-8 py-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 tracking-tight text-white font-Krona">Rollback Snapshots</h1>
          <p className="text-gray-400 text-sm font-Montserrat">Safely view and restore any past schema state</p>
        </motion.div>

        <div className="flex justify-between items-center mb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2"
          >
            <motion.button 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg font-Outfit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreatingSnapshot(true)}
            >
              <Plus className="h-4 w-4" /> New Snapshot
            </motion.button>
            <div className="relative">
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all duration-300 font-Outfit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4" /> {statusFilter}
              </motion.button>
              
              {filterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 w-48 py-2"
                >
                  {['All', 'Healthy', 'Deprecated', 'Archived'].map(status => (
                    <button 
                      key={status}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${statusFilter === status ? 'bg-gray-700' : ''} font-Montserrat`}
                      onClick={() => handleFilterChange(status)}
                    >
                      {status}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            
            <div className="relative ml-2">
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search snapshots..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm font-Montserrat focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64 transition-all"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-400 font-Outfit"
          >
            {filteredSnapshots.length} snapshots available
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-auto pb-10"
        >
          <AnimatePresence>
            {filteredSnapshots.map((snap, index) => (
              <motion.div
                key={snap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={() => setHoveredCard(snap.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={(e) => toggleCard(snap.id, e)}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1 font-Syne">{snap.migrationName}</h2>
                    <p className="text-sm text-gray-400 font-Montserrat">Created: {snap.createdAt}</p>
                    <p className="text-sm text-gray-300 mt-1 font-Outfit">
                      Version: <span className="font-mono text-indigo-400">{snap.schemaVersion}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <motion.span 
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(snap.status)} font-Outfit`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getStatusIcon(snap.status)}
                      {snap.status}
                    </motion.span>
                    
                    <motion.div 
                      className="flex gap-2 mt-2"
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: hoveredCard === snap.id || expandedCard === snap.id ? 1 : 0.8 }}
                    >
                      <motion.button 
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all duration-300 font-Montserrat"
                        whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => handleViewSnapshot(snap, e)}
                      >
                        <Eye className="h-4 w-4" /> View
                      </motion.button>
                      <motion.button 
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-all duration-300 shadow-md font-Montserrat"
                        whileHover={{ scale: 1.05, backgroundColor: "#4F46E5" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => handleRestoreSnapshot(snap, e)}
                        disabled={snap.status === 'Healthy'}
                      >
                        <RotateCcw className="h-4 w-4" /> Restore
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedCard === snap.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mt-6 pt-4 border-t border-gray-700"
                    >
                      <div className="mb-4">
                        <p className="text-xs text-gray-400 mb-1 font-Outfit">Description</p>
                        <p className="text-sm text-gray-300 font-Montserrat">{snap.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-1 font-Outfit">Tables Affected</p>
                          <div className="flex flex-wrap gap-2">
                            {snap.tables.map(table => (
                              <span key={table} className="text-xs bg-gray-800 px-2 py-1 rounded-md text-gray-300 font-Montserrat">
                                {table}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1 font-Outfit">Snapshot Size</p>
                          <p className="text-sm text-gray-300 font-Montserrat">{snap.size}</p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <motion.button 
                          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-300 font-Montserrat"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => handleViewSnapshot(snap, e)}
                        >
                          View Full Details
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Restore Confirmation Modal */}
      <AnimatePresence>
        {restoreModalOpen && selectedSnapshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setRestoreModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white font-Syne">Confirm Restore</h3>
                <button 
                  onClick={() => setRestoreModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center text-amber-400 bg-amber-900 bg-opacity-20 p-3 rounded-lg mb-4">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <p className="text-sm font-Montserrat">This action will overwrite your current database schema.</p>
                </div>
                
                <p className="text-gray-300 mb-4 font-Outfit">
                  Are you sure you want to restore to snapshot <span className="font-semibold text-white">{selectedSnapshot.migrationName}</span>?
                </p>
                
                <div className="text-sm text-gray-400 border border-gray-700 rounded-lg p-3 bg-gray-850 font-Montserrat">
                  <p className="mb-1"><span className="text-gray-300">Version:</span> {selectedSnapshot.schemaVersion}</p>
                  <p className="mb-1"><span className="text-gray-300">Created:</span> {selectedSnapshot.createdAt}</p>
                  <p><span className="text-gray-300">Status:</span> {selectedSnapshot.status}</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors font-Outfit"
                  onClick={() => setRestoreModalOpen(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors font-Outfit"
                  onClick={confirmRestore}
                >
                  Restore Database
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Snapshot Modal */}
      <AnimatePresence>
        {viewModalOpen && selectedSnapshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setViewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-Syne">{selectedSnapshot.migrationName}</h3>
                  <p className="text-gray-400 text-sm font-Montserrat">Snapshot Details</p>
                </div>
                <button 
                  onClick={() => setViewModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1 font-Outfit">Version</p>
                  <p className="text-lg font-mono text-indigo-400 font-Montserrat">{selectedSnapshot.schemaVersion}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1 font-Outfit">Created</p>
                  <p className="text-lg text-white font-Montserrat">{selectedSnapshot.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1 font-Outfit">Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusStyle(selectedSnapshot.status)} font-Montserrat`}>
                    {getStatusIcon(selectedSnapshot.status)}
                    {selectedSnapshot.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1 font-Outfit">Size</p>
                  <p className="text-lg text-white font-Montserrat">{selectedSnapshot.size}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2 font-Outfit">Description</p>
                <p className="text-gray-300 bg-gray-850 p-4 rounded-lg border border-gray-700 font-Montserrat">
                  {selectedSnapshot.description}
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2 font-Outfit">Tables</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedSnapshot.tables.map(table => (
                    <div key={table} className="bg-gray-850 border border-gray-700 rounded-lg p-3 font-Montserrat">
                      {table}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                {selectedSnapshot.status !== 'Healthy' && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors mr-3 font-Outfit"
                    onClick={() => {
                      setViewModalOpen(false);
                      setRestoreModalOpen(true);
                    }}
                  >
                    <RotateCcw className="h-4 w-4" /> Restore This Snapshot
                  </motion.button>
                )}
                <button
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors font-Outfit"
                  onClick={() => setViewModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create New Snapshot Modal */}
      <AnimatePresence>
        {isCreatingSnapshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsCreatingSnapshot(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white font-Syne">Create New Snapshot</h3>
                <button 
                  onClick={() => setIsCreatingSnapshot(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2 font-Outfit">
                  Snapshot Name
                </label>
                <input
                  type="text"
                  value={newSnapshotName}
                  onChange={(e) => setNewSnapshotName(e.target.value)}
                  placeholder="Enter a descriptive name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-Montserrat"
                />
                <p className="text-xs text-gray-400 mt-2 font-Montserrat">
                  This snapshot will capture the current state of your database schema
                </p>
              </div>
              
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors font-Outfit"
                  onClick={() => setIsCreatingSnapshot(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors font-Outfit"
                  onClick={handleCreateSnapshot}
                >
                  Create Snapshot
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SnapshotPage;