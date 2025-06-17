import Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().trim().required(),
  background: Joi.string().allow('').optional(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().trim().optional(),
  background: Joi.string().allow('').optional(),
});
