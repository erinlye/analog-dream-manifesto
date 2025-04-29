
import { Project, ProjectComment } from "./types";

// Sample initial projects
const initialProjects: Project[] = [
  {
    id: "1",
    title: "Analog Journal Club",
    description: "A monthly meetup where we journal together using different analog techniques. We share supplies, ideas, and inspiration.",
    author: "peaceful_notebook",
    timestamp: Date.now() - 86400000 * 7, // 7 days ago
    upvotes: 24,
    downvotes: 2,
    imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format",
    comments: [
      {
        id: "c1",
        author: "vintage_typewriter",
        content: "I'd love to join! Do you have a location in mind?",
        timestamp: Date.now() - 86400000 * 6,
      },
      {
        id: "c2",
        author: "paper_crane",
        content: "This is exactly what I've been looking for. Count me in!",
        timestamp: Date.now() - 86400000 * 5,
      }
    ]
  },
  {
    id: "2",
    title: "Digital Detox Weekend",
    description: "An organized weekend retreat where we put away our devices and focus on analog activities like reading, drawing, and board games.",
    author: "quiet_easel",
    timestamp: Date.now() - 86400000 * 3, // 3 days ago
    upvotes: 18,
    downvotes: 0,
    imageUrl: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=500&auto=format",
    comments: [
      {
        id: "c3",
        author: "paper_crane",
        content: "How do we sign up for this? Sounds amazing!",
        timestamp: Date.now() - 86400000 * 2,
      }
    ]
  },
  {
    id: "3",
    title: "Handwritten Letter Exchange",
    description: "A pen pal project where we exchange handwritten letters monthly. Sign up to be matched with another analog enthusiast.",
    author: "vintage_typewriter",
    timestamp: Date.now() - 86400000, // 1 day ago
    upvotes: 12,
    downvotes: 1,
    comments: []
  }
];

// In-memory store of projects
let projects = [...initialProjects];

// Get all projects
export const getAllProjects = (): Project[] => {
  return [...projects].sort((a, b) => b.timestamp - a.timestamp);
};

// Get projects sorted by popularity (upvotes - downvotes)
export const getProjectsByPopularity = (): Project[] => {
  return [...projects].sort((a, b) => 
    (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
  );
};

// Add a new project
export const addProject = (project: Omit<Project, 'id' | 'upvotes' | 'downvotes' | 'comments'>): Project => {
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    upvotes: 0,
    downvotes: 0,
    comments: []
  };
  projects = [newProject, ...projects];
  return newProject;
};

// Add a comment to a project
export const addComment = (projectId: string, comment: Omit<ProjectComment, 'id' | 'timestamp'>): ProjectComment | null => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return null;

  const newComment: ProjectComment = {
    ...comment,
    id: `c${Date.now()}`,
    timestamp: Date.now()
  };

  projects[projectIndex].comments.push(newComment);
  return newComment;
};

// Toggle upvote on a project
export const toggleUpvote = (projectId: string): Project | null => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return null;

  projects[projectIndex].upvotes += 1;
  return projects[projectIndex];
};

// Toggle downvote on a project
export const toggleDownvote = (projectId: string): Project | null => {
  const projectIndex = projects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return null;

  projects[projectIndex].downvotes += 1;
  return projects[projectIndex];
};
