import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

import Navbar from "../components/landing/Navbar";
import ScrollLink from "../components/Reusables";
import OverviewSection from "../components/landing/Overview_Section";
import WhySection from "../components/landing/Why_Section";
import WorkflowSection from "../components/landing/Workflow_Section";
import FeaturesSection from "../components/landing/Features_Section";

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

  return (
    <div className="scroll-smooth min-h-screen bg-[url('./assets/mesh-1.png')] bg-cover bg-fixed overflow-x-hidden">
      {/* Navigation */}
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

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
          <ScrollLink
            targetId="overview"
            label="Overview"
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <ScrollLink
            targetId="why-refyn"
            label="Why Refyn"
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <ScrollLink
            targetId="workflow"
            label="Workflow"
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <ScrollLink
            targetId="features"
            label="Features"
            setMobileMenuOpen={setMobileMenuOpen}
          />

          <button className="text-white text-sm font-medium mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#9a90da] to-[#716aeb] shadow-lg shadow-[#9a90da]/20">
            Get Started
          </button>
        </div>
      </motion.div>

      <div className=" space-y-2 mt-8"></div>

      {/* Overview */}
      <section id="overview">
        <OverviewSection isLoading={isLoading} authError={authError} login={login} />
      </section>

      {/* Why Refyn */}
      <section id="why-refyn">
        <WhySection />
      </section>

      {/* Workflow section */}
      <section id="workflow">
        <WorkflowSection />
      </section>
      {/* Features section */}
      <section id="features">
        <FeaturesSection />
      </section>
    </div>
  );
}

export default Login;
