import * as joi from 'joi';
import { Login } from '../types/Login';

const requiredMessage = 'All fields must be filled';
const invalidMessage = 'Invalid email or password';

const loginSchema = joi.object<Login>({
  email: joi.string().email().empty('').required(),
  password: joi.string().min(6).empty('').required(),
}).messages({
  'any.required': requiredMessage,
  'string.min': invalidMessage,
  'string.email': invalidMessage,
  'any.empty': requiredMessage,
});

const updateInProgressSchema = joi.object({
  homeTeamGoals: joi.number().greater(-1).integer().required(),
  awayTeamGoals: joi.number().greater(-1).integer().required(),
});

const createMatchSchema = joi.object({
  homeTeamId: joi.number().greater(0).integer().required(),
  awayTeamId: joi.number().greater(0).integer().required(),
  homeTeamGoals: joi.number().greater(-1).integer().required(),
  awayTeamGoals: joi.number().greater(-1).integer().required(),
});

export default loginSchema;

export { updateInProgressSchema, createMatchSchema };
