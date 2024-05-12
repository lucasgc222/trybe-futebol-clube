import { Response, NextFunction } from 'express';
import ICustomRequest from '../Interfaces/ICustomRequest';
import JWT from '../utils/JWT';

async function authValidate(
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void > {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const token = JWT.verifyToken(authorization.split(' ')[1]);

  if (typeof token === 'string') return res.status(401).json({ message: token });

  req.role = token.role;

  next();
}

export default authValidate;
