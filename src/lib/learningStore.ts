
import { LearningPost, LearningComment } from "./types";

// Key for localStorage
const LEARNING_POSTS_KEY = 'analog-learning-posts';

// Sample initial learning posts
const initialLearningPosts: LearningPost[] = [
  {
    id: "1",
    title: "Best Analog Note-Taking Systems",
    description: "What analog note-taking systems have worked best for you? I'm looking to move away from digital notes and would love your recommendations.",
    author: "curious_journaler",
    timestamp: Date.now() - 86400000 * 5, // 5 days ago
    upvotes: 15,
    downvotes: 2,
    imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format",
    comments: [
      {
        id: "c1",
        author: "paper_craftsman",
        content: "I've been using the Bullet Journal method for years. It's highly customizable and perfect for analog organization.",
        timestamp: Date.now() - 86400000 * 3,
      },
      {
        id: "c2",
        author: "fountain_pen_lover",
        content: "Cornell note-taking system changed my life. Great for both lectures and reading notes.",
        timestamp: Date.now() - 86400000 * 2,
      }
    ]
  },
  {
    id: "2",
    title: "Fountain Pen Recommendations for Beginners",
    description: "I want to start using fountain pens but don't know where to begin. Any recommendations for a first-time user?",
    author: "digital_convert",
    timestamp: Date.now() - 86400000 * 3, // 3 days ago
    upvotes: 12,
    downvotes: 0,
    imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=500&auto=format",
    comments: [
      {
        id: "c3",
        author: "ink_master",
        content: "The Pilot Metropolitan is a great starter pen. Affordable but writes beautifully.",
        timestamp: Date.now() - 86400000 * 2,
      }
    ]
  }
];

// Initialize localStorage with sample data if empty
const initializeLocalStorage = () => {
  const existingPosts = localStorage.getItem(LEARNING_POSTS_KEY);
  if (!existingPosts) {
    localStorage.setItem(LEARNING_POSTS_KEY, JSON.stringify(initialLearningPosts));
  }
};

// Get all learning posts from localStorage
export const getAllLearningPosts = (): LearningPost[] => {
  initializeLocalStorage();
  try {
    const posts = localStorage.getItem(LEARNING_POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error reading learning posts:', error);
    return [];
  }
};

// Get learning posts sorted by popularity (upvotes - downvotes)
export const getLearningPostsByPopularity = (): LearningPost[] => {
  return getAllLearningPosts().sort((a, b) => 
    (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
  );
};

// Save posts to localStorage
const savePosts = (posts: LearningPost[]) => {
  localStorage.setItem(LEARNING_POSTS_KEY, JSON.stringify(posts));
};

// Add a new learning post
export const addLearningPost = (post: Omit<LearningPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): LearningPost => {
  const posts = getAllLearningPosts();
  const newPost: LearningPost = {
    ...post,
    id: Date.now().toString(),
    upvotes: 0,
    downvotes: 0,
    comments: []
  };
  const updatedPosts = [newPost, ...posts];
  savePosts(updatedPosts);
  return newPost;
};

// Delete a learning post
export const deleteLearningPost = (postId: string): boolean => {
  const posts = getAllLearningPosts();
  const updatedPosts = posts.filter(p => p.id !== postId);
  savePosts(updatedPosts);
  return updatedPosts.length < posts.length;
};

// Add a comment to a learning post
export const addLearningComment = (postId: string, comment: Omit<LearningComment, 'id' | 'timestamp'>): LearningComment | null => {
  const posts = getAllLearningPosts();
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  const newComment: LearningComment = {
    ...comment,
    id: `c${Date.now()}`,
    timestamp: Date.now()
  };

  posts[postIndex].comments.push(newComment);
  savePosts(posts);
  return newComment;
};

// Toggle upvote on a learning post
export const toggleLearningUpvote = (postId: string): LearningPost | null => {
  const posts = getAllLearningPosts();
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  posts[postIndex].upvotes += 1;
  savePosts(posts);
  return posts[postIndex];
};

// Toggle downvote on a learning post
export const toggleLearningDownvote = (postId: string): LearningPost | null => {
  const posts = getAllLearningPosts();
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  posts[postIndex].downvotes += 1;
  savePosts(posts);
  return posts[postIndex];
};
