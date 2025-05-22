
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '../components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import PostHistoryList from '../components/PostHistoryList';
import { LearningPost, ImaginingPost, OrganizingPost, PlugPost } from '../lib/types';
import { 
  getAllLearningPosts, 
  getAllImaginingPosts, 
  getAllOrganizingPosts, 
  getAllPlugPosts 
} from '../lib/userPostHistory';
import { Button } from '../components/ui/button';

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const [learningPosts, setLearningPosts] = useState<LearningPost[]>([]);
  const [imaginingPosts, setImaginingPosts] = useState<ImaginingPost[]>([]);
  const [organizingPosts, setOrganizingPosts] = useState<OrganizingPost[]>([]);
  const [plugPosts, setPlugPosts] = useState<PlugPost[]>([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState(username);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPostHistory = async () => {
      setIsLoading(true);
      
      try {
        // Check if this is the current logged-in user's profile
        if (user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('pseudonym')
            .eq('id', user.id)
            .single();
            
          if (profileData && profileData.pseudonym === username) {
            setIsCurrentUser(true);
          }
        }

        // Fetch posts by author
        const learningData = getAllLearningPosts().filter(post => post.author === username);
        const imaginingData = getAllImaginingPosts().filter(post => post.author === username);
        const organizingData = getAllOrganizingPosts().filter(post => post.author === username);
        const plugData = getAllPlugPosts().filter(post => post.author === username);
        
        setLearningPosts(learningData);
        setImaginingPosts(imaginingData);
        setOrganizingPosts(organizingData);
        setPlugPosts(plugData);
        
        // Get display name if different from username
        setUserDisplayName(username);
      } catch (error) {
        console.error('Error fetching user post history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchUserPostHistory();
    }
  }, [username, user]);

  const totalPosts = 
    learningPosts.length + 
    imaginingPosts.length + 
    organizingPosts.length + 
    plugPosts.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <div className="analog-paper p-8 mb-8 mt-6">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-serif mb-2">
                {userDisplayName}'s Analog Journey
              </h1>
              <p className="text-ink-400">
                {totalPosts} contributions to the analog movement
              </p>
            </header>

            {isLoading ? (
              <div className="py-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Posts ({totalPosts})</TabsTrigger>
                  <TabsTrigger value="learning">Learning ({learningPosts.length})</TabsTrigger>
                  <TabsTrigger value="imagining">Imagining ({imaginingPosts.length})</TabsTrigger>
                  <TabsTrigger value="organizing">Organizing ({organizingPosts.length})</TabsTrigger>
                  <TabsTrigger value="plugs">Plugs ({plugPosts.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  {totalPosts > 0 ? (
                    <>
                      {learningPosts.length > 0 && (
                        <PostHistoryList 
                          title="Learning Posts" 
                          posts={learningPosts} 
                          type="learning" 
                        />
                      )}
                      {imaginingPosts.length > 0 && (
                        <PostHistoryList 
                          title="Imagining Posts" 
                          posts={imaginingPosts} 
                          type="imagining" 
                        />
                      )}
                      {organizingPosts.length > 0 && (
                        <PostHistoryList 
                          title="Organizing Posts" 
                          posts={organizingPosts} 
                          type="organizing" 
                        />
                      )}
                      {plugPosts.length > 0 && (
                        <PostHistoryList 
                          title="Plug Posts" 
                          posts={plugPosts} 
                          type="plugs" 
                        />
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-xl font-serif mb-2">No posts yet</p>
                      <p className="text-ink-400 mb-4">This user hasn't made any posts yet.</p>
                      {isCurrentUser && (
                        <div className="space-x-4">
                          <Button asChild>
                            <Link to="/learning">Start Learning</Link>
                          </Button>
                          <Button asChild variant="outline">
                            <Link to="/imagining">Start Imagining</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="learning">
                  {learningPosts.length > 0 ? (
                    <PostHistoryList 
                      title="Learning Posts" 
                      posts={learningPosts} 
                      type="learning" 
                      showAllLink={false}
                    />
                  ) : (
                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-xl font-serif mb-2">No learning posts yet</p>
                      {isCurrentUser && (
                        <Button asChild className="mt-4">
                          <Link to="/learning">Start Learning</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="imagining">
                  {imaginingPosts.length > 0 ? (
                    <PostHistoryList 
                      title="Imagining Posts" 
                      posts={imaginingPosts} 
                      type="imagining" 
                      showAllLink={false}
                    />
                  ) : (
                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-xl font-serif mb-2">No imagining posts yet</p>
                      {isCurrentUser && (
                        <Button asChild className="mt-4">
                          <Link to="/imagining">Start Imagining</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="organizing">
                  {organizingPosts.length > 0 ? (
                    <PostHistoryList 
                      title="Organizing Posts" 
                      posts={organizingPosts} 
                      type="organizing" 
                      showAllLink={false}
                    />
                  ) : (
                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-xl font-serif mb-2">No organizing posts yet</p>
                      {isCurrentUser && (
                        <Button asChild className="mt-4">
                          <Link to="/organizing">Start Organizing</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="plugs">
                  {plugPosts.length > 0 ? (
                    <PostHistoryList 
                      title="Plug Posts" 
                      posts={plugPosts} 
                      type="plugs" 
                      showAllLink={false}
                    />
                  ) : (
                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-xl font-serif mb-2">No plug posts yet</p>
                      {isCurrentUser && (
                        <Button asChild className="mt-4">
                          <Link to="/plugs">Start Sharing</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
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

export default UserProfile;
