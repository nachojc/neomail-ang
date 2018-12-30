import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

const URL = 'http://localhost:3200';
@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private lists = [];
  private lists$ = new BehaviorSubject<any>(this.lists);

  constructor(private http: HttpClient) { }


  getLists(page: number = 1): Observable<any> {
    if ( !this.lists.length ) {
      this.http.get(URL + '/wp-json/neomail/v1/list?p=' + page)
        .subscribe((data: any[]) => {
          this.lists = data;
          this.lists$.next(this.lists);
        });
    }

    return this.lists$.asObservable();
  }

  reset() {
    this.lists = [];
  }
}
