import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllSummariesQuery,
  useUpdateSummaryMutation,
  useDeleteSummaryMutation,
} from "../../../redux/features/editor/editorApi";

const EditorDashboard = () => {
  const { data, isLoading, refetch } = useGetAllSummariesQuery(undefined);
  const [updateSummary] = useUpdateSummaryMutation();
  const [deleteSummary] = useDeleteSummaryMutation();

  const [editId, setEditId] = useState<string | null>(null);
  const [newSummary, setNewSummary] = useState("");

  const summaries = data?.data || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this summary?")) return;
    await deleteSummary(id).unwrap();
    refetch();
  };

  const handleUpdate = async () => {
    if (!editId) return;
    await updateSummary({ id: editId, summary: newSummary }).unwrap();
    setEditId(null);
    setNewSummary("");
    refetch();
  };

  if (isLoading) return <p>Loading summaries...</p>;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Editor Panel</h2>
        <nav className="space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-gray-700 rounded"
          >
            ⬅️ Go to Home
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Editor Dashboard</h2>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Prompt</th>
              <th className="p-2 border">Summary</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((summary) => (
              <tr key={summary._id}>
                <td className="p-2 border max-w-[200px] truncate">{summary.prompt}</td>
                <td className="p-2 border max-w-[400px] truncate">{summary.summary}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => {
                      setEditId(summary._id);
                      setNewSummary(summary.summary);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(summary._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {editId && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h3 className="text-lg font-semibold mb-2">Edit Summary</h3>
              <textarea
                className="w-full border px-3 py-2 mb-4 rounded"
                rows={6}
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditId(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditorDashboard;
