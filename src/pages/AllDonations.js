import React, { useEffect, useState } from "react";


function AllDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/donations")
      .then(res => res.json())
      .then(data => setDonations(data))
      .catch(err => console.error("Error fetching donations:", err));
  }, []);

  return (
    <div className="main-container">
      <h2>All Donations</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Transaction ID</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map(d => (
                <tr key={d._id}>
                  <td>{d.isAnonymous ? "Anonymous" : d.donorName}</td>
                  <td>{d.donorEmail}</td>
                  <td>{d.donorPhone || "-"}</td>
                  <td>{d.donationType}</td>
                  <td>₹{d.amount}</td>
                  <td>{d.paymentMethod || "-"}</td>
                  <td>{d.transactionId || "-"}</td>
                  <td>{d.message || "-"}</td>
                  <td>{new Date(d.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No donations found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDonations;
