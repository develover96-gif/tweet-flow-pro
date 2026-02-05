import React, { useState } from 'react';
import { 
  User, 
  Link, 
  Bell, 
  CreditCard, 
  Bot, 
  ChevronRight, 
  Repeat, 
  Moon, 
  Sliders,
  CheckCircle,
  Github,
  Linkedin,
  Twitter,
  Triangle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('automation');

  const connections = [
    { id: 'twitter', name: 'X (Twitter)', icon: Twitter, connected: true, username: '@social_manager', color: 'bg-slate-900 text-white' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, connected: true, username: 'Alex Johnson', color: 'bg-[#0077b5] text-white' },
    { id: 'github', name: 'GitHub', icon: Github, connected: false, description: 'Connect to sync repositories and commit history.', color: 'bg-[#24292e] text-white' },
    { id: 'linear', name: 'Linear', icon: Triangle, connected: false, description: 'Sync issue tracking and project updates.', color: 'bg-[#5e6ad2] text-white' },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 p-6 lg:p-10 h-full overflow-y-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-slate-900 text-3xl font-black">App Settings</h1>
        <p className="text-slate-500 text-sm">Configure your workspace automation and account preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-0 rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50">
          <nav className="flex flex-col p-4 gap-1">
            {[
              { id: 'account', icon: User, label: 'Account' },
              { id: 'connections', icon: Link, label: 'Connections' },
              { id: 'automation', icon: Bot, label: 'Automation' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'billing', icon: CreditCard, label: 'Billing' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center justify-between px-4 py-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-white shadow-sm border border-slate-200 text-primary-600' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={activeTab === item.id ? 'text-primary-600' : ''} />
                  <span className={`text-sm ${activeTab === item.id ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight size={18} />}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6 lg:p-10">
          
          {activeTab === 'automation' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Automation Preferences</h2>
                  <p className="text-sm text-slate-500 mt-1">Fine-tune how TweetFlow interacts with your queue.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold border border-primary-100">Auto-Save Enabled</span>
              </div>

              <div className="flex flex-col gap-10 max-w-2xl">
                <div className="flex items-start justify-between gap-6 pb-8 border-b border-slate-100">
                  <div className="flex gap-4">
                    <div className="mt-1 size-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-600 shrink-0">
                      <Repeat size={20} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-base font-bold text-slate-900">Auto-Retweet</label>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Automatically retweet your best performing posts from the last 24 hours to maximize reach.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex flex-col gap-4 pb-8 border-b border-slate-100">
                  <div className="flex gap-4">
                    <div className="mt-1 size-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                      <Moon size={20} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold text-slate-900">Quiet Hours</h3>
                      <p className="text-sm text-slate-500">Pause all automation and notifications during specific hours.</p>
                    </div>
                  </div>
                  <div className="pl-[56px] grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Start Time</label>
                      <input type="time" defaultValue="22:00" className="w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">End Time</label>
                      <input type="time" defaultValue="08:00" className="w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="mt-1 size-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                      <Sliders size={20} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold text-slate-900">Smart Scheduling Sensitivity</h3>
                      <p className="text-sm text-slate-500">Adjust how aggressively the AI fills empty slots.</p>
                    </div>
                  </div>
                  <div className="pl-[56px] pt-2">
                    <input type="range" min="1" max="3" step="1" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                    <div className="flex justify-between mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <span>Conservative</span>
                      <span className="text-primary-600">Balanced</span>
                      <span>Aggressive</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200">
                  <button className="rounded-lg h-11 px-8 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold shadow-lg shadow-primary-500/25 transition-all">Save Changes</button>
                  <button className="rounded-lg h-11 px-6 bg-transparent hover:bg-slate-100 text-slate-600 text-sm font-bold transition-all">Discard</button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'connections' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Integrations & Connections</h2>
                  <p className="text-sm text-slate-500 mt-1">Manage your connected social accounts and tools.</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors">
                  Add New Connection
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {connections.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`size-12 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                        {item.connected ? (
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm text-slate-600 font-medium">{item.username}</span>
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              <CheckCircle size={10} /> Connected
                            </span>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500 mt-0.5">{item.description}</p>
                        )}
                      </div>
                    </div>
                    <button 
                      className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${
                        item.connected 
                          ? 'border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200' 
                          : 'border-slate-200 bg-slate-50 text-slate-900 hover:bg-white hover:border-primary-300 hover:text-primary-600'
                      }`}
                    >
                      {item.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {(activeTab !== 'automation' && activeTab !== 'connections') && (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <Sliders size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Work in Progress</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-xs">This settings section is currently under development.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};