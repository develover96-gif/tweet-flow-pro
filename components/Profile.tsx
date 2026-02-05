import React from 'react';
import { Share2, Edit, CheckCircle, MoreVertical, Trash, Github, Linkedin, Twitter, Triangle } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 p-6 lg:p-10 h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="size-24 rounded-full bg-cover bg-center border-4 border-white shadow-sm" style={{backgroundImage: 'url("https://picsum.photos/200")'}}></div>
            <div className="absolute bottom-0 right-0 size-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Alex Johnson</h1>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <span className="text-sm font-medium">@social_manager</span>
              <span className="size-1 rounded-full bg-slate-300"></span>
              <span className="text-sm">Pro Plan</span>
            </div>
            <p className="mt-2 text-sm text-slate-600 max-w-lg">Content strategist & ghostwriter for B2B SaaS founders. Scaling brands through storytelling.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            <Share2 size={18} />
            Share Profile
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
            <Edit size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Connected Accounts</h3>
              <button className="text-sm text-primary-600 font-bold hover:underline">Add Account</button>
            </div>
            <div className="divide-y divide-slate-100">
              {/* Twitter */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                    <Twitter size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">@social_manager</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle size={12} /> Connected
                    </p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              
              {/* LinkedIn */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-[#0077b5] flex items-center justify-center text-white">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Alex Johnson</p>
                    <p className="text-xs text-slate-400">Last synced 2h ago</p>
                  </div>
                </div>
                 <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* GitHub */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-[#24292e] flex items-center justify-center text-white">
                    <Github size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">alex-dev</p>
                    <p className="text-xs text-slate-400">Last synced 5m ago</p>
                  </div>
                </div>
                 <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Linear */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-[#5e6ad2] flex items-center justify-center text-white">
                    <Triangle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">TweetFlow Product</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle size={12} /> Connected
                    </p>
                  </div>
                </div>
                 <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Team Members</h3>
              <button className="text-sm text-primary-600 font-bold hover:underline">Invite Member</button>
            </div>
            <div className="divide-y divide-slate-100">
               <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">AJ</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Alex Johnson (You)</p>
                    <p className="text-xs text-slate-500">Owner</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">Admin</span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">SM</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Sarah Miller</p>
                    <p className="text-xs text-slate-500">sarah@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">Editor</span>
                  <button className="text-slate-400 hover:text-red-500 transition-colors"><Trash size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};