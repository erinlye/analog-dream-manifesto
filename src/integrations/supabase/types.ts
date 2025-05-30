export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      communities: {
        Row: {
          created_at: string
          created_by: string
          description: string
          id: string
          member_count: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description: string
          id?: string
          member_count?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          member_count?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          author: string
          content: string
          created_at: string
          id: string
          post_id: string
          timestamp: number
        }
        Insert: {
          author: string
          content: string
          created_at?: string
          id?: string
          post_id: string
          timestamp: number
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          timestamp?: number
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_members: {
        Row: {
          community_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          community_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          community_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author: string
          community_id: string
          created_at: string
          description: string
          downvotes: number
          id: string
          image_url: string | null
          timestamp: number
          title: string
          upvotes: number
        }
        Insert: {
          author: string
          community_id: string
          created_at?: string
          description: string
          downvotes?: number
          id?: string
          image_url?: string | null
          timestamp: number
          title: string
          upvotes?: number
        }
        Update: {
          author?: string
          community_id?: string
          created_at?: string
          description?: string
          downvotes?: number
          id?: string
          image_url?: string | null
          timestamp?: number
          title?: string
          upvotes?: number
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      imagining_comments: {
        Row: {
          author: string
          content: string
          created_at: string
          id: string
          post_id: string
          timestamp: number
        }
        Insert: {
          author: string
          content: string
          created_at?: string
          id?: string
          post_id: string
          timestamp: number
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          timestamp?: number
        }
        Relationships: [
          {
            foreignKeyName: "imagining_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "imagining_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      imagining_posts: {
        Row: {
          author: string
          created_at: string
          description: string
          downvotes: number
          id: string
          image_url: string | null
          timestamp: number
          title: string
          upvotes: number
        }
        Insert: {
          author: string
          created_at?: string
          description: string
          downvotes?: number
          id?: string
          image_url?: string | null
          timestamp: number
          title: string
          upvotes?: number
        }
        Update: {
          author?: string
          created_at?: string
          description?: string
          downvotes?: number
          id?: string
          image_url?: string | null
          timestamp?: number
          title?: string
          upvotes?: number
        }
        Relationships: []
      }
      learning_comments: {
        Row: {
          author: string
          content: string
          created_at: string
          id: string
          post_id: string
          timestamp: number
        }
        Insert: {
          author: string
          content: string
          created_at?: string
          id?: string
          post_id: string
          timestamp: number
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          timestamp?: number
        }
        Relationships: [
          {
            foreignKeyName: "learning_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "learning_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_posts: {
        Row: {
          author: string
          created_at: string
          description: string
          downvotes: number
          id: string
          image_url: string | null
          timestamp: number
          title: string
          upvotes: number
        }
        Insert: {
          author: string
          created_at?: string
          description: string
          downvotes?: number
          id?: string
          image_url?: string | null
          timestamp: number
          title: string
          upvotes?: number
        }
        Update: {
          author?: string
          created_at?: string
          description?: string
          downvotes?: number
          id?: string
          image_url?: string | null
          timestamp?: number
          title?: string
          upvotes?: number
        }
        Relationships: []
      }
      manifesto_entries: {
        Row: {
          content: string
          created_at: string
          id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      moderators: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      organizing_comments: {
        Row: {
          author: string
          content: string
          created_at: string
          id: string
          post_id: string
          timestamp: number
        }
        Insert: {
          author: string
          content: string
          created_at?: string
          id?: string
          post_id: string
          timestamp: number
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          timestamp?: number
        }
        Relationships: [
          {
            foreignKeyName: "organizing_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "organizing_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      organizing_posts: {
        Row: {
          author: string
          created_at: string
          description: string
          downvotes: number
          id: string
          image_url: string | null
          timestamp: number
          title: string
          upvotes: number
        }
        Insert: {
          author: string
          created_at?: string
          description: string
          downvotes?: number
          id?: string
          image_url?: string | null
          timestamp: number
          title: string
          upvotes?: number
        }
        Update: {
          author?: string
          created_at?: string
          description?: string
          downvotes?: number
          id?: string
          image_url?: string | null
          timestamp?: number
          title?: string
          upvotes?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          pseudonym: string
        }
        Insert: {
          created_at?: string
          id: string
          pseudonym: string
        }
        Update: {
          created_at?: string
          id?: string
          pseudonym?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_moderator: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
