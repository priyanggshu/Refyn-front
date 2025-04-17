import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import MigrationsPage from "./pages/Migration_Page";
import SchemasPage from "./pages/Schemas_Page";
import SnapshotsPage from "./pages/Snapshots_Page";
import ReportsPage from "./pages/Report_Page";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash/" element={<Dashboard />} />
        <Route path="/dash/migrations" element={<MigrationsPage />} />
        <Route path="/dash/schemas" element={<SchemasPage />} />
        <Route path="/dash/snapshots" element={<SnapshotsPage />} />
        <Route path="/dash/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
