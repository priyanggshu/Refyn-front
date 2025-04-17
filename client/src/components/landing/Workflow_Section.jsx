import React from "react";
import { motion } from "framer-motion";
import { Github, Database, Brain, ArrowRight, Check, RefreshCw, RotateCcw, LogIn } from "lucide-react";

const WorkflowSection = () => {
  const steps = [
    {
      icon: <LogIn className="w-6 h-6" />,
      title: "Sign in",
      description: "Connect with Google or GitHub for secure authentication",
      delay: 0.1,
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Connect Databases",
      description: "Link your source and destination databases securely",
      delay: 0.2,
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Schema Refactoring",
      description: "Our AI automatically converts and optimizes your schema",
      delay: 0.3,
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Review Changes",
      description: "Verify and approve the proposed schema changes",
      delay: 0.4,
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Live Migration",
      description: "Watch your data migrate in real-time batches",
      delay: 0.5,
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "AI-Powered Fixes",
      description: "Automatic detection and resolution of migration issues",
      delay: 0.6,
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Easy Rollback",
      description: "One-click rollback to your previous database state",
      delay: 0.7,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#14141f]/50 to-black/5 relative overflow-hidden">
      {/* Flowing background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#716aeb]/5 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#9a90da]/5 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[#9a90da] font-semibold font-Outfit mb-4 inline-block bg-[#9a90da]/5 px-4 py-1.5 rounded-full border border-[#9a90da]/20"
          >
            Simple & Powerful
          </motion.p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-Syne">
            <span className="bg-gradient-to-r from-[#9a90da] to-[#716aeb] text-transparent bg-clip-text">
              Step-by-Step
            </span>{" "}
            Workflow
          </h2>
          <p className="text-[#D1D1D2] text-lg max-w-2xl mx-auto font-Montserrat">
            Our streamlined process makes database migration simple, fast, and reliable
          </p>
        </motion.div>

        {/* Workflow flowing diagram */}
        <div className="relative">
          {/* Flowing connection line */}
          <div className="hidden md:block absolute z-0 top-1/2 left-0 w-full h-16 -translate-y-1/2">
            <svg className="w-full h-full" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
              <motion.path 
                d="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,80 900,50 C1000,20 1100,80 1200,50" 
                stroke="url(#flowLineGradient)" 
                strokeWidth="2" 
                strokeDasharray="1200"
                strokeDashoffset="1200"
                fill="transparent"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              
              {/* Animated dots along the path */}
              {[...Array(7)].map((_, i) => (
                <motion.circle 
                  key={i} 
                  r="4" 
                  fill="#9a90da" 
                  opacity="0.7"
                  animate={{
                    offsetDistance: ["0%", "100%"],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 1.2,
                  }}
                  style={{ offsetPath: "path('M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,80 900,50 C1000,20 1100,80 1200,50')" }}
                />
              ))}
              
              <defs>
                <linearGradient id="flowLineGradient" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9a90da" stopOpacity="0.4" />
                  <stop offset="0.5" stopColor="#716aeb" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#9a90da" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Responsive grid for steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-y-12 md:gap-x-4 relative z-10">
            {steps.map((step, index) => (
              <WorkflowStep 
                key={index}
                step={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                delay={step.delay}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
        
        {/* Sign in options detail - For first step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-col items-center"
        >
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-5 max-w-md">
            <h3 className="text-white text-lg font-semibold mb-4 font-Outfit">Authentication Options</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="flex-1 bg-gradient-to-r from-[#2a2a3d]/60 to-[#1a1a2d]/60 p-4 rounded-lg border border-white/5 flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Github className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium font-Outfit">GitHub</p>
                  <p className="text-[#D1D1D2]/60 text-xs font-Montserrat">Connect with GitHub</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="flex-1 bg-gradient-to-r from-[#2a2a3d]/60 to-[#1a1a2d]/60 p-4 rounded-lg border border-white/5 flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                    <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
                    <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium font-Outfit">Google</p>
                  <p className="text-[#D1D1D2]/60 text-xs font-Montserrat">Connect with Google</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const WorkflowStep = ({ step, icon, title, description, delay, isFirst }) => {
  // Create wave effect for positioning
  const getPositionStyle = (index) => {
    // Only apply wave positioning on medium screens and above
    const baseStyle = {};
    
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      // Alternating up and down for wave effect
      baseStyle.transform = index % 2 === 0 ? 'translateY(-15px)' : 'translateY(15px)';
    }
    
    return baseStyle;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col items-center text-center"
      style={getPositionStyle(step - 1)}
    >
      {/* Animated connection indicator (mobile only) */}
      {step > 1 && (
        <div className="md:hidden absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-px bg-gradient-to-b from-transparent to-[#9a90da]/30">
          <motion.div 
            className="absolute top-0 left-0 w-full h-0 bg-gradient-to-b from-transparent to-[#9a90da]"
            animate={{ height: '100%' }}
            transition={{ duration: 0.5, delay }}
          />
        </div>
      )}
      
      {/* Step number */}
      <div className="absolute -top-3 -left-3 w-7 h-7 bg-[#716aeb] rounded-full flex items-center justify-center text-white text-xs font-bold font-Montserrat z-10">
        {step}
      </div>
      
      {/* Icon container with animated glow on hover */}
      <motion.div 
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 20px rgba(154, 144, 218, 0.3)"
        }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2a2a3d]/90 to-[#1a1a2d]/90 
                   border border-white/10 flex items-center justify-center mb-4 shadow-lg relative z-10"
      >
        <div className="text-[#9a90da]">{icon}</div>
        
        {/* Subtle pulse animation */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-[#9a90da]/5"
          animate={{ 
            opacity: [0, 0.2, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Title and description */}
      <h3 className="text-white text-lg font-semibold mb-2 font-Outfit">{title}</h3>
      <p className="text-[#D1D1D2]/80 text-sm font-Montserrat max-w-[200px] mx-auto">{description}</p>
      
      {/* Special indicator for first (authentication) step */}
      {isFirst && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
          className="mt-3 flex space-x-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#9a90da]"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#716aeb]"></span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WorkflowSection;