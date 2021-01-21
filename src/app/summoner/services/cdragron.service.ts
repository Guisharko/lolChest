import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {cors} from 'cors';
import { version } from 'process';
import { DdragonService } from './ddragon.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'https://cdn.communitydragon.org/',
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CdragonService {

  apiBaseUrl: string;
  lolVersion: string;


  constructor(public http: HttpClient, private ddragonService: DdragonService) {
    this.apiBaseUrl = 'https://cdn.communitydragon.org/';
  }

  public getPortrait(id: any, optionalParam?: HttpParams) {
    return this.apiBaseUrl + this.ddragonService.getVersion() + '/champion/'  + id + '/tile';
  }

  public getMini(id: any, optionalParam?: HttpParams) {
    return this.apiBaseUrl + this.ddragonService.getVersion() + '/champion/'  + id + '/square';
  }
  public getChampionData(id: any, optionalParam?: HttpParams) {
    return this.getDataResult(this.apiBaseUrl + this.ddragonService.getVersion() + '/champion/'  + id + '/data', optionalParam );
  }

  public getDataResult(apiUrl: string , optionalParam?: HttpParams) {
    let httparams = new HttpParams();
    if (optionalParam) {
      optionalParam.keys().forEach((key) => {
        httparams = httparams.set(key, optionalParam.get(key));
      });
    }
    return this.http.get<any>(apiUrl, {params: httparams})
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
