
import { useState } from 'react';
import { addManifestoEntry } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import PseudonymGenerator from './PseudonymGenerator';

type AnalogQuestionProps = {
  onContributionSubmitted?: () => void;
};

const AnalogQuestion = ({ onContributionSubmitted }: AnalogQuestionProps) => {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPseudonymPrompt, setShowPseudonymPrompt] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!response.trim()) return;
    
    setIsSubmitting(true);
    
    // Add the entry to our local store
    try {
      addManifestoEntry(response);
      
      // Call the callback function if provided
      if (onContributionSubmitted) {
        onContributionSubmitted();
      }
      
      // Show pseudonym prompt instead of navigating immediately
      setShowPseudonymPrompt(true);
      setResponse(''); // Clear the form
      
      toast({
        title: "Thank you for your contribution",
        description: "Your response has been added to our manifesto. Now join our community!",
      });
      
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

  const handlePseudonymSelect = (pseudonym: string) => {
    // This will open the auth modal via the parent component
    // Navigate to manifesto after pseudonym selection
    setTimeout(() => {
      navigate('/manifesto');
    }, 100);
  };

  if (showPseudonymPrompt) {
    return (
      <div className="analog-paper animate-fade-in">
        <h2 className="text-2xl mb-4 font-serif text-center">Welcome to our community!</h2>
        <p className="text-center mb-6 text-ink-400">
          Thank you for contributing to our manifesto. Now join our community with a unique pseudonym:
        </p>
        <PseudonymGenerator onSelect={handlePseudonymSelect} />
        <div className="text-center mt-4">
          <button 
            onClick={() => navigate('/manifesto')}
            className="analog-link text-sm"
          >
            Continue to manifesto
          </button>
        </div>
      </div>
    );
  }

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
