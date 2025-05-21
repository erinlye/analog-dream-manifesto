
import React, { useState } from 'react';
import { Button } from './ui/button';
import { generatePseudonym } from '../utils/pseudonymGenerator';
import AuthModal from './AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const PseudonymGenerator = () => {
  const [pseudonym, setPseudonym] = useState(generatePseudonym());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  const handleGenerateNew = () => {
    setPseudonym(generatePseudonym());
  };

  return (
    <div className="analog-paper text-center p-4 mb-8 max-w-lg mx-auto">
      <p className="text-lg mb-2">welcome, analog dreamer:</p>
      <p className="font-extrabold italic text-2xl mb-2 text-[#D946EF]">
        {pseudonym}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button 
          onClick={handleGenerateNew}
          className="analog-button text-sm"
        >
          generate new name
        </Button>
        
        {!user && (
          <Button 
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-gradient-to-b from-[#FFFF99] to-[#FFCC00] text-[#996600] border-2 border-[#FFCC00] font-bold text-sm shadow-md hover:from-[#FFCC00] hover:to-[#CC9900] px-4 py-2 rounded-lg"
          >
            join with this name
          </Button>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        pseudonym={pseudonym}
      />
    </div>
  );
};

export default PseudonymGenerator;
