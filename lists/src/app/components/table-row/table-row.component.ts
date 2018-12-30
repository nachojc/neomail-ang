import { Component, OnInit, Input } from '@angular/core';
import { Status } from 'src/app/enums/status';

@Component({
  selector: 'neo-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent  {
  @Input() data: Object;
  @Input() status: Status;

  editItem() {}
  viewSubscriptors() {}
  removeItem() {}

}
