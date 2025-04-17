import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { ArrowRight, Database, Brain, Github, Menu, X } from "lucide-react";
import WorkflowSection from "../components/landing/Workflow_Section";
import FeaturesSection from "../components/landing/Features_Section";
import { Motion_Span, OAuthButton } from "../components/Reusables";

function Login() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const login = async (provider) => {
    console.log("Login hit");
    setIsLoading(true);
    setAuthError(null);
    try {
      await supabase.auth.signInWithOAuth({ provider });
    } catch (error) {
      console.error("Auth error:", error);
      setAuthError("Failed to log in with " + provider);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        window.location.href = "/dash";
      }
    });
  
    return () => subscription.unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const Navlinks = ["Overview", "Why Refyn", "Workflow", "Features"];

  return (
    <div className="min-h-screen bg-[url('./assets/mesh-1.png')] bg-cover bg-fixed overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 font-Outfit relative z-50">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#D1D1D2] font-bold text-3xl md:text-4xl font-Krona tracking-tight"
        >
          <span className="relative">
            Refyn
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#cac7e0] to-[#3933ae] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.6 }}
            ></motion.span>
          </span>
        </motion.h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex navlinks text-[#D1D1D2] space-x-12 font-Outfit">
          {Navlinks.map((item, idx) => (
            <Motion_Span key={item} label={item} delay={0.1 * (idx + 1)} />
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex text-white text-sm px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9a90da]/80 to-[#716aeb]/80 hover:from-[#9a90da] hover:to-[#716aeb] transition-all duration-300 shadow-lg shadow-[#9a90da]/20 font-Outfit"
        >
          Get Started
        </motion.button>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white p-2 rounded-lg bg-white/10 backdrop-blur-sm"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden bg-[#0e0e1a] backdrop-blur-md overflow-hidden font-Outfit`}
      >
        <div className="px-8 py-6 flex flex-col space-y-4">
          <span className="text-[#D1D1D2] py-3 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer">
            Overview
          </span>
          <span className="text-[#D1D1D2] py-3 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer">
            Why Refyn
          </span>
          <span className="text-[#D1D1D2] py-3 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer">
            Workflow
          </span>
          <span className="text-[#D1D1D2] py-3 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer">
            Features
          </span>
          <button className="text-white text-sm font-medium mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#9a90da] to-[#716aeb] shadow-lg shadow-[#9a90da]/20">
            Get Started
          </button>
        </div>
      </motion.div>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-12 lg:pt-20 pb-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Left content area */}
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
                <span className="animate-pulse pr-1">✨</span> Your Data.
                Refyned. <span className="animate-pulse pl-1">✨</span>
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
            <OAuthButton provider="google" label={isLoading ? "Loading..." : "Login with Google"} delay={0.6} login={login} />
            <OAuthButton provider="github" label={isLoading ? "Loading..." : "Login with Github"} icon={Github} delay={0.7} login={login} />

            {authError && <p className="text-red-500 mt-4 font-medium">{authError}</p>}

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
              <p className="text-[#9a90da] font-Montserrat font-semibold">
                100%
              </p>
              <p className="text-white/60 text-sm font-Outfit">
                Migration Success
              </p>
            </div>
            <div>
              <p className="text-[#9a90da] font-Montserrat font-semibold">
                10x
              </p>
              <p className="text-white/60 text-sm font-Outfit">
                Faster Migrations
              </p>
            </div>
            <div>
              <p className="text-[#9a90da] font-Montserrat font-semibold">
                Easy
              </p>
              <p className="text-white/60 text-sm font-Outfit">Rollback</p>
            </div>
          </motion.div>
        </div>

        {/* Right animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full lg:w-1/2 mt-16 lg:mt-0 relative"
        >
          {/* Glowing background effect */}
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

      {/* Why Refyn */}
      <section className="py-8 px-6 md:px-12 font-Outfit relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0e0e1a]/60 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#9a90da] font-Syne text-sm uppercase tracking-wider font-medium">
              The Problem & Solution
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#D1D1D2] font-Krona mt-3">
              Why <span className="text-[#9a90da]">Refyn?</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#9a90da] to-[#716aeb] mx-auto mt-4 rounded-full"></div>
            <p className="text-[#a7a7a8] mt-6 max-w-2xl mx-auto text-lg font-Montserrat">
              Traditional database migrations are complex and error-prone. We've
              reimagined the process from the ground up.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1a1a2e]/25 via-[#D1CDEB]/5 to-[#16162a]/50 rounded-2xl p-8 border border-[#2a2a3d] hover:border-[#9a90da]/50 transition-all duration-300 group shadow-xl"
            >
              <div className="p-3 bg-gradient-to-br from-[#7f7c93] via-[#D1CDEB] to-[#221e6b] inline-block rounded-xl mb-6">
                <Database className="text-[#000000] h-8 w-8 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-Syne">
                Fragile Migrations
              </h3>
              <p className="text-[#96969a] mb-6 font-Montserrat">
                Traditional database migrations are brittle, requiring manual
                intervention when anything changes unexpectedly.
              </p>
              <div className="w-full h-0.5 bg-gradient-to-r from-[#9a90da]/0 via-[#9a90da]/20 to-[#9a90da]/0 rounded-full mb-6"></div>
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-[#9a90da]/20 to-[#716aeb]/30 rounded-full"
              ></motion.div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-[#1a1a2e]/25 via-[#D1CDEB]/5 to-[#16162a]/50 rounded-2xl p-8 border border-[#2a2a3d] hover:border-[#9a90da]/50 transition-all duration-300 group shadow-xl"
            >
              <div className="p-3 bg-gradient-to-br from-[#7f7c93] via-[#D1CDEB] to-[#221e6b] inline-block rounded-xl mb-6">
                <Brain className="text-[#000000] h-8 w-8 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-Syne">
                Schema Mismatches
              </h3>
              <p className="text-[#96969a] mb-6 font-Montserrat">
                Schema differences between databases lead to migration failures,
                data loss, and extended downtime.
              </p>
              <div className="w-full h-0.5 bg-gradient-to-r from-[#9a90da]/0 via-[#9a90da]/20 to-[#9a90da]/0 rounded-full mb-6"></div>
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-[#9a90da]/20 to-[#716aeb]/30 rounded-full"
              ></motion.div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 60 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#16162a]/50 via-[#D1CDEB]/5 to-[#1a1a2e]/25 rounded-2xl p-8 border border-[#2a2a3d] hover:border-[#9a90da]/50 transition-all duration-300 group shadow-xl"
            >
              <div className="p-3 bg-gradient-to-br from-[#7f7c93] via-[#D1CDEB] to-[#221e6b] inline-block rounded-xl mb-6">
                <ArrowRight className="text-[#000000] h-8 w-8 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-Syne">
                Painful Rollbacks
              </h3>
              <p className="text-[#96969a] mb-6 font-Montserrat">
                When migrations fail, rolling back to previous states is
                complex, time-consuming, and often incomplete.
              </p>
              <div className="w-full h-0.5 bg-gradient-to-r from-[#9a90da]/0 via-[#9a90da]/20 to-[#9a90da]/0 rounded-full mb-6"></div>
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-[#9a90da]/20 to-[#716aeb]/30 rounded-full"
              ></motion.div>
            </motion.div>
          </div>

          {/* Refyn Solution Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 relative"
          >
            <div className="bg-gradient-to-br from-[#1f1f36]/30 via-transparent to-[#181833]/5 rounded-2xl p-8 md:p-12 border border-[#2a2a3d] shadow-2xl overflow-hidden relative z-10">
              {/* Decorative gradient orbs */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#716aeb]/10 rounded-full blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#9a90da]/10 rounded-full blur-3xl"></div>

              {/* Animated particles */}
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

              <div className="flex flex-col md:flex-row items-center justify-between relative z-20">
                <div className="md:w-3/4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-Playfair">
                    The <span className="text-[#9a90da]">Refyn</span> Solution
                  </h3>
                  <p className="text-[#d1d1d2]  mb-6 font-Montserrat">
                    Refyn solves these challenges with AI-powered suggestions,
                    live batch streaming, and one-click rollbacks.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-[#9a90da]/20 rounded-full mt-1">
                        <div className="h-2 w-2 bg-green-300 rounded-full"></div>
                      </div>
                      <p className="text-[#a7a7a8] font-Montserrat">
                        AI-driven schema analysis and error correction
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-[#9a90da]/20 rounded-full mt-1">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      </div>
                      <p className="text-[#a7a7a8] font-Montserrat">
                        Real-time migration monitoring with live progress
                        tracking
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-[#9a90da]/20 rounded-full mt-1">
                        <div className="h-2 w-2 bg-green-700 rounded-full"></div>
                      </div>
                      <p className="text-[#a7a7a8] font-Montserrat">
                        Automatic rollback snapshots for fail-safe migrations
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 md:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#9a90da] to-[#716aeb] text-white font-medium rounded-full flex items-center gap-2 shadow-lg shadow-[#716aeb]/30 font-Syne"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating code snippet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-10 right-10 md:right-32 bg-gradient-to-br from-[#2a2a3d] to-[#1a1a2d] p-3 rounded-xl border border-white/10 shadow-xl hidden md:block"
          >
            <pre className="text-xs font-mono text-[#9a90da]">
              <code>refyn.fixSchema(errors);</code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Workflow section */}
      <section>
        <WorkflowSection />
      </section>
      {/* Features section */}
      <section>
        <FeaturesSection />
      </section>
    </div>
  );
}

export default Login;
