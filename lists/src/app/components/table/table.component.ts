import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() view: EventEmitter<number> = new EventEmitter<number>();
  dto = {header: [],  data: [{}], page: 1, total: 0};

  editItem(id) { this.edit.emit(id); }
  viewItem(id) { this.view.emit(id); }

}
