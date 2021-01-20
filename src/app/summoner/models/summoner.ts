export class Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: string;
  revisionDate: string;
  summonerLevel: string;

  constructor(fields?: Partial<Summoner>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
