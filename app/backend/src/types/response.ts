import { status } from '../utils/statusHandler';

export type Message = { message: string };

export type TokenResponse = { token: string };

export type ServiceResponse<T> = {
  status: status;
  data: T | T[] | { [key: string]: T };
};
