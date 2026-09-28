// Copyright (c) 2026 Khoa Cao. All rights reserved.

import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { authAPI } from '../services/api';

export const Header: React.FC = () => {
  const { user, login } = useAuthStore();

  // Switch role between Admin and Pilot
   const switchRole = async (email: string, pass: string) => {
    try {
      const data = await authAPI.login(email, pass);
      login(data.access_token, data.user);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // Auto-login as ADMIN on first load
  useEffect(() => {
    if (!user) {
      switchRole('admin@flyby.com', 'admin123');
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
          onClick={() => switchRole('admin@flyby.com', 'admin123')}
          disabled={user?.email === 'admin@glyby.com'}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded"
        >
          Admin
        </button>

        <button
          onClick={() => switchRole('pilot1@flyby.com', 'pilot123')}
          disabled={user?.email === 'pilot1@flyby.com'}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded"
        >
          Pilot1
        </button>

        <button
          onClick={() => switchRole('pilot2@flyby.com', 'pilot123')}
          disabled={user?.email === 'pilot2@flyby.com'}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded"
        >
          Pilot2
        </button>
      </div>
    </header>
  );
};