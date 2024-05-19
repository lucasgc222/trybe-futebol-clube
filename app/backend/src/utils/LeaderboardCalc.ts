import { TeamPoints, TeamSide } from '../types/Team';
import IMatches from '../Interfaces/IMatches';
import { ITeamMatches } from '../Interfaces/ITeams';

class LeaderboardCalc {
  private teamsMatches: ITeamMatches[];

  constructor(teamsMatches: ITeamMatches[]) {
    this.teamsMatches = teamsMatches;
  }

  private static calculatePoints(matches: IMatches[], points: TeamPoints): TeamPoints {
    const info = points;
    matches.forEach((match) => {
      info.totalVictories += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
      info.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
      info.totalLosses += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
      info.goalsFavor += match.homeTeamGoals;
      info.goalsOwn += match.awayTeamGoals;
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

      return LeaderboardCalc.calculatePoints(matches, points);
    });
    return teamsPoints;
  }
}

export default LeaderboardCalc;
