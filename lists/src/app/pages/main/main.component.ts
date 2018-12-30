import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ListsService } from 'src/app/services/lists/lists.service';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'libs/neo-lib/src/components/modal/modal.component';
import { Size } from 'libs/neo-lib/src/components/modal/size.enum';
import { Status } from 'src/app/enums/status';
import { Columns } from './colums.const';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild( ModalComponent ) modal: ModalComponent;
  modalTitle = '';
  actived = 0;
  deleted = 0;
  action: Status = Status.Actived ;
  private page = 1;
  private list$: Subscription;

  dto = {
    header: Columns,
    data: [{}]
  };

  constructor(private lists: ListsService) { }

  ngOnInit() {
    this.list$ = this.lists.getLists().subscribe(dta => {
      this.dto.data = dta;
      this.actived = this.lists.getTotal();
      this.deleted = this.lists.getDeleted();
    });
  }
  ngOnDestroy(): void {
    this.list$.unsubscribe();
  }

  reLoad(e: any, target: Status) {
    if (this.action !== target) {
      this.action = target;
      this.dto.data = null;
      if (target === Status.Actived) {
        this.lists.reload(this.page, false);
      } else {
        this.lists.reload(this.page, true);
      }
    }
    return false;
  }
  addList() {
    this.modalTitle = 'Nueva lista';
    this.modal.open(Size.Small);
  }
  closeModal() {
    this.modal.close();
  }
}
