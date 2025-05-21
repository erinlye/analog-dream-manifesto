
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { LogOut, User } from 'lucide-react';

const AuthStatus = () => {
  const { user, signOut } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 py-1 px-2 bg-[#E8FFFF] border border-[#88CDDC] rounded-lg">
        <User className="h-4 w-4 text-[#3080C0]" />
        <span className="text-xs text-[#3080C0] font-medium">signed in</span>
      </div>
      <Button 
        onClick={() => signOut()} 
        variant="ghost" 
        size="sm" 
        className="h-8 px-2 text-xs flex items-center gap-1 text-[#CC0000]"
      >
        <LogOut className="h-4 w-4" />
        <span>sign out</span>
      </Button>
    </div>
  );
};

export default AuthStatus;
