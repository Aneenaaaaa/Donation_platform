import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginform.css';

function NgoLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/ngologin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ NGO logged in as ${data.ngo.username}`);
        // Store NGO info in localStorage if needed
        localStorage.setItem('ngo', JSON.stringify(data.ngo));
        navigate('/dashboard'); // redirect to NGO dashboard
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="link-text">
          Don't have an NGO account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}

export default NgoLoginForm;
