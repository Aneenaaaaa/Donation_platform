import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginform.css'; // Ensure this file exists in the correct path

function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }
    alert(`Admin logged in as ${username}`);
    // Navigate to admin dashboard if needed
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
