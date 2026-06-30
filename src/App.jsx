import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Natural from './pages/Natural';
import About from './pages/About/About';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { AdminRoute, ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: 0, margin: 0 }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, padding: 0, margin: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/natural" element={<Natural />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          {/* Profile — mọi user đã login */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* Dashboard chỉ dành cho Admin */}
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Box>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </Box>
  );
}

export default App;
