import { useGetAllSummariesQuery } from "../../../redux/features/editor/editorApi";
import { Link } from "react-router-dom";

const ReviewerDashboard = () => {
  const { data, isLoading, isError, error } = useGetAllSummariesQuery(undefined);
  const summaries = data?.data || [];

  if (isLoading) return <p>Loading summaries...</p>;
  if (isError) return <p>Error loading summaries: {(error as any)?.message}</p>;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Reviewer Panel</h2>
        <nav className="space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-gray-700 rounded"
          >
            ⬅️ Go to Home
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Reviewer Dashboard</h1>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Prompt</th>
              <th className="p-2 border">Summary</th>
              <th className="p-2 border text-center">Word Count</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((summary: any) => (
              <tr key={summary._id}>
                <td className="p-2 border max-w-[200px] truncate">{summary.prompt}</td>
                <td className="p-2 border max-w-[400px] truncate">{summary.summary}</td>
                <td className="p-2 border text-center">{summary.wordCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ReviewerDashboard;
