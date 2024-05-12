import { ITeamsSequelizeModel }  from '../../Interfaces/ITeams';
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<ITeamsSequelizeModel>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        field: 'team_name',
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};