import { Component, OnInit, Input } from '@angular/core';
import { Summoner } from 'src/app/summoner/models/summoner';
import { SummonerService } from 'src/app/summoner/services/summoner.service';

@Component({
  selector: 'app-header-with-summoner',
  templateUrl: './header-with-summoner.component.html',
  styleUrls: ['./header-with-summoner.component.scss']
})
export class HeaderWithSummonerComponent implements OnInit {
  region = 'euw1';
  value = '';
  @Input() summoner: Summoner;

  constructor(private summonerService: SummonerService,) { }

  ngOnInit() {
  }
  onEnter(value: string) {
    this.value = value;
    this.summonerService.getSummonersChampions(this.region, value);
  }
}
