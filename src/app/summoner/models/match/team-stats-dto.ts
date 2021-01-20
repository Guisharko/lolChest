import {TeamBansDto} from './team-bans-dto';

export class TeamStatsDto {
  towerKills:	number;
  riftHeraldKills:	number;
  firstBlood:	boolean;
  inhibitorKills:	number;
  bans:	TeamBansDto[];
  firstBaron:	boolean;
  firstDragon:	boolean;
  dominionVictoryScore: number;
  dragonKills:	number;
  baronKills:	number;
  firstInhibitor:	boolean;
  firstTower:	boolean;
  vilemawKills:	number;
  firstRiftHerald:	boolean;
  teamId:	number;
  win:	string;
}
