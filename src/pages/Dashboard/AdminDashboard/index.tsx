import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) =>
              isActive ? "block px-4 py-2 bg-gray-700 rounded" : "block px-4 py-2 hover:bg-gray-700 rounded"
            }
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/summaries"
            className={({ isActive }) =>
              isActive ? "block px-4 py-2 bg-gray-700 rounded" : "block px-4 py-2 hover:bg-gray-700 rounded"
            }
          >
            Manage Summaries
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
