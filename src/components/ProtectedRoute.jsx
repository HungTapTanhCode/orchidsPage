import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Chỉ cho member đã login (mọi user)
export const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Chỉ cho Admin
export const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;
  return children;
};

// Không cho vào Login nếu đã đăng nhập
export const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (user) return <Navigate to={user.isAdmin ? '/dashboard' : '/'} replace />;
  return children;
};
