import {
  useGetAllSummariesQuery,
  useDeleteSummaryMutation,
} from "../../../redux/features/admin/adminApi";

const ManageSummaries = () => {
  const { data, isLoading, isError, error, refetch } = useGetAllSummariesQuery(undefined);
  const [deleteSummary] = useDeleteSummaryMutation();

  console.log(data)

  const summaries = data?.data || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this summary?")) return;
    try {
      await deleteSummary(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete summary", err);
    }
  };

  if (isLoading) return <p>Loading summaries...</p>;
  if (isError) return <p>Error loading summaries: {(error as any)?.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Summaries</h1>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Word Count</th>
            <th className="p-2 border">Prompt</th>
            <th className="p-2 border">Summary</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((summary: any) => (
            <tr key={summary._id}>
              <td className="p-2 border">{summary.user?.email || "Unknown"}</td>
              <td className="p-2 border">{summary.wordCount}</td>
              <td className="p-2 border truncate max-w-[200px]">{summary.prompt}</td>
              <td className="p-2 border truncate max-w-[300px]">{summary.summary}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(summary._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSummaries;
