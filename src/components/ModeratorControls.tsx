
import { useState } from 'react';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, AlertDialogAction } from './ui/alert-dialog';
import { isLoggedInAsModerator } from '../lib/moderatorStore';
import { Trash2 } from 'lucide-react';

interface ModeratorControlsProps {
  resourceId: string;
  resourceType: 'project' | 'communityPost' | 'learningPost' | 'imaginingPost' | 'organizingPost' | 'plugPost';
  communitySlug?: string;
  onDelete: () => void;
}

const ModeratorControls = ({ resourceId, resourceType, communitySlug, onDelete }: ModeratorControlsProps) => {
  const [open, setOpen] = useState(false);
  const isModeratorLoggedIn = isLoggedInAsModerator();

  if (!isModeratorLoggedIn) {
    return null;
  }

  const getResourceName = () => {
    switch (resourceType) {
      case 'project': return 'project';
      case 'communityPost': return 'community post';
      case 'learningPost': return 'learning post';
      case 'imaginingPost': return 'imagining post';
      case 'organizingPost': return 'organizing post';
      case 'plugPost': return 'plug post';
    }
  };

  const handleConfirmDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm" 
          className="flex items-center gap-1 absolute top-3 right-3 z-10"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this {getResourceName()}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {getResourceName()} 
            and all its comments.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirmDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModeratorControls;
