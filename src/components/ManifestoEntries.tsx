
import { useEffect, useState } from 'react';
import { ManifestoEntry, getManifestoEntries } from '../lib/manifestoStore';
import { supabase } from '@/integrations/supabase/client';

const ManifestoEntries = () => {
  const [entries, setEntries] = useState<ManifestoEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const manifestoEntries = await getManifestoEntries();
        setEntries(manifestoEntries);
      } catch (error) {
        console.error('Error loading manifesto entries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Load initial entries
    loadEntries();

    // Set up real-time subscription for new entries
    const channel = supabase
      .channel('manifesto-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'manifesto_entries'
        },
        () => {
          // Reload entries when changes occur
          loadEntries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-serif text-ink-400">Loading manifesto entries...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-serif text-ink-400">Be the first to share why you're interested in being more analog.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.id} className="analog-paper">
          <p className="font-serif text-lg">{entry.content}</p>
          <div className="mt-4 text-sm text-ink-400">
            {new Date(entry.created_at).toLocaleDateString(undefined, { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric'
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManifestoEntries;
