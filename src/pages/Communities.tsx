
import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import CommunityCard from '../components/CommunityCard';
import { Community } from '../lib/types';
import { getCommunities, initializeCommunities } from '../lib/store';

const Communities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    // Initialize communities data if needed
    initializeCommunities();
    // Get communities from storage
    setCommunities(getCommunities());
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-10 mt-6">
            <h1 className="text-3xl md:text-4xl font-sans mb-4">Communities</h1>
            <p className="text-ink-400 font-sans">
              Find your people and join the conversation.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map(community => (
              <CommunityCard key={community.id} community={community} />
            ))}
            <div className="analog-paper border-dashed flex flex-col items-center justify-center text-center p-8">
              <h3 className="font-sans text-xl mb-2">Start a Community</h3>
              <p className="text-ink-400 mb-4 font-sans">Don't see your analog interest represented?</p>
              <button className="analog-button mt-2">Create New</button>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-paper-300/40 py-8 mt-16">
        <div className="analog-container text-center text-ink-400 text-sm">
          <p>© {new Date().getFullYear()} Analog Community</p>
        </div>
      </footer>
    </div>
  );
};

export default Communities;
