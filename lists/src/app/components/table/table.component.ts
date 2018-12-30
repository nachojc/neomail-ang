import { Component, OnInit, Input } from '@angular/core';
import { Status } from 'src/app/enums/status';

@Component({
  selector: 'neo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() action: Status;
  @Input()
    set data( data: any ) {
      this.dto = data;
    }
  dto = {header: [],  data: [{}]};


  headers = [];
  list = [];

  constructor() { }


}
