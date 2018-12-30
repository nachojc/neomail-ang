import { Component, OnInit, Input } from '@angular/core';
import { Status } from 'src/app/enums/status';

@Component({
  selector: 'neo-table-nav',
  templateUrl: './table-nav.component.html',
  styleUrls: ['./table-nav.component.scss']
})
export class TableNavComponent {
  private _action;
  @Input() set action(val: Status){
    console.log(val);

    this._action = val;
  }
  get action(): Status {
    return this._action ;
  }
  constructor() { }

  isActived() {
    return this.action = Status.Actived;
  }
}
