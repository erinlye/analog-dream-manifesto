
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { getAllPlugPosts, getPlugPostsByPopularity, addPlugComment, togglePlugUpvote, togglePlugDownvote, addPlugPost, deletePlugPost } from '../lib/plugsStore';
import { PlugPost } from '../lib/types';
import ForumCard from '../components/ForumCard';
import NewForumPostForm from '../components/NewForumPostForm';
import ModeratorLogin from '../components/ModeratorLogin';
import { Button } from '../components/ui/button';

const Plugs = () => {
  const [posts, setPosts] = useState<PlugPost[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  
  const loadPosts = () => {
    if (sortBy === 'recent') {
      setPosts(getAllPlugPosts());
    } else {
      setPosts(getPlugPostsByPopularity());
    }
  };
  
  useEffect(() => {
    loadPosts();
  }, [sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-8 mt-6">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Shameless Plugs</h1>
            <p className="text-ink-400 mb-6">
              Events and achievements related to low-tech living.
            </p>
            
            <div className="flex justify-between items-center mb-4">
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
                <ModeratorLogin />
              </div>
            </div>
          </header>
          
          <NewForumPostForm 
            onPostAdded={loadPosts} 
            sectionName="Plug" 
            addPost={addPlugPost} 
          />
          
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map(post => (
                <ForumCard 
                  key={post.id} 
                  post={post} 
                  onUpvote={togglePlugUpvote} 
                  onDownvote={togglePlugDownvote}
                  onAddComment={addPlugComment}
                  onDelete={deletePlugPost}
                  onUpdate={loadPosts}
                  resourceType="plugPost"
                />
              ))
            ) : (
              <div className="analog-paper text-center py-10">
                <h2 className="text-xl font-serif mb-4">No Plugs Yet</h2>
                <p>Be the first to share your event or achievement with the community!</p>
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

export default Plugs;
