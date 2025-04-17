import Sidebar from '../components/dashboard/Sidebar'; // Adjust path as necessary
import DashboardPage from '../pages/Dashboard_Page'; // Adjust path as necessary

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 backdrop-blur-lg ">
      <Sidebar />
      <main className="flex-1 overflow-y-auto rounded-l-xl clientc border-l border-stone-500/30">
        <DashboardPage />
      </main>
    </div>
  );
}
