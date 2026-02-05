import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Archive, 
  RefreshCw,
  Edit2,
  X,
  Clock,
  Calendar,
  Trash2,
  Check,
  Save,
  AlertCircle
} from 'lucide-react';

interface EvergreenPost {
  id: number;
  content: string;
  lastPosted: string;
}

interface EvergreenSlot {
  id: number;
  name: string;
  schedule: string; // Display string
  days: string[];
  time: string;
  postCount: number;
  status: 'active' | 'paused';
  color: string;
  posts: EvergreenPost[];
}

export const Evergreen: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<EvergreenSlot | null>(null);

  const [slots, setSlots] = useState<EvergreenSlot[]>([
    { 
      id: 1, 
      name: 'Morning Motivation', 
      schedule: 'Daily • 8:00 AM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      time: '08:00',
      postCount: 32, 
      status: 'active', 
      color: 'bg-amber-100 text-amber-600',
      posts: [
        { id: 101, content: "Success is not final, failure is not fatal: it is the courage to continue that counts. #Motivation", lastPosted: "2 days ago" },
        { id: 102, content: "Believe you can and you're halfway there.", lastPosted: "5 days ago" },
        { id: 103, content: "The only way to do great work is to love what you do.", lastPosted: "1 week ago" }
      ]
    },
    { 
      id: 2, 
      name: 'Tech Tips', 
      schedule: 'Mon, Wed, Fri • 2:00 PM',
      days: ['Mon', 'Wed', 'Fri'],
      time: '14:00',
      postCount: 14, 
      status: 'active', 
      color: 'bg-blue-100 text-blue-600',
      posts: [
        { id: 201, content: "Use CSS Grid for 2D layouts and Flexbox for 1D layouts. 🛠️ #WebDev #CSS", lastPosted: "Yesterday" },
        { id: 202, content: "Always sanitize your database inputs. SQL injection is still #1. 🔒", lastPosted: "3 days ago" }
      ]
    },
    { 
      id: 3, 
      name: 'Product Promos', 
      schedule: 'Every Tuesday • 11:00 AM',
      days: ['Tue'],
      time: '11:00',
      postCount: 8, 
      status: 'paused', 
      color: 'bg-purple-100 text-purple-600',
      posts: [
        { id: 301, content: "Check out our new feature! It saves you 5 hours a week. 🚀", lastPosted: "2 weeks ago" }
      ]
    }
  ]);

  // New Slot Form State
  const [newSlotName, setNewSlotName] = useState('');
  const [newSlotTime, setNewSlotTime] = useState('');
  const [newSlotDays, setNewSlotDays] = useState<string[]>([]);

  // Add Content Modal State
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [newContentText, setNewContentText] = useState('');
  const [newContentLastPosted, setNewContentLastPosted] = useState('');

  const handleCreateSlot = () => {
    if (!newSlotName || !newSlotTime || newSlotDays.length === 0) return;

    const newId = Math.max(...slots.map(s => s.id)) + 1;
    const daysStr = newSlotDays.length === 7 ? 'Daily' : newSlotDays.join(', ');
    const timeStr = new Date(`2000-01-01T${newSlotTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    const createdSlot: EvergreenSlot = {
      id: newId,
      name: newSlotName,
      schedule: `${daysStr} • ${timeStr}`,
      days: newSlotDays,
      time: newSlotTime,
      postCount: 0,
      status: 'active',
      color: 'bg-green-100 text-green-600', // Default color
      posts: []
    };

    setSlots([...slots, createdSlot]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleAddContent = () => {
    if (!selectedSlot || !newContentText) return;

    const newPost: EvergreenPost = {
      id: Date.now(),
      content: newContentText,
      lastPosted: newContentLastPosted ? new Date(newContentLastPosted).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'
    };

    const updatedSlots = slots.map(slot => {
      if (slot.id === selectedSlot.id) {
        return {
          ...slot,
          posts: [...slot.posts, newPost],
          postCount: slot.posts.length + 1
        };
      }
      return slot;
    });

    setSlots(updatedSlots);
    // Update the currently viewed slot as well
    const updatedSelectedSlot = updatedSlots.find(s => s.id === selectedSlot.id) || null;
    setSelectedSlot(updatedSelectedSlot);

    // Reset and close
    setNewContentText('');
    setNewContentLastPosted('');
    setIsAddContentModalOpen(false);
  };

  const resetForm = () => {
    setNewSlotName('');
    setNewSlotTime('');
    setNewSlotDays([]);
  };

  const toggleDay = (day: string) => {
    if (newSlotDays.includes(day)) {
      setNewSlotDays(newSlotDays.filter(d => d !== day));
    } else {
      setNewSlotDays([...newSlotDays, day]);
    }
  };

  const handleDeleteSlot = (id: number) => {
    setSlots(slots.filter(s => s.id !== id));
    setSelectedSlot(null);
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 h-full overflow-y-auto p-6 lg:p-8 relative">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-slate-900 text-3xl font-black">Evergreen Library</h1>
          <p className="text-slate-500 text-sm mt-1">Manage recycling queues and recurring content slots.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg h-10 px-4 bg-white text-slate-700 text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-colors">
            <Upload size={18} />
            <span>Bulk Upload</span>
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-lg h-10 px-4 bg-primary-500 text-white text-sm font-bold hover:bg-primary-600 shadow-md transition-all"
          >
            <Plus size={18} />
            <span>Add New Slot</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {slots.map((slot) => (
          <div 
            key={slot.id} 
            onClick={() => setSelectedSlot(slot)}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-primary-300 transition-all shadow-sm group cursor-pointer hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`size-10 rounded-full flex items-center justify-center ${slot.color}`}>
                <RefreshCw size={20} />
              </div>
              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={20} /></button>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900">{slot.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{slot.schedule}</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <Archive size={18} className="text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">{slot.postCount} Posts</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${slot.status === 'paused' ? 'bg-slate-100 text-slate-500' : 'bg-green-50 text-green-600'}`}>
                {slot.status === 'paused' ? 'Paused' : 'Active'}
              </span>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add Card */}
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex flex-col items-center justify-center gap-3 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-5 hover:border-primary-300 hover:bg-slate-100 transition-all cursor-pointer min-h-[180px] group"
        >
          <div className="size-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-primary-500 shadow-sm transition-colors">
            <Plus size={20} />
          </div>
          <p className="text-sm font-bold text-slate-500 group-hover:text-primary-600 transition-colors">Create New Slot</p>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-base font-bold text-slate-900 mr-auto">Global Content Repository</h3>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none" 
                placeholder="Search content..." 
                type="text"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-900 w-1/2">Content Preview</th>
                <th className="px-6 py-3 font-semibold text-slate-900">Category</th>
                <th className="px-6 py-3 font-semibold text-slate-900">Last Posted</th>
                <th className="px-6 py-3 font-semibold text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3, 4].map((item, idx) => (
                <tr key={item} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-slate-800 line-clamp-2">Success is not final, failure is not fatal: it is the courage to continue that counts. #Motivation #Grind</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      Motivation
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">2 days ago</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary-600 transition-colors">
                      <Edit2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Slot Modal */}
        {isCreateModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4 animate-in fade-in duration-200 fixed">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-lg font-black text-slate-900">Create New Slot</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Slot Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Wednesday Wisdom" 
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                    value={newSlotName}
                    onChange={(e) => setNewSlotName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Schedule Days</label>
                  <div className="flex gap-2">
                    {weekDays.map(day => (
                      <button 
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`size-9 rounded-full text-xs font-bold transition-all ${
                          newSlotDays.includes(day) 
                            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30' 
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {day.charAt(0)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="time" 
                      className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                      value={newSlotTime}
                      onChange={(e) => setNewSlotTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                  <AlertCircle className="text-blue-600 shrink-0" size={20} />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-blue-900">Smart Tip</p>
                    <p className="text-xs text-blue-700 leading-relaxed">Evergreen slots recycle content automatically. Once a post is published, it moves to the back of the queue for this slot.</p>
                  </div>
                </div>

              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-200 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateSlot}
                  disabled={!newSlotName || !newSlotTime || newSlotDays.length === 0}
                  className="px-6 py-2 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {selectedSlot && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4 animate-in fade-in duration-200 fixed">
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-slate-200 flex flex-col">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50 shrink-0">
                  <div className="flex gap-4">
                    <div className={`size-12 rounded-xl flex items-center justify-center shadow-sm ${selectedSlot.color}`}>
                       <RefreshCw size={24} />
                    </div>
                    <div>
                       <h2 className="text-xl font-black text-slate-900">{selectedSlot.name}</h2>
                       <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${selectedSlot.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                             {selectedSlot.status}
                          </span>
                          <span className="text-slate-400 text-xs">•</span>
                          <span className="text-slate-500 text-xs font-medium">{selectedSlot.schedule}</span>
                       </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteSlot(selectedSlot.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button onClick={() => setSelectedSlot(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors ml-2">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Queue Content ({selectedSlot.posts.length})</h3>
                      <button 
                        onClick={() => setIsAddContentModalOpen(true)}
                        className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1"
                      >
                         <Plus size={14} /> Add Content
                      </button>
                   </div>
                   
                   {selectedSlot.posts.length > 0 ? (
                     <div className="flex flex-col gap-3">
                        {selectedSlot.posts.map((post) => (
                          <div key={post.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-primary-300 transition-all group">
                             <p className="text-slate-800 text-sm leading-relaxed mb-3">{post.content}</p>
                             <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-400 font-medium">Last posted: {post.lastPosted}</span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button className="text-xs font-bold text-slate-500 hover:text-slate-900">Edit</button>
                                   <button className="text-xs font-bold text-red-500 hover:text-red-700">Remove</button>
                                </div>
                             </div>
                          </div>
                        ))}
                     </div>
                   ) : (
                     <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <Archive className="mx-auto text-slate-300 mb-2" size={32} />
                        <p className="text-slate-500 font-medium text-sm">No content in this slot yet.</p>
                     </div>
                   )}
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex justify-between items-center text-xs text-slate-500">
                   <span>ID: #{selectedSlot.id}</span>
                   <span>Created via TweetFlow App</span>
                </div>
             </div>
          </div>
        )}

        {/* Add Content Modal */}
        {isAddContentModalOpen && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4 animate-in fade-in duration-200 fixed">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
                     <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-lg font-black text-slate-900">Add Content to Slot</h3>
                        <button onClick={() => setIsAddContentModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                          <X size={20} />
                        </button>
                     </div>
                     
                     <div className="p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700">Post Content</label>
                            <textarea 
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none resize-none h-32"
                                placeholder="Write your tweet here..."
                                value={newContentText}
                                onChange={(e) => setNewContentText(e.target.value)}
                            ></textarea>
                        </div>
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700">Last Posted (Optional)</label>
                            <input 
                                type="date" 
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                                value={newContentLastPosted}
                                onChange={(e) => setNewContentLastPosted(e.target.value)}
                            />
                             <p className="text-xs text-slate-400">Leave blank if this is new content.</p>
                        </div>
                     </div>
        
                     <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                        <button 
                          onClick={() => setIsAddContentModalOpen(false)}
                          className="px-4 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-200 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleAddContent}
                          disabled={!newContentText}
                          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Add to Queue
                        </button>
                      </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};