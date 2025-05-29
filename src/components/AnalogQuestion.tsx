
import { useState } from 'react';
import { addManifestoEntry } from '../lib/manifestoStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { generatePseudonym } from '../utils/pseudonymGenerator';
import AuthModal from './AuthModal';

type AnalogQuestionProps = {
  onContributionSubmitted?: () => void;
};

const AnalogQuestion = ({ onContributionSubmitted }: AnalogQuestionProps) => {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [generatedPseudonym, setGeneratedPseudonym] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!response.trim()) return;
    
    setIsSubmitting(true);
    
    // Add the entry to Supabase
    try {
      await addManifestoEntry(response);
      
      // Call the callback function if provided
      if (onContributionSubmitted) {
        onContributionSubmitted();
      }
      
      // Generate pseudonym and show signup prompt
      const pseudonym = generatePseudonym();
      setGeneratedPseudonym(pseudonym);
      setShowSignupPrompt(true);
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

  const handleSignUp = () => {
    setAuthModalOpen(true);
    setShowSignupPrompt(false);
  };

  const handleSkip = () => {
    setShowSignupPrompt(false);
    navigate('/manifesto');
  };

  if (showSignupPrompt) {
    return (
      <div className="analog-paper animate-fade-in">
        <h2 className="text-2xl mb-4 font-serif text-center">Join our community!</h2>
        <p className="text-center mb-4 text-ink-600">
          Thank you for contributing to our manifesto.
        </p>
        <div className="text-center mb-6">
          <p className="mb-2">Your unique pseudonym:</p>
          <p className="font-extrabold italic text-xl text-[#D946EF] mb-4">{generatedPseudonym}</p>
          <p className="text-sm text-ink-400 mb-6">
            Sign up with your email and password to join our analog community with this pseudonym.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleSignUp}
            className="analog-button w-full"
          >
            Sign Up & Join Community
          </button>
          <button 
            onClick={handleSkip}
            className="analog-link text-sm text-center"
          >
            Continue to manifesto
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
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

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        pseudonym={generatedPseudonym}
      />
    </>
  );
};

export default AnalogQuestion;
