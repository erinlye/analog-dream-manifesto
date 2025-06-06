
import { useState, ChangeEvent } from 'react';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Image } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NewForumPostFormProps {
  onPostAdded: () => void;
  sectionName: string;
  addPost: (post: any) => Promise<any>;
}

const NewForumPostForm = ({ onPostAdded, sectionName, addPost }: NewForumPostFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Convert the image file to a data URL
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image too large. Please choose an image under 5MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Get author from authenticated user or fallback to localStorage
      const author = user?.user_metadata?.pseudonym || localStorage.getItem('userPseudonym') || 'anonymous_user';
      
      await addPost({
        title,
        description,
        author,
        timestamp: Date.now(),
        imageUrl: imageUrl || undefined,
      });
      
      setTitle('');
      setDescription('');
      setImageUrl('');
      
      onPostAdded();
      
      toast({
        title: "Post shared",
        description: `Your ${sectionName.toLowerCase()} post has been successfully shared with the community.`
      });
    } catch (error) {
      console.error('Error adding post:', error);
      toast({
        title: "Error",
        description: "Failed to share your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="analog-paper mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Share Your {sectionName} Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="analog-input mb-2"
              required
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Share your ${sectionName.toLowerCase()} thoughts...`}
              className="analog-input h-24 mb-2"
              required
            />
            
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Add a photo (optional)</label>
              <div className="flex items-center">
                <label className="cursor-pointer flex items-center justify-center border border-dashed border-gray-300 rounded-md p-4 w-full hover:bg-gray-50 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                  <div className="text-center">
                    <Image className="mx-auto h-6 w-6 text-gray-400" />
                    <span className="mt-2 block text-sm text-gray-600">
                      {imageUrl ? "Change photo" : "Upload a photo"}
                    </span>
                  </div>
                </label>
              </div>
            </div>
            
            {imageUrl && (
              <div className="mt-2 relative">
                <img 
                  src={imageUrl} 
                  alt="Post preview" 
                  className="w-full h-auto max-h-48 object-cover rounded-md"
                />
                <button 
                  type="button" 
                  className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white hover:bg-black/70"
                  onClick={() => setImageUrl('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <Button 
            type="submit" 
            className="analog-button w-full"
            disabled={isSubmitting || !title.trim() || !description.trim()}
          >
            {isSubmitting ? 'Sharing...' : `Share ${sectionName} Post`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewForumPostForm;
