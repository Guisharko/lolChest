import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChampComponent } from './modal-champ.component';

describe('ModalChampComponent', () => {
  let component: ModalChampComponent;
  let fixture: ComponentFixture<ModalChampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
