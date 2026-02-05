import { supabase } from '@/lib/supabaseClient';

export type Platform = 'twitter' | 'linkedin' | 'github' | 'linear';

export interface ConnectionStatus {
  platform: Platform;
  connected: boolean;
  username?: string;
  lastSynced?: string;
}

export const connectionService = {
  /**
   * fetch all connection statuses for the current user.
   */
  async getConnections(): Promise<ConnectionStatus[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('user_settings')
      .select('connected_accounts')
      .eq('user_id', user.id)
      .single();

    if (error || !data) return [];

    const accounts = data.connected_accounts || {};
    
    return [
      { platform: 'twitter', connected: !!accounts.twitter?.connected, username: accounts.twitter?.username },
      { platform: 'linkedin', connected: !!accounts.linkedin?.connected, username: accounts.linkedin?.username },
      { platform: 'github', connected: !!accounts.github?.connected, username: accounts.github?.username },
      { platform: 'linear', connected: !!accounts.linear?.connected, username: accounts.linear?.username },
    ];
  },

  /**
   * Initiate OAuth flow.
   * In a real app, this redirects to your backend auth handler: /api/auth/{platform}
   */
  async connect(platform: Platform) {
    console.log(`Initiating connection for ${platform}...`);
    // Example: window.location.href = `/api/auth/${platform}/start`;
    
    // For Mocking purposes, we just update the DB directly to simulate a successful connection callback
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Fetch existing settings
    const { data: existing } = await supabase
      .from('user_settings')
      .select('connected_accounts')
      .eq('user_id', user.id)
      .single();

    const currentAccounts = existing?.connected_accounts || {};

    // Update with new connection mock data
    const updates = {
      connected_accounts: {
        ...currentAccounts,
        [platform]: {
          connected: true,
          username: `mock_${platform}_user`,
          token: `mock_token_${Date.now()}`,
          lastSynced: new Date().toISOString()
        }
      }
    };

    const { error } = await supabase
      .from('user_settings')
      .update(updates)
      .eq('user_id', user.id);

    if (error) throw error;
    return true;
  },

  /**
   * Disconnect a platform.
   */
  async disconnect(platform: Platform) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: existing } = await supabase
      .from('user_settings')
      .select('connected_accounts')
      .eq('user_id', user.id)
      .single();

    const currentAccounts = existing?.connected_accounts || {};
    
    // Remove the platform data
    if (currentAccounts[platform]) {
       delete currentAccounts[platform];
    }

    const { error } = await supabase
      .from('user_settings')
      .update({ connected_accounts: currentAccounts })
      .eq('user_id', user.id);

    if (error) throw error;
    return true;
  }
};