import { Request, Response, Router } from 'express';
import ICustomRequest from '../Interfaces/ICustomRequest';
import authValidate from '../middlewares/authValidate';
import loginValidate from '../middlewares/loginValidate';
import { LoginController } from '../controllers';

const loginController = new LoginController();
const loginRouter = Router();

loginRouter.post(
  '/login',
  loginValidate,
  (req: Request, res: Response) => loginController.login(req, res),
);

loginRouter.get(
  '/login/role',
  authValidate,
  (req: ICustomRequest, res: Response) => LoginController.getRole(req, res),
);

export default loginRouter;
