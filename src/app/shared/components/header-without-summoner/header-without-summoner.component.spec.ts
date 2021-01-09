import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWithoutSummonerComponent } from './header-without-summoner.component';

describe('HeaderWithoutSummonerComponent', () => {
  let component: HeaderWithoutSummonerComponent;
  let fixture: ComponentFixture<HeaderWithoutSummonerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderWithoutSummonerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderWithoutSummonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
