import { Request, Response } from 'express';
import ICustomRequest from '../Interfaces/ICustomRequest';
import LoginService from '../services/LoginService';
import { statusHTTP } from '../utils/statusHandler';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { status, data } = await this.loginService.login(req.body);
    return res.status(statusHTTP(status)).json(data);
  }

  static getRole(req: ICustomRequest, res: Response) {
    const { status, data } = LoginService.getRole(req.role);
    return res.status(statusHTTP(status)).json(data);
  }
}
