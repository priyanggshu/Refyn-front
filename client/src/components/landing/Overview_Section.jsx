import { motion } from "framer-motion";
import { Database, Brain, Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { OAuthButton } from "../Reusables";

const OverviewSection = ({ isLoading, authError, login }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 pt-12 lg:pt-20 pb-16 flex flex-col lg:flex-row items-center justify-between">
      {/* Left area */}
      <div className="w-full lg:w-1/2 space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-block">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-[#9a90da] font-semibold font-Outfit bg-[#9a90da]/5 px-4 py-1.5 rounded-full border border-[#9a90da]/20"
            >
              <span className="animate-pulse pr-1">✨</span> Your Data. Refyned.{" "}
              <span className="animate-pulse pl-1">✨</span>
            </motion.p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-Syne">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block"
            >
              AI-powered database
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="block bg-gradient-to-r from-[#9a90da] to-[#716aeb] text-transparent bg-clip-text"
            >
              migration in minutes.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#D1D1D2] text-lg mt-8 max-w-lg font-Montserrat"
          >
            Refyn helps you migrate, fix, and roll back your databases — with
            zero guesswork.
          </motion.p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <OAuthButton
            provider="google"
            label={isLoading ? "Loading..." : "Login with Google"}
            icon={FcGoogle}
            delay={0.6}
            login={login}
          />
          <OAuthButton
            provider="github"
            label={isLoading ? "Loading..." : "Login with Github"}
            icon={Github}
            delay={0.7}
            login={login}
          />

          {authError && (
            <p className="text-red-500 mt-4 font-medium">{authError}</p>
          )}
        </div>

        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-red-500 font-semibold"
          >
            {authError}
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-between md:justify-start gap-8 md:gap-16 mt-12 pt-6 border-t border-white/10"
        >
          <div>
            <p className="text-[#9a90da] font-Montserrat font-semibold">100%</p>
            <p className="text-white/60 text-sm font-Outfit">
              Migration Success
            </p>
          </div>
          <div>
            <p className="text-[#9a90da] font-Montserrat font-semibold">10x</p>
            <p className="text-white/60 text-sm font-Outfit">
              Faster Migrations
            </p>
          </div>
          <div>
            <p className="text-[#9a90da] font-Montserrat font-semibold">Easy</p>
            <p className="text-white/60 text-sm font-Outfit">Rollback</p>
          </div>
        </motion.div>
      </div>

      {/* Right area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full lg:w-1/2 mt-16 lg:mt-0 relative"
      >
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#544f75]/20 to-[#716aeb]/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>

        <div className="relative h-80 sm:h-80 md:h-96 mx-auto">
          {/* Database migration animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96">
              {/* Source database */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#2a2a3d] to-[#1a1a2d] p-4 rounded-2xl border border-white/10 shadow-2xl z-10"
                animate={{ x: [0, -20, 0], y: [0, 0, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                <div className="flex items-center space-x-2 mb-3">
                  <Database className="text-[#9a90da]" />
                  <p className="text-white text-sm font-medium font-Montserrat">
                    Source DB
                  </p>
                </div>
                <div className="mt-2 space-y-1.5">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 bg-white/20 rounded-full w-16"
                      initial={{ width: 0 }}
                      animate={{ width: 16 * (5 - i) }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                    ></motion.div>
                  ))}
                </div>

                {/* Code-like elements */}
                <div className="mt-3 space-y-1">
                  <div className="flex space-x-1 items-center">
                    <div className="h-1 w-1 rounded-full bg-[#9a90da]"></div>
                    <div className="h-0.5 bg-[#9a90da]/40 rounded-full w-12"></div>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div className="h-1 w-1 rounded-full bg-[#9a90da]"></div>
                    <div className="h-0.5 bg-[#9a90da]/40 rounded-full w-10"></div>
                  </div>
                </div>
              </motion.div>

              {/* Target database */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#2a2a3d] to-[#1a1a2d] p-4 rounded-2xl border border-white/10 shadow-2xl z-10"
                animate={{
                  x: [0, 20, 0],
                  y: [0, 0, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                <div className="flex items-center space-x-2 mb-3">
                  <Database className="text-[#716aeb]" />
                  <p className="text-white text-sm font-medium font-Montserrat">
                    Target DB
                  </p>
                </div>

                <div className="mt-2 space-y-1.5">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 bg-white/20 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 16 * (i + 2) }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                    ></motion.div>
                  ))}
                </div>

                {/* Code-like elements */}
                <div className="mt-3 space-y-1">
                  <div className="flex space-x-1 items-center">
                    <div className="h-1 w-1 rounded-full bg-[#716aeb]"></div>
                    <div className="h-0.5 bg-[#716aeb]/40 rounded-full w-12"></div>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div className="h-1 w-1 rounded-full bg-[#716aeb]"></div>
                    <div className="h-0.5 bg-[#716aeb]/40 rounded-full w-10"></div>
                  </div>
                </div>
              </motion.div>

              {/* Center AI processing */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#2a2a3d] to-[#1a1a2d] p-5 rounded-full border border-white/10 shadow-2xl z-20"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 rgba(154, 144, 218, 0.4)",
                    "0 0 30px rgba(154, 144, 218, 0.6)",
                    "0 0 0 rgba(154, 144, 218, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative"
                >
                  <div className="absolute -inset-3 rounded-full border-2 border-dashed border-[#9a90da]/30"></div>
                  <Brain className="text-[#9a90da] w-10 h-10" />
                </motion.div>
              </motion.div>

              {/* Circular orbit */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 border-2 border-dashed border-[#9a90da]/20 rounded-full"
              ></motion.div>

              {/* Data flow left to right */}
              <div className="absolute top-1/2 left-16 sm:left-20 md:left-24 right-16 sm:right-20 md:right-24 -translate-y-1/2 flex justify-center items-center z-0">
                <motion.div
                  className="h-1 bg-gradient-to-r from-[#9a90da] to-[#716aeb] rounded-full w-full relative"
                  animate={{
                    background: [
                      "linear-gradient(90deg, #9a90da 0%, #716aeb 100%)",
                      "linear-gradient(90deg, #716aeb 0%, #9a90da 100%)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  {/* Data packets moving along the line */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg shadow-[#9a90da]/50"
                      animate={{
                        x: ["0%", "100%"],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Small floating elements */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#9a90da]"
                  style={{
                    width: Math.random() * 4 + 2 + "px",
                    height: Math.random() * 4 + 2 + "px",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.5 + 0.2,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating code snippets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute top-0 right-8 md:right-0 transform -translate-y-1/2 translate-x-1/4 bg-gradient-to-br from-[#2a2a3d] to-[#1a1a2d] p-3 rounded-xl border border-white/10 shadow-xl md:block"
        >
          <pre className="text-xs font-mono text-[#9a90da]">
            <code>schema.migrate();</code>
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-0 left-8 md:left-0 transform translate-y-1/3 -translate-x-1/4 bg-gradient-to-br from-[#2a2a3d] to-[#1a1a2d] p-3 rounded-xl border border-white/10 shadow-xl block"
        >
          <pre className="text-xs font-mono text-[#9a90da]">
            <code>db.autoFix();</code>
          </pre>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OverviewSection;
