import React from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapClickHandler = ({ onLocationSelect }) => {
    useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng;
        alert(`Selected Location - Latitude: ${lat.toFixed(2)}, Longitude: ${lng.toFixed(2)}`);
        onLocationSelect({ lat, lng });
    });

    return null;
};

function Map({ onLocationSelect }) {
    
    const initialCenter = [0, 0];
    const initialZoom = 2;
    const minZoom = 2.4;
    const maxZoom = 18;
    const bounds = L.latLngBounds(
        L.latLng(-89.98155760646617, -180),
        L.latLng(89.99346179538875, 180)
    );

    return (
        <div className="map-container">
            <MapContainer
                center={initialCenter}
                zoom={initialZoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                style={{ height: '100%', width: '100%' }}
                maxBounds={bounds}
                worldCopyJump={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                />
                <MapClickHandler onLocationSelect={onLocationSelect} />
            </MapContainer>
        </div>
    );
}

export default Map;

