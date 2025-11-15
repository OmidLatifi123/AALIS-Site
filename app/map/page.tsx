"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";

export interface Detection {
  id: number;
  lat: number;
  lng: number;
  time: string;
}

export interface Triangulation {
  id: number;
  points: [number, number][];
  centroid: [number, number];
}

// Dynamically import the map component with SSR disabled
const MapComponent = dynamic(() => import("../../components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center rounded-lg">
      <div className="text-white text-xl">Loading map...</div>
    </div>
  ),
});

export default function MapPage() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [triangulations, setTriangulations] = useState<Triangulation[]>([]);

  // Ottawa coordinates
  const center: [number, number] = [45.4215, -75.6996];

  // Add random detections every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const latOffset = (Math.random() - 0.5) * 0.02;
      const lngOffset = (Math.random() - 0.5) * 0.02;

      setDetections((prev) => [
        ...prev.slice(-10), // keep last 10
        {
          id: Date.now(),
          lat: center[0] + latOffset,
          lng: center[1] + lngOffset,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Triangulate every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (detections.length >= 3) {
        const last3 = detections.slice(-3);
        const points: [number, number][] = last3.map((d) => [d.lat, d.lng]);
        const centroid: [number, number] = [
          points.reduce((sum, p) => sum + p[0], 0) / points.length,
          points.reduce((sum, p) => sum + p[1], 0) / points.length,
        ];
        setTriangulations((prev) => [
          ...prev.slice(-3),
          { id: Date.now(), points, centroid },
        ]);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [detections]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8 mt-15">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Drone Detection System
          </h1>
          <p className="text-gray-400">
            Real-time monitoring and triangulation • Ottawa, ON
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Active Detections</div>
            <div className="text-3xl font-bold text-red-500">{detections.length}</div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Triangulations</div>
            <div className="text-3xl font-bold text-blue-500">{triangulations.length}</div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">System Status</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xl font-semibold text-white">Online</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Live Detection Map</h2>
          <div className="h-[600px] rounded-lg overflow-hidden border border-gray-700">
            <MapComponent
              center={center}
              detections={detections}
              triangulations={triangulations}
            />
          </div>
        </div>

        {/* Recent Detections */}
        {detections.length > 0 && (
          <div className="mt-8 bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Detections</h2>
            <div className="space-y-2">
              {detections.slice(-5).reverse().map((detection) => (
                <div
                  key={detection.id}
                  className="flex items-center justify-between bg-gray-900 bg-opacity-50 p-3 rounded border border-gray-700"
                >
                  <div className="text-gray-300">
                    <span className="font-mono text-sm">
                      {detection.lat.toFixed(4)}, {detection.lng.toFixed(4)}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm">{detection.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}