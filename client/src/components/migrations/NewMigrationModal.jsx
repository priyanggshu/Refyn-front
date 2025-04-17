import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Database, AlertCircle, Loader } from "lucide-react";

const NewMigrationModal = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dbType: "postgresql",
    description: "",
    runNow: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError("Migration name is required");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // API call would go here
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Success
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to create migration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-xs p-4 m-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold font-Syne rounded-2xl transition-colors"
      >
        Start New Migration
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative bg-gray-950 w-full max-w-md mx-auto rounded-xl shadow-xl border border-gray-800/80 overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800/60">
                <h2 className="text-xl font-semibold text-white font-Syne">New Migration</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
                >
                  <X className="size-6" />
                </button>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-800/50 rounded-lg text-red-400 text-sm font-Montserrat">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                
                {/* Migration Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-gray-300 font-Montserrat">
                    Migration Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange} 
                    placeholder="e.g., add_user_roles_table"
                    className="w-full px-4 py-2 bg-black/50 border border-white/15 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-all font-mono"
                  />
                  <p className="text-xs text-gray-500 font-Montserrat">Use lowercase with underscores for naming consistency</p>
                </div>
                
                {/* Database Type */}
                <div className="space-y-2">
                  <label htmlFor="dbType" className="block text-gray-300 font-Montserrat">
                    Database Type
                  </label>
                  <div className="relative">
                    <select
                      id="dbType"
                      name="dbType"
                      value={formData.dbType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-white/15 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white appearance-none outline-none transition-all pr-10 font-Outfit"
                    >
                      <option className="bg-gray-950" value="postgresql">PostgreSQL</option>
                      <option className="bg-gray-950" value="mysql">MySQL</option>
                      <option className="bg-gray-950" value="mongodb">MongoDB</option>
                      <option className="bg-gray-950" value="oracle">Oracle</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Database className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 font-Montserrat">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description of what this migration does"
                    rows="3"
                    className="w-full px-4 py-2 bg-black/50 border border-white/15 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-500 outline-none transition-all resize-none font-Outfit"
                  />
                </div>
                
                {/* Run Now Checkbox */}
                <div className="flex items-center">
                  <input
                    id="runNow"
                    name="runNow"
                    type="checkbox"
                    checked={formData.runNow}
                    onChange={handleChange}
                    className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="runNow" className="ml-2 block text-sm text-gray-300 font-Montserrat">
                    Run migration immediately
                  </label>
                </div>
                
                {/* Form Actions */}
                <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gray-800/60 text-white hover:bg-gray-700/60 rounded-lg transition-colors text-sm font-medium font-Montserrat"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name.trim()}
                    className={`px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 font-Montserrat ${
                      !formData.name.trim() 
                        ? 'bg-blue-800/50 cursor-not-allowed' 
                        : 'bg-blue-500/80 hover:bg-blue-800/90'
                    } transition-colors`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <span>Create Migration</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewMigrationModal;