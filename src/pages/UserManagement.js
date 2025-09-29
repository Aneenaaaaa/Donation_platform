import React, { useEffect, useState } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users"); // your Express backend
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
    loadUsers();
  };

  // Block user
  const blockUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}/block`, { method: "PUT" });
    loadUsers();
  };

  // Unblock user
  const unblockUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}/unblock`, { method: "PUT" });
    loadUsers();
  };

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>User Management</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name || user.username}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                  {user.status === "active" ? (
                    <button onClick={() => blockUser(user._id)}>Block</button>
                  ) : (
                    <button onClick={() => unblockUser(user._id)}>Unblock</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
