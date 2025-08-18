import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DonationFormPage.css';

const DonationFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const campaign = location.state?.campaign;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your donation!');
    navigate('/');
  };

  if (!campaign) {
    return <p>No campaign selected.</p>;
  }

  return (
    <div className="donation-form-page">
      <h2>Donate to: {campaign.title}</h2>
      <img
        src={campaign.image}
        alt={campaign.title}
        style={{ width: '300px', marginBottom: '20px' }}
      />
      <p>{campaign.description}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <input type="number" placeholder="Amount (₹)" required />
        <textarea placeholder="Message (optional)" />
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default DonationFormPage;
