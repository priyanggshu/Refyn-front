import { motion } from "framer-motion";
import { ArrowRight, Database, Brain } from "lucide-react";

const WhySection = () => {
  return (
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
          <p className="text-[#a7a7a8] mt-6 max-w-2xl mx-auto text-lg font-Outfit">
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
            <p className="text-[#96969a] mb-6 font-Outfit">
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
            <p className="text-[#96969a] mb-6 font-Outfit">
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
            <p className="text-[#96969a] mb-6 font-Outfit">
              When migrations fail, rolling back to previous states is complex,
              time-consuming, and often incomplete.
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
                <p className="text-[#d1d1d2] mb-8 font-Outfit">
                  Refyn solves these challenges with AI-powered suggestions,
                  live batch streaming, and one-click rollbacks.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-[#9a90da]/20 rounded-full mt-1">
                      <div className="h-2 w-2 bg-green-300 rounded-full"></div>
                    </div>
                    <p className="text-[#a7a7a8] font-Outfit">
                      AI-driven schema analysis and error correction
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-[#9a90da]/20 rounded-full mt-1">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-[#a7a7a8] font-Outfit">
                      Real-time migration monitoring with live progress tracking
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-[#9a90da]/20 rounded-full mt-1">
                      <div className="h-2 w-2 bg-green-700 rounded-full"></div>
                    </div>
                    <p className="text-[#a7a7a8] font-Outfit">
                      Automatic rollback snapshots for fail-safe migrations
                    </p>
                  </li>
                </ul>
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
  );
};

export default WhySection;
