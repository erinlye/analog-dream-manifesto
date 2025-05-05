
import { Community, CommunityPost, CommunityComment, CommunityMember } from './types';

// Initial communities data
const initialCommunities: Community[] = [
  {
    id: '1',
    name: 'Light Phone Users',
    description: 'For users of the Light Phone, designed to be used as little as possible.',
    memberCount: 0,
    slug: 'light-phone'
  },
  {
    id: '2',
    name: 'Brick Phone Enthusiasts',
    description: 'Brick is a physical device that temporarily removes distracting apps and their notifications from your phone.',
    memberCount: 0,
    slug: 'brick-phone'
  },
  {
    id: '3',
    name: 'Flip Phone Users',
    description: 'Not everyone needs a smartphone.',
    memberCount: 0,
    slug: 'flip-phone'
  }
];

// Sample initial posts for communities
const initialCommunityPosts: Record<string, CommunityPost[]> = {
  'light-phone': [
    {
      id: '1',
      communityId: '1',
      title: 'Light Phone II Review',
      description: 'Just got my Light Phone II and wanted to share my thoughts. The e-ink display is amazing for battery life!',
      author: 'minimal_tech',
      timestamp: Date.now() - 86400000 * 5,
      upvotes: 18,
      downvotes: 2,
      comments: [
        {
          id: 'c1',
          author: 'digital_detox',
          content: 'How\'s the texting experience? I heard it can be a bit slow.',
          timestamp: Date.now() - 86400000 * 4
        }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format'
    }
  ],
  'brick-phone': [
    {
      id: '2',
      communityId: '2',
      title: 'Nokia 3310 in 2025',
      description: 'Still using my Nokia 3310 in 2025. Battery lasts a week and it\'s indestructible!',
      author: 'retro_gadgets',
      timestamp: Date.now() - 86400000 * 3,
      upvotes: 24,
      downvotes: 1,
      comments: [],
      imageUrl: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&auto=format'
    }
  ],
  'flip-phone': [
    {
      id: '3',
      communityId: '3',
      title: 'Best Modern Flip Phones',
      description: 'What are your recommendations for modern flip phones that still provide the satisfaction of flipping?',
      author: 'flip_enthusiast',
      timestamp: Date.now() - 86400000 * 2,
      upvotes: 15,
      downvotes: 0,
      comments: [],
    }
  ]
};

// Track joined communities for the current user
let joinedCommunities: string[] = [];

// Get communities
export const getCommunities = (): Community[] => {
  try {
    const communities = localStorage.getItem('analog-communities');
    return communities ? JSON.parse(communities) : initialCommunities;
  } catch (error) {
    console.error('Error reading communities:', error);
    return initialCommunities;
  }
};

// Initialize communities if needed
export const initializeCommunities = () => {
  if (!localStorage.getItem('analog-communities')) {
    localStorage.setItem('analog-communities', JSON.stringify(initialCommunities));
  }
};

// Get community by slug
export const getCommunityBySlug = (slug: string): Community | undefined => {
  const communities = getCommunities();
  return communities.find(community => community.slug === slug);
};

// Get community posts by slug
export const getCommunityPosts = (slug: string): CommunityPost[] => {
  try {
    const storedPosts = localStorage.getItem(`analog-community-posts-${slug}`);
    if (storedPosts) {
      return JSON.parse(storedPosts);
    }
    
    // If no stored posts, use initial data if available
    const defaultPosts = initialCommunityPosts[slug] || [];
    
    // Store the initial posts in localStorage
    localStorage.setItem(`analog-community-posts-${slug}`, JSON.stringify(defaultPosts));
    
    return defaultPosts;
  } catch (error) {
    console.error(`Error reading posts for community ${slug}:`, error);
    return [];
  }
};

// Get community posts by popularity
export const getCommunityPostsByPopularity = (slug: string): CommunityPost[] => {
  const posts = getCommunityPosts(slug);
  return [...posts].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
};

// Add a new community post
export const addCommunityPost = (slug: string, post: Omit<CommunityPost, 'id' | 'upvotes' | 'downvotes' | 'comments'>): CommunityPost => {
  const posts = getCommunityPosts(slug);
  const community = getCommunityBySlug(slug);
  
  const newPost: CommunityPost = {
    ...post,
    id: Date.now().toString(),
    communityId: community?.id || '',
    upvotes: 0,
    downvotes: 0,
    comments: []
  };
  
  const updatedPosts = [newPost, ...posts];
  localStorage.setItem(`analog-community-posts-${slug}`, JSON.stringify(updatedPosts));
  
  return newPost;
};

// Add a comment to a community post
export const addCommunityComment = (slug: string, postId: string, comment: Omit<CommunityComment, 'id' | 'timestamp'>): CommunityComment | null => {
  const posts = getCommunityPosts(slug);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) return null;

  const newComment: CommunityComment = {
    ...comment,
    id: `c${Date.now()}`,
    timestamp: Date.now()
  };

  posts[postIndex].comments.push(newComment);
  localStorage.setItem(`analog-community-posts-${slug}`, JSON.stringify(posts));
  
  return newComment;
};

