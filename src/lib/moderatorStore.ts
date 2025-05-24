
import { supabase } from '@/integrations/supabase/client';

// Check if a user is logged in as a moderator using Supabase
export const isLoggedInAsModerator = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: isMod } = await supabase.rpc('is_moderator', { user_id: user.id });
    return !!isMod;
  } catch (error) {
    console.error('Error checking moderator status:', error);
    return false;
  }
};

// Get current moderator info from Supabase
export const getCurrentModerator = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: moderator } = await supabase
      .from('moderators')
      .select('*')
      .eq('id', user.id)
      .single();

    return moderator;
  } catch (error) {
    console.error('Error getting current moderator:', error);
    return null;
  }
};

// These functions are no longer needed with Supabase auth but kept for compatibility
export const loginAsModerator = () => false;
export const logoutModerator = () => {};
