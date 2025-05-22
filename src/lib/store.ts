
import { ManifestoEntry, Community, LearningPost, ImaginingPost, OrganizingPost, PlugPost } from './types';

// Get manifesto entries from localStorage
export const getManifestoEntries = (): ManifestoEntry[] => {
  try {
    const entries = localStorage.getItem('analog-manifesto');
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error reading manifesto entries:', error);
    return [];
  }
};

// Add a new manifesto entry
export const addManifestoEntry = (content: string): ManifestoEntry => {
  const entries = getManifestoEntries();
  
  const newEntry: ManifestoEntry = {
    id: crypto.randomUUID(),
    content,
    timestamp: Date.now(),
  };
  
  const updatedEntries = [newEntry, ...entries];
  localStorage.setItem('analog-manifesto', JSON.stringify(updatedEntries));
  
  return newEntry;
};

// Initial communities data
const initialCommunities: Community[] = [
  {
    id: '1',
    name: 'Light Phone Users',
    description: 'For users of the minimalist Light Phone who want to reduce screen time without sacrificing connectivity.',
    member_count: 245,
    slug: 'light-phone'
  },
  {
    id: '2',
    name: 'Brick Phone Enthusiasts',
    description: 'Embracing the durability and simplicity of brick phones in a smartphone-dominated world.',
    member_count: 189,
    slug: 'brick-phone'
  },
  {
    id: '3',
    name: 'Flip Phone Users',
    description: 'The satisfying snap of closing your phone after a call - join fellow flip phone enthusiasts.',
    member_count: 216,
    slug: 'flip-phone'
  }
];

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

// Get all learning posts from localStorage
export const getAllLearningPosts = (): LearningPost[] => {
  try {
    const posts = localStorage.getItem('analog-learning-posts');
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error reading learning posts:', error);
    return [];
  }
};

// Get all imagining posts from localStorage
export const getAllImaginingPosts = (): ImaginingPost[] => {
  try {
    const posts = localStorage.getItem('analog-imagining-posts');
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error reading imagining posts:', error);
    return [];
  }
};

// Get all organizing posts from localStorage
export const getAllOrganizingPosts = (): OrganizingPost[] => {
  try {
    const posts = localStorage.getItem('analog-organizing-posts');
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error reading organizing posts:', error);
    return [];
  }
};

// Get all plug posts from localStorage
export const getAllPlugPosts = (): PlugPost[] => {
  try {
    const posts = localStorage.getItem('analog-plug-posts');
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error reading plug posts:', error);
    return [];
  }
};
