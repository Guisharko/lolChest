import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://ddragon.leagueoflegends.com',
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DdragonService {

  apiVersionUrl: string;
  lolVersion: string;

  constructor(public http: HttpClient) {
    this.apiVersionUrl = 'https://ddragon.leagueoflegends.com/api/versions.json';
  }

  public getVersion(optionalParam?: HttpParams) {
    const subject = new Subject();
    this.getDataResult(this.apiVersionUrl, optionalParam ).subscribe(lolVersion => {
        this.lolVersion = lolVersion[0];
   });
    return '11.1.1';
  }


  public getDataResult(apiVersionUrl: string , optionalParam?: HttpParams) {
    let httparams = new HttpParams();
    if (optionalParam) {
      optionalParam.keys().forEach((key) => {
        httparams = httparams.set(key, optionalParam.get(key));
      });
    }
    return this.http.get<any>(this.apiVersionUrl, {params: httparams})
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
