import React, { useState, useEffect } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Smile, 
  AlignLeft, 
  CalendarClock, 
  Send,
  MoreVertical,
  Plus,
  Clock,
  CheckCircle2,
  Copy
} from 'lucide-react';

interface ComposerProps {
  initialTweets?: { id: number; text: string }[] | null;
}

export const Composer: React.FC<ComposerProps> = ({ initialTweets }) => {
  const [tweets, setTweets] = useState(initialTweets && initialTweets.length > 0 ? initialTweets : [
    { id: 1, text: "Just finished a deep dive into UI design systems. The secret to consistency isn't just documentation—it's shared language between design and dev. 🚀 #DesignSystems #WebDev" },
    { id: 2, text: "" }
  ]);

  // Effect to load template tweets if provided
  useEffect(() => {
    if (initialTweets && initialTweets.length > 0) {
      setTweets(initialTweets);
    }
  }, [initialTweets]);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');

  const handleScheduleConfirm = () => {
    if (!scheduledDate) return;
    // In a real application, this would sync to the backend
    const dateObj = new Date(scheduledDate);
    alert(`Successfully scheduled for ${dateObj.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}`);
    setShowScheduleModal(false);
    setScheduledDate('');
  };

  const handleDuplicateToThread = (index: number) => {
    const currentContent = tweets[index].text;
    const newTweet = { id: Date.now(), text: currentContent };
    const newTweets = [...tweets];
    // Insert after current index
    newTweets.splice(index + 1, 0, newTweet);
    setTweets(newTweets);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm z-10">
        <div>
          <h1 className="text-slate-900 text-2xl font-black">New Thread</h1>
          <p className="text-slate-500 text-sm">Compose your story, piece by piece.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg h-9 px-4 text-slate-600 hover:bg-slate-100 text-sm font-bold transition-colors">
            Discard
          </button>
          <button className="flex items-center gap-2 rounded-lg h-9 px-4 text-primary-600 bg-primary-50 hover:bg-primary-100 text-sm font-bold transition-colors">
            Save Draft
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24">
          <div className="max-w-2xl mx-auto flex flex-col gap-0">
            
            {tweets.map((tweet, index) => (
              <div key={tweet.id} className="group relative flex gap-4">
                <div className="flex flex-col items-center pt-2">
                  <div className="size-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm z-10">
                    {index + 1}
                  </div>
                  {index !== tweets.length - 1 && <div className="w-0.5 bg-slate-200 flex-1 my-1"></div>}
                </div>
                
                <div className="flex-1 mb-6">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group-focus-within:border-primary-300">
                    <div className="p-4">
                      <textarea 
                        className="w-full bg-transparent border-none focus:ring-0 resize-none text-[16px] leading-relaxed text-slate-800 placeholder:text-slate-400 min-h-[100px] outline-none" 
                        placeholder="What's happening?"
                        value={tweet.text}
                        onChange={(e) => {
                          const newTweets = [...tweets];
                          newTweets[index].text = e.target.value;
                          setTweets(newTweets);
                        }}
                      />
                      {index === 0 && !initialTweets && (
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                            <img src="https://picsum.photos/400/300?random=1" alt="preview" className="w-full h-full object-cover" />
                             <button className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded hover:bg-red-500 transition-colors"><X size={14} /></button>
                          </div>
                          <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                             <img src="https://picsum.photos/400/300?random=2" alt="preview" className="w-full h-full object-cover" />
                             <button className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded hover:bg-red-500 transition-colors"><X size={14} /></button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-b-xl border-t border-slate-100">
                      <div className="flex gap-2 text-primary-500">
                        <button className="p-1.5 hover:bg-primary-50 rounded transition-colors"><ImageIcon size={18} /></button>
                        <button className="p-1.5 hover:bg-primary-50 rounded transition-colors"><AlignLeft size={18} /></button>
                        <button className="p-1.5 hover:bg-primary-50 rounded transition-colors"><Smile size={18} /></button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleDuplicateToThread(index)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          title="Duplicate content to new tweet"
                        >
                          <Copy size={12} />
                          Post as Thread
                        </button>
                        <div className="h-4 w-px bg-slate-300 mx-1"></div>
                        <span className="text-xs font-medium text-slate-400">142/280</span>
                        <div className="relative size-5 rounded-full border-2 border-slate-200 border-t-primary-500 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <div className="flex flex-col items-center pt-2 opacity-50">
                 <div className="size-8 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-bold text-sm bg-slate-50">+</div>
              </div>
              <button 
                onClick={() => setTweets([...tweets, { id: Date.now(), text: "" }])}
                className="flex-1 flex items-center justify-center gap-2 py-6 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all group"
              >
                <div className="size-8 rounded-full bg-slate-200 group-hover:bg-primary-500 group-hover:text-white flex items-center justify-center transition-colors">
                  <Plus size={20} />
                </div>
                <span className="font-bold text-sm">Add another tweet</span>
              </button>
            </div>

          </div>
        </div>

        {/* Live Preview Sidebar */}
        <div className="hidden xl:flex w-[400px] flex-col border-l border-slate-200 bg-white shrink-0">
          <div className="p-6 border-b border-slate-200">
            <h3 className="font-bold text-slate-900">Preview</h3>
          </div>
          <div className="flex-1 bg-slate-100 p-6 overflow-y-auto">
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <div className="flex gap-3">
                    <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center" style={{backgroundImage: 'url("https://picsum.photos/100")'}}></div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-900 text-[15px]">Alex Designer</span>
                        <span className="text-slate-500 text-[14px]">@social_manager · 1m</span>
                      </div>
                       <p className="text-[15px] text-slate-900 leading-normal mt-1 mb-2">
                        {tweets[0]?.text || "Your post preview will appear here..."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 text-center text-xs text-slate-500">
                  {tweets.length > 1 ? `Thread contains ${tweets.length} tweets` : 'Thread continues...'}
                </div>
             </div>
          </div>
        </div>

        {/* Scheduling Modal Overlay */}
        {showScheduleModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <CalendarClock className="text-primary-600" size={24} />
                  Schedule Post
                </h3>
                <p className="text-sm text-slate-500 mt-1">Pick the perfect time to reach your audience.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Date & Time</label>
                  <input 
                    type="datetime-local" 
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all font-medium"
                  />
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-primary-50 border border-primary-100 rounded-xl text-primary-800">
                  <Clock size={18} className="shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold">Smart Suggestion</span>
                    <p className="text-xs text-primary-700 leading-relaxed">
                      Your audience is most active tomorrow at <span className="font-bold">10:00 AM</span>. Scheduling then could boost engagement by ~15%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2.5 rounded-lg text-slate-600 font-bold hover:bg-slate-200 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleScheduleConfirm}
                  disabled={!scheduledDate}
                  className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Confirm Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 right-0 lg:right-[400px] bg-white/90 backdrop-blur border-t border-slate-200 p-4 lg:px-8 z-20">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
           <div className="text-sm text-slate-500">Thread length: {tweets.length} tweets</div>
           <div className="flex gap-3">
              <button 
                onClick={() => setShowScheduleModal(true)}
                className="flex items-center gap-2 rounded-lg h-10 px-6 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
              >
                <CalendarClock size={18} />
                <span>Schedule</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg h-10 px-8 bg-primary-500 text-white font-bold hover:bg-primary-600 shadow-lg shadow-primary-500/30 transition-all">
                <Send size={18} />
                <span>Post Now</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};