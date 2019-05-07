import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataMail, ItemDataMail } from './mails.model';

const URL = 'http://localhost:3200';
@Injectable({
  providedIn: 'root'
})
export class MailsService {
  private _mails = [];
  private _mails$ = new BehaviorSubject<any>(this._mails);

  constructor(private http: HttpClient) { }


  getLists(): Observable<ItemDataMail[]> {
    if ( !this._mails.length ) {
      this.http.get(URL + '/wp-json/neomail/v1/mails')
        .subscribe((data: DataMail) => {
          this._mails = data.attributes;
          this._mails$.next(this._mails);
        });
    }

    return this._mails$.asObservable();
  }

  reset() {
    this._mails = [];
  }
}
