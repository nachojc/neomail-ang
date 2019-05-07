import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemDataMail, StatusText } from 'src/app/services/mails/mails.model';
import { ListsService } from 'src/app/services/lists/lists.service';
import { first} from 'rxjs/operators';
import { ListOption } from 'src/app/services/lists/lists.model';

@Component({
  selector: 'neo-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  private _lists: ListOption[];
  private _listsObj = {};
  @Input()
    set data(data: ItemDataMail){
      this._data = data;
      if (!!this._lists) {
        this.loadLists();
      }
    }
    get data(): ItemDataMail{
      return this._data;
    };
  private _data: ItemDataMail;

  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() view: EventEmitter<number> = new EventEmitter<number>();

  constructor(private lists: ListsService) { }

  ngOnInit() {
    this.lists.getLists()
      .pipe(first())
      .subscribe(lists =>{
        this._lists = lists;
        if (!!this.data) {
          this.loadLists();
        }
      });
  }
  getMailLists() {
    const list = this._data.lists.split(',');
    return list.length ? list.map(l => this._listsObj[l]).join(',') : '';
  }
  getMailStatus() {
    return StatusText[this._data.status];
  }

  private loadLists() {
    for (let i = 0; i < this._lists.length; i++) {
      this._listsObj[this._lists[i].id] = this._lists[i].name;
    }
  }
}
