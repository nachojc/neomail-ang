import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Status } from '../../../enums/status';
import { NavPagesParams, NavPagesEvent } from '../../../models/page.model';
import { PageNavOptionEvent } from '../../../enums/table-nav';


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


  @Output('change') _change: EventEmitter<NavPagesEvent> = new EventEmitter();

  isActives() { return this._action === Status.Actives; }

  onChangeSelection(e) {
    e.stopImmediatePropagation();
    this._change.emit({type: PageNavOptionEvent.selector, value: e.currentTarget.value});
  }
  onPrevious() {
    const nextPage = this.page.page > 1 ? --this.page.page : this.page.page;
    this._change.emit({type: PageNavOptionEvent.goPrevious, value: nextPage});
  }
  onNext() {
    const nextPage = this.page.pages > this.page.page ? ++this.page.page : this.page.page;
    this._change.emit({type: PageNavOptionEvent.goNext, value: nextPage});
  }
  onLast() {
    this._change.emit({type: PageNavOptionEvent.goLast, value: this.page.pages});
  }
  onFirt() {
    this._change.emit({type: PageNavOptionEvent.goFirst, value: 1});
  }
  onGoto(e) {
    e.stopImmediatePropagation();
    const val = parseInt(e.currentTarget.value, 10) ;
    if (Number.isInteger(val) && val>0 && val !== this .page.page && val <= this .page.pages){
      this._change.emit({type: PageNavOptionEvent.goTo, value: e.currentTarget.value});
    }
    e.currentTarget.value = this.page.page;
  }
}
