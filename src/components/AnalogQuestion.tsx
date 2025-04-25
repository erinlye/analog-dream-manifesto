
import { useState } from 'react';
import { addManifestoEntry } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

const AnalogQuestion = () => {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!response.trim()) return;
    
    setIsSubmitting(true);
    
    // Add the entry to our local store
    try {
      addManifestoEntry(response);
      toast({
        title: "Thank you for your contribution",
        description: "Your response has been added to our manifesto.",
      });
      
      // Navigate to manifesto page
      navigate('/manifesto');
    } catch (error) {
      console.error('Error saving response:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="analog-paper animate-fade-in">
      <h2 className="text-2xl mb-6 font-serif">Why are you interested in being more analog?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea 
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="w-full analog-input h-32 resize-none"
            placeholder="Share your thoughts..."
            required
          />
        </div>
        <button 
          type="submit" 
          className="analog-button"
          disabled={isSubmitting || !response.trim()}
        >
          {isSubmitting ? 'Submitting...' : 'Add to manifesto'}
        </button>
      </form>
    </div>
  );
};

export default AnalogQuestion;
