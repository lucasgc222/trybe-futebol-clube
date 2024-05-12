import { ICreate, IList, IListWithQuery, IUpdateStatus } from './IModels';

interface ICreationMatch {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

export default interface IMatches extends ICreationMatch {
  id: number,
  inProgress: boolean,
  homeTeam: { teamName: string },
  awayTeam: { teamName: string },
}

interface UpdateMatchStatus { inProgress: boolean, id: number }

interface IUpdateTeamGoals { id: number, homeTeamGoals: number, awayTeamGoals: number, }

interface IMatcheModels extends IListWithQuery<IMatches>,
  IList<IMatches>,
  IUpdateStatus<UpdateMatchStatus, number>,
  ICreate<Partial<IMatches>, IMatches> {
  updateTeamGoals(data: IUpdateTeamGoals): Promise<number>;
}

export { UpdateMatchStatus, IMatcheModels, IUpdateTeamGoals, ICreationMatch };
