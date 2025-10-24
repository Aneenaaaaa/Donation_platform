import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar/Navbar';
import WeeklyDonationsBar from "../components/WeeklyDonationsBar";
import DonationTypePie from "../components/DonationTypePie";
import './AdminDashboard.css';

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
    <div className="dashboard-container">
     

      <h2 className="dashboard-title">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Donations</h3>
          <p>{stats.totalDonations}</p>
        </div>
        <div className="stat-card">
          <h3>Active Campaigns</h3>
          <p>{stats.activeCampaigns}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-box">
          <h3>Weekly Donations</h3>
          <WeeklyDonationsBar />
        </div>

        <div className="chart-box">
          <h3>Donations by Type</h3>
          <DonationTypePie />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
