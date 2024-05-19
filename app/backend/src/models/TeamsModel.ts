import { IList } from '../Interfaces/IModels';
import TeamsSequelizeModel from '../database/models/TeamsSequelizeModel';
import ITeams, { ITeamMatches } from '../Interfaces/ITeams';
import MatchesSequelizeModel from '../database/models/MatchesSequelizeModel';

export default class TeamsModel implements IList<ITeams> {
  private model = TeamsSequelizeModel;
  private roles = {
    include: [
      { model: MatchesSequelizeModel,
        foreignKey: 'homeTeamId',
        as: 'homeMatches',
        where: { inProgress: false } },
      { model: MatchesSequelizeModel,
        foreignKey: 'awayTeamId',
        as: 'awayMatches',
        where: { inProgress: false } },
    ],
  };

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

  async findAllTeamMatches(): Promise<ITeamMatches[]> {
    const teams = await this.model.findAll({
      ...this.roles,
    });

    // const teamsWithMatches = teams.map((team) => {
    //   const { dataValues,  } = team;
    //   return {
    //   id: team.id,
    //   teamName: team.teamName,
    //   homeMatches: dataValues.homeMatches,
    //   awayMatches: team.awayMatches,
    // } as ITeamMatches});

    return teams as unknown as ITeamMatches[];
  }
}
