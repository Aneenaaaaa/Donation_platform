import React, { useEffect, useState } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Delete user with confirmation
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
    loadUsers();
  };

  // Block user with confirmation
  const blockUser = async (id) => {
    const confirmBlock = window.confirm("Are you sure you want to block this user?");
    if (!confirmBlock) return;

    await fetch(`http://localhost:5000/api/users/${id}/block`, { method: "PUT" });
    loadUsers();
  };

  // Unblock user with confirmation
  const unblockUser = async (id) => {
    const confirmUnblock = window.confirm("Are you sure you want to unblock this user?");
    if (!confirmUnblock) return;

    await fetch(`http://localhost:5000/api/users/${id}/unblock`, { method: "PUT" });
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="main-container">
      <h2>User Management</h2>
      <div className="table-container">
        <table className="table">
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
                    <button
                      className="action-btn delete"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                    {user.status === "active" ? (
                      <button
                        className="action-btn block"
                        onClick={() => blockUser(user._id)}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="action-btn block"
                        onClick={() => unblockUser(user._id)}
                      >
                        Unblock
                      </button>
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
    </div>
  );
}

export default UserManagement;
