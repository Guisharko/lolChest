import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SummonerComponent} from './containers/summoner/summoner.component';
import {SummonerRoutingModule} from './summoner-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {SharedModule} from '../shared/shared.module';
import { CurrentMatchComponent } from './containers/current-match/current-match.component';
import {UiModule} from "../ui/ui.module";

@NgModule({
  declarations: [SummonerComponent, CurrentMatchComponent],
  exports: [
    SummonerComponent,
    SummonerRoutingModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2SearchPipeModule,
    SharedModule,
    UiModule,
    SharedModule,
  ]
})
export class SummonerModule {
}
