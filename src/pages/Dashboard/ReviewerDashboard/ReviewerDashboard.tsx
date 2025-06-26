import { useGetAllSummariesQuery } from "../../../redux/features/editor/editorApi";

const ReviewerDashboard = () => {
  const { data, isLoading, isError, error } = useGetAllSummariesQuery(undefined);
  const summaries = data?.data || [];

  if (isLoading) return <p>Loading summaries...</p>;
  if (isError) return <p>Error loading summaries: {(error as any)?.message}</p>;

  return (
    <div className="p-6">
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
    </div>
  );
};

export default ReviewerDashboard;
