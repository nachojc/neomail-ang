import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Lists, List } from './lists.model';

const URL = 'http://localhost:3200/wp-json/neomail/v1/list';
// const URL = '/wp-json/neomail/v1/list';
@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private active: number;
  private deleted: number;
  private lists: List[] = [];
  private lists$ = new BehaviorSubject<any>(this.lists);

  constructor(private http: HttpClient) { }

  getTotal(): number {
    return this.active || 0;
  }
  getDeleted(): number {
    return this.deleted || 0;
  }
  getLists(page: number = 1, deleted: boolean = false): Observable<any> {
    if ( !this.lists.length ) {
      const path = URL + '?p=' + page + (deleted ? '&del=true' : '');
      this.http.get(path)
        .subscribe((data: Lists) => {
          this.lists = data.attributes;
          this.active = data.active;
          this.deleted = data.deleted;
          this.lists$.next(this.lists);
        },
        e => {
          this.lists$.error(e);
        }
        );
    }

    return this.lists$.asObservable();
  }
  reload(page: number = 1, deleted: boolean = false) {
    this.reset();
    this.getLists(page, deleted);
  }
  reset() {
    this.lists = [];
  }

  addList(data: any ) {
    const result = new Subject();
    this.http.post(URL + '/add', data).subscribe(id => {
      this.reset();
      this.getLists();
      result.next(id);
    },
    e => {console.log(e);
    }
    );
    return result.asObservable();
  }
}
