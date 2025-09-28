import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Globe, 
  Thermometer, 
  Droplets,
  TrendingUp,
  MapPin,
  Clock,
  Battery
} from 'lucide-react';
import { mockArgoFloats, dashboardStats } from '@/lib/mockData';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Simulate data fetching
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const { activeFloats, maintenanceFloats, inactiveFloats } = useMemo(() => {
    return mockArgoFloats.reduce(
      (acc, float) => {
        if (float.status === 'active') {
          acc.activeFloats.push(float);
        } else if (float.status === 'maintenance') {
          acc.maintenanceFloats.push(float);
        } else {
          acc.inactiveFloats.push(float);
        }
        return acc;
      },
      { activeFloats: [], maintenanceFloats: [], inactiveFloats: [] }
    );
  }, []);  if (loading) {
    return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mt-2"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600">Failed to load dashboard data.</p>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              ARGO Float monitoring and data analysis overview
            </p>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200">
            Live Data
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Globe className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-900">{dashboardStats.totalFloats}</p>
              <p className="text-sm text-blue-700">Total Floats</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <Activity className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-900">{dashboardStats.activeFloats}</p>
              <p className="text-sm text-green-700">Active</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-900">{dashboardStats.totalProfiles}</p>
              <p className="text-sm text-purple-700">Profiles</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <Thermometer className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-900">{dashboardStats.dataQuality}%</p>
              <p className="text-sm text-orange-700">Data Quality</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Activity className="h-5 w-5 mr-2" />
                Active Floats ({activeFloats.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeFloats.slice(0, 3).map((float) => (
                  <div key={float.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{float.id}</p>
                      <p className="text-xs text-gray-600">
                        {float.latitude.toFixed(2)}°N, {float.longitude.toFixed(2)}°E
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Battery className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600">{float.batteryLevel}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-700">
                <Clock className="h-5 w-5 mr-2" />
                Maintenance ({maintenanceFloats.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {maintenanceFloats.map((float) => (
                  <div key={float.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{float.id}</p>
                      <p className="text-xs text-gray-600">
                        {float.latitude.toFixed(2)}°N, {float.longitude.toFixed(2)}°E
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Battery className="h-3 w-3 text-yellow-600" />
                        <span className="text-xs text-yellow-600">{float.batteryLevel}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <MapPin className="h-5 w-5 mr-2" />
                Regional Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Arabian Sea</span>
                  <Badge variant="secondary" className="text-xs">{mockArgoFloats.filter(f => f.latitude > 10 && f.longitude < 70).length} floats</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bay of Bengal</span>
                  <Badge variant="secondary" className="text-xs">{mockArgoFloats.filter(f => f.latitude > 10 && f.longitude > 80).length} floats</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Southern Indian Ocean</span>
                  <Badge variant="secondary" className="text-xs">{mockArgoFloats.filter(f => f.latitude < 10).length} floats</Badge>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Coverage Area</span>
                    <span className="text-sm font-semibold text-blue-600">{dashboardStats.coverage}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockArgoFloats
                .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
                .slice(0, 3)
                .map((float) => (
                  <div key={float.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 ${float.status === 'active' ? 'bg-green-500' : float.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'} rounded-full mt-2`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{float.id} completed temperature profile</p>
                      <p className="text-xs text-gray-500">{new Date(float.lastUpdate).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">New Data</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Globe className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">View Map</p>
                  <p className="text-xs text-gray-600">Explore float locations</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Droplets className="h-8 w-8 text-cyan-600" />
                <div>
                  <p className="font-medium text-gray-900">Analyze Data</p>
                  <p className="text-xs text-gray-600">Chat with AI assistant</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Export Reports</p>
                  <p className="text-xs text-gray-600">Download data files</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}