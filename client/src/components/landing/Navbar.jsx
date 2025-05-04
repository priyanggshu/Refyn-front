import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Motion_Span } from "../Reusables";
import GetStartedModal from "./GetStarted_Modal";

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen, login }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const Navlinks = ["Overview", "Why Refyn", "Workflow", "Features"];

  return (
    <>
      
      <nav className=" flex items-center justify-between px-6 md:px-12 py-6 font-Outfit relative z-50">
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
          {Navlinks.map((item, idx) => {
            const href = item.toLowerCase().replace(/\s+/g, "-");
            return (
              <Motion_Span
                key={item}
                label={item}
                delay={0.1 * (idx + 1)}
                onClick={() => {
                  const section = document.getElementById(href);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={openModal}
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

      <GetStartedModal
        isOpen={modalOpen}
        onClose={closeModal}
        isLoading={isLoading}
        authError={authError}
        login={login}
      />
    </>
  );
};

export default Navbar;
