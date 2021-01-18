import { Component, OnInit, Input } from '@angular/core';
import {ChampionMasteries} from '../../../summoner/models/champion-masteries';
import {CurrentGameParticipant} from "../../../summoner/models/current-game-participant";

@Component({
  selector: 'app-card-champ',
  templateUrl: './card-champ.component.html',
  styleUrls: ['./card-champ.component.scss']
})
export class CardChampComponent implements OnInit {
  @Input() champion: ChampionMasteries;
  @Input() participant: CurrentGameParticipant;
  constructor() { }

  ngOnInit() {
  }

}
