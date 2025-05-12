import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";


export const Motion_Span = ({ label, delay, onClick }) => (
  <motion.span
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay }}
  onClick={onClick}
  className="hover:text-white py-3 cursor-pointer relative group"
  >
      {label}
      <span className="absolute left-0 bottom-2 w-0 h-0.5 bg-[#9a90da] transition-all duration-300 group-hover:w-full"></span>
    </motion.span>
  );
  
  export const login = async (provider) => {
    console.log("Login hit")    
    setIsLoading(true);
    setAuthError(null);
    try {
      await supabase.auth.signInWithOAuth({ 
        provider,
        options: {
          redirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL,
        }
      });
    } catch (error) {
      console.error("Auth error:", error);
      setAuthError("Failed to log in with " + provider);
    } finally {
      setIsLoading(false);
    }
  };
  
  export const OAuthButton = ({ provider, label, icon: Icon, delay = 0.6 }) => {
    const navigate = useNavigate();
  
    const handleClick = useCallback(() => {
      // Here you would usually trigger Supabase OAuth
      // But for demo, we just redirect
      navigate("/dash");
    }, [navigate]);
  
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        onClick={handleClick}
        className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-medium flex items-center justify-center hover:bg-white/15 transition-all transform hover:-translate-y-1 font-Outfit disabled:opacity-70"
      >
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {label}
      </motion.button>
    );
  };


// components/ScrollLink.jsx

export const ScrollLink = ({ targetId, label, setMobileMenuOpen }) => {
  const handleClick = () => {
    setMobileMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error(`Section ${targetId} not found`);
      }
    }, 150);
  };

  return (
    <span
      onClick={handleClick}
      className="text-[#D1D1D2] py-3 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer"
    >
      {label}
    </span>
  );
};
