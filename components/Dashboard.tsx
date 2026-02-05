import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Heart, Eye, ArrowRight, MoreHorizontal } from 'lucide-react';

const dataGrowth = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 8000 },
  { name: 'Fri', value: 6500 },
  { name: 'Sat', value: 11000 },
  { name: 'Sun', value: 12500 },
];

const dataMix = [
  { name: 'Threads', value: 45, color: '#607AFB' },
  { name: 'Images', value: 30, color: '#A5B4FC' },
  { name: 'Links', value: 15, color: '#34D399' },
  { name: 'Videos', value: 10, color: '#F472B6' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 p-6 lg:p-10 overflow-y-auto bg-slate-50">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back! Here's what's happening with your account today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
          <button className="px-3 py-1.5 text-xs font-bold rounded bg-slate-100 text-slate-900 shadow-sm">Last 7 Days</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded text-slate-500 hover:text-slate-900">Last 30 Days</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded text-slate-500 hover:text-slate-900">Custom</button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center text-primary-500">
                <BarChart className="size-4" />
              </div>
              <span className="text-sm font-semibold text-slate-500">Impressions</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-bold flex items-center gap-0.5">
              <TrendingUp size={14} /> 12.5%
            </span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">245.8K</p>
            <p className="text-xs text-slate-400 mt-1">vs 218.4K previous period</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Heart className="size-4" />
              </div>
              <span className="text-sm font-semibold text-slate-500">Engagement Rate</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-bold flex items-center gap-0.5">
              <TrendingUp size={14} /> 3.2%
            </span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">4.8%</p>
            <p className="text-xs text-slate-400 mt-1">vs 4.6% previous period</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Users className="size-4" />
              </div>
              <span className="text-sm font-semibold text-slate-500">Profile Visits</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-bold flex items-center gap-0.5">
              <TrendingDown size={14} /> 0.8%
            </span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">1,203</p>
            <p className="text-xs text-slate-400 mt-1">vs 1,214 previous period</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Follower Growth</h3>
            <button className="text-slate-400 hover:text-primary-500 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataGrowth}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#607AFB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#607AFB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#607AFB" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Content Mix</h3>
            <button className="text-slate-400 hover:text-primary-500 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={dataMix}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {dataMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none pb-12">
              <span className="text-3xl font-black text-slate-900">124</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Posts</span>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 mt-4">
              {dataMix.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="size-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                    <span className="text-[10px] text-slate-400">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
          <button className="text-sm font-semibold text-primary-500 hover:underline">View All</button>
        </div>
        <div className="flex flex-col">
          <div className="flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors border-b border-slate-50">
            <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-500 shrink-0">
              <Eye size={20} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-slate-800 font-medium">
                Post <span className="font-bold">"Why Design Systems Matter"</span> was successfully published.
              </p>
              <p className="text-xs text-slate-400">Just now • via Auto-Schedule</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors border-b border-slate-50">
            <div className="size-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <Users size={20} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-slate-800 font-medium">
                You reached a new milestone: <span className="font-bold">15,000 Followers!</span> 🎉
              </p>
              <p className="text-xs text-slate-400">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
