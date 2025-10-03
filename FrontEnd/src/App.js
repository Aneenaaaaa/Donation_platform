



import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Campaigns from "./Components/Campaigns";

import Profile from "./pages/Profile";
import Donate from "./pages/Donate";
import Donation_History from "./pages/Donation_History";
import DonationFormPage from "./pages/DonationFormPage";
import LoginForm from "./pages/Donor_login";
import RegisterForm from "./pages/Donor_register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {/* Navbar always visible for logged-in users */}
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Public Routes: Login/Register */}
        {!isLoggedIn && (
          <>
            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Protected Routes: Home, Profile, Donate, etc. */}
        {isLoggedIn && (
          <>
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
            <Route
              path="/donate-campaigns"
              element={<Campaigns showSearch={true} />}
            />
            <Route path="/donation-form" element={<DonationFormPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;










