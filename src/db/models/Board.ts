import { Schema, model, Document } from 'mongoose';

export interface IBoard extends Document {
  id: string;
  title: string;
  background?: string;
  createdAt: Date;
  updatedAt: Date;
}

const boardSchema = new Schema<IBoard>(
  {
    title: { type: String, required: true, trim: true },
    background: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Board = model<IBoard>('Board', boardSchema);
