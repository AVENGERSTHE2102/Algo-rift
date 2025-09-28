// Mock ARGO data for demonstration purposes - Indian Ocean focused
export interface ArgoFloat {
  id: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: string;
  profiles: number;
  batteryLevel: number;
  temperature?: number;
  salinity?: number;
}

export interface SalinityProfile {
  depth: number;
  salinity: number;
  temperature: number;
  pressure: number;
}

export interface BGCData {
  parameter: string;
  value: number;
  unit: string;
  depth: number;
  timestamp: string;
}

// ARGO floats positioned in Indian Ocean around India
export const mockArgoFloats: ArgoFloat[] = [
  {
    id: "ARGO_001",
    latitude: 8.5,
    longitude: 65.2, // Moved further west in deeper Arabian Sea waters
    status: "active",
    lastUpdate: "2024-01-15T10:30:00Z",
    profiles: 245,
    batteryLevel: 87,
    temperature: 28.5,
    salinity: 35.2
  },
  {
    id: "ARGO_002", 
    latitude: 18.5,
    longitude: 88.2, // Bay of Bengal
    status: "active",
    lastUpdate: "2024-01-14T18:45:00Z",
    profiles: 189,
    batteryLevel: 72,
    temperature: 29.1,
    salinity: 34.8
  },
  {
    id: "ARGO_003",
    latitude: 8.7,
    longitude: 76.1, // Southwest of India
    status: "maintenance",
    lastUpdate: "2024-01-10T09:15:00Z",
    profiles: 312,
    batteryLevel: 45,
    temperature: 27.8,
    salinity: 35.5
  },
  {
    id: "ARGO_004",
    latitude: 5.3,
    longitude: 83.9, // Moved to deeper waters south of Sri Lanka
    status: "active",
    lastUpdate: "2024-01-15T14:20:00Z",
    profiles: 156,
    batteryLevel: 91,
    temperature: 26.4,
    salinity: 36.1
  },
  {
    id: "ARGO_005",
    latitude: 12.8,
    longitude: 85.6, // Central Bay of Bengal
    status: "inactive",
    lastUpdate: "2024-01-08T22:10:00Z",
    profiles: 278,
    batteryLevel: 23,
    temperature: 28.9,
    salinity: 34.6
  },
  {
    id: "ARGO_006",
    latitude: 6.2,
    longitude: 80.5, // South of Sri Lanka
    status: "active",
    lastUpdate: "2024-01-16T08:15:00Z",
    profiles: 198,
    batteryLevel: 78,
    temperature: 29.3,
    salinity: 34.9
  },
  {
    id: "ARGO_007",
    latitude: 20.1,
    longitude: 91.4, // Northeast Bay of Bengal
    status: "active",
    lastUpdate: "2024-01-15T16:30:00Z",
    profiles: 167,
    batteryLevel: 84,
    temperature: 27.6,
    salinity: 33.8
  },
  {
    id: "ARGO_008",
    latitude: 4.5,
    longitude: 73.2, // Central Indian Ocean
    status: "maintenance",
    lastUpdate: "2024-01-12T11:45:00Z",
    profiles: 234,
    batteryLevel: 56,
    temperature: 28.7,
    salinity: 35.0
  }
];

export const mockSalinityProfiles: SalinityProfile[] = [
  { depth: 0, salinity: 35.2, temperature: 28.5, pressure: 0 },
  { depth: 10, salinity: 35.3, temperature: 28.2, pressure: 10.1 },
  { depth: 50, salinity: 35.8, temperature: 26.1, pressure: 50.5 },
  { depth: 100, salinity: 36.1, temperature: 22.8, pressure: 101.2 },
  { depth: 200, salinity: 36.4, temperature: 18.5, pressure: 202.8 },
  { depth: 500, salinity: 35.9, temperature: 12.3, pressure: 507.1 },
  { depth: 1000, salinity: 35.2, temperature: 8.7, pressure: 1015.6 },
  { depth: 1500, salinity: 34.8, temperature: 6.2, pressure: 1524.3 },
  { depth: 2000, salinity: 34.6, temperature: 4.1, pressure: 2033.8 }
];

export const mockBGCData: BGCData[] = [
  {
    parameter: "Dissolved Oxygen",
    value: 220.5,
    unit: "μmol/kg",
    depth: 100,
    timestamp: "2024-01-15T10:30:00Z"
  },
  {
    parameter: "Chlorophyll-a",
    value: 0.85,
    unit: "mg/m³",
    depth: 50,
    timestamp: "2024-01-15T10:30:00Z"
  },
  {
    parameter: "Nitrate",
    value: 15.2,
    unit: "μmol/kg",
    depth: 200,
    timestamp: "2024-01-15T10:30:00Z"
  },
  {
    parameter: "pH",
    value: 8.1,
    unit: "pH units",
    depth: 10,
    timestamp: "2024-01-15T10:30:00Z"
  }
];

export const mockChatResponses = {
  "salinity profiles near equator": {
    text: "Found 12 ARGO floats with salinity profiles near the equator (±5°) for March 2023. The average surface salinity was 35.4 PSU with a thermocline depth of approximately 150m.",
    data: mockSalinityProfiles,
    floats: ["ARGO_001", "ARGO_002", "ARGO_004"]
  },
  "bgc parameters arabian sea": {
    text: "Analyzing BGC parameters in the Arabian Sea for the last 6 months. Dissolved oxygen levels show seasonal variation with minimum values during monsoon period.",
    data: mockBGCData,
    floats: ["ARGO_002", "ARGO_003"]
  },
  "nearest floats": {
    text: "The 3 nearest ARGO floats to your location are within 50km radius. ARGO_001 is the closest at 23km distance.",
    data: mockArgoFloats.slice(0, 3),
    floats: ["ARGO_001", "ARGO_002", "ARGO_004"]
  }
};

export const dashboardStats = {
  totalFloats: mockArgoFloats.length,
  activeFloats: mockArgoFloats.filter(f => f.status === 'active').length,
  totalProfiles: mockArgoFloats.reduce((sum, f) => sum + f.profiles, 0),
  lastUpdate: "2024-01-15T14:20:00Z",
  coverage: "Indian Ocean Region",
  dataQuality: 98.5
};