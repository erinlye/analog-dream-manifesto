
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  name: z.string().min(3, { message: "Community name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens" })
});

type FormValues = z.infer<typeof formSchema>;

const NewCommunityForm = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      slug: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a community",
        variant: "destructive"
      });
      return;
    }

    try {
      // Insert into communities table
      const { data, error } = await supabase
        .from('communities')
        .insert([
          {
            name: values.name,
            description: values.description,
            slug: values.slug,
            created_by: user.id,
            member_count: 1
          }
        ])
        .select();

      if (error) throw error;

      // Join the community as the creator
      await supabase
        .from('community_members')
        .insert([
          {
            community_id: data[0].id,
            user_id: user.id
          }
        ]);

      toast({
        title: "Community created!",
        description: `You've successfully created ${values.name}`
      });

      // Reset form and close dialog
      form.reset();
      setOpen(false);
      
      // Refresh the communities list
      queryClient.invalidateQueries({ queryKey: ['communities'] });
    } catch (error: any) {
      toast({
        title: "Error creating community",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue('name', name);
    
    // Auto-generate slug from name if slug is empty or was auto-generated
    const currentSlug = form.getValues('slug');
    const generatedSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    if (!currentSlug || currentSlug === form.getValues('name').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')) {
      form.setValue('slug', generatedSlug);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Create New Community</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Community</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Light Phone Users" {...field} onChange={handleNameChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="light-phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A community for Light Phone users to share experiences..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Create Community</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCommunityForm;
