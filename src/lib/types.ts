
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
