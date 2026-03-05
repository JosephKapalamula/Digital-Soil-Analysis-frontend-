"use client";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

// Professional fix for Leaflet icons in Next.js
// This ensures the icon works regardless of your public folder setup
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function SoilMap({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) {
  const [position, setPosition] = useState<[number, number]>([-13.25, 34.30]); 

  // MapEvents nested component
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onLocationSelect(lat, lng);
      },
    });
    return null;
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl border-4 border-white shadow-2xl z-0">
      <MapContainer 
        center={position} 
        zoom={7} 
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        <Marker position={position} icon={customIcon}>
          <Popup className="font-sans">
            <div className="text-center">
              <p className="font-bold m-0">Target Location</p>
              <span className="text-xs text-slate-500">{position[0].toFixed(4)}, {position[1].toFixed(4)}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}