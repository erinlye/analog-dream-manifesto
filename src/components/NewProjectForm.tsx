
import { useState } from 'react';
import { addProject } from '../lib/projectStore';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface NewProjectFormProps {
  onProjectAdded: () => void;
}

const NewProjectForm = ({ onProjectAdded }: NewProjectFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
    });
    
    setTitle('');
    setDescription('');
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
              className="analog-input h-24"
              required
            />
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
