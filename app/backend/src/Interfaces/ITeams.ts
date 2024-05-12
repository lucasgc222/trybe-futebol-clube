import { Model } from 'sequelize';

export default interface ITeams {
  id: number,
  teamName: string,
}

interface ITeamsSequelizeModel extends Model, ITeams {
}

export { ITeamsSequelizeModel };
