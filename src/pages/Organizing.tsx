
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { getAllOrganizingPosts, getOrganizingPostsByPopularity, addOrganizingComment, toggleOrganizingUpvote, toggleOrganizingDownvote, addOrganizingPost, deleteOrganizingPost } from '../lib/organizingStore';
import { OrganizingPost } from '../lib/types';
import ForumCard from '../components/ForumCard';
import NewForumPostForm from '../components/NewForumPostForm';
import ModeratorLogin from '../components/ModeratorLogin';
import { Button } from '../components/ui/button';

const Organizing = () => {
  const [posts, setPosts] = useState<OrganizingPost[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  
  const loadPosts = () => {
    if (sortBy === 'recent') {
      setPosts(getAllOrganizingPosts());
    } else {
      setPosts(getOrganizingPostsByPopularity());
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
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Organizing</h1>
            <p className="text-ink-400 mb-6">
              Resource sharing and calls to action for better technology.
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
            sectionName="Organizing" 
            addPost={addOrganizingPost} 
          />
          
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map(post => (
                <ForumCard 
                  key={post.id} 
                  post={post} 
                  onUpvote={toggleOrganizingUpvote} 
                  onDownvote={toggleOrganizingDownvote}
                  onAddComment={addOrganizingComment}
                  onDelete={deleteOrganizingPost}
                  onUpdate={loadPosts}
                  resourceType="organizingPost"
                />
              ))
            ) : (
              <div className="analog-paper text-center py-10">
                <h2 className="text-xl font-serif mb-4">No Organizing Posts Yet</h2>
                <p>Be the first to share a call to action or resource with the community!</p>
              </div>
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

export default Organizing;
