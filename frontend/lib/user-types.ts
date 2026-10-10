export interface Profile {
  user_id: string;
  email?: string;
  display_name?: string;
  age_bucket?: string;
  gender?: string;
  occupation?: string;
  location_region?: string;
  location_country?: string;
  interest_text?: string;
  top_categories?: string[];
  affect_consent?: boolean;
  onboarding_completed?: boolean;
  articles_read?: number;
  total_positive_interactions?: number;
  mood?: string;
  avg_dwell_time?: number;
  interests?: Record<string, number>;
  has_bio_embedding?: boolean;
  bio_embedding_version?: string;
  recent_clicks: any[];
  recent_negative_actions: any[];
  recent_searches: any[];
  recent_feedback: any[];
  recent_entities: any[];
  recent_sources: any[];
}

export interface HistoryResponse {
  recent_clicks: any[];
  recent_negative_actions: any[];
  feedback: any[];
}

export interface SearchesResponse {
  searches: any[];
}
