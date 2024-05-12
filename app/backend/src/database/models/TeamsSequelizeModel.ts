import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { ITeamsSequelizeModel } from '../../Interfaces/ITeams';
import db from '.';

class TeamsSequelizeModel extends Model<InferAttributes<ITeamsSequelizeModel>,
InferCreationAttributes<TeamsSequelizeModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsSequelizeModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamsSequelizeModel;
