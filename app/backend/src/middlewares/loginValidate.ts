import { Request, Response, NextFunction } from 'express';
import loginSchema from '../utils/schemas';

async function loginValidate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void > {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const [{ type }] = error.details;
    if (type === 'string.min' || type === 'string.email') {
      return res.status(401)
        .json({ message: error.message });
    }

    return res.status(400).json({ message: error.message });
  }

  next();
}

export default loginValidate;
