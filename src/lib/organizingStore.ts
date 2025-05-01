
import { OrganizingPost, OrganizingComment } from "./types";

// Sample initial organizing posts
const initialOrganizingPosts: OrganizingPost[] = [
  {
    id: "1",
    title: "Library Technology Awareness Campaign",
    description: "Let's organize an awareness campaign about the importance of public libraries in providing tech access to underserved communities.",
    author: "library_advocate",
    timestamp: Date.now() - 86400000 * 6, // 6 days ago
    upvotes: 21,
    downvotes: 1,
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&auto=format",
    comments: [
      {
        id: "c1",
        author: "community_builder",
        content: "I work at a local library and would love to help organize this. We already have some programs in place.",
        timestamp: Date.now() - 86400000 * 5,
      },
      {
        id: "c2",
        author: "digital_rights_advocate",
        content: "We should also highlight how libraries promote digital literacy while respecting privacy.",
        timestamp: Date.now() - 86400000 * 4,
      }
    ]
  },
  {
    id: "2",
    title: "Tech-Free Community Dinners",
    description: "Let's organize monthly community dinners where all devices are checked at the door. A chance to connect without screens.",
    author: "dinner_host",
    timestamp: Date.now() - 86400000 * 3, // 3 days ago
    upvotes: 14,
    downvotes: 2,
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format",
    comments: [
      {
        id: "c3",
        author: "local_chef",
        content: "I'd be happy to volunteer my restaurant space for this once a month on Sundays when we're closed.",
        timestamp: Date.now() - 86400000 * 2,
      }
    ]
  }
];

// In-memory store of organizing posts
let organizingPosts = [...initialOrganizingPosts];

// Get all organizing posts
export const getAllOrganizingPosts = (): OrganizingPost[] => {
  return [...organizingPosts].sort((a, b) => b.timestamp - a.timestamp);
};

// Get organizing posts sorted by popularity (upvotes - downvotes)
export const getOrganizingPostsByPopularity = (): OrganizingPost[] => {
  return [...organizingPosts].sort((a, b) => 
    (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
  );
};

// Add a new organizing post
export const addOrganizingPost = (post: Omit<OrganizingPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): OrganizingPost => {
  const newPost: OrganizingPost = {
    ...post,
    id: Date.now().toString(),
    upvotes: 0,
    downvotes: 0,
    comments: []
  };
  organizingPosts = [newPost, ...organizingPosts];
  return newPost;
};

// Add a comment to an organizing post
export const addOrganizingComment = (postId: string, comment: Omit<OrganizingComment, 'id' | 'timestamp'>): OrganizingComment | null => {
  const postIndex = organizingPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  const newComment: OrganizingComment = {
    ...comment,
    id: `c${Date.now()}`,
    timestamp: Date.now()
  };

  organizingPosts[postIndex].comments.push(newComment);
  return newComment;
};

// Toggle upvote on an organizing post
export const toggleOrganizingUpvote = (postId: string): OrganizingPost | null => {
  const postIndex = organizingPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  organizingPosts[postIndex].upvotes += 1;
  return organizingPosts[postIndex];
};

// Toggle downvote on an organizing post
export const toggleOrganizingDownvote = (postId: string): OrganizingPost | null => {
  const postIndex = organizingPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  organizingPosts[postIndex].downvotes += 1;
  return organizingPosts[postIndex];
};
