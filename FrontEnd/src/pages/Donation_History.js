










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Donation_History.css"; // Import CSS

// export default function Donation_History() {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;

//   useEffect(() => {
//     if (!userId) return;

//     axios
//       .get(`http://localhost:5000/api/donations/donor/${userId}`)
//       .then((res) => {
//         setDonations(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [userId]);

//   const canCancel = (donationDate) => {
//     const now = new Date();
//     const donation = new Date(donationDate);
//     const diffDays = Math.floor((now - donation) / (1000 * 60 * 60 * 24));
//     return diffDays <= 5;
//   };

//   const handleCancel = (donationId) => {
//     if (window.confirm("Are you sure you want to cancel this donation?")) {
//       axios
//         .delete(`http://localhost:5000/api/donations/${donationId}`)
//         .then(() => {
//           setDonations(donations.filter((d) => d._id !== donationId));
//           alert("Donation cancelled successfully");
//         })
//         .catch((err) =>
//           alert(err.response?.data?.error || "Error cancelling")
//         );
//     }
//   };

//   if (loading) return <p>Loading donation history...</p>;
//   if (!userId) return <p>Please log in to see your donation history.</p>;

//   return (
//     <div className="donation-history-container">
//       <h1>Donation History</h1>
//       {donations.length === 0 ? (
//         <p>No donations yet.</p>
//       ) : (
//         <div className="donation-cards">
//           {donations.map((donation) => (
//             <div className="donation-card" key={donation._id}>
//               <div className="donation-card-left"></div>
//               <div className="donation-card-content">
//                 <h3>{donation.campaignId?.title || "N/A"}</h3>
//                 <p>
//                   <strong>NGO:</strong>{" "}
//                   {donation.campaignId?.ngoId?.orgName || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {new Date(
//                     donation.donationDate || donation.createdAt
//                   ).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong>Type:</strong> {donation.donationType}
//                 </p>
//                 <p>
//                   <strong>Amount / Details:</strong>{" "}
//                   {donation.amount ? `$${donation.amount}` : donation.details}
//                 </p>
//                 <p>
//                   <strong>Message:</strong> {donation.message || "-"}
//                 </p>
//               </div>
//               <div className="donation-card-actions">
//                 {canCancel(donation.donationDate || donation.createdAt) ? (
//                   <button
//                     className="cancel-btn"
//                     onClick={() => handleCancel(donation._id)}
//                   >
//                     Cancel
//                   </button>
//                 ) : (
//                   <span className="not-available">Expired</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Donation_History.css"; // Your CSS

// export default function Donation_History() {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;

//   useEffect(() => {
//     if (!userId) return;

//     axios
//       .get(`http://localhost:5000/api/donations/donor/${userId}`)
//       .then((res) => {
//         setDonations(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching donations:", err);
//         setLoading(false);
//       });
//   }, [userId]);

//   // Check if donation can be canceled (within 5 days)
//   const canCancel = (donationDate) => {
//     const now = new Date();
//     const donation = new Date(donationDate);
//     const diffDays = Math.floor((now - donation) / (1000 * 60 * 60 * 24));
//     return diffDays <= 5;
//   };

//   const handleCancel = (donationId) => {
//     if (window.confirm("Are you sure you want to cancel this donation?")) {
//       axios
//         .delete(`http://localhost:5000/api/donations/${donationId}`)
//         .then(() => {
//           setDonations((prev) => prev.filter((d) => d._id !== donationId));
//           alert("Donation cancelled successfully");
//         })
//         .catch((err) =>
//           alert(err.response?.data?.error || "Error cancelling donation")
//         );
//     }
//   };

//   if (loading) return <p>Loading donation history...</p>;
//   if (!userId) return <p>Please log in to see your donation history.</p>;

