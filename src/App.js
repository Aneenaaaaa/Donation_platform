import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CreateCampaignPage from './components/CreateCampaignPage';
import MyCampaignsPage from './components/MyCampaignsPage';
import CampaignAnalyticsPage from './components/CampaignAnalyticsPage';
import './App.css';  // Make sure to create this file for styles below

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-button active" : "nav-button"} 
          end
        >
          Create
        </NavLink>
        <NavLink 
          to="/my-campaigns" 
          className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}
        >
          My Campaigns
        </NavLink>
        <NavLink 
          to="/analytics" 
          className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}
        >
          Analytics
        </NavLink>
      </nav>

      <div className="page-container">
        <Routes>
          <Route path="/" element={<CreateCampaignPage />} />
          <Route path="/my-campaigns" element={<MyCampaignsPage />} />
          <Route path="/analytics" element={<CampaignAnalyticsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
