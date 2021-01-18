import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {SummonerService} from '../../services/summoner.service';
import {HttpClient} from '@angular/common/http';
import {Summoner} from '../../models/summoner';
import {ChampionMasteries} from '../../models/champion-masteries';
import * as data from '../../../../assets/lol/champions.json';
import * as role from '../../../../assets/lol/roles.json';
import {FormBuilder} from '@angular/forms';
import {Leagues} from '../../models/leagues';
import {Tft} from '../../models/tft';
import {ChampionService} from '../../services/champion.service';
import {CdragonService} from '../../services/cdragron.service';


@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.scss']
})
export class SummonerComponent implements OnInit {
  summoner: Summoner;
  champions: ChampionMasteries[];
  leagues: Leagues[];
  tfts: Tft[];
  @Output() name: string;
  products: any = (data as any).default;
  jsonRoles: any = (role as any).default;
  searchChamp;
  chestValue = '';
  regionValue = 'euw1';
  roleValue = '';
  roleIconValue = '';
  property = 'championPoints';
  propertyValue = '';
  chestOptions = [
    {value: '', viewValue: 'All'},
    {value: 'true', viewValue: 'Earned'},
    {value: 'false', viewValue: 'Not Yet'}
  ];
  orderyByOptions = [
    {value: 'championPoints', viewValue: 'Experience'},
    {value: 'championName', viewValue: 'Champion Name'},
    {value: 'championLevel', viewValue: 'Level'}
  ];
  roles = [
    {value: 'TOP', viewValue: 'TOP'},
    {value: 'JUNGLE', viewValue: 'JUNGLE'},
    {value: 'MID', viewValue: 'MID'},
    {value: 'ADC', viewValue: 'ADC'},
    {value: 'SUPPORT', viewValue: 'SUPPORT'},
    {value: '', viewValue: 'ALL'},
  ];
  rolesIcons = [
    {value: 'TOP', viewValue: 'top'},
    {value: 'JUNGLE', viewValue: 'jungle'},
    {value: 'MID', viewValue: 'mid'},
    {value: 'ADC', viewValue: 'bot'},
    {value: 'SUPPORT', viewValue: 'support'},
    {value: '', viewValue: 'all'},
  ];
  regions = [
    {value: 'euw1', viewValue: 'EUW-1'},
    {value: 'br1', viewValue: 'BR-1'},
    {value: 'eun1', viewValue: 'EUN-1'},
    {value: 'jp1', viewValue: 'JP-1'},
    {value: 'kr', viewValue: 'KR'},
    {value: 'la1', viewValue: 'LA-1'},
    {value: 'la2', viewValue: 'LA-2'},
    {value: 'oc1', viewValue: 'OC-1'},
    {value: 'ru', viewValue: 'RU'},
    {value: 'tr1', viewValue: 'TR-1'},
  ];

  constructor(
    private summonerService: SummonerService,
    private http: HttpClient,
    private championService: ChampionService,
    private fb: FormBuilder,
    private cdragon: CdragonService
  ) {
  }

  value = '';

  getSummonersChampions(regionValue = 'euw1') {
    this.summonerService.getSummoner(regionValue, this.value.replace(' ', '+')).subscribe(summoner => {
      this.summoner = summoner;

      this.summonerService.getChampionMasteries(regionValue, this.summoner.id).subscribe(champions => {
        champions.forEach(champion => {
          this.cdragon.getChampionData(champion.championId).subscribe(champData => {
            champion.championName = champData.name;
          });
          if (!this.jsonRoles[champion.championId]){
          champion.championRoles = '';
          } else {
            champion.championRoles = this.jsonRoles[champion.championId].roles;
          }

          champion.championImage = this.cdragon.getPortrait(champion.championId);

        });
        this.champions = champions;
      });
//      this.summonerService.getLeague(this.summoner.id).subscribe(leagues => {
//        leagues.forEach(league => {
//          league.queueType = league.queueType.replace('RANKED_', '');
//          league.queueType = league.queueType.replace('_5x5', '/DUO');
//          league.queueType = league.queueType.replace('_SR', '');
//       });
//        this.leagues = leagues;
//      });
//      this.summonerService.getTft(this.summoner.id).subscribe(tfts => {
//        tfts.forEach(tft => {
//          tft.queueType = tft.queueType.replace('RANKED_', '');
//       });
//        this.tfts = tfts;
//      });
    });
  }

  ngOnInit() {
    // this.getSummonersChampions();
  }

  onEnter(value: string, region: string) {
    this.value = value;
    this.getSummonersChampions(region);
  }
}
