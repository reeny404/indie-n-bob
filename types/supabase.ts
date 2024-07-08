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
      concert_likes: {
        Row: {
          created_at: string
          like_id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          like_id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          like_id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concert_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "concert_posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "concert_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      concert_posts: {
        Row: {
          author_id: string | null
          author_nickname: string | null
          content: string | null
          created_at: string
          end_date: string | null
          image: string | null
          post_id: number
          region: string | null
          start_date: string | null
          title: string | null
        }
        Insert: {
          author_id?: string | null
          author_nickname?: string | null
          content?: string | null
          created_at?: string
          end_date?: string | null
          image?: string | null
          post_id?: number
          region?: string | null
          start_date?: string | null
          title?: string | null
        }
        Update: {
          author_id?: string | null
          author_nickname?: string | null
          content?: string | null
          created_at?: string
          end_date?: string | null
          image?: string | null
          post_id?: number
          region?: string | null
          start_date?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concert_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      concert_report: {
        Row: {
          created_at: string
          post_id: number | null
          report_id: number
          reporter_id: string | null
        }
        Insert: {
          created_at?: string
          post_id?: number | null
          report_id: number
          reporter_id?: string | null
        }
        Update: {
          created_at?: string
          post_id?: number | null
          report_id?: number
          reporter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conert_report_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "concert_posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "conert_report_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendation_comments: {
        Row: {
          author_id: string | null
          author_nickname: string | null
          comment_id: number
          content: string | null
          created_at: string
          post_id: number | null
        }
        Insert: {
          author_id?: string | null
          author_nickname?: string | null
          comment_id?: number
          content?: string | null
          created_at?: string
          post_id?: number | null
        }
        Update: {
          author_id?: string | null
          author_nickname?: string | null
          comment_id?: number
          content?: string | null
          created_at?: string
          post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "recommendation_posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      recommendation_likes: {
        Row: {
          created_at: string | null
          liked_user_id: string | null
          post_id: number | null
          recommendation_id: number
        }
        Insert: {
          created_at?: string | null
          liked_user_id?: string | null
          post_id?: number | null
          recommendation_id?: number
        }
        Update: {
          created_at?: string | null
          liked_user_id?: string | null
          post_id?: number | null
          recommendation_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_likes_liked_user_id_fkey"
            columns: ["liked_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "recommendation_posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      recommendation_posts: {
        Row: {
          author_id: string | null
          author_nickname: string | null
          content: string | null
          created_at: string
          hashtag: Json | null
          image: string | null
          post_id: number
          title: string | null
        }
        Insert: {
          author_id?: string | null
          author_nickname?: string | null
          content?: string | null
          created_at?: string
          hashtag?: Json | null
          image?: string | null
          post_id?: number
          title?: string | null
        }
        Update: {
          author_id?: string | null
          author_nickname?: string | null
          content?: string | null
          created_at?: string
          hashtag?: Json | null
          image?: string | null
          post_id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          favorite_artist: Json | null
          is_admin: boolean | null
          nickname: string | null
          profile_image: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          favorite_artist?: Json | null
          is_admin?: boolean | null
          nickname?: string | null
          profile_image?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          favorite_artist?: Json | null
          is_admin?: boolean | null
          nickname?: string | null
          profile_image?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
