import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Status } from 'src/app/enums/status';
import { ListsService } from 'src/app/services/lists/lists.service';
import { NavPagesParams } from 'src/app/models/list.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'neo-table-nav',
  templateUrl: './table-nav.component.html',
  styleUrls: ['./table-nav.component.scss']
})
export class TableNavComponent implements OnInit, OnDestroy {

  @Input()
  set action(val: Status) { this._action = val; }
  get action(): Status { return this._action ; }
  private _action: Status;
  private _nav$: Subscription;

  page: NavPagesParams;

  @Output('change') _change: EventEmitter<any> = new EventEmitter();

  constructor(private lists: ListsService) {}

  ngOnInit(): void {
    this._nav$ = this.lists.getNavParams()
      .subscribe((data: NavPagesParams) => {
        this.page = data;
      });
  }
  ngOnDestroy(): void {
    this._nav$.unsubscribe();
  }

  isActives() { return this._action === Status.Actives; }

  onChangeSelection(e) {
    this._change.emit(e.currentTarget.value);
  }
  onPrevious() {
    const nextPage = this.page.page > 1 ? --this.page.page : this.page.page;
    this.lists.getLists(nextPage);
  }
  onNext() {
    const nextPage = this.page.pages > this.page.page ? ++this.page.page : this.page.page;
    this.lists.getLists(nextPage);
  }
  onLast() {
    this.lists.getLists(this.page.pages);
  }
  onFirt() {
    this.lists.getLists(1);
  }
  onGoto(e) {
    const val = parseInt( e.currentTarget.value, 10);
    if (!isNaN(val) && val > 0 && val <= this.page.pages) {
      this.lists.getLists(val);
    }
    e.preventDefault();
  }
}
