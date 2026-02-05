import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  CalendarClock, 
  BadgeCheck, 
  BarChart2, 
  CheckCircle2, 
  ArrowRight, 
  Search,
  Sliders,
  ClipboardCheck,
  Rocket,
  Check,
  Twitter,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { connectionService } from '../services/connections';

interface OnboardingProps {
  onFinish: () => void;
}

type GoalType = 'grow' | 'time' | 'brand' | 'analytics';
type PaceType = 'manual' | 'balanced' | 'autopilot';

export const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1 State
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('grow');

  // Step 2 State
  const [selectedNiches, setSelectedNiches] = useState<string[]>(['Creator Economy']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Step 3 State
  const [selectedPace, setSelectedPace] = useState<PaceType>('balanced');

  const handleNext = () => {
    window.scrollTo(0, 0);
    setStep((prev) => Math.min(prev + 1, 3));
  };
  
  const handleBack = () => {
    window.scrollTo(0, 0);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleConnectTwitter = async () => {
    setIsConnecting(true);
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      await connectionService.connect('twitter');
      setIsTwitterConnected(true);
    } catch (error) {
      console.error("Failed to connect twitter", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Save preferences to user_settings
        await supabase.from('user_settings').update({
           scheduling_sensitivity: selectedPace,
           // We could store goal/niche in a JSONB column if the schema supported it, 
           // for now we mostly care about the pace setting which maps to schema.
        }).eq('user_id', user.id);
      }
      onFinish();
    } catch (error) {
      console.error("Error saving onboarding data", error);
      onFinish(); // Proceed even if save fails
    } finally {
      setLoading(false);
    }
  };

  const toggleNiche = (niche: string) => {
    if (selectedNiches.includes(niche)) {
      setSelectedNiches(selectedNiches.filter(n => n !== niche));
    } else {
      setSelectedNiches([...selectedNiches, niche]);
    }
  };

  const niches = [
    'Tech & AI', 'SaaS', 'Digital Marketing', 'Creator Economy', 
    'Web3', 'Health & Fitness', 'E-commerce', 'Finance', 'Productivity'
  ];

  const filteredNiches = niches.filter(n => n.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 dark:bg-[#0f1323]">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-600/5 to-transparent pointer-events-none -z-10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Header */}
      <header className="w-full px-6 py-6 lg:px-10 flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-3 text-primary-600">
          <div className="size-8 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
            <Sparkles size={18} />
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">TweetFlow Pro</h2>
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          Log out
        </button>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col justify-center items-center pb-20 animate-in fade-in duration-500">
        
        {/* Step Progress */}
        <div className="w-full max-w-sm mb-12 sm:mb-16">
          <div className="flex justify-between items-end mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              {step === 1 ? 'Goal Selection' : step === 2 ? 'Niche & Integration' : 'Automation Pace'}
            </span>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">Step {step} of 3</span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 rounded-full shadow-[0_0_10px_rgba(96,122,251,0.5)] transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: GOAL SELECTION */}
        {step === 1 && (
          <div className="w-full flex flex-col items-center animate-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-10 sm:mb-14 space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">What is your primary goal?</h1>
              <p className="text-lg text-slate-500 dark:text-[#90b4cb] max-w-xl mx-auto">
                Select the outcome that matters most to you right now. We'll tailor your dashboard to help you achieve it.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mb-12">
              <label className="group relative cursor-pointer">
                <input type="radio" name="goal" className="peer sr-only" checked={selectedGoal === 'grow'} onChange={() => setSelectedGoal('grow')} />
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#101c23] border-2 border-transparent peer-checked:border-primary-600 peer-checked:bg-primary-50/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex items-start gap-5">
                  <div className="shrink-0 size-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">Grow my following</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Boost engagement and increase your follower count with viral content strategies.</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-primary-600 scale-0 peer-checked:scale-100 transition-transform duration-200">
                  <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                </div>
              </label>

              <label className="group relative cursor-pointer">
                <input type="radio" name="goal" className="peer sr-only" checked={selectedGoal === 'time'} onChange={() => setSelectedGoal('time')} />
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#101c23] border-2 border-transparent peer-checked:border-primary-600 peer-checked:bg-primary-50/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex items-start gap-5">
                  <div className="shrink-0 size-14 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CalendarClock size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">Save time scheduling</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Automate your workflow and schedule weeks of content in just a few minutes.</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-primary-600 scale-0 peer-checked:scale-100 transition-transform duration-200">
                  <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                </div>
              </label>

              <label className="group relative cursor-pointer">
                <input type="radio" name="goal" className="peer sr-only" checked={selectedGoal === 'brand'} onChange={() => setSelectedGoal('brand')} />
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#101c23] border-2 border-transparent peer-checked:border-primary-600 peer-checked:bg-primary-50/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex items-start gap-5">
                  <div className="shrink-0 size-14 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BadgeCheck size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">Build a personal brand</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Establish authority in your niche with consistent, high-value evergreen posts.</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-primary-600 scale-0 peer-checked:scale-100 transition-transform duration-200">
                  <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                </div>
              </label>

              <label className="group relative cursor-pointer">
                <input type="radio" name="goal" className="peer sr-only" checked={selectedGoal === 'analytics'} onChange={() => setSelectedGoal('analytics')} />
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#101c23] border-2 border-transparent peer-checked:border-primary-600 peer-checked:bg-primary-50/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex items-start gap-5">
                  <div className="shrink-0 size-14 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart2 size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">Analyze performance</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Deep dive into analytics to understand what resonates with your audience.</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-primary-600 scale-0 peer-checked:scale-100 transition-transform duration-200">
                  <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                </div>
              </label>
            </div>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={handleNext}
                className="w-full sm:w-auto min-w-[200px] h-12 px-8 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-base shadow-lg shadow-primary-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
              >
                Continue
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                 onClick={handleNext}
                 className="text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                I'm not sure yet, skip for now
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: NICHE & INTEGRATION */}
        {step === 2 && (
          <div className="w-full flex flex-col items-center animate-in slide-in-from-right-8 duration-500">
             <div className="text-center mb-10 sm:mb-12 space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Tell us about your niche</h1>
              <p className="text-lg text-slate-500 dark:text-[#90b4cb] max-w-xl mx-auto">
                Choose your industry so we can curate relevant content ideas and trends specifically for you.
              </p>
            </div>

            <div className="w-full max-w-lg mb-8 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-[#101c23] border-2 border-transparent focus:border-primary-600 shadow-sm rounded-xl text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 transition-all duration-200 outline-none" 
                placeholder="Search for your industry..." 
              />
            </div>

            <div className="w-full max-w-3xl flex flex-wrap justify-center gap-3 mb-16">
              {filteredNiches.map((niche) => (
                <label key={niche} className="cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="peer sr-only" 
                    checked={selectedNiches.includes(niche)}
                    onChange={() => toggleNiche(niche)}
                  />
                  <div className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101c23] text-slate-600 dark:text-slate-300 font-medium text-sm transition-all duration-200 hover:border-primary-600/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 peer-checked:bg-primary-50 peer-checked:border-primary-600 peer-checked:text-primary-600 shadow-sm select-none">
                    {niche}
                  </div>
                </label>
              ))}
            </div>

            <div className="w-full max-w-2xl bg-white dark:bg-[#101c23] rounded-2xl p-1 border-2 border-slate-100 dark:border-slate-800 shadow-sm mb-12">
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className={`shrink-0 size-16 rounded-xl flex items-center justify-center text-white shadow-lg transition-colors ${isTwitterConnected ? 'bg-green-500' : 'bg-black'}`}>
                  {isTwitterConnected ? <Check size={32} /> : <Twitter size={32} fill="currentColor" />}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {isTwitterConnected ? 'Account Connected' : 'Connect your X/Twitter account'}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {isTwitterConnected ? 'Your account is linked and ready for automation.' : 'Link your account to enable auto-scheduling and performance tracking.'}
                  </p>
                </div>
                {!isTwitterConnected ? (
                  <button 
                    onClick={handleConnectTwitter}
                    disabled={isConnecting}
                    className="shrink-0 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg shadow-md hover:bg-slate-800 dark:hover:bg-slate-200 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? (
                      <>
                         <Loader2 size={18} className="animate-spin" /> Connecting...
                      </>
                    ) : (
                      'Connect Account'
                    )}
                  </button>
                ) : (
                   <div className="shrink-0 px-6 py-3 bg-green-50 text-green-700 font-bold rounded-lg border border-green-100 flex items-center gap-2">
                      <Check size={18} /> Connected
                   </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={handleNext}
                className="w-full sm:w-auto min-w-[200px] h-12 px-8 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-base shadow-lg shadow-primary-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
              >
                Continue
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                 onClick={handleNext}
                 className="text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                Skip integration for now
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: AUTOMATION PACE */}
        {step === 3 && (
          <div className="w-full flex flex-col items-center animate-in slide-in-from-right-8 duration-500">
             <div className="text-center mb-10 sm:mb-14 space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Set your automation pace</h1>
              <p className="text-lg text-slate-500 dark:text-[#90b4cb] max-w-xl mx-auto">
                Choose how involved you want to be. You can adjust these settings at any time from your dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full max-w-5xl mb-12">
              <label className="group relative cursor-pointer">
                <input type="radio" name="pace" className="peer sr-only" checked={selectedPace === 'manual'} onChange={() => setSelectedPace('manual')} />
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#101c23] border-2 border-transparent peer-checked:border-primary-600 peer-checked:bg-primary-50/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col items-center text-center gap-5">
                  <div className="shrink-0 size-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sliders size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">Manual Control</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">I'll handle the scheduling. The AI will only assist when specifically asked.</p>
                  </div>
                  <div className="w-full pt-4 mt-auto border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Best for control freaks</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-primary-600 scale-0 peer-checked:scale-100 transition-transform duration-200">
                  <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                </div>
              </label>

              <label className="group relative cursor-pointer">
                <input type="radio" name="pace" className="peer sr-only" checked={selectedPace === 'balanced'} onChange={() => setSelectedPace('balanced')} />
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#101c23] border-2 border-transparent peer-checked:border-primary-600 peer-checked:bg-primary-50/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col items-center text-center gap-5">
                  <div className="shrink-0 size-16 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ClipboardCheck size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">Balanced</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">AI suggests content and optimal times, but nothing goes live without your approval.</p>
                  </div>
                  <div className="w-full pt-4 mt-auto border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">Most Popular</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-primary-600 scale-0 peer-checked:scale-100 transition-transform duration-200">
                  <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                </div>
              </label>

              <label className="group relative cursor-pointer">
                <input type="radio" name="pace" className="peer sr-only" checked={selectedPace === 'autopilot'} onChange={() => setSelectedPace('autopilot')} />
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#101c23] border-2 border-transparent peer-checked:border-primary-600 peer-checked:bg-primary-50/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col items-center text-center gap-5">
                  <div className="shrink-0 size-16 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Rocket size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">Full Autopilot</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Sit back and relax. AI schedules, posts, and optimizes everything for you.</p>
                  </div>
                  <div className="w-full pt-4 mt-auto border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-purple-500 uppercase tracking-wide">Maximum Growth</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-primary-600 scale-0 peer-checked:scale-100 transition-transform duration-200">
                  <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                </div>
              </label>
            </div>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={handleFinish}
                disabled={loading}
                className="w-full sm:w-auto min-w-[240px] h-14 px-8 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg shadow-lg shadow-primary-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : (
                  <>
                    Finish Setup
                    <Check size={24} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <button 
                onClick={handleBack}
                disabled={loading}
                className="text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={16} /> Back to previous step
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};