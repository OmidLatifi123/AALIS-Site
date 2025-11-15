'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, AlertTriangle } from 'lucide-react';
import Shahed3DViewer from '@/components/Shahed/Shahed';
import Navbar from '@/components/Navbar';
import DroneSimulator from '@/components/DroneSimulator';
import { section } from 'motion/react-client';

export default function ShahedCaseStudy() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDistance, setAudioDistance] = useState(50);
  const [engineRPM, setEngineRPM] = useState(50);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      const volume = Math.max(0, Math.min(1, (100 - audioDistance) / 100));
      audioRef.current.volume = volume * (isMuted ? 0 : 1);
      audioRef.current.playbackRate = 0.5 + (engineRPM / 100);
    }
  }, [audioDistance, engineRPM, isMuted]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 mt-15">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The Shahed-136 is a Iranian-designed loitering munition, also known as a "kamikaze drone." 
                  Its distinctive acoustic signature has made it a critical target for acoustic detection systems.
                </p>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="font-mono">Loitering Munition</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Engine:</span>
                    <span className="font-mono">Mado MD-550</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Speed:</span>
                    <span className="font-mono">185 km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Range:</span>
                    <span className="font-mono">2,500 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Acoustic Freq:</span>
                    <span className="font-mono text-red-400">~50-80 Hz</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Detection Challenge</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  The Shahed-136's low-cost, low-flying profile makes it challenging to detect via radar. 
                  However, its distinctive two-stroke engine produces a characteristic sound signature that 
                  can be identified from several kilometers away.
                </p>
                <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-400 mb-2">Key Acoustic Features:</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Low-frequency buzzing (50-80 Hz dominant)</li>
                    <li>• Distinctive "moped-like" sound</li>
                    <li>• Consistent RPM during cruise phase</li>
                    <li>• Doppler shift as it approaches</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Model Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">3D Model Visualization</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-b from-gray-900 to-black relative">
              <Shahed3DViewer />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700 pointer-events-none">
                <p className="text-xs text-gray-300">Click and drag to rotate • Scroll to zoom</p>
              </div>
            </div>
            <div className="p-4 bg-gray-950/80">
              <p className="text-sm text-gray-400">
                Interactive 3D model showing the delta-wing configuration and compact design.
              </p>
            </div>
          </div>
        </section>

        {/* Real Footage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Real Audio/Video Documentation</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src="/content/shahed.mp4"
                className="w-full h-full object-contain"
                loop
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
              />
              <button
                onClick={toggleVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group"
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  {videoPlaying ? (
                    <Pause className="text-white" size={32} />
                  ) : (
                    <Play className="text-white ml-1" size={32} />
                  )}
                </div>
              </button>
            </div>
            <div className="p-4 bg-gray-950/80">
              <p className="text-sm text-gray-400">
                Actual footage showing Shahed-136 approach. Note the characteristic sound signature.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Drone Audio Simulator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience realistic drone sounds with adjustable distance and rotor RPM parameters. 
              The simulator uses advanced audio processing to model how drone sounds change with distance and rotor speed.
            </p>
          </div>

          {/* Simulator Component */}
          <div className="justify-center">
            <DroneSimulator audioSrc="/drone-fly-short.mp3" />
          </div>
        </div>

        {/* Detection Strategy */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">Acoustic Detection Strategy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-2xl">🎯</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Frequency Analysis</h3>
              <p className="text-sm text-gray-400">
                Machine learning models trained on the 50-80 Hz signature can identify Shahed drones 
                with high accuracy even in noisy environments.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-2xl">📡</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Array Processing</h3>
              <p className="text-sm text-gray-400">
                Microphone arrays enable triangulation of the drone's position and trajectory, 
                providing early warning to defense systems.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-2xl">⚡</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-Time Alert</h3>
              <p className="text-sm text-gray-400">
                Integration with mobile apps and defense networks enables civilian and military 
                alerts within seconds of acoustic detection.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-md mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-400 text-sm">
            Acoustic Detection Case Study • Shahed-136 Loitering Munition
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Data collected for civilian protection and defense research purposes
          </p>
        </div>
      </footer>
    </div>
  );
}