export interface ManifestoEntry {
  id: string;
  content: string;
  timestamp: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  slug: string;
  member_count: number;
  created_by?: string;
  created_at?: string;
}

export interface CommunityMember {
  id: string;
  community_id: string;
  user_id: string;
  joined_at: string;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  title: string;
  description: string;
  author: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  comments: CommunityComment[];
  imageUrl?: string;
}

export interface CommunityComment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
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

// Learning forum post types
export interface LearningComment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export interface LearningPost {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  comments: LearningComment[];
  imageUrl?: string;
}

// Imagining forum post types
export interface ImaginingComment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export interface ImaginingPost {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  comments: ImaginingComment[];
  imageUrl?: string;
}

// Organizing forum post types
export interface OrganizingComment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export interface OrganizingPost {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  comments: OrganizingComment[];
  imageUrl?: string;
}

// Plugs forum post types
export interface PlugComment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export interface PlugPost {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  comments: PlugComment[];
  imageUrl?: string;
}
