
import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { addCommunityPost } from '../lib/communityPostStore';
import { useAuth } from '@/contexts/AuthContext';

interface NewCommunityPostFormProps {
  communityId: string; // This is actually the community slug
  onPostAdded: () => void;
}

const NewCommunityPostForm = ({ communityId, onPostAdded }: NewCommunityPostFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and description",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get author from authenticated user or fallback to localStorage
      const author = user?.user_metadata?.pseudonym || localStorage.getItem('userPseudonym') || 'anonymous_user';

      await addCommunityPost({
        communityId, // This is the community slug
        title: title.trim(),
        description: description.trim(),
        author,
        timestamp: Date.now(),
        imageUrl: imageUrl.trim() || undefined
      });

      setTitle('');
      setDescription('');
      setImageUrl('');
      onPostAdded();
      
      toast({
        title: "Success",
        description: "Your post has been added to the community!"
      });
    } catch (error) {
      console.error('Error adding community post:', error);
      toast({
        title: "Error",
        description: "Failed to add post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="analog-paper p-6 mb-6">
      <h3 className="text-xl font-serif mb-4">Share with the Community</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="analog-input"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Textarea
            placeholder="What would you like to share with this community?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="analog-input min-h-[100px]"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Input
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="analog-input"
            disabled={isSubmitting}
          />
        </div>
        
        <Button 
          type="submit" 
          className="analog-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post to Community'}
        </Button>
      </form>
    </div>
  );
};

export default NewCommunityPostForm;
