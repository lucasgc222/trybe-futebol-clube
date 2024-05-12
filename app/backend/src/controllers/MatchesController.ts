import { Request, Response } from 'express';
import { IUpdateTeamGoals } from '../Interfaces/IMatches';
import { statusHTTP } from '../utils/statusHandler';
import { MatchesService } from '../services';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) return this.findAllWithQuery(req, res);

    const { status, data } = await this.matchesService.getAll();
    return res.status(statusHTTP(status)).json(data);
  }

  async findAllWithQuery(req: Request, res: Response) {
    const { status, data } = await this.matchesService
      .findAllWithQuery(req.query.inProgress === 'true');
    return res.status(statusHTTP(status)).json(data);
  }

  async updateMatchStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.updateMatchStatus(Number(id));
    return res.status(statusHTTP(status)).json(data);
  }

  async updateTeamGoals(req: Request, res: Response) {
    const { id } = req.params;
    const update: IUpdateTeamGoals = { id: Number(id), ...req.body };
    const { status, data } = await this.matchesService.updateTeamGoals(update);
    return res.status(statusHTTP(status)).json(data);
  }

  async createMatch(req: Request, res: Response) {
    const { status, data } = await this.matchesService.createMatch(req.body);
    return res.status(statusHTTP(status)).json(data);
  }
}
