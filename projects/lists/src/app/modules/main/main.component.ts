import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Columns } from '../../enums/colums';

import { 
  Status,
  ListsService,
  NavPagesParams,
  OverlayService,
  DialogModalSizeEnum,
  NavPagesEvent,
  PageNavOptionEvent
} from '@neo/common';
import { takeUntil } from 'rxjs/operators';
import { EventListItem, EventListItemType } from '../../models/event-list-item.model';
import { AddListComponent } from '../../components/add-list/add-list.component';
import { ConfirmComponent } from '../../components/confirm/confirm.component';



const MODAL_CFG = {
  animated: true,
  hasBackdrop: true,
  size: DialogModalSizeEnum.Small
};

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
      case EventListItemType.remove:
        this._remove(ev.id);
        break;
      case EventListItemType.reverte:
        this._reverse(ev.id);
        break;
      case EventListItemType.delete:
        this._delete(ev.id);
        break;
      default:
        console.log(ev);
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
      { ...MODAL_CFG, title: 'Add list'}
      );
    ref.onClose().subscribe(res => {
      if(res && res.data){ this.lists.addList(res.data); }
    });
  }
  onChange(ev: NavPagesEvent) {
    if (ev.type !== PageNavOptionEvent.selector){
      this.lists.getLists(ev.value);
    }
  }

  viewItem(id) { console.log(id);  }

  isActives() { return this.action === Status.Actives; }


  private _editItem(id) {
    const _editValue =  this.getItem(id);
    const modalConfig = {
      ...MODAL_CFG,
      title: 'Edit list',
      data: _editValue,
    };
    const ref = this.modal.open(AddListComponent, modalConfig);
    ref.onClose().subscribe(res => {
      if(res && res.data){ this.lists.updateItem(res.data); }
    });
  }

  private _remove(id){
    const _editValue =  this.getItem(id);
    const modalConfig = {
      ...MODAL_CFG,
      title: 'Move to bin',
      confirmTitle: 'Are you sure to move?',
      confirmSubTitle: ` The list: "${_editValue.name}"`
    };
    const ref = this.modal.open(ConfirmComponent, modalConfig);
    ref.onClose().subscribe(res => {
      if(res && res.type === 'close' && res.data === true){
        this.lists.changeDeleteTo(id, 1); 
      }
    });
  }
  private _reverse(id){
    const _editValue =  this.getItem(id);
    const modalConfig = {
      ...MODAL_CFG,
      title: 'Enable the list',
      confirmTitle: 'Are you sure to anable?',
      confirmSubTitle: ` The list: "${_editValue.name}"`
    };
    const ref = this.modal.open(ConfirmComponent, modalConfig);
    ref.onClose().subscribe(res => {
      if(res && res.type === 'close' && res.data === true){
        this.lists.changeDeleteTo(id, 0); 
      }
    });
  }
  private _delete(id){
    const _editValue =  this.getItem(id);
    const modalConfig = {
      ...MODAL_CFG,
      title: 'Delete element',
      confirmTitle: 'Are you sure to delete?',
      confirmSubTitle: ` The list: "${_editValue.name}"`
    };
    const ref = this.modal.open(ConfirmComponent, modalConfig);
    ref.onClose().subscribe(res => {
      if(res && res.type === 'close' && res.data === true){
        this.lists.confirmDelete(id); 
      }
    });
  }
  private getItem(id: number){
    return this.dto.data.filter(obj => obj.id === id)[0];
  }
}
