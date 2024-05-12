import { Request, Response, Router } from 'express';
import updateInProgressValidate from '../middlewares/updateInProgressValidate';
import authValidate from '../middlewares/authValidate';
import { MatchesController } from '../controllers';
import createMatchValidate from '../middlewares/createMatchValidate';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/matches', (req: Request, res: Response) => matchesController.getAll(req, res));
matchesRouter.patch(
  '/matches/:id/finish',
  authValidate,
  (req: Request, res: Response) => matchesController.updateMatchStatus(req, res),
);
matchesRouter.patch(
  '/matches/:id',
  authValidate,
  updateInProgressValidate,
  (req: Request, res: Response) => matchesController.updateTeamGoals(req, res),
);
matchesRouter.post(
  '/matches',
  authValidate,
  createMatchValidate,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default matchesRouter;
