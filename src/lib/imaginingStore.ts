
import { ImaginingPost, ImaginingComment } from "./types";

// Sample initial imagining posts
const initialImaginingPosts: ImaginingPost[] = [
  {
    id: "1",
    title: "A World Without Smartphones",
    description: "What might our communities look like if smartphones were never invented? How would we communicate and organize?",
    author: "future_thinker",
    timestamp: Date.now() - 86400000 * 4, // 4 days ago
    upvotes: 18,
    downvotes: 1,
    imageUrl: "https://images.unsplash.com/photo-1585241936939-be4099591252?w=500&auto=format",
    comments: [
      {
        id: "c1",
        author: "analog_dreamer",
        content: "I think we'd have more face-to-face interactions and stronger local communities.",
        timestamp: Date.now() - 86400000 * 3,
      },
      {
        id: "c2",
        author: "paper_writer",
        content: "Letters would still be a major form of communication. I miss getting handwritten letters.",
        timestamp: Date.now() - 86400000 * 2,
      }
    ]
  },
  {
    id: "2",
    title: "Technology That Enhances Rather Than Distracts",
    description: "Let's imagine technology designed to deepen our presence rather than constantly pulling our attention away.",
    author: "mindful_coder",
    timestamp: Date.now() - 86400000 * 2, // 2 days ago
    upvotes: 15,
    downvotes: 0,
    imageUrl: "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=500&auto=format",
    comments: [
      {
        id: "c3",
        author: "slow_tech_enthusiast",
        content: "I envision devices that become 'invisible' when not needed - no notifications, no presence except when summoned.",
        timestamp: Date.now() - 86400000 * 1,
      }
    ]
  }
];

// In-memory store of imagining posts
let imaginingPosts = [...initialImaginingPosts];

// Get all imagining posts
export const getAllImaginingPosts = (): ImaginingPost[] => {
  return [...imaginingPosts].sort((a, b) => b.timestamp - a.timestamp);
};

// Get imagining posts sorted by popularity (upvotes - downvotes)
export const getImaginingPostsByPopularity = (): ImaginingPost[] => {
  return [...imaginingPosts].sort((a, b) => 
    (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
  );
};

// Add a new imagining post
export const addImaginingPost = (post: Omit<ImaginingPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): ImaginingPost => {
  const newPost: ImaginingPost = {
    ...post,
    id: Date.now().toString(),
    upvotes: 0,
    downvotes: 0,
    comments: []
  };
  imaginingPosts = [newPost, ...imaginingPosts];
  return newPost;
};

// Add a comment to an imagining post
export const addImaginingComment = (postId: string, comment: Omit<ImaginingComment, 'id' | 'timestamp'>): ImaginingComment | null => {
  const postIndex = imaginingPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  const newComment: ImaginingComment = {
    ...comment,
    id: `c${Date.now()}`,
    timestamp: Date.now()
  };

  imaginingPosts[postIndex].comments.push(newComment);
  return newComment;
};

// Toggle upvote on an imagining post
export const toggleImaginingUpvote = (postId: string): ImaginingPost | null => {
  const postIndex = imaginingPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  imaginingPosts[postIndex].upvotes += 1;
  return imaginingPosts[postIndex];
};

// Toggle downvote on an imagining post
export const toggleImaginingDownvote = (postId: string): ImaginingPost | null => {
  const postIndex = imaginingPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  imaginingPosts[postIndex].downvotes += 1;
  return imaginingPosts[postIndex];
};
