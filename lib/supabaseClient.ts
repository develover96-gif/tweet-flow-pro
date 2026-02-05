import { createClient } from '@supabase/supabase-js';

// Fallback values from .env.local for environments where process.env is not available
const FALLBACK_SUPABASE_URL = 'https://ickocvuzbookabkhtuws.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlja29jdnV6Ym9va2Fia2h0dXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMTUzMDAsImV4cCI6MjA4NTc5MTMwMH0.Ahv2EKGRwitdsayTUGciGrVxCkU8kgo1-dwE8oEYR7o';

// Safely access process.env or use fallback
const getEnvVar = (key: string, fallback: string) => {
  try {
    // Check if process exists and has the key, otherwise use fallback
    return typeof process !== 'undefined' && process.env && process.env[key] ? process.env[key] : fallback;
  } catch (e) {
    return fallback;
  }
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL', FALLBACK_SUPABASE_URL);
const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', FALLBACK_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Key is missing. Check your .env file.');
}

// Cast to any to avoid TypeScript version mismatch errors (v1 types vs v2 usage)
export const supabase = createClient(supabaseUrl, supabaseAnonKey) as any;
