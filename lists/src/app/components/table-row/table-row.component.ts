import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private lists: ListsService) {}

  isActives() { return this.status === Status.Actives; }

  editItem(id: number) {console.log(id); }
  viewSubscriptors(id: number) {console.log(id); }
  removeItem(id: number) {this.lists.changeDeleteTo(id, 1); }
  reverteItem(id: number) {this.lists.changeDeleteTo(id, 0); }
  deleteItem(id: number) {this.lists.confirmDelete(id); }

}
