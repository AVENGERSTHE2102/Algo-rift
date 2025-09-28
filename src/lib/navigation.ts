import { Home, Globe, MessageCircle, Download } from 'lucide-react';

export const navItems = [
  {
    path: '/',
    icon: Home,
    label: 'Dashboard',
    activeColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    path: '/map',
    icon: Globe,
    label: 'Globe View',
    activeColor: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    path: '/chat',
    icon: MessageCircle,
    label: 'Chat',
    activeColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    path: '/export',
    icon: Download,
    label: 'Export',
    activeColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];
