import React, { useState } from 'react';

const MyCampaignsPage = () => {
  const [campaigns] = useState([
    { id: 1, title: 'Water for All', status: 'Active', raised: 2500 },
    { id: 2, title: 'Books for Kids', status: 'Completed', raised: 4000 },
  ]);

  return (
    <div>
      <h2>My Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <h3>{campaign.title}</h3>
            <p>Status: {campaign.status}</p>
            <p>Raised: ${campaign.raised}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCampaignsPage;
