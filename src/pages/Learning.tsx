
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { getAllLearningPosts, getLearningPostsByPopularity, addLearningComment, toggleLearningUpvote, toggleLearningDownvote, addLearningPost, deleteLearningPost } from '../lib/learningStore';
import { LearningPost } from '../lib/types';
import ForumCard from '../components/ForumCard';
import NewForumPostForm from '../components/NewForumPostForm';
import ModeratorLogin from '../components/ModeratorLogin';
import { Button } from '../components/ui/button';

const Learning = () => {
  const [posts, setPosts] = useState<LearningPost[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  
  const loadPosts = () => {
    if (sortBy === 'recent') {
      setPosts(getAllLearningPosts());
    } else {
      setPosts(getLearningPostsByPopularity());
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
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Communal Learning</h1>
            <p className="text-ink-400 mb-6">
              Questions, answers, and shared wisdom about analog living.
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
            sectionName="Learning" 
            addPost={addLearningPost} 
          />
          
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map(post => (
                <ForumCard 
                  key={post.id} 
                  post={post} 
                  onUpvote={toggleLearningUpvote} 
                  onDownvote={toggleLearningDownvote}
                  onAddComment={addLearningComment}
                  onDelete={deleteLearningPost}
                  onUpdate={loadPosts}
                  resourceType="learningPost"
                />
              ))
            ) : (
              <div className="analog-paper text-center py-10">
                <h2 className="text-xl font-serif mb-4">No Learning Posts Yet</h2>
                <p>Be the first to share a question or insight with the community!</p>
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

export default Learning;
