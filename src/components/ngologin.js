import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginform.css';


function NgoLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }
    alert(`NGO logged in as ${username}`);
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>NGO Login</h2>
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
        <p className="link-text">
          Don't have an NGO account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}

export default NgoLoginForm;
