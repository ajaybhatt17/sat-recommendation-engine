export type AssessEvent = {
  user_id: string;
  entity_type: string;
  entity_id: string;
  duration: number;
  max_score: number;
  score: number;
  concepts: string[];
};
