import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {cors} from 'cors';
import {version} from 'process';
import {DdragonService} from './ddragon.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://ddragon.leagueoflegends.com',
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  baseUrl: string;
  data: string;
  versions: any;
  championsUrl: string;

  constructor(private ddragonService: DdragonService, public http: HttpClient) {

    this.baseUrl = 'http://ddragon.leagueoflegends.com/cdn/';
    this.data = '/data/en_US/champion.json';
    this.versions = this.ddragonService.getVersion();
    this.championsUrl = this.baseUrl + this.versions + this.data;
  }

  public getChampions(optionalParam?: HttpParams) {
    return this.getDataResult(optionalParam);
  }

  public getDataResult(optionalParam?: HttpParams) {
    let httparams = new HttpParams();
    if (optionalParam) {
      optionalParam.keys().forEach((key) => {
        httparams = httparams.set(key, optionalParam.get(key));
      });
    }
    return this.http.get<any>(this.championsUrl, {params: httparams})
      .pipe(
        map(data => {
          if (data && data.results) {
            return data.results;
          } else {
            return data;
          }
        })
      )
      ;
  }
}
