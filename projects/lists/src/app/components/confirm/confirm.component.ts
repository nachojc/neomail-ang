import { Component} from '@angular/core';

import { ModalOverlayRef } from '@neo/common';
let index = 1;
@Component({
  selector: 'neo-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  confirmTitle:string;
  confirmSubTitle:string;

  constructor(
    public viewRef: ModalOverlayRef,
    ) {
      if (viewRef.data ) {
        this.confirmTitle = viewRef.data.confirmTitle;
        this.confirmSubTitle = viewRef.data.confirmSubTitle;
      }
  }

  close() {
    this.viewRef.close();
  }
  send(){
    this.viewRef.close(true);
  }
}
