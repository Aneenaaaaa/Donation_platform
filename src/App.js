
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NgoLoginForm from './components/ngologin';
import LoginForm from './components/loginform';
import NgoRegisterForm from './components/ngoregister';
import AdminLoginForm from './components/adminlogin';
import RegisterForm from './components/registerform';
import LiveChat from './components/LiveChat';
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={< RegisterForm />} />
        <Route path="/ngologin" element={<NgoLoginForm />} />
        <Route path="/ngoregister" element={< NgoRegisterForm />} />
        <Route path="/admin" element={< AdminLoginForm />} />
        <Route path="/chat" element={<LiveChat />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
