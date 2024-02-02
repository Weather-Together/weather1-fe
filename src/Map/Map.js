// import React from 'react';
// import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// const MapClickHandler = () => {
//   useMapEvent('click', (e) => {
//     const { lat, lng } = e.latlng;
//     alert(`Latitude: ${lat}, Longitude: ${lng}`);  //message to user
//   });

//   return null; // Component does not render anything
// };


// function Map({}) {
//     const initialCenter = [0, 0];
//     const initialZoom = 2; // You might increase this slightly
//     const minZoom = 2.4; // Set minimum zoom level to prevent too much zooming out
//     const maxZoom = 18; // Set maximum zoom level
  
//     const southWest = L.latLng(-89.98155760646617, -180);
//     const northEast = L.latLng(89.99346179538875, 180);
//     const bounds = L.latLngBounds(southWest, northEast);
  
//     return (
//       <MapContainer 
//         center={initialCenter} 
//         zoom={initialZoom} 
//         minZoom={minZoom}
//         maxZoom={maxZoom}
//         style={{ height: '100vh', width: '100%' }} 
//         maxBounds={bounds}
//         worldCopyJump={true}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//         />
//         <MapClickHandler />
//       </MapContainer>
//     );
//   };

//   export default Map;