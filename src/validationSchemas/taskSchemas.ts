import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid('todo', 'in_progress', 'done').optional(),
  board: Joi.string().hex().length(24).required(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid('todo', 'in_progress', 'done').optional(),
});
