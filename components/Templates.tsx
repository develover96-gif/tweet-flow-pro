import React, { useState } from 'react';
import { 
  LayoutGrid, 
  GraduationCap, 
  Megaphone, 
  BookOpen, 
  User, 
  TrendingUp, 
  Heart, 
  History, 
  List, 
  SlidersHorizontal,
  Layers,
  Calendar,
  Quote,
  Zap,
  Copy,
  Check
} from 'lucide-react';

interface TemplateData {
  id: string;
  title: string;
  description: string;
  tweets: string[];
  category: string;
  icon: React.ElementType;
  colors: {
    bg: string;
    text: string;
    iconBg: string;
    progress: string;
  };
}

const TEMPLATE_DATA: TemplateData[] = [
  {
    id: 'edu-guide',
    title: 'The Educational Guide',
    description: 'Break down complex topics into digestible steps. Perfect for tutorials and how-to guides.',
    category: 'Educational',
    tweets: [
      "Here is how to master [Topic] in 5 simple steps 🧵👇",
      "Step 1: The Foundation...",
      "Step 2: Building Momentum...",
      "Step 3: The Crucial Turn...",
      "Step 4: Avoiding Pitfalls...",
      "Step 5: Mastery...",
      "Summary and key takeaways 📝",
      "If you found this helpful, follow for more!"
    ],
    icon: GraduationCap,
    colors: { bg: 'bg-blue-50', text: 'text-primary-600', iconBg: 'bg-primary-600', progress: 'bg-primary-600' }
  },
  {
    id: 'story-hook',
    title: 'The Storytelling Hook',
    description: 'Capture attention immediately with a narrative arc. Best for personal stories and lessons learned.',
    category: 'Storytelling',
    tweets: [
      "I lost everything in 2020. Here is how I built it back 🧵",
      "It started with a simple mistake...",
      "The turning point came when...",
      "I realized I had to change my mindset...",
      "The results started showing...",
      "Here is the lesson for you..."
    ],
    icon: BookOpen,
    colors: { bg: 'bg-purple-50', text: 'text-purple-500', iconBg: 'bg-purple-500', progress: 'bg-purple-500' }
  },
  {
    id: 'weekly-roundup',
    title: 'The Weekly Roundup',
    description: 'Curate the best content from the week. Great for newsletters and resource sharing.',
    category: 'Marketing',
    tweets: [
      "The best tools I found this week for [Industry] 🧵",
      "1. Tool A: Great for...",
      "2. Tool B: Solves the problem of...",
      "3. Resource C: Must read because...",
      "4. Podcast D: Insightful conversation on...",
      "5. Article E: Deep dive into...",
      "6. Quote of the week...",
      "7. What are you using? Let me know below!",
      "Subscribe to my newsletter for more links 🔗",
      "Have a great weekend!"
    ],
    icon: Calendar,
    colors: { bg: 'bg-amber-50', text: 'text-amber-500', iconBg: 'bg-amber-500', progress: 'bg-amber-500' }
  },
  {
    id: 'contrarian',
    title: 'Contrarian Take',
    description: 'Challenge common beliefs to spark debate. High engagement potential.',
    category: 'Growth',
    tweets: [
      "Unpopular opinion: [Common Belief] is actually wrong. Here is why 🧵",
      "Reason 1: The data suggests...",
      "Reason 2: Most people ignore...",
      "Reason 3: The long term effect is...",
      "What do you think? Agree or disagree?"
    ],
    icon: TrendingUp,
    colors: { bg: 'bg-emerald-50', text: 'text-emerald-500', iconBg: 'bg-emerald-500', progress: 'bg-emerald-500' }
  },
  {
    id: 'product-launch',
    title: 'Product Launch',
    description: 'Build hype and drive conversions. Includes problem, solution, and social proof tweets.',
    category: 'Marketing',
    tweets: [
      "It is finally here. Introducing [Product Name] 🚀",
      "The Problem: We all hate [Pain Point]...",
      "The Solution: [Product] fixes this by...",
      "Feature 1: [Benefit]...",
      "Feature 2: [Benefit]...",
      "What people are saying: [Testimonial]...",
      "Get it now at [Link] for 20% off!"
    ],
    icon: Megaphone,
    colors: { bg: 'bg-pink-50', text: 'text-pink-500', iconBg: 'bg-pink-500', progress: 'bg-pink-500' }
  },
  {
    id: 'listicle',
    title: 'Listicle Lite',
    description: 'Quick value delivery. A short list of resources or tips that fits easily in a few tweets.',
    category: 'Educational',
    tweets: [
      "3 Quick tips to improve your [Skill] today ⚡",
      "Tip 1: Do this...",
      "Tip 2: Avoid that...",
      "Tip 3: Remember to...",
    ],
    icon: Quote,
    colors: { bg: 'bg-cyan-50', text: 'text-cyan-500', iconBg: 'bg-cyan-500', progress: 'bg-cyan-500' }
  }
];

