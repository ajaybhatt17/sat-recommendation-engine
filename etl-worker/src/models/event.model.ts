import { Document, Schema, model } from 'mongoose';

export const eventSchema = new Schema(
  {
    user_id: String,
    event_type: String,
    entity_type: String,
    entity_id: String,
    total_duration: Number,
    duration: Number,
    score: Number,
    max_score: Number,
    concepts: [String],
    missing_concepts: [String],
    enabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: 'events',
  },
);

export interface EventInterface extends Document {
  user_id: string;
  event_type: string;
  entity_type: string;
  entity_id: string;
  total_duration: number;
  duration: number;
  score: number;
  max_score: number;
  concepts: string[];
  missing_concepts: string[];
  enabled: boolean;
}

const EventModel = model<EventInterface>('Event', eventSchema);
export default EventModel;
