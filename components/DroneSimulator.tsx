'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

interface DroneSimulatorProps {
  audioSrc: string;
}

const DroneSimulator: React.FC<DroneSimulatorProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [distance, setDistance] = useState(50); // Distance in meters (1-100)
  const [rpm, setRpm] = useState(3000); // RPM (1000-6000)
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Audio nodes
  const playerRef = useRef<Tone.Player | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  const distortionRef = useRef<Tone.Distortion | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const gainRef = useRef<Tone.Gain | null>(null);
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Initialize audio chain
    const initAudio = async () => {
      try {
        console.log('Initializing audio with file:', audioSrc);
        
        // Create audio effects first
        filterRef.current = new Tone.Filter(8000, 'lowpass');
        distortionRef.current = new Tone.Distortion(0.1);
        reverbRef.current = new Tone.Reverb(2);
        gainRef.current = new Tone.Gain(0.5);
        pitchShiftRef.current = new Tone.PitchShift(0);

        // Wait for reverb to generate
        await reverbRef.current.generate();

        if (!isMounted) return;

        // First, let's try to load the audio with fetch to verify it exists
        const response = await fetch(audioSrc);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('Audio file fetched successfully, creating Tone.Player...');

        // Create player
        playerRef.current = new Tone.Player({
          url: audioSrc,
          loop: true,
          autostart: false
        });

        // Handle loading manually with a timeout
        const loadTimeout = setTimeout(() => {
          if (!isLoaded && isMounted) {
            setLoadError('Audio loading timed out. Please try refreshing the page.');
          }
        }, 10000); // 10 second timeout

        // Wait for the buffer to load
        await Tone.loaded();
        
        if (!isMounted) return;
        
        clearTimeout(loadTimeout);
        
        console.log('Tone.Player loaded, connecting audio chain...');

        // Connect audio chain: Player -> PitchShift -> Filter -> Distortion -> Reverb -> Gain -> Destination
        playerRef.current.chain(
          pitchShiftRef.current,
          filterRef.current,
          distortionRef.current,
          reverbRef.current,
          gainRef.current,
          Tone.Destination
        );

        if (isMounted) {
          console.log('Audio chain connected successfully');
          setIsLoaded(true);
          setLoadError(null);
        }

      } catch (error) {
        console.error('Error initializing audio:', error);
        if (isMounted) {
const message =
  error instanceof Error ? error.message : String(error);

setLoadError(`Failed to load audio: ${message}`);
          setIsLoaded(false);
        }
      }
    };

    initAudio();

    // Cleanup
    return () => {
      isMounted = false;
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      if (filterRef.current) {
        filterRef.current.dispose();
      }
      if (distortionRef.current) {
        distortionRef.current.dispose();
      }
      if (reverbRef.current) {
        reverbRef.current.dispose();
      }
      if (gainRef.current) {
        gainRef.current.dispose();
      }
      if (pitchShiftRef.current) {
        pitchShiftRef.current.dispose();
      }
    };
  }, [audioSrc]);

  // Update audio parameters when distance changes
  useEffect(() => {
    if (!isLoaded) return;

    const updateDistanceEffects = () => {
      const normalizedDistance = distance / 100; // 0-1 range
      
      // Volume decreases with distance (inverse square law simulation)
      const volume = Math.max(0.1, 1 - (normalizedDistance * 0.8));
      if (gainRef.current) {
        gainRef.current.gain.rampTo(volume, 0.1);
      }

      // High frequencies are attenuated more at distance
      const cutoffFreq = Math.max(1000, 8000 - (normalizedDistance * 6000));
      if (filterRef.current) {
        filterRef.current.frequency.rampTo(cutoffFreq, 0.1);
      }

      // More reverb at greater distances
      const reverbMix = normalizedDistance * 0.5;
      if (reverbRef.current) {
        reverbRef.current.wet.rampTo(reverbMix, 0.1);
      }
    };

    updateDistanceEffects();
  }, [distance, isLoaded]);

  // Update audio parameters when RPM changes
  useEffect(() => {
    if (!isLoaded) return;

    const updateRpmEffects = () => {
      // RPM affects pitch - higher RPM = higher pitch
      const normalizedRpm = (rpm - 1000) / (6000 - 1000); // 0-1 range
      const pitchShift = (normalizedRpm - 0.5) * 12; // -6 to +6 semitones
      
      if (pitchShiftRef.current) {
        pitchShiftRef.current.pitch = pitchShift;
      }

      // Higher RPM can add slight distortion (mechanical stress simulation)
      const distortionAmount = normalizedRpm * 0.3;
      if (distortionRef.current) {
        distortionRef.current.distortion = distortionAmount;
      }

      // Playback rate slightly affected by RPM for more realism
      const playbackRate = 0.8 + (normalizedRpm * 0.4); // 0.8 to 1.2
      if (playerRef.current) {
        playerRef.current.playbackRate = playbackRate;
      }
    };

    updateRpmEffects();
  }, [rpm, isLoaded]);

  const togglePlayback = async () => {
    if (!playerRef.current || !isLoaded) return;

    try {
      if (!isPlaying) {
        // Start Tone.js context if not started
        if (Tone.context.state !== 'running') {
          await Tone.start();
        }
        playerRef.current.start();
        setIsPlaying(true);
      } else {
        playerRef.current.stop();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  return (
    <div className="p-6 bg-black/30 hover:bg-black/50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Drone Sound Simulator
      </h2>

      {/* Loading/Error Status */}
      {loadError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {loadError}
        </div>
      )}
      
      {!isLoaded && !loadError && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-center">
          Loading audio file...
        </div>
      )}
      
      {/* Play/Pause Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={togglePlayback}
          disabled={!isLoaded}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl
            transition-all duration-200 shadow-lg
            ${isLoaded 
              ? (isPlaying 
                ? 'bg-red-500 hover:bg-red-600 active:scale-95' 
                : 'bg-green-500 hover:bg-green-600 active:scale-95')
              : 'bg-gray-400 cursor-not-allowed'
            }
          `}
        >
          {!isLoaded ? '...' : isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      {/* Distance Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Distance: {distance}m
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${distance}%, #e5e7eb ${distance}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1m (Close)</span>
          <span>100m (Far)</span>
        </div>
      </div>

      {/* RPM Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rotor RPM: {rpm.toLocaleString()}
        </label>
        <input
          type="range"
          min="1000"
          max="6000"
          value={rpm}
          onChange={(e) => setRpm(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          style={{
            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((rpm - 1000) / (6000 - 1000)) * 100}%, #e5e7eb ${((rpm - 1000) / (6000 - 1000)) * 100}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1,000 (Low)</span>
          <span>6,000 (High)</span>
        </div>
      </div>

      {/* Audio Parameters Display */}
      {/* <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
          Audio Effects Applied:
        </h3>
        <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
          <div>• Volume: {Math.round((1 - (distance / 100) * 0.8) * 100)}%</div>
          <div>• Low-pass Filter: {Math.round(8000 - ((distance / 100) * 6000))} Hz</div>
          <div>• Pitch Shift: {((((rpm - 1000) / (6000 - 1000)) - 0.5) * 12).toFixed(1)} semitones</div>
          <div>• Reverb: {Math.round((distance / 100) * 50)}%</div>
          <div>• Distortion: {Math.round(((rpm - 1000) / (6000 - 1000)) * 30)}%</div>
        </div>
      </div> */}
    </div>
  );
};

export default DroneSimulator;