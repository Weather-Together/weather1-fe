import React, { useState} from 'react';
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import customMarkerIcon from '../Images/marker-icon.png';

interface MapProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}


const Map: React.FC<MapProps> = ({ onLocationSelect }) => {
  const initialCenter: L.LatLngExpression = [0, 0];
  const initialZoom: number = 2;
  const minZoom: number = 2.4;
  const maxZoom: number = 18;
  const bounds: L.LatLngBounds = L.latLngBounds(
    L.latLng(-89.98155760646617, -180),
    L.latLng(89.99346179538875, 180)
  );

const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

const customMarker = L.icon({
  iconUrl: customMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapClickHandler: React.FC<MapProps> = ({ onLocationSelect }) => {
  useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng;
    alert(`Selected Location - Latitude: ${lat.toFixed(2)}, Longitude: ${lng.toFixed(2)}`);
    onLocationSelect({ lat, lng });
    setMarkers([]);
    setMarkers([{ lat, lng }]);
  });

  return null;
};



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
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onLocationSelect={onLocationSelect} />
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={[marker.lat, marker.lng]} 
            icon={customMarker}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;










