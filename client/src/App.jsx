import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard_Page from "@/pages/Dashboard_Page";
import MigrationsPage from "./pages/Migration_Page";
import SchemasPage from "./pages/Schemas_Page";
import SnapshotsPage from "./pages/Snapshots_Page";
import ReportsPage from "./pages/Report_Page";
import AuthCallback from "./components/auth/AuthCallback";
import MigrationDetailsPage from "./pages/MigrationDetails_Page";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dash/" element={<Dashboard_Page />} />
            <Route path="/dash/migrations" element={<MigrationsPage />} />
            <Route path="/dash/schemas" element={<MigrationDetailsPage />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
