import { Radio } from 'lucide-react';

const Devices = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-400">Connected Devices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Radio className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-semibold">Aidlink-1</h3>
          </div>
          <div className="space-y-2">
            <p><span className="text-gray-400">Status:</span> Active</p>
            <p><span className="text-gray-400">Battery:</span> 85%</p>
            <p><span className="text-gray-400">Last Signal:</span> 2 mins ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Devices;