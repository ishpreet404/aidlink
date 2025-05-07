import {
  Radio,
  Satellite,
  Signal,
  MapPin,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const features = [
  {
    icon: <Satellite className="h-8 w-8 text-blue-400" />,
    title: "Satellite Tracking",
    desc: "Precise GPS location tracking in remote areas using advanced satellite technology.",
  },
  {
    icon: <Signal className="h-8 w-8 text-blue-400" />,
    title: "LoRa Technology",
    desc: "Long-range communication with minimal power consumption for sustained operations.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-blue-400" />,
    title: "Real-time Tracking",
    desc: "Instant location updates and emergency alerts for continuous monitoring.",
  },
];

const stats = [
  { value: "95%", label: "Accuracy Rate" },
  { value: "48h+", label: "Battery Life" },
  { value: "5km", label: "Signal Range" },
  { value: "10s", label: "Location Update" },
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoHover, setVideoHover] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="space-y-20 lg:space-y-28 py-8 bg-gradient-to-br from-[#151a33] to-[#23395d] overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 text-center">
        {/* Animate radial backgrounds + bubbles for depth */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-800/30 to-transparent animate-pulse-slow" />
          <div className="absolute top-[20%] left-[10%] w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute top-[65%] right-[10%] w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>
        <div
          className={`relative z-10 space-y-8 transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Feature badge */}
            <div className="flex items-center space-x-3 bg-gray-900/60 px-7 py-2 rounded-full border border-blue-400/30 shadow-inner">
              <Radio className="h-5 w-5 text-blue-400 animate-pulse" />
              <span className="text-blue-200 font-medium tracking-wide">
                Next-Gen Location Tech
              </span>
            </div>
            {/* Hero headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-1">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                AID
              </span>
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                LINK +
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-100 font-medium max-w-3xl mx-auto leading-relaxed">
              Radio Location <span className="text-blue-400">Beacon</span>
            </p>
          </div>
          {/* Description */}
          <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            <span>
              Advanced emergency location system for areas <b>without network coverage</b>.
            </span>
            <span className="block mt-1 text-blue-200">
              <em>Saving lives with innovative, reliable technology.</em>
            </span>
          </p>
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            <Link
              to="/dashboard"
              className="relative px-9 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-400 hover:to-blue-400 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-400/50 flex items-center justify-center gap-2 transition duration-300 transform hover:-translate-y-1 focus:ring-2 focus:ring-cyan-300"
            >
              <MapPin className="h-5 w-5 animate-pulse" />
              Live Dashboard
              {/* Animated ping */}
              <span className="absolute -top-2 -right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </Link>
            <a
              href="#demo"
              className="px-9 py-4 bg-gray-900/70 hover:bg-gray-800 text-white rounded-xl font-bold transition-all transform hover:scale-105 border border-blue-500/30 flex items-center justify-center gap-2 ring-inset hover:ring-2 hover:ring-blue-400"
            >
              <Zap className="h-5 w-5 text-blue-400" /> Watch Demo
            </a>
          </div>
          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="bg-gray-900/70 p-5 rounded-2xl border border-blue-400/20 shadow-inner hover:ring-2 hover:ring-blue-400/30 transition"
              >
                <div className="text-3xl font-black text-blue-400 drop-shadow">{stat.value}</div>
                <div className="mt-1 text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Image Section */}
      <section className="relative py-12 px-2">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* TEXT */}
          <div className="md:w-1/2 flex-shrink-0 space-y-7 text-center md:text-left">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full text-xs md:text-sm text-white uppercase font-semibold tracking-widest mb-4 shadow">
              Empower First Responders
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug">
              Revolutionary{" "}
              <span className="bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                Emergency Technology
              </span>
            </h2>
            <p className="text-gray-200 leading-relaxed text-lg font-medium">
              AidLink bridges the communication gap in disaster zones
              using LoRa, Morse, and fallback redundancy. <br />
              Unlock robust, <span className="text-blue-300">reliable</span> data even where networks fail.
            </p>
            <div className="pt-4 flex justify-center md:justify-start">
              <Link
                to="/about"
                className="flex items-center gap-2 text-blue-400 hover:text-cyan-300 font-semibold transition-colors pr-2"
              >
                Learn more about AidLink{" "}
                <ArrowRight className="h-4 w-4 inline" />
              </Link>
            </div>
          </div>
          {/* IMAGE */}
          <div className="md:w-1/2 w-full relative mx-auto group">
            {/* Glow effect behind the device */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-400/20 to-cyan-200/10 rounded-3xl blur-3xl pointer-events-none group-hover:blur-4xl transition-all duration-500"></div>
            <div className="relative border border-blue-400/20 rounded-2xl p-4 bg-gray-900/90 shadow-2xl max-w-sm mx-auto overflow-hidden backdrop-blur-md">
              <img
                src="/main.jpg"
                alt="AidLink Device"
                className="object-cover rounded-xl w-full h-72 shadow-xl border-4 border-blue-400/10"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-16 px-2">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Advanced{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-gray-300 font-medium max-w-2xl mx-auto">
              Hardware and software, working together for reliable crisis response.
            </p>
          </div>
          {/* FEATURES */}
          <div className="grid md:grid-cols-3 gap-9">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/70 p-8 rounded-2xl border border-blue-400/10 shadow-xl hover:shadow-blue-400/20 transition-all hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full flex justify-center items-center mb-6 bg-gradient-to-tl from-blue-500/30 to-cyan-400/20 group-hover:scale-105 transition-all shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-blue-300 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-200">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo" className="relative py-16 px-2">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">
            AidLink{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Live Demo
            </span>
          </h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            See AidLink in action—real signal transmission and instant tracking in emergency settings.
          </p>
          <div
            className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 border-blue-400/20 bg-gray-900 shadow-xl mx-auto flex items-center justify-center`}
            onMouseEnter={() => setVideoHover(true)}
            onMouseLeave={() => setVideoHover(false)}
            tabIndex={0}
          >
            {/* Play overlay for polish */}
            {!videoHover && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 z-10 pointer-events-none transition duration-300">
                <svg
                  className="w-16 h-16 text-blue-400 opacity-85 animate-bounce"
                  fill="currentColor"
                  viewBox="0 0 64 64"
                >
                  <circle cx="32" cy="32" r="32" fill="currentColor" opacity="0.18" />
                  <polygon points="28,22 48,32 28,42" fill="#3b82f6" />
                </svg>
              </div>
            )}
            <iframe
              src="https://www.youtube.com/embed/zt4H8zP7gYA"
              title="AidLink Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: "none" }}
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;