import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DonatePage.css';

const campaignsList = [
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
    description: 'Donate books and uniforms to underprivileged kids.',
    image: '/assets/school.jpg',
  },
];

const DonatePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleDonate = (campaign) => {
    navigate('/donation-form', { state: { campaign } }); // ✅ pass full object
  };

  const filteredCampaigns = campaignsList.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="donate-page">
      <h2>Find a Campaign to Support</h2>
      <input
        type="text"
        placeholder="Search campaigns..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="campaigns-grid">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <div className="campaign-card" key={campaign.id}>
              <img src={campaign.image} alt={campaign.title} />
              <div className="campaign-info">
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <button onClick={() => handleDonate(campaign)}>Donate</button>
              </div>
            </div>
          ))
        ) : (
          <p>No campaigns found.</p>
        )}
      </div>
    </div>
  );
};

export default DonatePage;
