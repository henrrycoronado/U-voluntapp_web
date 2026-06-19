import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationPickerMapProps {
  initialPosition?: [number, number];
  onLocationSelect?: (lat: number, lng: number) => void;
  radius?: number;
  readOnly?: boolean;
}

const LocationMarker = ({ position, setPosition, onSelect, readOnly }: any) => {
  useMapEvents({
    click(e) {
      if (readOnly) return;
      setPosition([e.latlng.lat, e.latlng.lng]);
      if (onSelect) onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({ initialPosition, onLocationSelect, radius, readOnly = false }) => {
  const [position, setPosition] = useState<[number, number] | null>(initialPosition || [-16.5231, -68.1123]);

  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden border border-white/10 shadow-lg relative z-0">
      <MapContainer center={position || [-16.5231, -68.1123]} zoom={14} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} onSelect={onLocationSelect} readOnly={readOnly} />
        {position && radius && <Circle center={position} radius={radius} pathOptions={{ color: '#EAB308', fillColor: '#EAB308', fillOpacity: 0.2 }} />}
      </MapContainer>
    </div>
  );
};
