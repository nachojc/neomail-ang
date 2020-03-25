import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Columns } from '../../enums/colums';

import { 
  Status,
  ListsService,
  NavPagesParams,
  OverlayService,
  DialogModalSizeEnum,
  DataListNewRequest
} from '@neo/common';
import { takeUntil } from 'rxjs/operators';
import { EventListItem, EventListItemType } from '../../models/event-list-item.model';
import { AddListComponent } from '../../components/add-list/add-list.component';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  action: Status = Status.Actives ;
  page: NavPagesParams;

  private destroy$: Subject<void> = new Subject<void>();

  modalTitle = '';
  dto = {
    nav: {actived : 0, deleted : 0},
    header: Columns,
    data: []
  };

  constructor(
    private lists: ListsService,
    private modal: OverlayService
    ) { }
  
  ngOnInit() {
    this.lists.getLists()
      .pipe(takeUntil(this.destroy$))
      .subscribe(dta => {
        this.dto.data = dta;
        this.dto.nav.actived = this.lists.getTotal();
        this.dto.nav.deleted = this.lists.getDeleted();
        this.action = this.lists.getStatus();
      });
    this.lists.getNavParams()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: NavPagesParams) => {
        this.page = data;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onActionList(ev: EventListItem){
    switch (ev.type) {
      case EventListItemType.edit:
      this._editItem(ev.id);
        break;
    
      default:
        break;
    }
  }

  reLoad(target: Status) {
    if (this.action !== target) {
      this.action = target;
      this.dto.data = null;
      this.lists.reload(1, target);
    }
    return false;
  }
  addList() {
    const ref = this.modal.open(AddListComponent,
      { animated: true, hasBackdrop: true, size: DialogModalSizeEnum.Small }
      );
    ref.onClose().subscribe(res => {
      if(res && res.data){ this.lists.addList(res.data); }
    });
  }
  closeModal() {
    // this.modal.dismiss();
  }
  onChange(val: string) {
    // console.log(val);
  }

  viewItem(id) { console.log(id);  }

  isActives() { return this.action === Status.Actives; }


  private _editItem(id) {
    const _editValue =  this.dto.data.filter(obj => obj.id === id)[0];
    const modalConfig = {
      animated: true,
      hasBackdrop: true,
      size: DialogModalSizeEnum.Small,
      data: _editValue,
    };
    const ref = this.modal.open(AddListComponent, modalConfig);
    ref.onClose().subscribe(res => {
      if(res && res.data){ this.lists.addList(res.data); }
      // if(res && res.data){ this.lists.addList(res.data); }
    });
  }
}
