import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { 
  Download, 
  FileText, 
  Database, 
  Calendar,
  MapPin,
  Thermometer,
  Droplets,
  Activity,
  CheckCircle,
  Globe,
  Filter,
  Settings,
  FileSpreadsheet,
  FileCode,
  ChevronDown
} from 'lucide-react';
import { mockArgoFloats, dashboardStats } from '@/lib/mockData';

export default function Export() {
  const [selectedFloats, setSelectedFloats] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('netcdf');
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });
  const [selectedParameters, setSelectedParameters] = useState<string[]>(['temperature', 'salinity']);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);

  const regions = [
    { id: 'default', name: 'Select a Region', disabled: true },
    { id: 'pacific', name: 'Pacific Ocean' },
    { id: 'atlantic', name: 'Atlantic Ocean' },
    { id: 'indian', name: 'Indian Ocean' },
    { id: 'southern', name: 'Southern Ocean' },
    { id: 'arctic', name: 'Arctic Ocean' },
    { id: 'mediterranean', name: 'Mediterranean Sea' },
    { id: 'caribbean', name: 'Caribbean Sea' },
    { id: 'south-china', name: 'South China Sea' },
    { id: 'bering', name: 'Bering Sea' },
    { id: 'gulf-of-mexico', name: 'Gulf of Mexico' },
    { id: 'sea-of-japan', name: 'Sea of Japan' },
    { id: 'hudson-bay', name: 'Hudson Bay' },
    { id: 'east-china', name: 'East China Sea' },
    { id: 'arabian', name: 'Arabian Sea' },
    { id: 'red', name: 'Red Sea' },
    { id: 'black', name: 'Black Sea' },
    { id: 'north', name: 'North Sea' },
    { id: 'baltic', name: 'Baltic Sea' },
    { id: 'philippine', name: 'Philippine Sea' },
  ];

  const exportFormats = [
    {
      id: 'float_chat',
      name: 'FloatChat Format',
      description: 'Queries simplified',
      icon: FileCode,
      extension: '.fcf',
      recommended: true
    },
    {
      id: 'netcdf',
      name: 'NetCDF Format',
      description: 'Network Common Data Form - standard for oceanographic data',
      icon: Database,
      extension: '.nc',
      recommended: false
    },
    {
      id: 'csv',
      name: 'CSV Format',
      description: 'Comma-separated values for spreadsheet applications',
      icon: FileSpreadsheet,
      extension: '.csv'
    },
    {
      id: 'json',
      name: 'JSON Format',
      description: 'JavaScript Object Notation for web applications',
      icon: FileText,
      extension: '.json'
    }
  ];

  const parameters = [
    { id: 'temperature', name: 'Temperature', icon: Thermometer, unit: '°C' },
    { id: 'salinity', name: 'Salinity', icon: Droplets, unit: 'PSU' },
    { id: 'pressure', name: 'Pressure', icon: Activity, unit: 'dbar' },
    { id: 'oxygen', name: 'Dissolved Oxygen', icon: Activity, unit: 'μmol/kg' },
  ];

  const handleFloatSelection = (floatId: string, checked: boolean) => {
    if (checked) {
      setSelectedFloats([...selectedFloats, floatId]);
    } else {
      setSelectedFloats(selectedFloats.filter(id => id !== floatId));
    }
  };

  const handleParameterSelection = (paramId: string, checked: boolean) => {
    if (checked) {
      setSelectedParameters([...selectedParameters, paramId]);
    } else {
      setSelectedParameters(selectedParameters.filter(id => id !== paramId));
    }
  };

  const handleExport = () => {
    const selectedFormat_obj = exportFormats.find(f => f.id === selectedFormat);
    console.log('Exporting data:', {
      floats: selectedFloats,
      format: selectedFormat,
      dateRange,
      parameters: selectedParameters
    });
    
    // Simulate download
    const filename = `argo_data_${new Date().toISOString().split('T')[0]}${selectedFormat_obj?.extension}`;
    alert(`Downloading ${filename}...`);
  };

  return (
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg mb-4">
            <Download className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Export Data</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Export ARGO float data in various formats for analysis and research
          </p>
        </div>

        {/* Quick Stats */}
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
          
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Database className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-900">{dashboardStats.totalProfiles}</p>
              <p className="text-sm text-purple-700">Profiles</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-900">{dashboardStats.dataQuality}%</p>
              <p className="text-sm text-orange-700">Quality</p>
            </CardContent>
          </Card>
        </div>

        {/* Export Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Format Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Export Format</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <div
                    key={format.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedFormat === format.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedFormat(format.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold text-gray-900">{format.name}</p>
                            {format.recommended && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{format.description}</p>
                        </div>
                      </div>
                      {selectedFormat === format.id && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Parameter Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Parameters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {parameters.map((param) => {
                const Icon = param.icon;
                return (
                  <div key={param.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={param.id}
                      checked={selectedParameters.includes(param.id)}
                      onCheckedChange={(checked) => 
                        handleParameterSelection(param.id, checked as boolean)
                      }
                    />
                    <Icon className="h-4 w-4 text-gray-600" />
                    <label htmlFor={param.id} className="flex-1 cursor-pointer">
                      <span className="font-medium text-gray-900">{param.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({param.unit})</span>
                    </label>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Date Range Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Date Range</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Region Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Region</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>
                    {selectedRegion.length === 0
                      ? 'Select a Region'
                      : selectedRegion.length === 1
                      ? regions.find(r => r.id === selectedRegion[0])?.name
                      : `${selectedRegion.length} regions selected`}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuItem
                  onSelect={() => {
                    if (selectedRegion.length === regions.length - 1) {
                      setSelectedRegion([]);
                    } else {
                      setSelectedRegion(regions.filter(r => !r.disabled).map(r => r.id));
                    }
                  }}
                >
                  <label htmlFor="select-all" className="flex items-center w-full cursor-pointer">
                    <Checkbox
                      id="select-all"
                      className="mr-2"
                      checked={selectedRegion.length > 0 && selectedRegion.length === regions.length - 1}
                      indeterminate={selectedRegion.length > 0 && selectedRegion.length < regions.length - 1}
                    />
                    Select All
                  </label>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {regions.filter(r => !r.disabled).map((region) => (
                  <DropdownMenuItem
                    key={region.id}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <label htmlFor={region.id} className="flex items-center w-full cursor-pointer">
                      <Checkbox
                        id={region.id}
                        className="mr-2"
                        checked={selectedRegion.includes(region.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRegion([...selectedRegion, region.id]);
                          } else {
                            setSelectedRegion(selectedRegion.filter(id => id !== region.id));
                          }
                        }}
                      />
                      {region.name}
                    </label>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Float Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Select Floats</span>
              <Badge variant="secondary" className="ml-auto">
                {selectedFloats.length} selected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockArgoFloats.map((float) => (
                <div
                  key={float.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedFloats.includes(float.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => 
                    handleFloatSelection(float.id, !selectedFloats.includes(float.id))
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{float.id}</span>
                    <Badge 
                      className={`text-xs ${
                        float.status === 'active' ? 'bg-green-100 text-green-700' :
                        float.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {float.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Lat: {float.latitude.toFixed(2)}°</p>
                    <p>Lon: {float.longitude.toFixed(2)}°</p>
                    <p>Profiles: {float.profiles}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleExport}
            disabled={selectedFloats.length === 0 || selectedParameters.length === 0}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-5 w-5 mr-2" />
            Export Data ({selectedFloats.length} floats)
          </Button>
        </div>
      </div>
  );
}