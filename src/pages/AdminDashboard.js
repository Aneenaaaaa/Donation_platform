import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar/Navbar';


function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    activeCampaigns: 0
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching dashboard stats:", err));
  }, []);

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <p><strong>Total Users:</strong> {stats.totalUsers}</p>
      <p><strong>Total Donations:</strong> ₹{stats.totalDonations}</p>
      <p><strong>Active Campaigns:</strong> {stats.activeCampaigns}</p>
    </div>
  );
}

export default AdminDashboard;


