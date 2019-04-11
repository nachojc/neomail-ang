import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Status } from 'src/app/enums/status';
import { DataList, NavPagesParams } from 'src/app/models/list.model';



const URL = 'http://localhost:3200/wp-json/neomail/v1/list';
// const URL = '/wp-json/neomail/v1/list';
@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private _lists: DataList = {active: 0, deleted: 0, step: -1, attributes: []};
  private _lists$ = new BehaviorSubject<any>(this._lists.attributes);
  private _nav$ = new BehaviorSubject<NavPagesParams>(this._getNavParams());
  private _page = 0;
  private _step = -1;
  private _status: Status;

  constructor(private http: HttpClient) { }

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
    if ( this._page !== page || this._status !== status || !this._lists ||
          !this._lists.attributes.length ) {
      this._status = typeof status === 'number' ? status : Status.Actives;
      const path = URL + '?p=' + page + (this._status ? '' : '&del=true');
      this.http.get(path)
        .subscribe((data: DataList) => {
          if (this._step === -1 && data.attributes.length) {
            this._step = data.attributes.length;
          }
          this._page = page;

          this._lists = data;
          this._lists.step = this._step;
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
    this._step = -1;
    this._status = null;
    this._lists = {active: 0, deleted: 0, step: -1, attributes: []};
  }

  addList(data: any ) {
    const result = new Subject();
    this.http.post(URL + '/add', data)
    .subscribe(id => {
      this.reset();
      this.getLists();
      result.next(id);
    }, e => {console.log(e);});
    return result.asObservable();
  }


  private _getNavParams(): NavPagesParams {
    let pags = 1;
    const tot = parseInt('' + (this._status === Status.Actives ? this._lists.active : this._lists.deleted), 10);
    if (tot) {
      pags = Math.floor(tot / this._step);
      pags = tot % this._step ? pags + 1 : pags;
    }
    return {page: this._page || 1, step: this._step || 1, pages: pags, total: tot};
  }
}
