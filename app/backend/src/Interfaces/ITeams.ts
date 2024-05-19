import { Model } from 'sequelize';
import IMatches from './IMatches';

export default interface ITeams {
  id: number,
  teamName: string,
}

interface ITeamMatches extends ITeams {
  homeMatches: IMatches[],
  awayMatches: IMatches[],
}

interface ITeamsSequelizeModel extends Model, ITeams {
}

export { ITeamsSequelizeModel, ITeamMatches };
