import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-mini',
  templateUrl: './item-mini.component.html',
  styleUrls: ['./item-mini.component.scss']
})
export class ItemMiniComponent implements OnInit {
  @Input()version: string;
  @Input()itemId: string;
  constructor() { }

  ngOnInit() {
  }

}
