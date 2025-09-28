import logo from '../../Gemini_Generated_Image_6lyq3x6lyq3x6lyq-removebg-preview.png';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { navItems } from '../lib/navigation';
import { Waves } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  isMapView?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isMapView }) => {
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-40">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Float Chat Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Float Chat Platform</h1>
            <p className="text-xs text-gray-500">ARGO Data Analysis</p>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto z-30 pb-24">
        {isMapView ? (
          <div className="h-full">{children}</div>
        ) : (
          <div className="container mx-auto px-4 py-6">{children}</div>
        )}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? `${item.activeColor} ${item.bgColor}` 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;