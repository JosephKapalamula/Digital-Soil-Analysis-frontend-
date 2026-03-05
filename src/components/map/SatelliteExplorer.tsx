"use client";
import { MapContainer, TileLayer, Marker, Rectangle, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

// Professional Custom Icon (A sleek GPS target)
const targetIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2555/2555572.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function SatelliteExplorer({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [bounds, setBounds] = useState<[number, number][] | null>(null);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        
        // 10m Sentinel-2 Pixel Geometry (approx 0.00009 degrees)
        const size = 0.000045; 
        setBounds([
          [lat - size, lng - size],
          [lat + size, lng + size],
        ]);
        
        onLocationSelect(lat, lng);
      },
    });
    return null;
  };

  return (
    <MapContainer 
      center={[-13.96, 33.77]} // Centered on Lilongwe
      zoom={14} 
      className="h-full w-full grayscale-[0.2] contrast-[1.1]"
      zoomControl={false} // We will add custom controls later for a cleaner UI
    >
      {/* High-Res Esri Satellite Imagery */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; Esri &mdash; Source: Esri'
      />

      {/* 2. REPLACE THE STAMEN LAYER WITH THIS */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        opacity={0.8} // A bit higher opacity makes the names crisp
      />
      <MapEvents />

      {position && bounds && (
        <>
          <Rectangle 
            bounds={bounds} 
            pathOptions={{ 
                color: '#10b981', 
                weight: 1, 
                fillColor: '#10b981', 
                fillOpacity: 0.4,
                className: "animate-pulse" // Visual flair
            }} 
          />
          <Marker position={position} icon={targetIcon} />
        </>
      )}
    </MapContainer>
  );
}