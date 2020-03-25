import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { FieldOption, DeleteRequest, DataList, ItemDataList, DataListNewRequest } from '../../models/lists.model';
import { NavPagesParams } from '../../models/page.model';
import { OrderOption } from '../../enums/order';
import { Status } from '../../enums/status';
// import { environment } from 'projects/lists/src/environments/environment';




// const URL = `${environment.api.baseURL}`;
// const URL = '/wp-json/neomail/v1/list';
@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private _lists: DataList = {active: 0, deleted: 0, step: 1, attributes: []};
  private _lists$ = new BehaviorSubject<any>(this._lists.attributes);
  private _item$ = new Subject<any>();
  private _nav$ = new BehaviorSubject<NavPagesParams>(this._getNavParams());
  private _page = 0;
  private _order = OrderOption.Ascendent;
  private _field: FieldOption = FieldOption.name;
  private _status: Status;

  constructor(
    private http: HttpClient,
    @Optional() @Inject('ENV_CONFIG') private ENV: any
    ) { }

  getTotal(): number {
    return this._lists.active || 0;
  }
  getDeleted(): number {
    return this._lists.deleted || 0;
  }
  getNavParams(): Observable<NavPagesParams> {
    return this._nav$.asObservable();
  }
  getLists(page: number = 1, status?: Status): Observable<any> {
    if ( this._page !== page || this._status !== status ||
          !this._lists || !this._lists.attributes.length ) {

      this._status = typeof status === 'number' ? status : Status.Actives;
      this._page = page;

      this.http.get(`${this.ENV.api.baseURL}/list` + this._getUrlParams())
        .subscribe((data: DataList) => {
          this._lists = data;
          this._lists.page = page;
          this._lists$.next(this._lists.attributes);
          this._nav$.next(this._getNavParams());
        }, e => { this._lists$.error(e); });
    }

    return this._lists$.asObservable();
  }
  reload(page: number = 1, status: Status = Status.Actives) {
    this.reset();
    this.getLists(page, status);
  }
  reset() {
    this._page = 0;
    this._status = null;
    this._lists = {active: 0, deleted: 0, step: 1, attributes: []};
  }

  addList(data: DataListNewRequest | any ) {
    const result = new Subject();

    this.http.post(`${this.ENV.api.baseURL}/list/add`, data)
    .subscribe(id => {
      this.reset();
      this.getLists();
      result.next(id);
    }, e => {console.log(e);});
    return result.asObservable();
  }
  updateItem(data: ItemDataList): Observable<number> {
    this.http.put(`${this.ENV.api.baseURL}/list/upt/${data.id}?v=${data.last}`, data)
      .pipe(first())
      .subscribe( (dto: ItemDataList) => {
        if (!!dto) {
          this._lists.attributes.filter(el => el.id = data.id)[0] = dto;
          this._lists$.next(this._lists.attributes);
          this._item$.next(data.id);
        }
      });

    return this._item$.asObservable();
  }
  shortBy(field: FieldOption) {
    if (this._field === field) {
      this._order = this._order === OrderOption.Ascendent ?
              OrderOption.Descendent : OrderOption.Ascendent;
    } else {
      this._order = OrderOption.Ascendent;
      this._field = field;
    }
    this.getLists();
  }
  getStatus() {
    return this._status;
  }
  changeDeleteTo(id: number, d: number = 1) {
    this.deleteList(id, d).subscribe(() => {
      this.getLists();
    });
  }

  confirmDelete(id: number) {
    this.deleteList(id, 1, true ).subscribe(() => {
      this.getLists();
    });
  }
  private deleteList(id: number, d: number = 1, confirm: boolean = false) {
    const data: DeleteRequest = { r: d === 0 ? '0' : '1'};
    if (confirm) {
      data.v = this._lists.attributes.filter(obj => obj.id === id)[0].last;
    }
    return this.http.put(`${this.ENV.api.baseURL}/list/del/${id}`, data);
  }
  private _getUrlParams() {
    const page = '?p=' + this._page;
    const status = this._status ? '' : '&del=true';
    const field = '&opt=' + this._field;
    const orden = '&o=' + this._order;
    return page + field + orden + status;
  }

  private _getNavParams(): NavPagesParams {
    let pags = 1;
    const tot = parseInt('' + (this._status === Status.Actives ? this._lists.active : this._lists.deleted), 10);
    if (tot) {
      pags = Math.floor(tot / this._lists.step);
      pags = tot % this._lists.step ? pags + 1 : pags;
    }
    return {page: this._page || 1, step: this._lists.step || 1, pages: pags, total: tot, status: this._status};
  }
}
