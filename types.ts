export interface Post {
  id: string;
  content: string;
  scheduledTime?: string;
  status: 'draft' | 'scheduled' | 'published' | 'queue';
  media?: string[];
  type: 'thread' | 'image' | 'text' | 'link';
  category?: string;
  engagement?: {
    likes: number;
    retweets: number;
  };
}

export interface QueueSlot {
  id: string;
  time: string;
  day: string;
  isPeak: boolean;
  status: 'empty' | 'filled';
  post?: Post;
}

export interface EvergreenSlot {
  id: string;
  name: string;
  schedule: string;
  postCount: number;
  status: 'active' | 'paused';
  color: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

export type ViewState = 'dashboard' | 'queue' | 'studio' | 'evergreen' | 'composer' | 'analytics' | 'settings' | 'profile' | 'calendar' | 'templates';

export type SessionState = 'AUTH' | 'ONBOARDING' | 'APP';