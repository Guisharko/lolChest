import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {SummonerService} from './summoner.service';
import {Summoner} from '../models/summoner';

@Injectable({
  providedIn: 'root'
})
export class CurrentMatchService {

  apikey: string;
  baseUrl: string;
  urlSummonerName: string;
  urlChampionMateries: string;
  urlCurrentGame: string;
  summoner: Summoner;
  currentSummoner;

  constructor(private summonerService: SummonerService, public http: HttpClient) {
    this.apikey = environment.APIKEY;
    this.baseUrl = environment.apiEndpoint;
    this.urlSummonerName = 'lol/summoner/v4/summoners/by-name/';
    this.urlChampionMateries = 'lol/champion-mastery/v4/champion-masteries/by-summoner/';
    this.urlCurrentGame = 'lol/spectator/v4/active-games/by-summoner/';
  }

  public getCurrentGame(region = 'euw1', url: string = '', optionalParam?: HttpParams) {
     return this.summonerService.getDataResult(region, url,  this.urlCurrentGame, optionalParam );
  }

  public getChampionMasteries(region = 'euw1', url: string = '', optionalParam?: HttpParams) {
    return this.summonerService.getDataResult(region, url,  this.urlChampionMateries, optionalParam );
  }
}
