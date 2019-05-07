import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

const URL = 'http://localhost:3200';
@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private _lists = [];
  private _lists$ = new BehaviorSubject<any>(this._lists);

  constructor(private http: HttpClient) { }


  getLists(): Observable<any> {
    if ( !this._lists.length ) {
      this.http.get(URL + '/wp-json/neomail/v1/lists')
        .subscribe((data: any) => {
          this._lists = data.attributes;
          this._lists$.next(this._lists);
        });
    }

    return this._lists$.asObservable();
  }

  reset() {
    this._lists = [];
  }
}
