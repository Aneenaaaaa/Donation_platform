import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Campaigns from './Components/Campaigns';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Donate from './pages/Donate';
import Donation_History from './pages/Donation_History';
import DonatePage from './pages/DonatePage'; // ✅ New page for selecting campaign & form
import DonationFormPage from './pages/DonationFormPage';



function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Campaigns />
              
            </>
          }
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donation_history" element={<Donation_History />} />

        {/* New donate page with campaign search and donation form */}
        <Route path="/donate-campaigns" element={<DonatePage />} />
        <Route path="/donation-form" element={<DonationFormPage />} />
        

        
      </Routes>
    </Router>
  );
}

export default App;
