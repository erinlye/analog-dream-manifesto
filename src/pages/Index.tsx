import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import AnalogQuestion from '../components/AnalogQuestion';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getManifestoEntries } from '../lib/manifestoStore';
import ManifestoEntries from '../components/ManifestoEntries';
import AuthStatus from '../components/AuthStatus';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogIn, Settings, Monitor } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const [hasContributed, setHasContributed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentPseudonym, setCurrentPseudonym] = useState("");
  const { user } = useAuth();

  // Check if the user has already contributed to the manifesto
  useEffect(() => {
    const checkContributions = async () => {
      const entries = await getManifestoEntries();
      if (entries.length > 0 || user) {
        setHasContributed(true);
      }
    };
    
    checkContributions();
  }, [user]);

  const handleContribution = () => {
    setHasContributed(true);
  };

  const handleOpenDialog = () => {
    if (!hasContributed) {
      setDialogOpen(true);
      return;
    }
  };

  const handleOpenAuthModal = (pseudonym: string) => {
    setCurrentPseudonym(pseudonym);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-end p-2 bg-transparent">
        <AuthStatus />
      </div>
      
      <Navigation isDisabled={!hasContributed} onDisabledClick={handleOpenDialog} />
      
      {/* Desktop-only notice */}
      <div className="analog-container pt-4">
        <Alert className="analog-paper border-ink-200 mb-6">
          <Monitor className="h-4 w-4" />
          <AlertDescription className="text-ink-600">
            <strong>Desktop experience:</strong> Our community is designed for desktop use only. 
            We believe in creating spaces for meaningful sharing and connection, not endless mobile scrolling.
          </AlertDescription>
        </Alert>
      </div>

      <main className="flex-1">
        <section className="analog-container py-16">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">a community for analog dreamers</h1>
            <p className="text-lg md:text-xl text-ink-400 max-w-2xl mx-auto">
              we're building a platform to promote and communally learn how to live more analog lifestyles in our increasingly digital world.
            </p>
          </div>

          {/* Community Norms Section */}
          <div className="mb-12">
            <Card className="analog-paper">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-center">community norms that keep analog abundant</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm">
                <p className="text-ink-400">
                  support the diverse ways people are accessing analog living.
                  <br />
                  be creative and kind.
                  <br />
                  analog has zero tolerance for hate speech, hurtful language, sexual language or extortion, or any other online abuse. these accounts will be promptly removed from analog.
                  <br />
                  living analog is living a political life against the tech industry. we don't shy away from these healthy political conversations, but they need to happen with respect. debate ideas not people. do not be political in a way that does not support or relate to analog living.
                  <br />
                  do not post sexually explicit content on any forum site.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left column: Manifesto */}
            <div>
              <h2 className="font-serif text-2xl mb-6 text-center">Our Manifesto: Reasons for Being Analog</h2>
              <ManifestoEntries />
            </div>
            
            {/* Right column: Contribution form */}
            <div>
              <AnalogQuestion onContributionSubmitted={handleContribution} />
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl mb-6">Join the movement</h2>
            <p className="text-ink-400 mb-8">Connect with others who are seeking intentional relationships with technology.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {user ? (
                <>
                  <Link 
                    to={`/users/${user.user_metadata?.pseudonym || 'profile'}`} 
                    className="analog-button flex items-center gap-2"
                  >
                    <User size={18} />
                    My Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="px-6 py-3 border border-ink-300 rounded-sm hover:bg-paper-100 transition-colors flex items-center gap-2"
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleOpenAuthModal(currentPseudonym)} 
                    className="analog-button flex items-center gap-2"
                  >
                    <LogIn size={18} />
                    Sign In / Join
                  </button>
                </>
              )}
              
              {hasContributed ? (
                <>
                  <Link 
                    to="/communities" 
                    className="px-6 py-3 border border-ink-300 rounded-sm hover:bg-paper-100 transition-colors"
                  >
                    Explore Communities
                  </Link>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleOpenDialog}
                    className="px-6 py-3 border border-ink-300 rounded-sm opacity-75 cursor-not-allowed"
                  >
                    Explore Communities
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

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        pseudonym={currentPseudonym}
      />

      <footer className="border-t border-paper-300/40 py-8">
        <div className="analog-container text-center text-ink-400 text-sm">
          <p>© {new Date().getFullYear()} Analog Community</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
