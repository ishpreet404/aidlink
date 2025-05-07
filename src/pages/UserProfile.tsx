import { Mail, Phone, User2 } from 'lucide-react';

const team = [
  { name: "Ishpreet Singh" },
  { name: "Inder Sharma" },
  { name: "Avirath Magoo" },
  { name: "Keshav Garg" }
];

function initials(name) {
  return name
    .split(" ")
    .map((el) => el[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const UserProfile = () => (
  <div className="max-w-2xl mx-auto my-10 space-y-9">
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-2 tracking-tight">
        Contact Information
      </h2>
      <p className="text-gray-300 text-lg">
        Reach out to us or connect with our team members.
      </p>
    </div>

    <div className="relative bg-gradient-to-br from-gray-800/70 via-gray-900/80 to-blue-900/60 p-8 rounded-2xl border border-blue-400/20 shadow-lg backdrop-blur-xl overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="space-y-7 relative z-10">
        {/* Email */}
        <div className="flex items-center gap-4 hover:bg-blue-400/5 p-4 rounded-xl transition">
          <div className="bg-blue-500/10 rounded-full p-3">
            <Mail className="h-6 w-6 text-blue-300" />
          </div>
          <div>
            <div className="text-gray-400">Email</div>
            <a
              href="mailto:ishpreet@outlook.in"
              className="font-medium text-blue-200 hover:underline break-all transition"
            >
                ishpreet@outlook.in
            </a>
          </div>
        </div>

        {/* Team */}
        <div className="flex items-start gap-4 hover:bg-blue-400/5 p-4 rounded-xl transition">
          <div className="bg-blue-500/10 rounded-full p-3 mt-0.5">
            <Phone className="h-6 w-6 text-blue-300" />
          </div>
          <div>
            <div className="text-gray-400 mb-2">Team Members</div>
            <ul className="flex flex-wrap gap-5">
              {team.map((member) => (
                <li
                  key={member.name}
                  className="flex items-center gap-2 bg-gray-700/80 px-3 py-1 rounded-full shadow hover:bg-blue-400/10 transition"
                >
                  {/* Team Avatar Circle */}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/70 text-lg font-extrabold text-white border-2 border-blue-400 ring-2 ring-inset ring-blue-600/10">
                    {initials(member.name)}
                  </span>
                  <span className="text-sm text-gray-200 font-semibold">{member.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Glow Anim Keyframes */}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { opacity: .6; }
            50% { opacity: .2; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  </div>
);

export default UserProfile;