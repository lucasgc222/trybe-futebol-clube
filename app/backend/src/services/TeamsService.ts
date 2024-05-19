import { ServiceResponse, Message } from '../types/response';
import { IList } from '../Interfaces/IModels';
import ITeams from '../Interfaces/ITeams';
import { TeamsModel } from '../models';

export default class TeamsService {
  constructor(private teamsModel: IList<ITeams> = new TeamsModel()) {}

  async getAll(): Promise<ServiceResponse<ITeams>> {
    const teams = await this.teamsModel.findAll();
    return { status: 'successful', data: teams };
  }

  async getById(id: number): Promise<ServiceResponse<ITeams | Message>> {
    const team = await this.teamsModel.findById(id);
    if (!team) {
      return { status: 'notFound', data: { message: 'Time não encontrado' } };
    }
    return { status: 'successful', data: team };
  }
}
