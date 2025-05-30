
import { PlugPost, PlugComment } from "./types";

// Sample initial plug posts
const initialPlugPosts: PlugPost[] = [
  {
    id: "1",
    title: "Analog Art Exhibition - Next Weekend",
    description: "I'm hosting an exhibition of analog photography and hand-drawn illustrations this weekend at the community center. Everyone is welcome!",
    author: "art_curator",
    timestamp: Date.now() - 86400000 * 2, // 2 days ago
    upvotes: 16,
    downvotes: 0,
    imageUrl: "https://images.unsplash.com/photo-1594104316830-8846431343c3?w=500&auto=format",
    comments: [
      {
        id: "c1",
        author: "photography_lover",
        content: "What are the hours? I'd love to stop by on Saturday!",
        timestamp: Date.now() - 86400000 * 1,
      },
      {
        id: "c2",
        author: "local_sketcher",
        content: "Are you still accepting submissions? I have some pencil sketches I'd like to share.",
        timestamp: Date.now() - 86400000 * 0.5,
      }
    ]
  },
  {
    id: "2",
    title: "Just Published: 'Disconnect to Reconnect' - A Guide to Digital Minimalism",
    description: "After three years of research and writing, my book on finding balance in the digital age is finally published! It includes practical exercises for building healthier tech habits.",
    author: "mindful_writer",
    timestamp: Date.now() - 86400000 * 5, // 5 days ago
    upvotes: 12,
    downvotes: 1,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format",
    comments: [
      {
        id: "c3",
        author: "avid_reader",
        content: "Just ordered my copy! Looking forward to the chapter on creating tech-free zones at home.",
        timestamp: Date.now() - 86400000 * 3,
      }
    ]
  }
];

// In-memory store of plug posts
let plugPosts = [...initialPlugPosts];

// Get all plug posts
export const getAllPlugPosts = async (): Promise<PlugPost[]> => {
  return [...plugPosts].sort((a, b) => b.timestamp - a.timestamp);
};

// Get plug posts sorted by popularity (upvotes - downvotes)
export const getPlugPostsByPopularity = async (): Promise<PlugPost[]> => {
  return [...plugPosts].sort((a, b) => 
    (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
  );
};

// Add a new plug post
export const addPlugPost = async (post: Omit<PlugPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): Promise<PlugPost> => {
  const newPost: PlugPost = {
    ...post,
    id: Date.now().toString(),
    upvotes: 0,
    downvotes: 0,
    comments: []
  };
  plugPosts = [newPost, ...plugPosts];
  return newPost;
};

// Delete a plug post
export const deletePlugPost = async (postId: string): Promise<boolean> => {
  const initialLength = plugPosts.length;
  plugPosts = plugPosts.filter(p => p.id !== postId);
  return plugPosts.length < initialLength;
};

// Add a comment to a plug post
export const addPlugComment = async (postId: string, comment: Omit<PlugComment, 'id' | 'timestamp'>): Promise<void> => {
  const postIndex = plugPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return;

  const newComment: PlugComment = {
    ...comment,
    id: `c${Date.now()}`,
    timestamp: Date.now()
  };

  plugPosts[postIndex].comments.push(newComment);
};

// Toggle upvote on a plug post
export const togglePlugUpvote = async (postId: string): Promise<void> => {
  const postIndex = plugPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return;

  plugPosts[postIndex].upvotes += 1;
};

// Toggle downvote on a plug post
export const togglePlugDownvote = async (postId: string): Promise<void> => {
  const postIndex = plugPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return;

  plugPosts[postIndex].downvotes += 1;
};
