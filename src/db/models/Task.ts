import { Schema, model, Document, Types } from 'mongoose';

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface ITask extends Document {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  board: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'done'],
      default: 'todo',
    },
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  },
  {
    timestamps: true,
  }
);

export const Task = model<ITask>('Task', taskSchema);
