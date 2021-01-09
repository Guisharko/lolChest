import { Component, OnInit, Input } from '@angular/core';
import { Summoner } from 'src/app/summoner/models/summoner';
import { SummonerService } from 'src/app/summoner/services/summoner.service';

@Component({
  selector: 'app-header-without-summoner',
  templateUrl: './header-without-summoner.component.html',
  styleUrls: ['./header-without-summoner.component.scss']
})
export class HeaderWithoutSummonerComponent implements OnInit {
  @Input() summoner: Summoner;
  region = 'euw1';
  value = '';

  constructor(private summonerService: SummonerService,) { }

  ngOnInit() {
  }
  onEnter(value: string) {
    this.value = value;
    this.summonerService.getSummonersChampions(this.region, value);
  }
}
