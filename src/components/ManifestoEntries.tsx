
import { useEffect, useState } from 'react';
import { ManifestoEntry } from '../lib/types';
import { getManifestoEntries } from '../lib/store';

const ManifestoEntries = () => {
  const [entries, setEntries] = useState<ManifestoEntry[]>([]);

  useEffect(() => {
    setEntries(getManifestoEntries());
  }, []);

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
            {new Date(entry.timestamp).toLocaleDateString(undefined, { 
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
