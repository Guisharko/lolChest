import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWithSummonerComponent } from './header-with-summoner.component';

describe('HeaderWithSummonerComponent', () => {
  let component: HeaderWithSummonerComponent;
  let fixture: ComponentFixture<HeaderWithSummonerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderWithSummonerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderWithSummonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