//   return (
//     <div className="donation-history-container">
//       <h1>Donation History</h1>
//       {donations.length === 0 ? (
//         <p>No donations yet.</p>
//       ) : (
//         <table className="donation-table">
//           <thead>
//             <tr>
//               <th>Campaign</th>
//               <th>NGO</th>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Amount / Details</th>
//               <th>Message</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donations.map((donation) => (
//               <tr key={donation._id}>
//                 <td>{donation.campaignId?.title || "N/A"}</td>
//                 <td>{donation.campaignId?.ngoId?.orgName || "N/A"}</td>
//                 <td>
//                   {new Date(
//                     donation.donationDate || donation.createdAt
//                   ).toLocaleDateString()}
//                 </td>
//                 <td>{donation.donationType || "N/A"}</td>
//                 <td>
//                   {donation.amount ? `$${donation.amount}` : donation.details || "-"}
//                 </td>
//                 <td>{donation.message || "-"}</td>
//                 <td>
//                   {canCancel(donation.donationDate || donation.createdAt) ? (
//                     <button
//                       className="action-btn cancel-btn"
//                       onClick={() => handleCancel(donation._id)}
//                     >
//                       Cancel
//                     </button>
//                   ) : (
//                     <span className="status-expired">Expired</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }












import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Donation_History.css"; // Your CSS

export default function Donation_History() {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/donations/donor/${userId}`)
      .then((res) => {
        setDonations(res.data);
        setFilteredDonations(res.data); // initial display
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donations:", err);
        setLoading(false);
      });
  }, [userId]);

  // Filter donations based on selected date
  useEffect(() => {
    if (!selectedDate) {
      setFilteredDonations(donations);
    } else {
      const filtered = donations.filter((donation) => {
        const donationDate = new Date(donation.donationDate || donation.createdAt);
        const selected = new Date(selectedDate);
        return (
          donationDate.getFullYear() === selected.getFullYear() &&
          donationDate.getMonth() === selected.getMonth() &&
          donationDate.getDate() === selected.getDate()
        );
      });
      setFilteredDonations(filtered);
    }
  }, [selectedDate, donations]);

  const canCancel = (donationDate) => {
    const now = new Date();
    const donation = new Date(donationDate);
    const diffDays = Math.floor((now - donation) / (1000 * 60 * 60 * 24));
    return diffDays <= 5;
  };

  const handleCancel = (donationId) => {
    if (window.confirm("Are you sure you want to cancel this donation?")) {
      axios
        .delete(`http://localhost:5000/api/donations/${donationId}`)
        .then(() => {
          setDonations((prev) => prev.filter((d) => d._id !== donationId));
          setFilteredDonations((prev) => prev.filter((d) => d._id !== donationId));
          alert("Donation cancelled successfully");
        })
        .catch((err) =>
          alert(err.response?.data?.error || "Error cancelling donation")
        );
    }
  };

  if (loading) return <p>Loading donation history...</p>;
  if (!userId) return <p>Please log in to see your donation history.</p>;

  return (
    <div className="donation-history-container">
      <h1>Donation History</h1>

      {/* Date Picker */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Select Date:{" "}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>
        {selectedDate && (
          <button
            style={{
              marginLeft: "10px",
              padding: "6px 10px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#0077cc",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => setSelectedDate("")}
          >
            Clear
          </button>
        )}
      </div>

      {filteredDonations.length === 0 ? (
        <p>No donations found for this date.</p>
      ) : (
        <table className="donation-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>NGO</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount / Details</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.campaignId?.title || "N/A"}</td>
                <td>{donation.campaignId?.ngoId?.orgName || "N/A"}</td>
                <td>
                  {new Date(
                    donation.donationDate || donation.createdAt
                  ).toLocaleDateString()}
                </td>
                <td>{donation.donationType || "N/A"}</td>
                <td>
                  {donation.amount ? `$${donation.amount}` : donation.details || "-"}
                </td>
                <td>{donation.message || "-"}</td>
                <td>
                  {canCancel(donation.donationDate || donation.createdAt) ? (
                    <button
                      className="action-btn cancel-btn"
                      onClick={() => handleCancel(donation._id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="status-expired">Expired</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
