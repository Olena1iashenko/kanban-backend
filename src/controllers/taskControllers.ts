import { Request, Response, NextFunction } from 'express';
import HttpError from '../helpers/HttpError';
import { Task } from '../db/models/Task';

export const getTasksByBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw new HttpError(404, 'Task not found');
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = new Task({ ...req.body, board: req.params.boardId });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) throw new HttpError(404, 'Task not found');
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) throw new HttpError(404, 'Task not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
