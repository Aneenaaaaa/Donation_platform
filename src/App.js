// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NgoLoginForm from './components/ngologin';
import LoginForm from './components/loginform';
import NgoRegisterForm from './components/ngoregister';
import AdminLoginForm from './components/adminlogin';
import RegisterForm from './components/registerform';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/registerform" element={< RegisterForm />} />
        <Route path="/ngologin" element={<NgoLoginForm />} />
        <Route path="/register" element={< NgoRegisterForm />} />
        <Route path="/adminlogin" element={< AdminLoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
