import { Router } from 'express';
import * as boardCtrl from '../controllers/boardControllers';
import isValidId from '../middlewares/isValidId';
import validateBody from '../helpers/validateBody';
import {
  createBoardSchema,
  updateBoardSchema,
} from '../validationSchemas/boardSchemas';
import isEmptyBody from '../middlewares/isEmptyBody';

const boardRouter = Router();

boardRouter.get('/boards/search', boardCtrl.searchBoards);

boardRouter.get('/boards', boardCtrl.getAllBoards);

boardRouter.get('/boards/:id', isValidId, boardCtrl.getBoardById);

boardRouter.post(
  '/boards',
  validateBody(createBoardSchema),
  boardCtrl.createBoard
);

boardRouter.put(
  '/boards/:id',
  isValidId,
  isEmptyBody,
  validateBody(updateBoardSchema),
  boardCtrl.updateBoard
);

boardRouter.delete('/boards/:id', isValidId, boardCtrl.deleteBoard);

export default boardRouter;
