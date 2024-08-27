import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  deleted_at?: Date | null;
}

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    phone: { type: String },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }  // Activar timestamps automáticos
);

export default model<IUser>("Users", userSchema);
