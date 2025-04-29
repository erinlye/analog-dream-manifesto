
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import AnalogQuestion from '../components/AnalogQuestion';
import PseudonymGenerator from '../components/PseudonymGenerator';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getManifestoEntries } from '../lib/store';

const Index = () => {
  const [hasContributed, setHasContributed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Check if the user has already contributed to the manifesto
  useEffect(() => {
    const entries = getManifestoEntries();
    if (entries.length > 0) {
      setHasContributed(true);
    }
  }, []);

  const handleContribution = () => {
    setHasContributed(true);
  };

  const handleOpenDialog = () => {
    if (!hasContributed) {
      setDialogOpen(true);
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation isDisabled={!hasContributed} onDisabledClick={handleOpenDialog} />
      <main className="flex-1">
        <section className="analog-container py-16">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">a community for analog dreamers</h1>
            <p className="text-lg md:text-xl text-ink-400 max-w-2xl mx-auto">
              we're building a platform to promote and communally learn how to live more analog lifestyles in our increasingly digital world.
            </p>
          </div>
          
          <PseudonymGenerator />
          
          <div className="max-w-2xl mx-auto">
            <AnalogQuestion onContributionSubmitted={handleContribution} />
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl mb-6">Join the movement</h2>
            <p className="text-ink-400 mb-8">Connect with others who are seeking intentional relationships with technology.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {hasContributed ? (
                <>
                  <Link 
                    to="/communities" 
                    className="analog-button"
                  >
                    Explore Communities
                  </Link>
                  <Link 
                    to="/manifesto" 
                    className="px-6 py-3 border border-ink-300 rounded-sm hover:bg-paper-100 transition-colors"
                  >
                    Read Our Manifesto
                  </Link>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleOpenDialog}
                    className="analog-button opacity-75 cursor-not-allowed"
                  >
                    Explore Communities
                  </button>
                  <button 
                    onClick={handleOpenDialog}
                    className="px-6 py-3 border border-ink-300 rounded-sm opacity-75 cursor-not-allowed"
                  >
                    Read Our Manifesto
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="analog-paper">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Contribute to join</DialogTitle>
            <DialogDescription className="text-ink-400">
              Please share your thoughts on analog living before exploring the community.
            </DialogDescription>
          </DialogHeader>
          <p className="text-center mb-4">
            We ask all members to contribute to our manifesto before joining the analog community.
          </p>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-paper-300/40 py-8">
        <div className="analog-container text-center text-ink-400 text-sm">
          <p>© {new Date().getFullYear()} Analog Community • <a href="#" className="analog-link">Contact</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
