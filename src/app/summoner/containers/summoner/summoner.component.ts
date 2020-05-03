import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {SummonerService} from '../../services/summoner.service';
import {HttpClient} from '@angular/common/http';
import {Summoner} from '../../models/summoner';
import {ChampionMasteries} from '../../models/champion-masteries';
import * as data from '../../../../assets/lol/champions.json';
import {FormBuilder} from '@angular/forms';
import {Leagues} from '../../models/leagues';
import {Tft} from '../../models/tft';

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
  searchChamp;
  chestValue = '';
  roleValue = '';
  roleIconValue = '';
  property = 'championName';
  propertyValue = 'asc';
  chestOptions = [
    {value: '', viewValue: 'All'},
    {value: 'true', viewValue: 'Without'},
    {value: 'false', viewValue: 'With'}
  ];
  orderyByOptions = [
    {value: 'championName', viewValue: 'Champion Name'},
    {value: 'championPoints', viewValue: 'Experience'},
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
    {value: 'TOP', viewValue: 'Position_Bronze-Top'},
    {value: 'JUNGLE', viewValue: 'Position_Bronze-Jungle'},
    {value: 'MID', viewValue: 'Position_Bronze-Mid'},
    {value: 'ADC', viewValue: 'Position_Bronze-Bot'},
    {value: 'SUPPORT', viewValue: 'Position_Bronze-Support'},
    {value: '', viewValue: 'Position_All'},
  ];
  regions = [
    {value: 'euw1', viewValue: 'EUW1'},
    {value: 'br1', viewValue: 'BR1'},
    {value: 'eun1', viewValue: 'EUN1'},
    {value: 'jp1', viewValue: 'JP1'},
    {value: 'kr', viewValue: 'KR'},
    {value: 'la1', viewValue: 'LA1'},
    {value: 'la2', viewValue: 'LA2'},
    {value: 'oc1', viewValue: 'OC1'},
    {value: 'ru', viewValue: 'RU'},
    {value: 'tr1', viewValue: 'TR1'},
  ];

  constructor(
    private summonerService: SummonerService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }

  region = 'euw1';
  value = '';

  getSummonersChampions() {
    this.summonerService.getSummoner(this.value.replace(' ', '+')).subscribe(summoner => {
      this.summoner = summoner;
      this.summonerService.getChampionMasteries(this.summoner.id).subscribe(champions => {
        champions.forEach(champion => {
          champion.championName = this.products.data[champion.championId].name;
          champion.championImage = this.products.data[champion.championId].id + '_0.jpg';
          champion.championRoles = this.products.data[champion.championId].roles;
        });
        this.champions = champions;
      });
      this.summonerService.getLeague(this.summoner.id).subscribe(leagues => {
        leagues.forEach(league => {
          league.queueType = league.queueType.replace('RANKED_', '');
          league.queueType = league.queueType.replace('_5x5', '/DUO');
          league.queueType = league.queueType.replace('_SR', '');
        });
        this.leagues = leagues;
      });
      this.summonerService.getTft(this.summoner.id).subscribe(tfts => {
        tfts.forEach(tft => {
          tft.queueType = tft.queueType.replace('RANKED_', '');
        });
        this.tfts = tfts;
      });
    });
  }

  ngOnInit() {
    this.getSummonersChampions();
  }

  onEnter(value: string) {
    this.value = value;
    this.getSummonersChampions();
  }
}
