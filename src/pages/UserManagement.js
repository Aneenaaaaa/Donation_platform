import React from 'react';

const users = [
  { id: 1, name: "User A", status: "active" },
  { id: 2, name: "User B", status: "blocked" },
];

function UserManagement() {
  return (
    <div>
      <h2>User Management</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Name</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.status}</td>
              <td>
                <button>Delete</button>
                <button>{user.status === "active" ? "Block" : "Unblock"}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
