import { Schema, model, Document, Types } from "mongoose";

interface IClient extends Document {
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  user_id: Types.ObjectId;  // Agregado user_id
  deleted_at: Date;
}

const clientSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users"},
  deleted_at: { type: Date, default: null }
}, {
  timestamps: true
});

clientSchema.index({ user_id: -1 });

export default model<IClient>("Clients", clientSchema);
