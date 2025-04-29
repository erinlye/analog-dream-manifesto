
import { useState, ChangeEvent } from 'react';
import { addProject } from '../lib/projectStore';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Image } from 'lucide-react';

interface NewProjectFormProps {
  onProjectAdded: () => void;
}

const NewProjectForm = ({ onProjectAdded }: NewProjectFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) return;
    
    setIsSubmitting(true);
    
    const author = localStorage.getItem('userPseudonym') || 'anonymous_user';
    
    addProject({
      title,
      description,
      author,
      timestamp: Date.now(),
      imageUrl: imageUrl || undefined,
    });
    
    setTitle('');
    setDescription('');
    setImageUrl('');
    setIsSubmitting(false);
    
    onProjectAdded();
    
    toast({
      title: "Project shared",
      description: "Your project has been successfully shared with the community."
    });
  };

  return (
    <Card className="analog-paper mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Share Your Analog Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
              className="analog-input mb-2"
              required
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your analog project..."
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
                  alt="Project preview" 
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
            {isSubmitting ? 'Sharing...' : 'Share Project'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewProjectForm;
