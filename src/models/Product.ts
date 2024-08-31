import { Schema, model, Document, Types } from "mongoose";

interface IProduct extends Document {
  product_id: number;
  name: string;
  price: number;
  unit_measure: 'kg' | 'unit' | string;
  stock: number;
  user_id: Types.ObjectId;
}

const productSchema = new Schema({
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  unit_measure: { type: String, required: true, enum: ['kg', 'unit'] },
  stock: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users", index: true }
}, {
  timestamps: true
});

productSchema.index({ user_id: -1 })

export default model<IProduct>("Product", productSchema);
