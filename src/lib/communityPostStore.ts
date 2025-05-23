
import { v4 as uuidv4 } from 'uuid';
import { CommunityPost, CommunityComment } from './types';

// In-memory storage for community posts
let communityPosts: CommunityPost[] = [];

// Initialize posts from localStorage if available
if (typeof window !== 'undefined') {
  communityPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
}

// Save posts to localStorage
const savePosts = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('communityPosts', JSON.stringify(communityPosts));
  }
};

// Get all posts for a specific community
export const getCommunityPosts = (communityId: string): CommunityPost[] => {
  return communityPosts.filter(post => post.communityId === communityId)
    .sort((a, b) => b.timestamp - a.timestamp);
};

// Get a specific post by ID
export const getCommunityPostById = (postId: string): CommunityPost | undefined => {
  return communityPosts.find(post => post.id === postId);
};

// Add a new post
export const addCommunityPost = (post: Omit<CommunityPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): CommunityPost => {
  const newPost: CommunityPost = {
    id: uuidv4(),
    ...post,
    upvotes: 0,
    downvotes: 0,
    comments: []
  };
  
  communityPosts = [newPost, ...communityPosts];
  savePosts();
  return newPost;
};

// Delete a post
export const deleteCommunityPost = (postId: string): void => {
  communityPosts = communityPosts.filter(post => post.id !== postId);
  savePosts();
};

// Add a comment to a post
export const addCommunityComment = (postId: string, comment: Omit<CommunityComment, 'id' | 'timestamp'>): void => {
  const post = communityPosts.find(p => p.id === postId);
  
  if (post) {
    const newComment: CommunityComment = {
      id: uuidv4(),
      ...comment,
      timestamp: Date.now()
    };
    
    post.comments.push(newComment);
    savePosts();
  }
};

// Toggle upvote on a post
export const toggleCommunityUpvote = (postId: string): void => {
  const post = communityPosts.find(p => p.id === postId);
  
  if (post) {
    post.upvotes += 1;
    savePosts();
  }
};

// Toggle downvote on a post
export const toggleCommunityDownvote = (postId: string): void => {
  const post = communityPosts.find(p => p.id === postId);
  
  if (post) {
    post.downvotes += 1;
    savePosts();
  }
};

// Get posts sorted by popularity (upvotes - downvotes)
export const getCommunityPostsByPopularity = (communityId: string): CommunityPost[] => {
  return [...communityPosts]
    .filter(post => post.communityId === communityId)
    .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
};
