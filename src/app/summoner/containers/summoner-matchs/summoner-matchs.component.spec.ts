import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerMatchsComponent } from './summoner-matchs.component';

describe('SummonerMatchsComponent', () => {
  let component: SummonerMatchsComponent;
  let fixture: ComponentFixture<SummonerMatchsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummonerMatchsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummonerMatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
