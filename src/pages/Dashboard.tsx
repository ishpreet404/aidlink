'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Battery, Signal, User } from 'lucide-react';
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
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    fixLeafletIcon();

    // Parse the data and update state
    const { latitude, longitude, rssi, userDetails } = parseData(locationData);

    // Check if data has changed
    if (latitude !== 0 || longitude !== 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000); // Hide alert after 5 seconds
    }

    setLatitude(latitude);
    setLongitude(longitude);
    setRssi(rssi);
    setUserDetails(userDetails);
  }, [locationData]);

  return (
    <div className="space-y-6 p-6 text-white">
      {/* Alert Header */}
      {showAlert && (
        <div className="flex items-center justify-between bg-red-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-6 w-6" />
            <h2 className="text-lg font-semibold">Emergency Alert: New Data Received!</h2>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 h-96">
          <MapContainer center={[latitude, longitude]} zoom={15} className="h-full w-full rounded-lg shadow-lg">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>, USGS, NOAA'
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
        <div className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <User className="h-6 w-6 text-blue-400" />
            <span>User Details</span>
          </h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> {userDetails.split(',')[0]}</p>
            <p><strong>Latitude:</strong> {latitude}</p>
            <p><strong>Longitude:</strong> {longitude}</p>
            <p><strong>RSSI:</strong> {rssi}</p>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Battery Status</h3>
          <p className="text-green-400">Battery is healthy and operational.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Signal Strength</h3>
          <p className="text-blue-400">RSSI: {rssi}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Last Update</h3>
          <p>{new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
