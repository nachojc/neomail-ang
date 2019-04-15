import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ListsService } from 'src/app/services/lists/lists.service';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'libs/neo-lib/src/components/modal/modal.component';
import { Size } from 'libs/neo-lib/src/components/modal/size.enum';
import { Status } from 'src/app/enums/status';
import { Columns } from '../../enums/colums';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  action: Status = Status.Actives ;
  modalAdd = true;
  private list$: Subscription;

  @ViewChild( ModalComponent ) modal: ModalComponent;
  modalTitle = '';
  dto = {
    nav: {actived : 0, deleted : 0},
    header: Columns,
    data: []
  };

  constructor(private lists: ListsService) { }

  ngOnInit() {
    this.list$ = this.lists.getLists().subscribe(dta => {
      this.dto.data = dta;
      this.dto.nav.actived = this.lists.getTotal();
      this.dto.nav.deleted = this.lists.getDeleted();
      this.action = this.lists.getStatus();
    });
  }
  ngOnDestroy(): void {
    this.list$.unsubscribe();
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

  isActives() { return this.action === Status.Actives; }
}
