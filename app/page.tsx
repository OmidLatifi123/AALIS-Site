"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Target, Globe, MapPin, Brain, Zap, Flag } from 'lucide-react';
import { WavyBackground } from '@/components/ui/wavy-background';
import AALISNavbar from '@/components/Navbar';

export default function AALISHomePage() {
  const [missionVisible, setMissionVisible] = useState(false);

  useEffect(() => {
    // Trigger mission statement fade-in after component mounts
    const timer = setTimeout(() => setMissionVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(220, 38, 38, 0.5),
                         0 0 40px rgba(220, 38, 38, 0.3),
                         0 0 60px rgba(220, 38, 38, 0.2);
          }
          50% {
            text-shadow: 0 0 30px rgba(220, 38, 38, 0.8),
                         0 0 60px rgba(220, 38, 38, 0.5),
                         0 0 90px rgba(220, 38, 38, 0.3);
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .hero-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Navigation Component */}
      <AALISNavbar />

      {/* Hero Section with Wavy Background */}
      <WavyBackground
        containerClassName="pt-32 pb-2 min-h-screen"
        colors={["#FFFFFF", "#F5F5F5", "#8B0000", "#A52A2A", "#DC143C"]}
        waveWidth={50}
        backgroundFill="black"
        blur={12}
        speed="slow"
        waveOpacity={0.3}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                <span className="inline-block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-gradient">
AALIS                </span>
                <br />
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
Autonomous Acoustic Lightweight Intelligence System              </p>
            </div>
          </div>
        </div>
      </WavyBackground>

      {/* Mission Statement Section */}
      <section className="py-2 px-4 sm:px-6 lg:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className={`relative mb-20 transition-all duration-1000 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white">Our Mission</h2>
            
            {/* Canadian Flag Design - Mission statements */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Top Red Section */}
              <div className="bg-red-600 h-24"></div>
              
              {/* Middle White Section with Text and Maple Leaf */}
              <div className="relative bg-white py-16 px-12">
                {/* Maple leaf background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <img src="/content/Maple.png" alt="Maple Leaf" className="w-80 h-80 object-contain" />
                </div>
                
                {/* Mission text */}
                <div className="relative z-10 space-y-8 text-center">
                  <div className={`text-3xl sm:text-4xl lg:text-5xl transition-all duration-1000 delay-200 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="text-black">Defending </span>
                    <span className="text-red-600 font-semibold">Canada's</span>
                    <span className="text-black"> Sovereignty.</span>
                  </div>
                  <div className={`text-3xl sm:text-4xl lg:text-5xl transition-all duration-1000 delay-500 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="text-black">Securing </span>
                    <span className="text-red-600 font-semibold">Canada's</span>
                    <span className="text-black"> Skies.</span>
                  </div>
                  <div className={`text-3xl sm:text-4xl lg:text-5xl transition-all duration-1000 delay-700 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="text-black">Keeping </span>
                    <span className="text-red-600 font-semibold">Canadians</span>
                    <span className="text-black"> Safe.</span>
                  </div>
                </div>
              </div>
              
              {/* Bottom Red Section */}
              <div className="bg-red-600 h-24"></div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-red-700 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Acoustic Intelligence</h3>
              <p className="text-gray-400">
                Machine learning algorithms analyze acoustic signatures to identify drone models with unprecedented accuracy
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-red-700 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Origin Detection</h3>
              <p className="text-gray-400">
                Determine drone affiliation and country of origin based on component analysis and acoustic fingerprints
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-red-700 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Geo-Fencing</h3>
              <p className="text-gray-400">
                Real-time notification system with geographic boundaries for immediate threat awareness and response
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-red-700 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Analytics</h3>
              <p className="text-gray-400">
                Intelligent battlefield analytics chat system for strategic insights and tactical decision-making
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-red-700 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightweight System</h3>
              <p className="text-gray-400">
                Portable and deployable solution designed for rapid field deployment in various operational environments
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-red-700 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Flag className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Canadian Innovation</h3>
              <p className="text-gray-400">
                Proudly developed in Canada, supporting national defense capabilities and technological sovereignty
              </p>
            </div>
          </div>


        </div>
      </section>

      {/* Footer */}
    <footer className="w-full py-4 border-t border-gray-800 text-center text-gray-400 text-sm mt-10">
      <div className="flex items-center justify-center space-x-2">
        <a
          href="https://github.com/IAMAMZ/aalice-drone-detection-knn-backend"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          View Backend on GitHub
        </a>
      </div>
      <div className="mt-1 text-xs text-gray-500">
        © {new Date().getFullYear()} AALIS
      </div>
    </footer>
    </div>
  );
}
