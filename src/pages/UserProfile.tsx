import { Mail, Phone } from 'lucide-react';

const UserProfile = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-blue-400">Contact Information</h2>
      <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400">Email</p>
              <p>ishpreet@outlook.in</p>

            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400">Team Memebers</p>
              <p>Ishpreet Singh</p>
              <p>Inder Sharma</p>
              <p>Avirath Magoo</p>
              <p>Keshav Garg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;