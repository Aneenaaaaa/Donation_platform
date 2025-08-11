import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginform.css';

function RegisterForm() {
  const [password, setPassword] = useState('');
  const [isStrong, setIsStrong] = useState(null);
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
  };

  const checkPasswordStrength = (pwd) => {
    const strongRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    setIsStrong(strongRegex.test(pwd));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    const phoneRegex = /^[6-9]\d{9}$/;
    setPhoneValid(phoneRegex.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneValid) {
      alert("Please enter a valid Indian phone number.");
      return;
    }
    if (!isStrong) {
      alert("Password is too weak.");
      return;
    }

    // Perform backend registration logic here

    navigate('/login');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
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
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className={
            isStrong === null ? '' : isStrong ? 'input-strong' : 'input-weak'
          }
          required
        />
        {isStrong !== null && (
          <div className={`strength-message ${isStrong ? 'strong' : 'weak'}`}>
            {isStrong ? 'Strong password' : 'Weak password'}
          </div>
        )}

        <button type="submit">Register</button>

        <p className="redirect-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
