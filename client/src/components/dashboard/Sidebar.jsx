import { useState, useEffect } from 'react';
import { 
  Rocket, 
  Database, 
  Command, 
  ScrollText, 
  Layers, 
  Brain, 
  Activity,
  Search,
  X,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoverIndex, setHoverIndex] = useState(null);
  const location = useLocation();
  
  const navItems = [
    { id: 'dashboard', to: '/dash/', icon: <Command className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'migrations', to: '/dash/migrations', icon: <Rocket className="w-5 h-5" />, label: 'Migrations' },
    { id: 'schemas', to: '/dash/schemas', icon: <ScrollText className="w-5 h-5" />, label: 'Schemas' },
    { id: 'snapshots', to: '/dash/snapshots', icon: <Layers className="w-5 h-5" />, label: 'Snapshots' },
    { id: 'reports', to: '/dash/reports', icon: <Activity className="w-5 h-5" />, label: 'Reports' },
  ];

  // Light pulse animation effect for the active menu item
  useEffect(() => {
    const interval = setInterval(() => {
      const activeElement = document.querySelector('.nav-item-active');
      if (activeElement) {
        activeElement.classList.add('pulse');
        setTimeout(() => {
          if (activeElement) {
            activeElement.classList.remove('pulse');
          }
        }, 1000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <div className="relative w-20 lg:w-64 h-screen border-r border-gray-800/40 bg-gradient-to-b from-gray-900 via-black to-gray-900 backdrop-blur-lg transition-all duration-300 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-16 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Logo section */}
      <div className="relative p-4 flex items-center justify-center lg:justify-start mb-8">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
          <Database className="w-6 h-6 text-white" />
        </div>
        <div className="hidden lg:block relative ml-3">
          <h1 className="text-xl font-Krona text-white tracking-tight">Refyn</h1>
          <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-transparent"></div>
        </div>
      </div>
      
      {/* Search bar */}
      <div className={`relative px-3 mb-6 transition-all duration-300 ${searchActive ? 'opacity-100' : 'opacity-80'}`}>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-4 w-4 transition-all duration-300 ${searchActive ? 'text-indigo-400' : 'text-gray-500'}`} />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800/30 border border-gray-700/50 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/70 focus:border-indigo-500/70 transition-all duration-300 font-Outfit backdrop-blur-sm"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setSearchActive(false)}
          />
          {searchQuery && (
            <button 
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-200"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="relative space-y-1 px-2">
        {navItems.map((item, index) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center justify-center lg:justify-start w-full p-3 rounded-xl transition-all duration-300 group relative ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-400 font-medium nav-item-active' 
                  : 'text-gray-400 hover:bg-gray-800/40 hover:text-gray-200'
              }`
            }
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Indicator and active effects */}
            {({ isActive }) => (
              <>
                {isActive && (
                  <>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500/50"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </>
                )}
                
                {/* Icon container with animation */}
                <div className="flex items-center justify-center w-8 h-8 relative transition-transform">
                  <div className={`absolute inset-0 rounded-full ${hoverIndex === index ? 'bg-indigo-500/10' : ''} transition-all duration-300`}></div>
                  <div className={`relative transition-all duration-300 ${hoverIndex === index || isActive ? 'scale-110' : 'scale-100'}`}>
                    {item.icon}
                  </div>
                </div>
                
                {/* Label with animation */}
                <span className={`hidden lg:block ml-3 font-Outfit transition-all duration-300 ${isActive ? 'translate-x-1' : ''}`}>
                  {item.label}
                </span>
                
                {/* Hover indicator */}
                {hoverIndex === index && !isActive && (
                  <span className="hidden lg:flex absolute right-3 opacity-70">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-60">
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
          <span className="mx-2 text-xs text-gray-500 font-Krona tracking-widest">進化</span>
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
        </div>
      </div>
      
      {/* Add global CSS for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.2); }
          70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        
        .pulse {
          animation: pulse 1.5s ease-out;
        }
        
        .nav-item-active::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 0.75rem;
          padding: 1px;
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}