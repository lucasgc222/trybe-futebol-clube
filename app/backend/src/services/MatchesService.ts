import TeamsModel from '../models';
import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../types/response';
import IMatches,
{ ICreationMatch,
  IMatcheModels,
  IUpdateTeamGoals,
  UpdateMatchStatus,
} from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(private matchesModel: IMatcheModels = new MatchesModel()) {}

  async getAll(): Promise<ServiceResponse<IMatches>> {
    const teams = await this.matchesModel.findAll();
    return { status: 'successful', data: teams };
  }

  async findAllWithQuery(inProgress: boolean): Promise<ServiceResponse<IMatches>> {
    const teams = await this.matchesModel.findAllWithQuery(inProgress);
    return { status: 'successful', data: teams };
  }

  async updateMatchStatus(id: number): Promise<ServiceResponse<string>> {
    const match = await this.matchesModel.findById(id);
    if (!match) return { status: 'notFound', data: { message: 'Partida não encontrada' } };

    const update: UpdateMatchStatus = { inProgress: false, id };
    const isUpdated = await this.matchesModel.updateStatus(update);

    if (isUpdated <= 0) return { status: 'conflict', data: { message: 'Partida já atualizada' } };

    return { status: 'successful', data: { message: 'Finished' } };
  }

  async updateTeamGoals(data: IUpdateTeamGoals): Promise<ServiceResponse<string>> {
    const { id } = data;
    const match = await this.matchesModel.findById(id);

    if (!match || match.inProgress === false) {
      return { status: 'badRequest', data: { message: 'Partida inválida' } };
    }

    await this.matchesModel.updateTeamGoals(data);

    return { status: 'successful', data: { message: 'Finished' } };
  }

  async createMatch(data: ICreationMatch): Promise<ServiceResponse<IMatches | string>> {
    const { homeTeamId, awayTeamId } = data;

    if (homeTeamId === awayTeamId) {
      return {
        status: 'unprocEntity',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const teamModel = new TeamsModel();
    const homeTeam = await teamModel.findById(homeTeamId);
    const awayTeam = await teamModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'notFound',
        data: { message: 'There is no team with such id!' } };
    }

    const match = await this.matchesModel.create(data);
    return { status: 'created', data: match };
  }
}
