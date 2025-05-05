
import { useState } from 'react';
import { Project } from '../lib/types';
import { format } from 'date-fns';
import { addComment, toggleUpvote, toggleDownvote, deleteProject } from '../lib/projectStore';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import ModeratorControls from './ModeratorControls';

interface ProjectCardProps {
  project: Project;
  onUpdate: () => void;
}

const ProjectCard = ({ project, onUpdate }: ProjectCardProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();

  const handleUpvote = () => {
    toggleUpvote(project.id);
    onUpdate();
    toast({
      title: "Upvoted",
      description: "You've upvoted this project"
    });
  };

  const handleDownvote = () => {
    toggleDownvote(project.id);
    onUpdate();
    toast({
      title: "Downvoted",
      description: "You've downvoted this project"
    });
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    addComment(project.id, {
      author: localStorage.getItem('userPseudonym') || 'anonymous_user',
      content: commentText
    });
    
    setCommentText('');
    setIsCommenting(false);
    onUpdate();
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the project"
    });
  };

  const handleDelete = () => {
    deleteProject(project.id);
    onUpdate();
    toast({
      title: "Project deleted",
      description: "The project has been deleted"
    });
  };

  return (
    <Card className="mb-6 hover:shadow-lg transition-shadow relative">
      <ModeratorControls 
        resourceId={project.id} 
        resourceType="project" 
        onDelete={handleDelete}
      />
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
            <CardDescription className="text-sm mb-2">
              Posted by {project.author} • {format(project.timestamp, 'MMM d, yyyy')}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center" 
              onClick={handleUpvote}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              {project.upvotes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center" 
              onClick={handleDownvote}
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
              {project.downvotes}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {project.imageUrl && (
          <div className="mb-4">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-auto max-h-80 object-cover rounded-md"
            />
          </div>
        )}
        
        <p className="mb-4">{project.description}</p>
        
        {showComments && project.comments.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-3">Comments:</h4>
            <div className="space-y-3">
              {project.comments.map(comment => (
                <div key={comment.id} className="bg-paper-200 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback>{comment.author[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{comment.author}</span>
                    <span className="text-xs text-ink-300 ml-2">
                      {format(comment.timestamp, 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {isCommenting && (
          <div className="mt-4 pt-4 border-t">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add your comment..."
              className="mb-2 analog-input"
            />
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsCommenting(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className="analog-button"
              >
                Post Comment
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-ink-400"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className="mr-1 h-4 w-4" />
          {project.comments.length} {project.comments.length === 1 ? 'Comment' : 'Comments'}
        </Button>
        
        {!isCommenting && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsCommenting(true)}
          >
            Reply
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
