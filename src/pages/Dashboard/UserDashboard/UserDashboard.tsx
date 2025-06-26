import MySummaries from "./MySummaries";
import CreateSummary from "./CreateSummary";
import { useState } from "react";

const UserDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <CreateSummary onSuccess={handleRefresh} />
      <MySummaries key={refreshKey} />
    </div>
  );
};

export default UserDashboard;
