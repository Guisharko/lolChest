import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummonerComponent} from './containers/summoner/summoner.component';
import {CurrentMatchComponent} from './containers/current-match/current-match.component';
import {SummonerMatchsComponent} from './containers/summoner-matchs/summoner-matchs.component';


const routes: Routes = [
  // { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '', component: SummonerComponent },
  { path: 'current_match', component: CurrentMatchComponent },
  { path: 'matches', component: SummonerMatchsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummonerRoutingModule { }
