import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginform.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isStrong, setIsStrong] = useState(null);
  const [phoneValid, setPhoneValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password strength check
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const strongRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    setIsStrong(strongRegex.test(value));
  };

  // Phone validation
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    const phoneRegex = /^[6-9]\d{9}$/;
    setPhoneValid(phoneRegex.test(value));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneValid) return alert("❌ Please enter a valid Indian phone number.");
    if (!isStrong) return alert("❌ Password is too weak.");

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Registration successful!");
        navigate("/login");
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={handlePhoneChange}
          className={phoneValid ? '' : 'input-weak'}
          required
        />
        {!phoneValid && <div className="error-msg">Invalid Indian phone number</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className={isStrong === null ? '' : isStrong ? 'input-strong' : 'input-weak'}
          required
        />
        {isStrong !== null && (
          <div className={`strength-message ${isStrong ? 'strong' : 'weak'}`}>
            {isStrong ? 'Strong password' : 'Weak password'}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="redirect-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
