const UserList = () => {
  const users = [
    { id: 1, name: "Admin", email: "admin@gmail.com", role: "admin" },
    { id: 2, name: "Editor", email: "editor@example.com", role: "editor" },
    { id: 3, name: "Reviewer", email: "reviewer@example.com", role: "reviewer" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">User Management</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
