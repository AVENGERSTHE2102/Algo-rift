import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  X, 
  Smartphone,
  Wifi,
  WifiOff,
  RefreshCw,
  Star
} from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export default function PWAInstallPrompt() {
  const { isInstallable, isInstalled, isOnline, installApp, updateAvailable, updateApp } = usePWA();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  useEffect(() => {
    // Show install prompt after 30 seconds if installable and not installed
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled]);

  useEffect(() => {
    if (updateAvailable) {
      setShowUpdatePrompt(true);
    }
  }, [updateAvailable]);

  const handleInstall = async () => {
    try {
      await installApp();
      setShowInstallPrompt(false);
      
      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  const handleUpdate = () => {
    updateApp();
    setShowUpdatePrompt(false);
  };

  // Offline indicator
  if (!isOnline) {
    return (
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-center">
        <Card className="bg-amber-50 border-amber-200 shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 text-amber-800">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm font-medium">You're offline</span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                Cached data available
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Update prompt
  if (showUpdatePrompt) {
    return (
      <div className="fixed bottom-24 left-4 right-4 z-50">
        <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Update Available</p>
                  <p className="text-xs text-blue-100 opacity-90">
                    New features and improvements
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 h-8 px-3"
                  onClick={() => setShowUpdatePrompt(false)}
                >
                  Later
                </Button>
                <Button
                  size="sm"
                  className="bg-white text-blue-600 hover:bg-blue-50 h-8 px-4 font-semibold"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Install prompt
  if (showInstallPrompt && isInstallable && !isInstalled) {
    return (
      <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl border-0">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Install Float Chat</p>
                  <p className="text-sm text-indigo-100 opacity-90">
                    Get the full app experience
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                onClick={() => setShowInstallPrompt(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <Star className="h-4 w-4 text-yellow-300" />
                <span>Offline access to oceanographic data</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Download className="h-4 w-4 text-green-300" />
                <span>Faster loading and better performance</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Wifi className="h-4 w-4 text-blue-300" />
                <span>Push notifications for new data</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="ghost"
                className="flex-1 text-white hover:bg-white/20 border border-white/30"
                onClick={() => setShowInstallPrompt(false)}
              >
                Not Now
              </Button>
              <Button
                className="flex-1 bg-white text-indigo-600 hover:bg-indigo-50 font-semibold"
                onClick={handleInstall}
              >
                <Download className="h-4 w-4 mr-2" />
                Install App
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}