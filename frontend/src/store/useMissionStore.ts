// Copyright (c) 2026 Khoa Cao. All rights reserved.

import { create } from 'zustand';
import type { Mission, Waypoint } from '../types/missions';

interface MissionStore {
    waypoints: Waypoint[];
    selectedMission: Mission | null;
    addWayPoint: ( point: Waypoint ) => void;
    clearWaypoint: () => void;
    setSelectedMission: (mission: Mission | null) => void;
}


export const useMissionStore = create<MissionStore>(
    (set) => ({
        waypoints: [],
        selectedMission: null,

        // add 1 point to list when click on map
        addWayPoint: (point) => set((state) => ({ waypoints: [...state.waypoints, point] })),

        // Reset all points
        clearWaypoint: () => set({ waypoints: [] }),

        // Pick 1 mission from list
        setSelectedMission: (mission) => set({
            selectedMission: mission,
            waypoints: mission ? mission.waypoints : [],
        })
    })
)

