'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, BatteryMedium, SignalHigh, User, X, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationData from '../data.json';

// Fix Leaflet marker icons
const fixLeafletIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true });
  }, [lat, lng]);
  return null;
};

const parseData = (data) => {
  let latitude = null,
    longitude = null,
    rssi = null,
    name = 'Unknown';

  data.forEach((entry) => {
    if (entry.value.startsWith('Latitude')) {
      const coords = entry.value.match(
        /Latitude:\s*(-?[\d.]+), Longitude:\s*(-?[\d.]+)/
      );
      if (coords) {
        latitude = parseFloat(coords[1]);
        longitude = parseFloat(coords[2]);
      }
    } else if (entry.value.startsWith('Name')) {
      name = entry.value.split(':')[1]?.trim() || name;
    } else if (!isNaN(parseInt(entry.value))) {
      rssi = parseInt(entry.value);
    }
  });

  if (latitude === null || longitude === null) {
    latitude = 0;
    longitude = 0;
  }

  return { latitude, longitude, rssi: rssi ?? 0, name };
};

const Dashboard = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [rssi, setRssi] = useState(0);
  const [name, setName] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fixLeafletIcon();
    const { latitude, longitude, rssi, name } = parseData(locationData);

    if (latitude !== 0 || longitude !== 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }

    setLatitude(latitude);
    setLongitude(longitude);
    setRssi(rssi);
    setName(name);
  }, []);

  // THEME-BASED BATTERY COLOR
  const getBatteryColor = (rssi) =>
    rssi > -60 ? 'bg-cyan-400' : rssi > -80 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <div className="relative min-h-screen py-8 px-2 bg-gradient-to-br from-[#161f35] via-[#23395d] to-[#192137] overflow-hidden">
      {/* Floating colored blobs & glow */}
      <div className="fixed -z-10 inset-0 pointer-events-none select-none">
        <div className="absolute -top-24 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-[105px]" />
        <div className="absolute top-[45%] right-0 w-[26vw] h-[26vw] bg-cyan-400/20 rounded-full blur-[96px]" />
        <div className="absolute bottom-0 left-1/4 w-[36vw] h-[21vw] bg-purple-500/20 rounded-full blur-[88px]" />
      </div>

      {/* Animated Themed Alert */}
      {showAlert && (
        <div className="fixed top-7 left-1/2 -translate-x-1/2 z-50 flex max-w-lg w-full
          items-center justify-between bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-7
          rounded-2xl shadow-2xl border border-blue-400/30 animate-slidein_new transition"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/20 p-2">
              <AlertCircle className="h-7 w-7 text-white" />
            </div>
            <span className="text-lg font-bold tracking-wide">
              Emergency Alert: New Data Received!
            </span>
          </div>
          <button
            aria-label="Close alert"
            onClick={() => setShowAlert(false)}
            className="ml-4 hover:text-cyan-200 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto space-y-10 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAP */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl border border-blue-400/10 h-[420px] bg-[#131c2e]/80 backdrop-blur-lg">
            <MapContainer
              center={[latitude, longitude]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
              <Marker position={[latitude, longitude]}>
                <Popup>
                  <div>
                    <p>
                      <strong>Location:</strong> {latitude}, {longitude}
                    </p>
                    <p>
                      <strong>Signal:</strong> {rssi} dBm
                    </p>
                    <p>
                      <strong>User:</strong> {name}
                    </p>
                  </div>
                </Popup>
              </Marker>
              <RecenterMap lat={latitude} lng={longitude} />
            </MapContainer>
          </div>
          {/* USER INFO CARD */}
          <div className="relative bg-[#23294b]/80 shadow-xl border border-blue-400/15 rounded-3xl flex flex-col items-center justify-center p-10 h-[420px] backdrop-blur-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-5 shadow-lg">
              <User className="h-11 w-11 text-blue-900/90" />
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-100">{name || 'Unknown User'}</div>
            <dl className="flex flex-col gap-2 mt-5 text-blue-50/90">
              <div><dt className="font-semibold">Latitude:</dt> <dd className="inline ml-2">{latitude}</dd></div>
              <div><dt className="font-semibold">Longitude:</dt> <dd className="inline ml-2">{longitude}</dd></div>
              <div>
                <dt className="font-semibold">Signal (RSSI):</dt>
                <dd className={`inline ml-2 font-bold ${rssi > -60
                  ? 'text-cyan-400'
                  : rssi > -80
                    ? 'text-yellow-400'
                    : 'text-red-400'
                  }`}>
                  {rssi} dBm
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex items-center gap-5 p-7 rounded-2xl glasscard border border-cyan-400/20 shadow-xl group transition transform hover:-translate-y-1">
            <div className="rounded-full p-4 bg-cyan-400/20">
              <BatteryMedium className="h-9 w-9 text-cyan-300" />
            </div>
            <div>
              <div className="text-lg font-semibold text-cyan-200">Battery Status</div>
              {/* Battery bar */}
              <div className="mt-1 flex items-center gap-2">
                <div className="w-28 h-3 rounded-full bg-cyan-900/30 overflow-hidden">
                  <div className={`h-full rounded-full ${getBatteryColor(rssi)}`} style={{ width: "85%" }}></div>
                </div>
                <span className="font-mono text-cyan-100 text-sm">85%</span>
              </div>
              <div className="text-cyan-100 text-xs mt-1">
                Device power healthy
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 p-7 rounded-2xl glasscard border border-blue-400/20 shadow-xl group transition transform hover:-translate-y-1">
            <div className="rounded-full p-4 bg-blue-400/20">
              <SignalHigh className="h-9 w-9 text-blue-300" />
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-200">Signal Strength</div>
              <span
                className={
                  rssi > -60
                    ? 'text-cyan-400'
                    : rssi > -80
                      ? 'text-yellow-300'
                      : 'text-red-400'
                }>
                {rssi} dBm
              </span>
              <div className="text-blue-100 text-xs">LoRa/Morse Beacon</div>
            </div>
          </div>
          <div className="flex items-center gap-5 p-7 rounded-2xl glasscard border border-purple-400/20 shadow-xl group transition transform hover:-translate-y-1">
            <div className="rounded-full p-4 bg-purple-400/20">
              <Clock className="h-9 w-9 text-purple-300" />
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-200">Last Update</div>
              <div className="text-purple-100 mt-1">{new Date().toLocaleString()}</div>
              <div className="text-purple-100/80 text-xs">Timesync UTC</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .glasscard {
          background: rgba(27,31,56,0.63);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        @keyframes slidein_new {
          0% { opacity: 0; transform: translate(-50%, -38px);}
          100% { opacity: 1; transform: translate(-50%, 0);}
        }
        .animate-slidein_new {
          animation: slidein_new 0.62s cubic-bezier(0.23,0.7,0.68,1) both;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;