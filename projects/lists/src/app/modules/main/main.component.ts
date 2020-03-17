import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Columns } from '../../enums/colums';

import { SizeModal } from '@neo/common';
import { 
  Status,
  ItemDataList,
  ListsService,
  NavPagesParams,
  ModalController,
} from '@neo/common';
import { takeUntil } from 'rxjs/operators';
import { EventListItem } from '../../models/event-list-item.model';
import { AddListComponent } from '../../components/add-list/add-list.component';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  action: Status = Status.Actives ;
  page: NavPagesParams;
  modalAdd = true;
  private list$: Subscription;
  private _editValue: ItemDataList;
  private destroy$: Subject<void> = new Subject<void>();

  modalTitle = '';
  dto = {
    nav: {actived : 0, deleted : 0},
    header: Columns,
    data: []
  };

  constructor(
    private lists: ListsService,
    private modal: ModalController) { }

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

  onClickList(ev: EventListItem){
    console.log(ev);
    
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
    const modalConfig = {
      config: {
        animated: true,
        closeModal: () => { console.log('aaaa');
        }
      },
    };
    this.modal.open(AddListComponent, modalConfig);
    // this.modal.open(SizeModal.Small);
  }
  closeModal() {
    this.modal.dismiss();
  }
  onChange(val: string) {
    // console.log(val);
  }

  editItem(id) {
    this._editValue =  this.dto.data.filter(obj => obj.id === id)[0];
    const modalConfig = {
      config: {
        animated: true
      },
      data: this._editValue
    };
    this.modal.open(AddListComponent, modalConfig);
  }
  getEditValue() {
    return this._editValue;
  }
  viewItem(id) { console.log(id);  }

  isActives() { return this.action === Status.Actives; }
}
