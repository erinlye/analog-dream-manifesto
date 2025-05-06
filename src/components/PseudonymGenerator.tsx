
import React, { useState } from 'react';
import { Button } from './ui/button';
import { generatePseudonym } from '../utils/pseudonymGenerator';

const PseudonymGenerator = () => {
  const [pseudonym, setPseudonym] = useState(generatePseudonym());

  const handleGenerateNew = () => {
    setPseudonym(generatePseudonym());
  };

  return (
    <div className="analog-paper text-center p-4 mb-8 max-w-lg mx-auto">
      <p className="text-lg mb-2">welcome, analog dreamer:</p>
      <p className="font-bold text-2xl mb-2 text-[#D946EF]">
        {pseudonym}
      </p>
      <Button 
        onClick={handleGenerateNew}
        className="analog-button text-sm"
      >
        generate new name
      </Button>
    </div>
  );
};

export default PseudonymGenerator;
