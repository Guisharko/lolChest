import {Component, OnInit, Output} from '@angular/core';
import {Summoner} from '../../models/summoner';
import {ChampionMasteries} from '../../models/champion-masteries';
import {Leagues} from '../../models/leagues';
import {Tft} from '../../models/tft';
import * as role from '../../../../assets/lol/roles.json';
import {SummonerService} from '../../services/summoner.service';
import {HttpClient} from '@angular/common/http';
import {ChampionService} from '../../services/champion.service';
import {FormBuilder} from '@angular/forms';
import {CdragonService} from '../../services/cdragron.service';
import {MatchlistDto} from '../../models/match/matchlist-dto';
import {MatchDto} from '../../models/match/match-dto';
import {MatchReferenceDto} from '../../models/match/matchReferenceDto';
import {MatchesService} from '../../services/matches.service';
import { ParticipantIdentityDto } from '../../models/match/participant-identity-dto';
import { ParticipantDto } from '../../models/match/participant-dto';

@Component({
  selector: 'app-summoner-matchs',
  templateUrl: './summoner-matchs.component.html',
  styleUrls: ['./summoner-matchs.component.scss']
})
export class SummonerMatchsComponent implements OnInit {
  summoner: Summoner;
  champions: ChampionMasteries[];
  leagues: Leagues[];
  tfts: Tft[];
  @Output() name: string;
  jsonRoles: any = (role as any).default;
  searchChamp;
  matchlistDto: MatchlistDto;
  matchDto: MatchDto;
  matchReferenceDto: MatchReferenceDto;
  regionValue = 'euw1';
  property = 'championPoints';
  nbResults = 20;
  matchList;
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
    private matchesService: MatchesService,
    private http: HttpClient,
    private championService: ChampionService,
    private fb: FormBuilder,
    private cdragon: CdragonService
  ) {
  }

  value = 'Guisharko';

  getSummonersMatches(regionValue = 'euw1') {
    this.summonerService.getSummoner(regionValue, this.value.replace(' ', '+')).subscribe(summoner => {
      this.summoner = summoner;
      let matchDtos= [];
      this.summonerService.getMatchlists(regionValue, this.summoner.accountId).subscribe(matchlist => {
        matchlist.matches.slice(0, this.nbResults).forEach((matchReferenceDto: MatchReferenceDto, index: number) => {
          this.matchesService.getMatch(regionValue, matchReferenceDto.gameId).subscribe((matchDto: MatchDto) => {
            
             //this.cdragon.getChampionData(matchDto.participants[index].championId).subscribe(champData => {
              //matchDto.participants[index].champion.championName = champData.name;
            //});
            matchDto.participants[index].champion.championImage = this.cdragon.getPortrait(matchDto.participants[index].championId);
            matchDto.participants[index].champion.championImageMini = this.cdragon.getMini(matchDto.participants[index].championId);
             this.matchList = matchlist;
             console.log(this.matchList);
          });
        });
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
    this.getSummonersMatches();
  }

  onEnter(value: string, region: string) {
    this.value = value;
    this.getSummonersMatches(region);
  }
}
