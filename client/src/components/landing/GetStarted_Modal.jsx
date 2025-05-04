import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, Check } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Github } from "lucide-react";

import { OAuthButton } from "../Reusables";

const GetStartedModal = ({ isOpen, onClose, isLoading, authError, login }) => {
  // Close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-[#2a2a3d] to-[#1a1a2d] rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative">
              {/* Subtle background effect */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#9a90da]/5 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#716aeb]/5 rounded-full filter blur-3xl"></div>
              </div>

              {/* Header */}
              <div className="relative p-6 border-b border-white/10">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-white/60 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="relative"
                  >
                    <div className="absolute -inset-1 rounded-full border border-dashed border-[#9a90da]/30"></div>
                    <Brain className="text-[#9a90da] w-6 h-6" />
                  </motion.div>
                  <h3 className="ml-2 text-3xl font-bold text-white font-Syne">
                    Refyn
                  </h3>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#D1D1D2] mt-4 font-Outfit"
                >
                  Migrate your databases with AI-powered intelligence in
                  minutes.
                </motion.p>
              </div>

              {/* Body */}
              <div className="p-6 relative z-20">
                {/* Features highlight */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 mb-6"
                >
                  {["Fast Migration", "AI-Powered", "Zero Downtime"].map(
                    (feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-white/5 px-3 py-1.5 rounded-full"
                      >
                        <Check className="w-3.5 h-3.5 text-[#9a90da] mr-1.5" />
                        <span className="text-white/80 text-xs font-medium">
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </motion.div>

                {/* Auth Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-8"
                >
                  <p className="text-white/80 text-sm font-Outfit mb-3">
                    Sign in to continue:
                  </p>

                  <div className="flex flex-col mx-16 gap-4">
                    <OAuthButton
                      provider="google"
                      label={isLoading ? "Loading..." : "Continue with Google"}
                      icon={FcGoogle}
                      delay={0.5}
                      login={login}
                      className="w-full"
                    />

                    <OAuthButton
                      provider="github"
                      label={isLoading ? "Loading..." : "Continue with Github"}
                      icon={Github}
                      delay={0.6}
                      login={login}
                      className="w-full"
                    />
                  </div>

                  {authError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 mt-4 text-sm font-medium"
                    >
                      {authError}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute z-60 -bottom-4 -right-4 transform translate-y-1/3 translate-x-1/4 bg-gradient-to-br from-[#2a2a3d] to-[#1a1a2d] p-3 rounded-xl border border-white/10 shadow-xl"
              >
                <pre className="text-xs font-mono text-[#9a90da]">
                  <code>refyn.connect();</code>
                </pre>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GetStartedModal;
