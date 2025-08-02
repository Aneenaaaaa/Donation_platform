import React from 'react';

const campaigns = [
  { id: 1, title: "Help Flood Victims", status: "pending" },
  { id: 2, title: "Support Education", status: "pending" },
];

function CampaignApproval() {
  return (
    <div>
      <h2>Campaign Approvals</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Title</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {campaigns.map(c => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.status}</td>
              <td>
                <button>Approve</button>
                <button>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CampaignApproval;
