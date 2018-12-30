import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListsService } from 'src/app/services/lists/lists.service';
import { List } from 'src/app/models/list.model';
import { ListStatusEnum } from 'src/app/enums/listStatus';

@Component({
  selector: 'neo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private lists$: Subscription;
  search = {list : 0, status: -1, search: ''};

  status = ListStatusEnum;
  listSelection: List[];

  constructor(private lists: ListsService) { }

  ngOnInit() {
    this.lists$ = this.lists.getLists(-1).subscribe((data) => {this.changeListSelction( data); });
  }
  ngOnDestroy(): void {
    this.lists$.unsubscribe();
  }
  private changeListSelction(data: List []) {
    this.listSelection = [{ id: '0', name: 'Todos'}].concat(data);
  }
  searchClick() {
    console.log(this.search);
  }
}
