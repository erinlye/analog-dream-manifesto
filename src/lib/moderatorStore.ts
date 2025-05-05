
// Store for moderator authentication and management
interface Moderator {
  id: string;
  username: string;
  password: string; // In a real app, this would be hashed
}

// Initial moderators (in a real app, these would be in a secure database)
const initialModerators: Moderator[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123' // This is just for demo purposes
  },
  {
    id: '2',
    username: 'moderator',
    password: 'mod123'
  }
];

// Track current logged in moderator
let currentModerator: Moderator | null = null;

// Check if a user is logged in as a moderator
export const isLoggedInAsModerator = (): boolean => {
  try {
    const storedModerator = localStorage.getItem('analog-current-moderator');
    if (storedModerator) {
      currentModerator = JSON.parse(storedModerator);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking moderator status:', error);
    return false;
  }
};

// Login as moderator
export const loginAsModerator = (username: string, password: string): boolean => {
  try {
    const moderator = initialModerators.find(
      m => m.username === username && m.password === password
    );

    if (moderator) {
      // Store moderator info (without password) in localStorage
      const { password: _, ...moderatorInfo } = moderator;
      currentModerator = moderator;
      localStorage.setItem('analog-current-moderator', JSON.stringify(moderatorInfo));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error logging in as moderator:', error);
    return false;
  }
};

// Logout moderator
export const logoutModerator = (): void => {
  try {
    localStorage.removeItem('analog-current-moderator');
    currentModerator = null;
  } catch (error) {
    console.error('Error logging out moderator:', error);
  }
};

// Get current moderator info
export const getCurrentModerator = (): Omit<Moderator, 'password'> | null => {
  try {
    const storedModerator = localStorage.getItem('analog-current-moderator');
    if (storedModerator) {
      return JSON.parse(storedModerator);
    }
    return null;
  } catch (error) {
    console.error('Error getting current moderator:', error);
    return null;
  }
};
