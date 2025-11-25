import React from 'react';
import { Home, History, GraduationCap, User, Settings, Database, Library } from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  activePage: ViewType;
  onNavigate: (page: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 h-full z-20 flex-shrink-0">
      {/* Brand Logo - Clean & Simple */}
      <div 
        className="mb-10 cursor-pointer hover:opacity-80 transition-opacity flex flex-col items-center justify-center gap-1"
        onClick={() => onNavigate('home')}
      >
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
           <Library size={24} />
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-6 w-full items-center">
        <SidebarIcon 
          icon={<Home size={24} />} 
          label="Home"
          active={activePage === 'home'} 
          onClick={() => onNavigate('home')}
        />
        <SidebarIcon 
          icon={<Database size={24} />} 
          label="Workspace"
          active={activePage === 'workspace'} 
          onClick={() => onNavigate('workspace')}
        />
        <SidebarIcon 
          icon={<History size={24} />} 
          label="History"
          active={activePage === 'history'}
          onClick={() => onNavigate('history')}
        />
        <SidebarIcon 
          icon={<GraduationCap size={24} />} 
          label="Learn"
          active={activePage === 'learn'}
          onClick={() => onNavigate('learn')}
        />
        <SidebarIcon 
          icon={<User size={24} />} 
          label="Profile"
          active={activePage === 'profile'}
          onClick={() => onNavigate('profile')}
        />
      </nav>

      <div className="mt-auto pb-4">
        <SidebarIcon 
          icon={<Settings size={24} />} 
          label="Settings"
          active={activePage === 'settings'}
          onClick={() => onNavigate('settings')}
        />
      </div>
    </div>
  );
};

const SidebarIcon: React.FC<{ 
  icon: React.ReactNode; 
  active?: boolean; 
  onClick?: () => void;
  label: string; 
}> = ({ icon, active, onClick, label }) => (
  <div 
    onClick={onClick}
    className={`group relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
      active 
        ? 'text-indigo-600 bg-indigo-50 shadow-sm' 
        : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
    }`}
  >
    {icon}
    {/* Tooltip */}
    <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
      {label}
    </span>
  </div>
);