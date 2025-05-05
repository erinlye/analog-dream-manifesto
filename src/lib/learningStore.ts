import { LearningPost, LearningComment } from "./types";

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

// In-memory store of learning posts
let learningPosts = [...initialLearningPosts];

// Get all learning posts
export const getAllLearningPosts = (): LearningPost[] => {
  return [...learningPosts].sort((a, b) => b.timestamp - a.timestamp);
};

// Get learning posts sorted by popularity (upvotes - downvotes)
export const getLearningPostsByPopularity = (): LearningPost[] => {
  return [...learningPosts].sort((a, b) => 
    (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
  );
};

// Add a new learning post
export const addLearningPost = (post: Omit<LearningPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): LearningPost => {
  const newPost: LearningPost = {
    ...post,
    id: Date.now().toString(),
    upvotes: 0,
    downvotes: 0,
    comments: []
  };
  learningPosts = [newPost, ...learningPosts];
  return newPost;
};

// Delete a learning post
export const deleteLearningPost = (postId: string): boolean => {
  const initialLength = learningPosts.length;
  learningPosts = learningPosts.filter(p => p.id !== postId);
  return learningPosts.length < initialLength;
};

// Add a comment to a learning post
export const addLearningComment = (postId: string, comment: Omit<LearningComment, 'id' | 'timestamp'>): LearningComment | null => {
  const postIndex = learningPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  const newComment: LearningComment = {
    ...comment,
    id: `c${Date.now()}`,
    timestamp: Date.now()
  };

  learningPosts[postIndex].comments.push(newComment);
  return newComment;
};

// Toggle upvote on a learning post
export const toggleLearningUpvote = (postId: string): LearningPost | null => {
  const postIndex = learningPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  learningPosts[postIndex].upvotes += 1;
  return learningPosts[postIndex];
};

// Toggle downvote on a learning post
export const toggleLearningDownvote = (postId: string): LearningPost | null => {
  const postIndex = learningPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  learningPosts[postIndex].downvotes += 1;
  return learningPosts[postIndex];
};
