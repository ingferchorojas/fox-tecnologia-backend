import { Schema, model, Document, Types } from "mongoose";

interface IItem {
  name: string;
  price: number;
  qty: number;
}

interface IInvoice {
  razon_social: string;
  ruc: string;
}

interface IOrder extends Document {
  client_id: Types.ObjectId;
  user_id: Types.ObjectId;
  deleted_at: Date;
  items: IItem[];
  payment_method: 'CASH' | 'POS';
  comments: string;
  invoice: IInvoice;
}

const orderSchema = new Schema({
  client_id: { type: Schema.Types.ObjectId, required: true, ref: "Clients" },  
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "Users", index: true }, 
  deleted_at: { type: Date, default: null },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  }],
  payment_method: { type: String, enum: ['CASH', 'POS'], required: true },
  comments: { type: String, default: '' },
  invoice: {
    razon_social: { type: String, required: true },
    ruc: { type: String, required: true },
  },
}, {
  timestamps: true
});

orderSchema.index({ user_id: -1 })

export default model<IOrder>("Orders", orderSchema);
