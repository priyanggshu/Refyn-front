import { useState } from "react";

const snapshott = {
    timestamp: "2025-04-22T15:45:00.000Z",
    schemaUrl: "https://xyz.supabase.co/storage/v1/object/public/snapshots/schema-v2.sql",
  };

  
export default function RollbackOptions({ snapshot = snapshott, isOpen, setIsOpen }) {
    if (!snapshot) {
        return null;
    }

  const handleRollback = () => {
    console.log("Rollback triggered for snapshot:", snapshot.schemaUrl);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Rollback
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              This will restore the previous database state using the stored
              snapshot. All changes made after the migration will be lost.
              Are you sure you want to proceed?
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-zinc-700 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleRollback}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Confirm Rollback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
