
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  pseudonym: string;
}

const formSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, pseudonym }) => {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (isSignUp) {
      await signUp(data.email, data.password, pseudonym);
    } else {
      await signIn(data.email, data.password);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="analog-paper sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-4">
          <p className="font-bold text-lg mb-1">Your Analog Pseudonym:</p>
          <p className="font-extrabold italic text-xl text-[#D946EF] mb-4">{pseudonym}</p>
          <p className="text-sm text-ink-400">
            {isSignUp 
              ? 'This unique pseudonym will be tied to your account' 
              : 'Sign in to continue your analog journey'}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="analog-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" className="analog-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-2">
              <Button type="submit" className="analog-button w-full">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
              
              <div className="text-center mt-2">
                <button 
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)} 
                  className="analog-link text-sm"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                </button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
