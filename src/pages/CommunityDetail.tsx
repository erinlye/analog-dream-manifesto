
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
      <main className="flex-1 py-6">
        <div className="retro-container max-w-4xl mx-auto px-4 py-6 bg-white border-2 border-[#88CDDC] rounded-lg shadow-retro-lg">
          <header className="mb-8 mt-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-comic text-[#3080C0] mb-2 bg-[#E8FFFF] px-4 py-2 inline-block border-2 border-[#88CDDC] rounded-lg shadow-retro">
                  {community.name}
                </h1>
                <p className="text-[#555] mb-1 font-comic">
                  {community.description}
                </p>
                <div className="flex items-center text-sm text-[#666] font-comic">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="counter-badge">
                    {community.memberCount} members
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleJoinCommunity}
                  variant={isMember ? "outline" : "default"}
                  className="flex items-center retro-button font-comic text-sm border border-[#246090]"
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
                  className={`font-comic retro-button ${sortBy === 'recent' ? 'bg-[#3080C0]' : 'bg-white text-[#3080C0] border border-[#3080C0]'}`}
                >
                  Recent
                </Button>
                <Button 
                  variant={sortBy === 'popular' ? 'default' : 'outline'}
                  onClick={() => setSortBy('popular')}
                  size="sm"
                  className={`font-comic retro-button ${sortBy === 'popular' ? 'bg-[#3080C0]' : 'bg-white text-[#3080C0] border border-[#3080C0]'}`}
                >
                  Popular
                </Button>
              </div>
            </div>
          </header>
          
          <div className="speech-bubble mb-8">
            <NewForumPostForm 
              onPostAdded={loadPosts} 
              sectionName={community.name} 
              addPost={handleAddPost} 
            />
          </div>
          
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
              <div className="analog-paper text-center py-10 bg-[#FFFF99] border-2 border-[#FFCC00] font-comic">
                <h2 className="text-xl font-comic mb-4 text-[#CC6600]">No Posts Yet</h2>
                <p className="text-[#CC6600]">Be the first to share with the {community.name} community!</p>
                <div className="mt-4">
                  <span className="blink text-[#FF0000] font-bold text-xl inline-block">!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="border-t-2 border-[#88CDDC] py-8 mt-16 bg-white">
        <div className="retro-container text-center text-[#666] text-sm font-comic">
          <p>© {new Date().getFullYear()} Analog Community • <a href="#" className="retro-link">Contact</a> • <a href="#" className="retro-link">About</a> • <a href="#" className="retro-link">Help</a></p>
          <p className="text-xs mt-2 text-[#999]">
            Best viewed in Internet Explorer 6.0 or Netscape Navigator 4.0 at 800x600 resolution
          </p>
          <div className="flex justify-center gap-2 mt-2">
            <img src="data:image/gif;base64,R0lGODlhFgASALMAAAAAAP///4iIiHZ2dgAAAPj4+P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAEALAAAAAAWABIAQARGEMhJq7046827/2AojmRpnmiqrqyqIEAsz3Rt33iu73zv/0DfIDEQCBaFAcB45DiWg+fpYPpIm9Wot1ErLu/IuSM3DAgBADs=" alt="Best viewed in IE" width="22" height="18" className="pixelated" />
            <img src="data:image/gif;base64,R0lGODlhEgASALMAAAAAAP///93d3bu7u5mZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAEALAAAAAASABIAQAROMHFJq704X+y9KFVgKAkfFpxoqhaaKw1bMMxrds04Xt+4aOv7YT6EkCgSGAaOw6RyJkQ4kQSpdFpYJbLVinW4uGgHiUtmG0l6vx9JAgA7" alt="Get Netscape Now" width="18" height="18" className="pixelated" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityDetail;
