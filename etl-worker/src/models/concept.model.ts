import { Document, Schema, model } from 'mongoose';

export const conceptSchema = new Schema(
  {
    name: String,
    subject_name: String,
    parent_concept_id: String,
    threshold: Number,
    enabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: 'concepts',
  },
);

export interface ConceptInterface extends Document {
  name: string;
  subject_name: string;
  parent_concept_id: string;
  threshold: number;
  enabled: boolean;
}

const ConceptModel = model<ConceptInterface>('Concept', conceptSchema);
export default ConceptModel;
