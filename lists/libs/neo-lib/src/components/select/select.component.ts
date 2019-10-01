import { Component, Input } from '@angular/core';

let index = 1;
@Component({
  selector: 'neo-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    '[attr.id]' : 'id',

    'role': 'selector'
  },

})
export class SelectComponent {
    @Input() id = 'neo-select' + index++;

  constructor() {}

}
