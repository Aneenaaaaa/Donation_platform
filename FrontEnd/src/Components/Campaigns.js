













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Campaigns.css";

// const Campaigns = ({ showSearch = false, limit = null }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [campaigns, setCampaigns] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/api/campaigns`)
//       .then(res => setCampaigns(res.data))
//       .catch(err => console.error("Error fetching campaigns:", err));
//   }, []);

//   const handleDonateClick = (campaign) => {
//     navigate("/donation-form", { state: { campaign } });
//   };

//   let filteredCampaigns = campaigns.filter((c) =>
//     c.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (limit) {
//     filteredCampaigns = filteredCampaigns.slice(0, limit);
//   }

//   return (
//     <section className="campaigns-section">
//       <h2 className="campaigns-heading">
//         {showSearch ? "Find a Campaign to Support" : "Urgent Campaigns"}
//       </h2>

//       {showSearch && (
//         <div style={{ textAlign: "center", margin: "1rem 0" }}>
//           <input
//             type="text"
//             placeholder="Search campaigns..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{
//               padding: "0.5rem 1rem",
//               width: "50%",
//               maxWidth: "400px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>
//       )}

//       <div className="campaigns-container">
//         {filteredCampaigns.length > 0 ? (
//           filteredCampaigns.map((campaign) => (
//             <div className="campaign-card" key={campaign._id}>
//               {/* ✅ Show campaign image */}
//               <img src={campaign.imageUrl} alt={campaign.title} />

//               <div className="campaign-content">
//                 <h3>{campaign.title}</h3>
//                 <p>{campaign.description}</p>

//                 {/* ✅ Show NGO name */}
//                 {campaign.ngoId && (
//                   <p><strong>Organized by:</strong> {campaign.ngoId.orgName}</p>
//                 )}

//                 <button onClick={() => handleDonateClick(campaign)}>
//                   Donate Now
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No campaigns found.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Campaigns;











import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Campaigns.css";

const Campaigns = ({ showSearch = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/campaigns`)
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error("Error fetching campaigns:", err));
  }, []);

  const handleDonateClick = (campaign) => {
    navigate("/donation-form", { state: { campaign } });
  };

  // ✅ Filter by search
  let filteredCampaigns = campaigns.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Show only last 3 campaigns if not in search mode
  if (!showSearch) {
    filteredCampaigns = filteredCampaigns.slice(-3);
  }

  return (
    <section className="campaigns-section">
      <h2 className="campaigns-heading">
        {showSearch ? "Find a Campaign to Support" : "Urgent Campaigns"}
      </h2>

      {showSearch && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              width: "50%",
              maxWidth: "400px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      )}

      <div className="campaigns-container">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <div className="campaign-card" key={campaign._id}>
              <img src={campaign.imageUrl} alt={campaign.title} />

              <div className="campaign-content">
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>

                {campaign.ngoId && (
                  <p>
                    <strong>Organized by:</strong> {campaign.ngoId.orgName}
                  </p>
                )}

                <button onClick={() => handleDonateClick(campaign)}>
                  Donate Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No campaigns found.</p>
        )}
      </div>
    </section>
  );
};

export default Campaigns;
