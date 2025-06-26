import { useState } from "react";
import { useDeleteMySummaryMutation, useGetMyProfileQuery, useGetUserSummariesQuery, useRepromptSummaryMutation } from "../../../redux/features/user/userApi";

const MySummaries = () => {
  const { data: summaryData, isLoading, refetch } = useGetUserSummariesQuery(undefined);
  const { data: profileData } = useGetMyProfileQuery(undefined);

  const [deleteMySummary] = useDeleteMySummaryMutation();
  const [repromptSummary] = useRepromptSummaryMutation();

  const [repromptId, setRepromptId] = useState<string | null>(null);
  const [newPrompt, setNewPrompt] = useState("");

  const summaries = summaryData?.data || [];
  const credits = profileData?.data?.credits ?? 0;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this summary?")) return;
    try {
      await deleteMySummary(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleReprompt = async () => {
    if (!repromptId) return;
    try {
      await repromptSummary({ id: repromptId, prompt: newPrompt }).unwrap();
      setRepromptId(null);
      setNewPrompt("");
      refetch();
    } catch (error) {
      console.error("Reprompt failed:", error);
    }
  };

  if (isLoading) return <p>Loading summaries...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">My Summaries</h2>
      <p className="mb-4 text-gray-600">
        Available Credits: <span className="font-bold">{credits}</span>
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Prompt</th>
              <th className="p-2 border">Summary</th>
              <th className="p-2 border text-center">Word Count</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((summary) => (
              <tr key={summary._id}>
                <td className="p-2 border max-w-[250px] truncate">{summary.prompt}</td>
                <td className="p-2 border max-w-[350px] truncate">{summary.summary}</td>
                <td className="p-2 border text-center">{summary.wordCount}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleDelete(summary._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setRepromptId(summary._id);
                      setNewPrompt("");
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Reprompt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reprompt Modal */}
      {repromptId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Enter new prompt</h3>
            <input
              type="text"
              className="w-full border px-3 py-2 mb-4 rounded"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              placeholder="e.g., Make it simpler"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setRepromptId(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReprompt}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySummaries;
