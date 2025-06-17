import { Router } from 'express';
import * as taskCtrl from '../controllers/taskControllers';
import validateBody from '../helpers/validateBody';
import isEmptyBody from '../middlewares/isEmptyBody';
import isValidId from '../middlewares/isValidId';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validationSchemas/taskSchemas';

const taskRouter = Router();

taskRouter.get('/boards/:boardId/tasks', isValidId, taskCtrl.getTasksByBoard);

taskRouter.get('/tasks/:id', isValidId, taskCtrl.getTaskById);

taskRouter.post(
  '/boards/:boardId/tasks',
  isValidId,
  validateBody(createTaskSchema),
  taskCtrl.createTask
);

taskRouter.put(
  '/tasks/:id',
  isValidId,
  isEmptyBody,
  validateBody(updateTaskSchema),
  taskCtrl.updateTask
);

taskRouter.delete('/tasks/:id', isValidId, taskCtrl.deleteTask);

export default taskRouter;
