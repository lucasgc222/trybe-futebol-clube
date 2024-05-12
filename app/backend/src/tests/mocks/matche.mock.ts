import { Model } from 'sequelize';
import IMatches from '../../Interfaces/IMatches';
import MatchesSequelizeModel from '../../database/models/MatchesSequelizeModel';

export const matchesFromSequelize: Model<MatchesSequelizeModel>[] = [
    {
        dataValues: {
            id: 1,
            homeTeamId: 16,
            homeTeamGoals: 1,
            awayTeamId: 8,
            awayTeamGoals: 1,
            inProgress: false,
            homeTeam: {
                    teamName: "São Paulo"
            },
            awayTeam: {
                    teamName: "Grêmio"
            }
        },
    },
    {
        dataValues: {
            id: 41,
            homeTeamId: 16,
            homeTeamGoals: 2,
            awayTeamId: 9,
            awayTeamGoals: 0,
            inProgress: true,
            homeTeam: {
                teamName: "São Paulo"
            },
            awayTeam: {
                teamName: "Internacional"
            }
        },
    }
] as unknown as Model<MatchesSequelizeModel>[];

export const matcheInProgress: Model<MatchesSequelizeModel>[] = [
    {
      ...matchesFromSequelize[1],
    },
] as unknown as Model<MatchesSequelizeModel>[];

export const matcheFinished: Model<MatchesSequelizeModel>[] = [
    {
      ...matchesFromSequelize[0],
    },
] as unknown as Model<MatchesSequelizeModel>[];

export const createdMatch: Model<MatchesSequelizeModel> = {
    dataValues: {
        id: 1,
        homeTeamId: 1,
        homeTeamGoals: 1,
        awayTeamId: 2,
        awayTeamGoals: 3,
        inProgress: true,
        homeTeam: {
            teamName: "Avaí/Kindermann"
        },
        awayTeam: {
            teamName: "Bahia"
        }
    },
} as unknown as Model<MatchesSequelizeModel>;

export const matchInfo = {
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 1,
    awayTeamGoals: 3,
}

export const updateGoals = {
  homeTeamGoals: 7,
  awayTeamGoals: 1,
}
