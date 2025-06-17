import { Request, Response, NextFunction } from 'express';
import HttpError from '../helpers/HttpError';
import { Board } from '../db/models/Board';

export const searchBoards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string')
      throw new HttpError(400, 'Query parameter "q" is required');
    const filter = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { _id: q.match(/^[0-9a-fA-F]{24}$/) ? q : null },
      ].filter(Boolean),
    };
    const boards = await Board.find(filter as any);
    res.json(boards);
  } catch (err) {
    next(err);
  }
};

export const getAllBoards = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    next(err);
  }
};

export const getBoardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) throw new HttpError(404, 'Board not found');
    res.json(board);
  } catch (err) {
    next(err);
  }
};

export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const board = new Board(req.body);
    const saved = await board.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const updateBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!board) throw new HttpError(404, 'Board not found');
    res.json(board);
  } catch (err) {
    next(err);
  }
};

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Board.findByIdAndDelete(req.params.id);
    if (!result) throw new HttpError(404, 'Board not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
