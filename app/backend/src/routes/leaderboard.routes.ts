import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderboardController.home(req, res),
);

leaderboardRouter.get(
  '/leaderboard/away',
  (req: Request, res: Response) => leaderboardController.away(req, res),
);

export default leaderboardRouter;
