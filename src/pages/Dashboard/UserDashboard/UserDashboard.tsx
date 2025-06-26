import MySummaries from "./MySummaries";
import CreateSummary from "./CreateSummary";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Go Home link */}
      <div className="mb-4">
        <Link
          to="/"
          className="inline-block text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          ⬅️ Go to Home
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>

      <CreateSummary onSuccess={handleRefresh} />
      <MySummaries key={refreshKey} />
    </div>
  );
};

export default UserDashboard;
