
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { isLoggedInAsModerator } from '../lib/moderatorStore';

interface Post {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  comments: any[];
  imageUrl?: string;
}

interface PostHistoryListProps {
  title: string;
  posts: Post[];
  type: 'learning' | 'imagining' | 'organizing' | 'plugs';
  showAllLink?: boolean;
}

const PostHistoryList: React.FC<PostHistoryListProps> = ({ 
  title, 
  posts, 
  type,
  showAllLink = true 
}) => {
  const linkPath = `/${type}`;
  const isModerator = isLoggedInAsModerator();
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-serif">{title}</h2>
        {showAllLink && (
          <Button variant="ghost" size="sm" asChild>
            <Link to={linkPath}>View All {title}</Link>
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {posts.slice(0, 5).map(post => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>
                Posted by <Link to={`/users/${post.author}`} className="hover:underline">
                  {post.author}
                </Link>
                {(post.author === 'admin' || post.author === 'moderator') && (
                  <Badge variant="secondary" className="ml-2">Mod</Badge>
                )} • 
                {format(post.timestamp, 'MMM d, yyyy')} • 
                {post.upvotes - post.downvotes} points • {post.comments.length} comments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">{post.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {posts.length > 5 && (
        <div className="text-center mt-4">
          <Button variant="outline" size="sm">View More Posts</Button>
        </div>
      )}
    </div>
  );
};

export default PostHistoryList;
