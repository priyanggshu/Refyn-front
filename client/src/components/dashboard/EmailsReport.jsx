import { useState } from "react";
import { Mail, Calendar, Users, ChevronRight, Search, Star, Filter, Paperclip, ExternalLink, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmailReports({ theme, emails = mockEmails }) {
  const isDark = theme === "dark";
  
  // Enhanced color palette that responds to theme
  const primaryColor = isDark ? "#818CF8" : "#6366F1"; // Indigo
  const primaryColorLight = isDark ? "rgba(129, 140, 248, 0.15)" : "rgba(99, 102, 241, 0.1)";
  const primaryBorder = isDark ? "rgba(129, 140, 248, 0.2)" : "rgba(99, 102, 241, 0.2)";
  const starColor = "#F59E0B"; // Amber
  
  const [isHovering, setIsHovering] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredEmails = emails.filter(email => 
    searchQuery ? email.subject.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-${isDark ? 'gray-800/40' : 'white/80'} backdrop-blur-md mt-4 rounded-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-500/30'} mx-4 md:mx-8 mb-8 shadow-lg overflow-hidden transition-all duration-300`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Header section */}
      <div className={`relative px-4 sm:px-6 pt-5 pb-4 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div 
              className="flex items-center justify-center p-2 rounded-lg"
              style={{
                background: isDark 
                  ? "linear-gradient(135deg, rgba(129, 140, 248, 0.2), rgba(129, 140, 248, 0.05))"
                  : "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05))",
                border: `1px solid ${primaryBorder}`
              }}
            >
              <Mail className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
            <h2 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'} tracking-tight`}>Email Reports</h2>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterActive(!filterActive)}
              className="flex items-center justify-center p-2 rounded-full transition-colors"
              style={{
                background: filterActive ? primaryColorLight : isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                border: `1px solid ${filterActive ? primaryBorder : isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)"}`
              }}
            >
              <Filter size={16} style={{ color: filterActive ? primaryColor : isDark ? "#9CA3AF" : "#6B7280" }} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchActive(!searchActive)}
              className="flex items-center justify-center p-2 rounded-full transition-colors"
              style={{
                background: searchActive ? primaryColorLight : isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                border: `1px solid ${searchActive ? primaryBorder : isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)"}`
              }}
            >
              <Search size={16} style={{ color: searchActive ? primaryColor : isDark ? "#9CA3AF" : "#6B7280" }} />
            </motion.button>
          </div>
        </div>
        
        {/* Search input that appears when search is active */}
        <AnimatePresence>
          {searchActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 38, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <div className={`flex items-center px-3 h-10 rounded-lg border ${
                isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100/80 border-gray-200'
              }`}>
                <Search size={14} className={isDark ? "text-gray-400" : "text-gray-500"} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reports..." 
                  className={`ml-2 bg-transparent text-sm ${
                    isDark ? 'text-gray-200 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
                  } border-0 focus:outline-none focus:ring-0 w-full`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Email list */}
      <div className="relative max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email, index) => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedEmail(email.id === selectedEmail ? null : email.id)}
                className={`group relative px-4 sm:px-6 py-4 border-b cursor-pointer ${
                  isDark ? 'border-gray-700/50' : 'border-gray-200/50'
                } ${
                  selectedEmail === email.id ? 
                    (isDark ? 'bg-gray-800/70' : 'bg-gray-100/70') : 
                    'hover:bg-gray-500/5'
                }`}
              >
                {/* Hover indicator */}
                <motion.div 
                  className="absolute left-0 top-0 h-full w-0.5 origin-left"
                  style={{ background: primaryColor }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: selectedEmail === email.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start sm:items-center">
                      <div className="mr-3 flex-shrink-0 pt-1 sm:pt-0">
                        <Star 
                          size={16} 
                          className={index === 0 ? "text-amber-400 fill-amber-400" : `${isDark ? "text-gray-500" : "text-gray-400"} group-hover:text-gray-400`} 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-base font-medium truncate ${
                          isDark ? 'text-gray-200 group-hover:text-indigo-200' : 'text-gray-700 group-hover:text-indigo-600'
                        } transition-colors`}>
                          {email.subject}
                        </h3>
                        <div className="flex flex-wrap items-center mt-1 text-sm text-gray-400 gap-y-1">
                          <div className="flex items-center mr-4">
                            <Calendar size={12} className="mr-1.5 text-gray-500" />
                            <span>{email.sent}</span>
                          </div>
                          <div className="flex items-center">
                            <Users size={12} className="mr-1.5 text-gray-500" />
                            <span>{email.recipients} recipients</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedEmail === email.id || isHovering ? 1 : 0 }}
                    className="flex items-center ml-2 sm:ml-4"
                  >
                    <div 
                      className="p-1 rounded-full"
                      style={{
                        background: primaryColorLight,
                        border: `1px solid ${primaryBorder}`
                      }}
                    >
                      <ChevronRight size={14} style={{ color: primaryColor }} />
                    </div>
                  </motion.div>
                </div>
                
                {/* Expanded content when selected */}
                <AnimatePresence>
                  {selectedEmail === email.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pl-0 sm:pl-8 text-sm">
                        <div className={`p-4 rounded ${
                          isDark ? 'bg-gray-900/50' : 'bg-gray-100/70'
                        }`}>
                          <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            <p className="mb-3">{email.greeting}</p>
                            <p className="mb-3">{email.body}</p>
                            <p>{email.closing}</p>
                            
                            {email.attachments && email.attachments.length > 0 && (
                              <div className={`mt-4 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Attachments ({email.attachments.length})
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {email.attachments.map((attachment, i) => (
                                    <div 
                                      key={i}
                                      className={`flex items-center p-2 rounded ${
                                        isDark ? 'bg-gray-800' : 'bg-white'
                                      } border ${
                                        isDark ? 'border-gray-700' : 'border-gray-200'
                                      }`}
                                    >
                                      <Paperclip size={12} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                                      <span className="ml-2 text-xs">{attachment}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2 mt-3">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-3 py-1.5 rounded-md text-xs font-medium flex items-center"
                            style={{
                              background: isDark ? "rgba(75, 85, 99, 0.3)" : "rgba(229, 231, 235, 0.7)",
                              border: isDark ? "1px solid rgba(75, 85, 99, 0.4)" : "1px solid rgba(209, 213, 219, 0.8)"
                            }}
                          >
                            <Eye size={12} className="mr-1" />
                            <span className={isDark ? "text-gray-300" : "text-gray-600"}>Preview</span>
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-3 py-1.5 rounded-md text-xs font-medium flex items-center"
                            style={{
                              background: primaryColorLight,
                              border: `1px solid ${primaryBorder}`
                            }}
                          >
                            <ExternalLink size={12} className="mr-1" />
                            <span style={{ color: isDark ? "#A5B4FC" : "#4F46E5" }}>View Full Report</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`py-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              No results found for "{searchQuery}"
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer action */}
      <motion.div
        whileHover={{ y: -1 }}
        className="relative px-4 sm:px-6 py-4"
      >
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: isDark 
              ? "linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(129, 140, 248, 0.05))"
              : "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05))",
            border: `1px solid ${primaryBorder}`,
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
          }}
        >
          <span style={{ color: isDark ? "#A5B4FC" : "#4F46E5" }}>Browse All Reports</span>
        </motion.button>
      </motion.div>
      
      {/* Bottom border gradient */}
      <div
        className="h-1 w-full"
        style={{ 
          background: `linear-gradient(to right, ${primaryColor}, ${isDark ? "#4F46E5" : "#4338CA"})`,
          boxShadow: `0 0 10px ${primaryColor}30`,
        }}
      ></div>
    </motion.section>
  );
}

const mockEmails = [
  {
    id: 1,
    subject: "Weekly Database Performance Report",
    sent: "2 days ago",
    recipients: 8,
    greeting: "Hello Database Admin Team,",
    body: "I'm pleased to share our weekly performance metrics. This week we've seen a 12% improvement in query response times across all main databases. The optimization work on our indexing strategy is paying off, with the most significant gains in our user authentication flows.",
    closing: "Please review the attached report for detailed metrics and let me know if you have any questions.",
    attachments: ["DB_Performance_Apr27.pdf", "Query_Metrics_Chart.xlsx"]
  },
  {
    id: 2,
    subject: "April Migration Summary",
    sent: "1 week ago",
    recipients: 12,
    greeting: "Dear Migration Team,",
    body: "Here's the summary of our April database migrations. We completed 86 successful migrations with only 9 failures (a 90.5% success rate). Most failures were related to schema conflicts in the Product Catalog that have since been resolved. Our average migration time is now down to 3.2 minutes, a 15% improvement from March.",
    closing: "The full report has been uploaded to the shared drive. Thank you all for your continued efforts.",
    attachments: ["April_Migration_Report.pdf"]
  },
  {
    id: 3,
    subject: "Schema Change Notifications",
    sent: "2 weeks ago",
    recipients: 5,
    greeting: "Development Team,",
    body: "This notification is to inform you of the recent schema changes that were implemented last Friday. We've added three new fields to the customer profile table and updated the foreign key relationships between orders and shipments. These changes are part of our ongoing effort to support the new logistics module launching next month.",
    closing: "Please update your local development environments accordingly. The full change log is attached.",
    attachments: ["Schema_Changes_April.pdf", "ERD_Updated.png"]
  }
];