/* eslint-disable prettier/prettier */
import { Document, Schema, model } from 'mongoose';

export const userConceptSchema = new Schema({
  user_id: String,
  concept_id: String,
  proficiency_score: {type: Number, default: 0},
  confidence_level: {type: Number, default: 0},
  total_correct_responses: {type: Number, default: 0},
  total_wrong_responses: {type: Number, default: 0},
  first_response_timestamp: String,
  last_response_timestamp: String,
  enabled: { type: Boolean, default: true },
}, {
	timestamps: true,
	collection: 'user_concepts',
});

export interface UserConceptInterface extends Document {
  user_id: string;
  concept_id: string;
  proficiency_score: number;
  confidence_level: number;
  total_correct_responses: number;
  total_wrong_responses: number;
  first_response_timestamp: string;
  last_response_timestamp: string;
  enabled: boolean;
}

const UserConceptModel = model<UserConceptInterface>('UserConcept', userConceptSchema);
export default UserConceptModel;
