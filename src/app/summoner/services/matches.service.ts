import {Injectable} from '@angular/core';
import {Summoner} from '../models/summoner';
import {ChampionMasteries} from '../models/champion-masteries';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ChampionService} from './champion.service';
import {CdragonService} from './cdragron.service';
import {SummonerService} from './summoner.service';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  headers;
  summoner: Summoner;
  matchlists: string;
  matchHistoryUri: string;
  https: string;
  champions: ChampionMasteries[];

  constructor(public http: HttpClient,
              private championService: ChampionService,
              private cdragon: CdragonService,
              private summonerService: SummonerService) {
    this.matchlists = '/lol/match/v4/matches/';
    this.matchHistoryUri = '/v1/stats/player_history/EUW1/';
  }

  public getMatch(region = 'euw1', url: string = '', optionalParam?: HttpParams) {
    return this.summonerService.getDataResult(region, url, this.matchlists, optionalParam);
  }
  public getMatchHistoryUri(region = 'euw1', url: string = '', optionalParam?: HttpParams) {
    return this.summonerService.getDataResult(region, url, this.matchHistoryUri, optionalParam);
  }
}
