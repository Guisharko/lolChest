import {Component, Input, OnInit} from '@angular/core';
import {ParticipantDto} from '../../../summoner/models/match/participant-dto';
import {MatchDto} from '../../../summoner/models/match/match-dto';

@Component({
  selector: 'app-modal-champ',
  templateUrl: './modal-champ.component.html',
  styleUrls: ['./modal-champ.component.scss']
})
export class ModalChampComponent implements OnInit {
  @Input() numberOfGames: number;
  @Input() matchDto: MatchDto;
  @Input() deaths: number;
  @Input() kills: number;
  @Input() golds: number;
  @Input() assists: number;
  @Input() kda: number;
  @Input() totalMinionsKilled: number;
  @Input() neutralMinionsKilled: number;
  @Input() neutralMinionsKilledEnemyJungle: number;
  @Input() neutralMinionsKilledTeamJungle: number;
  @Input() totalOfMinionsKilled: number;
  @Input() minionsKilledPerMin: number;
  @Input() participant: ParticipantDto;
  @Input() version: string;
  @Input() side: string;
  constructor() { }

  ngOnInit() {
  }

}
