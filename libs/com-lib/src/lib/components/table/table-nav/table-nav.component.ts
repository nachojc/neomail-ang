import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Status } from '../../../enums/status';
import { NavPagesParams } from '../../../models/page.model';

let count = 0;

@Component({
  selector: 'neo-table-nav',
  templateUrl: './table-nav.component.html',
  styleUrls: ['./table-nav.component.scss']
})
export class TableNavComponent {
  idItem = count++;
  @Input()
  set action(val: Status) { this._action = val; }
  get action(): Status { return this._action ; }
  private _action: Status;

  @Input()
  set page(page: NavPagesParams) { this._page = page; };
  get page(): NavPagesParams { return this._page ; };
  private _page: NavPagesParams = {
    page: 1,
    status: Status.Actives,
    pages: 1,
    step:1,
    total: 1
  };


  @Output('change') _change: EventEmitter<any> = new EventEmitter();

  isActives() { return this._action === Status.Actives; }

  onChangeSelection(e) {
    this._change.emit(e.currentTarget.value);
  }
  onPrevious() {

  }
  onNext() {

  }
  onLast() {

  }
  onFirt() {

  }
  onGoto(e) {

  }
}
