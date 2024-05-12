import TeamsSequelizeModel from '../database/models/TeamsSequelizeModel';
import IMatches,
{ ICreationMatch,
  IMatcheModels,
  IUpdateTeamGoals,
  UpdateMatchStatus,
} from '../Interfaces/IMatches';
import MatchesSequelizeModel from '../database/models/MatchesSequelizeModel';

export default class MatchesModel implements IMatcheModels {
  private model = MatchesSequelizeModel;
  private roles = {
    include: [
      {
        model: TeamsSequelizeModel,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: TeamsSequelizeModel,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
    ],
  };

  findById(id: number): Promise<IMatches | null> {
    const matche = this.model.findOne({ where: { id } });

    return matche as Promise<IMatches | null>;
  }

  async findAll(): Promise<IMatches[]> {
    const teams = await this.model.findAll({
      ...this.roles,
    }) as unknown as IMatches[];

    return teams;
  }

  async findAllWithQuery(inProgress: boolean): Promise<IMatches[]> {
    const teams = await this.model.findAll({
      where: { inProgress },
      ...this.roles,
    });

    return teams as unknown as IMatches[];
  }

  async updateStatus(data: UpdateMatchStatus): Promise<number> {
    const { id, inProgress } = data;
    const affected = await this.model.update({ inProgress }, { where: { id } });

    return affected[0];
  }

  async updateTeamGoals(data: IUpdateTeamGoals): Promise<number> {
    const { id, homeTeamGoals, awayTeamGoals } = data;
    const affected = await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return affected[0];
  }

  async create(data: ICreationMatch): Promise<IMatches> {
    const createMatch = {
      ...data,
      inProgress: true,
    };

    const matche = await this.model.create(createMatch);

    return matche as unknown as IMatches;
  }
}
