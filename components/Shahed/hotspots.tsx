// hotspots.ts
export interface HotspotContent {
  overview: string;
  specifications: Array<{ label: string; value: string }>;
  characteristics: string;
}

export interface Hotspot {
  id: string;
  position: [number, number, number];
  color: number;
  title: string;
  content: HotspotContent;
}

export const hotspots: Hotspot[] = [
  {
    id: 'warhead',
    position: [0, 0, 0.8],
    color: 0x00ffff,
    title: 'Shahed-136',
    content: {
      overview: 'The Shahed-136 is an Iranian-made loitering munition (kamikaze drone) designed for long-range strikes. It\'s a delta-wing unmanned aerial vehicle with a distinctive profile.',
      specifications: [
        { label: 'Range', value: 'Approximately 2,500 km' },
        { label: 'Warhead', value: '40-50 kg explosive payload' },
        { label: 'Speed', value: '~185 km/h (cruise speed)' },
        { label: 'Guidance', value: 'GPS/INS navigation system' }
      ],
      characteristics: 'Features a small radar cross-section, relatively low cost compared to traditional missiles, and can be launched from ground platforms. The drone operates autonomously after launch.'
    }
  },
  {
    id: 'engine',
    position: [0, 0, -0.9],
    color: 0xff6600,
    title: 'Engine System',
    content: {
      overview: 'The Shahed-136 uses a piston engine that provides efficient long-range cruise capability. The engine is mounted in a pusher configuration at the rear of the fuselage.',
      specifications: [
        { label: 'Type', value: 'Piston engine' },
        { label: 'Configuration', value: 'Pusher propeller' },
        { label: 'Fuel', value: 'Standard aviation fuel' },
        { label: 'Endurance', value: 'Several hours of flight time' }
      ],
      characteristics: 'The engine produces a distinctive buzzing sound during flight, leading to the drone being nicknamed "moped" by some observers. The design prioritizes fuel efficiency over speed.'
    }
  },
  {
    id: 'wings',
    position: [0.7, 0, 0.56],
    color: 0x00ff00,
    title: 'Wing Structure',
    content: {
      overview: 'The Shahed-136 features a distinctive delta-wing design that provides stability and lift during long-range missions. The wings are collapsible for transport and storage.',
      specifications: [
        { label: 'Design', value: 'Delta wing configuration' },
        { label: 'Material', value: 'Lightweight composite' },
        { label: 'Span', value: 'Approximately 2.5 meters' },
        { label: 'Features', value: 'Foldable for transport' }
      ],
      characteristics: 'The delta wing provides excellent stability and control during cruise flight. The design allows for compact storage and easy transport in launch containers.'
    }
  }
];