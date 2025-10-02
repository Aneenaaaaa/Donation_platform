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
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordStrength !== 'strong') {
      alert('Please choose a stronger password.');
      return;
    }

    if (!phoneValid) {
      alert('Invalid phone number.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/ngoregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ NGO registered successfully!');
        navigate('/ngo-login'); // redirect after successful registration
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
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

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="link-text">
          Already registered? <Link to="/ngo-login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default NgoRegisterForm;