// Toggle upvote on a community post
export const toggleCommunityUpvote = (slug: string, postId: string): CommunityPost | null => {
  const posts = getCommunityPosts(slug);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) return null;

  posts[postIndex].upvotes += 1;
  localStorage.setItem(`analog-community-posts-${slug}`, JSON.stringify(posts));
  
  return posts[postIndex];
};

// Toggle downvote on a community post
export const toggleCommunityDownvote = (slug: string, postId: string): CommunityPost | null => {
  const posts = getCommunityPosts(slug);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) return null;

  posts[postIndex].downvotes += 1;
  localStorage.setItem(`analog-community-posts-${slug}`, JSON.stringify(posts));
  
  return posts[postIndex];
};

// Check if user is a member of a community
export const isUserMemberOfCommunity = (slug: string): boolean => {
  try {
    const stored = localStorage.getItem('analog-joined-communities');
    joinedCommunities = stored ? JSON.parse(stored) : [];
    return joinedCommunities.includes(slug);
  } catch (error) {
    console.error('Error checking community membership:', error);
    return false;
  }
};

// Join a community
export const joinCommunity = (slug: string): boolean => {
  try {
    const stored = localStorage.getItem('analog-joined-communities');
    joinedCommunities = stored ? JSON.parse(stored) : [];
    
    if (!joinedCommunities.includes(slug)) {
      joinedCommunities.push(slug);
      localStorage.setItem('analog-joined-communities', JSON.stringify(joinedCommunities));
      
      // Update member count
      const communities = getCommunities();
      const communityIndex = communities.findIndex(c => c.slug === slug);
      
      if (communityIndex !== -1) {
        communities[communityIndex].memberCount += 1;
        localStorage.setItem('analog-communities', JSON.stringify(communities));
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error joining community:', error);
    return false;
  }
};

// Leave a community
export const leaveCommunity = (slug: string): boolean => {
  try {
    const stored = localStorage.getItem('analog-joined-communities');
    joinedCommunities = stored ? JSON.parse(stored) : [];
    
    const index = joinedCommunities.indexOf(slug);
    if (index !== -1) {
      joinedCommunities.splice(index, 1);
      localStorage.setItem('analog-joined-communities', JSON.stringify(joinedCommunities));
      
      // Update member count
      const communities = getCommunities();
      const communityIndex = communities.findIndex(c => c.slug === slug);
      
      if (communityIndex !== -1 && communities[communityIndex].memberCount > 0) {
        communities[communityIndex].memberCount -= 1;
        localStorage.setItem('analog-communities', JSON.stringify(communities));
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error leaving community:', error);
    return false;
  }
};
