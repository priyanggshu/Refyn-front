import React, { useState } from 'react';

// Mock migration timeline data
const migrations = [
  {
    id: 1,
    name: 'create_users_table',
    timeline: [
      { step: 'Started', time: '2024-03-13 10:00 AM' },
      { step: 'Schema Analyzed', time: '2024-03-13 10:02 AM' },
      { step: 'Migration Executed', time: '2024-03-13 10:05 AM' },
      { step: 'Completed', time: '2024-03-13 10:06 AM' },
    ],
  },
  {
    id: 2,
    name: 'add_email_to_users_table',
    timeline: [
      { step: 'Started', time: '2024-03-18 11:00 AM' },
      { step: 'Schema Updated', time: '2024-03-18 11:03 AM' },
      { step: 'Verification', time: '2024-03-18 11:05 AM' },
      { step: 'Completed', time: '2024-03-18 11:06 AM' },
    ],
  },
];

export default function MigrationTimelineViewer() {
  const [selectedMigration, setSelectedMigration] = useState(null);

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
      <h2 className="text-lg font-medium mb-4 text-white">Timeline</h2>

      {/* Migration Selection Buttons */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {migrations.map((migration) => (
          <button
            key={migration.id}
            onClick={() => setSelectedMigration(migration)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedMigration?.id === migration.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {migration.name}
          </button>
        ))}
      </div>

      {/* Timeline Content */}
      <div className="h-48 overflow-auto">
        {selectedMigration ? (
          <ul className="space-y-4 text-sm text-gray-300">
            {selectedMigration.timeline.map((event, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">{event.step}</p>
                  <p className="text-xs text-gray-400">{event.time}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Select a migration to view timeline</p>
          </div>
        )}
      </div>
    </div>
  );
}
