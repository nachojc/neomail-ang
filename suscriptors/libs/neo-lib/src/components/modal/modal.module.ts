
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { ModalComponent } from './modal.component';



@NgModule({
  imports: [
    CommonModule,
    ModalComponent
  ],
  exports: [
    ModalComponent
  ],
  declarations: [
  ],
  providers: [
  ],
//   entryComponents: [MatDialogContainer],
})
export class ModalModule {}
