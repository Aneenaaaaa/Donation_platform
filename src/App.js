import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//
//import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import CampaignApproval from './pages/CampaignApproval';
import AllDonations from './pages/AllDonations';
import NGOUserManagement from './pages/NGOUserManagement';
import ReportsCharts from './pages/ReportsCharts';

import Navbar from './components/Navbar/Navbar';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Navbar />  
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/campaigns" element={<CampaignApproval />} />
          <Route path="/donations" element={<AllDonations />} />
          <Route path="/ngousers" element={<NGOUserManagement />} />
          <Route path="/reports" element={<ReportsCharts />} />
        </Routes>
      </div>
  </BrowserRouter>
  );
}

export default App;
