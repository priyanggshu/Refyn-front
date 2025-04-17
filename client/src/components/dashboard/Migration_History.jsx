import { useState } from "react";
import { Clock, ArrowUpDown } from "lucide-react";

export default function MigrationHistoryTable() {
    const [sortField, setSortField] = useState("started");
    const [sortDirection, setSortDirection] = useState("desc");
    const [filters, setFilters] = useState({
      status: "all",
      source: "all",
      target: "all",
    });
  
    // Define the getStatusClass function
    const getStatusClass = (status) => {
      switch (status) {
        case "Completed":
          return "bg-green-500 border-green-500 text-white";
        case "Running":
          return "bg-blue-500 border-blue-500 text-white";
        case "Failed":
          return "bg-red-500 border-red-500 text-white";
        case "Rolled Back":
          return "bg-amber-500 border-amber-500 text-white";
        case "Pending":
          return "bg-gray-500 border-gray-500 text-white";
        default:
          return "bg-gray-500 border-gray-500 text-white";
      }
    };
  
    // Enhanced migrations data with more details
    const migrations = [
      {
        id: "MIG-1234",
        name: "Production Schema Update",
        status: "Completed",
        progress: 100,
        started: "2h ago",
        ended: "1h 45m ago",
        source: "PostgreSQL",
        target: "MySQL",
        rowsMigrated: 15000,
        duration: "15m",
        errors: 0,
        retries: 0,
        stages: [
          { name: "Schema Validation", status: "completed", duration: "2m" },
          { name: "Data Batching", status: "completed", duration: "8m" },
          { name: "AI Fixes", status: "completed", duration: "3m" },
          { name: "Migration Applied", status: "completed", duration: "2m" },
        ],
      },
      {
        id: "MIG-1233",
        name: "User Table Migration",
        status: "Running",
        progress: 65,
        started: "30m ago",
        ended: "-",
        source: "MongoDB",
        target: "PostgreSQL",
      },
      {
        id: "MIG-1232",
        name: "Authentication Schema",
        status: "Failed",
        progress: 80,
        started: "5h ago",
        ended: "4h 30m ago",
        source: "MySQL",
        target: "PostgreSQL",
      },
      {
        id: "MIG-1231",
        name: "Product Catalog Migration",
        status: "Rolled Back",
        progress: 100,
        started: "1d ago",
        ended: "23h ago",
        source: "MongoDB",
        target: "Firestore",
      },
      {
        id: "MIG-1230",
        name: "Analytics Database Setup",
        status: "Pending",
        progress: 0,
        started: "-",
        ended: "-",
        source: "CSV",
        target: "BigQuery",
      },
    ];
  
    const handleSort = (field) => {
      if (field === sortField) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    };
  
    const handleFilter = (type, value) => {
      setFilters((prev) => ({ ...prev, [type]: value }));
    };
  
    const filteredMigrations = migrations.filter((migration) => {
      if (filters.status !== "all" && migration.status !== filters.status)
        return false;
      if (filters.source !== "all" && migration.source !== filters.source)
        return false;
      if (filters.target !== "all" && migration.target !== filters.target)
        return false;
      return true;
    });
  
    const sortedMigrations = [...filteredMigrations].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortDirection === "asc" ? aValue > bValue : aValue < bValue;
    });
  
    return (
      <div className="bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-md overflow-hidden shadow-xl">
        <div className="p-5 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium font-Syne text-white">
              Recent Migrations
            </h3>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-xs text-gray-400 font-Montserrat">
                  Status:
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilter("status", e.target.value)}
                  className="bg-gray-700/50 text-gray-300 rounded-lg px-2 py-1 text-xs"
                >
                  <option value="all">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                  <option value="Rolled Back">Rolled Back</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-xs text-gray-400 font-Montserrat">
                  Source:
                </label>
                <select
                  value={filters.source}
                  onChange={(e) => handleFilter("source", e.target.value)}
                  className="bg-gray-700/50 text-gray-300 rounded-lg px-2 py-1 text-xs"
                >
                  <option value="all">All</option>
                  <option value="PostgreSQL">PostgreSQL</option>
                  <option value="MySQL">MySQL</option>
                  <option value="MongoDB">MongoDB</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-xs text-gray-400 font-Montserrat">
                  Target:
                </label>
                <select
                  value={filters.target}
                  onChange={(e) => handleFilter("target", e.target.value)}
                  className="bg-gray-700/50 text-gray-300 rounded-lg px-2 py-1 text-xs"
                >
                  <option value="all">All</option>
                  <option value="PostgreSQL">PostgreSQL</option>
                  <option value="MySQL">MySQL</option>
                  <option value="MongoDB">MongoDB</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50 bg-gray-800/30">
                {[
                  { field: "id", label: "ID" },
                  { field: "name", label: "Name" },
                  { field: "status", label: "Status" },
                  { field: "progress", label: "Progress" },
                  { field: "started", label: "Started" },
                  { field: "ended", label: "Ended" },
                  { field: "source", label: "Source/Target" },
                  { field: "actions", label: "Actions" },
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-Montserrat cursor-pointer hover:text-gray-300"
                    onClick={() => handleSort(field)}
                  >
                    <div className="flex items-center">
                      {label}
                      {sortField === field && (
                        <ArrowUpDown
                          className={`w-3 h-3 ml-1 ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {sortedMigrations.map((migration, idx) => (
                <tr key={idx} className="hover:bg-gray-800/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-400 font-Outfit">
                    {migration.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-Outfit">
                    {migration.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full border ${getStatusClass(
                        migration.status
                      )}`}
                    >
                      {migration.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-700/30 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          migration.status === "Failed"
                            ? "bg-red-500"
                            : migration.status === "Rolled Back"
                            ? "bg-amber-500"
                            : "bg-indigo-500"
                        }`}
                        style={{ width: `${migration.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-Outfit">
                      {migration.progress}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-Outfit">
                    {migration.started !== "-" ? (
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {migration.started}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-Outfit">
                    {migration.ended}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs bg-gray-700/50 px-2 py-0.5 rounded text-gray-300 font-Outfit">
                        {migration.source}
                      </span>
                      <span className="text-xs">→</span>
                      <span className="text-xs bg-gray-700/50 px-2 py-0.5 rounded text-gray-300 font-Outfit">
                        {migration.target}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {(migration.rowsMigrated || 0).toLocaleString()} rows
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button className="text-indigo-400 hover:text-indigo-300 font-Outfit">
                      View
                    </button>
                    {migration.status === "Completed" && (
                      <button className="text-amber-400 hover:text-amber-300 font-Outfit">
                        Rollback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-700/50 flex justify-between items-center">
          <div className="text-sm text-gray-400 font-Outfit">
            Showing <span className="font-medium text-white">5</span> of{" "}
            <span className="font-medium text-white">42</span> migrations
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-lg border border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-700 text-sm font-Outfit">
              Previous
            </button>
            <button className="px-3 py-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-sm font-Outfit">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  