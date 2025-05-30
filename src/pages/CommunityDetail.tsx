
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Navigation from '../components/Navigation';
import { Community } from '../lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import NewCommunityPostForm from '../components/NewCommunityPostForm';
import ForumCard from '../components/ForumCard';
import { 
  getCommunityPosts, 
  addCommunityComment,
  toggleCommunityUpvote,
  toggleCommunityDownvote,
  deleteCommunityPost,
  getCommunityPostsByPopularity
} from '../lib/communityPostStore';

const CommunityDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

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

  const loadPosts = async () => {
    if (!slug) return;
    
    setIsLoadingPosts(true);
    try {
      if (sortBy === 'recent') {
        const loadedPosts = await getCommunityPosts(slug);
        setPosts(loadedPosts);
      } else {
        const loadedPosts = await getCommunityPostsByPopularity(slug);
        setPosts(loadedPosts);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [slug, sortBy]);

  const handlePostAdded = () => {
    loadPosts();
  };

  const handleUpvote = async (postId: string) => {
    await toggleCommunityUpvote(postId);
    loadPosts();
  };

  const handleDownvote = async (postId: string) => {
    await toggleCommunityDownvote(postId);
    loadPosts();
  };

  const handleAddComment = async (postId: string, comment: { author: string; content: string }) => {
    await addCommunityComment(postId, comment);
    loadPosts();
  };

  const handleDeletePost = async (postId: string) => {
    await deleteCommunityPost(postId);
    loadPosts();
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif mb-0">Community Posts</h2>
              <div className="space-x-2">
                <Button 
                  variant={sortBy === 'recent' ? 'default' : 'outline'}
                  onClick={() => setSortBy('recent')}
                  size="sm"
                >
                  Recent
                </Button>
                <Button 
                  variant={sortBy === 'popular' ? 'default' : 'outline'}
                  onClick={() => setSortBy('popular')}
                  size="sm"
                >
                  Popular
                </Button>
              </div>
            </div>
            
            {isMember && slug && (
              <NewCommunityPostForm 
                communityId={slug} 
                onPostAdded={handlePostAdded} 
              />
            )}
            
            {isLoadingPosts ? (
              <div className="text-center py-10">
                <p>Loading posts...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.length > 0 ? (
                  posts.map(post => (
                    <ForumCard 
                      key={post.id} 
                      post={post}
                      onUpvote={handleUpvote}
                      onDownvote={handleDownvote}
                      onAddComment={handleAddComment}
                      onDelete={handleDeletePost}
                      onUpdate={loadPosts}
                      resourceType="communityPost"
                      communitySlug={slug}
                    />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-lg font-serif mb-2">No Posts Yet</h3>
                    {isMember ? (
                      <p>Be the first to share a post with this community!</p>
                    ) : (
                      <p>Join this community to start posting.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityDetail;
