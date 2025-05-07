import { Radio, Zap } from 'lucide-react';

const devices = [
  {
    name: "Aidlink-1",
    status: "Active",
    battery: 85,
    lastSignal: "Just Now",
  },
  {
    name: "Aidlink-2",
    status: "Inactive",
    battery: 0,
    lastSignal: "12 days ago",
  },
  {
    name: "Aidlink-3",
    status: "Inactive",
    battery: 0,
    lastSignal: "1 month ago ",
  },
];

const getBatteryColor = (battery) => {
  if (battery >= 70) return "bg-green-400";
  if (battery >= 30) return "bg-yellow-400";
  return "bg-red-400";
};

export default function Devices() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h2 className="text-3xl font-extrabold text-blue-400 mb-3 tracking-tight">
        Connected Devices
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {devices.map((device, idx) => (
          <div
            key={device.name}
            className={`relative p-7 rounded-2xl border border-blue-400/10 bg-gradient-to-br from-gray-900/70 to-blue-900/30 shadow-xl
             backdrop-blur-lg transition-all hover:scale-[1.025] hover:shadow-blue-400/15
             group animate-devicefade`}
            style={{ animationDelay: `${idx * 80 + 80}ms` }}
          >
            {/* Status orb */}
            <span
              className={`absolute top-4 right-6 h-4 w-4 rounded-full ring-2 ring-white/40
                ${device.status === "Active" ? "bg-green-400 animate-pulse-status" : "bg-gray-400"}
                `}
              title={device.status}
            ></span>
            {/* Device header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full p-3 bg-gradient-to-br from-blue-500/30 to-cyan-500/10 shadow">
                <Radio className="h-7 w-7 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">{device.name}</h3>
                <span className="text-xs rounded px-2 py-0.5 ml-2
                  bg-blue-400/10 font-semibold tracking-wide text-blue-300 shadow-inner">
                  {device.status}
                </span>
              </div>
            </div>
            {/* Device info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300 font-medium">Battery: </span>
                <span
                  className={`
                    inline-block w-20 h-3 rounded-full mx-2 ${getBatteryColor(
                      device.battery
                    )}
                  `}
                  aria-label="Battery bar"
                ></span>
                <span className="font-mono text-sm">
                  {device.battery}%
                </span>
              </div>
              <div className="text-gray-400">
                <span className="font-medium text-gray-200">Last Signal: </span>
                {device.lastSignal}
              </div>
            </div>
            {/* Card glow */}
            <div className={`absolute -inset-3 z-0 bg-blue-400/10 blur-lg rounded-2xl opacity-0 group-hover:opacity-30 transition`}></div>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style jsx="true">{`
        @keyframes devicefade {
          from { opacity: 0; transform: translateY(30px) scale(0.97);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-devicefade {
          animation: devicefade 0.8s cubic-bezier(.2,.8,.3,1) both;
        }
        @keyframes pulse-status {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94, 0.6);}
          70% { box-shadow: 0 0 0 10px rgba(34,197,94, 0);}
          100% { box-shadow: 0 0 0 0 rgba(34,197,94, 0);}
        }
        .animate-pulse-status {
          animation: pulse-status 1.8s cubic-bezier(0.4,0,0.6,1) infinite;
        }
      `}</style>
    </div>
  );
}