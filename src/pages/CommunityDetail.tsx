
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Navigation from '../components/Navigation';
import { Community } from '../lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CommunityDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch community details
  const { data: community, isLoading: loadingCommunity } = useQuery({
    queryKey: ['community', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Community;
    },
    enabled: !!slug
  });

  // Check if user is a member
  const { data: isMember, isLoading: loadingMembership } = useQuery({
    queryKey: ['community-membership', slug, user?.id],
    queryFn: async () => {
      if (!user || !community) return false;

      const { data, error } = await supabase
        .from('community_members')
        .select('*')
        .eq('community_id', community.id)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return !!data;
    },
    enabled: !!user && !!community
  });

  // Join community mutation
  const joinMutation = useMutation({
    mutationFn: async () => {
      if (!user || !community) throw new Error("User or community not found");
      
      // Insert member record
      const { error: joinError } = await supabase
        .from('community_members')
        .insert([
          {
            community_id: community.id,
            user_id: user.id
          }
        ]);
      
      if (joinError) throw joinError;

      // Update member count
      const { error: updateError } = await supabase
        .from('communities')
        .update({ member_count: (community.member_count || 0) + 1 })
        .eq('id', community.id);
      
      if (updateError) throw updateError;
    },
    onSuccess: () => {
      toast({
        title: "Community joined",
        description: `You are now a member of ${community?.name}`
      });
      queryClient.invalidateQueries({ queryKey: ['community', slug] });
      queryClient.invalidateQueries({ queryKey: ['community-membership', slug, user?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Error joining community",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  });

  // Leave community mutation
  const leaveMutation = useMutation({
    mutationFn: async () => {
      if (!user || !community) throw new Error("User or community not found");
      
      // Delete member record
      const { error: leaveError } = await supabase
        .from('community_members')
        .delete()
        .eq('community_id', community.id)
        .eq('user_id', user.id);
      
      if (leaveError) throw leaveError;

      // Update member count
      const { error: updateError } = await supabase
        .from('communities')
        .update({ member_count: Math.max((community.member_count || 0) - 1, 0) })
        .eq('id', community.id);
      
      if (updateError) throw updateError;
    },
    onSuccess: () => {
      toast({
        title: "Left community",
        description: `You are no longer a member of ${community?.name}`
      });
      queryClient.invalidateQueries({ queryKey: ['community', slug] });
      queryClient.invalidateQueries({ queryKey: ['community-membership', slug, user?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Error leaving community",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  });

  const handleJoinLeave = () => {
    if (isMember) {
      leaveMutation.mutate();
    } else {
      joinMutation.mutate();
    }
  };

  if (loadingCommunity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading community details...</p>
        </main>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <p>Community not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <div className="mb-8 mt-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-serif">{community.name}</h1>
              {user && (
                <Button 
                  onClick={handleJoinLeave} 
                  variant={isMember ? "outline" : "default"}
                  disabled={loadingMembership || joinMutation.isPending || leaveMutation.isPending}
                >
                  {loadingMembership ? 'Loading...' : isMember ? 'Leave Community' : 'Join Community'}
                </Button>
              )}
            </div>
            <p className="text-ink-400 mt-2">{community.description}</p>
            <div className="mt-4 text-sm text-ink-300">
              {community.member_count || 0} members
            </div>
          </div>
          
          <div className="analog-paper p-6">
            {/* Community content will go here */}
            <h2 className="text-xl font-serif mb-4">Community Posts</h2>
            <p className="text-ink-400">
              This is where community posts will appear.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityDetail;
