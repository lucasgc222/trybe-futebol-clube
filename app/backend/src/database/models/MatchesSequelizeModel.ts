import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import db from '.';
import TeamsSequelizeModel from './TeamsSequelizeModel';

class MatchesSequelizeModel extends Model<InferAttributes<MatchesSequelizeModel>,
InferCreationAttributes<MatchesSequelizeModel>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: ForeignKey<TeamsSequelizeModel['id']>;
  declare homeTeamGoals: number;
  declare awayTeamId: ForeignKey<TeamsSequelizeModel['id']>;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesSequelizeModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

TeamsSequelizeModel.hasMany(MatchesSequelizeModel, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

TeamsSequelizeModel.hasMany(MatchesSequelizeModel, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

MatchesSequelizeModel.belongsTo(TeamsSequelizeModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
MatchesSequelizeModel.belongsTo(TeamsSequelizeModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default MatchesSequelizeModel;
