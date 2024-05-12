import { Request, Response, NextFunction } from 'express';
import { updateInProgressSchema } from '../utils/schemas';

async function updateInProgressValidate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void > {
  const { error } = updateInProgressSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  next();
}

export default updateInProgressValidate;
