import React, { useState } from 'react';
import { Sparkles, Quote, Twitter, Loader2, AlertCircle, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface AuthScreenProps {
  onLogin: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Registration Logic
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`, // Auto-generate avatar
            },
          },
        });
        if (signUpError) throw signUpError;
        
        // If auto-confirm is enabled in Supabase, we can proceed. 
        // Otherwise, you might want to show a "Check your email" message.
        // For this UX, we assume we can proceed or the user will click the link.
        onLogin();
      } else {
        // Login Logic
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        onLogin();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'twitter') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50 dark:bg-[#0f1323]">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAAENMpKzgsP5DKEBdygdewC-kJkfFyJJAzEYdf4PpwcYd64Ru2uJ3-gEEzYd6tAuaEcyEJVoVqLW2fHnLUZwrJQR303iGnAl3fYjdncloJRlf6MokjJJ8fq7mSywcU5OJ3O3vN3a4mt9YyQfSd9C7JDzXfMymcyrcipyIcRBnDhymwp4eBsacSRGYF_CQRY4AcgsRqb_eaA5R29o0Eu5pNbM1S-hDH_bgjUcC0rssqajj-zR4Aida9xC2lnLEs1bYqq0b5ZdOoRA')" }}></div>
        <div className="absolute inset-0 bg-primary-600/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full text-white">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
              <Sparkles size={18} />
            </div>
            <h2 className="text-lg font-bold tracking-tight">TweetFlow Pro</h2>
          </div>
          
          <div className="flex flex-col gap-8 max-w-xl">
            <div className="flex flex-col gap-4">
              <Quote size={48} className="text-primary-500" />
              <blockquote className="text-3xl font-bold leading-tight">
                "TweetFlow has completely transformed my workflow. I can schedule a week's worth of content in just 30 minutes. It's a game changer for growth."
              </blockquote>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="size-14 rounded-full bg-slate-700 border-2 border-primary-500/50 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQaZly7BMXH8T1DYaPUJ62bi05FC7BRwFG6GGX3PgRG9yNVc-WQ-Hxu1xgzz2vxSEwxB0GRgCVbA7C34k9iNBmr9Djw9MasOXtkZH0r5s_zaNmUbHDYNHmR5nCQoCXcZfPlKBWChkxPlzsli_Z80p8OVom6I0LzAjPQTzCODQIAbYOQ3dHkMywfmhY57HFKruKUyohDJ8V7VBqwR2NmXUEzKipGEGJhpEWL3sdwbsoK2qIM-5VLFy9dfBsJ4fXwkCCMF0W2KSXGyw")' }}></div>
              <div className="flex flex-col">
                <p className="font-bold text-lg">Alex Rivera</p>
                <p className="text-sm text-slate-300">Content Creator @ TechDaily</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 lg:px-24 bg-white dark:bg-[#0f1323] overflow-y-auto">
        <div className="w-full max-w-[420px] flex flex-col gap-8">
          <div className="lg:hidden flex items-center gap-2 text-primary-600 mb-4">
            <div className="size-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold">TweetFlow Pro</h2>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h1>
            <p className="text-slate-500 dark:text-[#90b4cb]">
              {isSignUp ? 'Start automating your growth today.' : 'Manage your X audience with powerful automation.'}
            </p>
          </div>

          <button 
            onClick={() => handleOAuthLogin('twitter')}
            className="flex items-center justify-center gap-3 w-full h-14 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-bold text-lg transition-transform hover:scale-[1.01] shadow-lg disabled:opacity-70"
            disabled={loading}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Twitter size={20} fill="currentColor" />}
            {isSignUp ? 'Sign up with X / Twitter' : 'Sign in with X / Twitter'}
          </button>

          <div className="relative flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
              Or {isSignUp ? 'register' : 'continue'} with email
            </p>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2 border border-red-100">
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="name">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    id="name" 
                    type="text" 
                    required
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-[#151e29] border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm transition-all shadow-sm outline-none" 
                    placeholder="Alex Rivera"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="email">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  id="email" 
                  type="email" 
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-[#151e29] border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm transition-all shadow-sm outline-none" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                {!isSignUp && <a className="text-xs font-bold text-primary-600 hover:text-primary-700" href="#">Forgot password?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  id="password" 
                  type="password" 
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-[#151e29] border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm transition-all shadow-sm outline-none" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="flex flex-col gap-4 text-center mt-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }} 
                className="font-bold text-primary-600 hover:underline ml-1 outline-none"
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-400 dark:text-slate-600">
            <p>© 2024 TweetFlow Pro.</p>
            <div className="flex gap-4">
              <a className="hover:text-slate-600 dark:hover:text-slate-400" href="#">Privacy</a>
              <a className="hover:text-slate-600 dark:hover:text-slate-400" href="#">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};