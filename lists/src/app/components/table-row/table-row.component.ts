import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Status } from 'src/app/enums/status';
import { ItemDataList } from 'src/app/models/list.model';
import { ListsService } from 'src/app/services/lists/lists.service';

@Component({
  selector: 'neo-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent  {
  @Input() data: ItemDataList;
  @Input() status: Status;
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() view: EventEmitter<number> = new EventEmitter<number>();

  constructor(private lists: ListsService) {}

  isActives() { return this.status === Status.Actives; }

  editItem(id: number) { this.edit.emit(id); }
  viewSubscriptors(id: number) {this.view.emit(id); }
  removeItem(id: number) {this.lists.changeDeleteTo(id, 1); }
  reverteItem(id: number) {this.lists.changeDeleteTo(id, 0); }
  deleteItem(id: number) {this.lists.confirmDelete(id); }

}
