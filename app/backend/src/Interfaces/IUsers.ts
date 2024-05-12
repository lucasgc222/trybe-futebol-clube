import { Model } from 'sequelize';

export default interface IUsers {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

interface IUsersSequelizeModel extends Model, IUsers {
}

export { IUsersSequelizeModel };
