import { TeamPoints, TeamSide } from '../types/Team';
import IMatches from '../Interfaces/IMatches';
import { ITeamMatches } from '../Interfaces/ITeams';

class LeaderboardCalc {
  private teamsMatches: ITeamMatches[];

  constructor(teamsMatches: ITeamMatches[]) {
    this.teamsMatches = teamsMatches;
  }

  private static calculatePoints(
    side: TeamSide,
    matches: IMatches[],
    points: TeamPoints,
  ): TeamPoints {
    const info = points;
    matches.forEach((match) => {
      const teamGoals1 = side === 'Home' ? match.homeTeamGoals : match.awayTeamGoals;
      const teamGoals2 = side === 'Home' ? match.awayTeamGoals : match.homeTeamGoals;

      info.totalVictories += teamGoals1 > teamGoals2 ? 1 : 0;
      info.totalDraws += teamGoals1 === teamGoals2 ? 1 : 0;
      info.totalLosses += teamGoals1 < teamGoals2 ? 1 : 0;
      info.goalsFavor += teamGoals1;
      info.goalsOwn += teamGoals2;
    });
    info.totalPoints = info.totalVictories * 3 + info.totalDraws;
    info.goalsBalance = info.goalsFavor - info.goalsOwn;
    info.efficiency = ((info.totalPoints / (info.totalGames * 3)) * 100).toFixed(2);
    return info;
  }

  getLeaderboardByType(side: TeamSide): TeamPoints[] {
    const teamsPoints = this.teamsMatches.map((team) => {
      const matches = side === 'Home' ? team.homeMatches : team.awayMatches;

      const points: TeamPoints = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: matches.length,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: '0.00',
      };

      return LeaderboardCalc.calculatePoints(side, matches, points);
    });
    return teamsPoints;
  }
}

export default LeaderboardCalc;
