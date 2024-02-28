import React, { useState} from 'react';
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import leafIcon from '../Images/leaf-red.png';
import leafShadow from '../Images/leaf-shadow.png';

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
  iconUrl: leafIcon,
  shadowUrl: leafShadow,

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
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










