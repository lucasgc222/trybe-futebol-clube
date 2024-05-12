import { Request } from 'express';

interface ICustomRequest extends Request {
  role?: string;
}

export default ICustomRequest;
