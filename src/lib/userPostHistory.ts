
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

// Store notifications for users when their posts are deleted
const notificationsKey = 'analog-user-notifications';

interface UserNotification {
  id: string;
  userId: string;
  message: string;
  timestamp: number;
  read: boolean;
  postTitle: string;
}

// Get all notifications for a specific user
export const getUserNotifications = (userId: string): UserNotification[] => {
  try {
    const notificationsData = localStorage.getItem(notificationsKey);
    const notifications = notificationsData ? JSON.parse(notificationsData) : [];
    return notifications.filter((notification: UserNotification) => notification.userId === userId);
  } catch (error) {
    console.error('Error getting user notifications:', error);
    return [];
  }
};

// Add a notification for a user when their post is deleted by a moderator
export const addModeratorDeletionNotification = (userId: string, postTitle: string): void => {
  try {
    const notificationsData = localStorage.getItem(notificationsKey);
    const notifications = notificationsData ? JSON.parse(notificationsData) : [];
    
    const newNotification: UserNotification = {
      id: crypto.randomUUID(),
      userId,
      message: `Your post "${postTitle}" was deleted by a moderator for violating community guidelines.`,
      timestamp: Date.now(),
      read: false,
      postTitle
    };
    
    notifications.push(newNotification);
    localStorage.setItem(notificationsKey, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error adding moderator deletion notification:', error);
  }
};

// Mark a notification as read
export const markNotificationAsRead = (notificationId: string): void => {
  try {
    const notificationsData = localStorage.getItem(notificationsKey);
    if (!notificationsData) return;
    
    const notifications = JSON.parse(notificationsData);
    const updatedNotifications = notifications.map((notification: UserNotification) => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    localStorage.setItem(notificationsKey, JSON.stringify(updatedNotifications));
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};
