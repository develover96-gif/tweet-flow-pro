
import React, { useState, useRef, useEffect } from 'react';
import { 
  Edit3, 
  Image as ImageIcon, 
  ArrowRight, 
  Sparkles, 
  X, 
  ChevronDown, 
  Wand2, 
  BarChart2,
  Smile,
  Calendar,
  BarChart,
  Plus,
  RefreshCw,
  Check,
  MoreHorizontal
} from 'lucide-react';

export const Studio: React.FC = () => {
  // State for Fast Draft
  const [draftText, setDraftText] = useState("");
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [commandFilter, setCommandFilter] = useState("");
  
  // State for AI Writer Modal
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiTone, setAiTone] = useState("Professional");
  const [aiLength, setAiLength] = useState(3);
  const [aiEmojis, setAiEmojis] = useState(true);
  const [aiPrompt, setAiPrompt] = useState("");

  // State for AI Image Generator Modal
  const [showImageGenModal, setShowImageGenModal] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("Futuristic city skyline with neon lights at night, cyberpunk style, high detail, 8k resolution");
  const [selectedRatio, setSelectedRatio] = useState("Square");
  const [selectedStyle, setSelectedStyle] = useState("Photorealistic");
  const [generatedImages, setGeneratedImages] = useState([1, 2, 3, 4]); // Placeholders
  const [selectedImage, setSelectedImage] = useState<number | null>(1);

  // State for Insights Panel
  const [showInsights, setShowInsights] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const aiWriterInputRef = useRef<HTMLTextAreaElement>(null);
  const imageGenInputRef = useRef<HTMLTextAreaElement>(null);

  // Handle text changes to detect slash commands
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDraftText(val);

    const match = val.match(/(?:\n|^|\s)\/([a-z]*)$/i);
    
    if (match) {
      setShowCommandMenu(true);
      setCommandFilter(match[1].toLowerCase());
    } else {
      setShowCommandMenu(false);
      setCommandFilter("");
    }
  };

  const handleCommandSelect = (command: string) => {
    const newText = draftText.replace(/(?:\n|^|\s)\/([a-z]*)$/i, '');
    setDraftText(newText.trimEnd());
    setShowCommandMenu(false);

    if (command === 'writer') {
      setShowAIModal(true);
      setTimeout(() => aiWriterInputRef.current?.focus(), 50);
    } else if (command === 'imagine') {
      setShowImageGenModal(true);
      setTimeout(() => imageGenInputRef.current?.focus(), 50);
    } else if (command === 'analyze') {
      setShowInsights(true);
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 1500); // Simulate analysis delay
    }
  };

  const handleGenerateDraft = () => {
    const generatedContent = `Here is a draft based on "${aiPrompt}" with a ${aiTone} tone:\n\n1. First point about the topic 🚀\n2. Second insight that adds value 💡\n3. Conclusion and call to action 👇\n\n#${aiTone} #Growth`;
    setDraftText(prev => prev ? `${prev}\n\n${generatedContent}` : generatedContent);
    setShowAIModal(false);
    setAiPrompt("");
  };

  const handleInsertImage = () => {
    // In a real app, this would insert markdown or attachment
    setDraftText(prev => prev + "\n[Image Attachment]");
    setShowImageGenModal(false);
  };

  const commands = [
    { 
      id: 'writer', 
      label: '/writer', 
      desc: 'AI Text Assistant', 
      icon: Sparkles,
      color: 'text-primary-600',
      bg: 'bg-white'
    },
    { 
      id: 'imagine', 
      label: '/imagine', 
      desc: 'AI Image Generator', 
      icon: ImageIcon,
      color: 'text-primary-600',
      bg: 'bg-slate-100'
    },
    { 
      id: 'analyze', 
      label: '/analyze', 
      desc: 'Content Insights', 
      icon: BarChart2,
      color: 'text-primary-600',
      bg: 'bg-slate-100'
    }
  ].filter(cmd => cmd.label.includes(commandFilter));

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 p-6 lg:p-10 h-full overflow-y-auto relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Creator Studio</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of your presence and quick drafting tools.</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs font-medium text-slate-400 self-end mb-1">Last synced: Just now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Fast Draft Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[400px] overflow-visible z-10">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Edit3 className="text-primary-600" size={20} />
                <h2 className="font-bold text-slate-900">Fast Draft</h2>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setDraftText("")}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 transition-colors"
                >
                  Clear
                </button>
                <button className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors">
                  Save as Draft
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col gap-6 relative">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                   <div className="size-10 rounded-full bg-cover bg-center border border-slate-200" style={{backgroundImage: 'url("https://picsum.photos/100")'}}></div>
                   <div className="w-0.5 flex-1 bg-slate-200 my-2"></div>
                </div>
                
                <div className="flex-1 pt-1 relative">
                   <textarea 
                      ref={textareaRef}
                      className="w-full bg-transparent border-none p-0 text-lg text-slate-900 placeholder:text-slate-400 focus:ring-0 resize-none leading-relaxed outline-none min-h-[120px]" 
                      placeholder="What's happening? Start your thread here..." 
                      rows={8}
                      value={draftText}
                      onChange={handleTextChange}
                   />
                   
                   {/* Slash Command Menu */}
                   {showCommandMenu && (
                     <div className="absolute top-10 left-0 z-50 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                       <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/50">
                         <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Commands</p>
                       </div>
                       <div className="p-1.5 flex flex-col gap-0.5">
                         {commands.length > 0 ? (
                           commands.map((cmd) => (
                             <button 
                               key={cmd.id}
                               onClick={() => handleCommandSelect(cmd.id)}
                               className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 text-left group transition-all"
                             >
                               <div className={`flex items-center justify-center size-8 rounded-md ${cmd.bg} ${cmd.color} border border-slate-100 shadow-sm`}>
                                 <cmd.icon size={18} />
                               </div>
                               <div className="flex flex-col">
                                 <span className="text-sm font-bold text-slate-900">{cmd.label}</span>
                                 <span className="text-xs text-slate-500">{cmd.desc}</span>
                               </div>
                             </button>
                           ))
                         ) : (
                           <div className="p-3 text-center text-xs text-slate-400 italic">
                             No commands found
                           </div>
                         )}
                       </div>
                     </div>
                   )}

                   <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <div className="flex gap-1 text-primary-600">
                        <button className="p-2 hover:bg-primary-50 rounded-full transition-colors" title="Add Image"><ImageIcon size={20} /></button>
                        <button className="p-2 hover:bg-primary-50 rounded-full transition-colors" title="Add GIF"><div className="border-2 border-current rounded text-[10px] font-bold px-0.5 h-5 flex items-center">GIF</div></button>
                        <button className="p-2 hover:bg-primary-50 rounded-full transition-colors" title="Add Poll"><BarChart size={20} className="rotate-90" /></button>
                        <button className="p-2 hover:bg-primary-50 rounded-full transition-colors" title="Schedule"><Calendar size={20} /></button>
                        <button className="p-2 hover:bg-primary-50 rounded-full transition-colors" title="Emoji"><Smile size={20} /></button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="size-5 rounded-full border-2 border-slate-200 border-t-primary-500 rotate-45"></div>
                        <div className="w-px h-5 bg-slate-200"></div>
                        <button className="flex items-center gap-1 text-primary-600 hover:text-primary-700 transition-colors font-bold text-sm">
                           <Plus size={18} />
                        </button>
                      </div>
                   </div>
                </div>
              </div>
              
               <div className="flex gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="flex flex-col items-center w-10">
                  <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Plus size={18} />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-slate-400 text-base font-medium">Add another tweet</p>
                </div>
              </div>

            </div>
             <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-lg">🌎</span>
                <span className="text-xs font-bold text-primary-600">Everyone can reply</span>
              </div>
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-full shadow-lg shadow-primary-500/25 transition-all transform hover:scale-105">
                Post All
              </button>
            </div>
          </div>

          {/* Recent Brainstorms */}
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1">Recent Brainstorms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-primary-300 cursor-pointer group transition-all shadow-sm">
                  <p className="text-slate-800 text-sm line-clamp-2 mb-3 leading-relaxed">
                    {i === 1 ? "Thoughts on the new CSS anchor positioning API. It's going to change how we build tooltips forever..." : "Why minimalist design is harder than maximalist. You have nowhere to hide."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Edited {i===1 ? '2h ago' : 'yesterday'}</span>
                    <ArrowRight className="text-slate-300 group-hover:text-primary-600 transition-colors" size={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Analytics or Quick Stats */}
        <div className="xl:col-span-4">
          {showInsights ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <BarChart2 className="text-primary-600" size={18} />
                  Content Insights
                </div>
                <span className="flex items-center gap-1 bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Live
                </span>
              </div>
              
              {isAnalyzing ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                   <div className="size-12 rounded-full border-4 border-slate-100 border-t-primary-500 animate-spin mb-4"></div>
                   <p className="font-bold text-slate-900">Analyzing Content...</p>
                   <p className="text-sm text-slate-500 mt-1">Checking virality potential and sentiment.</p>
                </div>
              ) : (
                <div className="p-5 flex flex-col gap-6 overflow-y-auto animate-in fade-in duration-500">
                  
                  {/* Virality Score */}
                  <div className="flex items-center gap-4">
                    <div className="relative size-16 shrink-0">
                      <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        <path className="text-primary-500 drop-shadow-sm" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="3" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-sm font-black text-slate-900">85</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">Virality Score</span>
                      <span className="text-xs text-slate-500">High potential to trend</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white border border-slate-100 shadow-sm">
                      <div className="text-slate-400 mb-1"><Smile size={18} /></div>
                      <p className="text-xs text-slate-500 font-medium">Sentiment</p>
                      <p className="text-sm font-bold text-slate-900">Positive</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-slate-100 shadow-sm">
                      <div className="text-slate-400 mb-1"><Calendar size={18} /></div>
                      <p className="text-xs text-slate-500 font-medium">Best Time</p>
                      <p className="text-sm font-bold text-slate-900">9:00 AM</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500">Hook Strength</span>
                      <span className="text-green-600">Strong</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-3/4 rounded-full"></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Great opening! The question sparks curiosity immediately.</p>
                  </div>

                  <div className="w-full h-px bg-slate-100"></div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-slate-500">Trending Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded-md bg-white text-primary-600 text-xs font-semibold border border-primary-100 cursor-pointer hover:bg-primary-50 transition-colors">#WebDev</span>
                      <span className="px-2 py-1 rounded-md bg-white text-slate-600 text-xs font-medium border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">#Coding</span>
                      <span className="px-2 py-1 rounded-md bg-white text-slate-600 text-xs font-medium border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">#Tech</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full">
              <h3 className="font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Queue Size</span>
                  <span className="font-bold text-slate-900">14 Posts</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Drafts</span>
                  <span className="font-bold text-slate-900">8</span>
                </div>
                <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 mt-6">
                  <div className="flex items-center gap-2 text-primary-700 mb-2">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold uppercase">Pro Tip</span>
                  </div>
                  <p className="text-xs text-primary-800 leading-relaxed">
                    Try using <strong>/analyze</strong> on your draft to get AI-powered feedback on hooks and virality.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* AI Writer Assistant Modal */}
      {showAIModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-primary-50 text-primary-600">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">AI Writer Assistant</h3>
                  <p className="text-xs text-slate-500">Configure your draft generation</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAIModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Topic or Prompt</label>
                <textarea 
                  ref={aiWriterInputRef}
                  autoFocus
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none outline-none" 
                  placeholder="e.g. 5 tips for better productivity working from home..." 
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Tone of Voice</label>
                <div className="relative">
                  <select 
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer outline-none"
                  >
                    <option>Professional</option>
                    <option>Witty</option>
                    <option>Provocative</option>
                    <option>Inspirational</option>
                    <option>Casual</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">Thread Length</label>
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">{aiLength} Tweets</span>
                  </div>
                  <input 
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600" 
                    max="10" 
                    min="1" 
                    type="range" 
                    value={aiLength}
                    onChange={(e) => setAiLength(parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
                    <span>Short</span>
                    <span>Long</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 justify-center">
                  <div 
                    onClick={() => setAiEmojis(!aiEmojis)}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer hover:border-slate-200 transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">Use Emojis</span>
                      <span className="text-[10px] text-slate-500">Include relevant icons</span>
                    </div>
                    <div className={`w-11 h-6 rounded-full relative transition-colors ${aiEmojis ? 'bg-primary-600' : 'bg-slate-200'}`}>
                      <div className={`absolute top-[2px] left-[2px] bg-white rounded-full size-5 transition-transform ${aiEmojis ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-2">
              <button 
                onClick={handleGenerateDraft}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary-500/25 transition-all transform hover:scale-[1.02]"
              >
                <Sparkles size={20} />
                Generate Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Image Generator Modal */}
      {showImageGenModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-primary-600">
                <Sparkles size={20} />
                <h3 className="font-bold text-slate-900 text-lg">AI Image Generator</h3>
              </div>
              <button onClick={() => setShowImageGenModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Prompt</label>
                <div className="relative">
                  <textarea 
                    ref={imageGenInputRef}
                    autoFocus
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none text-base leading-relaxed outline-none shadow-sm" 
                    rows={2}
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                  />
                  <button className="absolute bottom-3 right-3 text-slate-400 hover:text-primary-600 transition-colors" title="Enhance Prompt">
                    <Wand2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {generatedImages.map((img) => (
                  <div 
                    key={img}
                    onClick={() => setSelectedImage(img)}
                    className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${selectedImage === img ? 'ring-4 ring-primary-500 ring-offset-2' : 'hover:opacity-90'}`}
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ 
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQaZly7BMXH8T1DYaPUJ62bi05FC7BRwFG6GGX3PgRG9yNVc-WQ-Hxu1xgzz2vxSEwxB0GRgCVbA7C34k9iNBmr9Djw9MasOXtkZH0r5s_zaNmUbHDYNHmR5nCQoCXcZfPlKBWChkxPlzsli_Z80p8OVom6I0LzAjPQTzCODQIAbYOQ3dHkMywfmhY57HFKruKUyohDJ8V7VBqwR2NmXUEzKipGEGJhpEWL3sdwbsoK2qIM-5VLFy9dfBsJ4fXwkCCMF0W2KSXGyw")',
                      filter: `hue-rotate(${img * 45}deg)`
                    }}></div>
                    {selectedImage === img && (
                      <div className="absolute top-2 right-2 size-6 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-sm animate-in fade-in zoom-in duration-200">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Aspect Ratio</label>
                  <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                    {['Square', 'Wide', 'Tall'].map((ratio) => (
                      <button 
                        key={ratio}
                        onClick={() => setSelectedRatio(ratio)}
                        className={`flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-md transition-all ${
                          selectedRatio === ratio ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        <span className="text-[10px] font-bold">{ratio}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Art Style</label>
                  <div className="flex flex-wrap gap-2">
                    {['Photorealistic', 'Digital Art', 'Minimalist', '3D Render'].map((style) => (
                      <button 
                        key={style}
                        onClick={() => setSelectedStyle(style)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                          selectedStyle === style 
                            ? 'bg-primary-50 text-primary-600 border-primary-200' 
                            : 'bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                <RefreshCw size={18} />
                Regenerate
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-400">4 credits used</span>
                <button 
                  onClick={handleInsertImage}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary-600 text-white font-bold text-sm shadow-lg shadow-primary-500/25 hover:bg-primary-700 transition-transform hover:scale-105"
                >
                  Insert into Tweet
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
