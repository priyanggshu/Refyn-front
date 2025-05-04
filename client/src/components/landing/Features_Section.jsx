import React, { useState } from "react";
import { motion } from "framer-motion";
import { Repeat, Activity, Radio, Archive, Mail, Sparkles } from "lucide-react";

const FeaturesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Feature cards data
  const features = [
    {
      icon: <Sparkles size={24} />,
      title: "AI Schema Fixes",
      description:
        "Auto-healing database schema with ML-powered error detection. Review and approve AI suggestions with one click.",
      color: "#9a90da",
      gradient: "from-[#9a90da]/20 to-[#8370d8]/20",
      lightGradient: "from-[#9a90da]/10 to-[#8370d8]/10",
    },
    {
      icon: <Repeat size={24} />,
      title: "Cross-DB Migration",
      description:
        "Seamlessly convert between PostgreSQL, MySQL, and MongoDB schemas with automatic type mapping and data transformation.",
      color: "#8a80d0",
      gradient: "from-[#8a80d0]/20 to-[#7361c8]/20",
      lightGradient: "from-[#8a80d0]/10 to-[#7361c8]/10",
    },
    {
      icon: <Activity size={24} />,
      title: "Real-Time Logs",
      description:
        "Detailed operation logs with timestamps, error highlighting, and searchable history for comprehensive migration tracking.",
      color: "#7a70c6",
      gradient: "from-[#7a70c6]/20 to-[#6352b9]/20",
      lightGradient: "from-[#7a70c6]/10 to-[#6352b9]/10",
    },
    {
      icon: <Radio size={24} />,
      title: "WebSocket Streaming",
      description:
        "Live progress updates with millisecond precision. Monitor your data flow in real-time with visual batch processing indicators.",
      color: "#6a60bc",
      gradient: "from-[#6a60bc]/20 to-[#5342a9]/20",
      lightGradient: "from-[#6a60bc]/10 to-[#5342a9]/10",
    },
    {
      icon: <Archive size={24} />,
      title: "Rollback Snapshots",
      description:
        "One-click rollbacks with versioned database snapshots. Restore to any point in your migration history with confidence.",
      color: "#5a50b2",
      gradient: "from-[#5a50b2]/20 to-[#4333a0]/20",
      lightGradient: "from-[#5a50b2]/10 to-[#4333a0]/10",
    },
    {
      icon: <Mail size={24} />,
      title: "Email Summaries",
      description:
        "Comprehensive migration reports with performance metrics, error analysis, and actionable insights delivered to your inbox.",
      color: "#4a40a8",
      gradient: "from-[#4a40a8]/20 to-[#332396]/20",
      lightGradient: "from-[#4a40a8]/10 to-[#332396]/10",
    },
  ];

  // variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 px-6 md:px-8 lg:px-12 max-w-7xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#544f75]/5 to-[#716aeb]/5 rounded-3xl filter blur-3xl opacity-30"></div>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-block mb-3"
        >
          <p className="text-[#9a90da] font-semibold font-Outfit bg-[#9a90da]/5 px-4 py-1.5 rounded-full border border-[#9a90da]/20">
            <span className="animate-pulse pr-1">✨</span> Features That Matter{" "}
            <span className="animate-pulse pl-1">✨</span>
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-Syne text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          Not a list.{" "}
          <span className="bg-gradient-to-r from-[#9a90da] to-[#716aeb] text-transparent bg-clip-text">
            A vibe.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-[#D1D1D2] max-w-2xl mx-auto text-lg font-Outfit"
        >
          Everything you need for flawless database migrations, wrapped in a
          sleek, intuitive interface.
        </motion.p>
      </div>

      {/* Feature Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative h-full"
          >
            {/* Card background with animated gradient */}
            <div
              className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                hoveredCard === index ? "opacity-100" : "opacity-0"
              } bg-gradient-to-br ${feature.gradient}`}
            ></div>

            {/* Card content */}
            <div
              className={`relative h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-300 ${
                hoveredCard === index
                  ? "shadow-lg shadow-[#9a90da]/10 border-white/20"
                  : ""
              }`}
            >
              {/* Feature icon */}
              <div className="relative mb-5 inline-block">
                <div
                  className={`absolute -inset-3 rounded-full bg-gradient-to-r ${feature.lightGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="w-12 h-12 rounded-full bg-[#2a2a3d] flex items-center justify-center relative z-10">
                  <motion.div
                    style={{ color: feature.color }}
                    animate={
                      hoveredCard === index
                        ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, -5, 5, -5, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>
              </div>

              {/* Feature title */}
              <h3 className="text-white text-xl font-bold mb-3 font-Outfit transition-colors duration-300">
                <span
                  className={`relative inline-block ${
                    hoveredCard === index ? "text-[#9a90da]" : ""
                  }`}
                >
                  {feature.title}
                  {hoveredCard === index && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#9a90da]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </span>
              </h3>

              {/* Feature description */}
              <p className="text-[#D1D1D2] font-Outfit mb-4">
                {feature.description}
              </p>

              {/* Card decorative elements */}
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5">
                <motion.div
                  className="absolute bottom-0 right-0 w-full h-full"
                  style={{
                    backgroundImage: `radial-gradient(circle at bottom right, ${feature.color}, transparent 70%)`,
                  }}
                  animate={
                    hoveredCard === index
                      ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.05, 0.1, 0.05],
                        }
                      : {}
                  }
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>
              </div>
            </div>

            {/* Animated hover effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={
                hoveredCard === index
                  ? {
                      boxShadow: [
                        `0 0 0 0 ${feature.color}00`,
                        `0 0 20px 0 ${feature.color}30`,
                        `0 0 0 0 ${feature.color}00`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating elements for visual interest */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#9a90da]"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </section>
  );
};

export default FeaturesSection;
