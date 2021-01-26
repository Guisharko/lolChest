import {Component, Inject, OnInit, Output} from '@angular/core';
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
import {ParticipantIdentityDto} from '../../models/match/participant-identity-dto';
import {ParticipantDto} from '../../models/match/participant-dto';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DdragonService} from '../../services/ddragon.service';
import {ChampionStats} from '../../models/champion-stats';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-summoner-matchs',
  templateUrl: './summoner-matchs.component.html',
  styleUrls: ['./summoner-matchs.component.scss']
})
export class SummonerMatchsComponent implements OnInit {
  summoner: Summoner;
  champions: ChampionMasteries[];
  leagues: Leagues[];
  @Output() name: string;
  searchChamp;
  championStatsPerGame: [];
  champion: ChampionMasteries;
  matchDtos: MatchDto[] = [];
  regionValue = 'euw1';
  property = 'championPoints';
  nbResults = 3;
  championStats: ChampionStats[];
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
  private numberOfGames = 0;
  private deaths = 0;
  private kills = 0;
  private golds = 0;
  private assists = 0;
  private kda = 0;
  private gameDurationSeconds = 0;
  private gameDurationMinutes = 0;
  private totalMinionsKilled = 0;
  private neutralMinionsKilled = 0;
  private neutralMinionsKilledEnemyJungle = 0;
  private neutralMinionsKilledTeamJungle = 0;
  private totalOfMinionsKilled = 0;
  private minionsKilledPerMin = 0;

  constructor(
    private summonerService: SummonerService,
    private matchesService: MatchesService,
    private http: HttpClient,
    private championService: ChampionService,
    private fb: FormBuilder,
    private cdragon: CdragonService,
    private modalService: NgbModal,
    private ddragonService: DdragonService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
  }
  version = this.ddragonService.getVersion();
  value = '';
  red: 'red';
  blue: 'blue';
  summonerName: string;
  summonerRegion: string;
  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  getSummonersMatchesBySummoner(regionValue = 'euw1', value) {
    if (value) {
      this.value = value;
    }
    this.summonerService.getSummoner(regionValue, this.value.replace(' ', '+')).subscribe(summoner => {
      this.summoner = summoner;
      this.getSummonersMatches(regionValue, this.summoner.accountId, this.nbResults, null, null, null);

      this.summonerService.getLeague(this.summoner.id).subscribe(leagues => {
       leagues.forEach(league => {
         league.queueType = league.queueType.replace('RANKED_', '');
         league.queueType = league.queueType.replace('_5x5', '/DUO');
         league.queueType = league.queueType.replace('_SR', '');
      });
       this.leagues = leagues;
     });
    });
  }
  getChampionSeasonStats(accountId, championId, seasonId, regionValue = 'euw1', gameType) {
    this.numberOfGames = 0;
    this.deaths = 0;
    this.kills = 0;
    this.golds = 0;
    this.assists = 0;
    this.kda = 0;
    this.gameDurationSeconds = 0;
    this.gameDurationMinutes = 0;
    this.totalMinionsKilled = 0;
    this.neutralMinionsKilled = 0;
    this.neutralMinionsKilledEnemyJungle = 0;
    this.neutralMinionsKilledTeamJungle = 0;
    this.totalOfMinionsKilled = 0;
    this.minionsKilledPerMin = 0;
    this.getSummonersMatches(regionValue, accountId, null, championId, seasonId, gameType);
  }

  getSummonersMatches(regionValue, accountId, nbResults, championId, seasonId, gameType) {
    this.summonerService.getMatchlists(regionValue, accountId).subscribe(matchlist => {
      if (nbResults) {
        this.getMatchList(matchlist, regionValue, nbResults);
      } else {
        matchlist.matches.slice(0, 10).forEach((matchReferenceDto: MatchReferenceDto, index: number) => {
          this.matchesService.getMatch(regionValue, matchReferenceDto.gameId).subscribe((matchDto: MatchDto) => {
            matchDto.participants.forEach((participant, participantNumber ) => {
              if (matchDto.seasonId === seasonId && matchDto.gameMode !== gameType) {
                if (matchDto.participantIdentities[participantNumber].player.accountId === accountId) {
                  if (participant.championId === championId) {
                    this.kills += participant.stats.kills;
                    this.deaths += participant.stats.deaths;
                    this.assists += participant.stats.assists;
                    this.golds += participant.stats.goldEarned;
                    this.kda +=
                      (participant.stats.kills + participant.stats.assists) / participant.stats.deaths;
                    this.gameDurationSeconds += matchDto.gameDuration;
                    this.gameDurationMinutes +=
                      matchDto.gameDuration / 60;
                    this.totalMinionsKilled += participant.stats.totalMinionsKilled;
                    this.neutralMinionsKilled += participant.stats.neutralMinionsKilled;
                    this.neutralMinionsKilledEnemyJungle += participant.stats.neutralMinionsKilledEnemyJungle;
                    this.neutralMinionsKilledTeamJungle += participant.stats.neutralMinionsKilledTeamJungle;
                    this.totalOfMinionsKilled +=
                      participant.stats.totalMinionsKilled +
                      participant.stats.neutralMinionsKilled +
                      participant.stats.neutralMinionsKilledEnemyJungle +
                      participant.stats.neutralMinionsKilledTeamJungle;
                    this.minionsKilledPerMin +=
                      this.totalOfMinionsKilled /
                      this.gameDurationMinutes;
                    this.numberOfGames += 1;
                  }
                }
              }
            });
          });
        });
      }
    });
  }

  getMatchList(matchlist, regionValue, nbResults) {
    matchlist.matches.slice(0, nbResults).forEach((matchReferenceDto: MatchReferenceDto, index: number) => {
      this.matchesService.getMatch(regionValue, matchReferenceDto.gameId).subscribe((matchDto: MatchDto) => {
        this.matchDtos[index] = matchDto;
      });
    });
  }
  ngOnInit() {
    this.summonerName = this.route.snapshot.paramMap.get('summoner');
    this.summonerRegion = this.route.snapshot.paramMap.get('region');
    if (this.summonerName) {
      this.getSummonersMatchesBySummoner(this.summonerRegion, this.summonerName);
    }
  }

  onEnter(value: string, region: string) {
    this.value = value;
    this.document.location.href = '/summoner/' + region + '/' + this.value + '/matches';
  }
}
