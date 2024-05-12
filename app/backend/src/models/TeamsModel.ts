import { IList } from '../Interfaces/IModels';
import TeamsSequelizeModel from '../database/models/TeamsSequelizeModel';
import ITeams from '../Interfaces/ITeams';

export default class TeamsModel implements IList<ITeams> {
  private model = TeamsSequelizeModel;

  findById(id: number): Promise<ITeams | null> {
    return this.model.findOne({ where: { id } });
  }

  async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();

    return teams.map((team: ITeams) => ({
      id: team.id,
      teamName: team.teamName,
    } as ITeams));
  }
}
