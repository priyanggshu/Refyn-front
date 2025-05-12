import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const error = params.get("error");

      if (error) {
        console.error("OAuth Callback Error:", error);
        navigate("/dash", { state: { error: `OAuth authentication failed: ${error}` } });
      } else {
        navigate("/dash");
      }
    };

    handleAuth();
  }, [location, navigate]);

  return <div>Authenticating...</div>;
}