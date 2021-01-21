export class ChampionMasteries {
  championId: number;
  championLevel: string;
  championPoints: string;
  lastPlayTime: string;
  championPointsSinceLastLevel: string;
  championPointsUntilNextLevel: string;
  chestGranted: boolean;
  tokensEarned: string;
  summonerId: string;
  championName: string;
  championImage: string;
  championImageMini: string;
  championRoles: [];

  constructor(fields?: Partial<ChampionMasteries>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
