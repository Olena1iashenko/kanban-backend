import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import boardRouter from './routes/boardRouter';
import taskRouter from './routes/taskRouter';
import { NextFunction, Request, Response } from 'express';
import HttpError from './helpers/HttpError';
import { env } from './helpers/env';

dotenv.config();

const startServer = async () => {
  const app = express();
  const PORT = env('PORT');

  app.use(cors());
  app.use(express.json());

  app.use('/api', boardRouter);
  app.use('/api', taskRouter);

  app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.log(err);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  });

  app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
  });
};

export default startServer;
