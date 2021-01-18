import {Perks} from './perks';

export class CurrentGameParticipant {
  teamId: string;
  spell1Id: string;
  spell2Id: string;
  championId: string;
  profileIconId: string;
  summonerName: string;
  bot: boolean;
  summonerId: string;
  gameCustomizationObjects: [];
  perks: Perks;
  championName: string;
  championImage: string;
  chestGranted: string;
}
