import React, { useState } from 'react';
import './loginform.css'; 

function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }

    try {
      // ✅ Using GET with query params
      const response = await fetch(
        `http://localhost:5000/admin?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      );

      const data = await response.json();

      if (response.ok) {
        // ✅ backend returns "username" field, not "name"
        alert(`✅ Admin logged in as ${data.admin.username}`);
        // Redirect to dashboard if needed
        // window.location.href = "/admin/dashboard";
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (error) {
      alert("Something went wrong, please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLoginForm;
