import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "./Map.css"

interface MapProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  markers: { lat: number; lng: number }[];
}

const Map: React.FC<MapProps> = ({ onLocationSelect, markers }) => {
  const initialCenter: L.LatLngExpression = [0, 0];
  const initialZoom: number = 2;
  const minZoom: number = 2.4;
  const maxZoom: number = 18;
  const bounds: L.LatLngBounds = L.latLngBounds(
    L.latLng(-89.98155760646617, -180),
    L.latLng(89.99346179538875, 180)
  );

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        onLocationSelect({ lat, lng });
      }
    });

    return null;
  };


  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div class="pin"></div><div class="label">🏴‍☠️</div>',
  });

  return (
    <div className="map-container">
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        style={{ height: '100%', width: '100%' }}
        maxBounds={bounds}
        worldCopyJump={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon} />
        ))}
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default Map;















