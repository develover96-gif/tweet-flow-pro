import React from 'react';
import { 
  LayoutDashboard, 
  ListTodo, 
  PenTool, 
  RefreshCw, 
  BarChart2, 
  Settings, 
  User, 
  Zap,
  LayoutTemplate
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'studio', label: 'Studio', icon: Zap },
    { id: 'queue', label: 'Queue', icon: ListTodo },
    { id: 'composer', label: 'Composer', icon: PenTool },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'evergreen', label: 'Evergreen', icon: RefreshCw },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-slate-200 bg-white h-full shrink-0">
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col">
          <h1 className="text-slate-900 text-base font-bold">Creator Hub</h1>
          <p className="text-slate-500 text-xs font-medium">@social_manager</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-primary-600' : 'text-slate-500'} />
                <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
              </button>
            );
          })}
          
          <div className="my-2 border-t border-slate-100"></div>
          
          <button
            onClick={() => onChangeView('settings')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentView === 'settings' 
                ? 'bg-primary-50 text-primary-600' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Settings size={20} className={currentView === 'settings' ? 'text-primary-600' : 'text-slate-500'} />
            <span className="text-sm font-medium">Settings</span>
          </button>

          <button
             onClick={() => onChangeView('profile')}
             className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentView === 'profile' 
                ? 'bg-primary-50 text-primary-600' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
             <User size={20} className={currentView === 'profile' ? 'text-primary-600' : 'text-slate-500'} />
             <span className="text-sm font-medium">Profile</span>
          </button>
        </nav>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-br from-primary-50 to-transparent p-4 rounded-xl border border-primary-100">
          <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">Pro Plan</p>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Unlock advanced analytics and unlimited evergreen slots.
          </p>
          <button className="w-full flex items-center justify-center rounded-lg h-9 px-4 bg-primary-500 text-white text-xs font-bold transition-transform hover:scale-[1.02] shadow-sm shadow-primary-500/30">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};
