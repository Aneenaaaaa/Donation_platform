// src/Pages/Campaigns.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import this
import './Campaigns.css';

const campaigns = [
  {
    id: 1,
    title: 'Medical Aid for Children',
    description: 'Urgent help needed for children’s surgery and treatment.',
    image: '/assets/medical.jpg',
  },
  {
    id: 2,
    title: 'Flood Relief 2025',
    description: 'Support families affected by recent floods.',
    image: '/assets/flood.jpg',
  },
  {
    id: 3,
    title: 'School Supplies Drive',
    description: 'Donate to provide books and uniforms to underprivileged kids.',
    image: '/assets/school.jpg',
  },
];

const Campaigns = () => {
  const navigate = useNavigate(); // ✅ get navigate hook

  const handleDonateClick = (campaign) => {
    navigate('/donation-form', { state: { campaign: campaign.title } }); // ✅ navigate with campaign info
  };

  return (
    <section className="campaigns-section">
      <h2 className="campaigns-heading">Urgent Campaigns</h2>
      <div className="campaigns-container">
        {campaigns.map(campaign => (
          <div className="campaign-card" key={campaign.id}>
            <img src={campaign.image} alt={campaign.title} />
            <div className="campaign-content">
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <button onClick={() => handleDonateClick(campaign)}>
                Donate Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Campaigns;
