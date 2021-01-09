import { Component, OnInit, Input } from '@angular/core';
import {ChampionMasteries} from '../../../summoner/models/champion-masteries';

@Component({
  selector: 'app-card-champ',
  templateUrl: './card-champ.component.html',
  styleUrls: ['./card-champ.component.scss']
})
export class CardChampComponent implements OnInit {
  @Input() champion: ChampionMasteries;
  constructor() { }

  ngOnInit() {
  }

}
