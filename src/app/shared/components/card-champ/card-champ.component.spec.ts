import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChampComponent } from './card-champ.component';

describe('CardChampComponent', () => {
  let component: CardChampComponent;
  let fixture: ComponentFixture<CardChampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardChampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
