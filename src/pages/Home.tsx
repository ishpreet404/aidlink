import { Radio, Satellite, Signal, MapPin, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="space-y-16 py-8 overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl"></div>
        </div>

        <div
          className={`relative z-10 space-y-8 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-3 bg-gray-800/50 px-6 py-2 rounded-full border border-blue-400/30">
              <Radio className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300 font-medium">Revolutionary Technology</span>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">AID</span>
                <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">LINK + </span>
              </h1>
            </div>

            <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Radio Location Beacon
            </p>
          </div>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Advanced emergency location tracking system for areas without network coverage.
            <span className="block mt-2 text-blue-300">Saving lives through innovative technology.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <MapPin className="h-5 w-5" /> Live Dashboard
            </Link>
            <a
              href="#demo"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 border border-blue-500/30 flex items-center justify-center gap-2"
            >
              <Zap className="h-5 w-5 text-blue-400" /> Watch Demo
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '95%', label: 'Accuracy Rate' },
              { value: '48h+', label: 'Battery Life' },
              { value: '5km', label: 'Signal Range' },
              { value: '10s', label: 'Location Update' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/30 backdrop-blur-sm"
              >
                <p className="text-3xl font-bold text-blue-400">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Image Section */}
      <div className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Revolutionary{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Emergency Technology
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The AidLink device is a vital innovation in disaster management and emergency response,
                bridging the communication gap in areas where traditional networks fail. By leveraging
                LoRa technology and Morse encoding, it ensures reliable and redundant transmission of
                critical data.
              </p>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors"
                >
                  Learn more about AidLink <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative mt-10 md:mt-0">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="relative bg-gray-800/50 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm">
                <div className="rounded overflow-hidden">
                  <div className="flex items-center justify-center">
                    <img src="/main.jpg" alt="AidLink Device" className="object-cover w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our technology combines cutting-edge hardware with innovative software to create a reliable
              emergency response system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Satellite className="h-8 w-8 text-blue-400" />,
                title: 'Satellite Tracking',
                desc: 'Precise GPS location tracking even in the most remote areas with advanced satellite technology.',
              },
              {
                icon: <Signal className="h-8 w-8 text-blue-400" />,
                title: 'LoRa Technology',
                desc: 'Long-range communication with minimal power consumption for extended operation time.',
              },
              {
                icon: <MapPin className="h-8 w-8 text-blue-400" />,
                title: 'Real-time Tracking',
                desc: 'Continuous monitoring with instant location updates and emergency alerts.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/30 backdrop-blur-sm hover:shadow-blue-500/20 hover:shadow-lg transition-all transform hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-blue-400 mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div id="demo" className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            AidLink{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Live Demo
            </span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Watch how AidLink performs in real-world scenarios. From signal transmission to real-time
            tracking, this demo showcases the power of our technology.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-blue-500/30 bg-gray-800">
            <iframe
              src="https://www.youtube.com/embed/zt4H8zP7gYA"
              title="AidLink Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
