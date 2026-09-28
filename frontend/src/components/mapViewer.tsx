// Copyright (c) 2026 Khoa Cao. All rights reserved.

import React from 'react';
import DeckGL from 'deck.gl';
import { PathLayer, ScatterplotLayer } from 'deck.gl';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useAuthStore } from '../store/useAuthStore';
import { useMissionStore } from '../store/useMissionStore';
import type { Waypoint } from '../types/missions';


const INITIAL_VIEW = {
    longitude: -118.2437,
    latitude: 34.0522,
    zoom: 14,
    pitch: 45,
    bearing: 0
};


export const MapViewer: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const waypoints = useMissionStore((state) => state.waypoints);
    const addWaypoint = useMissionStore((state) => state.addWayPoint);

    const handleMapClick = (info: any) => {
        if(user?.role !== "ADMIN"){
            return;
        }

        if(info.coordinate) {
            const [lng, lat] = info.coordinate;

            addWaypoint({
                lng,
                lat,
                alt: 50
            })
        }
    };

    // Deck.gl Layer, 3D Flight Path
    const flightPathLayer = new PathLayer({
        id: 'flight-path-3d',
        data: waypoints.length >= 2 ? [{ path: waypoints.map((w) => [w.lng, w.lat, w.alt]) }] : [],
        getPath: (d: any) => d.path,
        getColor: [0, 240, 255, 230],
        widthMinPixels: 4,
        jointRounded: true,
        capRounded: true
    })

    // Deck.gl layer: waypoint Markers
    const wayPointLayer = new ScatterplotLayer({
        id: 'waypoint-spheres',
        data: waypoints,
        getPosition: (d: Waypoint) => [d.lng, d.lat, d.alt],
        getFillColor: [255, 255, 255, 255],
        getRadius: 6,
        radiusMinPixels: 6,
        radiusMaxPixels: 12,
    })

    // Deck.gl layer, vertical lines down to ground
    const dropLinesLayer = new PathLayer({
        id: 'altitude-drop-lines',
        data: waypoints.map((w) => ({
        path: [
            [w.lng, w.lat, 0], 
            [w.lng, w.lat, w.alt], 
        ],
        })),
        getPath: (d: any) => d.path,
        getColor: [250, 204, 21, 200],
        widthMinPixels: 2,
    });

    return (
        <div className="relative w-full h-full min-h-screen bg-slate-950">
        <DeckGL
            initialViewState={INITIAL_VIEW}
            controller={true}
            layers={[dropLinesLayer, flightPathLayer, wayPointLayer]}
            onClick={handleMapClick}
            getCursor={() => (user?.role === 'ADMIN' ? 'crosshair' : 'default')}
        >
            <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            attributionControl={false}
            />
        </DeckGL>
        </div>
    );
}