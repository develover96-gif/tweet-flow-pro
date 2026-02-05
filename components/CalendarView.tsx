import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  List, 
  Twitter, 
  Linkedin, 
  MoreHorizontal,
  Image as ImageIcon,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ViewState } from '../types';

interface CalendarViewProps {
  onChangeView: (view: ViewState) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onChangeView }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days for grid

  // Mock posts data
  const posts = [
    { day: 3, type: 'twitter', title: 'Design Systems Thread', time: '10:00 AM', status: 'published' },
    { day: 3, type: 'linkedin', title: 'Leadership Lessons', time: '2:00 PM', status: 'published' },
    { day: 4, type: 'twitter', title: 'CSS Tips', time: '9:00 AM', status: 'scheduled' },
    { day: 6, type: 'twitter', title: 'Weekend Vibes', time: '11:00 AM', status: 'scheduled' },
    { day: 8, type: 'linkedin', title: 'SaaS Growth Metrics', time: '8:30 AM', status: 'scheduled' },
    { day: 10, type: 'twitter', title: 'Product Launch Teaser', time: '4:00 PM', status: 'draft' },
    { day: 12, type: 'twitter', title: 'Feature Spotlight', time: '10:00 AM', status: 'scheduled' },
    { day: 15, type: 'linkedin', title: 'Company Culture', time: '1:00 PM', status: 'scheduled' },
  ];

  const getPostsForDay = (day: number) => posts.filter(p => p.day === day);

  const getStatusBadgeStyles = (status: string) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'scheduled': return 'bg-primary-100 text-primary-700';
      case 'draft': return 'bg-slate-200 text-slate-600';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white shrink-0">
         <div className="flex items-center gap-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Content Calendar</h1>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
               <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-900"><ChevronLeft size={18} /></button>
               <span className="text-sm font-bold px-4 min-w-[120px] text-center text-slate-900">October 2023</span>
               <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-900"><ChevronRight size={18} /></button>
            </div>
         </div>
         <div className="flex gap-3">
             <button 
                onClick={() => onChangeView('queue')} 
                className="flex items-center gap-2 rounded-lg h-10 px-4 bg-white text-slate-700 text-sm font-bold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
             >
                <List size={18} />
                <span>List View</span>
             </button>
             <button 
                onClick={() => onChangeView('composer')}
                className="flex items-center gap-2 rounded-lg h-10 px-5 bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all"
             >
                <Plus size={18} />
                <span>New Post</span>
             </button>
         </div>
      </div>
      
      {/* Grid Header */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-white shrink-0 shadow-sm z-10">
        {days.map(day => (
           <div key={day} className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
             {day}
           </div>
        ))}
      </div>

      {/* Grid Body */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-slate-200 gap-px overflow-y-auto">
         {calendarDays.map((day, i) => {
            const dayPosts = getPostsForDay(i + 1); // Offset purely for visual mock matching
            const isCurrentMonth = i >= 0 && i < 31;
            const isToday = i === 3; // Mock "today"

            return (
              <div key={i} className={`min-h-[140px] bg-white p-2 flex flex-col gap-2 group hover:bg-slate-50 transition-colors ${!isCurrentMonth ? 'bg-slate-50/50' : ''}`}>
                <div className="flex justify-between items-start px-1">
                   <span className={`text-sm font-bold size-7 flex items-center justify-center rounded-full ${isToday ? 'bg-primary-600 text-white' : isCurrentMonth ? 'text-slate-700' : 'text-slate-300'}`}>
                     {i + 1 <= 31 ? i + 1 : i - 30}
                   </span>
                   {isToday && <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">Today</span>}
                   <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-primary-600 transition-all">
                     <Plus size={16} />
                   </button>
                </div>
                
                <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 custom-scrollbar">
                  {dayPosts.map((post, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2 rounded-lg border text-xs cursor-pointer hover:shadow-md transition-all group/card relative ${
                        post.status === 'published' 
                          ? 'bg-green-50 border-green-100 hover:border-green-300' 
                          : post.status === 'draft' 
                            ? 'bg-slate-50 border-slate-200 border-dashed hover:border-slate-400'
                            : 'bg-white border-slate-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                         <div className="flex items-center gap-1.5">
                            {post.type === 'twitter' ? (
                               <Twitter size={12} className={post.status === 'published' ? 'text-green-600' : 'text-slate-400'} />
                            ) : (
                               <Linkedin size={12} className={post.type === 'linkedin' ? 'text-[#0077b5]' : 'text-slate-400'} />
                            )}
                            <span className={`font-semibold ${post.status === 'published' ? 'text-green-700' : 'text-slate-600'}`}>{post.time}</span>
                         </div>
                      </div>
                      <p className={`font-medium line-clamp-2 mb-2 ${post.status === 'published' ? 'text-green-800' : 'text-slate-900'}`}>
                        {post.title}
                      </p>
                      
                      {/* Status Badge */}
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${getStatusBadgeStyles(post.status)}`}>
                        {post.status}
                      </span>
                      
                      {/* Hover Actions */}
                      <div className="hidden group-hover/card:flex absolute top-1 right-1 bg-white/90 backdrop-blur rounded-md border border-slate-200 shadow-sm">
                         <button className="p-1 hover:text-primary-600"><MoreHorizontal size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
         })}
      </div>
    </div>
  );
};
