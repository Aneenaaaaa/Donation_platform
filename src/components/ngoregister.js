import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginform.css';

function NgoRegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orgName: '',
    regNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
    phone: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === 'password') checkPasswordStrength(value);
    if (name === 'phone') {
      const phoneRegex = /^[6-9]\d{9}$/;
      setPhoneValid(phoneRegex.test(value));
    }
  };

  const checkPasswordStrength = (pwd) => {
    const strongRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    setPasswordStrength(strongRegex.test(pwd) ? 'strong' : 'weak');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordStrength !== 'strong') {
      alert('Please choose a stronger password.');
      return;
    }

    if (!phoneValid) {
      alert('Invalid phone number.');
      return;
    }

    // TODO: Send data to backend here

    navigate('/ngo-login'); // Redirect after registration
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>NGO Registration</h2>

        <input
          type="text"
          name="orgName"
          placeholder="Organization Name"
          value={formData.orgName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="regNumber"
          placeholder="Registration Number"
          value={formData.regNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className={phoneValid ? '' : 'input-weak'}
          required
        />
        {!phoneValid && (
          <div className="error-msg">Invalid Indian phone number</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={
            passwordStrength === 'strong'
              ? 'input-strong'
              : passwordStrength === 'weak'
              ? 'input-weak'
              : ''
          }
          required
        />
        {formData.password && (
          <div className={`strength-message ${passwordStrength}`}>
            {passwordStrength === 'strong' ? 'Strong password' : 'Weak password'}
          </div>
        )}

        <textarea
  name="address"
  placeholder="Organization Address"
  value={formData.address}
  onChange={handleChange}
  required
  rows="3"
  className="address-field"
  style={{ resize: 'none' }}
/>


        <button type="submit">Register</button>

        <p className="link-text">
          Already registered? <Link to="/ngologin">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default NgoRegisterForm;
