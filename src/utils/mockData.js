// Initial Dataset & Mock Surveillance Feeds for DefenderX

export const INITIAL_DATASET = [
  {
    id: "DFX-101",
    name: "Capt. Rajesh Kumar",
    rank: "Captain - Special Forces",
    clearance: "LEVEL 5 - TOP SECRET",
    unit: "9 Para SF (Special Operations)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    facialHash: "0x8F9A2B4C1E3D",
    status: "ACTIVE_DUTY",
    registeredDate: "2025-11-12"
  },
  {
    id: "DFX-102",
    name: "Subedar Major Vikram Singh",
    rank: "Subedar Major",
    clearance: "LEVEL 4 - RESTRICTED",
    unit: "Rashtriya Rifles (Recon Unit)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    facialHash: "0x7E6D5C4B3A21",
    status: "ACTIVE_DUTY",
    registeredDate: "2025-08-20"
  },
  {
    id: "DFX-103",
    name: "Lieut. Ananya Sharma",
    rank: "Lieutenant",
    clearance: "LEVEL 5 - TOP SECRET",
    unit: "Defense Intelligence Agency",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    facialHash: "0x4F3E2D1C0B9A",
    status: "ACTIVE_DUTY",
    registeredDate: "2026-01-15"
  },
  {
    id: "DFX-104",
    name: "Havildar Arjun Nair",
    rank: "Havildar",
    clearance: "LEVEL 3 - CONFIDENTIAL",
    unit: "High Altitude Warfare School",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
    facialHash: "0x9D8C7B6A5F4E",
    status: "ACTIVE_DUTY",
    registeredDate: "2025-04-10"
  }
];

export const MOCK_SURVEILLANCE_TARGETS = [
  {
    id: "TARGET-INTRUDER-99",
    title: "Sector Echo-4 (Dense Camouflage Target)",
    clothing: "Military Camouflage BDU / Tactical Mesh Helmet",
    isMatched: false,
    matchedProfile: null,
    matchConfidence: 14.2, // Below 75% threshold -> UNMATCHED INTRUDER
    latitude: 11.5824,
    longitude: 76.9211,
    locationName: "Sathyamangalam Reserve Forest - Dense Canopy Zone 4",
    altitude: "640m MSL",
    gridReference: "43Q UV 7824 9211",
    snapshot: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    droneName: "RECON-DRONE-DELTA",
    thermalSignature: "HIGH (37.2°C)",
    notes: "Subject detected in ghillie suit / jungle dress. Facial Biometrics DO NOT match database records."
  },
  {
    id: "TARGET-FRIENDLY-01",
    title: "Sector Alpha-1 (Patrol Point Bravo)",
    clothing: "Jungle Camouflage Uniform & SpecOps Gear",
    isMatched: true,
    matchedProfile: INITIAL_DATASET[0], // Capt Rajesh Kumar
    matchConfidence: 97.8,
    latitude: 11.6012,
    longitude: 76.8945,
    locationName: "Perimeter Outpost Alpha - Border Patrol Trail",
    altitude: "710m MSL",
    gridReference: "43Q UV 8012 8945",
    snapshot: INITIAL_DATASET[0].image,
    droneName: "SENTINEL-DRONE-01",
    thermalSignature: "NORMAL (36.6°C)",
    notes: "Match verified with Capt. Rajesh Kumar. Status Authorized."
  },
  {
    id: "TARGET-INTRUDER-102",
    title: "Sector Bravo-9 (River Basin Perimeter)",
    clothing: "Camouflage Tactical Vest & Face Mask",
    isMatched: false,
    matchedProfile: null,
    matchConfidence: 22.5,
    latitude: 11.5430,
    longitude: 76.9650,
    locationName: "Moyar River Gorge - South Jungle Ridge",
    altitude: "480m MSL",
    gridReference: "43Q UV 5430 9650",
    snapshot: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    droneName: "RECON-DRONE-EAGLE",
    thermalSignature: "HIGH (38.1°C)",
    notes: "Unknown armed suspect in jungle dress advancing toward restricted zone."
  }
];

export const INITIAL_LOGS = [
  {
    id: "LOG-8941",
    timestamp: "2026-07-26 12:45:10",
    targetId: "TARGET-FRIENDLY-01",
    targetName: "Capt. Rajesh Kumar",
    status: "AUTHORIZED",
    confidence: "97.8%",
    location: "Sector Alpha-1 (11.6012, 76.8945)",
    hqNotified: false
  },
  {
    id: "LOG-8940",
    timestamp: "2026-07-26 12:30:22",
    targetId: "TARGET-INTRUDER-99",
    targetName: "UNIDENTIFIED INTRUDER",
    status: "UNMATCHED_ALERT",
    confidence: "14.2%",
    location: "Sector Echo-4 (11.5824, 76.9211)",
    hqNotified: true
  }
];
