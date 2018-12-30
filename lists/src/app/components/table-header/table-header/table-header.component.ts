import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'neo-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
