import { Request, Response, NextFunction } from 'express';
import { createMatchSchema } from '../utils/schemas';

async function createMatchValidate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void > {
  const { error } = createMatchSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  next();
}

export default createMatchValidate;
