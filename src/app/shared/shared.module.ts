import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CardChampComponent } from './components/card-champ/card-champ.component';
import { HeaderWithSummonerComponent } from './components/header-with-summoner/header-with-summoner.component';
import { HeaderWithoutSummonerComponent } from './components/header-without-summoner/header-without-summoner.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [OrderByPipe, CardChampComponent, HeaderWithSummonerComponent, HeaderWithoutSummonerComponent],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [OrderByPipe, CardChampComponent, HeaderWithSummonerComponent, HeaderWithoutSummonerComponent]
})
export class SharedModule { }
