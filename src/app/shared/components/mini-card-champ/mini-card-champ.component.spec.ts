import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardChampComponent } from './mini-card-champ.component';

describe('MiniCardChampComponent', () => {
  let component: MiniCardChampComponent;
  let fixture: ComponentFixture<MiniCardChampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniCardChampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCardChampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
