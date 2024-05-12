import { Request, Response } from 'express';
import { TeamsService } from '../services/index';
import { statusHTTP } from '../utils/statusHandler';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  async getAll(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAll();
    return res.status(statusHTTP(status)).json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.getById(Number(id));
    return res.status(statusHTTP(status)).json(data);
  }
}
