import { Schema, model, Document } from "mongoose";

interface IClient extends Document {
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  username: string;
}

const clientSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  username: { type: String, required: true }
});

export default model<IClient>("Clients", clientSchema);
