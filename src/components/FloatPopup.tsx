import React from 'react';
import { Battery, Thermometer, Waves, Calendar, MapPin, Tag, CheckCircle, XCircle, Wrench } from 'lucide-react';

interface FloatPopupProps {
  float: {
    id: string;
    status: 'active' | 'inactive' | 'maintenance';
    lastUpdate: string;
    latitude: number;
    longitude: number;
    batteryLevel: number;
    profiles: number;
    temperature?: number;
    salinity?: number;
  };
}

const StatusIcon = ({ status }: { status: 'active' | 'inactive' | 'maintenance' }) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'inactive':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'maintenance':
      return <Wrench className="h-4 w-4 text-yellow-500" />;
  }
};

const FloatPopup: React.FC<FloatPopupProps> = ({ float }) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg p-1">
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-800 flex items-center">
            <Tag className="h-4 w-4 mr-2 text-gray-500" />
            {float.id}
          </h3>
          <div className="flex items-center space-x-1">
            <StatusIcon status={float.status} />
            <span className="text-xs font-semibold text-gray-600 capitalize">{float.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{float.latitude.toFixed(2)}, {float.longitude.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{new Date(float.lastUpdate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Battery className="h-4 w-4 text-gray-400" />
            <span>{float.batteryLevel}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Waves className="h-4 w-4 text-gray-400" />
            <span>{float.profiles} profiles</span>
          </div>
          {float.temperature && (
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-gray-400" />
              <span>{float.temperature}°C</span>
            </div>
          )}
          {float.salinity && (
            <div className="flex items-center space-x-2">
              <Waves className="h-4 w-4 text-gray-400" />
              <span>{float.salinity}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatPopup;