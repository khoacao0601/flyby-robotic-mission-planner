// Copyright (c) 2026 Khoa Cao. All rights reserved.

import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { authAPI } from '../services/api';

export const Header: React.FC = () => {
  const { user, login } = useAuthStore();

  // Switch role between Admin and Pilot
   const switchRole = async (targetRole: 'ADMIN' | 'PILOT') => {
    try {
      const email = targetRole === 'ADMIN' ? 'admin@flyby.com' : 'pilot@flyby.com';
      const password = targetRole === 'ADMIN' ? 'admin123' : 'pilot123';
      
      const data = await authAPI.login(email, password);
      login(data.access_token, data.user);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // Auto-login as ADMIN on first load
  useEffect(() => {
    if (!user) {
      switchRole('ADMIN');
    }
  }, [user]);

  return (
    <header className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center border-b border-gray-700">
      {/* 1. App Title */}
      <h1 className="text-lg font-bold">Flyby Robotics Mission Planner</h1>

      {/* 2. User info and Role Switcher */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-300">
          User: <b>{user?.email || 'Loading...'}</b> ({user?.role || '...'})
        </span>

        <button
          onClick={() => switchRole('ADMIN')}
          disabled={user?.role === 'ADMIN'}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded"
        >
          Admin
        </button>

        <button
          onClick={() => switchRole('PILOT')}
          disabled={user?.role === 'PILOT'}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded"
        >
          Pilot
        </button>
      </div>
    </header>
  );
};