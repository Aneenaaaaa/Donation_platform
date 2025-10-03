
















import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DonationFormPage.css';

const DonationFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const campaign = location.state?.campaign;

  const user = JSON.parse(localStorage.getItem("user")); // current user

  const [donationType, setDonationType] = useState("money");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [form, setForm] = useState({
    donorName: user?.username || "",
    donorEmail: user?.email || "",
    donorPhone: user?.phone || "",
    donorAddress: "",
    amount: "",
    paymentMethod: "",
    transactionId: "",
    details: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/donations", {
        donorId: user._id,
        campaignId: campaign._id,
        donorName: form.donorName,
        donorEmail: form.donorEmail,
        donorPhone: form.donorPhone,
        donorAddress: form.donorAddress,
        donationType,
        amount: donationType === "money" ? form.amount : null,
        paymentMethod: donationType === "money" ? form.paymentMethod : null,
        transactionId: donationType === "money" ? form.transactionId : null,
        details: donationType !== "money" ? form.details : null,
        message: form.message,
        isAnonymous
      });

      alert("✅ Thank you for your donation!");
      navigate("/donation_history"); // go to history page
    } catch (err) {
      console.error("Donation error:", err);
      alert("❌ Something went wrong while donating.");
    }
  };

  if (!campaign) return <p>No campaign selected.</p>;

  return (
    <div className="donation-form-page">
      <h2>Donate to: {campaign.title}</h2>
      <form onSubmit={handleSubmit}>
        <h3>Donor Information</h3>
        <input name="donorName" value={form.donorName} onChange={handleChange} placeholder="Your Name" required={!isAnonymous} disabled={isAnonymous} />
        <input name="donorEmail" value={form.donorEmail} onChange={handleChange} placeholder="Your Email" required={!isAnonymous} disabled={isAnonymous} />
        <input name="donorPhone" value={form.donorPhone} onChange={handleChange} placeholder="Phone Number" />
        <input name="donorAddress" value={form.donorAddress} onChange={handleChange} placeholder="Address" />

        <label>
          <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
          Donate Anonymously
        </label>

        <h3>Donation Details</h3>
        {["money", "books", "clothes", "food", "other"].map((type) => (
          <label key={type}>
            <input type="radio" value={type} checked={donationType === type} onChange={(e) => setDonationType(e.target.value)} />
            {type}
          </label>
        ))}

        {donationType === "money" ? (
          <>
            <input name="amount" value={form.amount} onChange={handleChange} type="number" placeholder="Amount (₹)" required />
            <input name="paymentMethod" value={form.paymentMethod} onChange={handleChange} placeholder="Payment Method" required />
            <input name="transactionId" value={form.transactionId} onChange={handleChange} placeholder="Transaction ID" required />
          </>
        ) : (
          <input name="details" value={form.details} onChange={handleChange} placeholder={`Details about ${donationType}`} required />
        )}

        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message (optional)" />

        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default DonationFormPage;
