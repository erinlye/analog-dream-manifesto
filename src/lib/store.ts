
import { ManifestoEntry, Community } from './types';

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
    memberCount: 245,
    slug: 'light-phone'
  },
  {
    id: '2',
    name: 'Brick Phone Enthusiasts',
    description: 'Embracing the durability and simplicity of brick phones in a smartphone-dominated world.',
    memberCount: 189,
    slug: 'brick-phone'
  },
  {
    id: '3',
    name: 'Flip Phone Users',
    description: 'The satisfying snap of closing your phone after a call - join fellow flip phone enthusiasts.',
    memberCount: 216,
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
