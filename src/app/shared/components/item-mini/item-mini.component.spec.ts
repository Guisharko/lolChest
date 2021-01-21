import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMiniComponent } from './item-mini.component';

describe('ItemMiniComponent', () => {
  let component: ItemMiniComponent;
  let fixture: ComponentFixture<ItemMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
