import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getInitialUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching initial session:", error);
        setLoading(false);
        return;
      }
  
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };
  
    getInitialUser();
  
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );
  
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [navigate]);
  

  const loginWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
    if (error) console.error("GitHub login error:", error);
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.error("Google login error:", error);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGitHub, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;