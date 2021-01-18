import {Component, OnInit, Output} from '@angular/core';
import {Summoner} from '../../models/summoner';
import {ChampionMasteries} from '../../models/champion-masteries';
import {SummonerService} from '../../services/summoner.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {CurrentMatchService} from '../../services/current-match.service';
import {CurrentMatch} from '../../models/current-match';
import {CurrentGameParticipant} from '../../models/current-game-participant';
import {Leagues} from '../../models/leagues';
import {Tft} from '../../models/tft';
import {ChampionService} from '../../services/champion.service';
import {CdragonService} from '../../services/cdragron.service';

@Component({
  selector: 'app-current-match',
  templateUrl: './current-match.component.html',
  styleUrls: ['./current-match.component.scss']
})
export class CurrentMatchComponent implements OnInit {
  currentMatch: CurrentMatch;
  summoner: Summoner;
  champions: ChampionMasteries[];
  @Output() name: string;

  constructor(
    private summonerService: SummonerService,
    private currentMatchService: CurrentMatchService,
    private http: HttpClient,
    private fb: FormBuilder,
    private cdragon: CdragonService
) {
  }

  value = '';

  getCurrentGame(regionValue = 'euw1') {
    this.summonerService.getSummoner(regionValue, this.value.replace(' ', '+')).subscribe(summoner => {
      this.summoner = summoner;
      this.currentMatchService.getCurrentGame(regionValue, this.summoner.id).subscribe(currentMatch => {
        currentMatch.participants.forEach(participant => {
          this.cdragon.getChampionData(participant.championId).subscribe(champData => {
            participant.championName = champData.name;
          });
          participant.championImage = this.cdragon.getPortrait(participant.championId);
          this.summonerService.getChampionMasteries(regionValue, participant.summonerId).subscribe(champions => {
            champions.forEach(champion => {
              if (participant.championId === champion.championId) {
                // participant.chestGranted = champion.chestGranted;
                participant.chestGranted = false;
              }
            });
          });
        });
        currentMatch.bannedChampions.forEach(bannedChampion => {
          this.cdragon.getChampionData(bannedChampion.championId).subscribe(champData => {
            bannedChampion.championName = champData.name;
          });
          bannedChampion.championImage = this.cdragon.getPortrait(bannedChampion.championId);
        });
        console.log(currentMatch);
        this.currentMatch = currentMatch;
      });
    });
  }

  ngOnInit() {
    this.getCurrentGame();
  }

  onEnter(value: string) {
    this.value = value;
    this.getCurrentGame();
  }
}
