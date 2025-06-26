import {
  useGetUserSummariesQuery,
  useDeleteSummaryMutation,
} from "../../../redux/features/user/userApi"; // Make sure to create this

const MySummaries = () => {
  const { data, isLoading, isError, error, refetch } = useGetUserSummariesQuery();
  const [deleteSummary] = useDeleteSummaryMutation();

  const summaries = data?.data || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this summary?")) return;
    try {
      await deleteSummary(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (isLoading) return <p>Loading summaries...</p>;
  if (isError) return <p>Error: {(error as any)?.message}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Summaries</h2>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Prompt</th>
            <th className="p-2 border">Summary</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((summary: any) => (
            <tr key={summary._id}>
              <td className="p-2 border">{summary.prompt}</td>
              <td className="p-2 border max-w-[300px] truncate">{summary.summary}</td>
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

export default MySummaries;
