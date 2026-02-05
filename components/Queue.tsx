import React, { useState, useRef } from 'react';
import { 
  Calendar, 
  Search, 
  Bolt, 
  TrendingUp, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  Clock,
  PlusCircle,
  RefreshCw,
  GripVertical
} from 'lucide-react';
import { ViewState } from '../types';

interface QueueProps {
  onChangeView?: (view: ViewState) => void;
}

interface QueueItem {
  id: string;
  type: 'post' | 'evergreen';
  time: string;
  isPeak?: boolean;
  content: string;
  images?: string[];
  statusColor?: string;
  evergreenName?: string;
}

export const Queue: React.FC<QueueProps> = ({ onChangeView }) => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: '1',
      type: 'post',
      time: 'Today at 4:30 PM',
      isPeak: true,
      content: "Just finished a deep dive into UI design systems. The secret to consistency isn't just documentation—it's shared language between design and dev. 🚀 #DesignSystems #WebDev",
      images: ["https://picsum.photos/400/300?random=1", "https://picsum.photos/400/300?random=2"],
      statusColor: 'bg-primary-500'
    },
    {
      id: '2',
      type: 'post',
      time: 'Tomorrow at 9:00 AM',
      content: "Thread coming soon: 10 tools that will change your productivity game in 2024. Stay tuned! 🧵👇",
      statusColor: 'bg-slate-300'
    },
    {
      id: '3',
      type: 'evergreen',
      time: 'Tomorrow at 2:00 PM',
      content: "Why 90% of creators fail: They optimize for tools before they optimize for systems. Pick a process, stick to it for 3 months, THEN automate.",
      statusColor: 'bg-amber-500',
      evergreenName: 'Best of 2023'
    }
  ]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    // Set effect allowed
    e.dataTransfer.effectAllowed = 'move';
    // Make the ghost image look a bit transparent (optional UI tweak)
    const target = e.target as HTMLDivElement;
    target.style.opacity = '0.5';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.opacity = '1';

    if (dragItem.current !== null && dragOverItem.current !== null) {
      const copyListItems = [...queueItems];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setQueueItems(copyListItems);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 h-full overflow-y-auto">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-6 lg:p-8">
        <div className="flex flex-col gap-1">
          <p className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Post Queue</p>
          <p className="text-slate-500 text-sm">Manage and optimize your upcoming content for @social_manager</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onChangeView?.('calendar')}
            className="flex items-center gap-2 rounded-lg h-10 px-4 bg-white text-slate-700 text-sm font-bold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
          >
            <Calendar size={18} />
            <span>Calendar View</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-6 lg:px-8 pb-12 h-full">
        {/* Main Feed */}
        <div className="flex-1 flex flex-col gap-6">
           {/* Smart Schedule Toggle */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center shadow-sm">
            <div className="flex gap-4">
              <div className="size-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                <Bolt size={24} />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-slate-900 text-base font-bold">Smart Schedule</p>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-600 uppercase">Recommended</span>
                </div>
                <p className="text-slate-500 text-sm">Automatically post at peak engagement times based on audience activity.</p>
              </div>
            </div>
            <label className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary-500 transition-colors">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <span className="h-4 w-4 translate-x-6 rounded-full bg-white transition-transform peer-checked:translate-x-6" />
            </label>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 gap-8">
            <button className="border-b-[3px] border-primary-500 text-primary-600 pb-3 text-sm font-bold">Upcoming ({queueItems.length})</button>
            <button className="border-b-[3px] border-transparent text-slate-500 pb-3 text-sm font-bold hover:text-slate-700">Past Posts</button>
            <button className="border-b-[3px] border-transparent text-slate-500 pb-3 text-sm font-bold hover:text-slate-700">Evergreen Slots</button>
          </div>

          {/* Post Items */}
          <div className="flex flex-col gap-4">
            
            {queueItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <div 
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="group relative flex gap-4 p-5 rounded-xl bg-white border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all cursor-move active:cursor-grabbing active:scale-[0.99]"
                >
                  <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="text-slate-300" />
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-2 w-2 rounded-full ${item.statusColor}`}></span>
                        <p className={`text-xs font-bold uppercase ${item.type === 'evergreen' ? 'text-amber-500' : 'text-slate-500'}`}>
                          {item.time}
                        </p>
                        {item.isPeak && (
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <TrendingUp size={14} /> Peak Hour
                          </span>
                        )}
                        {item.type === 'evergreen' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 uppercase flex items-center gap-1">
                            <RefreshCw size={10} /> Evergreen Slot
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                          <Edit3 size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {item.type === 'evergreen' && item.evergreenName ? (
                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-slate-500 text-sm italic mb-2">Recycling from "{item.evergreenName}" collection:</p>
                        <p className="text-slate-800 text-[15px] leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-slate-800 text-[15px] leading-relaxed">
                          {item.content}
                        </p>
                        {item.images && (
                          <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden border border-slate-100">
                            {item.images.map((img, i) => (
                              <div key={i} className="aspect-video bg-slate-200 bg-cover bg-center" style={{backgroundImage: `url("${img}")`}}></div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Gap Indicator (Only show between items if needed, for now logic kept simple) */}
                {index < queueItems.length - 1 && (
                  <div className="flex items-center gap-4 py-1 px-6 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="h-[1px] flex-1 bg-slate-300 border-t border-dashed"></div>
                    <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                      <PlusCircle size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">Add post here</span>
                    </button>
                    <div className="h-[1px] flex-1 bg-slate-300 border-t border-dashed"></div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Empty State / Bottom Add */}
            <div className="flex items-center gap-4 py-4 px-6 opacity-60 hover:opacity-100 transition-opacity">
              <div className="h-[1px] flex-1 bg-slate-300 border-t border-dashed"></div>
              <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                <PlusCircle size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Add post to end of queue</span>
              </button>
              <div className="h-[1px] flex-1 bg-slate-300 border-t border-dashed"></div>
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden xl:flex w-80 flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="text-primary-500" size={18} />
              Evergreen Slots
            </h3>
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Morning Motivation</p>
                <p className="text-[11px] text-slate-500">32 posts • Daily at 8:00 AM</p>
                <div className="mt-2 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full w-2/3"></div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Tech Tips</p>
                <p className="text-xs text-slate-500">14 posts • Mon, Wed, Fri</p>
                <div className="mt-2 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full w-1/4"></div>
                </div>
              </div>
              <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-primary-500 hover:text-primary-500 transition-all">
                + New Evergreen Slot
              </button>
            </div>
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-slate-900 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                <Bolt size={18} />
              </div>
              <p className="text-xs font-bold">Scheduling Tip</p>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Tweets with images get 150% more retweets on average. Consider adding a visual to your 9:00 AM post.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
