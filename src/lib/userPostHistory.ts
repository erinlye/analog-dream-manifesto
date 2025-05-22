
import { 
  getAllLearningPosts as getLearningPosts,
  getAllImaginingPosts as getImaginingPosts, 
  getAllOrganizingPosts as getOrganizingPosts,  
  getAllPlugPosts as getPlugPosts 
} from './store';

import { 
  LearningPost, 
  ImaginingPost, 
  OrganizingPost, 
  PlugPost 
} from './types';

// Export functions to get posts from all forums
export const getAllLearningPosts = (): LearningPost[] => {
  return getLearningPosts();
};

export const getAllImaginingPosts = (): ImaginingPost[] => {
  return getImaginingPosts();
};

export const getAllOrganizingPosts = (): OrganizingPost[] => {
  return getOrganizingPosts();
};

export const getAllPlugPosts = (): PlugPost[] => {
  return getPlugPosts();
};

// Get all user posts across all forums
export const getUserPostHistory = (username: string) => {
  const learningPosts = getLearningPosts().filter(post => post.author === username);
  const imaginingPosts = getImaginingPosts().filter(post => post.author === username);
  const organizingPosts = getOrganizingPosts().filter(post => post.author === username);
  const plugPosts = getPlugPosts().filter(post => post.author === username);
  
  return {
    learningPosts,
    imaginingPosts,
    organizingPosts,
    plugPosts,
    totalPosts: learningPosts.length + imaginingPosts.length + organizingPosts.length + plugPosts.length
  };
};
