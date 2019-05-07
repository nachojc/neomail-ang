import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'neo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input()
    set data( data ) {
      this.dto = data;
    }
    dto = {header: [],  data: [{}]};


  headers = [];
  list = [];

  constructor() { }

  ngOnInit() {
  }

  editItem(id: number) {
    console.log(id);
  }
  viewItem(id: number) {
    console.log(id);
  }

}
