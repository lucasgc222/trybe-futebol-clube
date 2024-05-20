import { Request, Response } from 'express';
import { statusHTTP } from '../utils/statusHandler';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async home(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.home();
    return res.status(statusHTTP(status)).json(data);
  }

  async away(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.away();
    return res.status(statusHTTP(status)).json(data);
  }
}
