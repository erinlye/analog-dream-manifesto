
import { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import ModeratorControls from './ModeratorControls';
import { Badge } from './ui/badge';
import { isLoggedInAsModerator } from '../lib/moderatorStore';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

interface Post {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  imageUrl?: string;
}

interface ForumCardProps {
  post: Post;
  onUpvote: (postId: string) => void;
  onDownvote: (postId: string) => void;
  onAddComment: (postId: string, comment: { author: string; content: string }) => void;
  onDelete: (postId: string) => void;
  onUpdate: () => void;
  resourceType: 'communityPost' | 'learningPost' | 'imaginingPost' | 'organizingPost' | 'plugPost';
  communitySlug?: string;
}

const ForumCard = ({ 
  post, 
  onUpvote, 
  onDownvote, 
  onAddComment, 
  onDelete,
  onUpdate, 
  resourceType,
  communitySlug 
}: ForumCardProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();

  const handleUpvote = () => {
    onUpvote(post.id);
    onUpdate();
    toast({
      title: "Upvoted",
      description: "You've upvoted this post"
    });
  };

  const handleDownvote = () => {
    onDownvote(post.id);
    onUpdate();
    toast({
      title: "Downvoted",
      description: "You've downvoted this post"
    });
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    onAddComment(post.id, {
      author: localStorage.getItem('userPseudonym') || 'anonymous_user',
      content: commentText
    });
    
    setCommentText('');
    setIsCommenting(false);
    onUpdate();
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the post"
    });
  };

  const handleDelete = () => {
    onDelete(post.id);
    onUpdate();
    toast({
      title: "Post deleted",
      description: "The post has been deleted"
    });
  };

  const isModerator = post.author === 'admin' || post.author === 'moderator';

  return (
    <Card className="mb-6 hover:shadow-lg transition-shadow relative">
      <ModeratorControls 
        resourceId={post.id} 
        resourceType={resourceType} 
        communitySlug={communitySlug}
        onDelete={handleDelete}
        authorUsername={post.author}
        postTitle={post.title}
      />
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
            <CardDescription className="text-sm mb-2">
              Posted by{" "}
              <Link to={`/users/${post.author}`} className="hover:underline">
                {post.author}
              </Link>{" "}
              {isModerator && (
                <Badge variant="secondary" className="ml-1">
                  Mod
                </Badge>
              )}
              • {format(post.timestamp, 'MMM d, yyyy')}
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
              {post.upvotes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center" 
              onClick={handleDownvote}
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
              {post.downvotes}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {post.imageUrl && (
          <div className="mb-4">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-auto max-h-80 object-cover rounded-md"
            />
          </div>
        )}
        
        <p className="mb-4">{post.description}</p>
        
        {showComments && post.comments.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-3">Comments:</h4>
            <div className="space-y-3">
              {post.comments.map(comment => (
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
          {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
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

export default ForumCard;
