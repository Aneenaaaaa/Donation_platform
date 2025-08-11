import React from 'react';

const CampaignAnalyticsPage = () => {
  const totalRaised = 6500;
  const totalDonors = 123;

  return (
    <div>
      <h2>Campaign Analytics</h2>
      <p><strong>Total Raised:</strong> ${totalRaised}</p>
      <p><strong>Total Donors:</strong> {totalDonors}</p>
      <p><strong>Average Donation:</strong> ${(totalRaised / totalDonors).toFixed(2)}</p>
    </div>
  );
};

export default CampaignAnalyticsPage;
