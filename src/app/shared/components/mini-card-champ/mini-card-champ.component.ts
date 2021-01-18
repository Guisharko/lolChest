import { Component, Input, OnInit } from '@angular/core';
import { ChampionMasteries } from 'src/app/summoner/models/champion-masteries';
import { CurrentGameParticipant } from 'src/app/summoner/models/current-game-participant';

@Component({
  selector: 'app-mini-card-champ',
  templateUrl: './mini-card-champ.component.html',
  styleUrls: ['./mini-card-champ.component.scss']
})
export class MiniCardChampComponent implements OnInit {
  @Input() champion: ChampionMasteries;
  @Input() participant: CurrentGameParticipant;
  constructor() { }

  ngOnInit() {
  }

}
