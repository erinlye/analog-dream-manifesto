
import { supabase } from '@/integrations/supabase/client';

export interface ManifestoEntry {
  id: string;
  content: string;
  created_at: string;
}

// Get all manifesto entries from Supabase
export const getManifestoEntries = async (): Promise<ManifestoEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('manifesto_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching manifesto entries:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching manifesto entries:', error);
    return [];
  }
};

// Add a new manifesto entry to Supabase
export const addManifestoEntry = async (content: string): Promise<ManifestoEntry | null> => {
  try {
    const { data, error } = await supabase
      .from('manifesto_entries')
      .insert([{ content }])
      .select()
      .single();

    if (error) {
      console.error('Error adding manifesto entry:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding manifesto entry:', error);
    throw error;
  }
};
