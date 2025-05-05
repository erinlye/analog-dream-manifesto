
import { useState } from 'react';
import { loginAsModerator, logoutModerator, isLoggedInAsModerator, getCurrentModerator } from '../lib/moderatorStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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
import { useToast } from '../hooks/use-toast';

const ModeratorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const isLoggedIn = isLoggedInAsModerator();
  const moderator = getCurrentModerator();

  const handleLogin = () => {
    if (loginAsModerator(username, password)) {
      toast({
        title: "Login successful",
        description: "You are now logged in as a moderator"
      });
      setOpen(false);
      setUsername('');
      setPassword('');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    logoutModerator();
    toast({
      title: "Logged out",
      description: "You have been logged out"
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          {isLoggedIn ? `Moderator: ${moderator?.username}` : 'Moderator Login'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!isLoggedIn ? (
          <>
            <DialogHeader>
              <DialogTitle>Moderator Login</DialogTitle>
              <DialogDescription>
                Login with your moderator credentials to access moderation tools.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right">
                  Username
                </label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className="text-right">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleLogin}>Login</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Moderator Options</DialogTitle>
              <DialogDescription>
                You are logged in as {moderator?.username}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={handleLogout}>Logout</Button>
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
