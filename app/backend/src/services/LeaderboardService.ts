import { TeamPoints } from '../types/Team';
import { ServiceResponse } from '../types/response';
import { TeamsModel } from '../models/index';
import LeaderboardCalc from '../utils/LeaderboardCalc';

export default class LeaderboardService {
  constructor(private teamsModel = new TeamsModel()) {}

  async home(): Promise<ServiceResponse<TeamPoints[]>> {
    const teamsM = await this.teamsModel.findAllTeamMatches();

    const leaderboardCalc = new LeaderboardCalc(teamsM);

    const homePoints = leaderboardCalc.getLeaderboardByType('Home');

    return { status: 'successful', data: homePoints };
  }

  async away(): Promise<ServiceResponse<TeamPoints[]>> {
    const teamsM = await this.teamsModel.findAllTeamMatches();

    const calc = new LeaderboardCalc(teamsM);

    const awayPoints = calc.getLeaderboardByType('Away');

    return { status: 'successful', data: awayPoints };
  }

  async leaderboard(): Promise<ServiceResponse<TeamPoints[]>> {
    const teamsM = await this.teamsModel.findAllTeamMatches();

    const calc = new LeaderboardCalc(teamsM);

    const points = calc.getLeaderboard();

    return { status: 'successful', data: points };
  }
}
