import { Request, Response, Router } from 'express';
import { TeamsController } from '../controllers';

const teamsController = new TeamsController();
const teamRouter = Router();

teamRouter.get('/teams', (req: Request, res: Response) => teamsController.getAll(req, res));
teamRouter.get('/teams/:id', (req: Request, res: Response) => teamsController.getById(req, res));

export default teamRouter;
