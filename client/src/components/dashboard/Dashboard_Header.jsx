import { Rocket } from "lucide-react";

export default function DashboardHeader() {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold font-Syne bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-300 to-purple-300">
              Welcome back
            </h1>
            <div className="ml-3 px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/20 backdrop-blur-sm">
              <span className="text-xs font-medium text-indigo-300 font-Montserrat tracking-wide">REFYN</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-1 font-Outfit">
            Manage your database migrations and review performance insights
          </p>
        </div>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl text-sm transition-all flex items-center space-x-2 font-medium font-Outfit shadow-lg shadow-indigo-500/20 group">
          <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span>Start New Migration</span>
        </button>
      </div>
    );
  }