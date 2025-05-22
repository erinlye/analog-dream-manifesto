
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navigation from '../components/Navigation';
import CommunityCard from '../components/CommunityCard';
import NewCommunityForm from '../components/NewCommunityForm';
import { Community } from '../lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Communities = () => {
  const { user } = useAuth();

  // Fetch communities from Supabase
  const { data: communities = [], isLoading, error } = useQuery({
    queryKey: ['communities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Community[];
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-10 mt-6">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Communities</h1>
            <p className="text-ink-400 font-sans">
              Find your people and join the conversation.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 text-center py-12">Loading communities...</div>
            ) : error ? (
              <div className="col-span-3 text-center py-12 text-red-500">
                Error loading communities. Please try again.
              </div>
            ) : communities.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                No communities found. Be the first to create one!
              </div>
            ) : (
              communities.map(community => (
                <CommunityCard key={community.id} community={community} />
              ))
            )}
            
            <div className="analog-paper border-dashed flex flex-col items-center justify-center text-center p-8">
              <h3 className="font-sans text-xl mb-2">Start a Community</h3>
              <p className="text-ink-400 mb-4 font-sans">Don't see your analog interest represented?</p>
              {user ? (
                <NewCommunityForm />
              ) : (
                <div className="text-ink-400 mt-2 text-sm">
                  Please sign in to create a new community
                </div>
              )}
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
