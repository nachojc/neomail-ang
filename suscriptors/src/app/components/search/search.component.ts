import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListsService } from 'src/app/services/lists/lists.service';
import { ListStatusEnum } from 'src/app/enums/status';
import { ListOption } from 'src/app/services/lists/lists.model';

@Component({
  selector: 'neo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private lists$: Subscription;
  search = {list : -1, status: -1, search: ''};

  status = ListStatusEnum;

  @Input()
    set lists (values: ListOption[]) {
      this._lists =  [{ id: '-1', name: 'Todos'}].concat(values);
    }
    get lists(): ListOption[] {
      return this._lists;
    }
  private _lists: ListOption[] = [{ id: '-1', name: 'Todos'}];

  constructor(private listService: ListsService) { }

  ngOnInit() {
  //   this.lists$ = this.listService.getLists(-1).subscribe((data) => {this.changeListSelction( data); });
  }
  ngOnDestroy(): void {
    this.lists$.unsubscribe();
  }
  // private changeListSelction(data: any []) {
  //   this.listSelection = [{ id: '0', name: 'Todos'}].concat(data);
  // }
  searchClick() {
    console.log(this.search);
  }
}
