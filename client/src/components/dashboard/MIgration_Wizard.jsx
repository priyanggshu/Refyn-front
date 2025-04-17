import { useState } from "react";
import { XCircle } from "lucide-react";

export default function MigrationWizard({setShowMigrationWizard}) {
    const [sourceDB, setSourceDB] = useState("");
    const [targetDB, setTargetDB] = useState("");
    const [schemaFile, setSchemaFile] = useState(null);
    const [step, setStep] = useState(1);
  
    const handleNextStep = () => {
      setStep(step + 1);
    };
  
    const handlePreviousStep = () => {
      setStep(step - 1);
    };
  
    const handleSubmit = () => {
      // Handle migration submission logic here
      console.log("Migration started with:", { sourceDB, targetDB, schemaFile });
      setShowMigrationWizard(false); // Close the wizard after submission
    };
  
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl w-full max-w-2xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-Syne text-white">New Migration</h2>
            <button
              onClick={() => setShowMigrationWizard(false)}
              className="text-gray-400 hover:text-white"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          {step === 1 && (
            <div>
              <h3 className="text-lg font-Syne text-white mb-4">
                Select Source & Target DB
              </h3>
              <div className="mb-4">
                <label className="block text-gray-400">Source DB:</label>
                <select
                  value={sourceDB}
                  onChange={(e) => setSourceDB(e.target.value)}
                  className="bg-gray-700/50 text-gray-300 rounded-lg px-2 py-1 w-full"
                >
                  <option value="">Select Source DB</option>
                  <option value="PostgreSQL">PostgreSQL</option>
                  <option value="MySQL">MySQL</option>
                  <option value="MongoDB">MongoDB</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-400">Target DB:</label>
                <select
                  value={targetDB}
                  onChange={(e) => setTargetDB(e.target.value)}
                  className="bg-gray-700/50 text-gray-300 rounded-lg px-2 py-1 w-full"
                >
                  <option value="">Select Target DB</option>
                  <option value="PostgreSQL">PostgreSQL</option>
                  <option value="MySQL">MySQL</option>
                  <option value="MongoDB">MongoDB</option>
                </select>
              </div>
              <button
                onClick={handleNextStep}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-Syne text-white mb-4">Upload Schema</h3>
              <input
                type="file"
                onChange={(e) => setSchemaFile(e.target.files[0])}
                className="mb-4"
              />
              <button
                onClick={handlePreviousStep}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Start Migration
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  