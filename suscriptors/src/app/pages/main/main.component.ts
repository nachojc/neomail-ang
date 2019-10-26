import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListsService } from 'src/app/services/lists/lists.service';
import { Columns } from 'src/app/enums/colums';
import { Subscriber, Subscription } from 'rxjs';
import { MailsService } from 'src/app/services/mails/mails.service';
import { ItemDataMail } from 'src/app/services/mails/mails.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private _mails$: Subscription;
  dto = {
    header: Columns,
    lists: [],
    data: []
  };
  
  
  
  constructor(
    private lists: ListsService,
    private mails: MailsService
    ) { }

  ngOnInit() {
    this.lists.getLists()
    .pipe()
    .subscribe(lists => {
      this.dto.lists = lists;
    });
    this._mails$ = this.mails.getLists()
      .subscribe((data: ItemDataMail[]) => {
        this.dto.data = data;
      });
  }
  ngOnDestroy(): void {
    this._mails$.unsubscribe();
  }
}
