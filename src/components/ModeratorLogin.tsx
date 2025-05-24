
import { useState, useEffect } from 'react';
import { getCurrentModerator, isLoggedInAsModerator } from '../lib/moderatorStore';
import { Button } from '../components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '../components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

const ModeratorLogin = () => {
  const [open, setOpen] = useState(false);
  const [isModeratorLoggedIn, setIsModeratorLoggedIn] = useState(false);
  const [moderator, setModerator] = useState<any>(null);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkModeratorStatus = async () => {
      if (user) {
        const isMod = await isLoggedInAsModerator();
        setIsModeratorLoggedIn(isMod);
        
        if (isMod) {
          const modData = await getCurrentModerator();
          setModerator(modData);
        }
      } else {
        setIsModeratorLoggedIn(false);
        setModerator(null);
      }
    };

    checkModeratorStatus();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    setIsModeratorLoggedIn(false);
    setModerator(null);
    toast({
      title: "Signed out",
      description: "You have been signed out"
    });
    setOpen(false);
  };

  if (!user) {
    return (
      <Button variant="outline" size="sm" className="ml-2" disabled>
        Sign in to moderate
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          {isModeratorLoggedIn ? `Moderator: ${moderator?.email || 'Active'}` : 'Not a Moderator'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isModeratorLoggedIn ? (
          <>
            <DialogHeader>
              <DialogTitle>Moderator Status</DialogTitle>
              <DialogDescription>
                You are signed in as a moderator with email: {moderator?.email}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Not a Moderator</DialogTitle>
              <DialogDescription>
                Your account ({user.email}) is not registered as a moderator. 
                Contact an administrator to request moderator access.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModeratorLogin;
