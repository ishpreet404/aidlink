'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Radio, Battery, Signal, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import locationData from '../data/data.json';

// Interface definitions
interface LocationPoint {
  timestamp: string;
  latitude: number;
  longitude: number;
}

interface User {
  name: string;
  age: number;
  team: string;
  medicalData: string;
}

interface DeviceInfo {
  id: string;
  location: { lat: number; lng: number };
  baseStation: { lat: number; lng: number };
  battery: number;
  rssi: number;
  distance: string;
  lastUpdate: string;
  user: User;
}

interface LogEntry {
  timestamp: string;
  event: string;
  type: string;
}

const DTU_COORDINATES = {
  lat: 28.750059,
  lng: 77.1104783
};

const sampleDevice = {
  id: "Device-001",
  location: { lat: 28.750059, lng: 77.1104783 },
  baseStation: { lat: 28.7515, lng: 77.113 },
  battery: 85,
  rssi: -65,
  distance: "0.5 km",
  lastUpdate: "5 min ago",
  user: {
    name: "John Doe",
    age: 32,
    team: "Alpha",
    medicalData: "No known conditions"
  }
};

// Fix Leaflet marker icons
const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

// Calculate distance between two points
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance.toFixed(2) + " km";
};

// Format time difference
const getTimeDifference = (timestamp: string): string => {
  const now = new Date();
  const dataTime = new Date(timestamp);
  const diffMs = now - dataTime;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins === 1) return "1 min ago";
  return `${diffMins} mins ago`;
};

const Dashboard = () => {
  const [activeDevice, setActiveDevice] = useState<DeviceInfo>(sampleDevice);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [locationHistory, setLocationHistory] = useState<LocationPoint[]>([]);
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0);

  useEffect(() => {
    fixLeafletIcon();

    // Process location data from JSON file
    if (locationData && locationData.length > 0) {
      setLocationHistory(locationData as LocationPoint[]);
      
      // Create initial logs from the data
      const initialLogs = (locationData as LocationPoint[]).slice(-10).reverse().map((point) => ({
        timestamp: point.timestamp,
        event: `Location updated: ${point.latitude.toFixed(4)}, ${point.longitude.toFixed(4)}`,
        type: 'info'
      }));
      
      setLogs(initialLogs);
      
      // Set initial device location from the most recent data point
      const latestPoint = locationData[locationData.length - 1] as LocationPoint;
      updateDeviceWithLocationData(latestPoint);
    }
  }, []);

  // Function to update device with location data
  const updateDeviceWithLocationData = (point: LocationPoint): void => {
    const distance = calculateDistance(
      DTU_COORDINATES.lat,
      DTU_COORDINATES.lng,
      point.latitude,
      point.longitude
    );
    
    const timeDiff = getTimeDifference(point.timestamp);
    
    setActiveDevice(prev => ({
      ...prev,
      location: { lat: point.latitude, lng: point.longitude },
      distance: distance,
      lastUpdate: timeDiff
    }));
  };

  useEffect(() => {
    // Update location data at intervals
    const interval = setInterval(() => {
      if (locationHistory.length > 0) {
        const nextIndex = (currentLocationIndex + 1) % locationHistory.length;
        const point = locationHistory[nextIndex];
        
        updateDeviceWithLocationData(point);
        
        const newLog = {
          timestamp: new Date().toISOString(),
          event: `Location updated: ${point.latitude.toFixed(4)}, ${point.longitude.toFixed(4)}`,
          type: 'info'
        };

        setLogs(prev => [newLog, ...prev].slice(0, 10));
        setCurrentLocationIndex(nextIndex);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [locationHistory, currentLocationIndex]);

  const pathCoordinates = [
    [activeDevice.baseStation.lat, activeDevice.baseStation.lng],
    [activeDevice.location.lat, activeDevice.location.lng]
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-red-500 animate-pulse" />
          <h2 className="text-xl font-semibold text-red-500">Emergency Alert</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Battery className="h-5 w-5 text-green-400" />
            <span>{activeDevice.battery}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Signal className="h-5 w-5 text-blue-400" />
            <span>RSSI: {activeDevice.rssi}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map View */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">Delhi Technological University</h3>
          <div className="w-full h-96 bg-gray-700/50 rounded-lg overflow-hidden">
            <MapContainer 
              center={[activeDevice.location.lat, activeDevice.location.lng]} 
              zoom={16} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[activeDevice.location.lat, activeDevice.location.lng]}>
                <Popup>
                  <div className="text-gray-900">
                    <strong>{activeDevice.id}</strong><br />
                    User: {activeDevice.user.name}<br />
                    Last Update: {activeDevice.lastUpdate}
                  </div>
                </Popup>
              </Marker>
              <Marker position={[activeDevice.baseStation.lat, activeDevice.baseStation.lng]}>
                <Popup>
                  <div className="text-gray-900">
                    <strong>Base Station</strong>
                  </div>
                </Popup>
              </Marker>
              <Polyline positions={pathCoordinates} color="red" weight={3} opacity={0.7} />
            </MapContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-700/50 p-3 rounded">
              <p className="text-gray-400">Latitude</p>
              <p className="text-lg">{activeDevice.location.lat.toFixed(4)}</p>
            </div>
            <div className="bg-gray-700/50 p-3 rounded">
              <p className="text-gray-400">Longitude</p>
              <p className="text-lg">{activeDevice.location.lng.toFixed(4)}</p>
            </div>
          </div>
        </div>

        {/* Device Info & Logs */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Radio className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-blue-400">{activeDevice.id}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 p-3 rounded">
                <p className="text-gray-400">Distance</p>
                <p className="text-lg">{activeDevice.distance}</p>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <p className="text-gray-400">Last Update</p>
                <p className="text-lg">{activeDevice.lastUpdate}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
            <h4 className="text-lg font-semibold mb-4 text-blue-400">User Information</h4>
            <div className="space-y-3">
              <div className="bg-gray-700/50 p-3 rounded">
                <p className="text-gray-400">Name</p>
                <p className="text-lg">{activeDevice.user.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-3 rounded">
                  <p className="text-gray-400">Age</p>
                  <p className="text-lg">{activeDevice.user.age}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded">
                  <p className="text-gray-400">Team</p>
                  <p className="text-lg">{activeDevice.user.team}</p>
                </div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <p className="text-gray-400">Medical Data</p>
                <p className="text-lg">{activeDevice.user.medicalData}</p>
              </div>
            </div>
          </div>

          {/* Logs */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Activity Logs</h4>
            <div className="space-y-3 max-h-52 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="bg-gray-700/50 p-3 rounded flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </p>
                    <p className={log.type === 'alert' ? 'text-red-400' : 'text-blue-400'}>
                      {log.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;