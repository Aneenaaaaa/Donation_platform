import React, { useEffect, useState } from "react";


function CampaignApproval() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/campaigns")
      .then(res => res.json())
      .then(data => setCampaigns(data))
      .catch(err => console.error("Error fetching campaigns:", err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/campaigns/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setCampaigns(campaigns.map(c => c._id === id ? { ...c, status } : c));
      }
    } catch (err) {
      console.error("Error updating campaign:", err);
    }
  };

  return (
    <div className="main-container">
      <h2>Campaign Approvals</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 ? campaigns.map(c => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.status}</td>
                <td>
                  <button
                    className="action-btn block"
                    onClick={() => updateStatus(c._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => updateStatus(c._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3">No campaigns found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CampaignApproval;
