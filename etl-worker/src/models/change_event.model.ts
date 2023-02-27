/* eslint-disable prettier/prettier */
import { Document, Schema, model } from 'mongoose';

export const ChangeEventHistorySchema = new Schema({
  id: String,
  table_ref: Object,
  ref_id: String,
  prev_value: Object,
  updated_value: Object,
  enabled: { type: Boolean, default: true },
}, {
	timestamps: true,
	collection: 'change_event_histories',
});

export interface ChangeEventHistory extends Document {
  id: string;
  table_ref: Object;
  ref_id: string;
  prev_value: Object;
  updated_value: Object;
  enabled: boolean;
}

const ChangeEventHistoryModel = model<ChangeEventHistory>('ChangeEventHistory', ChangeEventHistorySchema);
export default ChangeEventHistoryModel;
