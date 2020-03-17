import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Columns } from '../../enums/colums';
import { ModalComponent } from '../../components/modal/modal.component';
import { Size } from '../../components/modal';
import { Status, ItemDataList, ListsService, NavPagesParams} from '@neo/common';
import { takeUntil } from 'rxjs/operators';
import { EventListItem } from '../../models/event-list-item.model';



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

  @ViewChild( 'neo-modal', {static: true} ) modal: ModalComponent;
  modalTitle = '';
  dto = {
    nav: {actived : 0, deleted : 0},
    header: Columns,
    data: []
  };

  constructor(private lists: ListsService) { }

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
    this.modalAdd = true;
    this.modalTitle = 'Nueva lista';
    this.modal.open(Size.Small);
  }
  closeModal() {
    this.modal.close();
  }
  onChange(val: string) {
    // console.log(val);
  }

  editItem(id) {
    this._editValue =  this.dto.data.filter(obj => obj.id === id)[0];
    this.modalAdd = false;
    this.modalTitle = 'Editar lista';
    this.modal.open(Size.Small);
  }
  getEditValue() {
    return this._editValue;
  }
  viewItem(id) { console.log(id);  }

  isActives() { return this.action === Status.Actives; }
}
