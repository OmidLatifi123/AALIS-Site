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
  id: 'usntHawk',
  position: [0, 0, 0],
  color: 0x00ffff,
  title: 'USNT-Hawk',
  content: {
    overview: 'The USNT-Hawk is a U.S.-developed small tactical unmanned aircraft system (UAS) designed for battlefield reconnaissance, surveillance, and target acquisition. It is optimized for rapid deployment, low acoustic signature, and high-precision sensor payloads.',
    specifications: [
      { label: 'Range', value: '10–20 km operational radius' },
      { label: 'Endurance', value: '60–120 minutes depending on payload' },
      { label: 'Speed', value: '55–90 km/h (cruise speed)' },
      { label: 'Payload', value: 'Electro-optical/IR camera; optional laser designator' },
      { label: 'Launch Method', value: 'Hand-launch or portable rail launcher' },
      { label: 'Recovery', value: 'Autonomous belly landing or net recovery' }
    ],
    characteristics: 'Features modular sensors, encrypted communication links, GPS/INS navigation, and quiet electric propulsion. The USNT-Hawk is primarily used for platoon-level ISR missions and is engineered for rapid setup by a two-person team.'
  }
}

];