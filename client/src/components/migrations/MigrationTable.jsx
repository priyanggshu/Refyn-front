import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const MigrationTable = () => {
  const [migrations, setMigrations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockMigrations = [
    {
      id: 1,
      name: "Add users table",
      status: "success",
      sourceDb: "PostgreSQL",
      targetDb: "MySQL",
    },
    {
      id: 2,
      name: "Modify products schema",
      status: "failed",
      sourceDb: "MongoDB",
      targetDb: "PostgreSQL",
    },
    {
      id: 3,
      name: "Update indexes",
      status: "ongoing",
      sourceDb: "MySQL",
      targetDb: "MySQL",
    },
  ];

  useEffect(() => {
    const fetchMigrations = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setMigrations(mockMigrations);
        setLoading(false);
      }, 800);
    };

    fetchMigrations();
  }, []);

  return (
    <div className="font-Outfit">
      <div className="overflow-hidden rounded-xl bg-gray-950 border border-gray-800">
        <table className="min-w-full">
          <thead className="border-b border-gray-800/65">
            <tr className="text-left font-Krona font-medium text-xs text-gray-200">
              <th className="p-4">Project Name</th>
              <th className="p-4">Source DB</th>
              <th className="p-4">Target DB</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <Loader2 className="animate-spin h-8 w-8 mx-auto text-blue-500" />
                </td>
              </tr>
            ) : migrations.length > 0 ? (
              migrations.map((migration, index) => (
                <tr
                  key={migration.id}
                  className={`hover:bg-gray-900 transition-colors ${
                    index !== migrations.length - 1
                      ? "border-b border-gray-800"
                      : ""
                  }`}
                >
                  <td className="py-3 px-4 text-sm font-mono text-gray-300">
                    {migration.name}
                  </td>
                  <td className="py-3 px-4 text-xs font-Krona text-gray-300/90">
                    {migration.sourceDb}
                  </td>
                  <td className="py-3 px-4 text-xs font-Krona text-gray-100">
                    {migration.targetDb}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <span
                      className={`inline-block font-mono py-1 px-3 rounded-xl text-sm ${
                        migration.status === "success"
                          ? "bg-gray-900 bg-opacity-30 text-green-300"
                          : migration.status === "failed"
                          ? "bg-gray-900 bg-opacity-30 text-red-400"
                          : "bg-gray-900 bg-opacity-30 text-yellow-400"
                      }`}
                    >
                      {migration.status === "ongoing"
                        ? "In Progress"
                        : migration.status.charAt(0).toUpperCase() +
                          migration.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex font-Syne gap-2">
                      <button className="px-2 py-1 text-sm rounded-lg bg-blue-600/40 hover:bg-blue-700 transition-colors text-gray-100">
                        View
                      </button>
                      <button className="px-4 py-1 text-sm rounded-lg bg-gray-600/40 hover:bg-gray-700 transition-colors text-gray-100">
                        Rollback
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No migrations available.
                </td>
              </tr>
            )}
            {/* Empty row to match the image */}
            <tr className="bg-gray-950">
              <td className="py-3 px-4">
                <div className="h-4 w-32 bg-gray-900 rounded"></div>
              </td>
              <td className="py-3 px-4">
                <div className="h-4 w-24 bg-gray-900 rounded"></div>
              </td>
              <td className="py-3 px-4">
                <div className="h-4 w-24 bg-gray-900 rounded"></div>
              </td>
              <td className="py-3 px-4">
                <span className="inline-block py-1 px-3 rounded-xl text-sm bg-gray-900/90 bg-opacity-80 text-yellow-400">
                  In Progress
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="h-4 w-32 bg-gray-900 rounded"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MigrationTable;
