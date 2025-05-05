
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';
import { 
  getCommunityBySlug, 
  getCommunityPosts, 
  getCommunityPostsByPopularity,
  addCommunityPost,
  addCommunityComment,
  toggleCommunityUpvote,
  toggleCommunityDownvote,
  isUserMemberOfCommunity,
  joinCommunity,
  leaveCommunity,
  deleteCommunityPost
} from '../lib/communityStore';
import { Community, CommunityPost } from '../lib/types';
import ForumCard from '../components/ForumCard';
import NewForumPostForm from '../components/NewForumPostForm';
import { Button } from '../components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import ModeratorLogin from '../components/ModeratorLogin';

const CommunityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [isMember, setIsMember] = useState(false);
  
  useEffect(() => {
    if (!slug) {
      navigate('/communities');
      return;
    }
    
    const communityData = getCommunityBySlug(slug);
    if (!communityData) {
      navigate('/communities');
      return;
    }
    
    setCommunity(communityData);
    loadPosts();
    setIsMember(isUserMemberOfCommunity(slug));
  }, [slug, navigate]);
  
  const loadPosts = () => {
    if (!slug) return;
    
    if (sortBy === 'recent') {
      setPosts(getCommunityPosts(slug));
    } else {
      setPosts(getCommunityPostsByPopularity(slug));
    }
  };
  
  useEffect(() => {
    loadPosts();
  }, [sortBy, slug]);
  
  const handleJoinCommunity = () => {
    if (!slug || !community) return;
    
    if (isMember) {
      if (leaveCommunity(slug)) {
        setIsMember(false);
        setCommunity(prev => prev ? { ...prev, memberCount: prev.memberCount - 1 } : null);
        toast({
          title: `Left ${community.name}`,
          description: "You've left this community"
        });
      }
    } else {
      if (joinCommunity(slug)) {
        setIsMember(true);
        setCommunity(prev => prev ? { ...prev, memberCount: prev.memberCount + 1 } : null);
        toast({
          title: `Joined ${community.name}`,
          description: "Welcome to the community!"
        });
      }
    }
  };
  
  const handleAddPost = (post: any) => {
    if (!slug) return null;
    return addCommunityPost(slug, post);
  };
  
  const handleAddComment = (postId: string, comment: any) => {
    if (!slug) return;
    addCommunityComment(slug, postId, comment);
  };
  
  const handleUpvote = (postId: string) => {
    if (!slug) return;
    toggleCommunityUpvote(slug, postId);
    loadPosts();
  };
  
  const handleDownvote = (postId: string) => {
    if (!slug) return;
    toggleCommunityDownvote(slug, postId);
    loadPosts();
  };

  const handleDeletePost = (postId: string) => {
    if (!slug) return;
    if (deleteCommunityPost(slug, postId)) {
      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted"
      });
      loadPosts();
    }
  };

  if (!community) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-8 mt-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif mb-2">{community.name}</h1>
                <p className="text-ink-400 mb-1">
                  {community.description}
                </p>
                <div className="flex items-center text-sm text-ink-300">
                  <Users className="h-4 w-4 mr-1" />
                  {community.memberCount} members
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleJoinCommunity}
                  variant={isMember ? "outline" : "default"}
                  className="flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {isMember ? "Leave Community" : "Join Community"}
                </Button>
                <ModeratorLogin />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 mb-4">
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
          </header>
          
          <NewForumPostForm 
            onPostAdded={loadPosts} 
            sectionName={community.name} 
            addPost={handleAddPost} 
          />
          
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
              <div className="analog-paper text-center py-10">
                <h2 className="text-xl font-serif mb-4">No Posts Yet</h2>
                <p>Be the first to share with the {community.name} community!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="border-t border-paper-300/40 py-8 mt-16">
        <div className="analog-container text-center text-ink-400 text-sm">
          <p>© {new Date().getFullYear()} Analog Community • <a href="#" className="analog-link">Contact</a></p>
        </div>
      </footer>
    </div>
  );
};

export default CommunityDetail;
