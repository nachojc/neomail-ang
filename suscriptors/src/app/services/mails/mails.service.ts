import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { DataMail, ItemDataMail } from './mails.model';

const URL = 'http://localhost:3200';
@Injectable({
  providedIn: 'root'
})
export class MailsService {
  private _mails: ItemDataMail[] = [];
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

  getMail(id: string): Observable<ItemDataMail> {
    const mail: ItemDataMail[] = this._mails.filter((m: ItemDataMail) => m.id === '' + id);
    if (mail.length) {
      return of(mail[0]);
    }
    const _mail$: Subject<ItemDataMail> = new Subject();
    this.http.get(URL + '/wp-json/neomail/v1/mail/' + id)
    .subscribe((data: ItemDataMail) => {
      _mail$.next(data);
    });

    return _mail$.asObservable();
  }
  reset() {
    this._mails = [];
  }
  updateMail(data: ItemDataMail) {
    data.date = data.date || data.created_at;
    return this.http.put(URL + '/wp-json/neomail/v1/mails/upt/' + data.id + '?v=' + data.date , data);
  }

  addMail(data: ItemDataMail) {
    return this.http.post(URL + '/wp-json/neomail/v1/mails/add/' , data);
  }

}
