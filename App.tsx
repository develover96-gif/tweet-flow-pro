import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Queue } from './components/Queue';
import { Composer } from './components/Composer';
import { Evergreen } from './components/Evergreen';
import { Settings } from './components/Settings';
import { Profile } from './components/Profile';
import { Studio } from './components/Studio';
import { CalendarView } from './components/CalendarView';
import { Templates } from './components/Templates';
import { AuthScreen } from './components/AuthScreen';
import { Onboarding } from './components/Onboarding';
import { ViewState, SessionState } from './types';
import { Search, Bell, Plus, Loader2 } from 'lucide-react';
import { supabase } from './lib/supabaseClient';

const App: React.FC = () => {
  const [sessionState, setSessionState] = useState<SessionState>('AUTH');
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [composerInitialTweets, setComposerInitialTweets] = useState<{ id: number; text: string }[] | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    // Check for active session on load
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // In a real app, you might check a DB flag for 'onboarding_completed' here
          setSessionState('APP');
        }
      } catch (error) {
        console.error('Session check failed', error);
      } finally {
        setIsLoadingSession(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // If we get a session update (e.g. login), update state if we are still in AUTH
        setSessionState((prev) => prev === 'AUTH' ? 'ONBOARDING' : prev);
      } else {
        setSessionState('AUTH');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUseTemplate = (tweets: string[]) => {
    const formattedTweets = tweets.map((text, index) => ({
      id: Date.now() + index,
      text
    }));
    setComposerInitialTweets(formattedTweets);
    setCurrentView('composer');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'analytics': return <Dashboard />; // Reuse for now
      case 'queue': return <Queue onChangeView={setCurrentView} />;
      case 'calendar': return <CalendarView onChangeView={setCurrentView} />;
      case 'composer': return <Composer initialTweets={composerInitialTweets} />;
      case 'templates': return <Templates onUseTemplate={handleUseTemplate} />;
      case 'evergreen': return <Evergreen />;
      case 'settings': return <Settings />;
      case 'profile': return <Profile />;
      case 'studio': return <Studio />;
      default: return <Dashboard />;
    }
  };

  if (isLoadingSession) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  // 1. Auth Flow
  if (sessionState === 'AUTH') {
    return <AuthScreen onLogin={() => setSessionState('ONBOARDING')} />;
  }

  // 2. Onboarding Flow
  if (sessionState === 'ONBOARDING') {
    return <Onboarding onFinish={() => setSessionState('APP')} />;
  }

  // 3. Main App Flow
  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-3 lg:px-10 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary-600">
            <div className="size-8 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-primary-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 5a2.83 2.83 0 0 1 0 5.66l-9-9 9-9"></path></svg>
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">TweetFlow Pro</h2>
          </div>
        </div>
        
        <div className="flex flex-1 justify-end gap-4 items-center">
          <div className="hidden sm:flex relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>
          
          <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <button 
            onClick={() => {
              setComposerInitialTweets(null); // Reset to blank
              setCurrentView('composer');
            }}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md shadow-primary-500/20 transition-all"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Create Post</span>
          </button>
          
          <div 
            onClick={() => setCurrentView('profile')}
            className="size-9 rounded-full bg-slate-200 cursor-pointer overflow-hidden border-2 border-white shadow-sm hover:border-primary-200 transition-colors"
          >
             <img src="https://picsum.photos/200" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} onChangeView={setCurrentView} />
        
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative overflow-hidden">
           {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;