// AuthLayout.jsx - Enhanced
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50">
      {children}
    </div>
  );
};

export default AuthLayout;
