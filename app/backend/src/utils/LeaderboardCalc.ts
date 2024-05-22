import { TeamPoints, TeamSide } from '../types/Team';
import IMatches from '../Interfaces/IMatches';
import { ITeamMatches } from '../Interfaces/ITeams';
import TeamScore from './TeamScore';

class LeaderboardCalc {
  private teamsMatches: ITeamMatches[];

  constructor(teamsMatches: ITeamMatches[]) {
    this.teamsMatches = teamsMatches;
  }

  private static calculatePoints(side: TeamSide, matches: IMatches[]): TeamPoints {
    const info = new TeamScore();
    info.totalGames = matches.length;

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

  private static sortTeamList(teamList: TeamPoints[]): TeamPoints[] {
    return teamList.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  }

  getLeaderboardByType(side: TeamSide): TeamPoints[] {
    const teamPoints = this.teamsMatches.map((team) => {
      const matches = side === 'Home' ? team.homeMatches : team.awayMatches;

      const points = LeaderboardCalc.calculatePoints(side, matches);
      points.name = team.teamName;

      return points;
    });
    return LeaderboardCalc.sortTeamList(teamPoints);
  }

  getLeaderboard(): TeamPoints[] {
    const teamPoints = this.teamsMatches.map((team) => {
      const homePoints = LeaderboardCalc.calculatePoints('Home', team.homeMatches);
      const awayPoints = LeaderboardCalc.calculatePoints('Away', team.awayMatches);
      const points = new TeamScore();

      points.name = team.teamName;
      points.totalGames = homePoints.totalGames + awayPoints.totalGames;
      points.totalVictories = homePoints.totalVictories + awayPoints.totalVictories;
      points.totalDraws = homePoints.totalDraws + awayPoints.totalDraws;
      points.totalLosses = homePoints.totalLosses + awayPoints.totalLosses;
      points.totalPoints = homePoints.totalPoints + awayPoints.totalPoints;
      points.goalsFavor = homePoints.goalsFavor + awayPoints.goalsFavor;
      points.goalsOwn = homePoints.goalsOwn + awayPoints.goalsOwn;
      points.goalsBalance = homePoints.goalsBalance + awayPoints.goalsBalance;
      points.efficiency = ((points.totalPoints / (points.totalGames * 3)) * 100).toFixed(2);

      return points;
    });
    return LeaderboardCalc.sortTeamList(teamPoints);
  }
}

export default LeaderboardCalc;
