// Copyright (c) 2026 Khoa Cao. All rights reserved.

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useMissionStore } from '../store/useMissionStore';
import { missionAPI } from '../services/api';
import type { Mission } from '../types/missions';

export const Sidebar: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const { waypoints, clearWaypoint, setSelectedMission, selectedMission } = useMissionStore();

  const [missions, setMissions] = useState<Mission[]>([]);
  const [name, setName] = useState('');
  const [pilotId, setPilotId] = useState<number | null>(2);

  // 1. Fetch missions
  const fetchMissions = () => missionAPI.getMissions().then(setMissions).catch(console.error);

  useEffect(() => { fetchMissions(); }, [user]);

  // 2. Admin saves mission
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || waypoints.length < 2) return alert('Enter name and click >= 2 points on map');

    await missionAPI.createMission({
      name,
      horizontal_speed: 15,
      altitude_mode: 'RELATIVE_TO_TAKEOFF',
      flight_altitude: 50,
      assigned_to_id: pilotId,
      waypoints: waypoints.map((w) => ({ ...w, alt: 50 })),
    });

    setName('');
    clearWaypoint();
    fetchMissions();
  };

  // 3. Admin deletes mission
  const handleDelete = async (id: number) => {
    if (!confirm('Delete this mission?')) return;
    await missionAPI.deleteMission(id);
    if (selectedMission?.id === id) { setSelectedMission(null); clearWaypoint(); }
    fetchMissions();
  };

  return (
    <div className="absolute top-4 left-4 z-10 w-72 bg-gray-900 text-white p-3 rounded border border-gray-700 space-y-3 text-xs shadow-lg">
      {/* SECTION 1: Form for Mission (Only Admin) */}
      {user?.role === 'ADMIN' ? (
        <form onSubmit={handleSave} className="space-y-2 border-b border-gray-700 pb-3">
          <b className="text-blue-400 block uppercase">Plan Mission ({waypoints.length} pts)</b>
          <input
            placeholder="Mission Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 p-1.5 rounded border border-gray-600 outline-none"
          />
          <select
            value={pilotId || ''}
            onChange={(e) => setPilotId(e.target.value ? Number(e.target.value) : null)}
            className="w-full bg-gray-800 p-1.5 rounded border border-gray-600 outline-none"
          >
            <option value="">Unassigned</option>
            <option value="2">Pilot 1 (pilot1@flyby.com)</option>
            <option value="3">Pilot 2 (pilot2@flyby.com)</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 p-1.5 rounded font-medium">Save</button>
            <button type="button" onClick={clearWaypoint} className="bg-gray-700 hover:bg-gray-600 px-3 rounded">Clear</button>
          </div>
        </form>
      ) : (
        <p className="text-green-400 border-b border-gray-700 pb-2">Pilot Mode: View-Only</p>
      )}

      {/* SECTION 2: List Mission (Admin & Pilot) */}
      <div>
        <b className="text-gray-300 block mb-2 uppercase">Missions ({missions.length})</b>
        <div className="space-y-1.5 max-h-56 overflow-y-auto">
          {missions.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMission(m)}
              className={`p-2 rounded border cursor-pointer flex justify-between items-center ${
                selectedMission?.id === m.id ? 'bg-blue-900 border-blue-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
              }`}
            >
              <div>
                <div className="font-semibold text-white">{m.name}</div>
                <div className="text-[10px] text-gray-400">{m.waypoints.length} pts • {m.assigned_to_id ? 'Assigned' : 'Unassigned'}</div>
              </div>
              {/* Delete button */}
              {user?.role === 'ADMIN' && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }}
                  className="text-red-400 hover:text-red-200 font-bold px-1.5 py-0.5 rounded"
                  title="Delete"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};