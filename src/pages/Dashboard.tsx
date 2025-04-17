'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Battery, Signal } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import locationData from '../data.json';

// Fix Leaflet marker icons
const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

// Component to update map view dynamically
const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng]);
  return null;
};

// Parse data.json to extract coordinates, RSSI, and user details
const parseData = (data: any[]) => {
  let latitude: number | null = null;
  let longitude: number | null = null;
  let rssi: number | null = null;
  let userDetails = '';

  data.forEach((entry) => {
    if (entry.value.startsWith('Latitude')) {
      const coords = entry.value.match(/Latitude: (-?[\d.]+), Longitude: (-?[\d.]+)/);
      if (coords) {
        latitude = parseFloat(coords[1]);
        longitude = parseFloat(coords[2]);
      }
    } else if (entry.value.startsWith('Name')) {
      userDetails = entry.value;
    } else if (!isNaN(parseInt(entry.value))) {
      rssi = parseInt(entry.value);
    }
  });

  // Fallback values
  if (latitude === null || longitude === null) {
    console.warn('Coordinates not found. Using default values.');
    latitude = 0;
    longitude = 0;
  }

  return { latitude, longitude, rssi: rssi || 0, userDetails };
};

const Dashboard = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [rssi, setRssi] = useState<number>(0);
  const [userDetails, setUserDetails] = useState<string>('');

  useEffect(() => {
    fixLeafletIcon();

    const { latitude, longitude, rssi, userDetails } = parseData(locationData);
    setLatitude(latitude);
    setLongitude(longitude);
    setRssi(rssi);
    setUserDetails(userDetails);
  }, []);

  return (
    <div className="space-y-6 p-6 text-white">
      {/* Alert Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-red-500 animate-pulse" />
          <h2 className="text-xl font-semibold text-red-500">Emergency Alert</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Battery className="h-5 w-5 text-green-400" />
            <span>Battery: 85%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Signal className="h-5 w-5 text-blue-400" />
            <span>RSSI: {rssi}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Section */}
        <div className="h-96">
          <MapContainer center={[latitude, longitude]} zoom={15} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]}>
              <Popup>
                <div>
                  <p><strong>Location:</strong> {latitude}, {longitude}</p>
                  <p><strong>RSSI:</strong> {rssi}</p>
                  <p><strong>User:</strong> {userDetails}</p>
                </div>
              </Popup>
            </Marker>
            <RecenterMap lat={latitude} lng={longitude} />
          </MapContainer>
        </div>

        {/* User Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">User Details</h3>
          <div className="p-4 bg-gray-800 rounded-lg shadow space-y-2">
            <p>{userDetails}</p>
            <p><strong>Latitude:</strong> {latitude}</p>
            <p><strong>Longitude:</strong> {longitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
