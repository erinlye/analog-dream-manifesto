
import React, { useState } from 'react';
import { Button } from './ui/button';
import { generatePseudonym } from '../utils/pseudonymGenerator';

const PseudonymGenerator = () => {
  const [pseudonym, setPseudonym] = useState(generatePseudonym());

  const handleGenerateNew = () => {
    setPseudonym(generatePseudonym());
  };

  return (
    <div className="analog-paper text-center p-8 mb-12">
      <h2 className="text-2xl mb-4">your analog identity</h2>
      <div className="mb-6">
        <p className="text-lg mb-2">welcome, analog dreamer:</p>
        <p className="font-bold text-2xl mb-4 text-accent-400">{pseudonym}</p>
        <p className="text-sm text-ink-400 mb-4">this will be your identity across the analog community</p>
      </div>
      <Button 
        onClick={handleGenerateNew}
        className="analog-button"
      >
        generate new name
      </Button>
    </div>
  );
};

export default PseudonymGenerator;
