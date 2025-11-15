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
  id: 'rq170',
  position: [0, 1.2, 0],
  color: 0x00ffff,
  title: 'RQ-170 Sentinel',
  content: {
    overview: 'The RQ-170 Sentinel is a U.S. stealth unmanned aerial vehicle (UAV) developed for high-altitude intelligence, surveillance, and reconnaissance (ISR) missions. Known as the “Beast of Kandahar,” it features a flying-wing design optimized for low observability.',
    specifications: [
      { label: 'Range', value: 'Estimated 2,400+ km' },
      { label: 'Endurance', value: 'Estimated 6+ hours' },
      { label: 'Wingspan', value: '~20 meters (approx.)' },
      { label: 'Speed', value: 'High subsonic (exact speed classified)' },
      { label: 'Role', value: 'ISR / Electronic intelligence (ELINT)' }
    ],
    characteristics: 'Features stealth shaping, radar-absorbent materials, and advanced sensor payloads. Its exact capabilities remain classified, but it is believed to support deep-penetration surveillance missions in contested airspace with minimal radar signature.'
  }
}
];