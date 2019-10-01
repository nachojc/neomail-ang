import { Component, Input } from '@angular/core';
import { NeoOption } from './select.types';
import { ItemsList } from './items-list';

let index = 1;
@Component({
  selector: 'neo-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    '[attr.id]' : 'id',
    'role': 'selector'
  }
})
export class NeoSelectComponent {
  @Input() id = 'neo-select-' + index++;


  itemsList: ItemsList;

  get selectedItems(): NeoOption[] {return this.itemsList.selectedItems; }
  get hasValue() { return this.selectedItems.length > 0; }

  constructor() {
    this.itemsList = new ItemsList(this
      // , newSelectionModel()
      );
  }



  handleMousedown($event: MouseEvent) {

  }
}
