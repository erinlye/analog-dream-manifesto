
export interface ManifestoEntry {
  id: string;
  content: string;
  timestamp: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  slug: string;
}

export interface ProjectComment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  comments: ProjectComment[];
  imageUrl?: string; // Optional image URL for the project
}