interface TemplatesProps {
  onUseTemplate?: (tweets: string[]) => void;
}

export const Templates: React.FC<TemplatesProps> = ({ onUseTemplate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Templates');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [recentlyUsedIds, setRecentlyUsedIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleCopy = (template: TemplateData) => {
    const textToCopy = `Title: ${template.title}\nDescription: ${template.description}\n\nStructure:\n${template.tweets.map((t, i) => `${i + 1}. ${t}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUse = (template: TemplateData) => {
    // Add to recently used (avoid duplicates, keep last 5)
    setRecentlyUsedIds(prev => {
      const filtered = prev.filter(id => id !== template.id);
      return [template.id, ...filtered].slice(0, 5);
    });
    
    if (onUseTemplate) {
      onUseTemplate(template.tweets);
    }
  };

  const getFilteredTemplates = () => {
    if (activeCategory === 'All Templates') return TEMPLATE_DATA;
    if (activeCategory === 'My Favorites') return TEMPLATE_DATA.filter(t => favorites.includes(t.id));
    if (activeCategory === 'Recently Used') return TEMPLATE_DATA.filter(t => recentlyUsedIds.includes(t.id));
    return TEMPLATE_DATA.filter(t => t.category === activeCategory);
  };

  const filteredTemplates = getFilteredTemplates();

  const categories = [
    { name: 'All Templates', icon: LayoutGrid },
    { name: 'Educational', icon: GraduationCap },
    { name: 'Marketing', icon: Megaphone },
    { name: 'Storytelling', icon: BookOpen },
    { name: 'Personal', icon: User },
    { name: 'Growth', icon: TrendingUp },
  ];

  return (
    <div className="flex flex-1 w-full h-full overflow-hidden">
      {/* Templates Sidebar */}
      <aside className="hidden xl:flex w-64 flex-col justify-between border-r border-slate-200 bg-white p-6 overflow-y-auto">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <h1 className="text-slate-900 text-base font-bold">Template Categories</h1>
            <p className="text-slate-500 text-xs font-medium">Browse by goal</p>
          </div>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button 
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                    activeCategory === cat.name 
                      ? 'bg-primary-50 text-primary-600 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <Icon size={20} />
                  <p className="text-sm">{cat.name}</p>
                </button>
              );
            })}
          </div>
          <div className="my-2 border-t border-slate-100"></div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Saved</h3>
            <button 
              onClick={() => setActiveCategory('My Favorites')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeCategory === 'My Favorites' 
                  ? 'bg-primary-50 text-primary-600 font-semibold' 
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
            >
              <Heart size={20} className={activeCategory === 'My Favorites' ? 'fill-primary-600' : ''} />
              <p className="text-sm">My Favorites</p>
            </button>
            <button 
              onClick={() => setActiveCategory('Recently Used')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeCategory === 'Recently Used' 
                  ? 'bg-primary-50 text-primary-600 font-semibold' 
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
            >
              <History size={20} />
              <p className="text-sm">Recently Used</p>
            </button>
            
            {/* Display Recently Used Links if in other view */}
            {activeCategory !== 'Recently Used' && recentlyUsedIds.length > 0 && (
               <div className="mt-4 px-3">
                 <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Recent</p>
                 <div className="flex flex-col gap-2">
                   {recentlyUsedIds.slice(0, 3).map(id => {
                     const t = TEMPLATE_DATA.find(temp => temp.id === id);
                     if (!t) return null;
                     return (
                       <div key={id} onClick={() => handleUse(t)} className="text-xs text-slate-600 hover:text-primary-600 cursor-pointer truncate">
                         {t.title}
                       </div>
                     )
                   })}
                 </div>
               </div>
            )}
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary-50 to-transparent p-4 rounded-xl border border-primary-100 mt-auto">
          <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">Pro Plan</p>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">Access 100+ premium viral templates with Pro.</p>
          <button className="w-full flex items-center justify-center rounded-lg h-9 px-4 bg-primary-600 text-white text-xs font-bold transition-transform hover:scale-[1.02]">
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 p-6 lg:p-8">
          <div className="flex flex-col gap-1">
            <p className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Thread Templates</p>
            <p className="text-slate-500 text-sm">Kickstart your content creation with proven structures.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg h-10 px-1">
              <button className="p-1.5 rounded bg-slate-100 text-slate-900">
                <LayoutGrid size={18} />
              </button>
              <button className="p-1.5 rounded text-slate-400 hover:text-slate-600">
                <List size={18} />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-lg h-10 px-4 bg-white text-slate-700 text-sm font-bold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <SlidersHorizontal size={18} />
              <span>Filter: {activeCategory}</span>
            </button>
          </div>
        </div>

        <div className="px-6 lg:px-8 pb-12">
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
               <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                  <LayoutGrid size={32} />
               </div>
               <h3 className="text-slate-900 font-bold text-lg">No templates found</h3>
               <p className="text-slate-500 text-sm">Try selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <div key={template.id} className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl p-5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`size-10 rounded-full ${template.colors.bg} ${template.colors.text} flex items-center justify-center`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex items-center gap-2">
                         <button 
                            onClick={() => handleCopy(template)}
                            className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Copy structure to clipboard"
                         >
                            {copiedId === template.id ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                         </button>
                         <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                          <Layers size={14} className="text-slate-500" />
                          <span className="text-xs font-bold text-slate-600">{template.tweets.length} Tweets</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className={`text-lg font-bold text-slate-900 mb-1 group-hover:${template.colors.text} transition-colors`}>{template.title}</h3>
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                      {template.description}
                    </p>
                    
                    <div className="flex-1 bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 flex flex-col gap-2 relative overflow-hidden">
                      <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-slate-200 -z-10"></div>
                      
                      {/* Visual representations of tweet structure */}
                      <div className="flex gap-3 items-center">
                        <div className={`size-3 rounded-full ${template.colors.progress} border-2 border-white`}></div>
                        <div className="h-2 w-3/4 bg-slate-200 rounded-full"></div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="size-2 rounded-full bg-slate-300 ml-0.5"></div>
                        <div className="h-2 w-full bg-slate-200 rounded-full"></div>
                      </div>
                      {template.tweets.length > 2 && (
                         <div className="flex gap-3 items-center">
                          <div className="size-2 rounded-full bg-slate-300 ml-0.5"></div>
                          <div className="h-2 w-1/2 bg-slate-200 rounded-full"></div>
                        </div>
                      )}
                      
                      <div className="mt-auto pt-2 flex items-center gap-2">
                         <span className="text-[10px] text-slate-400 font-medium">+ {template.tweets.length - 2} more tweets</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleUse(template)}
                      className="w-full h-10 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shadow-sm"
                    >
                      Use Template
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};