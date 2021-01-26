import {Component, Inject, OnInit, Output} from '@angular/core';
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
import {ActivatedRoute, Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

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
  banned: [];
  summonerName: string;
  summonerRegion: string;
  constructor(
    private summonerService: SummonerService,
    private currentMatchService: CurrentMatchService,
    private http: HttpClient,
    private fb: FormBuilder,
    private cdragon: CdragonService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
) {
  }

  value = '';

  getCurrentGame(regionValue = 'euw1', value) {
    if (value) {
      this.value = value;
    }
    this.summonerService.getSummoner(regionValue, this.value.replace(' ', '+')).subscribe(summoner => {
      this.summoner = summoner;
      this.currentMatchService.getCurrentGame(regionValue, this.summoner.id).subscribe(currentMatch => {
        currentMatch.participants.forEach(participant => {
          this.cdragon.getChampionData(participant.championId).subscribe(champData => {
            participant.championName = champData.name;
          });
          participant.championImage = this.cdragon.getPortrait(participant.championId);
          participant.championImageMini = this.cdragon.getMini(participant.championId);
          this.summonerService.getChampionMasteries(regionValue, participant.summonerId).subscribe(champions => {
            champions.forEach(champion => {
              if (participant.championId === champion.championId) {
                // participant.chestGranted = champion.chestGranted;
                participant.chestGranted = false;
              }
            });
          });
        });
        currentMatch.bannedChampions.forEach((bannedChampion, index) => {
          this.cdragon.getChampionData(bannedChampion.championId).subscribe(champData => {
            bannedChampion.championName = champData.name;
          });
          bannedChampion.championImageMini = this.cdragon.getMini(bannedChampion.championId);
          //this.banned[index] = this.cdragon.getMini(bannedChampion.championId);
        });
        console.log(currentMatch);
        this.currentMatch = currentMatch;
      });
    });
  }

  ngOnInit() {
    this.summonerName = this.route.snapshot.paramMap.get('summoner');
    this.summonerRegion = this.route.snapshot.paramMap.get('region');
    if (this.summonerName) {
      this.getCurrentGame(this.summonerRegion, this.summonerName);
    }
  }

  onEnter(value: string, region: string) {
    this.value = value;
    this.document.location.href = '/summoner/' + region + '/' + this.value + '/current_match';
  }
}
