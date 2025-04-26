import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard_Page from "@/pages/Dashboard_Page";
import MigrationsPage from "./pages/Migration_Page";
import SchemasPage from "./pages/Schemas_Page";
import SnapshotsPage from "./pages/Snapshots_Page";
import ReportsPage from "./pages/Report_Page";
import AuthCallback from './components/auth/AuthCallback';
import MigrationDetailsPage from './pages/MigrationDetails_Page';




function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dash/" element={<Dashboard_Page />} />
          <Route path="/dash/migrations" element={<MigrationsPage />} />
          <Route path="/dash/schemas" element={<MigrationDetailsPage />} />
          <Route path="/dash/snapshots" element={<SnapshotsPage />} />
          <Route path="/dash/reports" element={<ReportsPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
