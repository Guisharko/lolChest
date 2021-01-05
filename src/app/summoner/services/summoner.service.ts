import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {cors} from 'cors';

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
  apikey: string;
  baseUrl: string;
  urlSummonerName: string;
  urlChampionMateries: string;
  urlLeague: string;
  urlTft: string;
  https: string;
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Headers', '*');
    this.apikey = environment.APIKEY;
    this.https = environment.https;
    this.baseUrl = environment.apiEndpoint;
    this.urlSummonerName = 'lol/summoner/v4/summoners/by-name/';
    this.urlChampionMateries = 'lol/champion-mastery/v4/champion-masteries/by-summoner/';
    this.urlLeague = 'lol/league/v4/entries/by-summoner/';
    this.urlTft = 'tft/league/v1/entries/by-summoner/';
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

  public getDataResult(region = 'euw1', url: string = '', lolUrl: string = '', optionalParam?: HttpParams) {
    let httparams = new HttpParams()
      .set('api_key', this.apikey);
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
}
