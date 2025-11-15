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
  id: 'mq9',
  position: [0, 0, 0],
  color: 0x00ffff,
  title: 'MQ-9 Reaper',
  content: {
    overview: 'The MQ-9 Reaper is a U.S. remotely piloted aircraft designed for long-endurance intelligence, surveillance, and reconnaissance (ISR) missions, as well as precision strike roles. It is larger and more capable than the MQ-1 Predator, with greater payload, range, and operational ceiling.',
    specifications: [
      { label: 'Range', value: 'Over 1,800 km (operational radius up to 1,000+ km)' },
      { label: 'Endurance', value: 'Up to 27 hours' },
      { label: 'Speed', value: 'Approx. 300–370 km/h (cruise speed)' },
      { label: 'Ceiling', value: '~50,000 feet' },
      { label: 'Payload', value: 'Up to 1,700 kg (external + internal)' },
      { label: 'Sensors', value: 'EO/IR camera, synthetic aperture radar, targeting systems' }
    ],
    characteristics: 'Features long-endurance flight, high payload capacity, multi-mission sensor integration, and satellite-linked remote operation. The MQ-9 is widely used for ISR, precision engagement, and persistent surveillance in complex operational environments.'
  }
}

];