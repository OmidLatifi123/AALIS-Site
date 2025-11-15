"use client";

import React, { useEffect, useRef } from "react";

interface Detection {
  id: number;
  lat: number;
  lng: number;
  time: string;
}

interface Triangulation {
  id: number;
  points: [number, number][];
  centroid: [number, number];
}

interface MapComponentProps {
  center: [number, number];
  detections?: Detection[];
  triangulations?: Triangulation[];
}

export default function MapComponent({ 
  center, 
  detections = [], 
  triangulations = [] 
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const circlesRef = useRef<any[]>([]);
  const polygonsRef = useRef<any[]>([]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Dynamic import of Leaflet
    const initMap = async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current || mapInstanceRef.current) return;

      // Ensure center is valid
      const validCenter: [number, number] = center && center.length === 2 
        ? [center[0], center[1]] 
        : [45.4215, -75.6996];

      // Initialize map
      const map = L.map(mapRef.current, {
        center: validCenter,
        zoom: 13,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when detections change
  useEffect(() => {
    if (!mapInstanceRef.current || typeof window === "undefined") return;

    const updateMarkers = async () => {
      const L = (await import("leaflet")).default;

      // Clear old markers and circles
      markersRef.current.forEach((m) => m.remove());
      circlesRef.current.forEach((c) => c.remove());
      markersRef.current = [];
      circlesRef.current = [];

      // Custom drone icon
      const droneIcon = L.divIcon({
        className: "custom-drone-icon",
        html: '<div style="width:16px; height:16px; border-radius:50%; background:#ef4444; box-shadow:0 0 15px #ef4444; border: 2px solid white;"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      // Add new markers
      detections.forEach((d) => {
        const circle = L.circle([d.lat, d.lng], {
          color: "#ef4444",
          fillColor: "#ef4444",
          fillOpacity: 0.15,
          radius: 150,
          weight: 2,
          dashArray: "5, 5",
        }).addTo(mapInstanceRef.current);

        const marker = L.marker([d.lat, d.lng], { icon: droneIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="font-family: monospace; font-size: 12px;">
              <strong style="color: #dc2626;">🔊 DRONE SOUND DETECTED</strong><br/>
              <span style="color: #666;">Time:</span> ${d.time}<br/>
              <span style="color: #666;">Lat:</span> ${d.lat.toFixed(4)}<br/>
              <span style="color: #666;">Lng:</span> ${d.lng.toFixed(4)}
            </div>
          `);

        markersRef.current.push(marker);
        circlesRef.current.push(circle);
      });
    };

    updateMarkers();
  }, [detections]);

  // Update triangulations when they change
  useEffect(() => {
    if (!mapInstanceRef.current || typeof window === "undefined") return;

    const updateTriangulations = async () => {
      const L = (await import("leaflet")).default;

      // Clear old polygons
      polygonsRef.current.forEach((p) => p.remove());
      polygonsRef.current = [];

      // Triangulation icon
      const triangulationIcon = L.divIcon({
        className: "custom-triangulation-icon",
        html: '<div style="background:#eab308;border-radius:50%;width:20px;height:20px;box-shadow:0 0 20px #eab308;border:3px solid white;"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      // Add new triangulations
      triangulations.forEach((t) => {
        const polygon = L.polygon(t.points, {
          color: "#eab308",
          weight: 3,
          dashArray: "10 5",
          fillColor: "#eab308",
          fillOpacity: 0.1,
        }).addTo(mapInstanceRef.current);

        const marker = L.marker(t.centroid, { icon: triangulationIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="font-family: monospace; font-size: 12px;">
              <strong style="color: #ca8a04;">⚠️ ESTIMATED DRONE LOCATION</strong><br/>
              <span style="color: #666;">Lat:</span> ${t.centroid[0].toFixed(4)}<br/>
              <span style="color: #666;">Lng:</span> ${t.centroid[1].toFixed(4)}<br/>
              <span style="color: #999; font-size: 10px;">Triangulated from 3 detection points</span>
            </div>
          `);

        polygonsRef.current.push(polygon);
        polygonsRef.current.push(marker);
      });
    };

    updateTriangulations();
  }, [triangulations]);

  return <div ref={mapRef} className="h-full w-full" />;
}