import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {ChampionService} from '../../summoner/services/champion.service';
import {CdragonService} from '../../summoner/services/cdragron.service';
import { Summoner } from '../models/summoner';
import * as data from '../../../assets/lol/champions.json';
import * as role from '../../../assets/lol/roles.json';
import { ChampionMasteries } from '../models/champion-masteries';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SummonerService {
  headers;
  summoner: Summoner;
  apikey: string;
  baseUrl: string;
  urlSummonerName: string;
  urlChampionMateries: string;
  urlLeague: string;
  urlTft: string;
  matchlists: string;
  https: string;
  products: any = (data as any).default;
  jsonRoles: any = (role as any).default;
  champions: ChampionMasteries[];

  constructor(public http: HttpClient, private championService: ChampionService, private cdragon: CdragonService) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Headers', '*');
    this.apikey = environment.APIKEY;
    this.https = environment.https;
    this.baseUrl = environment.apiEndpoint;
    this.urlSummonerName = 'lol/summoner/v4/summoners/by-name/';
    this.urlChampionMateries = 'lol/champion-mastery/v4/champion-masteries/by-summoner/';
    this.urlLeague = 'lol/league/v4/entries/by-summoner/';
    this.urlTft = 'tft/league/v1/entries/by-summoner/';
    this.matchlists = '/lol/match/v4/matchlists/by-account/';
  }

  public getSummoner(region = 'euw1', url: string = '', optionalParam?: HttpParams) {
    return this.getDataResult(region, url,  this.urlSummonerName, optionalParam );
  }

  public getChampionMasteries(region = 'euw1', url: string = '', optionalParam?: HttpParams) {
    return this.getDataResult(region, url,  this.urlChampionMateries, optionalParam );
  }

  public getLeague(region = 'euw1', url: string = '', optionalParam?: HttpParams) {
    return this.getDataResult(region, url,  this.urlLeague, optionalParam );
  }

  public getTft(region = 'euw1', url: string = '', optionalParam?: HttpParams) {
    return this.getDataResult(region, url,  this.urlTft, optionalParam );
  }

  public getMatchlists(region = 'euw1', url: string = '', optionalParam?: HttpParams) {
    return this.getDataResult(region, url,  this.matchlists, optionalParam );
  }

  public getDataResult(region = 'euw1', url: string = '', lolUrl: string = '', optionalParam?: HttpParams) {
    let httparams = new HttpParams();
      // .set('api_key', this.apikey);
    if (optionalParam) {
      optionalParam.keys().forEach((key) => {
        httparams = httparams.set(key, optionalParam.get(key));
      });
    }
    return this.http.get<any>(`${lolUrl}${url}`, {headers : this.headers, params: httparams})
      .pipe(
        map(data => {
          if (data && data.results) {
            return data.results;
          } else {
            return data;
          }
        })
      );
  }

  getSummonersChampions(region = 'euw1', value: any) {
    this.getSummoner(region, value.replace(' ', '+')).subscribe(summoner => {
      this.summoner = summoner;

      this.getChampionMasteries(region, this.summoner.id).subscribe(champions => {
        champions.forEach(champion => {
          this.cdragon.getChampionData(champion.championId).subscribe(champData => {
            champion.championName = champData.name;
          });
          if (!this.jsonRoles[champion.championId]) {
          champion.championRoles = '';
          } else {
            champion.championRoles = this.jsonRoles[champion.championId].roles;
          }

          champion.championImage = this.cdragon.getPortrait(champion.championId);
          champion.championImageMini = this.cdragon.getMini(champion.championId);
        });
        this.champions = champions;
      });
//      this.getLeague(this.summoner.id).subscribe(leagues => {
//        leagues.forEach(league => {
//          league.queueType = league.queueType.replace('RANKED_', '');
//          league.queueType = league.queueType.replace('_5x5', '/DUO');
//          league.queueType = league.queueType.replace('_SR', '');
//       });
//        this.leagues = leagues;
//      });
//      this.getTft(this.summoner.id).subscribe(tfts => {
//        tfts.forEach(tft => {
//          tft.queueType = tft.queueType.replace('RANKED_', '');
//       });
//        this.tfts = tfts;
//      });
    });
  }
}
