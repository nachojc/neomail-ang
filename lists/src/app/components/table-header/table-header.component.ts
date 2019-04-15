import { Component, OnInit, Input } from '@angular/core';
import { ListsService } from 'src/app/services/lists/lists.service';
import { FieldOption } from 'src/app/services/lists/lists.model';

@Component({
  selector: 'neo-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  @Input() data: any;
  constructor(private lists: ListsService) {}


  sortElement(field: FieldOption) {
    this.lists.shortBy( field );
  }

}
