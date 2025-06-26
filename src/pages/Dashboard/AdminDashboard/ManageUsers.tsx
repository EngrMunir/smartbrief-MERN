import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useRechargeCreditsMutation,
} from "../../../redux/features/admin/adminApi";

const roles = ["user", "editor", "reviewer", "admin"];

const ManageUsers = () => {
  const { data, isLoading, isError, error, refetch } = useGetAllUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [rechargeCredits] = useRechargeCreditsMutation();

  const [rechargeAmounts, setRechargeAmounts] = useState<Record<string, number>>({});

  const users = data?.data?.result || [];

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await updateUserRole({ id, role }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update role", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handleRecharge = async (userId: string) => {
    const amount = rechargeAmounts[userId];
    if (!amount || amount <= 0) return alert("Enter a valid credit amount");

    try {
      await rechargeCredits({ userId, amount }).unwrap();
      alert("Credits recharged successfully");
      setRechargeAmounts((prev) => ({ ...prev, [userId]: 0 }));
      refetch();
    } catch (err) {
      alert("Failed to recharge credits");
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users: {(error as any)?.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Credits</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2 border text-center">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-600 font-semibold">{user.credits ?? 0}</span>
                  <input
                    type="number"
                    className="border px-2 py-1 rounded text-sm"
                    placeholder="Amount"
                    value={rechargeAmounts[user._id] ?? ""}
                    onChange={(e) =>
                      setRechargeAmounts((prev) => ({
                        ...prev,
                        [user._id]: Number(e.target.value),
                      }))
                    }
                  />
                  <button
                    onClick={() => handleRecharge(user._id)}
                    className="bg-blue-600 text-white text-xs py-1 rounded"
                  >
                    Recharge
                  </button>
                </div>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(user._id)}
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

export default ManageUsers;
